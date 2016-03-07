/**
* @flow
**/

const React = require('react')
const PropTypes = React.PropTypes
const Square = require('./square')
const PieceActions = require('../actions/piece-actions')
const DropTarget = require('react-dnd').DropTarget

var squareTarget = {
  drop (props, monitor, component) {
    let item = monitor.getItem()

    if (item) {
      PieceActions.movePiece(item.pieceId, props.x, props.y)
    }

  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  },

  render () {
    let x = this.props.x
    let y = this.props.y
    let black = (x + y) % 2 === 1
    let connectDropTarget = this.props.connectDropTarget

    return connectDropTarget(
      <div>
        <Square black={black}>
          {this.props.children}
        </Square>
      </div>
    )
  }
})

module.exports = DropTarget('PIECE', squareTarget, collect)(BoardSquare)
