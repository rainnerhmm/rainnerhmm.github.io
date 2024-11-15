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

let grid, gridSize, clockSize, infoSizeW, infoSizeH, cellSize; // 

let horizPadding, vertPadding; // horizontal and vertical padding to center the grid
let horizSpace, vertSpace; // the space within the padding

let gridDim = 11; // grid dimensions; number of rows and columns (11x11sq)

let titleImage;

let colorPalette = {
  purple: "#893bb3ff",
  blue: "#00a7e1ff",
  red: "#ff4747ff",
  green: "#0cca4aff",
  gold: "#ffe64fff",
  bound: "#e5d1d0ff",
  bg: "#181818ff",
};

let player = {
  pA: null,
  pB: null,
  pC: null,
  pD: null,
};

let bgMusicLoop;
let clickSound;
let font;

const SCALE = {
  grid: 0.3, // sets the gridsize to 30% of the window and/or area
  clock: 0.23, // sets the clocksize to 23% 
  infoW: 0.32, // sets the infosize width to 23% 
  infoH: 0.12, // sets the infosize to 23% 
  text: 0.1, // sets the textsize to 10%
  halved: 0.5, // centers objects within the window and/or area
};

// constants for tiles, rather than Magic Numbers
const TILES = {
  PURPLE: "P",
  GOLD: "Y",
  BLUE: "B",
  RED: "R",
  GREEN: "G",
  BOUND: "#",
};

function preload() {
  // loadImage();
  soundFormats("mp3"); // setting the sound format
  bgMusicLoop = loadSound("assets/music/bgMusic.mp3");

  player.pA = loadImage("assets/graphics/playPiece.svg");

  font = loadFont("assets/fonts/gameFont.otf");
}

function backgroundMusic() {  // "Twistee Island" from Mario & Luigi; Brothership by Nintendo
  bgMusicLoop.play();
  bgMusicLoop.loop();
  bgMusicLoop.amp(0.3); // sets the volume to 30%
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  gridSize = windowWidth * SCALE.grid;
  clockSize = windowWidth * SCALE.clock;
  infoSizeW = windowWidth * SCALE.infoW;
  infoSizeH = windowWidth * SCALE.infoH;
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
  infoSizeW = windowWidth * SCALE.infoW;
  infoSizeH = windowWidth * SCALE.infoH;
  textSize(gridSize * SCALE.text);

  horizPadding = (windowWidth - gridSize) * SCALE.halved;
  vertPadding = (windowHeight - gridSize) * SCALE.halved;

  horizSpace = horizPadding + gridSize;
  vertSpace = vertPadding + gridSize;

  cellSize = gridSize / gridDim; // sets size of individual cells within the grid
}

function draw() {
  background(colorPalette.bg);
  textFont(font); // sets text font
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
  if (!bgMusicLoop.isPlaying()) {
    backgroundMusic();
  }
  if (gameState === "start") {
    gameState = "active"; // switches 'start screen' state to an 'active' state, going right
  }
}

function infoGraphics() {
  // timer
  circle(windowWidth * SCALE.halved, vertPadding * SCALE.halved, clockSize * SCALE.clock);
  // round count
  textAlign(CENTER, CENTER);
  text("Round 2", horizSpace * SCALE.halved, vertSpace * SCALE.halved);
  // playmenu
  rect(horizSpace * 1.1, vertSpace * 0.7, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
  rect(horizSpace * 1.1, vertSpace * 0.5, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
  rect(horizSpace * 1.1, vertSpace * 0.3, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
  // player turn and info
  rect(horizSpace * 0.15, vertSpace * 0.7, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
  rect(horizSpace * 0.15, vertSpace * 0.5, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
  rect(horizSpace * 0.15, vertSpace * 0.3, infoSizeW * SCALE.halved, infoSizeH * SCALE.halved);
}

function boardGraphics() {
  for (let y = 0; y < gridDim; y++) {
    for (let x = 0; x < gridDim; x++) {
      if (grid[y][x] === TILES.PURPLE) {
        fill(colorPalette.purple);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.GOLD) {
        fill(colorPalette.gold);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.BLUE) {
        fill(colorPalette.blue);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.RED) {
        fill(colorPalette.red);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.GREEN) {
        fill(colorPalette.green);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.BOUND) {
        fill(colorPalette.bound);
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
        newGrid[y].push(TILES.GOLD);
      }
      else if (x === 0 || y === 0 || x === gridDim - 1 || y === gridDim - 1) {
        // chooses either 0 or 1, 50% of the time
        if (Math.floor(random(100)) < 30) {
          newGrid[y].push(TILES.RED);;
        }
        else if (Math.floor(random(100)) < 10) {
          newGrid[y].push(TILES.GREEN);
        }
        else {
          newGrid[y].push(TILES.BLUE);
        }
        console.log(Math.floor(random(100)));

      }
      else {
        newGrid[y].push(TILES.BOUND);
      }
    }
  }
  return newGrid;
}