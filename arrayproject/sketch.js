// arrayproject
// Rainn Morphy
// 10/15/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// inspired by https://editor.p5js.org/gabriel.lee/sketches/a1BR-maEV

// hook physics
let hook = {
  x: 0, // hook x coords
  y: 0, // hook y coords
  d: 25, // diameter of hook
  weight: 0, // weight of hook
  resistence: 0.5, // air resistence
  velocity: 5, // velocity/acceleration of hook
  state: "falling",
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
  rodTipX: 0,
  rodTipY: 0,
  rodBottom: 0,
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

let fishSchool = [];

let bgMusicLoop;

let fishImage;

let score = 0;

let fishToHookDist;

function preload() {
  soundFormats("mp3"); // setting the sound format
  bgMusicLoop = loadSound("assets/sounds/backgroundMusic.mp3"); // Loads Background Music 
  fishImage = loadImage("assets/graphics/dweebus.png");
}

function backgroundMusic() {
  bgMusicLoop.play();
  bgMusicLoop.loop(0, 0, 0, 10);
  bgMusicLoop.amp(0.3);
  userStartAudio();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundMusic(); // Calls the Background Music function
  for (let i = 0; i < 10; i++) {
    fishSpawn();
  }
  window.setInterval(fishSpawn, 5000); // spawns
  hook.x = width / 2;
  hook.y = height / 2;
}

function draw() {
  background(220);
  textSize(48);
  text(score, width / 2, height / 5);
  fishLineLogic();
  hookLogic();
  fishLogic();
}

function hookLogic() {
  fill(150);
  circle(hook.x, hook.y, hook.d);
  fishLine.rodTipX = mouseX;
  fishLine.rodTipY = mouseY;
  if (fishLine.dist < fishLine.maxLength) {
    hook.velocity++;
    hook.y = hook.y + hook.velocity;
  }
  else if (fishLine.dist > fishLine.maxLength) {
    hook.velocity = 0;
    hook.y = fishLine.rodTipY + fishLine.maxLength;
  }
  hook.x = fishLine.rodTipX;
  // else if (fishLine.dist < fishLine.maxLength) {
  //   hook.x = fishLine.rodTipX -20;
  // }


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

function mouseClicked() {
  hook.y = mouseY;
  hook.x = mouseX;
  hook.velocity = 5;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function fishLineLogic() {
  fishLineTension();
  line(hook.x, hook.y, fishLine.rodTipX, fishLine.rodTipY);
  fishLine.dist = dist(hook.x, hook.y, fishLine.rodTipX, fishLine.rodTipY);
}

function fishLineTension() {

  if (fishLine.dist >= fishLine.maxLength) {
    stroke(fishLine.dist - fishLine.maxLength, 0, 0);
  }
  else {
    stroke(0, 0, 0);
  }
}

function fishSpawn() {
  let someFish = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    timeX: random(100000000),
    timeY: random(100000000),
    deltaTime: 0.006,
  };
  fishSchool.push(someFish);
}


function fishLogic() {
  for (let fish of fishSchool) { // moves fish with noise
    fish.x = noise(fish.timeX) * width;
    fish.y = noise(fish.timeY) * height;

    fish.timeX += fish.deltaTime;
    fish.timeY += fish.deltaTime;
  }
  for (fish of fishSchool) { // displays the fish
    image(fishImage, fish.x, fish.y);
  }
  fishToHookDist = dist(hook.x, hook.y, fish.x, fish.y);
  if (fishToHookDist <= fishImage.width || fishToHookDist <= fishImage.height) {
    score += 10;
    let theIndex = fishSchool.indexOf(fish);
    fishSchool.splice(theIndex, 1);
  }
}

