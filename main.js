// Initialize SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init voices array
let voices = [];

function getVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = ""; // پاک کردن گزینه‌های قبلی

  // loop through voices & create on optin for each one
  voices.forEach((voice) => {
    // create option element
    const option = document.createElement("option");
    // fill option with voice & language
    option.textContent = voice.name + "(" + voice.lang + ")";
    // set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}
getVoices();

// speak
const speak = () => {
  // check if speaking
  if (synth.speaking) {
    console.log("Already Speaking...");
    return;
  }
  if (textInput.value !== "") {
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = (e) => {
      console.log("Done Speaking");
      body.style.background = "black";
    };
    // Speak error
    speakText.onerror = (e) => {
      console.log("Somthing went Wrong");
    };
    // select voice
    const SelectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    // loop through voices
    speakText.voice =
      voices.find((voice) => voice.name === SelectedVoice) || voices[0];
    // set pitch & rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // speak
    synth.speak(speakText);
    // add background anime
    body.style.background = "black url(1.gif)";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
  }
};
// Enentlistener
// Text form submite
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});
// rate valu change
rate.addEventListener("change", () => (rateValue.textContent = rate.value));
// pitch valu change
pitch.addEventListener("change", () => (pitchValue.textContent = pitch.value));
// voice select change
voiceSelect.addEventListener("change", (e) => speak());

// Ensure voices are loaded properly
// synth.onvoiceschanged = getVoices;
