// ==================================================================
// GLOBALS AND SUCH
// ==================================================================

var bgp = chrome.extension.getBackgroundPage(); // get background page

// ==================================================================
// DEFINE FUNCTIONS
// ==================================================================

// ----------------------------------------------
// update internal configuration
// ----------------------------------------------
function updateOptions() {
  var newtonefreq = document.getElementById("toneFreqSlider").value;
  var newvolume = document.getElementById("volumeSlider").value;
  bgp.tonefreq = newtonefreq;
  bgp.volume = newvolume;
  bgp.gainNode.gain.value = bgp.volume/100.0;

  save_options();
  updateOptionsDisplay();
  bgp.play_pip();
}

// ----------------------------------------------
// Play the pips now with current settings
// ----------------------------------------------
function processTestClick() {
  console.log("running processTestClick() function");
  bgp.play_now();
}

// ----------------------------------------------
// Update the displayed information
// ----------------------------------------------
function updateOptionsDisplay() {
  document.getElementById("toneFreqSlider").value = bgp.tonefreq;
  document.getElementById("toneFreqDisplay").innerHTML = "Tone frequency: " + bgp.tonefreq + " Hertz";
  document.getElementById("volumeSlider").value = bgp.volume;
  document.getElementById("volumeDisplay").innerHTML = "Volume: " + bgp.volume + "%";
}

// ----------------------------------------------
// Save options to chrome.storage
// ----------------------------------------------
function save_options() {
  console.log("save_options() called");
  chrome.storage.sync.set({
    'tonefreq': bgp.tonefreq,
    'volume'  : bgp.volume
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// ==================================================================
// RUN ONCE
// ==================================================================

// ----------------------------------------------
// Do an initial update of the display to current values.
// ----------------------------------------------
updateOptionsDisplay();

// ----------------------------------------------
// ADD EVENT LISTENERS
// ----------------------------------------------
document.getElementById("testButton").addEventListener("click", processTestClick);
document.getElementById("toneFreqSlider").addEventListener("change", updateOptions);
document.getElementById("volumeSlider").addEventListener("change", updateOptions);

