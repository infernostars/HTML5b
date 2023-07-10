/*
0,90.288,0.9279999999999999
0,104.64479232,2.71880192
0,107.619833856,2.9750415360000004
x,110.7998670848,3.1800332288000006
0,141.1295558622118,2.2681770131456007
0,143.74409747272827,2.614541610516481
x,146.63573076114145,2.891633288413185
-,149.74903739187198,3.1133066307305484
x,153.03968269645642,3.290645304584439
0,156.47219894012397,3.4325162436675516
0,160.01821193505802,3.5460129949340415
0,163.65502233100526,3.6368103959472338
0,167.36447064776306,3.709448316757787
0,171.1320293011693,3.7675586534062298
x,174.9460762238943,3.814046922724984
x,178.79731376207428,3.851237538179987
x,152.21251472614554,-1.7500839075480716
x,151.6124476001071,-0.6000671260384574
x,151.93239389927632,0.3199462991692341
x,151.3883509386117,-0.5440429606646128
0,168.41054674170496,0

*/
//187.00724195173478
//263
//293
//323
const charId = 3;
let startX = 708.9991079701917;
let startVel = -3.999776992548016;
const targetX = 697;
const checkPos = true;
const checkVel = true;
const base = 3; // 3 for no z presses, 6 for z presses included
// const head = [1,2,2,2,2,2,2,2,2,2,2,2,2,2];
// const tail = [1,0,0,2,0,0,2,1,3,2,2,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// const head = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
const head = [];
const tail = [];
let isControl = true;
const isonob = false;

const charD = [
	[28,45.4,0.45,27,0.8,false,1,1,true,10],
	[23,56,0.36,31,0.8,false,1.7,1,true,10],
	[20,51,0.41,20,0.85,false,5,1,false,10],
	[10,86,0.26,31,0.8,false,1.6,1,true,10],
	[10,84,0.23,31,0.8,false,1.4,1,true,10],
	[28,70,0.075,28,0.8,false,9,1,true,10],
	[26,49,0.2,20,0.75,false,0.6,1,false,10],
	[44,65,0.8,20,0.75,false,0.8,1,false,10],
	[16,56,0.25,17,0.76,false,0.8,1,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[0,0,0,0,0,false,1,0,true,10],
	[36.5,72.8,1,20,0.6,false,0,1,true,6],
	[15.1,72.8,0.6,20,0.7,true,0,1,true,6],
	[20,40,0.15,20,0.7,true,0.7,1,true,6],
	[25,50,0.64,20,0.6,true,0.1,1,true,6],
	[25,10,1,5,0.7,true,0.2,1,true,4],
	[25,50,1,20,0.7,true,0.1,1,true,3],
	[25,29,0.1,20,0.8,true,1,1,true,6],
	[21.5,43,0.3,20,0.6,true,0.5,1,true,6],
	[35,60,1,20,0.7,true,0.1,1,true,3],
	[22.5,45,1,20,0.7,true,0.8,1,true,3],
	[25,50,1,20,0.7,true,0.1,27,true,3],
	[15,30,0.64,20,0.6,true,0.2,1,true,3],
	[10,55,0.8,20,0.3,true,0.4,1,true,6],
	[45,10,1,20,0.7,true,0.2,1,true,4],
	[20,40,1,20,0.8,false,0.8,5,true,3],
	[16,45,0.4,20,0.94,false,1.1,60,true,3],
	[25,10,1,20,0.7,true,0.3,1,true,3],
	[45,10,0.4,20,0.7,true,0.7,1,true,4],
	[15,50,0.1,20,0.8,true,1.9,1,true,6],
	[25,25,0.1,20,0.8,true,1.7,1,true,6],
	[30,540,10,20,0.4,true,0,1,true,3]
];
const power = 1;
const jumpPower = 11;

let char;

let keyPattern = [0]; // 0 - nothing, 1 - left press, 2 - right press
let qPress = false;

let postHeadQPress = false;
let postHeadIsControl = true;


function main() {
	// Evaluate head
	initChar();
	for (var i = 0; i < head.length; i++) {
		simulateFrame(head[i]);
	}
	startX = char.x;
	startVel = char.vx;
	postHeadIsControl = isControl;
	postHeadQPress = qPress;

	for (var j = 0; j < 100000; j++) {
		keyPattern = [...Array.from(j.toString(base), Number), ...tail];
		initChar();
		for (var i = 0; i < keyPattern.length; i++) {
			simulateFrame(keyPattern[i]);
		}
		// if ((char.x + 30) % 30 < 0.01) {
		if (((!checkPos) || (checkPos && char.x-targetX < 0.01 && char.x-targetX > 0)) &&
			((!checkVel) || checkVel && char.vx == 0)) {
			console.log(j + ': ' + char.x + ' with velocity ' + char.vx);
			console.log(keyPattern);
			// break;
		}
	}
}
function simulateFrame(key) {
	if (isControl) {
		if (key%3 == 1) {
			char.moveHorizontal(-power);
		} else if (key%3 == 2) {
			char.moveHorizontal(power);
		}
		if (key%3 == 0) char.stopMoving();
	}
	if (key >= 3 && !qPress) {
		isControl = !isControl;
		if (!isControl) char.stopMoving();
		qPress = true;
	} else {qPress = false;}
	char.applyForces(char.weight2, isControl, jumpPower * 0.7);
	char.charMove();
}

function initChar() {
	char = new Character(charId,startX,0,0,0,10,charD[charId][0],charD[charId][1],charD[charId][2],charD[charId][2],charD[charId][3],charD[charId][4],charD[charId][6],charD[charId][8]);
	char.vx = startVel;
	isControl = postHeadIsControl;
	qPress = postHeadQPress;
}

class Character {
	constructor(tid, tx, ty, tpx, tpy, tcharState, tw, th, tweight, tweight2, th2, tfriction, theatSpeed, thasArms) {
		this.id = tid;
		this.x = tx;
		this.y = ty;
		this.px = tx;
		this.py = ty;
		this.vx = 0;
		this.vy = 0;
		this.onob = isonob;
		this.dire = 4;
		this.carry = false;
		this.carryObject = 0;
		this.carriedBy = 200;
		this.landTimer = 200;
		this.deathTimer = 30;
		this.charState = tcharState;
		this.standingOn = -1;
		this.stoodOnBy = [];
		this.w = tw;
		this.h = th;
		this.weight = tweight;
		this.weight2 = tweight2;
		this.h2 = th2;
		this.atEnd = false;
		this.friction = tfriction;
		this.fricGoal = 0;
		this.justChanged = 2;
		this.speed = 0;
		this.motionString = [];
		this.buttonsPressed = [];
		this.pcharState = 0;
		this.submerged = 0;
		this.temp = 0;
		this.heated = 0;
		this.heatSpeed = theatSpeed;
		this.hasArms = thasArms;
		this.placed = true; // used in the level creator

		this.frame = 3;
		this.poseTimer = 0;
		this.leg1frame = 0;
		this.leg2frame = 0;
		this.legdire = 1;
		this.leg1skew = 0;
		this.leg2skew = 0;
		this.legAnimationFrame = [0, 0]; // Animation offset.
		this.burstFrame = -1;
		this.diaMouthFrame = 0;
		this.expr = 0;
		this.acidDropTimer = [0, 0]; // Why am I doing it like this
	}

	applyForces(grav, control, waterUpMaxSpeed) {
		let gravity = Math.sign(grav) * Math.sqrt(Math.abs(grav));

		// if (!this.onob && this.submerged != 1) this.vy = Math.min(this.vy + gravity, 25);
		if (this.onob || control) {
			this.vx = (this.vx - this.fricGoal) * this.friction + this.fricGoal;
		} else {
			this.vx *= 1 - (1 - this.friction) * 0.12;
		}

		if (Math.abs(this.vx) < 0.01) this.vx = 0;

		// if (this.submerged == 1) {
		// 	this.vy = 0;
		// 	if (this.weight2 > 0.18) this.submerged = 2;
		// } else if (this.submerged >= 2) {
		// 	if (this.vx > 1.5) this.vx = 1.5;
		// 	if (this.vx < -1.5) this.vx = -1.5;

		// 	if (this.vy > 1.8) this.vy = 1.8;
		// 	if (this.vy < - waterUpMaxSpeed) this.vy = - waterUpMaxSpeed;
		// }
	}

	charMove() {
		// this.y += this.vy;
		this.x += this.vx;
	}

	moveHorizontal(power) {
		if (power * this.fricGoal <= 0 && !this.onob) this.fricGoal = 0;
		this.vx += power;
		if (power < 0) this.dire = 1;
		if (power > 0) this.dire = 3;
		this.justChanged = 2;
	}

	stopMoving() {
		if (this.dire == 1) this.dire = 2;
		if (this.dire == 3) this.dire = 4;
	}

	jump(jumpPower) {
		this.vy = jumpPower;
	}

	swimUp(jumpPower) {
		this.vy -= this.weight2 + jumpPower;
	}

	setFrame(newFrame) {
		if (newFrame != this.frame) {
			if (!((this.frame == 5 && newFrame == 4) || (this.frame == 4 && newFrame == 5))) this.poseTimer = 0;
			this.frame = newFrame;
			if (cutScene == 3 && this.expr != this.dExpr) this.expr = this.dExpr;
		}
	}
}

window.onload = function () {
	main();
};