const React = require('react');
const Board = require('./board.jsx');
const ScoreSheet = require('./score-sheet.jsx');
const util = require('../util/misc-util.js');

class PoggleGame extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = this.generateNewGameState();
	}

	//<editor-fold desc="Game Logic">
	getCurrentLetters() {
		return this.state.selectedPath
			.map(pt => this.state.boardLetters[pt[0]][pt[1]]);
	}

	getCurrentWordDisplay() {
		// replace qs with qu
		return util.displayWord(this.getCurrentLetters());
	}

	// create/return copy of the selected flag matrix, updating a single value on copy
	updateBoardSelected(point, value) {
		let boardSelected = this.state.boardSelected.slice();
		boardSelected[point[0]][point[1]] = value;

		return boardSelected;
	}

	validateWord(currentLetters) {
		if (currentLetters.length < 3) {
			return Promise.reject('Words must be at least 3 letters');
		}

		// make sure they haven't already submitted this word
		if (this.state.completedWords.any(e => e.equals(currentLetters))) {
			return Promise.reject('You have already used the word "' + this.getCurrentWordDisplay() + '"');
		}

		return Promise.resolve();
	}

	generateNewGameState() {
		return {
			selectedPath: [],
			completedWords: [],
			boardLetters: this.generateBoardLetters(),
			boardSelected: this.generateBoardSelected()
		};
	}

	generateBoardSelected() {
		// start selected matrix off with 0 for each tile (non-zero means selected)
		return util.range(this.props.rows)
			.map(() => new Array(this.props.cols).fill(0));
	}

	generateBoardLetters() {
		// make sure there are enough dice to cover the whole board
		if (this.props.dice.length < this.props.rows * this.props.cols) {
			throw Error("Insufficient number of dice for board size");
		}

		// copy the dice array and shuffle it
		let dice = this.props.dice.slice().shuffle();

		// fill [rows x cols] matrix with random letters from the shuffled die
		let diceIndex = 0;
		return util.range(this.props.rows).map(() =>
			util.range(this.props.cols).map(() =>
				dice[diceIndex++][util.randomInt(dice[diceIndex-1].length)])
		);
	}
	//</editor-fold>

	//<editor-fold desc="Event Handlers">
	newGame() {
		// don't need to confirm if they have no words
		if (!this.state.completedWords.length || confirm('Are you sure you want to start a new game?')) {
			this.setState(this.generateNewGameState());
		}
	}

	engageTile(row, col) {
		if (this.state.isWorking) return;

		let isSelected = this.state.boardSelected[row][col];
		let point = [row,col];

		// if the tile is already selected, only unselect if it was the last selected
		if (isSelected) {
			if (this.state.selectedPath.last().equals(point)) {
				// updated selected flags matrix and selected path
				this.setState({
					selectedPath: this.state.selectedPath.slice(0, this.state.selectedPath.length-1),
					boardSelected: this.updateBoardSelected(point, 0),
					error: undefined // clear any errors
				});
			}
		}

		// if the tile is not already selected, select it if it is the first tile
		// or if it is adjacent to the last selected tile
		else if (this.state.selectedPath.length === 0
			|| arePointsAdjacent(this.state.selectedPath.last(), point))
		{
			// updated selected flags matrix and selected path
			this.setState({
				selectedPath: this.state.selectedPath.concat([point]),
				boardSelected: this.updateBoardSelected(point, 1),
				error: undefined
			});

		}
	}

	submitWord() {
		if (this.state.isWorking) return;

		this.setState({ isWorking: true });

		let currentLetters = this.getCurrentLetters();

		this.validateWord(currentLetters)
			.then(() =>
				this.setState({
					// add current word to list of completed words
					completedWords: this.state.completedWords.concat([currentLetters]),
					// clear the selected flags for the board and selectedPath
					boardSelected: this.generateBoardSelected(),
					selectedPath: [],
					isWorking: false,
					error: undefined
				})
			)
			.catch(error =>
				this.setState({
					error: error,
					isWorking: false
				})
			);

	}
	//</editor-fold>

	//<editor-fold desc="Render">
	render() {
		return (
			<div className="game-area">
				<div className="play-area">
					<Board selected={this.state.boardSelected}
						   letters={this.state.boardLetters}
						   onClick={(row,col) => this.engageTile(row,col)} />
					<section>
						<div className="current-header">Current Word</div>
						<div className="current-word">{this.getCurrentWordDisplay()}</div>
					</section>
					<div className={'error' + (this.state.error ? ' active' : '')}>{this.state.error}</div>
					<button className="button" onClick={()=>this.submitWord()}>
						Submit Word
					</button>
				</div>
				<ScoreSheet words={this.state.completedWords} />
				<button className="new-game" onClick={()=>this.newGame()}>New Game</button>
			</div>
		);
	}
	//</editor-fold>
}

function arePointsAdjacent(a, b) {
	// if they are within 1 space in both directions...
	return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
}

module.exports = PoggleGame;