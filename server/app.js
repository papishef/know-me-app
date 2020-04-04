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

app.options('*', cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


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
})));

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect("mongodb://localhost:27017/PlayRoomDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const roomSchema = new mongoose.Schema({})

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

passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(User.deserializeUser());



///////////////NO PAGE OTHER THAN HOMEPAGE/SIGN IN PAAGE WILL BE RENDERED IF USER IS NOT LOGGED IN
app.get("/chat?", (req, res) => {
  const roomEndpoint = req.params.roomID;
  if (req.isAuthenticated()) {
  res.json({
      allQuestions
    }); 
   
  } else {
    res.redirect("/");
  }
});



app.post("/signIn", (req, res) => {

  //check database if username exists
  User.findOne({
    username: req.body.nickname
  }, (err, foundUser) => {
    if (!foundUser) {
      //if no previous session register user
      const newUser = new User({
        username: _.lowerCase(req.body.nickname),
        gender: req.body.gender
      });

      ///know which block got executed

      const password = _.lowerCase(req.body.nickname);

      User.register(newUser, password, err => {
        if (err) {
          return (err);
          // res.redirect("/signin?" + nickname&roomID);
        } else {
          res.json({
            allQuestions
          });

        }
      });

    } else if (foundUser) {
      ///know which block got executed
      const existingUser = new User({
        username: _.lowerCase(req.body.nickname),
        password: _.lowerCase(req.body.nickname)
      });
      req.login(existingUser, function (err) {
        if (err) {
          return next(err);
        }
        req.user.lastLogin = Date.now;
        return res.redirect('/chat?');
      });
    } else {
      return (err);
    }
  });

});


app.get("/questions", (req, res) => {
  res.json({
    allQuestions
  });
});

app.get("/", (req, res) => {
  res.send("Server started successfully with no errors");
})


io.on("connect", (socket) => {
  socket.on("join", ({
    nickname,
    roomID,
  }, callback) => {

    const {
      error,
      user
    } = addUser({
      id: socket.id,
      nickname,
      roomID,
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
  });
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});