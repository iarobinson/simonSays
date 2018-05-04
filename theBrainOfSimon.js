// Does the game listen to user input?
var gameSequence = [];
var playerSequence = [];
var listenToPlayer = false;

window.onload = init();

function init() {
  addToGameSequence();
}

// What happens when a button is clicked
function buttonClicked(color) {
  if (listenToPlayer) {
    console.log(typeof color, "<-typeof color", color, "<- color");
    animate(color);
    checkSequence();
  }
}

function startOrStopGame() {
  playSequence();
}

function resetGame() {
  gameSequence = [];
}

// This function plays the randomly selected sequence for user to watch
function playSequence() {
  var intervalId;
  var runCount = 0;

  function playSequence() {    
    // Clear interval after gameSequence is played
    if (runCount >= gameSequence.length - 1) {
      clearInterval(intervalId);
    }
    
    // The problem is here.
    // I need to convert the string array element to a clickable element
    var formatted = '<a onclick="buttonClicked(this);"><div id="' + gameSequence[runCount] + '" class="mainGameButton" style="display: block; opacity: 1.08347;"></a>';
    
    animate(formatted);
    runCount += 1;
  }

  var intervalId = setInterval(playSequence, 1000);
}

function addToGameSequence() {
  var avaliableColors = ['r', 'g', 'b', 'y'];
  var newColor = avaliableColors[Math.floor(Math.random() * avaliableColors.length)];
  gameSequence.push(newColor);
}

// This will test playerSequence against gameSequence
function checkSequence(playerSequence, gameSequence) {
  if (playerSequence.length === 0) {
    return true;
  } else {
    for (var i = 0; i < playerSequence.length; i += 1) {
      if (playSequence[i] !== gameSequence[i]) {
        return false;
      }
    }
  }
  
  return true;
}

function animate(element) {
  var animateIntervalId;
  var opacity = 0.1;  // initial opacity
  console.log(typeof element, "<-typeof element", element, "<- element")
  element.style.display = 'block'; // <- PROBLEM
  
  function fadeAnimation() {
    if (opacity >= 1){
        clearInterval(animateIntervalId);
    }
    
    element.style.opacity = opacity;
    element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
    opacity += .5 * opacity;
  }
  
  var animateIntervalId = setInterval(fadeAnimation, 10);
}
