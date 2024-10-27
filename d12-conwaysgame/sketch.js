// conways' game of life demo
// Rainn Morphy
// Oct 25th, 2024

let conwaysGrid;
const CONWAYS_GRID_SIZE = 40;
let conwaysCellSize;

let conwaysAutoplay = false;
let conwaysFrameMultiplier = 5;
let gospersConwayGun;

function preload() {
  gospersConwayGun = loadJSON("assets/gosper.json");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  conwaysCellSize = height / CONWAYS_GRID_SIZE;
  conwaysGrid = conwaysRandomGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  conwaysCellSize = height / CONWAYS_GRID_SIZE;
}

function draw() {
  background(220);
  if (conwaysAutoplay && frameCount % conwaysFrameMultiplier === 0) {
    conwaysGrid = conwaysGridUpdater();
  }
  conwaysGridDisplayer();
}

function mousePressed() {
  // rounds integer down
  let x = Math.floor(mouseX / conwaysCellSize);
  let y = Math.floor(mouseY / conwaysCellSize);

  conwaysCellToggle(x, y); // toggle self
}

function conwaysCellToggle(x, y) {
  // makes sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < CONWAYS_GRID_SIZE && y < CONWAYS_GRID_SIZE) {
    if (conwaysGrid[y][x] === 1) {
      conwaysGrid[y][x] = 0;
    }
    else {
      conwaysGrid[y][x] = 1;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    conwaysGrid = conwaysRandomGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE); // creates random grid
  }
  if (key === "e") {
    conwaysGrid = conwaysEmptyGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE); // empties grid
  }
  if (key === " ") {
    conwaysGrid = conwaysGridUpdater(); // updates grid frame-by-frame
  }
  if (key === "a") {
    conwaysAutoplay = !conwaysAutoplay; // automatically updates grid 5 frames per second
  }
  if (key === "g") {
    conwaysGrid = gospersConwayGun; // opens gospergun from '.json' file
  }
}

function conwaysGridUpdater() {
  // make a new array to hold the next turn
  let nextConwaysTurn = conwaysEmptyGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);

  // look at every conways cell
  for (let y = 0; y < CONWAYS_GRID_SIZE; y++) {
    for (let x = 0; x < CONWAYS_GRID_SIZE; x++) {
      // count its neighbours
      let conwaysNeighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y + i >= 0 && y + i < CONWAYS_GRID_SIZE && x + j >= 0 && x + j < CONWAYS_GRID_SIZE) {
            // don't fall off the edge
            conwaysNeighbours += conwaysGrid[y + i][x + j];
          }
        }
      }

      // don't count yourself
      conwaysNeighbours -= conwaysGrid[y][x];

      // apply the rules of conways game
      if (conwaysGrid[y][x] === 0) {
        // currently dead
        if (conwaysNeighbours === 3) {
          nextConwaysTurn[y][x] = 1;
        }
        else {
          nextConwaysTurn[y][x] = 0;
        }
      }

      if (conwaysGrid[y][x] === 1) {
        if (conwaysNeighbours === 2 || conwaysNeighbours === 3) {
          // currently alive
          nextConwaysTurn[y][x] = 1;
        }
        else {
          nextConwaysTurn[y][x] = 0;
        }
      }
    }
  }
  return nextConwaysTurn;
}

function conwaysGridDisplayer() {
  // creates every square within the grid
  for (let y = 0; y < CONWAYS_GRID_SIZE; y++) {
    for (let x = 0; x < CONWAYS_GRID_SIZE; x++) {

      // updates grid color between black and white/on and off states
      if (conwaysGrid[y][x] === 1) {
        fill("black");
      }
      else if (conwaysGrid[y][x] === 0) {
        fill("white");
      }
      square(x * conwaysCellSize, y * conwaysCellSize, conwaysCellSize);
    }
  }
}

function conwaysRandomGrid(cols, rows) {
  // creates randomly generated grid
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // chooses either 0 or 1, 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function conwaysEmptyGrid(cols, rows) {
  // empties grid to completely white state
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}