// fractal circle and sierpinski triangle demo
// Rainn Morphy
// Dec 22nd, 2024

let mode = "circle";

let theDepth = 0;

let initalTriangle;
let theColors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initalTriangle = [
    { x: width * 0.5, y: height * 0.2 },
    { x: width * 0.2, y: height * 0.8 },
    { x: width * 0.8, y: height * 0.8 }
  ];
}

function draw() {
  background(220);
  if (mode === "circle") {
    recursiveCircle(width / 2, height / 2, width / 2);
  }
  else if (mode === "triangle") {
    sierpinski(initalTriangle, 7);
  }
}

function recursiveCircle(x, y, radius) {
  fill(255, 0, 0);
  circle(x, y, radius * 2);

  // exit clause
  if (radius > 30) {
    recursiveCircle(x - radius / 2, y, radius / 2);

    recursiveCircle(x + radius / 2, y, radius / 2);
  }
}

function keyPressed(event) {
  if (key === "Shift" && event.code === "ShiftLeft") { // switches to 'circle' mode if left shift is clicked
    mode = "circle";
  }
  if (key === "Shift" && event.code === "ShiftRight") { // switches to 'triangle' mode if right shift is clicked
    mode = "triangle";
  }
}

function sierpinski(points, depth) {
  fill(theColors[depth]);
  triangle(
    points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y
  );

  // exit clause
  if (depth > 0) {
    // draw upper triangle
    sierpinski([points[0],
      midpoint(points[0], points[1]),
      midpoint(points[0], points[2])],
    depth - 1);

    // draw upper triangle
    sierpinski([points[1],
      midpoint(points[0], points[1]),
      midpoint(points[1], points[2])],
    depth - 1);

    // draw upper triangle
    sierpinski([points[2],
      midpoint(points[0], points[2]),
      midpoint(points[1], points[2])],
    depth - 1);
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return { x: midX, y: midY };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}