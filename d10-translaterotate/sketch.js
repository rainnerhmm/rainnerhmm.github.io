// Project Title
// Rainn Morphy
// Oct 17th, 2024

const SQUARESIZE = 100;
const RECTANGLESIZE = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push(); // save the transformation matrix
  translate(200, 200);
  rotate(mouseX);
  fill("red");
  square(0, 0, SQUARESIZE);
  pop(); // return to previous transformation

  fill("green");
  rect(width/2, height -200, width *2, RECTANGLESIZE);
}
