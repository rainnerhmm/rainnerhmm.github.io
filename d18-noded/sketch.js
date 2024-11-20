// connecting nodes oop demo
// Rainn Morphy
// November 20th, 2024

let points = [];
let pointnode;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width / 2, height / 2);
}

function draw() {
  background("Black");
  for (pointnode of points) {
    pointnode.update(points);
    pointnode.display();
  }
  if (mouseIsPressed) {
    spawnPoint(mouseX, mouseY);
  }
}

function spawnPoint(x, y) {
  let somePoint = new MovingPoint(x, y);
  points.push(somePoint);
}

function keyPressed(event) {
  if (key === "Shift" && event.code === "ShiftLeft") {
    pointnode.switch("left");
  }

  if (key === "Shift" && event.code === "ShiftRight") {
    pointnode.switch("right");
  }
}


class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.red = color(random(255), 0, 0);
    this.green = color(0, random(255), 0);
    this.blue = color(0, 0, random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
  }

  display() {
    noStroke();
    fill(MovingPoint.switch());
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    // pick random direction movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale to the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += this.dx;
    this.y += this.dy;
  }

  wrap() {
    // teleports across the screen if you fall off
    if (this.x - this.radius > width) { // right
      this.x -= width;
    }

    if (this.x + this.radius < 0) { // left
      this.x += width;
    }

    if (this.y - this.radius > height) { // bottom
      this.y -= height;
    }

    if (this.y + this.radius < 0) { // top
      this.y += height;
    }
  }

  update(thePoints){
    this.move();
    this.wrap();
    this.connectTo(thePoints);
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      // avoid drawing line to self
      if (this !== otherPoint) {
        let pointDist = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDist < this.reach) {
          stroke(MovingPoint.switch());
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  switch(direction) {
    if (direction === "left") {
      return this.blue;
    }
    else if (direction === "right") {
      return this.green;
    }
    else {
      return this.red;
    }
  }
}
