//jshint esversion: 6
require("dotenv").config();
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const sharedsession = require("express-socket.io-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const _ = require("lodash");
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./users");

const allQuestions = require("./questions");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use(cookieParser());
app.use(
  session({
    secret: "thenameofthisappwasformerlyknowmeapp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000
    }
  })
);

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, cookieParser({
      autoSave: true
    }));

    app.use(passport.initialize()); app.use(passport.session());

    // Database Connection
    mongoose.connect("mongodb://localhost:27017/PlayRoomDB", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    /////DEFINE SCHEMA FOR ALL QUESTIONS ASKED PER USER//////////////
    const questionsAskedSchema = new mongoose.Schema({
      id: String,
      q: String,
      category: String
    });

    const QuestionsAsked = mongoose.model("QuestionAsked", questionsAskedSchema);

    /////DEFINITION OF USER SCHEMA////////////////
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      gender: {
        type: String,
        enum: ["Male", "Female"]
      },
      lastLogin: Date,
      dateAdded: {
        type: Date,
        default: Date.now
      },
      questAskedbyThisUser: [questionsAskedSchema]
    }, {
      timestamps: true
    });


    ///Delete inactive user after 604800 seconds or 1 week
    userSchema.index({
      createdAt: userSchema.lastLogin
    }, {
      expireAfterSeconds: 604800
    });

    /////////////////////PLUGIN PASSPORTLOCALMONGOOSE FOR PASSWORD HASHING////////////////////
    userSchema.plugin(passportLocalMongoose);
    const User = mongoose.model("User", userSchema);

    // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser()); passport.deserializeUser(User.deserializeUser());

    ///////////////NO PAGE OTHER THAN HOMEPAGE/SIGN IN PAAGE WILL BE RENDERED IF USER IS NOT LOGGED IN
    app.get("/:roomID", (req, res) => {
      const roomEndpoint = req.params.roomID;
      if (req.isAuthenticated()) {
        res.render("/" + roomEndpoint, {
          allQuestions: allQuestions
        });
      } else {
        res.redirect("/");
      }
    });


    app.get("/", (req, res) => {
      res.send("Server started successfully with no errors");
    })


    io.on("connect", (socket) => {
      socket.on("join", ({
        nickname,
        roomID,
        gender
      }, callback) => {

        const {
          error,
          user
        } = addUser({
          id: socket.id,
          nickname,
          roomID,
          gender
        });

        if (error) return callback(error);
        //Add new user to invited room
        socket.join(user.roomID);

        socket.emit("message", {
          user: "admin",
          text: `${user.nickname}, welcome to room ${user.roomID}.`
        });
        socket.broadcast.to(user.roomID).emit("message", {
          user: "admin",
          text: `${user.nickname} has joined!`
        });

        io.to(user.roomID).emit("roomData", {
          room: user.roomID,
          users: getUsersInRoom(user.roomID)
        });

        callback();
      });

      socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.roomID).emit("message", {
          user: user.nickname,
          text: message
        });

        callback();
      });

      socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.roomID).emit('message', {
            user: 'Admin',
            text: `${user.nickname} has left.`
          });
          io.to(user.roomID).emit('roomData', {
            room: user.roomID,
            users: getUsersInRoom(user.roomID)
          });
        }
      })
    });




    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 4000;
    }

    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });