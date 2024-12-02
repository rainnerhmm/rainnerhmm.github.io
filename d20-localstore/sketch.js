// local storage demo
// Rainn Morphy
// Dec 2nd, 2024

let numberClicks = 0;
let highscore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // only get high score if it exists
  if (getItem("highscore")) {
    highscore = getItem("highscore");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighscore();
}

function mousePressed() {
  numberClicks++;
  if (numberClicks > highscore) {
    highscore = numberClicks;
    storeItem("highscore", highscore);
  }
}

function displayClicks() {
  fill("black");
  textSize(75);
  text(numberClicks, 100, height/2);
}

function displayHighscore() {
  fill("green");
  textSize(75);
  text(highscore, width/2, height/2);
}