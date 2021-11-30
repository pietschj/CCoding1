let arrows = [];
let howManyXold, howManyYold 


let params = {
	howManyX: 15,
	howManyY: 9,
	offsetX: 40,
	offsetY: 50,
	spacingX: 60,
	spacingY: 60,
	arrowScale: 50,
	shape: ['arrow', 'triangle'],
	strokeWidth: 4,
	strokeColor: '#00ddff',
	drawStroke: true,
	fillStroke: false,

	howManyXMin: 2,
	howManyYMin: 2,
	offsetXMin: 0,
	offsetYMin: 0,
	spacingXMin: 5,
	spacingYMin: 5,
	arrowScaleMin: 1,

	howManyXMax: 30,
	howManyYMax: 20,
	offsetXMax: 80,
	offsetYMax: 80,
	spacingXMax: 200,
	spacingYMax: 200,
	arrowScaleMax: 100
}



let gui;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// create the GUI
	gui = createGui('Change Arrow Grid');
	gui.addObject(params);

	//calculate offsetX and offsetY to center the grid
	//inside the canvas
	params.offsetX = width - params.howManyX * params.spacingX/2;
	params.offsetY = height - params.howManyY * params.spacingY/2;
	arrows = buildArray(params.howManyX, params.howManyY);


}

function buildArray(x,y) {
		console.log("===buildArray method!")
		let tempArrows = []		//getting some arrows going
		for (let i=0;i<x; i++) {
			for (let j=0;j<y; j++){
				let tempArrow = new Arrow(params.offsetX + (params.spacingX *i) , params.offsetY + (params.spacingY *j), 0, params.arrowScale/100)
				tempArrows.push(tempArrow);
			}
		}
		return tempArrows;
}

function draw() {
    background(200);
    //drawing some arrows from the Array
	let index = 0;

	//check if change in howManyX or howManyY triggered through UI
	if (howManyXold != params.howManyX || howManyYold != params.howManyY){
		console.log("Arrow numbers changed. Rebuilding Array");
		arrows = buildArray(params.howManyX, params.howManyY);
		console.log("New array length: ", arrows.length);
	}

	for (let i=0;i<params.howManyY; i++) {
		for (let j=0;j<params.howManyX; j++){
			let curArrow = arrows[index];
			//update curArrow object with refreshed params from UI
			curArrow.x = params.offsetX + (params.spacingX * i)
			curArrow.y = params.offsetY + (params.spacingY * j)
			curArrow.sc = params.arrowScale
			

			curArrow.update();
			curArrow.draw();
			index = index + 1;
		}
	}

	//update values in howManyXold and howManyYold to compare 
	howManyXold = params.howManyX;
	howManyYold = params.howManyY;

	

}

// dynamically adjust the canvas to the window
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


class Arrow {
	constructor(x, y, rotation, sc) {
		this.x = x;
		this.y = y;
		this.scale = sc;
		this.rotation = rotation;
	}

    update() {
        let dx = (mouseX/this.scale) - this.x;	
        let dy = (mouseY/this.scale) - this.y; 
        let angle = atan2(dy, dx);
        this.rotation = angle;
    }

	draw() {
		push();
			scale(this.scale)
			translate(this.x, this.y);
			rotate(this.rotation);
			//fill(this.c);
			//stroke();
			//arrow shape
			line(-50, -25, 0, -25);
			line(0, -25, 0, -50);
			line(0, -50, 50, 0);
			line(50, 0, 0, 50);
			line(0, 50, 0, 25);
			line(0, 25, -50, 25);
			line(-50, 25, -50, -25);
			//triangle
			//triangle(0,0,25,25,-25,25)
		pop();
	}
}
