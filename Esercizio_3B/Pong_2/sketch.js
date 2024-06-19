let posX, posY;
let velX, velY;
let shapes = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  posX = width / 2 + random(1, 200);
  posY = height / 2 + random(1, 200);

  velX = random(25, 34);
  velY = random(8, 25);


  setInterval(addShape, 500);
}

function addShape() {
  shapes.push({
    x: posX,
    y: posY,
    size: random(20, 50),
    hue: random(360),
    lifespan: 255 
  });
}

function keyPressed() {
  if (key == 's') {
    save('pattern.png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
 
  posX += velX;
  posY += velY;


  if (posX >= width - 65 || posX < 65) {
    velX = -velX;
  }
  if (posY >= height - 50 || posY < 50) {
    velY = -velY;
  }


  fill(0); 
  noStroke();
  ellipse(posX, posY, 100);

  
  blendMode(BLEND); 
  background(255, 30); 

  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];
    fill(shape.hue, 100, 100, shape.lifespan);
    noStroke();
    ellipse(shape.x, shape.y, shape.size);

    shape.lifespan -= 5; 
    if (shape.lifespan <= 0) {
      shapes.splice(i, 1); 
    }
  }
}



