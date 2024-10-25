// array popping demo
// Rainn Morphy
// Oct 10th, 2024

let bubbleMachine = []; // where blown/spawned bubbles are kept
let deathLocales = []; // death location of popped bubbles

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    // spawns 10 bubbles at start
    bubbleBlown();
  }

  // create a new bubble every half second
  window.setInterval(bubbleBlown, 500);
}

function draw() {
  background(220);

  // bubbleAdriftRandomly(); // moves around, going where the wind takes them
  bubbleAdriftNoisly(); // you are using weather machines(noise) to torture them

  // displays bubbles and their graves when murdered
  seeBubbles();
  seeGraves();
}

function seeGraves() {
  for (let graves of deathLocales) {
    // puts red 'X' where bubbles were popped
    textAlign(CENTER, CENTER);
    fill("red");
    text("X", graves.x, graves.y);
  }
}

function mousePressed() {
  // bubbldexes/indexes dead bubbles
  for (let bubble of bubbleMachine) {
    if (bubblePopped(mouseX, mouseY, bubble)) {
      let bubbldex = bubbleMachine.indexOf(bubble);
      bubbleMachine.splice(bubbldex, 1);
      bubbltaker(mouseX, mouseY);
    }
  }
}

function bubbltaker(deadX, deadY) {
  // logs the dead bubbles to the bubbltaker
  let graves = {
    x: deadX,
    y: deadY,
  };
  deathLocales.push(graves);
}

function bubblePopped(x, y, abubble) {
  // hit detection of bubbles
  let distance = dist(x, y, abubble.x, abubble.y);
  return distance < abubble.radius;
}

function bubbleAdriftNoisly() {
  // bubbles float using noise
  for (let bubble of bubbleMachine) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function bubbleAdriftRandomly() {
  // bubbles float using randomness
  for (let bubble of bubbleMachine) {
    let fate = random(100);
    if (fate < 50) {
      // move up
      bubble.y -= bubble.speed;
    }
    else if (fate < 65) {
      // move down
      bubble.y += bubble.speed;
    }
    else if (fate < 75) {
      // move right
      bubble.x += bubble.speed;
    }
    else {
      // move left
      bubble.x -= bubble.speed;
    }
  }
}

function seeBubbles() {
  // displays bubbles randomizing color, transparency, size, and spawn location
  for (let bubble of bubbleMachine) {
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function bubbleBlown() {
  // creates bubble using randomized variables
  let bubblbubbl = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    radius: random(20, 50),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(100000000),
    timeY: random(100000000),
    deltaTime: 0.006,
  };
  // adds the created bubble to be blown by the bubble machine
  bubbleMachine.push(bubblbubbl);
}