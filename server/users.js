//jshint esversion: 6
const users = [];

const addUser = ({
  id,
  nickname,
  roomID
}) => {

  const sess = req.session;
//////USER REGISTRATION OR LOGIN DEPENDING ON COOKIE SESSION VARIABLES//////////////////////////
  if (sess.username || sess.email) {
    //if session exists log user in
    User.findOne({
      username: sess.username
    }, (err) => {


      if (err) {
        return (err)
      } else {

        const existingUser = new User({
          username: _.lowerCase(sess.username),
          password: _.lowerCase(sess.username)
        });

        req.login(user, function (err) {
          if (err) {
            res.send(err);
          } else {
            passport.authenticate("local")(req, res, function () {
              users.push(existingUser)
              // res.redirect("/?" + nickname&roomID);
            });
          }
        });
      }
      ///know which block got executed
      console.log(sess);
      console.log(user + "1");

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
          gender: req.body.gender
        });

        ///know which block got executed
        console.log(newUser + "2");
        const password = _.lowerCase(req.body.nickname);

        User.register(newUser, password, err => {
          if (err) {
            res.send(err);
            // res.redirect("/signin?" + nickname&roomID);
          } else {
            passport.authenticate("local")(req, res, function () {
              users.push(newUser);
              // res.redirect("/?" + nickname&roomID);
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


  const user = {
    id,
    nickname,
    roomID
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