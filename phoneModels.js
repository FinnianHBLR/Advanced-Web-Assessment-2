let img;
let vid;
let theta = 7;


function loadModels() {
    // video source: https://vimeo.com/90312869
    setup();
    draw();
}


function setup() {
    createCanvas(800, 500, WEBGL);
  
    img = loadImage('apple.jpg');
    img2 = loadImage('android.jpg')
}

function draw() {
  background(250);
  push();
  //rotateZ(theta * mouseX * 0.00005);
  //rotateX(theta * mouseX * 0.00005);
  rotateY(theta * mouseX * 0.00005);
  texture(img);
  box(100, 200, 10);
  theta += 0.05;
  pop();
  
  push();
  //rotateZ(theta * mouseX * 0.00005);
  //rotateX(theta * mouseX * 0.00005);
  rotateY(theta * mouseX * 0.00005);
  texture(img2);
  //Move the box 
  
  translate(150, 0);
  box(100, 200, 10);
 
  pop();

}



function home(){
    window.location.replace("index.html");
}