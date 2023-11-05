// Moving
// Grabbing and Throwing
// Collision
// Jumping
// Switching Characters
// Death Checks

// 0 - 
// 1 - L
// 2 - R
// 4 - U
// 5 - LU
// 6 - RU
// 8 - D
// 9 - LD
// 10 - RD
// 16 - Z
// 17 - LZ
// 18 - RZ
// 20 - UZ
// 21 - LUZ
// 22 - RUZ
// 32 - J
// 33 - LJ
// 34 - RJ
// 36 - UJ
// 37 - LUJ
// 38 - RUJ
// 40 - DJ
// 41 - LDJ
// 42 - RDJ

const generations = 3;

const states = [[{
	control:0,
	inputString:[0],
	cornerHangTimer:0, // needs a default value
	char:[
		{ 
			// Book
			x:90,y:330,px:0,py:0,vx:0,vy:0,
			onob:false,dire:4,
			carry:false,weight2:0.36,
			landTimer:200,deathTimer:30,
			standingOn:-1,
			fricGoal:0,justChanged:2
		},
		{
			// Match
			x:45,y:330,px:0,py:0,vx:0,vy:0,
			onob:false,dire:4,
			carry:false,weight2:0.26,
			landTimer:200,deathTimer:30,
			standingOn:-1,
			fricGoal:0,justChanged:2
		}
	]
}]];

const charD = [
	[23,56,0.36,31,0.8,false,1.7,1], // Book
	[10,86,0.26,31,0.8,false,1.6,1] // Match
];
const blockProperties = [
	// tile0
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,0,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[true,true,true,true,true,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,true,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,true,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,true,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,0,false],
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,120,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119]],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,0,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	// tile1
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,0,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,0,false,false,true,14,false,[0,1,2,3,4,5,6,7,8,9,10,11,12,13]],
	[true,true,true,true,false,false,false,false,true,false,false,0,6,false,false,true,12,true,[0,1,2,3,4,5,6,7,8,9,10,11]],
	[false,false,false,false,false,false,false,false,true,false,true,0,0,false,false,true,41,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]],
	[true,true,true,true,false,false,false,false,true,false,false,0,6,false,false,true,12,true,[0,1,2,3,4,5,6,7,8,9,10,11]],
	[true,true,true,true,true,true,true,true,false,false,false,0,0,false,false,true,1,true],
	[false,true,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,true,false,false,false,false,false,false,0,0,false,false,true,1,false],
	// tile2
	[true,true,true,true,false,true,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,true,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,true,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,true,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	// tile3
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,1,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,7,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,2,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,8,0,false,false,true,1,false],
	[false,true,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	// tile4
	[true,true,true,true,false,false,false,false,true,true,false,13,0,false,false,true,5,false],
	[true,true,true,true,false,false,false,false,true,true,false,14,0,false,false,true,5,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,true,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,true,false,true,false,true,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,true,true,false,false,true,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,true,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,0,false,false,true,3,true,[0,0,0,0,0,1,1,2,2,1,1]],
	// tile5
	[false,false,false,false,false,false,false,false,false,true,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
	[false,true,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,3,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,9,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,120,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119]],
	// tile6
	[true,true,true,true,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[false,true,false,false,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,3,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,2,true,[0,0,0,1,1,1]],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,true,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	// tile7
	[false,false,false,true,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,true,false,15,0,false,false,true,5,false],
	[true,true,true,true,true,true,true,true,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[true,true,true,true,false,false,false,false,true,false,false,0,0,false,false,true,30,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]],
	[false,false,false,false,true,true,true,true,true,false,false,0,0,false,false,true,20,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]],
	[false,false,false,false,true,true,true,true,true,false,false,0,0,false,false,true,20,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[true,true,true,true,true,true,true,true,true,false,false,0,1,false,false,true,1,false],
	// tile8
	[false,false,false,false,false,false,false,false,true,true,false,0,0,false,false,true,120,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119]],
	[false,true,false,false,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,1,false,false,true,1,false],
	[false,true,false,false,false,false,false,false,true,false,false,0,6,false,false,true,12,true,[0,1,2,3,4,5,6,7,8,9,10,11]],
	[false,true,false,false,false,false,false,false,true,false,false,0,6,false,false,false,1,false],
	[false,true,false,false,false,false,false,false,true,false,false,0,6,false,false,true,12,true,[0,1,2,3,4,5,6,7,8,9,10,11]],
	[false,true,false,false,false,false,false,false,true,false,false,0,6,false,false,false,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	// tile9
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,false,1,false],
	// tile10
	[false,false,false,false,true,true,true,true,false,false,false,0,1,false,true,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,0,false,false,true,60,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,true,true,true,true,false,false,false,0,1,false,true,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,0,false,false,true,60,true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,false,true,0,0,false,false,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,6,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,true,false,12,0,false,false,true,1,false],
	// tile11
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	// tile12
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,0,false],
	// tile13
	[false,false,false,false,false,false,false,false,false,false,false,0,0,false,true,true,1,false],
	[true,true,true,true,false,false,false,false,false,false,false,0,0,true,false,true,1,false],
	[false,false,false,false,false,false,false,false,false,true,true,0,0,false,false,false,1,false],
	[false,true,false,false,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
	[false,false,false,false,false,false,false,false,true,false,false,0,2,false,false,true,1,false],
];
const power = 1;
const jumpPower = 11;

const levelString = `..v.v..vvv...vv..v.v.....²²²²²²²
..v.v...v.....v....v...........¶
..v.v...v..........v...........¶
..v............................¶
...............................¶
.............................R.¶
...........................²²¶¶¶
..............¢..........¶¶²²¶¶¶
.......¶¶¹¹¹¹¹¹¹¹¹¶¶v|v²²¶¶²²...
.......¶¶¸¸¸¸¸¸¸¸¸¶¶.:.²²¶¶.....
.......¶¶¶¶¶¶¶¶¶¶¶¶¶v|v²².......
²²²²..........F.................
²²²²..........F.................
......}.......F.................
......}.......F.................
......}......²²²²²²..........4..
......²²²²...²²²²²².²;²;²;²¶¶¶¶.
......²²²²....F..F..²²²²²²²¶¶¶¶.`;

let thisLevel;

function main() {
	// TODO: Maybe have i start at 1 so you don't have to keep adding 1 to it.
	for (let i = 0; i < generations; i++) {
		states.push([]);
		for (let j = states[i].length - 1; j >= 0; j--) {
			let currentState = states[i][j];
			// Put end conditions here

			// Create new branches
			branch(states[i+1], currentState, 0);
			let lastKey = currentState.inputString[i];
			let canU = false;
			let canD = false;
			if ((lastKey & 4) == 0) {  // U, Add check if can grab
				canU = true;
				branch(states[i+1], currentState, 4);
			}
			if ((lastKey & 8) == 0 && currentState.char[currentState.control].carry) { // D
				canD = true;
				branch(states[i+1], currentState, 8);
			}
			if ((lastKey & 16) == 0) { // Z
				branch(states[i+1], currentState, 16);
				if (canU) branch(states[i+1], currentState, 20); // UZ
			}
			if ((lastKey & 32) == 0 && currentState.char[currentState.control].onob) { // J 
				branch(states[i+1], currentState, 32);
				if (canU) branch(states[i+1], currentState, 36); // UJ
				if (canD) branch(states[i+1], currentState, 40); // DJ
			}











			// Simulation
			for (let k = states[i+1].length - 1; k >= 0; k--) {
				let thisState = states[i+1][k];
				let keysPressed = thisState.inputString[i+1];
				let otherChar = ~thisState.control;

				// Keys
				if (thisState.cornerHangTimer == 0) {
					if ((keysPressed & 1) == 0) { // Left
						moveHorizontal(thisState.char[thisState.control], -power);
					} else if ((keysPressed & 2) == 0) { // Right
						moveHorizontal(thisState.char[thisState.control], power);
					}
				}
				if ((keysPressed & 3) == 0) stopMoving(thisState.char[thisState.control]);

				if ((keysPressed & 4) == 0) { // Up
					if (thisState.char[thisState.control].deathTimer >= 30) {
						if (thisState.char[thisState.control].carry) {
							putDown(thisState.control);
							charThrow(thisState.control);
						} else {
							if (
								near(thisState.control, otherChar) &&
								onlyMovesOneBlock(otherChar, thisState.control)
							) {
								// if (ifCarried(otherChar)) putDown(thisState.char[otherChar].carriedBy);
								thisState.char[thisState.control].carry = true;
								thisState.char[otherChar].weight2 = charD[otherChar].weight;
								thisState.char[thisState.control].weight2 = charD[otherChar].weight + charD[thisState.control].weight;
								rippleWeight(thisState.control, thisState.char[otherChar].weight2, 1);
								fallOff(otherChar);
								aboveFallOff(otherChar);
								thisState.char[otherChar].justChanged = 2;
								thisState.char[thisState.control].justChanged = 2;
								if (thisState.char[otherChar].onob && thisState.char[thisState.control].y - thisState.char[otherChar].y > yOff(otherChar)) {
									thisState.char[thisState.control].y = thisState.char[otherChar].y + yOff(otherChar);
									thisState.char[thisState.control].onob = false;
									thisState.char[otherChar].onob = true;
								}
							}
						}
					}
				}
				if ((keysPressed & 8) == 0) { // Down
					if (thisState.char[thisState.control].carry) putDown(thisState.control);
				}
				if ((keysPressed & 16) == 0) {
					changeControl();
					// qTimer = 6;
				}
				if ((keysPressed & 32) == 0) {
					if (
						thisState.char[thisState.control].onob &&
						thisState.char[thisState.control].landTimer > 2
					) {
						thisState.char[thisState.control].jump(-jumpPower);
						thisState.char[thisState.control].onob = false;
						fallOff(thisState.control);
					}
				} else thisState.char[thisState.control].landTimer = 80;




				// Actual Simulation
				for (let c = 0; c < 2; c++) {
					thisState.char[c].landTimer++;
					if (thisState.char[c].carry && thisState.char[~c].justChanged < thisState.char[c].justChanged) {
						thisState.char[~c].justChanged = thisState.char[c].justChanged;
					}
					// if (thisState.char[c].standingOn == -1 && thisState.char[c].onob) {
					// 	thisState.char[c].fricGoal = onlyConveyorsUnder(i);
					// } else thisState.char[c].fricGoal = char[thisState.char[c].standingOn].vx;

					thisState.char[c].applyForces(thisState.char[c].weight2, thisState.control == c, jumpPower * 0.7);
					if (thisState.char[c].deathTimer >= 30) thisState.char[c].charMove();

					// if (thisState.char[c].justChanged >= 1) {
					// 	if (!ifCarried(c)) {
					// 		if (thisState.char[c].vy > 0 || (thisState.char[c].vy == 0 && thisState.char[c].vx != 0)) {
					// 			landOnObject(c);
					// 		}
					// 		if (thisState.char[c].vy < 0 && (thisState.char[c].charState == 4 || thisState.char[c].charState == 6) && !ifCarried(c)) {
					// 			objectsLandOn(i);
					// 		}
					// 	}
					// }
				}
				for (let c = 0; c < 2; c++) {
					if (thisState.char[c].vy != 0 || thisState.char[c].vx != 0 || thisState.char[c].x != thisState.char[c].px || thisState.char[c].py != thisState.char[c].y)
						thisState.char[c].justChanged = 2;
					if (thisState.char[c].justChanged >= 1) {
						if (ifCarried(c)) {
							thisState.char[c].vx = char[thisState.char[c].carriedBy].vx;
							thisState.char[c].vy = char[thisState.char[c].carriedBy].vy;

							if (char[thisState.char[c].carriedBy].x + xOff(c) >= thisState.char[c].x + 20) {
								thisState.char[c].x += 20;
							} else if (char[thisState.char[c].carriedBy].x + xOff(c) <= thisState.char[c].x - 20) {
								thisState.char[c].x -= 20;
							} else {
								thisState.char[c].x = char[thisState.char[c].carriedBy].x + xOff(c);
							}

							if (char[thisState.char[c].carriedBy].y - yOff(c) >= thisState.char[c].y + 20) {
								thisState.char[c].y += 20;
							} else if (char[thisState.char[c].carriedBy].y - yOff(c) <= thisState.char[c].y - 20) {
								thisState.char[c].y -= 20;
							} else {
								thisState.char[c].y = char[thisState.char[c].carriedBy].y - yOff(i);
							}
							thisState.char[c].dire = Math.ceil(char[thisState.char[c].carriedBy].dire / 2) * 2;
						}
						if (thisState.char[c].standingOn >= 0) {
							thisState.char[c].y = char[thisState.char[c].standingOn].y - char[thisState.char[c].standingOn].h;
							thisState.char[c].vy = char[thisState.char[c].standingOn].vy;
						}
						stopX = 0;
						stopY = 0;
						toBounce = false;
						if (newTileHorizontal(i, 1)) {
							if (horizontalType(i, 1, 8) && thisState.char[c].charState == 10) {
								startCutScene();
							}
							if (horizontalProp(i, 1, 7, thisState.char[c].x, thisState.char[c].y) && thisState.char[c].charState >= 7) {
								startDeath(i);
							} else if (thisState.char[c].x > thisState.char[c].px && horizontalProp(i, 1, 3, thisState.char[c].x, thisState.char[c].y)) {
								stopX = 1;
							}
						}
						if (newTileHorizontal(i, -1)) {
							if (horizontalType(i, -1, 8) && thisState.char[c].charState == 10) {
								startCutScene();
							}
							if (horizontalProp(i, -1, 6, thisState.char[c].x, thisState.char[c].y) && thisState.char[c].charState >= 7) {
								startDeath(i);
							} else if (thisState.char[c].x < thisState.char[c].px && horizontalProp(i, -1, 2, thisState.char[c].x, thisState.char[c].y)) {
								stopX = -1;
							}
						}
						if (newTileDown(i)) {
							if (verticalType(i, 1, 8, false) && thisState.char[c].charState == 10) {
								startCutScene();
							}
							if (verticalType(i, 1, 13, true)) {
								toBounce = true;
							} else if (verticalProp(i, 1, 5, thisState.char[c].px, thisState.char[c].y) && thisState.char[c].charState >= 7) {
								startDeath(i);
							} else if (thisState.char[c].y > thisState.char[c].py && verticalProp(i, 1, 1, thisState.char[c].px, thisState.char[c].y)) {
								stopY = 1;
							}
						}
						if (newTileUp(i)) {
							if (verticalType(i, -1, 8, false) && thisState.char[c].charState == 10) {
								startCutScene();
							}
							if (verticalProp(i, -1, 4, thisState.char[c].x, thisState.char[c].y) && thisState.char[c].charState >= 7) {
								startDeath(i);
							} else if (thisState.char[c].y < thisState.char[c].py && verticalProp(i, -1, 0, thisState.char[c].px, thisState.char[c].y)) {
								stopY = -1;
							}
						}
						if (stopX != 0 && stopY != 0) {
							// two coordinates changed at once! Make sure snags don't happen
							if (stopY == 1) {
								y = Math.floor(thisState.char[c].y / 30) * 30;
							}
							if (stopY == -1) {
								y = Math.ceil((thisState.char[c].y - thisState.char[c].h) / 30) * 30 + thisState.char[c].h;
							}
							if (!horizontalProp(i, stopX, stopX / 2 + 2.5, thisState.char[c].x, y)) {
								stopX = 0;
							} else {
								if (stopX == 1) {
									x = Math.floor((thisState.char[c].x + thisState.char[c].w) / 30) * 30 - thisState.char[c].w;
								}
								if (stopX == -1) {
									x = Math.ceil((thisState.char[c].x - thisState.char[c].w) / 30) * 30 + thisState.char[c].w;
								}
								if (!verticalProp(i, stopY, stopY / 2 + 0.5, x, thisState.char[c].y)) {
									stopY = 0;
								}
							}
						}
						if (stopX != 0) {
							thisState.char[c].fricGoal = 0;
							if (thisState.char[c].submerged >= 2) {
								let j = i;
								if (ifCarried(i)) {
									j = thisState.char[c].carriedBy;
								}
								if (char[j].dire % 2 == 1) {
									char[j].swimUp(0.14 / char[j].weight2);
									if (char[j].standingOn >= 0) {
										fallOff(i);
									}
									char[j].onob = false;
								}
							}
							if (thisState.char[c].id == 5) {
								startDeath(i);
							}
							if (stopX == 1) {
								x = Math.floor((thisState.char[c].x + thisState.char[c].w) / 30) * 30 - thisState.char[c].w;
							} else if (stopX == -1) {
								x = Math.ceil((thisState.char[c].x - thisState.char[c].w) / 30) * 30 + thisState.char[c].w;
							}
							thisState.char[c].x = x;
							thisState.char[c].vx = 0;
							stopCarrierX(c, x);
						}
						if (stopY != 0) {
							if (stopY == 1) {
								y = Math.floor(thisState.char[c].y / 30) * 30;
								if (!ifCarried(c)) thisState.cornerHangTimer = 0;
								fallOff(c);
								land(c, y, 0);
								land2(c, y);
							} else if (stopY == -1) {
								if (thisState.char[c].id == 5) {
									startDeath(i);
								}
								if (thisState.char[c].id == 3 && thisState.char[c].temp > 50) {
									thisState.char[c].temp = 0;
								}
								y = Math.ceil((thisState.char[c].y - thisState.char[c].h) / 30) * 30 + thisState.char[c].h;
								thisState.char[c].y = y;
								thisState.char[c].vy = 0;
								bumpHead(i);
								if (ifCarried(i)) {
									bumpHead(thisState.char[c].carriedBy);
								}
							}
							stopCarrierY(i, y, stopY == 1);
						}
						if (newTileHorizontal(i, 1) || newTileHorizontal(i, -1)) {
							if (verticalType(i, 1, 13, true)) {
								toBounce = true;
							}
							if (
								horizontalProp(i, 1, 14, thisState.char[c].x, thisState.char[c].y) ||
								horizontalProp(i, -1, 14, thisState.char[c].x, thisState.char[c].y)
							) {
								submerge(i);
							}
							if (horizontalType(i, 1, 15) || horizontalType(i, -1, 15)) {
								thisState.char[c].heated = 1;
							}
							checkButton(i);
						}
						if (newTileUp(i)) {
							if (verticalProp(i, -1, 14, thisState.char[c].x, thisState.char[c].y)) {
								submerge(i);
							}
							if (verticalType(i, -1, 15, false)) {
								thisState.char[c].heated = 1;
							}
						}
						if (newTileDown(i)) {
							if (verticalProp(i, 1, 14, thisState.char[c].x, thisState.char[c].y)) {
								submerge(i);
							}
							if (verticalType(i, 1, 15, false)) {
								thisState.char[c].heated = 1;
							}
						}
						if (thisState.char[c].submerged >= 2 && thisState.char[c].standingOn >= 0 && thisState.char[c].weight2 < 0) {
							fallOff(i);
						}
						if (thisState.char[c].submerged >= 2) {
							unsubmerge(i);
						}
						if (thisState.char[c].heated >= 1) {
							heat(i);
						} else if (thisState.char[c].id != 3 || thisState.char[c].temp <= 50) {
							if (thisState.char[c].temp >= 0) {
								thisState.char[c].temp -= thisState.char[c].heatSpeed;
								thisState.char[c].justChanged = 2;
							} else thisState.char[c].temp = 0;
						}
						if (thisState.char[c].heated == 2) {
							thisState.char[c].heated = 0;
						}
						if (thisState.char[c].standingOn >= 0) {
							let j = thisState.char[c].standingOn;
							if (Math.abs(thisState.char[c].x - char[j].x) >= thisState.char[c].w + char[j].w || ifCarried(j)) {
								fallOff(i);
							}
						} else if (thisState.char[c].onob) {
							if (!ifCarried(i) && thisState.char[c].standingOn == -1) {
								thisState.char[c].y = Math.round(thisState.char[c].y / 30) * 30;
							}
							if (!verticalProp(i, 1, 1, thisState.char[c].x, thisState.char[c].y)) {
								thisState.char[c].onob = false;
								aboveFallOff(i);
								if (ifCarried(i)) {
									cornerHangTimer = 0;
								}
							}
							if (thisState.char[c].charState >= 7 && verticalProp(i, 1, 5, thisState.char[c].x, thisState.char[c].y)) {
								startDeath(i);
							}
						}
					}
					thisState.char[c].px = thisState.char[c].x;
					thisState.char[c].py = thisState.char[c].y;

					// if (thisState.char[c].justChanged >= 1 && thisState.char[c].charState >= 5) {
					// 	if (toBounce) {
					// 		bounce(i);
					// 	}
					// 	getCoin(i);
					// }
					if (thisState.char[c].y > levelHeight * 30 + 160 && thisState.char[c].charState >= 7) {
						startDeath(i);
					}
				}
			}
		}
	}
}


function moveHorizontal(charRef, pwr) {
	// body...
}

function stopMoving(charRef) {
	// body...
}













function branch(statesFrame, parent, newKey) {
	statesFrame.push(
		{
			inputString:[...parent.inputString, newKey],
			control:parent.control,
			cornerHangTimer:parent.cornerHangTimer,
			char:[
				Object.assign({}, parent.char[0]),
				Object.assign({}, parent.char[1])
			]},
		{
			inputString:[...parent.inputString, newKey+1],
			control:parent.control,
			cornerHangTimer:parent.cornerHangTimer,
			char:[
				Object.assign({}, parent.char[0]),
				Object.assign({}, parent.char[1])
			]},
		{
			inputString:[...parent.inputString, newKey+2],
			control:parent.control,
			cornerHangTimer:parent.cornerHangTimer,
			char:[
				Object.assign({}, parent.char[0]),
				Object.assign({}, parent.char[1])
			]}
	);
}

window.onload = function () {
	main();
};