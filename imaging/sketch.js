// importing images demo
// Sept 23rd, 2024

let hotdog;

function preload() {
  hotdog = loadImage("hotdog.jpg") // Copied from relative path
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  // displaying the hotdog, moves with mouse, and is half it's size
  image(hotdog, mouseX, mouseY, hotdog.width * 0.5, hotdog.height * 0.5)
}
