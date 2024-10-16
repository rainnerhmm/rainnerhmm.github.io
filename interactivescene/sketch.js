// Interactive Scene
// Rainn Morphy
// September 25th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 1's keycode is 49
// 2's keycode is 50
// 3's keycode is 51

const playerChoices = ["rocks", "papers", "scissors"];
const enemyChoices = structuredClone(playerChoices);
const bgColor = [5, 0, 32];

let rocks = false;
let papers = false;
let scissors = false;
let playerTurn = true;
let musicVar;
let startButton;
let player;
let enemy;
let referee;
let startVar = true;
let battleVar = false;
let sideSwitch = ["LEFT", "RIGHT"];
let selection = 0;
let randNum;
let widthScaler;
let heightScaler;


function preload() {
  soundFormats("mp3"); // setting the sound format
  musicVar = loadSound("assets/sounds/backgroundMusic.mp3"); // Loads Background Music (Music is 'Tentacular Circus' from the Splatoon Series)

  startButton = loadImage("assets/graphics/startButton.gif"); // Loads the Start Button animation for title screen
  player = loadImage("assets/graphics/player.png"); // Loads the player graphic for title screen
  enemy = loadImage("assets/graphics/enemy.png"); // Loads the enemy graphic for title screen
  referee = loadImage("assets/graphics/referee.png"); // Loads the referee graphic for later
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundMusic(); // Calls the Background Music function
  widthScaler = 0.25 * width;
  heightScaler = 0.25 * height;
}

function draw() {
  background(bgColor);
  startScreen();
  battleScreen();
  rpsPlayerMove();
  rpsLogic();
}

function backgroundMusic() {
  musicVar.play();
  musicVar.loop();
  musicVar.amp(0.3);
  userStartAudio();
}

function startScreen() {
  if (startVar === true) {

    image(startButton, width/1.6, height/2.5, widthScaler, heightScaler); //centers start button vertically, and aligns to the right horizontally
    rotate(-0.35);
    image(player, width/-8, height/1.15, player.width*1.6, player.height*1.6); // semi-centers horizontally, and aligns to the bottom
    rotate(3.15);
    image(enemy, width/-1.13, height/-1.45, enemy.width*1.6, enemy.height*1.6); // semi-centers horizontally, and aligns to the top
  }
}

function battleScreen(){
  playerTurn = true;
  if (battleVar === true) {
    image(player, width/4, height/2, player.width, player.height);
  }
}
function rpsPlayerMove() {
  if (rocks === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(playerChoices[0], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
  else if (papers === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(playerChoices[1], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
  else if (scissors === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(playerChoices[2], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
}

function rpsEnemyMove() {
  text(playerChoices[randNum], width / 2, height / 2);
  console.log(randNum);
}

function keyTyped() {
  if (startVar === true){
    startVar = false;
    battleVar = true;
  }
  else if (playerTurn === true) {
    rocks = false;
    papers = false;
    scissors = false;
    randNum = Math.round(random(0,2));
    // rpsEnemyMove();
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  widthScaler = 0.25 * width;
  heightScaler = 0.25 * height;
}

function rpsLogic() {
  if (rocks === true && randNum === 0){
    text("rocktie", width / 2, height / 4);
  }
  else if (papers === true && randNum === 1){
    text("papertie", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 2){
    text("scissorstie", width / 2, height / 4);
  }
  else if (rocks === true && randNum === 1){
    text("p2 paperwin", width / 2, height / 4);
  }
  else if (rocks === true && randNum === 2){
    text("p1 rockwin", width / 2, height / 4);
  }
  else if (papers === true && randNum === 0){
    text("p1 paperwin", width / 2, height / 4);
  }
  else if (papers === true && randNum === 2){
    text("p2 scissorwin", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 0){
    text("p2 rockwin", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 1){
    text("p1 scissorwin", width / 2, height / 4);
  }
  playerTurn = true;
}