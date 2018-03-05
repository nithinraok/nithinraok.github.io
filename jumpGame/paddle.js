// PADDLE class for moving paddle randomly and crewating indipendent
// paddles

padSize = 40;
padStart=0;
padEnd = padStart+padSize;
padLoc = 600/2;
manHeight = 40;

class Paddle {

  constructor(){
    this.x1=padStart;
    this.y1=padLoc;
    this.x2=padEnd;


  }


drawPaddle(){
  stroke(0);
  fill(255,235,205);
  if(this.y1>height || this.y1<0){
    this.y1=this.y1+this.pos*manHeight;
  }
	rect(this.x1,this.y1,padSize+10,20);

}

updatePaddle(pos){
  this.pos=pos;
  this.x1= this.x1 + 2*padSize;
  this.y1=this.y1-pos*manHeight;
  this.x2=this.x2+2*padSize;
}
}
