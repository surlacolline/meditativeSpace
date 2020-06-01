const keys = document.querySelectorAll(`.key`);

const keySpace = document.querySelector(`.key[data-key="32"]`);


function ToggleAudio(keyCode, forceStop = false) {
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  const key2 = this;
  if (!audio) return; // stop the function

  if (audio.currentTime === 0 && !forceStop) {
    key.classList.add("playing");
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
    audio = undefined;
    key.classList.remove("playing");
  }
}

function IsPlaying(keys) {
  for (let i = 0; i < keys.length; i++) {
    let audio = document.querySelector(`audio[data-key="${keys[i].dataset.key}"]`);

    if (audio && !(audio.currentTime === 0)) {
      return true;
    }
  }
  return false;
}

keySpace.addEventListener("transitionend", RemoveTransition);


function RemoveTransition(e) {
  console.log(e);
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing"); 
}

function keyHandle(e) {

    if (e.keyCode === 32) {
        keySpace.classList.add("playing");
        if (IsPlaying(keys)) {
          keys.forEach((key) => ToggleAudio(key.dataset.key, true));
        } else {
          keys.forEach((key) => ToggleAudio(key.dataset.key));
        }
      } else {
        ToggleAudio(e.keyCode);
      }
}
function keyClickHandle(e) {

    if (+e.currentTarget.dataset.key === 32) {
        keySpace.classList.add("playing");
        if (IsPlaying(keys)) {
          keys.forEach((key) => ToggleAudio(key.dataset.key, true));
        } else {
          keys.forEach((key) => ToggleAudio(key.dataset.key));
        }
      } else {
        ToggleAudio(e.currentTarget.dataset.key);
      }
}
window.addEventListener("keydown", keyHandle);
keys.forEach((key) => key.addEventListener("click", keyClickHandle));
keySpace.addEventListener("click", keyClickHandle);