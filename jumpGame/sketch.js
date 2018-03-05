
pitch =0;
var gameJump=[];
var playerJump=[];
var playerCount=-1;
var gameCount=-1;
var count=0;
var inSec;
var inMin;
var upDown  = [-1,1];
continueGame=true;
playerScore=0;

function preload(){
	backgroundImg = loadImage('background1.png');
	playerImg = loadImage('marioIcon.png');
	jumpSound = loadSound('jumpSound.mp3');
	overSound = loadSound('gameOver.mp3');
}
function setup(){
	createCanvas(1024,625);
	background(135,206,250);
	background(backgroundImg);
	startButton = createButton('UP');
	stopButton = createButton('DOWN');

	//recordButton =
	startButton.position(10, 65);
	stopButton.position(10,125);
	padLoc = 2*height/3;
	//const detectPitch = new pitchfinder();

	inSec = second();
	inMin = minute();

	player = new Player('Nithin');
	paddle1 = new Paddle();

	startButton.mousePressed(startAudio);
	stopButton.mousePressed(stopAudio);

	mic = new p5.AudioIn();
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

}

function draw(){


	noStroke();
	fill(135,206,250);
	rect(10, 20, 200, 40);
	if(continueGame){
		updateTime();
		paddle1.drawPaddle();
		player.show();
	}else{
		textSize(50);
		fill(0,255,0);
		text('Your Score : '+playerScore,width/4,height/4);
		fill(255,0,0);
		text('GAME OVER',width/4,height/2);
	}

}

function updateTime(){
	textSize(32);
	fill(0);
	text("Time left is "+(60-count),10,50);

	if(minute()*60+second()>(inMin*60+inSec)){
		inSec=inSec+1;
      count+=1;
			if(count%5==0){
				var pos = random(upDown);
				paddle1.updatePaddle(pos);
				gameJump.push(pos);
				gameCount+=1;
				if(gameCount==12){
					continueGame=false;
				}
			}


	}
}

function startAudio(){
	print("START RECORDING");

	// prompts user to enable their browser mic
	mic.start();
	// connect the mic to the recorder
	recorder.setInput(mic);
	recorder.record(soundFile);

	playerCount+=1;
	player.jump(1);

}

function stopAudio(){
	print("STOP RECORDING");
	recorder.stop();
	save(soundFile, 'mySound.wav');

	playerCount+=1;
	player.jump(updatePitch());
}
function updatePitch(){

	return -1;

}
