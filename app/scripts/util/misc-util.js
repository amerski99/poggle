
const util = {
	randomInt: function randomInt(min, max) {
		// single parameter for max (assume 0 start)
		if (arguments.length == 1) {
			max = min;
			min = 0;
		}

		return Math.floor(Math.random() * (max - min)) + min;
	},
	range: function range(start, times) {
		// single parameter for times (assume 0 start)
		if (arguments.length == 1) {
			times = start;
			start = 0;
		}
		return [...new Array(times)].map((_, i) => i + start);
	},
	displayLetter: function displayLetter(letter) {
		return letter == 'q' ? 'qu' : letter
	},
	displayWord: function displayWord(letters) {
		return letters.map(util.displayLetter).join('');
	}
};

module.exports = util;