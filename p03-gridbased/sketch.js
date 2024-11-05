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

let state = "start"; // sets the 'start' screen state

let grid;
let gridsize = 9;
let cellSize;

// constants for tiles, rather than hardcoding
const TILES = {
  player: "1", purple: "P", blue: "B", red: "R", green: "G", yellow: "Y",
};

let player = {
  x: 0,
  y: 0,
};

let movestate = {
  up: false,
  down: false,
  left: false,
  right: false,
};

// notes;
// purple and crownspots will always be in the same place.

// Purple; The Starting Area: Place your Characters in this area to start the Game.

// Blue; Land Here and take 1 Movement Card from the Pile.

// Red; Land Here and put 2 of your Movement Cards at the bottom of the Movement Card Pile.

// Green; Land Here and take 1 Chance Card from the Chance Card Pile.

// Yellow; Land Here and take the Super Card from under the Yellow Space.

// How a duel works; If you land on the same space as someone else, a Duel commences.
// You place down 4 Movement Cards facing downwards, Flip the last one. 
// If your flipped card is higher than the opponent, if both of you have the same number, 
// repeat until victorious, or until your movement cards run out.
// * You can choose any cards to be used in a Duel. If you have a Super Card in your deck the opponent will receive it,

// Movement Cards; You start the game with 5 Movement Cards.  Organize, Strategize, and Maximize with your cards to become victorious. 
// * You can get more Movement Cards from Duels, Chance Cards & Blue Spaces

// Chance Cards; You get these cards from Green Spaces, you can do special things with them like: Four-Way Duels...
// ...Take 5 Movement Cards from any opponent, and more. Once used return to the bottom of the Chance Card Pile.

// How to Win; You win the Game by collecting all 4 Super Cards.

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / gridsize;
  grid = boardLayout(gridsize, gridsize);

  // add player to grid
  grid[player.y][player.x] = PLAYERTILE;
}

function windowResized() { // will reposition assets when changing screen size
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height / gridsize;
}

function draw() {
  background(220);
  if (state === "start") {
    titleState(); // displays 'start' screen
  }
  else if (state === "active") {
    playerGraphics();
    boardGraphics();
  }
}

function keyPressed() {
  if (state === "start") {
    state = "active";
  }
  if (state === "active") { // will give 4-directional movement to the user
    if (key === "w") {
      movestate.up = true;
    }

    if (key === "s") {
      movestate.down = true;
    }

    if (key === "a") {
      movestate.left = true;
    }

    if (key === "d") {
      movestate.right = true;
    }
  }
}

function keyReleased() {
  if (state === "active") {
    if (key === "w" && movestate.up === true) {
      movestate.up = false;
    }

    if (key === "s" && movestate.down === true) {
      movestate.down = false;
    }

    if (key === "a" && movestate.left === true) {
      movestate.left = false;
    }

    if (key === "d" && movestate.right === true) {
      movestate.right = false;
    }
  }
}

function playerMovement(x, y) {
  if (state === "active") {
    if (x >= 0 && x < gridsize && y >= 0 && y < gridsize && grid[y][x] === OPENTILE) {
      // when moving, reset to open spot
      grid[player.y][player.x] = OPENTILE;

      // keep track of player location
      player.x = x;
      player.y = y;

      // put player in grid
      grid[player.y][player.x] = PLAYERTILE;
    }
    if (movestate.up === true) {
      player.y -= 1;
    }

    if (movestate.down === true) {
      player.y += 1;
    }

    if (movestate.left === true) {
      player.x -= 1;
    }

    if (movestate.right === true) {
      player.x += 1;
    }
  }
}

function titleState() {
  textAlign(CENTER, CENTER);
  textSize(30);
  text("press any button", width / 2, height / 2); // displays 'start' screen text
}

function mousePressed() {
  if (state === "start") {
    state = "active"; // switches 'start screen' state to an 'active' state, going right
  }
}

function playerGraphics() {
  fill("green");
  noStroke();
  square(player.x, player.y, player.size);
}

function boardLayout(cols, rows) {
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

function boardGraphics() {
  for (let y = 0; y < gridsize; y++) {
    for (let x = 0; x < gridsize; x++) {
      // displays bluespots
      if (grid[y][x] === CLOSEDTILE) {
        fill("blue");
        square(x * cellSize, y * cellSize, cellSize);
      }
      // displays redspots
      else if (grid[y][x] === OPENTILE) {
        fill("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
      // displays players
      else if (grid[y][x] === PLAYERTILE) {
        fill("gold");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}
