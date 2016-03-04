/**
* @flow
**/

const React = require('react')
const Square = require('./square')
const Knight = require('./knight')
const PieceStore = require('../stores/piece-store')
const PieceActions = require('../actions/piece-actions')
require('../styles/board.scss')

function renderSquare (x:number, y:number, boardState: PieceStore.PieceStoreType): React.Element {
  let black: boolean = (x + y) % 2 === 1

  let pieces = []

  let keys: Array<number> = Object.keys(boardState)

  for (let i = 0; i < keys.length; i++) {
    let piece: PieceStore.PieceType = boardState[keys[i]]
    if ((piece.positionX === x) && (piece.positionY === y)) {
      pieces.push(<div key={i}> {piece.pieceType}</div>)
    }
  }

  return (
    <div key={(x * 8) + y} onClick={()=> handleSquareClick(x, y)} >
      <Square black={black} >
        {pieces}
      </Square>
    </div>
  )
}

function handleSquareClick (toX: number, toY:number): void {
  PieceActions.movePiece(toX, toY)
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

module.exports = React.createClass({
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
