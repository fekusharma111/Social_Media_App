const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addusers = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const removeUsers = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  //when connection is established
  console.log("a user connected");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addusers(userId, socket.id);
    io.emit("getUsers", users);
  });
  //send and get messeges
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("send message is received");
    console.log(senderId, receiverId, text);
    let user = getUser(receiverId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUsers(socket.id);
    io.emit("getUsers", users);
  });
});
