// balls that bounce
// Rainn Morphy
// October 10th, 2024
let ballstiplied = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100000; i++){
    spawnballs(width/2, height/2);
  }
}

function draw() {
  background(255);
  for (let someballs of ballstiplied) {
    // moves your balls
    someballs.x += someballs.dx;
    someballs.y += someballs.dy;

    // bounce your balls
    if (someballs.x >= width - someballs.radness || someballs.x < 0 + someballs.radness) {
      someballs.dx *= -1;
    }
    if (someballs.y >= height - someballs.radness || someballs.y < 0 + someballs.radness) {
      someballs.dy *= -1;
    }

    // balls displayer
    noStroke();
    fill(someballs.red, someballs.green, someballs.blue, someballs.alpha);
    circle(someballs.x, someballs.y, someballs.radness * 2);
  }
}
function spawnballs(theX, theY){
  let balls = {
    x: theX,
    y: theY,
    radness: random(30,70),
    dx: random(-5, 5),
    dy: random(-5, 5),
    red: random(0,255),
    green: random(0, 255),
    blue: random(0,255),
    alpha: random(0, 255),
  };
  ballstiplied.push(balls);
}

function mousePressed(){
  spawnballs(mouseX, mouseY);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}