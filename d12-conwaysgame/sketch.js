// conways' game of life demo
// Oct 25th, 2024


// if hardcoding grid, use this:

// let conwaysgrid = [
//   [1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0],
// ];

let conwaysGrid;
const CONWAYS_GRID_SIZE = 40;
let conwaysCellSize;
let conwaysNeighbourToggler = false;
let conwaysAutoplay = false;
let conwaysFrameMultiplier = 5;
let conwaysGospergun;

function preload() {
  conwaysGospergun = loadJSON("gosper.json")
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  conwaysCellSize = height / CONWAYS_GRID_SIZE;
  conwaysGrid = summonRandomConwaysGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);
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
  // conwaysGrid = conwaysGridUpdater();
  conwaysGridDisplayer();
}

function mousePressed() {
  let x = Math.floor(mouseX / conwaysCellSize);
  let y = Math.floor(mouseY / conwaysCellSize);

  // toggle self
  conwaysCellToggle(x, y);

  // toggle neighbours
  if (conwaysNeighbourToggler) {
    conwaysCellToggle(x + 1, y);
    conwaysCellToggle(x - 1, y);
    conwaysCellToggle(x, y + 1);
    conwaysCellToggle(x, y - 1);
  }
}

function conwaysCellToggle(x, y) {
  // make sure the cell you're toggling is in the grid
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
    conwaysGrid = summonRandomConwaysGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);
  }
  if (key === "e") {
    conwaysGrid = summonEmptyConwaysGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);
  }
  if (key === "n") {
    conwaysNeighbourToggler = !conwaysNeighbourToggler;
  }
  if (key === " ") {
    conwaysGrid = conwaysGridUpdater();
  }
}

function conwaysGridUpdater() {
  // make a new array to hold the next turn
  let nextConwaysTurn = summonEmptyConwaysGrid(CONWAYS_GRID_SIZE, CONWAYS_GRID_SIZE);

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
  for (let y = 0; y < CONWAYS_GRID_SIZE; y++) {
    for (let x = 0; x < CONWAYS_GRID_SIZE; x++) {
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

function summonRandomConwaysGrid(cols, rows) {
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

function summonEmptyConwaysGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}