// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
key1 = 49
key2 = 50
key3 = 51
choices = ["rock", "paper","scissors"];
let  bgColor = [5, 0, 32];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgColor)
  rockVar()
}

function rockVar() {
  if (keyIsDown(key1)) {
    fill(255)
    text("rocks", windowWidth/2, windowHeight/2)
  }
  else if (keyIsDown(key2)) {
    fill(255)
    text("papers", windowWidth/2, windowHeight/2)
  }
  else if (keyIsDown(key3)) {
    fill(255)
    text("scissors", windowWidth/2, windowHeight/2)
  }
}


