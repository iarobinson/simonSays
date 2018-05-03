// Does the game listen to user input?
var gameSequence = [];
var playerSequence = [];
var listenToPlayer = false;

window.onload = init();

function init() {
  addToGameSequence();
}

function buttonClicked(color) {
  // Managing User Button Clicks Here
  // Colors passed in as single letter strings related to color. Example Red = 'r'
  console.log(color);
  
}

function startOrStopGame() {
  playSequence();
}

function resetGame() {
  // Reset Game
  console.log('reset');
  gameSequence = [];
}

// This function plays the randomly selected sequence for user to watch
function playSequence() {
  console.log("playSequence");
  for (var i = 0; i < gameSequence.length; i += 1) {
    setTimeout(function () {
      gameSequence[i];
    }, 500);
  }
}

function addToGameSequence() {
  var avaliableColors = ['r', 'g', 'b', 'y'];
  var newColor = avaliableColors[Math.floor(Math.random() * avaliableColors.length)];
  console.log(newColor, "<- newColor");
  gameSequence.push(newColor);
  console.log(gameSequence, "<-gameSequence");
}
