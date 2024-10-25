// states and timings demo
// Rainn Morphy
// Sept 24th, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()

let trafficState = "green"; // state of activated traffic light
let lastSwitchedTime = 0; // keeps trafficlights on time

const GREEN_DURATION = 3000; // greenlight is activated for 3 seconds
const AMBER_DURATION = 1000; // amberlight is activated for 3 seconds
const RED_DURATION = 4000; // redlight is activated for 3 seconds

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  trafficBox(); // displays the trafficlight box
  swapTrafficState(); // swaps which trafficlight is activated
  trafficLights(); // displays activated trafficlight
}

function swapTrafficState() {
  if (trafficState === "green" && millis() > lastSwitchedTime + GREEN_DURATION) {
    trafficState = "amber";
    lastSwitchedTime = millis(); // resets timer from current millisecond
    console.log(trafficState);
  }
  else if (trafficState === "amber" && millis() > lastSwitchedTime + AMBER_DURATION) {
    trafficState = "red";
    lastSwitchedTime = millis(); // resets timer from current millisecond
    console.log(trafficState);
  }
  else if (trafficState === "red" && millis() > lastSwitchedTime + RED_DURATION) {
    trafficState = "green";
    lastSwitchedTime = millis(); // resets timer from current millisecond
    console.log(trafficState);
  }
}

function trafficLights() {
  if (trafficState === "green") {
    fill(4, 231, 98); // shade of green
    ellipse(width / 2, height / 2 + 65, 50, 50); // bottom/green
  }
  else if (trafficState === "amber") {
    fill(234, 196, 53); // shade of yellow
    ellipse(width / 2, height / 2, 50, 50); // middle/amber
  }
  else if (trafficState === "red") {
    fill(220, 0, 115); // shade of red
    ellipse(width / 2, height / 2 - 65, 50, 50); // top/red
  }
}

function trafficBox() {
  // trafficbox
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10); // shade of black

  // trafficlights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); // top

  ellipse(width / 2, height / 2, 50, 50); // middle

  ellipse(width / 2, height / 2 + 65, 50, 50); // bottom
}





