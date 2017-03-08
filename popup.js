// GET BACKGROUND PAGE
var bgp = chrome.extension.getBackgroundPage();

// update internal configuration
function updateToneFreq() {
  var newtonefreq = document.getElementById("toneFreqSlider").value;
  console.log("New tone frequency is " + newtonefreq + " Hz.");
  bgp.tonefreq = newtonefreq;
  updateToneFreqDisplay();
  bgp.play_pip();
}

// Allows a user to play the pips with current settings
function processTestClick() {
  console.log("running processTestClick() function");
  bgp.play_now();
}

// Update the displayed information
function updateToneFreqDisplay() {
  document.getElementById("toneFreqSlider").value = bgp.tonefreq;
  document.getElementById("toneFreqDisplay").innerHTML = "Tone frequency: " + bgp.tonefreq + " Hertz";
}

// Do an initial update of the display to current values.
updateToneFreqDisplay();

// ADD EVENT LISTENERS
document.getElementById("testButton").addEventListener("click", processTestClick);
document.getElementById("toneFreqSlider").addEventListener("change", updateToneFreq);