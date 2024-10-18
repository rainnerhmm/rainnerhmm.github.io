// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// hook physics
let hook = {
  x: 50, // hook x coords
  y: 50, // hook y coords
  d: 25, // diameter of hook
  weight: 0, // 
  resistence: 0, 
  velocity: 5, // velocity of hook
};

// missing variables (inspired by https://editor.p5js.org/gabriel.lee/sketches/a1BR-maEV)

// resistence/damper; makes the hook not a perpetual motion machine // velocity should be affected by resistance
// weight; the weight of the "hook" should play into it's resistence

// diameter/radius > weight > resistence > velocity

// if underwater > increase resistence > slows velocity

// if fish attaches > increases weight > increases resistence > slows velocity

// rod/fishing line logic
let rodHookDist; // distance from rod (mouse) to hook
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
  hook2();

  // console.log(rodHookDist);
  console.log(hook.velocity);
}

function hook2() {
  // fishLine(hook.x, hook.y, mouseX, mouseY);
  // rodHookDist = dist(hook.x, hook.y, mouseX, mouseY);
  fill(150);
  circle(hook.x, hook.y, hook.d);
  if (rodHookDist <= strain){ // going down
    hook.velocity++;
    strain = strain + 0.1;
    hook.y = hook.y + hook.velocity;
  }
  else if (rodHookDist >= strain){ // going up
    hook.velocity--;
    strain = strain - 0.1;
    hook.y = hook.y + hook.velocity;
  }
}
function mouseClicked(){
  hook.y = mouseY;
  hook.x = mouseX;
  hook.velocity = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function fishLine (){
  stroke(rodHookDist, 0, 0);
  line(hook.x, hook.y, mouseX, mouseY);
  rodHookDist = dist(hook.x, hook.y, mouseX, mouseY);
}

function fishLineTension(){

}


