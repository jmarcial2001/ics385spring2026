// Jonas Marcial ICS 385
// Simon Game - ttutorial + starting Level + volume Slider
//
// 1) tutorial mode has 2 steps:
//    - Step 1: watch demo pattern
//    - Step 2: gamer repeat demo pattern (with feedback)
// 2) starting level is configurable (we start at LEVEL 3 by default)
// 3) volume slider controls all game sounds (0% to 100%)

// game constants, settings
var buttonColours = ["red", "blue", "green", "yellow"];

/*
  starting level boost
  - change this to 1 for classic Simon start
  - keeping it at 3 makes the game feel more "game-y" right away
  // AI-generated
*/
var STARTING_LEVEL = 3;

// sound settings

// default volume (0.0 to 1.0). Slider will update this.
var volume = 0.7;

// game state
var userClickedPattern = [];

var started = false;
var tutorialActive = false;
var userCanClick = false;

var level = 0;
var bestLevel = 0;

// tutorial state
var tutorialPattern = ["green", "red", "yellow"];
var tutorialUserPattern = [];
var tutorialStep = 0; // 0 = not started, 1 = watch, 2 = user tries

// volume slider handler

// when slider moves, update volume + show percent text
// AI-generated
$("#volume").on("input", function () {
  var val = Number($(this).val()); // 0..100
  $("#volume-value").text(val + "%");
  volume = val / 100; // convert to 0.0..1.0
});

// start options
// AI-generated

// press any key, skip tutorial and start game
$(document).keypress(function () {
  if (!started && !tutorialActive) {
    $("#helper-text").text("Skipping tutorial... Good luck!");
    startGame();
  }
});

// click button, run tutorial first
// AI-generated
$("#start-tutorial").click(function () {
  if (!started && !tutorialActive) {
    runTutorial();
  }
});

// handle button clicks
$(".btn").click(function () {

  // if tutorial is running, handle tutorial clicks
  if (tutorialActive && tutorialStep === 2) {
    handleTutorialClick($(this).attr("id"));
    return;
  }

  // if game is running, handle gameplay clicks
  if (!started || tutorialActive || !userCanClick) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// tutorial mode, 2 steps
// AI-generated
function runTutorial() {
  tutorialActive = true;
  tutorialStep = 1;
  tutorialUserPattern = [];
  userCanClick = false;

  $("#level-title").text("Tutorial Mode");
  $("#helper-text").text("Step 1: Watch the demo pattern...");
  $("#start-tutorial").hide();

  // Step 1: show the pattern
  playPattern(tutorialPattern, function () {
    // Step 2: user repeats pattern
    tutorialStep = 2;
    tutorialUserPattern = [];

    $("#helper-text").text("Step 2: Now YOU try it! Click the same pattern.");
    userCanClick = true; // allow clicking for tutorial
  });
}

// called when user clicks buttons during tutorial Step 2
function handleTutorialClick(color) {
  if (!userCanClick) return;

  tutorialUserPattern.push(color);

  playSound(color);
  animatePress(color);

  var index = tutorialUserPattern.length - 1;

  // check if user is correct so far
  if (tutorialUserPattern[index] !== tutorialPattern[index]) {
    // wrong during tutorial -> encourage + try again
    playSound("wrong");
    $("#helper-text").text("Almost! Try again: click the same pattern.");
    tutorialUserPattern = [];
    return;
  }

  // if they finished the whole tutorial pattern correctly
  // AI-generated
  if (tutorialUserPattern.length === tutorialPattern.length) {
    userCanClick = false;
    $("#helper-text").text("Perfect! Starting the real game...");
    setTimeout(function () {
      tutorialActive = false;
      tutorialStep = 0;
      startGame();
    }, 900);
  }
}

// plays a pattern one-by-one
// AI-generated
function playPattern(patternArray, callback) {
  var i = 0;
  userCanClick = false;

  function step() {
    if (i >= patternArray.length) {
      if (callback) callback();
      return;
    }

    var color = patternArray[i];
    flashColor(color);

    i++;
    setTimeout(step, 700);
  }

  step();
}


// game start with starting level
// AI-generated

function startGame() {
  started = true;
  tutorialActive = false;
  userCanClick = false;

  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  $("#start-tutorial").hide();
  $("#helper-text").text("Watch the pattern, then repeat it.");

  /*
    starting level boost
    generate STARTING_LEVEL steps immediately
    so the player begins at that level

    Example:
    STARTING_LEVEL = 3 -> pattern starts with 3 colors
    // AI-generated
  */
  for (var i = 0; i < STARTING_LEVEL; i++) {
    addRandomColorToPattern();
  }

  level = STARTING_LEVEL;
  $("#level-title").text("Level " + level);

  playPattern(gamePattern, function () {
    userClickedPattern = [];
    userCanClick = true;
  });

  updateBestLevel();
}

// check user answer
// AI-generated
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      userCanClick = false;
      setTimeout(function () {
        nextSequence();
      }, 900);
    }
  } else {
    gameOver();
  }
}

// next level
// AI-generated
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  addRandomColorToPattern();

  playPattern(gamePattern, function () {
    userCanClick = true;
  });

  updateBestLevel();
}

// adds one random color to the gamePattern
// AI-generated
function addRandomColorToPattern() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
}

// flash + sound for a single color
// AI-generated
function flashColor(color) {
  $("#" + color).fadeIn(120).fadeOut(120).fadeIn(120);
  playSound(color);
}

// GAME OVER
// AI-generated
function gameOver() {
  playSound("wrong");

  $("body").addClass("game-over");
  $("#level-title").text("Game Over! Press Any Key to Restart");
  $("#helper-text").text("Tip: Use the tutorial if you're new.");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  started = false;
  tutorialActive = false;
  userCanClick = false;

  $("#start-tutorial").show();
}

// best level tracker
// AI-generated
function updateBestLevel() {
  if (level > bestLevel) {
    bestLevel = level;
    $("#best-level").text(bestLevel);
  }
}


// button press animation
// AI-generated
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// sound effecs with volume control
// AI-generated

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  // apply the slider volume (0.0 to 1.0)
  audio.volume = volume;

  audio.play();
}
