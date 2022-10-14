let myVideo;
let friends = {};
let liveMediaConnection;

function setup() {
  createCanvas(1280, 480);
  liveMediaConnection = new p5LiveMedia(this, "DATA", null, "my-cool-room");
  liveMediaConnection.on("stream", gotStream);
  liveMediaConnection.on("data", gotData);
  myVideo = createCapture(VIDEO, gotLocalMediaStream);
  myVideo.muted = true;
  myVideo.hide();
}

function gotLocalMediaStream(stream) {
  console.log("got local stream!");
  liveMediaConnection.addStream(stream, "CAPTURE");
}

// function gotData(data) {
//   console.log(data);
// }

// We got a new stream!
function gotStream(stream, id) {
  console.log("got remote stream!");
  friends[id] = new Friend(stream);

  stream.hide();
}

function mouseMoved() {
  let myPosition = {
    x: mouseX,
    y: mouseY,
  };

  // Have to send string
  liveMediaConnection.send(JSON.stringify(myPosition));
}

function gotData(data, id) {
  console.log("Got data:",dataÎ);

  // If it is JSON, parse it
  let parsedData = JSON.parse(data);

  if (friends[id]) {
    friends[id].x = parsedData.x;
    friends[id].y = parsedData.y;
  }
}

function draw() {
  background(220,100,50);
  stroke(255);
  strokeWeight(2);
  textSize(24);

  if (myVideo != null) {
    image(myVideo, mouseX, mouseY, 100,100);
  }

  for (let id in friends) {
    friends[id].update();
    friends[id].draw();
  }
}

class Friend {
  constructor(video) {
    this.x = random() * width;
    this.y = random() * height;
    this.video = video;
  }

  update() {
    // this will run every frame!
  }

  draw() {
    image(this.video, this.x, this.y, 100, 100);
  }
}
