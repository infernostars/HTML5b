const yDiffs = [-12.3514707296, -9.2920590215, -5.7227453619, -1.6435297511, 2.9455878112, 8.0446073248];
const shortest = 3;
const startY = 0.0031558105999889285*2;

const maxLength = 1000;

function main() {
	let currentY = startY;
	let seq = [];
	let totalLen = 0;
	for (var i = 0; i < maxLength; i++) {
		let j = 0;
		while (j < yDiffs.length && currentY+yDiffs[j] <= 0) j++;
		// currentY += yDiffs[Math.floor(Math.random()*(yDiffs.length-j)+j)];
		currentY += yDiffs[j];
		seq.push(j+shortest);
		totalLen += j+shortest+2;
		if (currentY < 0.01) {
			console.log(currentY);
			break;
		}
	}
	console.log(seq);
	console.log(totalLen);
	let fullString = '';
	for (var i = 0; i < seq.length; i++) {
		fullString += 'U D ';
		for (let j = 0; j < seq[i]; j++) {
			fullString += '- ';
		}
	}
	console.log(fullString);
}

window.onload = function () {
	main();
};