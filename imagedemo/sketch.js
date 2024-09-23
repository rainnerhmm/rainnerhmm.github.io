// Image Demo
// September 23rd, 2024

let hotdog;

function preload() {
  hotdog = loadImage("hotdog.jpg")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(hotdog,mouseX,mouseY, windowWidth/2, windowHeight/2)
}
