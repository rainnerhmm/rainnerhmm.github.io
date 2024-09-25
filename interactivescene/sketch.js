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
  temp();
  keyTyped()
}

function keyTyped(){
  if (key === key3){
    fill(255);
    text(choices[2], windowWidth/2, windowHeight/2);
    playerTurn = false
  }
}

function temp() {
  if (playerTurn === true) {
    if (keyIsDown(key1)) {
      fill(255);
      text(choices[0], windowWidth/2, windowHeight/2);
    }
    else if (keyIsDown(key2)) {
      fill(255);
      text(choices[1], windowWidth/2, windowHeight/2);
    }
    else if (keyIsDown(key3)) {
      fill(255);
      text(choices[2], windowWidth/2, windowHeight/2);
    }
  }
}

function temp2(){
  if (playerTurn === false) {
    let oppselection = random(0,2);
    text(choices[Math.round(oppselection)], windowWidth/2, windowHeight/2);
    playerTurn = true;
  }
}

