//jshint esversion: 6
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const _ = require("lodash");

const allQuestions = require("./questions");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//To allow our express serveer render local files including css and javascript

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

///Delete inactive user after 604800 seconds or 1 week
userSchema.index(
  { createdAt: userSchema.lastLogin },
  { expireAfterSeconds: 604800 }
);

/////////////////////PLUGIN PASSPORTLOCALMONGOOSE FOR PASSWORD HASHING////////////////////
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//////USER REGISTRATION OR LOGIN DEPENDING ON COOKIE SESSION VARIABLES//////////////////////////
app
  .route("/:userName")
  .post((req, res) => {
    //check for previous session
    console.log(req.params.userName);

    let sess = req.session;

    const gender = req.body.gender;

    if (sess.username || sess.email) {
      //if session exists log user in
      User.findOne({ username: sess.username }, (err, foundUser) => {
        const user = new User({
          username: _.lowerCase(req.body.username),
          password: _.lowerCase(req.body.username)
        });

        ///know which block got executed
        console.log(sess);
        console.log(user + "1");

        req.login(user, function(err) {
          if (err) {
            res.send(err);
          } else {
            passport.authenticate("local")(req, res, function() {
              res.redirect("/" + req.params.userName);
            });
          }
        });
      });
    } else {
      //check database if username exists
      User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!foundUser) {
          //if no previous session register user
          const newUser = new User({
            username: req.body.username,
            gender: req.body.gender
          });

          ///know which block got executed
          console.log(newUser + "2");
          const password = req.body.username;

          User.register(newUser, password, err => {
            if (err) {
              res.send(err);
              res.redirect("/register");
            } else {
              passport.authenticate("local", {
                successRedirect: "/" + req.params.userName,
                failureRedirect: "/"
              });
            }
          });
        } else if (foundUser) {
          ///know which block got executed
          console.log(foundUser);
          res.send(
            "User already exists, if you're this user, try using the previous browser used to pick up where you left off"
          );
        } else {
          res.send(err);
        }
      });
    }
  })
  .get((req, res, next) => {
    if (req.isAuthenticated()) {
      res.render("/" + req.params.userName, {
        questions: allQuestions
      });
      next((req, res) => {
        //ALL SOCKET BACKEND CODES GO HERE
      });
    } else {
      res.redirect("/");
    }
  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, (req, res) => {
  console.log("Server is listening on port " + port);
});
