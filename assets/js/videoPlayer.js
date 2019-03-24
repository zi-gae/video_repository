const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const voluemBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsScreenButton");

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

const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  voluemBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goScreenClick);
};

if (videoContainer) {
  init();
}
