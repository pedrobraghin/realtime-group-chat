const usersCounterContainer = document.getElementById("users-count-container");
const startRecordingButton = document.getElementById("start-recording-button");
const stopRecordingButton = document.getElementById("stop-recording-button");
const messagesContainer = document.getElementById("messages-container");
const recordingLabel = document.getElementById("recording-label");
const messageInput = document.getElementById("message-input");
const isTypingLabel = document.getElementById("typing-label");
const toScrollLabel = document.getElementById("to-scroll");
const imageInput = document.getElementById("image-input");
const nameInput = document.getElementById("name-input");
const cancelRecordingButton = document.getElementById(
  "cancel-recording-button"
);

function updateUsersCount(count) {
  const usersCountLabel = usersCounterContainer.querySelector("#users-count");
  usersCountLabel.textContent = count;
}

function addMessageFromAnotherUser({ message, from, image }) {
  messagesContainer.innerHTML += createMessageComponent(
    message,
    from,
    image,
    getTime(),
    false
  );
  toScrollLabel.scrollIntoView();
}

function appendMyMessage(text, image) {
  messagesContainer.innerHTML += createMessageComponent(
    text,
    "You",
    image,
    getTime(),
    true
  );
  toScrollLabel.scrollIntoView();
}

function appendMyAudio(url) {
  messagesContainer.innerHTML += createAudioComponent(
    { url },
    "You",
    getTime(),
    true
  );
  toScrollLabel.scrollIntoView();
}

function addAudioMessageFromAnotherUser({ blob, from }) {
  messagesContainer.innerHTML += createAudioComponent(
    { url: resolveAudioFromServer(blob) },
    from,
    getTime(),
    false
  );
  toScrollLabel.scrollIntoView();
}

function getTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "00");
  const minutes = date.getMinutes().toString().padStart(2, "00");

  return `[${hours}:${minutes}]`;
}

function showIsTypingLabel() {
  isTypingLabel.classList.remove("hide");
}

function hideIsTypingLabel() {
  isTypingLabel.classList.add("hide");
}

function createMessageComponent(text, sender, image, time, ownMessage) {
  if (ownMessage) {
    return `
      <div class="message-container self-end">
        <div class="self-end">
          <span class="message-time">${time}</span>
        </div>
        <div class="self-end">
          ${resolveImage(image, sender)}
        </div>
        <div class="self-end">
          <span class="message">${text}</span>
        </div>
      </div>
    `;
  }

  return `
      <div class="message-container self-start">
        <div class="self-start">
          <span class="message-time">${time}</span>
          <span class="message-sender">${sender}: </span>
        </div>
        <div class="self-start">
          ${resolveImageFromServer(image, sender)}
        </div>
        <div class="self-start">
          <span class="message">${text}</span>
        </div>
      </div>
    `;
}

function createAudioComponent({ url }, sender, time, ownMessage) {
  if (ownMessage) {
    return `
      <div class="audio-message-container self-end">
        <div class="self-end">
          <span class="audio-time">${time}</span>
        </div>
        <div class="self-end">
          <audio class="audio-player" src="${url}" controls></audio>
        </div>
      </div>
    `;
  }

  return `
      <div class="audio-message-container self-start">
        <div>
          <span class="audio-time">${time}</span>
          <span class="audio-sender">${sender}: </span>
        </div>
        <div>
          <audio class="audio-player" src="${url}" controls></audio>
        </div>
      </div>
    `;
}

function resolveImageFromServer(image, sender) {
  if (!image) return "";

  const objectURL = window.URL.createObjectURL(
    new Blob([image], { type: "image/jpeg" })
  );
  return `<img src="${objectURL}" class="image-message" alt="Image sent from ${sender}">`;
}

function resolveImage(image, sender) {
  if (!image) return "";

  const objectURL = window.URL.createObjectURL(image);
  return `<img src="${objectURL}" class="image-message" alt="Image sent from ${sender}">`;
}

function resolveAudioFromServer(arrayBuffer) {
  const blob = new Blob([arrayBuffer], { type: "audio/wav; codecs=opus" });
  const url = URL.createObjectURL(blob);
  return url;
}

function clearMessageInput() {
  messageInput.value = "";
}
