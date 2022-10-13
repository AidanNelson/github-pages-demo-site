function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background((sin(frameCount/200)+0.5)*200,0,100);
}
