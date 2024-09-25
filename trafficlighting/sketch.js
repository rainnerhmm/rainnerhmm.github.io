// Traffic Lighting
// Rainn Morphy
// September 24th, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()

let trafficState = ["green", "yellow", "red"];
let lastSwitchedTime = 0;
let waitTime = 2000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  swapState();
  trafficLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top

  ellipse(width/2, height/2, 50, 50); //middle

  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function trafficLights(){
  if (trafficState === "red"){
    //top
    fill(220, 0, 115);
    ellipse(width/2, height/2 - 65, 50, 50); 
  }
  else if (trafficState === "yellow"){
    //middle
    fill(234, 196, 53);
    ellipse(width/2, height/2, 50, 50);
  }
  else if (trafficState === "green"){
    //bottom
    fill(4, 231, 98);
    ellipse(width/2, height/2 + 65, 50, 50);
  }
}

function swapState(){    
  trafficState = trafficState[0];
  if (millis() > lastSwitchedTime + waitTime) {

    lastSwitchedTime = millis();
  }
}



