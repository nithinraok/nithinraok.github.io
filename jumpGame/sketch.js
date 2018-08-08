
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
var audioCtx;
var isRecording;
var float32New;


function preload(){
	backgroundImg = loadImage('background1.png');
	playerImg = loadImage('marioIcon.png');
	jumpSound = loadSound('jumpSound.mp3');
	overSound = loadSound('gameOver.mp3');
}
function setup(){
	createCanvas(1024,625);
	background(135,206,250);
	webPreferences: {
    nodeIntegrationInWorker: true
  }
	background(backgroundImg);
	startButton = createButton('Start Recording');
	stopButton = createButton('Stop Recording');

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

	//AUDIO CONTEXT
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// const Pitchfinder = require("pitchfinder");


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
	text("Time left is "+(65-count),10,50);

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
	print("Recording Started");

	// prompts user to enable their browser mic
	if(!isRecording){
	mic.start();
	// // connect the mic to the recorder
	recorder.setInput(mic);
	recorder.record(soundFile);
  //
	playerCount+=1;
	player.jump(1);
	isRecording=true;
}

}

function stopAudio(){
	if(isRecording){
		print("Recording Stopped");
		recorder.stop();
		mic.stop();
		// saveSound(soundFile, 'mySound.wav');
		isRecording=false;
		updatePitch();

		//float32Buffer=audioCtx.decodeAudioData('mySound.wav');
		playerCount+=1;
		player.jump(-1)
		getData();

	}else{
		print("Recording is not started");
	}



	// playerCount+=1;
	// player.jump(updatePitch());
}
function updatePitch(){

	return -1;

}

function getData() {
  //source = audioCtx.createBufferSource();
	//var float32Buffer;
  request = new XMLHttpRequest();

  request.open('GET', 'mySound.wav', true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

		console.log(audioData);

    audioCtx.decodeAudioData(audioData,function(float32Buffer){
			//print('Hey you decoded the wav file');
			console.log(float32Buffer);
			float32New=float32Buffer;

		},

      function(e){"Error with decoding audio data" + e.error});

  }

  request.send();

}
