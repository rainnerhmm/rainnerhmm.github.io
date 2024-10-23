// the magical 2D arrays demo
// Oct 22nd, 2024


// if hardcoding grid, use this:

// let magicalgrid = [
//   [1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0],
// ];

let magicalGrid;
const MAGICAL_GRID_SIZE = 4;
let magicalCellSize;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  magicalCellSize = height / MAGICAL_GRID_SIZE;
  magicalGrid = summonRandomMagicalGrid(MAGICAL_GRID_SIZE, MAGICAL_GRID_SIZE);
}

function draw() {
  background(220);
  magicalGridDisplayer();
}

function keyPressed() {
  if (key === "r") {
    magicalGrid = summonRandomMagicalGrid(MAGICAL_GRID_SIZE, MAGICAL_GRID_SIZE);
  }
  if (key === "e") {
    magicalGrid = summonEmptyMagicalGrid(MAGICAL_GRID_SIZE, MAGICAL_GRID_SIZE);
  }
}

function magicalGridDisplayer() {
  for (let y = 0; y < MAGICAL_GRID_SIZE; y++) {
    for (let x = 0; x < MAGICAL_GRID_SIZE; x++) {
      if (magicalGrid[y][x] === 1) {
        fill("black");
      }
      else if (magicalGrid[y][x] === 0) {
        fill("white");
      }
      square(x * magicalCellSize, y * magicalCellSize, magicalCellSize);
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
