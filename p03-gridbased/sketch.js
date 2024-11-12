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

// assets
// https://kenney.nl/assets/board-game-info
// https://kenney.nl/assets/board-game-icons
// https://kenney.nl/assets/ui-pack
// https://kenney.nl/assets/cursor-pack
// https://kenney.nl/assets/pattern-pack
// https://kenney.nl/assets/emotes-pack
// https://kenney.nl/assets/boardgame-pack
// https://kenney.nl/assets/playing-cards-pack
// https://kenney.nl/assets/game-icons


// bouncing text reference
// https://codepen.io/SteveJRobertson/pen/xwxeGO

// grid reference
// https://schellenberg.github.io/cs30-exemplar-projects/grid-based-game-exemplars/sudoku/

let gameState = "active"; // sets the 'start' screen state

let grid, gridSize, clockSize, infoSize, cellSize; // 

let horizPadding, vertPadding; // horizontal and vertical padding to center the grid
let horizSpace, vertSpace; // the space within the padding

let gridDim = 11; // grid dimensions; number of rows and columns (11x11sq)

let titleImage;

class Player {
  constructor(graphic) {
    this.graphic = graphic;
  }
}

let player = {
  pA: new Player(),
  pB: new Player(),
  pC: new Player(),
  pD: new Player(),
};

let backgroundMusic;
let clickSound;

const SCALE = {
  grid: 0.3, // sets the gridsize to 30% of the window and/or area
  clock: 0.23, // sets the clocksize to 23% of the window and/or area
  info: 0.23, // sets the clocksize to 23% of the window and/or area
  text: 0.1 , // sets the clocksize to 10% of the window and/or area
  halved: 0.5, // centers objects within the window and/or area
};

// constants for tiles, rather than Magic Numbers
const TILES = {
  purple: "P",
  blue: "B",
  red: "R",
  green: "G",
  yellow: "Y",
  bound: "#",
};

function preload() {
  // loadImage();
  loadImage();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gridSize = windowWidth * SCALE.grid;
  clockSize = windowWidth * SCALE.clock;
  infoSize = windowWidth * SCALE.info;
  textSize(gridSize * SCALE.text);

  horizPadding = (windowWidth - gridSize) * SCALE.halved;
  vertPadding = (windowHeight - gridSize) * SCALE.halved;

  horizSpace = horizPadding + gridSize;
  vertSpace = vertPadding + gridSize;

  cellSize = gridSize / gridDim; // sets size of individual cells within the grid
  grid = boardLayout(gridDim, gridDim); // generates board layout
}

function windowResized() { // will reposition assets when changing screen size
  // cool spinning effect when pressing f11 attempt through code (about 3 seconds)
  resizeCanvas(windowWidth, windowHeight);

  gridSize = windowWidth * SCALE.grid;
  clockSize = windowWidth * SCALE.clock;
  infoSize = windowWidth * SCALE.info;
  textSize(gridSize * SCALE.text);

  horizPadding = (windowWidth - gridSize) * SCALE.halved;
  vertPadding = (windowHeight - gridSize) * SCALE.halved;

  horizSpace = horizPadding + gridSize;
  vertSpace = vertPadding + gridSize;

  cellSize = gridSize / gridDim;
}

function draw() {
  background(220);
  if (gameState === "start") {
    titleScreen(); // displays 'start' screen
  }
  else if (gameState === "active") {
    boardGraphics();
    infoGraphics();
  }
}

function titleScreen() {
  // image(titleImage);

  let startText = "press any button";
  textAlign(CENTER, CENTER);
  text(startText, width / 2, height / 2); // displays 'start' screen text
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "active"; // switches 'start screen' state to an 'active' state, going right
  }
}

function infoGraphics() {
  // timer
  circle(windowWidth * SCALE.halved, vertPadding * SCALE.halved, clockSize * SCALE.clock);
  // round count
  // textAlign(CENTER, CENTER);
  // text("Round 2", horizSpace * SCALE.halved, vertSpace * SCALE.halved);
  // playmenu
  rect(horizSpace * 1.1, vertSpace * 0.7, 300, 100);
  rect(horizSpace * 1.1, vertSpace * 0.5, 300, 100);
  rect(horizSpace * 1.1, vertSpace * 0.3, 300, 100);
  // player turn and info
  rect(horizSpace * 0.15, vertSpace * 0.7, 300, 100);
  rect(horizSpace * 0.15, vertSpace * 0.5, 300, 100);
  rect(horizSpace * 0.15, vertSpace * 0.3, 300, 100);
}

function boardGraphics() {
  for (let y = 0; y < gridDim; y++) {
    for (let x = 0; x < gridDim; x++) {
      if (grid[y][x] === TILES.bound) {
        fill("white");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
      else if (grid[y][x] === TILES.blue) {
        fill("blue");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
      else if (grid[y][x] === TILES.red) {
        fill("red");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
      else if (grid[y][x] === TILES.green) {
        fill("green");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
      else if (grid[y][x] === TILES.yellow) {
        fill("gold");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
      else if (grid[y][x] === TILES.purple) {
        fill("purple");
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }
    }
  }
}

function boardLayout(cols, rows) {
  let newGrid = [];
  for (y = 0; y < rows; y++) {
    newGrid.push([]); // creates new empty array
    for (x = 0; x < cols; x++) {
      if (x === 0 && y === 0 || x === gridDim - 1 && y === gridDim - 1 || x === gridDim - 1 && y === 0 || x === 0 && y === gridDim - 1) {
        newGrid[y].push(TILES.yellow);
      }
      else if (x === 0 || y === 0 || x === gridDim - 1 || y === gridDim - 1) {
        // chooses either 0 or 1, 50% of the time
        if (Math.floor(random(100)) < 30) {
          newGrid[y].push(TILES.red);;
        }
        else if (Math.floor(random(100)) < 10) {
          newGrid[y].push(TILES.green);
        }
        else {
          newGrid[y].push(TILES.blue);
        }
        console.log(Math.floor(random(100)));

      }
      else {
        newGrid[y].push(TILES.bound);
      }
    }
  }
  return newGrid;
}

function NEWboardGraphics() { // displays what is generated by board layout

}
