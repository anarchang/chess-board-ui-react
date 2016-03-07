/**
* @flow
**/

const React = require('react')
const BoardSquare = require('./board-square')
const PieceStore = require('../stores/piece-store')
const PieceActions = require('../actions/piece-actions')
const DragDropContext = require('react-dnd').DragDropContext
const HTML5Backend = require('react-dnd-html5-backend')
const Piece = require('./piece')

require('../styles/board.scss')

function renderSquare (x:number, y:number, boardState: PieceStore.PieceStoreType): React.Element {
  let pieces = []

  let keys: Array<number> = Object.keys(boardState)

  for (let i = 0; i < keys.length; i++) {
    let piece: PieceStore.PieceType = boardState[keys[i]]
    if ((piece.positionX === x) && (piece.positionY === y)) {
      pieces.push(
        <div key={i}>
          <Piece pieceId={keys[i]} pieceType={piece.pieceType} />
        </div>
      )
    }
  }

  return (
    <div key={(x * 8) + y}>
      <BoardSquare x={x} y={y}>
        {pieces}
      </BoardSquare>
    </div>
  )
}

function renderBoard (boardState: PieceStore.PieceStoreType): React.Element {
  let squares: Array<React.Element> = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++ ) {
      squares.push(renderSquare(i, j, boardState))
    }
  }
  return squares
}

var Board = React.createClass({
  propTypes: {
    boardState: React.PropTypes.object.isRequired // PieceStoreType
  },

  render () : React.Element {
    return (
      <div className="board">
        {renderBoard(this.props.boardState)}
      </div>
    )
  }
})

module.exports = DragDropContext(HTML5Backend)(Board)
