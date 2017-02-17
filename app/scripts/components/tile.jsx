const React = require('react');
const util = require('../util/misc-util.js');

function Tile(props) {
	return (
		<button className={'tile' + (props.selected ? ' selected' : '')} onClick={() => props.onClick()}>
			{util.displayLetter(props.value)}
		</button>
	);
}

module.exports = Tile;