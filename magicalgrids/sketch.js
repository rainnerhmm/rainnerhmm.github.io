// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// if hardcoding grid, use this:

// let magicalgrid = [
//   [1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0],
// ];

let magicalGrid;
const GRID_SIZE = 4;
let cellSize;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRID_SIZE;
  magicalGrid = summonRandomMagicalGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  magicalGridDisplayer();
}

function keyPressed() {
  if (key === "r") {
    magicalGrid = summonRandomMagicalGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    magicalGrid = summonEmptyMagicalGrid(GRID_SIZE, GRID_SIZE);
  }
}

function magicalGridDisplayer() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (magicalGrid[y][x] === 1) {
        fill("black");
      }
      else if (magicalGrid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function summonRandomMagicalGrid(cols, rows) {
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

function summonEmptyMagicalGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}
