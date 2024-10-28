// rectangular/screenwide grid demo
// Rainn Morphy
// Oct 28th, 2024

const SIZES_KABOOM = 25;

let gridsKaboom;
let rowsKaboom;
let colsKaboom;


function setup() {
  createCanvas(windowWidth, windowHeight);

  colsKaboom = Math.floor(width / SIZES_KABOOM);
  rowsKaboom = Math.floor(height / SIZES_KABOOM);
  gridsKaboom = randomsKaboom(colsKaboom, rowsKaboom);
}

function draw() {
  background(220);
  displaysKaboom();
}

function displaysKaboom() {
  for (let y = 0; y < rowsKaboom; y++) {
    for (let x = 0; x < colsKaboom; x++) {
      if (gridsKaboom[y][x] === 1) {
        fill("red");
      }
      else if (gridsKaboom[y][x] === 0) {
        fill("black");
      }
      square(x * SIZES_KABOOM, y * SIZES_KABOOM, SIZES_KABOOM);
    }
  }
}

function randomsKaboom(colsBoom, rowsBoom) {
  let newsKaboom = [];
  for (let y = 0; y <= rowsBoom; y++) {
    newsKaboom.push([]);
    for (let x = 0; x <= colsBoom; x++) {
      // toss in a 1 or 0 randomly
      if (random(100) < 50) {
        newsKaboom[y].push(0);
      }
      else {
        newsKaboom[y].push(1);
      }
    }
  }
  return newsKaboom;
}