// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0;
let bobberX = 50;
let bobberY = 50;
let collison2 = {

};
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  bobber()
}

function bobber() {
  fill(150);
  circle(bobberX, bobberY, 25);
  gravity++;
  bobberY = bobberY + gravity * 0.5;
}
function mouseClicked(){
  bobberY = mouseY;
  bobberX = mouseX;
  gravity = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}