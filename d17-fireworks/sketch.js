// oop fireworks demo
// Rainn Morphy
// Nov 18th, 2024

const PARTICLES_PER_CLICK = 50;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = random(-5, 5);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update() {
    // move
    this.x += this.dx;
    this.y += this.dy;

    // fade away over time
    this.opacity -= 10;
  }

  dead() {
    return this.opacity <= 0;
  }
}

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  for (let firework of fireworks) {
    if (firework.dead()) {
      // remove it
      let index = fireworks.indexOf(firework);
      fireworks.splice(index, 1);
    }
    else {
      firework.update();
      firework.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < PARTICLES_PER_CLICK; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    fireworks.push(someParticle);
  }
}
