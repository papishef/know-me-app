//jshint esversion: 6
const users = [];

const addUser = ({ id, nickname, roomID }) => {
  namename = nickname.trim().toLowerCase();
  roomID = roomID.trim().toLowerCase();


  const existingUser = users.find((user) => user.roomID === roomID && user.nickname === nickname);


  if(!nickname || !roomID) return { error: 'Username and room are required.' };
  if(users.length > 1 || existingUser) return {error: "Room Over load. try another room or create yours and invite friends"};

  const user = { id, nickname, roomID };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.roomID === roomID);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};