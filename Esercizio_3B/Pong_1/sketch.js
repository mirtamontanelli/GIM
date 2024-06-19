let posX, posY;
let velX, velY;
let hueValue = 0; 
let rotationAngle = 0; 

function setup() {
createCanvas(windowWidth, windowHeight);


background(255);

posX = width / 2 + random(1, 200);
posY = height / 2 + random(1, 200);

velX = random(25, 34);
velY = random(8, 25);

colorMode(HSB, 360, 100, 100); 


setTimeout(clearPreviousLine, 2000);
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
posX = posX + velX;
posY = posY + velY;

if (posX >= width - 65 || posX < 65) {
velX = -velX;
}

if (posY >= height - 50 || posY < 50) {
velY = -velY;
}


hueValue = (hueValue + 1) % 360;


push();


translate(posX, posY);


rotate(radians(rotationAngle));


stroke(hueValue, 100, 100, 200); 
strokeWeight(5); 


line(-50, 0, 50, 0); 


pop();


rotationAngle += 1;
}


function clearPreviousLine() {

background(255);


stroke(255); 
strokeWeight(5); 
line(posX - 50, posY, posX + 50, posY); 
}





