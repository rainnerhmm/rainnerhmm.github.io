// importing images demo
// Sept 23rd, 2024

let hotdog;

function preload() {
  hotdog = loadImage("hotdog.jpg"); // Copied from relative path
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  // displays the hotdog, moves it with the mouse, and is scaled to half its normal size
  image(hotdog, mouseX, mouseY, hotdog.width * 0.5, hotdog.height * 0.5);
}
