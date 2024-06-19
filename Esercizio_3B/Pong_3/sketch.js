let posX, posY;
let velX, velY;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  posX = width / 2 + random(1, 200);
  posY = height / 2 + random(1, 200);

  velX = random(25, 34);
  velY = random(8, 25);
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
 
  if (random(1) < 0.1) {
    particles.push(new Particle(posX, posY));
  }


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


  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.move();
    particle.display();


    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = random(-2, 2);
    this.velY = random(-2, 2);
    this.size = random(5, 20);
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x += this.velX;
    this.y += this.velY;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
}

