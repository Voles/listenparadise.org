var playAudio = require("play-audio");
var player;
var playing;

var urls = [
  { url: 'http://mp3.streampower.be/stubru-high.mp3', type: 'mp3' }
];

module.exports = {
  start: play,
  play: play,
  stop: stop,
  toggle: toggle
};

function toggle () {
  if (playing) stop();
  else play();
}

function play () {
  if (playing) return;

  playing = true;

  player = playAudio(urls).autoplay().play();

  if (/iPhone/.test(navigator.userAgent)) {
    player.controls();
  }
}

function stop () {
  if (!playing) return;

  playing = false;

  player.element().parentNode.removeChild(player.element());
  player = undefined;
}
