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
};

let movestate = {
  up: false,
  down: false,
  left: false,
  right: false,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;
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
      movestate.up = true;
    }

    if (key === "s") {
      movestate.down = true;
    }

    if (key === "a") {
      movestate.left = true;
    }

    if (key === "d") {
      movestate.right = true;
    }
  }
}

function keyReleased(){
  if (state === "active") {
    if (key === "w" && movestate.up === true) {
      movestate.up = false;
    }

    if (key === "s" && movestate.down === true) {
      movestate.down = false;
    }

    if (key === "a" && movestate.left === true) {
      movestate.left = false;
    }

    if (key === "d" && movestate.right === true) {
      movestate.right = false;
    }
  }
}

/**
 * wowza
 */
function playerMovement() {
  if (state === "active") { 
    if (movestate.up === true) {
      player.y -= player.speed;
      if (player.y <= 0) {
        movestate.up = false;
      }
    }

    if (movestate.down === true) {
      player.y += player.speed;
      if (player.y >= height - player.size) {
        movestate.down = false;
      }
    }

    if (movestate.left === true) {
      player.x -= player.speed;
      if (player.x <= 0) {
        movestate.left = false;
      }
    }

    if (movestate.right === true) {
      player.x += player.speed;
      if (player.x >= width - player.size) {
        movestate.right = false;
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
