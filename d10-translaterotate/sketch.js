// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angleDeg; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push(); // save the transformation matrix
  if (mouseX === width){
    angleDeg = 0;
  }
  else{
    angleDeg = mouseX;
  }
  translate(200, 200);
  rotate(angleDeg);
  fill("red");
  square(0, 0, 100);
  pop(); // return to previous transformation

  fill("green");
  rect(width/2, height -200, width *2, 400);

}
