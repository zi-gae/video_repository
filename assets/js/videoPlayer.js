const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const voluemBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsScreenButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const toggleIcon = (playTF, muteTF) => {
  const playIcon = document.getElementById("jsPlayIcon");
  const muteIcon = document.getElementById("jsMuteIcon");

  playTF
    ? (playIcon.className = "fas fa-play")
    : (playIcon.className = "fas fa-pause");

  muteTF
    ? (muteIcon.className = "fas fa-volume-mute")
    : (muteIcon.className = "fas fa-volume-up");
};
const handlePlayClick = () => {
  videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
  toggleIcon(videoPlayer.paused);
};

const handleVolumeClick = () => {
  videoPlayer.muted ? (videoPlayer.muted = false) : (videoPlayer.muted = true);
  toggleIcon(videoPlayer.paused, videoPlayer.muted);
};

const goScreenClick = () => {
  videoPlayer.requestFullscreen();
};
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  voluemBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goScreenClick);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
};

if (videoContainer) {
  init();
}
