//jshint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

//To allow our express serveer render local files including css and javascript
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1209600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());


// Database Connection
mongoose.connect("mongodb://localhost:27017/PlayRoomDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});


//////////////////////////////////QUESTIONS ANSWERED SCHEMA////////////////////////////
const questionsAskedSchema = new mongoose.Schema({

})


////////////////////////USER SCHEMA DEFINITION//////////////////////////////
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Username is required',
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  dateAdded: {
    type: Date,
    default: Date.now.toLocaleString()
  },
  lastLogin: Date
});

/////////////////////PLUGIN PASSPORTLOCALMONGOOSE FOR PASSWORD HASHING////////////////////
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

server.listen(port, function(req, res) {
  console.log("Server is listening on port ${port}");
});
