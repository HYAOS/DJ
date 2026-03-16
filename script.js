const trackLine = document.getElementById("trackLine");
const equalizer = document.getElementById("equalizer");
const powerButton = document.getElementById("powerButton");
const generateButton = document.getElementById("generateButton");
const promptInput = document.getElementById("promptInput");
const stereo = document.querySelector(".stereo");

const tracks = [
  "VINYL SPIN // NIGHT DRIVE",
  "FUNK ENGINE // HOT BASS MIX",
  "SYNTH CLUB // RETRO TAPE CUT",
  "CITY GROOVE // ELECTRO DISCO",
  "SUNSET LOOP // SOUL MACHINE",
];

let trackIndex = 0;
let isPowered = true;

function animateBars() {
  if (!equalizer) return;
  const bars = equalizer.querySelectorAll(".bar");
  bars.forEach((bar) => {
    const next = isPowered ? 12 + Math.random() * 88 : 5 + Math.random() * 10;
    bar.style.height = `${next}%`;
  });
}

function nextTrackLine() {
  if (!trackLine || !isPowered) return;
  trackLine.textContent = tracks[trackIndex];
  trackIndex = (trackIndex + 1) % tracks.length;
}

powerButton?.addEventListener("click", () => {
  isPowered = !isPowered;
  powerButton.setAttribute("aria-pressed", String(isPowered));
  powerButton.textContent = isPowered ? "POWER" : "OFF";
  stereo?.classList.toggle("power-off", !isPowered);
  if (!isPowered && trackLine) {
    trackLine.textContent = "SYSTEM STANDBY";
  }
  if (isPowered) {
    nextTrackLine();
  }
});

generateButton?.addEventListener("click", () => {
  if (!isPowered || !trackLine) return;
  const prompt = promptInput instanceof HTMLInputElement ? promptInput.value.trim() : "";
  trackLine.textContent = prompt
    ? `AI SET // ${prompt.slice(0, 28).toUpperCase()}`
    : "AI SET // CUSTOM SESSION";
});

setInterval(animateBars, 160);
setInterval(nextTrackLine, 3200);
animateBars();
nextTrackLine();
