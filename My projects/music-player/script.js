const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const preBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// songs
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto1",
  },
  {
    name: "jacinto-2",
    displayName: "Electric Chill ",
    artist: "Jacinto2",
  },
  {
    name: "jacinto-3",
    displayName: " Chill Machine",
    artist: "Jacinto3",
  },
  {
    name: "metric-1",
    displayName: "metrix",
    artist: "Jacinto4",
  },
];

//check if music playing
let isPlaying = false;
//play the music
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "play");
  music.play();
}
//pause the music
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "pause");
  music.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
// update dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
// current song
let songIndex = 0;
// previous song
function prevSong() {
  songIndex--;
  console.log(songIndex);
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}
// next song
function nextSong() {
  songIndex++;
  console.log(songIndex);
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgressBar(e) {
  if (isPlaying) {
    // console.log(e);
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calc duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    //delay for Nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calc for current time
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) currentTimeSeconds = `0${currentTimeSeconds}`;
    currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
  }
}
function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  const { duration } = music;
  music.currentTime = (offsetX / width) * duration;
}
// on load
loadSong(songs[songIndex]);
preBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
