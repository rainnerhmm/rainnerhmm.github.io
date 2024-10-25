// nested loops and arrays demo
// Rainn Morphy
// Oct 4, 2024

const TILESIZE = 20; // detail of the pattern
let bagOfTiles = []; // an array of tiles/slopes

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x += TILESIZE) { // generates along the x axis till reaching the width
    for (let y = 0; y < height; y += TILESIZE) { // generates along the y axis till reaching the height
      let oneOfTheTiles = tilingTile(x, y); // adds spawned tiles/slopes to the 'bag' or the array
      bagOfTiles.push(oneOfTheTiles);
    }
  }
}

function draw() {
  background(220);

  for (let favoriteTile of bagOfTiles) {
    line(favoriteTile.x1, favoriteTile.y1, favoriteTile.x2, favoriteTile.y2); //  displays tiles/slopes out of your 'bag'
  }
}

function tilingTile(x, y) { // spawns tiles/slopes
  let aSingleTile; // creates a tile/slope
  let tileChoice = random(100); // chooses the direction of the tile/slope

  if (tileChoice < 50) {
    // line tiles/slopes negatively/rightwards
    aSingleTile = {
      x1: x - TILESIZE / 2,
      y1: y - TILESIZE / 2,
      x2: x + TILESIZE / 2,
      y2: y + TILESIZE / 2,
    };
  }
  else {
    // line tiles/slopes positively/leftwards
    aSingleTile = {
      x1: x - TILESIZE / 2,
      y1: y + TILESIZE / 2,
      x2: x + TILESIZE / 2,
      y2: y - TILESIZE / 2,
    };
  }

  return aSingleTile; // returns the tile/slope to be added to the array
}