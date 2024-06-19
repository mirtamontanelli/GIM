function setup() { 
	createCanvas(windowWidth, windowHeight ) 
}
function windowResized() { 
	resizeCanvas(windowWidth, windowHeight) 
}

function draw() {
	background (0)
	stroke (255)

for (let i = 0; i < 10; i++) {
    let gocciax = random(0, width)
    let gocciay = random(0, height)
    let lunghezza = random (20, 100)
    line(gocciax, gocciay, gocciax, gocciay + lunghezza)


}
}
