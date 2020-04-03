//jshint esversion: 6
const users = [];

const addUser = ({
  id,
  nickname,
  roomID,
  gender
}) => {
  //////USER REGISTRATION OR LOGIN DEPENDING ON COOKIE SESSION VARIABLES//////////////////////////
  if (socket.handshake.session.nickname || socket.handshake.session.id) {
    //if session exists log user in
    User.findOne({
      username: socket.handshake.session.nickname
    }, (err) => {

      if (err) {
        return (err);
      } else {

        const existingUser = new User({
          username: _.lowerCase(socket.handshake.session.nickname),
          password: _.lowerCase(socket.handshake.session.nickname)
        });
        ///know which block got executed
        console.log(existingUser + "1");

        socket.login(existingUser, function (err) {
          if (err) {
            return(err);
          } else {
            passport.authenticate("local")(() => {
              users.push(user);
              console.log(socket.handshake.session) + "1";
              socket.request.session.passport = {
                id,
                nickname,
                roomID,
                gender
              };
              socket.handshake.session = {
                id,
                nickname,
                roomID,
                gender
              };
              socket.handshake.session.save();
              user.lastLogin = Date.now;
            });
          }
        });
      }

    });
  } else {
    //check database if username exists
    User.findOne({
      username: req.body.nickname
    }, (err, foundUser) => {
      if (!foundUser) {
        //if no previous session register user
        const newUser = new User({
          username: _.lowerCase(req.body.nickname),
          gender: gender
        });

        ///know which block got executed
        console.log(newUser + "2");
        const password = _.lowerCase(nickname);

        User.register(newUser, password, err => {
          if (err) {
            return(err);
            // res.redirect("/signin?" + nickname&roomID);
          } else {
            passport.authenticate("local")(req, res, function () {
              users.push(newUser);
              console.log(socket.handshake.session) + "2";
              socket.request.session.passport = {
                id,
                nickname,
                roomID,
                gender
              };
              socket.handshake.session = {
                id,
                nickname,
                roomID,
                gender
              };
              socket.handshake.session.save();
              user.lastLogin = Date.now;
              // res.redirect("/?" + nickname&roomID);
            });
          }
        });
      } else if (foundUser) {
        ///know which block got executed
        console.log(foundUser);
        return (
          "User already exists, if you're this user, try using the previous browser used to pick up where you left off"
        );
      } else {
        return(err);
      }
    });
  }


  const user = {
    id,
    nickname,
    roomID,
    gender
  };

  return {
    user
  };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.roomID === roomID);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};