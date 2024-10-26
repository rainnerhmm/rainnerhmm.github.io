// importing sound and music demo
// Rainn Morphy
// Oct 16th, 2024

// a good place to find good, royalty free assets;
// https://opengameart.org/

let loopinMusic;
let clickinSound;

function preload() {
  // https://opengameart.org/content/5-chiptunes-action
  loopinMusic = loadSound("assets/backgroundMusic.wav"); // [Retro Game Music Pack] Level 3' by Juhani Junkala

  // https://opengameart.org/content/ui-sound-effects-pack
  clickinSound = loadSound("assets/selectionSound.wav"); // 'MENU A_Select' by ViRiX (David Mckee)
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // sets volume between 0%-100%/0-1
  loopinMusic.amp(0.3);
  clickinSound.amp(1.0);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (!loopinMusic.isPlaying()) {
    loopinMusic.loop(); // loops music indefinitely when over
  }
}

function mousePressed() {
  clickinSound.play(); // will play selection sound on click
}
