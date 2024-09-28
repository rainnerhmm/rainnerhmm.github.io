// Interactive Scene
// Rainn Morphy
// September 25th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 1's keycode is 49
// 2's keycode is 50
// 3's keycode is 51
let choices = ["rocks", "papers", "scissors"];
let bgColor = [5, 0, 32];
let textOnScreen = false;
let rocks = false;
let papers = false;
let scissors = false;
let optionChosen = false;
let playerTurn = true;
let musicVar;
let startButton;

function preload() {
  soundFormats("mp3");
  musicVar = loadSound("assets/sounds/backgroundMusic.mp3");
  startButton = loadImage("assets/graphics/startButton.gif")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundMusic();
}

function draw() {
  background(bgColor);
  startScreen();
  // rpsMove();
  // oppenentTurn;
}
function backgroundMusic() {
  musicVar.play();
  musicVar.loop();
  musicVar.setVolume(0.3);
  userStartAudio();
}
function startScreen() {
  imageMode(CORNER);
  image(startButton, 875, 530, startButton.width/2, startButton.height/2)
}
function rpsMove() {
  if (rocks === true) {
    fill(255);
    textAlign(LEFT);
    text(choices[0], width / 4, height / 2);
    playerTurn = false;
  }
  else if (papers === true) {
    fill(255);
    textAlign(LEFT);
    text(choices[1], width / 4, height / 2);
    playerTurn = false;
  }
  else if (scissors === true) {
    fill(255);
    textAlign(LEFT);
    text(choices[2], width / 4, height / 2);
    playerTurn = false;
  }
}

function keyTyped() {
  if (playerTurn === true) {
    if (keyCode === 49) {
      rocks = true;
    }
    else if (keyCode === 50) {
      papers = true;
    }
    else if (keyCode === 51) {
      scissors = true;
    }
  }
}

// function oppenentTurn(){
//   if (playerTurn === false) {
//     let oppselection = random(0,2);
//     text(choices[Math.round(oppselection)], width / -4, height/2);
//     playerTurn = true;
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function rpsLogic() {
}