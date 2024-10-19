// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// inspired by https://editor.p5js.org/gabriel.lee/sketches/a1BR-maEV

// hook physics
let hook = {
  x: 50, // hook x coords
  y: 50, // hook y coords
  d: 25, // diameter of hook
  weight: 0, // weight of hook
  resistence: 0, // air resistence
  velocity: 5, // velocity of hook
};
// resistence/damper; makes the hook not a perpetual motion machine // velocity should be affected by resistance
// weight; the weight of the "hook" should play into it's resistence

// diameter/radius > weight > resistence > velocity

// if underwater > increase resistence > slows velocity

// if fish attaches > increases weight > increases resistence > slows velocity

// rod/fishing line logic
let fishLine = {
  dist: 0, // distance from rod (mouse) to hook
  maxLength: 300, // the maximum distance the line can extend without straining

};
// maximum distance rod can extend // strain should have a threshold rather than a sole number, strain should be able...
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

  fishLine2();
  hook2();

  // console.log(fishLine.dist);
  textSize(48);
  text(fishLine.dist, width/2, height/2);
}

// 

function hook2() {
  fill(150);
  circle(hook.x, hook.y, hook.d);
  hook.y = hook.y + hook.velocity;
  hook.velocity++;
  if (fishLine.maxLength <= fishLine.dist){
    hook.velocity--;
    hook.y = hook.y - hook.velocity;
  }
  // if (fishLine.dist <= fishLine.maxLength){ // going down
  //   hook.velocity++;
  //   fishLine.maxLength = fishLine.maxLength + 0.1;
  //   hook.y = hook.y + hook.velocity;
  // }
  // else if (fishLine.dist >= fishLine.maxLength){ // going up
  //   hook.velocity--;
  //   fishLine.maxLength = fishLine.maxLength - 0.1;
  //   hook.y = hook.y + hook.velocity;
  // }

}
function mouseClicked(){
  hook.y = mouseY;
  hook.x = mouseX;
  hook.velocity = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function fishLine2 (){
  fishLineTension();
  line(hook.x, hook.y, mouseX, mouseY);
  fishLine.dist = dist(hook.x, hook.y, mouseX, mouseY);
}

function fishLineTension(){

  if (fishLine.dist >= fishLine.maxLength) {
    stroke(fishLine.dist-fishLine.maxLength, 0, 0);
  }
  else {
    stroke(0, 0, 0);
  }
}


