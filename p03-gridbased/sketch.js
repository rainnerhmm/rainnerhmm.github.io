// gridbased project
// Rainn Morphy
// Oct 26, 2024

// Due:
// Nov 8, 2024

// For this assignment, you will build a game/simulation that includes 2D Arrays.

// You can make whatever you want -- in the end, so long as you use a two-dimensional array in your project,
// you are meeting the major requirement of this assignment. 
// You are welcome to use the Game of Life demo as a starting point for this project. 
// See the link below for some examples of what students have created in past semesters 
// (a wide variety of quality of projects are represented). 

// https://schellenberg.github.io/cs30-exemplar-projects/grid-based-game-exemplars/index.html

// Extra for Experts:

let state = "start"; // sets the 'start' screen state


// movement inspired by; https://editor.p5js.org/mrhaikuswan/sketches/hzMgNbSu_
let player = {
  x: 0,
  y: 0,
  size: 50,
  speed: 7,
  hori: null,
  vert: null,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (state === "start") {
    titleState(); // displays 'start' screen
  }
  else if (state === "active") {
    playerGraphics();
    playerMovement();
  }
}

function titleState() {
  textAlign(CENTER, CENTER);
  textSize(30);
  text("press any button", width / 2, height / 2); // displays 'start' screen text
}

function mousePressed() {
  if (state === "start") {
    state = "active"; // switches 'start screen' state to an 'active' state, going right
  }
}

function keyPressed() {
  if (state === "start") {
    state = "active";
  }
  if (state === "active") { // will give 4-directional movement to the user
    if (key === "w") {
      player.vert = "up";
    }

    if (key === "s") {
      player.vert = "down";
    }

    if (key === "a") {
      player.hori = "left";
    }

    if (key === "d") {
      player.hori = "right";
    }
  }
}

function keyReleased(){
  if (state === "active") { // will give 4-directional movement to the user
    if (key === "w" && player.vert === "up") {
      player.vert = null;
    }

    if (key === "s" && player.vert === "down") {
      player.vert = null;
    }

    if (key === "a" && player.hori === "left") {
      player.hori = null;
    }

    if (key === "d" && player.hori === "right") {
      player.hori = null;
    }
  }
}

/**
 * wowza
 */
function playerMovement() {
  if (state === "active") { // will give 4-directional movement to the user
    if (player.vert === "up") {
      player.y -= player.speed;
      if (player.y <= 0) {
        player.vert = null;
      }
    }

    if (player.vert === "down") {
      player.y += player.speed;
      if (player.y >= height - player.size) {
        player.vert = null;
      }
    }

    if (player.hori === "left") {
      player.x -= player.speed;
      if (player.x <= 0) {
        player.hori = null;
      }
    }

    if (player.hori === "right") {
      player.x += player.speed;
      if (player.x >= width - player.size) {
        player.hori = null;
      }
    }
  }
}

function playerGraphics() {
  fill("green");
  noStroke();
  square(player.x, player.y, player.size);
}

function windowResized() { // will reposition assets when changing screen size
  resizeCanvas(windowWidth, windowHeight);
}

