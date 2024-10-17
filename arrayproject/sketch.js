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
let lineDist;
let strain = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  bobber();
  // console.log(lineDist);
  console.log(strain)
}

function bobber() {
  line(bobberX, bobberY, mouseX, mouseY);
  lineDist = dist(bobberX, bobberY, mouseX, mouseY);
  fill(150);
  circle(bobberX, bobberY, 25);
  if (lineDist <= strain){
    gravity++;
    strain = strain + 0.1;
    bobberY = bobberY + gravity * 0.5;
  }
  else if (lineDist >= strain){
    gravity--;
    strain = strain - 0.1;
    bobberY = lineDist * strain;
  }
}
function mouseClicked(){
  bobberY = mouseY;
  bobberX = mouseX;
  gravity = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}