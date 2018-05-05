// Does the game listen to user input?
var redButton, blueButton, greenButton, yellowButton;
var gameSequence = [];
var playerSequence = [];
var currentLevel = 0;
var listenToPlayer = false;
var strictMode = false;

window.onload = init;

function init() {
  // Assign variables to buttons
  redButton = document.getElementById("r");
  blueButton = document.getElementById("b");
  greenButton = document.getElementById("g");
  yellowButton = document.getElementById("y");

  // Completed Level Counter
  levelSpace = document.getElementById("completedLevels");

  // Assign variables to start and stop buttons
  var startStopButton = document.getElementById("startStopButton");
  var resetButton = document.getElementById("resetButton");

  // This will be the operations board of the game
  startStopButton.onclick = startGame;
  resetButton.onclick = resetGame;

  levelSpace.innerHTML = "Press Start/Stop to Begin";
}

// Manage what happens when user click Start/Stop
function startGame() {
  levelSpace.innerHTML = "0";
  addToGameSequence();
  animateSequence(gameSequence);
  gameLoop();
}

function resetGame() {
  gameSequence = [];
  playerSequence = [];
  currentLevel = 0;
}

// Create a function which can add new random elements to an array.
function addToGameSequence() {
  var avaliableColors = [redButton, greenButton, blueButton, yellowButton];
  var newColor = avaliableColors[Math.floor(Math.random() * avaliableColors.length)];
  gameSequence.push(newColor);
}

function gameLoop() {
  // I'm not sure what this will do...
}

// What happens when a button is clicked
function pressColorButton(color) {
  if (listenToPlayer) {
    animate(color);
    playerSequence.push(color);
  }

  checkSequence();
}

// Functionality for the fade effect on colorButtons
function animate(element) {
  var animateIntervalId;

  var opacity = 0.1;  // initial opacity
  element.style.display = "block";

  function fadeAnimation() {
    if (opacity >= 1){
        clearInterval(animateIntervalId);
    }

    element.style.opacity = opacity;
    element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    opacity += 0.5 * opacity;
  }

  animateIntervalId = setInterval(fadeAnimation, 10);
}

// Play the gameSequence
function animateSequence(seq) {
  var intervalId;
  var runCount = 0;
  
  // Disable user input
  listenToPlayer = false;
  playerSequence = [];

  function playSequence() {
    // Clear interval after gameSequence plays to end
    if (runCount >= seq.length - 1) {
      clearInterval(intervalId);
    }

    // Animate the sequential buttons
    animate(seq[runCount]);
    runCount += 1;
  }

  intervalId = setInterval(playSequence, 1000);

  // Enable user input after animate sequence played
  listenToPlayer = true;
}

// This will test playerSequence against gameSequence
function checkSequence() {
  console.log(gameSequence, "<-gameSequence");
  console.log(playerSequence, "<-playerSequence");

  if (playerSequence.length === gameSequence.length) {
    // Check to see if playerSequence has errors compared to gameSequence
    for (var i = 0; i < playerSequence.length; i += 1) {
      if (!sequencesMatch()) {
        console.log("Player Loses function");
        levelSpace.innerHTML = "Game Over, You Achieved Level" + currentLevel + " | Congratulations";
        resetGame();
      } else { // If they match, add color to gameSequence and animateSequence
        incrementSuccess();
      }
    }
}

function sequencesMatch() {
  for (var i = 0; i < playerSequence.length; i += 1) {
    if (playerSequence[i] !== gameSequence[i]) {
      return false;
    }
  }
  return true;
}

function incrementSuccess() {
  playerSequence = [];
  addToGameSequence();
  currentLevel += 1;
  levelSpace.innerHTML = currentLevel;
  animateSequence(gameSequence);
}