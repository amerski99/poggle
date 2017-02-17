const React = require('react');
const ReactDOM = require('react-dom');
const PoggleGame = require('./components/poggle-game.jsx');
require('./util/array.js');

const BOARD_SIZE=5;
const DICE=['aaafrs',
	'aaeeee',
	'aafirs',
	'adennn',
	'aeeeem',
	'aeegmu',
	'aegmnn',
	'afirsy',
	'bjkqxz',
	'ccenst',
	'ceiilt',
	'ceilpt',
	'ceipst',
	'ddhnot',
	'dhhlor',
	'dhlnor',
	'dhlnor',
	'eiiitt',
	'emottt',
	'ensssu',
	'fiprsy',
	'gorrvw',
	'iprrry',
	'nootuw',
	'ooottu'
];

ReactDOM.render((
	<div id="poggle-game">
		<header><img src="img/poggle-logo.png" alt="Poggle logo" /></header>
		<PoggleGame rows={BOARD_SIZE} cols={BOARD_SIZE} dice={DICE} />
		<footer>Copyright 2017 Andrew Merski</footer>
	</div>
), document.getElementById('container'));


