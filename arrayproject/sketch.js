// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// hook physics
let gravity = 0; // velocity of hook
let bobberX = 50; // hook x coords
let bobberY = 50; // hook y coords

// missing variables (inspired by https://editor.p5js.org/gabriel.lee/sketches/a1BR-maEV)

// resistence/damper; makes the hook not a perpetual motion machine // velocity should be affected by resistance
// weight; the weight of the "hook" should play into it's resistence

// rod/fishing line logic
let fishLineDist; // distance from rod (mouse) to hook
let strain = 300; // maximum distance rod can extend // strain should have a threshold rather than a sole number, strain should be able...
// ...to extend farther than maximum before snapping

// if the fish pulls it cause the fishing line to fully extend, putting pressure on the line...
// two things could happen next!

// 1. small fish
// small fish will bounce back due to the strength of the fishing line, giving ample opportunity to reel it in...
// ...if the player reels in the fish before the fish begins to pull the hook, no pressure will be put on the fishing line

// 2. big fish and/or the "big one"
// big fish will bounce back momentarily (unless you begin reeling in first), but will put much more pressure on the fishing line...
// if the line snaps, you will lose money or score and get a new fishing rod.

// in theory if skilled enough you should be able to bungee almost any fish out of the water in one easy attempt.

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fishLine();
  bobber();

  // console.log(fishLineDist);
  console.log(gravity);
}

function bobber() {
  // fishLine(bobberX, bobberY, mouseX, mouseY);
  // fishLineDist = dist(bobberX, bobberY, mouseX, mouseY);
  fill(150);
  circle(bobberX, bobberY, 25);
  if (fishLineDist <= strain){
    gravity++;
    strain = strain + 0.1;
    bobberY = bobberY + gravity * 0.5;
  }
  else if (fishLineDist >= strain){
    gravity--;
    strain = strain - 0.1;
    bobberY = bobberY + gravity * 0.5;
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

function fishLine (){
  stroke(fishLineDist, 0, 0);
  line(bobberX, bobberY, mouseX, mouseY);
  fishLineDist = dist(bobberX, bobberY, mouseX, mouseY);
}

function fishLineTension(){

}


