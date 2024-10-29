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
const MAGICAL_GRID_SIZE = 16;
let magicalCellSize;
let magicalNeighbourToggler = true;

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

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  magicalCellSize = height / MAGICAL_GRID_SIZE;
}

function draw() {
  background(220);
  magicalGridDisplayer();
}

function mousePressed() {
  let x = Math.floor(mouseX / magicalCellSize);
  let y = Math.floor(mouseY / magicalCellSize);

  // toggle self
  magicalCellToggle(x, y);

  // toggle neighbours
  if (magicalNeighbourToggler) {
    magicalCellToggle(x + 1, y);
    magicalCellToggle(x - 1, y);
    magicalCellToggle(x, y + 1);
    magicalCellToggle(x, y - 1);
  }
}

function magicalCellToggle(x, y) {
  // make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < MAGICAL_GRID_SIZE && y < MAGICAL_GRID_SIZE) {
    if (magicalGrid[y][x] === 1) {
      magicalGrid[y][x] = 0;
    }
    else {
      magicalGrid[y][x] = 1;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    magicalGrid = summonRandomMagicalGrid(MAGICAL_GRID_SIZE, MAGICAL_GRID_SIZE);
  }
  if (key === "e") {
    magicalGrid = summonEmptyMagicalGrid(MAGICAL_GRID_SIZE, MAGICAL_GRID_SIZE);
  }
  if (key === "n") {
    magicalNeighbourToggler = !magicalNeighbourToggler;
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