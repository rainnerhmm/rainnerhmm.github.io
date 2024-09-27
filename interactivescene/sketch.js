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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgColor);
  rpsMove();
  // oppenentTurn;
}

function rpsMove() {
  if (rocks === true) {
    fill(255);
    textAlign(LEFT);
    text(choices[0], width / 4, height / 2);
  }
}

//   fill(255);
//   textAlign(LEFT);
//   text(choices[1], width / 4, height / 2);


//   fill(255);
//   textAlign(LEFT);
//   text(choices[2], width / 4, height / 2);
// }

function keyTyped() {
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