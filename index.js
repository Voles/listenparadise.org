var Brick = require("brick");
var CenteredCover = require("centered-cover-background");
var request = require("get-json");
var onKey = require("key-event");
var player = require("./player");

module.exports = Brick(CenteredCover, {
  update: update,
  loop: loop,
  show: show,
  ready: ready
});

function update (paradise, done) {
  request('http://api.listenparadise.org', function (error, response) {
    if (error) throw error;

    paradise.songs = response.result;
    done();
  });
}

function loop (playing, next) {
  setTimeout(next, 5000);
}

function show (paradise) {
  CenteredCover.methods.show(paradise, 'https://farm3.staticflickr.com/2876/10973316604_a40772826c_o.jpg');
  paradise.brick.bind('ul li', paradise.songs.map(function (song) {
    return { ':first': { _html: song } };
  }));

  paradise.brick.bind('.cover-content', paradise.brick.template('songs'));
}

function ready (paradise) {
  player.start();
  onKey(window, 'space', player.toggle);
}