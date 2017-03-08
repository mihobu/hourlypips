// CONFIGURATION
var tonefreq = 1000; // frequency (Hertz) of tone
var actx = new(window.AudioContext)();

function play_now() {
  var osc = [];
  var start = actx.currentTime;
  for ( onum = 0 ; onum < 6 ; onum++ )
  {
    osc[onum] = actx.createOscillator();
    osc[onum].connect(actx.destination);
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

function play_pip() {
  var start = actx.currentTime;
  var osc = actx.createOscillator();
  osc.connect(actx.destination);
  osc.type = 'sine';
  osc.frequency.value = tonefreq; // Hz
  osc.start(start);
  osc.stop(start + 0.1);
}

function checkTargetTime() {
  var d = new Date();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if ( m == 59 && s == 55 ) {
    play_now();
  }
}

// Check the time every second, henceforth forever
setInterval(checkTargetTime, 1000);

