let audioChunks = [];
let mediaRecorder;
let audio = {
  blob: null,
  url: null,
};

startRecordingButton.addEventListener("click", startRecording);
stopRecordingButton.addEventListener("click", stopRecording);
cancelRecordingButton.addEventListener("click", cancelRecording);

setupRecorder();

async function startRecording() {
  if (!mediaRecorder) {
    setupRecorder();
    return;
  }
  mediaRecorder.start();
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
  cancelRecordingButton.disabled = false;
  recordingLabel.classList.remove("hide");
}

async function setupRecorder() {
  try {
    if (!mediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
    }

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, {
        type: "audio/wav; codecs=opus",
      });

      audio.blob = audioBlob;
      audio.url = URL.createObjectURL(audioBlob);
      sendAudio();
      clearAudio();
    };
  } catch (e) {
    alert("Error accessing microphone: ", error);
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
    cancelRecordingButton.disabled = true;
    recordingLabel.classList.add("hide");
  }
}

function clearAudio() {
  audio.blob = null;
  audio.url = null;
}

function cancelRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
  }
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
  cancelRecordingButton.disabled = true;
  recordingLabel.classList.add("hide");
  clearAudio();
}
