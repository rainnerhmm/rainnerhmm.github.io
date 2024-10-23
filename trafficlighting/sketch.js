// states and timings demo
// Rainn Morphy
// Sept 24th, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()

let trafficState = "green";
let lastSwitchedTime = 0;

const GREEN_DURATION = 3000;
const AMBER_DURATION = 1000;
const RED_DURATION = 4000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  swapState();
  trafficLights();
}

function swapState() {
  if (trafficState === "green" && millis() > lastSwitchedTime + GREEN_DURATION) {
    trafficState = "amber";
    lastSwitchedTime = millis();
    console.log(trafficState);
  }
  else if (trafficState === "amber" && millis() > lastSwitchedTime + AMBER_DURATION) {
    trafficState = "red";
    lastSwitchedTime = millis();
    console.log(trafficState);
  }
  else if (trafficState === "red" && millis() > lastSwitchedTime + RED_DURATION) {
    trafficState = "green";
    lastSwitchedTime = millis();
    console.log(trafficState);
  }
}

function trafficLights() {
  if (trafficState === "green") {
    fill(220, 0, 115); // shade of green
    ellipse(width / 2, height / 2 + 65, 50, 50);
  }
  else if (trafficState === "amber") {
    fill(234, 196, 53); // shade of yellow
    ellipse(width / 2, height / 2, 50, 50);
  }
  else if (trafficState === "red") {
    fill(4, 231, 98); // shade of red
    ellipse(width / 2, height / 2 - 65, 50, 50);
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); // top

  ellipse(width / 2, height / 2, 50, 50); // middle

  ellipse(width / 2, height / 2 + 65, 50, 50); // bottom
}





