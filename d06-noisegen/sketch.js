// noise generation demo
// Rainn Morphy
// Oct 7th, 2024

const SNITCH_SIZE = 20;

let snitch = {
  
  // null is equivalent to using ';' in place of an actual value
  x: null,
  y: null,

  time: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  snitch.x = width/2;
  snitch.y = height/2;
}

function draw() {
  background(220);

  // moving the snitch using noise
  snitch.x = noise(snitch.time) * width;
  snitch.y = noise(snitch.time + 1000) * height;

  // displaying the snitch
  fill("yellow");
  circle(snitch.x, snitch.y, SNITCH_SIZE);

  // snitch timer
  snitch.time += 0.01;
}
