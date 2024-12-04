// oop inheritance demo
// Rainn Morphy
// Dec 3rd, 2024

// parent class
class Shape {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
  }

  // common display for all shapes
  display() {
    noStroke();
    fill(this.hue);
  }
  // common move for all shapes
  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
}

// child class
class Circle extends Shape {
  constructor(x, y, hue, r) {
    super(x, y, hue);
    this.r = r;
  }

  // override display function
  display() {
    super.display();
    circle(this.x, this.y, this.r * 2);
  }
}

// child class 2
class Square extends Shape {
  constructor(x, y, hue, size) {
    super(x, y, hue);
    this.size = size;
  }

  // override display function
  display() {
    super.display();
    square(this.x, this.y, this.size);
  }
}

let shapeEnemy = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    if (random(100) < 50) {
      let circleEnemy = new Circle(random(width), random(height), color(random(255), random(255), random(255)), random(20, 50));
      shapeEnemy.push(circleEnemy);
    }
    else {
      let squareEnemy = new Square(random(width), random(height), color(random(255), random(255), random(255)), random(20, 50));
      shapeEnemy.push(squareEnemy);
    }
  }
}

function draw() {
  background(220);

  for (let someEnemy of shapeEnemy){
    someEnemy.move();
    someEnemy.display();
  }
}
