//jshint esversion: 6
const users = [];

const addUser = ({ id, nickname, roomID }) => {
  nickname = nickname.trim().toLowerCase();
  roomID = roomID.trim().toLowerCase();


  const existingUser = users.find((user) => user.roomID === roomID && user.nickname === nickname);


  if(!nickname || !roomID) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken or you refreshed your page, login again to continue, this is in our bid to make sure you stay anonymous and your chats private. Your activities will not be seen in this room and you will see no activity until you login again.' };
  if(users.length>=2) return {error: "Room Over load. try another room or create yours and invite friends"};

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