
var x1 = 0;
var lenPad = 50;
var y1 = 300;
var x2 = lenPad;
var manHeight = 15;
var manWidth = 10;

function setup() {
	createCanvas(720, 400);
background(0,10,0);
//const fs = require("fs");

}

function draw() {

stroke(255);
fill(255);
ellipse(x1+manHeight,y1-manHeight,manWidth,manWidth);
line(x1,y1,x2,y1);
var s=second();
noStroke();
fill(10);
rect(0, 20, 120, 120);
fill(100);
noStroke();
text('Time left to jump ' + s, 5, 50);
}

function keyPressed(){

	if(keyCode == UP_ARROW){
		x1=x1+lenPad+20;
		x2=x1+lenPad;
		y1=y1-lenPad;
	}

	if(keyCode == DOWN_ARROW){
		x1=x1+lenPad+2;
		x2=x1+lenPad;
		y1=y1+lenPad;
	}

	if(keyCode == RIGHT_ARROW){
		x1=x1+lenPad;
		x2=x1+lenPad;
		y1=y1+0;
	}

}
