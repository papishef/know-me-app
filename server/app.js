//jshint esversion: 6
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");

const allQuestions = require("./questions");

app.use(bodyParser.urlencoded({
  extended: true
}));

//To allow our express serveer render local files including css and javascript

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send(allQuestions.eightyEight.q);
});






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(req, res) {
  console.log("Server is listening on port " + port);
});
