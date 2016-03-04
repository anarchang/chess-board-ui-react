/**
* @flow
**/
const React = require('react')
const ReactDOM = require('react-dom')
const ChessBoardApp = require('./components/chess-board-app')

ReactDOM.render(
  <ChessBoardApp />,
  document.getElementById('example')
);
