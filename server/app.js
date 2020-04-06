//jshint esversion: 6
require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
const server = app.listen(port, function (res) {
  console.log("server is listening on 4000");
});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const _ = require("lodash");
// const server = http.createServer(server);
const cors = require("cors");
const io = require("socket.io").listen(server);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./users");

const allQuestions = require("./questions");



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());

app.options('http://localhost:3000/"', cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);




app.use(cookieParser());
const session = require('express-session')({
  secret: "thenameofthisappwasformerlyknowmeapp",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 604800000
  }
});
const sharedsession = require("express-socket.io-session");

app.use(session);
io.use(sharedsession(session));

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect("mongodb://localhost:27017/PlayRoomDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const roomSchema = new mongoose.Schema({});

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

passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(User.deserializeUser());



///////////////NO PAGE OTHER THAN HOMEPAGE/SIGN IN PAAGE WILL BE RENDERED IF USER IS NOT LOGGED IN
app.get("/chat?", (req, res) => {
  const roomEndpoint = req.params.roomID;
    res.send({
      allQuestions
    });
 
});

io.on('connection', function (socket) {

  socket.on("join", ({
    nickname,
    roomID
  }, callback) => {

    const {
      error,
      user
    } = addUser({
      id: socket.id,
      nickname,
      roomID
    });

    if (error) return callback(error);

    //Admin message to all new users
    socket.emit("message", {
      user: "PlayRoom",
      text: `Hello ${user.nickname}, Welcome to ${user.roomID}, any player can pick a question first, Refer to the how to play guide on the top right`
    });
    //Admin message to existin user when a new user joins the room
    socket.broadcast.to(user.roomID).emit("message", {
      user: "PlayRoom",
      text: `${user.nickname} has joined entered your Room, Break the ice by asking them a question`
    });

    socket.join(user.roomID);
    callback();
  });
  //Expecting a message to be sent 
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.roomID).emit("message", {user: user.nickname, text: message});
    callback();
  });
//Expecting a question to be sent
  socket.on("sendQuestion", (quest, callback) => {
    const userQuest = getUser(socket.id);
    // if(quest === "Pick a Question") {
    //   console.log("Next user turn");
    // } else {
      io.to(userQuest.roomID).emit("quest", {user: userQuest.nickname, text: quest});
      console.log(quest);
      callback();
    // }
  });


  socket.on("disconnect", () => {
    console.log("user left!!!");
  });
});



app.post("/signIn", (req, res) => {

  //check database if username exists
  User.findOne({
    username: req.body.nickname.trim()
  }, (err, foundUser) => {
    if (!foundUser) {
      //if no previous session register user
      const newUser = new User({
        username: _.lowerCase(req.body.nickname.trim()),
        gender: req.body.gender
      });

      ///know which block got executed

      const password = _.lowerCase(req.body.nickname);

      User.register(newUser, password, err => {
        if (err) {
          return (err);
          // res.redirect("/signin?" + nickname&roomID);
        } else {
          res.redirect('/chat?');
        }
      });

    } else if (foundUser) {
      ///know which block got executed
      const existingUser = new User({
        username: _.lowerCase(req.body.nickname.trim()),
        password: _.lowerCase(req.body.nickname.trim())
      });
      req.login(existingUser, function (err) {
        if (err) {
          res.send(err);
        }
        req.user.dateAdded = Date.now;
        res.redirect('/chat?');
      });
    } else {
      return (err);
    }
  });

});


app.get("/questions", (req, res) => {
  res.send({
    allQuestions
  });
});

app.get("/", (req, res) => {
  res.send("Server started successfully with no errors");
});