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
let player;
let enemy;
let referee;
let startVar = true;

function preload() {
  soundFormats("mp3"); // setting the sound format
  musicVar = loadSound("assets/sounds/backgroundMusic.mp3"); // Loads Background Music (Music is 'Tentacular Circus' from the Splatoon Series)

  startButton = loadImage("assets/graphics/startButton.gif"); // Loads the Start Button animation for title screen
  player = loadImage("assets/graphics/player.png") // Loads the player graphic for title screen
  enemy = loadImage("assets/graphics/enemy.png") // Loads the enemy graphic for title screen
  referee = loadImage("assets/graphics/referee.png") // Loads the referee graphic for later
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundMusic(); // Calls the Background Music function
}

function draw() {
  background(bgColor);
  startScreen();
  rpsMove();
  // oppenentTurn;
}
function backgroundMusic() {
  musicVar.play();
  musicVar.loop();
  musicVar.setVolume(0.3);
  userStartAudio();
}
function startScreen() {
  if (startVar === true) {
    imageMode(CENTER);
    image(startButton, width/1.3, height/1.5, startButton.width / 2, startButton.height / 2)
    image(enemy, 450, 450, enemy.width, enemy.height)
    rotate(-0.35);
    image(player, width/-7, height/1.15, player.width*1.6, player.height*1.6)
  }
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
  if (startVar === true){
    startVar = false;
    playerTurn = true;
  }
  else if (playerTurn === true) {
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