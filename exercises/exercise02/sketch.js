

let params = {
	angle: 180,
	angleMin: 0,
    angleMax: 360,
    angleStep: 5,

	posX: 250,
	posXMin: 0,
    posXMax: 500,
    posXStep: 2,
    
    posY: 250,
	posYMin: 0,
    posYMax: 500,
    
    shapeW: 150,
	shapeWMin: 10,
    shapeWMax: 290,

    shapeH: 150,
	shapeHMin: 10,
    shapeHMax: 290,
    
    bgColor: [180, 255, 255],
    fColor: [255, 0, 0],
    fillToggle: true
    
}


let myPos;
let visible = true;
var gui;


function setup() {
    angleMode(DEGREES);
    createCanvas(500, 500);
    background(params.bgColor);
    
    myPos = createVector(params.posX, params.posY);
    // create the GUI
	gui = createGui('My Settings');
	gui.addObject(params);
    gui.setPosition(650, 250);
 
    
}

function draw() {
    clear();
    myPos = createVector(params.posX, params.posY);
    //console.log(myPos.x, myPos.y);

    background(params.bgColor);
    rectMode(CENTER);

    if (params.fillToggle == true) {
        fill(params.fColor);
    } else {
        noFill();
    }
    push();
    translate(myPos.x, myPos.y);
    rotate(params.angle);
        rect(0, 0,params.shapeW,params.shapeH, 25,75,25,75);
    pop();
}

// check for keyboard events
function keyPressed() {
    switch(key) {
      // type p to hide / show the GUI
      case 'p':
        visible = !visible;
        if(visible) gui.show(); else gui.hide();
        break;
    }
  }