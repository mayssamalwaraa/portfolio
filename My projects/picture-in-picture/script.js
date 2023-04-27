const videoElement = document.getElementById("video");
const button = document.getElementById("button");

//prompt to select media stream ,pass to video element ,then play
async function selectMediaStream() {
  try {
    const mediastream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediastream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (err) {
    console.log("oops", err);
  }
}
button.addEventListener("click", async () => {
  // display button
  button.disabled = true;
  // start picture in picture
  await videoElement.requestPictureInPicture();
  // rest button
  button.disabled = false;
});
// onload
selectMediaStream();
