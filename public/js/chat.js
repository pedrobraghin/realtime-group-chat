let isTyping = false;

function sendMessage() {
  const name = nameInput.value;

  if (!name.trim()) {
    alert("Provide a name to send a message!");
    return;
  }
  const message = messageInput.value;
  const image = imageInput.files[0];

  if (!message && !image) return;
  if (isTyping) sendStopTypingEvent();

  sendMessageToServer(message, name, image);
  appendMyMessage(message, image);
  clearMessageInput();
  imageInput.value = "";
}

function sendAudio() {
  const name = nameInput.value;

  if (!(audio.blob || audio.url)) {
    return;
  }

  if (!name.trim()) {
    alert("Provide a name to send a message!");
    clearAudio();
    return;
  }

  sendAudioMessageToServer({
    blob: audio.blob,
    from: name,
  });

  appendMyAudio(audio.url);

  clearAudio();
}

messageInput.addEventListener("input", (e) => {
  const message = messageInput.value;

  if (!message.trim()) {
    sendStopTypingEvent();
    isTyping = false;
    return;
  }

  sendStartTypingEvent();
  isTyping = true;
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key != "Enter") return;

  sendStopTypingEvent();
  sendMessage();
});
