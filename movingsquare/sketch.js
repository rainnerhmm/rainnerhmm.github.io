// Moving Square around Screen
// Sept 19th, 2024


windowSize = 400
x = windowSize/2
y = windowSize/2
size = 50
speed = 2

function setup() {
  createCanvas(windowSize, windowSize);
}

function draw() {
  createCanvas(windowSize, windowSize);
  background(220)
  moves();
  hipToBeSquare();
  bounceBall();
}

function moves(){
  if (keyIsDown(87)) {
    y -= speed
  }
  if (keyIsDown(83)) {
    y += speed
  }
  if (keyIsDown(65)){
    x -= speed
  }
  if (keyIsDown(68)){
    x += speed
  }
}
function hipToBeSquare(){
  square(x-(size/2),y-(size/2),size)
  noStroke()
  fill(0) 
}
function bounceBall(){
  // bounce if needed
  if ((x >= width - size)||(x<=0+size)) {
    x *= -1;
  } 
  else if ((y >= height - size)||(y<=0+size)) {
    y *= -1;
  }
}