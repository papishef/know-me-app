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
  console.log("server is listening on " + port);
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

app.use(cors());
app.options("*", cors());

app.options("*", (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE, PATCH");
    return res.status(200).json({});
  }
  res.header("Access-Control-Allow-Origin", "https://www.playroom.live");
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, application/json"
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect("mongodb+srv://admin-sheriff:Surprise1%40@kyiakyiadigital-c6jba.mongodb.net/PlayRoomDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.catch((error) => {
  console.log(error);
});


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

}, {
  timestamps: true
});


///Delete inactive user after 604800 seconds or 1 week
userSchema.index({
  createdAt: Date.now
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

/////DEFINITION OF CHAT HISTORY SCHEMA////////////////
const chatSchema = new mongoose.Schema({
  message: {
    type: String
  },
  sender: {
    type: String
  },
  room: {
    type: String
  },
}, {
  timestamps: true
});

///Delete inactive user after 604800 seconds or 1 week
chatSchema.index({
  createdAt: Date.now
}, {
  expireAfterSeconds: 259200
});

const Chat = mongoose.model("Chat", chatSchema);


/////DEFINITION OF QUESTIONS HISTORY SCHEMA////////////////
const questionsAskedSchema = new mongoose.Schema({
  category: {
    type: String
  },
  sender: {
    type: String
  },
  room: {
    type: String
  },
}, {
  timestamps: true
});

///Delete inactive user after 604800 seconds or 1 week
questionsAskedSchema.index({
  createdAt: Date.now
}, {
  expireAfterSeconds: 604800
});

const QuestionAsked = mongoose.model("QuestionAsked", questionsAskedSchema);


io.on('connection', function (socket) {

  socket.on("join", ({
    nickname,
    roomID
  }, callback) => {

    const {
      error,
      user
    } = addUser({
      id: nickname,
      nickname,
      roomID
    });

    if (error) return callback(error);
    //Admin message to all new users
    socket.emit("message", {
      user: "PlayRoom",
      text: `Hello ${user.nickname}, Welcome to ${user.roomID}, any player can pick a question first, Refer to the how to play guide on the top right.`
    });
    //Admin message to existin user when a new user joins the room
    socket.broadcast.to(user.roomID).emit("message", {
      user: "PlayRoom",
      text: `${user.nickname} has entered the Room, Break the ice by asking them a question.`
    });

    socket.join(user.roomID);
    callback();
  });
  //Expecting a message to be sent 
  socket.on("sendMessage", (message, roomID, nickname, callback) => {
    const user = getUser(nickname);
    ///save message to history
    let messageHistory = new Chat({
      message: message,
      sender: _.lowerCase(user.nickname.trim()),
      room: _.lowerCase(roomID.trim())
    });
    messageHistory.save((error) => {
      if (error) // ...
      console.log(error);
    });
    //send message to room users
    io.to(user.roomID).emit("message", {
      user: user.nickname,
      text: message
    });
    callback();
  });
  //Expecting a question to be sent
  socket.on("sendQuestion", (quest, roomID, nickname, callback) => {
    const userQuest = getUser(nickname);
    //save questions to chats schema
    let questionHistory = new Chat({
      message: quest,
      sender: _.lowerCase(userQuest.nickname.trim()),
      room: _.lowerCase(roomID.trim())
    });
    questionHistory.save((error) => {
      if (error) // ...
      console.log(error);
    });
    //send question to room users
    io.to(userQuest.roomID).emit("quest", {
      user: userQuest.nickname,
      text: quest
    });
    callback();
  });

  // save question categories for results calculation
  socket.on("sendCategory", (questionCategory, roomID, nickname, callback) => {
    //save questions for results page
    const userQuestCategory = getUser(nickname);

    let questForCalc = new QuestionAsked({
      category: questionCategory,
      sender: _.lowerCase(userQuestCategory.nickname.trim()),
      room: _.lowerCase(roomID.trim())
    });
    questForCalc.save((error) => {
      if (error) 
      console.log(error);
    });
    callback();
  });


  socket.on("disconnect", (nickname) => {
    const user = removeUser(nickname);

    if (user) {
      io.to(user.roomID).emit("message", {
        user: "PlayRoom",
        text: `${user.nickname} is offline, shhhh!!`
      });
    }

  });
});

//LOGIN AND REG. ROUTES////
app.post("/signIn", (req, res) => {

  //check database if username exists
  User.findOne({
    username: _.lowerCase(req.body.nickname.trim())
  }, (err, foundUser) => {
    if (!foundUser) {
      //if no previous session register user
      const newUser = new User({
        username: _.lowerCase(req.body.nickname.trim()),
        gender: req.body.gender
      });

      const password = _.lowerCase(req.body.nickname);

      User.register(newUser, password, err => {
        if (err) {
          return (err);
          // res.redirect("/signin?" + nickname&roomID);
        } else {
          res.sendStatus(200);
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
        res.sendStatus(200);
      });
    } else {
      return (err);
    }
  });

});

///Get all questions
app.get("/questions", (req, res) => {
  res.json({
    allQuestions
  });
});

/////////SEND CHAT mini History//////////
app.get("/chat/:roomID", (req, res) => {

  Chat.find({
    room: _.lowerCase(req.params.roomID.trim())
  }, (error, messagesHistory) => {
    if (messagesHistory) {
      if (messagesHistory.length > 5) {
        let messagesInHistory = messagesHistory.slice(messagesHistory.length - 5, messagesHistory.length);
        res.json({
          messagesInHistory
        });
      } else {
        let messagesInHistory = messagesHistory.slice(messagesHistory[0], messagesHistory.length);
        res.json({
          messagesInHistory
        });
      }

    } else if (error) {
      console.log(error);
    }
  });

});

/////////SEND CHAT full History//////////
app.get("/history/:roomID", (req, res) => {

  Chat.find({
    room: _.lowerCase(req.params.roomID.trim())
  }, (error, messagesInHistory) => {
    if (messagesInHistory) {
      res.json({
        messagesInHistory
      });
    } else if (error) {
      console.log(error);
    }
  });

});

/////////SEND CHAT History with limit//////////
app.get("/history/:roomID/:limit", (req, res) => {

  Chat.find({
    room: _.lowerCase(req.params.roomID.trim())
  }, (error, messagesInHistory) => {
    if (messagesInHistory) {
      res.json({
        messagesInHistory
      });
    } else if (error) {
      console.log(error);
    }
  }).limit(parseInt(req.params.limit)).sort({ createdAt: -1 });

});

/////////////delete room chat history//////
app.delete("/delete/:roomID", (req, res) => {
  ////delete messages after disconnect
  Chat.deleteMany({
    room: _.lowerCase(req.params.roomID.trim())
  }, (error) => {
    if (error) return (error);
  });
});

//////////////Send results data to user////////////////
app.get("/results/:roomID", (req, res) => {

  QuestionAsked.find({
      room: _.lowerCase(req.params.roomID.trim())
    }, (error, foundQuestions) => {

    }).then((foundQuestions) => {
      const categoryArray = foundQuestions.map(newArray => newArray.category);


      if (categoryArray.length == 0) {
        return null;
      } else {
        var modeMap = {};
        var maxEl = categoryArray[0],
          maxCount = 1;
        var seventyPercent = Math.floor(categoryArray.length * (70 / 100));

        for (let index = 0; index < seventyPercent; index++) {
          var el = categoryArray[index];
          if (modeMap[el] == null)
            modeMap[el] = 1;
          else modeMap[el]++;

          if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
          }
        }
        // return maxEl;
        res.json({
          maxEl
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

});

/////////////delete room question history//////
app.delete("/deleteQuestHistory/:roomID", (req, res) => {

  QuestionAsked.deleteMany({
    room: _.lowerCase(req.params.roomID.trim())
  }, (error) => {
    if (error) return (error);
  });
});


app.get("/", (req, res) => {
  res.send("Server started successfully with no errors");
});