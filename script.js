
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

let keySpace = document.querySelector(`.key[data-key="32"]`);
keySpace.addEventListener("transitionend", RemoveTransition);


function RemoveTransition(e) {
  console.log(e);
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing"); 
}

window.addEventListener("keydown", function (e) {

  if (e.keyCode === 32) {

    const keys = document.querySelectorAll(`.key`);
    keySpace.classList.add("playing");
    if (IsPlaying(keys)) {
      keys.forEach((key) => ToggleAudio(key.dataset.key, true));
    } else {
      keys.forEach((key) => ToggleAudio(key.dataset.key));
    }
  } else {
    ToggleAudio(e.keyCode);
  }

});
