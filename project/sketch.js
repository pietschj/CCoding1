let arrows = [];
let howManyXold, howManyYold 


let params = {
	howManyX: 7,
	howManyY: 9,
	offsetX: 80,
	offsetY: 60,
	spacingX: 60,
	spacingY: 60,
	
	shape: ['arrow', 'triangle'],
	strokeWidth: 4,
	strokeWidthMin:1,
	strokeWidthMax:11,
	strokeColor: '#00ddff',
	fillColor: '#00dd00',
	drawStroke: true,
	fillStroke: false,

	howManyXMin: 2,
	howManyYMin: 2,
	offsetXMin: 0,
	offsetYMin: 0,
	spacingXMin: 5,
	spacingYMin: 5,


	howManyXMax: 30,
	howManyYMax: 20,
	offsetXMax: 80,
	offsetYMax: 80,
	spacingXMax: 200,
	spacingYMax: 200,

	scale: 1,
	scaleMin: 0.1,
	scaleMax: 3,
	scaleStep: 0.1
}



let gui;

function setup() {
	createCanvas(800, 600);

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
				let tempArrow = new Arrow(params.offsetX + (params.spacingX *i) , params.offsetY + (params.spacingY *j), 0, params.arrowScale)
				tempArrows.push(tempArrow);
			}
		}
		return tempArrows;
}

function draw() {
    background(200,0,0);
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
			//console.log(curArrow)
			

			curArrow.update(params);
			curArrow.draw();
			index = index + 1;
		}
	}

	//update values in howManyXold and howManyYold to compare 
	howManyXold = params.howManyX;
	howManyYold = params.howManyY;

	

}




class Arrow {
	constructor(x, y, rotation, sc) {
		this.x = x;
		this.y = y;
		this.scale = sc;
		this.fCol = '#ffffff';
		this.strCol = '#ffffff';
		this.strW = 5;
		this.rotation = rotation;
		this.strBool = true;
		this.fillBool  = true;
		
	}

    update(paraList) {
        let dx = (mouseX/this.scale) - this.x;	
        let dy = (mouseY/this.scale) - this.y; 
		
        let angle = atan2(dy, dx);
        this.rotation = angle;
		this.strBool = paraList.drawStroke;
		this.strCol = paraList.strokeColor;
		this.strW = paraList.strokeWidth;
		this.fillBool = paraList.fillStroke;
		this.fCol = paraList.fillColor;
		this.scale = paraList.scale
    }

	draw() {
		push();
			
			scale(this.scale)
			translate(this.x/ this.scale, this.y / this.scale);
			rotate(this.rotation);
			if (this.fillBool) {
				fill(this.fCol)
			} else {
				noFill();
			}

			if (this.strBool) {
				strokeWeight(this.strW)
				stroke(this.strCol);
			}
			else {
				noStroke();
			}
			//arrow shape
			/*line(-50, -25, 0, -25);
			line(0, -25, 0, -50);
			line(0, -50, 50, 0);
			line(50, 0, 0, 50);
			line(0, 50, 0, 25);
			line(0, 25, -50, 25);
			line(-50, 25, -50, -25);*/
			//triangle
			triangle(0,0,25,25,-25,25)
		pop();
	}
}
