// graphical noise generation demo
// Rainn Morphy
// Oct 7th, 2024

let terrain = []; // an array of erroded hectares
const CHISELEDNESS = 2000; // total amount of hectares/how 'chisled' the terrain is

function setup() {
  createCanvas(windowWidth, windowHeight);

  let hectareWidth = width / CHISELEDNESS; // the indvidual width of each hectare
  terraformer(hectareWidth);
}

function draw() {
  background(220);

  // displays hectares/rectangles using erosion/noise
  for (let erosion of terrain) {
    rect(erosion.x, erosion.y, erosion.w, erosion.h);
  }
}

function terraformer(howWide) {
  let normieTime = 0; // timer
  let deltaTime = 0.001; // frame-based timer

  for (let x = 0; x < width; x += howWide) {
    let howHigh = noise(normieTime) * height;
    let erosion = formTerrain(x, howHigh, howWide); // uses predetermined width, and noise generated height to build terrain

    terrain.push(erosion); // added eroded hectare to terrain generation

    normieTime += deltaTime; // syncronizes time with frames
  }
}

function formTerrain(hectareLink, hectareLength, hectareWidth) {
  // creates and returns eroded hectare
  let hectare = {
    x: hectareLink, // connects terrain by starting where the previous hectare ended
    y: height - hectareLength,
    w: hectareWidth,
    h: hectareLength,
  };

  return hectare;
}
