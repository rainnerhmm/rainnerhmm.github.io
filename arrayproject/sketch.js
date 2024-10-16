// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0;
let bobberY = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  bobber();
  ground();
}

function bobber() {
  fill(255,0,0);
  circle(50, bobberY, 25);
  if (bobberY < height-250){
    gravity++;
    bobberY = bobberY + gravity * 2;
  } 
}

function ground() {
  fill(0, 255, 0);
  rect(0, height-200, width, 200)
}