const React = require('react');
const Tile = require('./tile.jsx');
const util = require('../util/misc-util.js');

function Board(props) {
	let rows = props.letters.length;
	let cols = rows ? props.letters[0].length : 0;

	let rowLists = util.range(rows)
		.map(row => {
			let rowItems = util.range(cols).map(col => {
				let isSelected = props.selected[row][col];
				let letter = props.letters[row][col];

				return <li key={row + '_' + col}>
					<Tile selected={isSelected}
						  value={letter}
						  onClick={() => props.onClick(row, col)} />
				</li>
			});

			return <li className="row" key={'row'+row}>
				<ul>{rowItems}</ul>
			</li>
		});

	return <ul className="board">{rowLists}</ul>
}

module.exports = Board;