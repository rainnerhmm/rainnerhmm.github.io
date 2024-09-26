// Interactive Scene
// Rainn Morphy
// September 25th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let key1 = 49;
let key2 = 50;
let key3 = 51;
let choices = ["rocks", "papers","scissors"];
let bgColor = [5, 0, 32];
let playerTurn = true;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgColor);
  keyTyped();
  oppenentTurn
}

function keyTyped(){
  if (keyIsDown(key1)) {
    fill(255);
    textAlign(LEFT);
    text(choices[0], width / 4, height / 2);
  }
  else if (keyIsDown(key2)) {
    fill(255);
    textAlign(LEFT);
    text(choices[1], width / 4, height / 2);
  }
  else if (keyIsDown(key3)) {
    fill(255);
    textAlign(LEFT);
    text(choices[2], width / 4, height / 2);
  }
}


function oppenentTurn(){
  if (playerTurn === false) {
    let oppselection = random(0,2);
    text(choices[Math.round(oppselection)], width / -4, height/2);
    playerTurn = true;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
