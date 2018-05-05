// Does the game listen to user input?
var redButton, blueButton, greenButton, yellowButton, intervalId;
var currentLevel = 0;
var gameSequence = [];
var playerSequence = [];
var strictMode = false;
var listenToPlayer = false;
var winningLevel = 20;

// Assign audio to variables
var redSound = new Audio("sounds/soundOfRed.mp3");
var blueSound = new Audio("sounds/soundOfBlue.mp3");
var greenSound = new Audio("sounds/soundOfGreen.mp3");
var yellowSound = new Audio("sounds/soundOfYellow.mp3");
var victorySound = new Audio("sounds/soundOfVictory.mp3");
var defeatSound = new Audio("sounds/soundOfVictory.mp3");

window.onload = init;

function init() {
  console.log("Thank you for your interest. To learn more, visit me at ianrobinson.net");
  // Assign variables to the four colored buttons
  redButton = document.getElementById("r");
  blueButton = document.getElementById("b");
  greenButton = document.getElementById("g");
  yellowButton = document.getElementById("y");

  // Assign variable to game display
  levelSpace = document.getElementById("completedLevels");

  // Assign variables to start and stop buttons
  var startStopButton = document.getElementById("startStopButton");
  var strictSwitch = document.getElementById("strictSwitch");
  var resetButton = document.getElementById("resetButton");

  // Event listeners to trigger start and reset functions when buttons are clicked
  startStopButton.onclick = startGame;
  strictSwitch.onclick = toggleStrict;
  resetButton.onclick = resetGame;

  // Displays initial instructions to user
  levelSpace.innerHTML = "Press Start/Stop to Begin";
}

// Manage what happens when user clicks Start/Stop
function startGame() {
  levelSpace.innerHTML = "0";
  addToGameSequence();
  animateSequence(gameSequence);
}

// Play the gameSequence
function animateSequence() {
  playerSequence = [];

  var runCount = 0;
  function playSequence() {
    // Clear interval after gameSequence plays to end
    if (runCount >= gameSequence.length - 1) {
      listenToPlayer = true;
      clearInterval(intervalId);
    }

    // Animate the sequential buttons
    animate(gameSequence[runCount]);
    runCount += 1;
  }

  listenToPlayer = false;
  intervalId = setInterval(playSequence, 1000);
}

// When player resets game
function resetGame() {
  clearGame();
  levelSpace.innerHTML = "Press Start/Stop to Begin";
}

// Create a function which can add new random elements to an array.
function addToGameSequence() {
  var avaliableColors = [redButton, greenButton, blueButton, yellowButton];
  var newColor = avaliableColors[Math.floor(Math.random() * avaliableColors.length)];
  gameSequence.push(newColor);
}

// What happens when a button is clicked by the user
function pressColorButton(color) {
  if (listenToPlayer === true) {
    animate(color);
    playerSequence.push(color);

    if (!sequencesMatch() && strictMode) {
      gameLost();
    } else if (!sequencesMatch()) {
      wrongSequenceTryAgain();
    } else if (playerSequence.length === gameSequence.length && gameSequence.length === winningLevel) {
      gameWon();
    } else if (playerSequence.length === gameSequence.length) {
      incrementSuccess();
    }
  }
}

// What happens when user types inaccurate sequence
function wrongSequenceTryAgain() {
  animate(redButton);
  animate(blueButton);
  animate(greenButton);
  animate(yellowButton);
  playerSequence = [];
  levelSpace.innerHTML = "Wrong Sequence, try again";
  animateSequence();
}

// Checks if playersSequence matches gameSequence
function sequencesMatch() {
  for (var i = 0; i < playerSequence.length; i += 1) {
    if (playerSequence[i] !== gameSequence[i]) {
      return false;
    }
  }

  return true;
}

// How the animation works
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
    opacity += 0.1 * opacity;
    soundTheColor(element);
  }

  animateIntervalId = setInterval(fadeAnimation, 10);
}

// The resulting code for when a player provides correct sequence
function incrementSuccess() {
  playerSequence = [];
  addToGameSequence();
  currentLevel += 1;
  levelSpace.innerHTML = currentLevel;
  animateSequence(gameSequence);
}

// Toggles Strict Mode
function toggleStrict() {
  if (strictMode) {
    strictMode = false;
  } else if (!strictMode) {
    strictMode = true;
  }
}

// What happens when a game is won
function gameWon() {
  levelSpace.innerHTML = "Congratulations, You've Won";
  listenToPlayer = false;
  victorySound.play();
  clearGame();
}

// What happens when the game is lost
function gameLost() {
  levelSpace.innerHTML = "Game Over, You Achieved Level " + currentLevel + " Congratulations";
  listenToPlayer = false;
  defeatSound.play();
  clearGame();
}

// Clears the sequences, currentlevel and current animation sequence
function clearGame() {
  gameSequence = [];
  playerSequence = [];
  currentLevel = 0;
  clearInterval(intervalId);
}

// Play individual sound for each color
function soundTheColor(color) {
  if (color.id === "r") {
    redSound.play();
  } else if (color.id === "b") {
    blueSound.play();
  } else if (color.id === "g") {
    greenSound.play();
  } else if (color.id === "y") {
    yellowSound.play();
  }
}