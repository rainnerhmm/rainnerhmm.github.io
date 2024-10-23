// schmovin' square and states demo
// Sept 19th, 2024


const WINDOW_SIZE = 400; // sets the window size to a square that is 400 by 400

let theSquare = {
  x: 0,
  y: 0,
  size: 50,
  speed: 5,
  mode: "onRails", // switches mode between 'on rails' and 'all range'
};

let state = "start"; // sets the 'start' screen state

function setup() {
  createCanvas(WINDOW_SIZE, WINDOW_SIZE);
}

function draw() {
  background(220)
  if (state === "start") {
    startTheScreen(); // displays 'start' screen
  }
  else {
    schmovinSquares(); // moves square
    hipToDisplaySquares(); // displays square
  }
}

function mousePressed() {
  if (state === "start") {
    state = "right"; // switches 'start screen' state to an 'active' state, going right
  }
}

function startTheScreen() {
  textAlign(CENTER, CENTER);
  textSize(30);
  text("click to start the demo", width / 2, height / 2) // displays 'start' screen text
}

function keyPressed(event) {
  if (key === "Shift" && event.code === "ShiftLeft") { // switches to 'all range' mode if left shift is clicked
    theSquare.mode = "allRange";
  }
  if (key === "Shift" && event.code === "ShiftRight") { // switches to 'on rails' mode if right shift is clicked
    theSquare.mode = "onRails";
  }
}

function schmovinSquares() { // moves the square
  if (theSquare.mode === "onRails") { // will border the edge of the window, looping forever
    if (state === "right") {
      theSquare.x += theSquare.speed;
      if (theSquare.x >= width - theSquare.size) {
        state = "down";
      }
    }

    if (state === "down") {
      theSquare.y += theSquare.speed;
      if (theSquare.y >= height - theSquare.size) {
        state = "left";
      }
    }

    if (state === "left") {
      theSquare.x -= theSquare.speed;
      if (theSquare.x <= 0) {
        state = "up";
      }
    }

    if (state === "up") {
      theSquare.y -= theSquare.speed;
      if (theSquare.y <= 0) {
        state = "right";
      }
    }
  }

  if (theSquare.mode === "allRange") { // will give 4-directional movement to the user
    if (keyIsPressed === true) {
      if (key === "w") {
        theSquare.y -= theSquare.speed
      }

      else if (key === "s") {
        theSquare.y += theSquare.speed
      }

      else if (key === "a") {
        theSquare.x -= theSquare.speed
      }

      else if (key === "d") {
        theSquare.x += theSquare.speed
      }
    }
  }
}

function hipToDisplaySquares() { // displays the square
  fill("green");
  square(theSquare.x, theSquare.y, theSquare.size);
}

// Mysterious broken bouncing code

// function bounceBall() {
//   // bounce if needed
//   if ((theSquare.x >= width - theSquare.size) || (theSquare.x <= 0 + theSquare.size)) {
//     theSquare.x *= -1;
//   }
//   else if ((theSquare.y >= height - theSquare.size) || (theSquare.y <= 0 + theSquare.size)) {
//     theSquare.y *= -1;
//   }
// }