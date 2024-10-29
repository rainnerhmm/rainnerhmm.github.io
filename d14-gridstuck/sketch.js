// grid-based movement demo
// Oct 29nd, 2024

let grid;
const GRIDSIZE = 16;
let cellSize;

// constants for tiles, rather than hardcoding
const OPENTILE = 0;
const CLOSEDTILE = 1;

// player tilevalue and location
const GUYTILE = 9; // number is non-important, just needs to be different from 1 and 0
let guy = {
  x: 0,
  y: 0,
};

function preload() {
  // https://opengameart.org/content/grass-texture-0
  grassImg = loadImage("assets/grass.png"); // 'grass3' by RPG

  // https://opengameart.org/content/seamless-brickconcrete-textures-2
  gravelImg = loadImage("assets/gravel.png"); // 'tile_gravel' by BMacZero (Brian MacIntosh)
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRIDSIZE;
  grid = generateRandomGrid(GRIDSIZE, GRIDSIZE);

  // add player to grid
  grid[guy.y][guy.x] = GUYTILE;
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRIDSIZE;
}

function draw() {
  background(220);
  gridDisplayer();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  // toggle self
  cellToggle(x, y);
}

function cellToggle(x, y) {
  // make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRIDSIZE && y < GRIDSIZE) {
    if (grid[y][x] === CLOSEDTILE) {
      grid[y][x] = OPENTILE;
    }
    else if (grid[y][x] === OPENTILE) {
      grid[y][x] = CLOSEDTILE;
    }
  }
}

function keyPressed() {
  // grid settings
  if (key === "r") {
    grid = generateRandomGrid(GRIDSIZE, GRIDSIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRIDSIZE, GRIDSIZE);
  }

  // movement
  if (key === "w") {
    // move up
    moveGuy(guy.x, guy.y - 1);
  }
  if (key === "a") {
    // move left
    moveGuy(guy.x - 1, guy.y);
  }
  if (key === "s") {
    // move down
    moveGuy(guy.x, guy.y + 1);
  }
  if (key === "d") {
    // move right
    moveGuy(guy.x + 1, guy.y);
  }
}

function moveGuy(x, y) {
  if (x >= 0 && x < GRIDSIZE && y >= 0 && y < GRIDSIZE && grid[y][x] === OPENTILE) {
    // when moving, reset to open spot
    grid[guy.y][guy.x] = OPENTILE;

    // keep track of player location
    guy.x = x;
    guy.y = y;

    // put player in grid
    grid[guy.y][guy.x] = GUYTILE;
  }
}

function gridDisplayer() {
  for (let y = 0; y < GRIDSIZE; y++) {
    for (let x = 0; x < GRIDSIZE; x++) {
      // displays grass
      if (grid[y][x] === CLOSEDTILE) {
        image(grassImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // displays gravel
      else if (grid[y][x] === OPENTILE) {
        image(gravelImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // displays players
      else if (grid[y][x] === GUYTILE) {
        fill("gold");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // chooses either 0 or 1, 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(CLOSEDTILE);
      }
      else {
        newGrid[y].push(OPENTILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPENTILE);
    }
  }
  return newGrid;
}