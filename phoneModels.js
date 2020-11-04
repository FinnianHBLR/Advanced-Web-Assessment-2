//KNOWN ISSUE: The model of the phone has the same texture on all sides, this would be solved by creating a quad like this. https://stackoverflow.com/questions/43741561/how-do-i-is-it-posssible-to-keep-different-picture-in-each-side-of-box-in-p5

//Read more here: https://p5js.org/examples/3d-textures.html
//Vars
let img;
let theta = 7;


function loadModels() {
    //This will setup and draw the models.
    setup();
    draw();
}


function setup() {
    //This will create a canvas to add the phones too.
    createCanvas(800, 500, WEBGL);
  
    img = loadImage('apple.jpg');
    img2 = loadImage('android.jpg')
}

function draw() {
  background(250);
  push();
  //Only rotates on the Y axis.
  rotateY(theta * mouseX * 0.00005);
  texture(img);
  box(100, 200, 10);
  theta += 0.05;
  pop();
  
  push();
  //Only rotates on the Y axis.
  rotateY(theta * mouseX * 0.00005);
  texture(img2);
  
  //Move the box with translate.
  translate(150, 0);
  box(100, 200, 10);
  pop();

}

function home(){
    //This will take the user back home.
    window.location.replace("index.html");
}