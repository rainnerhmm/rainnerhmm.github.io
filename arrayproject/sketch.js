// arrayproject
// Rainn Morphy
// 10/15/2024

// Extra for Experts:
// - Nothing is truly 'Extra for Experts' with how half-baked everything is, if had my physics had...
//   ...worked out, possibly I could consider that my 'Extra for Experts', but in it's current state...
//   ...I believe any 'Extra for Experts' marks is undeserved.

// This Project Features 2 objects, accounting various aspects for the physics of the rod and hook...
// ...and a 1 array accounting for the fishes' circle of life (spawning and despawning)

// ocassionally inspired by https://editor.p5js.org/gabriel.lee/sketches/a1BR-maEV

// variables
// hook physics
let hook = {
  x: 0, // hook x coords
  y: 0, // hook y coords
  d: 25, // diameter of hook (was orginally a circle)
  weight: 0, // weight of hook
  resistence: 0.5, // air resistence
  velocity: 5, // velocity/acceleration of hook
  image: 0, // the hook graphic
};

// fishing rod and line variables
let fishLine = {
  dist: 0, // distance from rod (mouse) to hook
  maxLength: 300, // the maximum distance the line can extend without straining

  // the tip of the rod 
  rodTipX: 0,
  rodTipY: 0,

  rodBottom: 0, // where your mouse was intended to be on the rod
};

let bgMusicLoop; // the global variable for the background music

// fish variables
let fishSchool = []; // the array where spawned fish get added to
let fishImage; // the fish graphic
let fishToHookDist; // the distance between the fish and hook

let score = 0; // a hastily added score variable
// would have used an array to make a top 5 leaderboard with more time

let gameState = 'title'; // switches to title state and playing state
let titleImage; // the title graphic
let clickCounter = 0; // to activate music without changing 'gameState'

// functions
function preload() {
  soundFormats("mp3"); // setting the sound format
  bgMusicLoop = loadSound("assets/sounds/backgroundMusic.mp3"); // preloads background music
  fishImage = loadImage("assets/graphics/redFishImage.png"); // preloads the fish graphic
  hook.image = loadImage("assets/graphics/hookImage.png"); // preloads the hook graphic
  titleImage = loadImage("assets/graphics/titleImage.png"); // preloads the title graphic
  // 'fishImage' and 'hook.image' are taken from Wii Play by Nintendo
}

function backgroundMusic() {  // "Let's Go Fishing" from Ultimate Angler/Streetpass Fishing by Nintendo
  bgMusicLoop.play(); // starts the music
  bgMusicLoop.loop(0, 0, 0, 10); // attempt to loop without intro
  bgMusicLoop.amp(0.3); // sets the volume

  // planned to use array to have a 'jukebox' to change music
} // attempted to seperate intro to song from loop, broken as far as I know

function setup() {
  createCanvas(windowWidth, windowHeight);

  // obviously heavily referenced from the bubbles demo
  for (let i = 0; i < 5; i++) { // spawns 10 fish when beginning
    fishSpawn();
  }
  window.setInterval(fishSpawn, 5000); // spawns the fish every 5 seconds
  // plan was for the fish to spawn from the sky, swim back and forth, and if in it's radius...
  // ...attempts to bite.
}

function draw() {
  background(220);
  textSize(48); // sets text size
  textFont('Comic Sans MS'); // sets text font

  if (gameState === 'playing') {
    text(score, width / 2, height / 5); // displays score
    fishLogic();
  }
  else {
    image(titleImage, width / 2, height / 5); // displays title graphic
    text("click your mouse", width / 6, height / 2); // displays title prompt
  }
  fishLineLogic();
  hookLogic();
}

function hookLogic() { // displays and calculates the hook's physics
  // displays hook
  image(hook.image, hook.x, hook.y, hook.d, hook.d); // hook position is off

  fishLine.rodTipX = mouseX; // currently the 'tip' of the rod is the mouse, but originally...
  fishLine.rodTipY = mouseY; // ...the bottom of the rod was planned to be where the mouse was

  // physics
  if (fishLine.dist < fishLine.maxLength) { // causes the hook to fall
    hook.velocity++;
    hook.y = hook.y + hook.velocity;
  }

  else if (fishLine.dist > fishLine.maxLength) { // causes the hook to not continue falling
    hook.velocity = 0;
    hook.y = fishLine.rodTipY + fishLine.maxLength;
  }

  hook.x = fishLine.rodTipX; // follows the mouses' x position, intended to be effected by resistence
}

function mouseClicked() { // handles starting the background music
  clickCounter += 1;
  if (!bgMusicLoop.isPlaying()) {
    backgroundMusic(); // Calls the Background Music function
  }
  if (clickCounter === 2) {
    gameState = 'playing';
  }
}
function windowResized() { // will reposition assets when changing screen size
  resizeCanvas(windowWidth, windowHeight);
}

function fishLineLogic() { // essentially just the code to connect the line from the hook to the mouse
  fishLineTension();
  line(hook.x - 5, hook.y, fishLine.rodTipX, fishLine.rodTipY);
  fishLine.dist = dist(hook.x, hook.y, fishLine.rodTipX, fishLine.rodTipY);
}

function fishLineTension() { // turns the fish line red if exceeding max length
  if (fishLine.dist >= fishLine.maxLength) {
    stroke(fishLine.dist - fishLine.maxLength, 0, 0);
  }
  else {
    stroke(0, 0, 0);
  } // fish were orginally intended to weigh you down, causing tension to the fish line
}

function fishSpawn() { // spawns fish, heavily referenced from bubble demo
  let someFish = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    timeX: random(100000000), // generates numbers for noise on the x axis
    timeY: random(100000000), // generates numbers for noise on the y axis
    deltaTime: 0.006,
  };
  fishSchool.push(someFish);
}


function fishLogic() { // various aspects about the fish, heavily referenced from bubble demo
  // moves fish with noise 
  for (let fish of fishSchool) {
    fish.x = noise(fish.timeX) * width;
    fish.y = noise(fish.timeY) * height;

    fish.timeX += fish.deltaTime;
    fish.timeY += fish.deltaTime;
  }

  // displays the fish
  for (fish of fishSchool) {
    image(fishImage, fish.x, fish.y);
  } // orignally intended to use array to have a variety of fish

  // fish hit detection (very buggy)
  fishToHookDist = dist(hook.x, hook.y, fish.x, fish.y); // calculates distance of fish to hook

  if (fishToHookDist <= fishImage.width || fishToHookDist <= fishImage.height) {
    score += 1; // increases score by 1

    // handles life and death of the fish
    let index = fishSchool.indexOf(fish);
    fishSchool.splice(index, 1);
  }
}

