// ==================================================================
// DEFAULT CONFIGURATION
// ==================================================================
var tonefreq = 1000; // frequency (Hertz) of tone
var volume   = 50;  // 50% volume

// ==================================================================
// GLOBAL OBJECTS
// ==================================================================
var actx = new(window.AudioContext)();
var gainNode = actx.createGain(); // ***
    gainNode.connect(actx.destination); // *** connect the global gain node to the output destination
    gainNode.gain.value = volume/100.0; // ***

// ==================================================================
// DEFINE FUNCTIONS
// ==================================================================

// ----------------------------------------------
// play the pips now
// ----------------------------------------------
function play_now() {
  var osc = [];
  var start = actx.currentTime;
  for ( onum = 0 ; onum < 6 ; onum++ )
  {
    osc[onum] = actx.createOscillator();
    //osc[onum].connect(actx.destination);
    osc[onum].connect(gainNode) // *** connect our oscillator to the global gain node
    osc[onum].type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc[onum].frequency.value = tonefreq; // Hz
    osc[onum].start(start + onum);
    if ( onum == 5 ) {
      osc[onum].stop(start + onum + 0.5);
    }
    else {
      osc[onum].stop(start + onum + 0.1);
    }
  }
}

// ----------------------------------------------
// play a single pip
// ----------------------------------------------
function play_pip() {
  var start = actx.currentTime;
  var osc = actx.createOscillator();
  osc.connect(gainNode);
  osc.type = 'sine';
  osc.frequency.value = tonefreq; // Hz
  osc.start(start);
  osc.stop(start + 0.1);
}

// ----------------------------------------------
// play the pips at the top of the hour
// ----------------------------------------------
function checkTargetTime() {
  var d = new Date();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if ( m == 59 && s == 55 ) {
    play_now();
  }
}

// ----------------------------------------------
// load settings from storage into the
// displayed HTML form
// ----------------------------------------------
function init_options() {
  // store options for the first time, if they don't exist in storage
  // if the options are in storage already, then load them
  console.log("load_options() called");
  chrome.storage.sync.get({
    'tonefreq': tonefreq,
    'volume'  : volume
  }, function(items) {
    tonefreq = items.tonefreq;
    volume = items.volume;
    gainNode.gain.value = volume/100.0;
  });
}

// ==================================================================
// RUN ONCE
// ==================================================================

// ----------------------------------------------
// Check the time every second, henceforth forever
// ----------------------------------------------
init_options();
setInterval(checkTargetTime, 1000);

