// gridbased project
// Rainn Morphy
// Oct 26, 2024

// Description of Project;
//    My original idea was much more weird and the scope was to big, featuring weather forecasts and bingo cards? I wasn't confident in the
// idea and struggled with getting work done, until I made the decision to make this project, 'partyduel!'. 
//    'partyduel!' was a actual 'board game' me and my friends made back in Elementary School, where in the four corners (golden squares) 
// were crown cards. Collect all four to win the game. You are given a deck of 'movement cards' to draw from and traverse the board, 
// instead of dice. If others had gotten one first, you could land on the same space, and have a 'partyduel!' which was essentially 
// a game of war, using the 'movement cards'. Also wanted to include multiplayer using p5.party.
//    Obviously none of that is implemented, I personally think, it's not that I couldn't do it, rather just being unorganized.

// Extra for Experts;
//    Although like my other projects, this one is half-baked and not done at all, I am pretty proud of my scaling, I think it cleans 
// everything up and makes what would have been many magic numbers, into concise, and easy-to-read.
//    I am also proud of the color palette, making the RGB codes easy to read, and keeping colors consistent. None of this is pushing any 
// boundaries of my coding abilities, but I think my organization, code-wise was pretty all right.

// Programming Credits;
//    I was heavily inspired by how Amy did their 'Sudoku' game, in the sense of making padding variables within Javascript, allowing me to
// have a background, and a smaller grid within, not sure if Amy's way was the best way, but it sure made it alot easier for me to work
// with scaling.
// https://schellenberg.github.io/cs30-exemplar-projects/grid-based-game-exemplars/sudoku/

// For this assignment, you will build a game/simulation that includes 2D Arrays.

// You can make whatever you want -- in the end, so long as you use a two-dimensional array in your project,
// you are meeting the major requirement of this assignment. 
// You are welcome to use the Game of Life demo as a starting point for this project. 
// See the link below for some examples of what students have created in past semesters 
// (a wide variety of quality of projects are represented). 

// variables below are all for creating the grid
let grid;
const GRID_DIM = 11; // grid dimensions; number of rows and columns (11x11sq)

// variables below are all for game aspects
let player = {
  x: 0,
  y: 0,
  tile: 1,
};

const TILES = {
  PURPLE: "P",
  GOLD: "Y",
  BLUE: "B",
  RED: "R",
  GREEN: "G",
  BOUND: "#",
};

let prevTile;
let timer = 60;

// variables below are all for visual aspects
let bgMusic, clickSound, titleLogo, gameFont;

const COLOR_PALETTE = { // for consistent colors, and ease of use
  PURPLE: "#893bb3ff",
  BLUE: "#00a7e1ff",
  RED: "#ff4747ff",
  GREEN: "#0cca4aff",
  GOLD: "#ffe64fff",
  BOUND: "#e5d1d0ff",
  BG: "#181818ff",
};

// variables below are all for scaling
let gridSize, cellSize, clockSize;

let horizPadding, vertPadding; // horizontal and vertical padding to center the grid the space within the padding
let horizSpace, vertSpace; // the space within the padding

const SCALE = { // scales objects by 'percentage'/decimals of the window size / original volume
  HALVED: 0.5, // centers objects
  GRID: 0.3, // 30% 

  CLOCK: 0.23, // 23% 

  TEXT: 0.1, // 10%
  SOUND: 0.3, // sets the sound volume to 30% of it's original volume
}; // I'm aware that there is a scale() function, but didn't find out until November 14th, not enough time to implement

function preload() {
  // loadImage();
  soundFormats("mp3");
  bgMusic = loadSound("assets/music/bgMusic.mp3"); // "Twistee Island" from Mario & Luigi; Brothership by Nintendo

  gameFont = loadFont("assets/fonts/gameFont.otf"); // "MARIO_Font_v3_Solid" or the official 'Mario Font' by Nintendo and Fontworks
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // scales everything to current window width
  gridSize = windowWidth * SCALE.GRID;
  cellSize = gridSize / GRID_DIM;

  clockSize = windowWidth * SCALE.CLOCK;

  stroke(gridSize * SCALE.TEXT);
  textSize(gridSize * SCALE.TEXT);

  // centers board / grid
  horizPadding = (windowWidth - gridSize) * SCALE.HALVED;
  vertPadding = (windowHeight - gridSize) * SCALE.HALVED;

  horizSpace = horizPadding + gridSize;
  vertSpace = vertPadding + gridSize;

  // generates board layout
  grid = boardLayout(GRID_DIM, GRID_DIM);
  // add player to grid
  grid[player.y][player.x] = player.tile;
}


function draw() {
  background(COLOR_PALETTE.BG);
  textFont(gameFont); // sets text font

  boardGraphics();
  infoGraphics();
}

function backgroundMusic() {
  bgMusic.play();
  bgMusic.loop();
  bgMusic.amp(SCALE.MUSIC);
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    backgroundMusic();
  }
}

function keyPressed() {
  if (key === "w") {
    // move up
    movement(player.x, player.y - 1);
  }
  if (key === "a") {
    // move left
    movement(player.x - 1, player.y);
  }
  if (key === "s") {
    // move down
    movement(player.x, player.y + 1);
  }
  if (key === "d") {
    // move right
    movement(player.x + 1, player.y);
  }
}

function boardLayout(cols, rows) {
  let newGrid = [];
  for (y = 0; y < rows; y++) {
    newGrid.push([]); // creates new empty array
    for (x = 0; x < cols; x++) {
      if (x === 0 && y === 0 || x === GRID_DIM - 1 && y === GRID_DIM - 1 || x === GRID_DIM - 1 && y === 0 || x === 0 && y === GRID_DIM - 1) {
        newGrid[y].push(TILES.GOLD);
      }
      else if (x === 0 || y === 0 || x === GRID_DIM - 1 || y === GRID_DIM - 1) {
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
      }
      else {
        newGrid[y].push(TILES.BOUND);
      }
    }
  }
  return newGrid;
}

function boardGraphics() {
  for (let y = 0; y < GRID_DIM; y++) {
    for (let x = 0; x < GRID_DIM; x++) {
      if (grid[y][x] === TILES.PURPLE) {
        fill(COLOR_PALETTE.PURPLE);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.GOLD) {
        fill(COLOR_PALETTE.GOLD);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.BLUE) {
        fill(COLOR_PALETTE.BLUE);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.RED) {
        fill(COLOR_PALETTE.RED);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.GREEN) {
        fill(COLOR_PALETTE.GREEN);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === TILES.BOUND) {
        fill(COLOR_PALETTE.BOUND);
        square(x * cellSize + horizPadding, y * cellSize + vertPadding, cellSize);
      }

      else if (grid[y][x] === player.tile) {
        fill(COLOR_PALETTE.PURPLE);
        square(player.x * cellSize + horizPadding, player.y * cellSize + vertPadding, cellSize);
      }
    }
  }
}

function movement(x, y) {
  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && grid[y][x] !== TILES.BOUND) {
    prevTile = grid[y][x];
    // when moving, reset to open spot
    grid[player.y][player.x] = prevTile;

    // keep track of player location
    player.x = x;
    player.y = y;

    // put player in grid
    grid[player.y][player.x] = player.tile;
  }
}

function infoGraphics() {
  textAlign(CENTER, CENTER);
  circle(windowWidth * SCALE.HALVED, vertPadding * SCALE.HALVED, clockSize * SCALE.CLOCK);

  if (timer * millis() > 0){
    timer -= 1;
  }
  fill(COLOR_PALETTE.BG);
  text(timer, windowWidth * SCALE.HALVED, vertPadding * SCALE.HALVED);
}

function windowResized() { // will reposition assets when changing screen size, any comments in the setup apply here
  resizeCanvas(windowWidth, windowHeight);

  gridSize = windowWidth * SCALE.GRID;
  cellSize = gridSize / GRID_DIM;

  clockSize = windowWidth * SCALE.CLOCK;

  textSize(gridSize * SCALE.TEXT);

  horizPadding = (windowWidth - gridSize) * SCALE.HALVED;
  vertPadding = (windowHeight - gridSize) * SCALE.HALVED;

  horizSpace = horizPadding + gridSize;
  vertSpace = vertPadding + gridSize;
}


