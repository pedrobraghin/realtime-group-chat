const socket = io();

socket.on("user:message", (message) => {
  addMessageFromAnotherUser(message);
});

socket.on("user:audio", (data) => {
  addAudioMessageFromAnotherUser(data);
});

socket.on("user:count", ({ usersCount }) => {
  updateUsersCount(usersCount);
});

socket.on("user:typing-start", () => {
  showIsTypingLabel();
});

socket.on("user:typing-end", () => {
  hideIsTypingLabel();
});

function sendMessageToServer(message, from, image) {
  socket.emit("server:message", { message, from, image });
}

function sendStartTypingEvent() {
  socket.emit("server:typing-start");
}

function sendStopTypingEvent() {
  socket.emit("server:typing-end");
}

function sendAudioMessageToServer(data) {
  socket.emit("server:audio", data);
}
