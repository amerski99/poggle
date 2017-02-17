const React = require('react');
const util = require('../util/misc-util.js');

function ScoreSheet(props) {
	// calculate score for each word
	let scores = props.words.map(calculateWordScore);
	// calculate total score (sum of all word scores)
	let totalScore = scores.sum();

	return (
		<aside className="score-box">
			<div className="word-list">
				<div className="words">
					<h2>Word</h2>
					{props.words.map(word =>
						<li key={word}>{util.displayWord(word)}</li>
					)}
				</div>
				<div className="scores">
					<h2>Score</h2>
					{scores.map((score, i) =>
						<li key={i}>{score}</li>
					)}
				</div>
			</div>
			<div className="total-score">
				<h2>Total Score</h2>
				<span>{totalScore}</span>
			</div>
		</aside>
	);
}

function calculateWordScore(letters) {
	// Score log is 2 minus the number of letters, with a max of 6
	return Math.max(Math.min(letters.length - 1, 6), 0);
}

module.exports = ScoreSheet;