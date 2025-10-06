// select all buttons with class drum
document.querySelectorAll(".drum").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.innerHTML.toLowerCase();
    handleInteraction(key);
  });
});

// Detecting keyboard press and playing sound
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ("wasdjkl".includes(key)) {
    handleInteraction(key);
  }
});

//  Function to play sound
function playSound(key) {
  const soundMap = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3",
  };

  const soundFile = soundMap[key];
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }
}

// Function to animate button
function animateButton(key) {
  const button = document.querySelector(`.${key}`);
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
  }
}

// Central handler for both click and keydown
function handleInteraction(key) {
  playSound(key);
  animateButton(key);
}

// Create volume slider dynamically
const volumeContainer = document.createElement("div");
volumeContainer.style.textAlign = "center";
volumeContainer.style.marginTop = "20px";

const volumeLabel = document.createElement("label");
volumeLabel.textContent = "Volume: ";
volumeLabel.style.marginRight = "10px";

const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = "0";
volumeSlider.max = "1";
volumeSlider.step = "0.01";
volumeSlider.value = localStorage.getItem("drumVolume") || "0.5";

// Save volume to localStorage on change
volumeSlider.addEventListener("input", () => {
  localStorage.setItem("drumVolume", volumeSlider.value);
});

volumeContainer.appendChild(volumeLabel);
volumeContainer.appendChild(volumeSlider);
document.body.appendChild(volumeContainer);

// Modify playSound to use volume setting
function playSound(key) {
  const soundMap = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3",
  };

  const soundFile = soundMap[key];
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.volume = parseFloat(volumeSlider.value);
    audio.play();
  }
}
