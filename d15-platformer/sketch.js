// textfile loading demo
// Rainn Morphy
// Nov 5th, 2024

// WARNING! You do NOT want to have players/enemies as simply elements in a...
// ...grid, if you try to convert this into a functional game. 
// They would move like characters from a 1980's game.

let tileSet;
let background;
let platform, coin, itembox, enemy2, player, enemy1, empty;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

function preload() {
  levelToLoad = "assets/levels/1-1.txt"; // assigns level data to variable
  lines = loadStrings(levelToLoad); // loads level data

  // loads assets
  empty = loadImage("assets/graphics/empty.png");

  // https://minitorn.tlu.ee/~jaagup/oma/too/13/03/Platformer1/HighResolutionContent/Backgrounds/Layer0_1.png
  background = loadImage("assets/graphics/background.png");

  // https://opengameart.org/content/platformer-art-deluxe
  player = loadImage("assets/graphics/player.png"); // 'p1_front' by Kenney
  platform = loadImage("assets/graphics/platform.png"); // 'grassMid' by Kenney

  enemy1 = loadImage("assets/graphics/enemy1.png"); // 'slimeWalk1' by Kenney
  enemy2 = loadImage("assets/graphics/enemy2.png"); // 'flyFly1' by Kenney

  coin = loadImage("assets/graphics/coin.png"); //'coinGold' by Kenney
  itembox = loadImage("assets/graphics/itembox.png"); // 'boxItem' by Kenney
}

function setup() {
  // keep this a 4:3 ratio, or it will stretch in weird ways
  createCanvas(1000, 750);

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tileSet = createEmpty2DArray(tilesWide, tilesHigh);

  // put values into 2D of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tileSet[y][x] = tileType;
    }
  }
}

function draw() {
  display();
}

function display() {
  image(background, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tileSet[y][x], x, y);
    }
  }
}

function showTile(location, x, y) {
  if (location === "#") {
    image(platform, x * tileWidth, y * tileHeight, tileWidth + 25, tileHeight + 25);
  }
  else if (location === "C") {
    image(coin, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "B") {
    image(itembox, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "F") {
    image(enemy2, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "P") {
    image(player, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "S") {
    image(enemy1, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else {
    image(empty, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function createEmpty2DArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}
