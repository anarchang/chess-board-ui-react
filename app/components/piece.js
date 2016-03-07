/**
* @flow
**/

const React = require('react')
const DragSource = require('react-dnd').DragSource

var pieceSource = {
  beginDrag (props) {
    return {
      pieceId: props.pieceId
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSrouce: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var Piece = React.createClass({
  propTypes: {
    pieceType: React.PropTypes.object.isRequired, // Reat.Element
    pieceId: React.PropTypes.string.isRequired,
    connectDragSrouce: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },

  render (): React.Element {
    var connectDragSrouce = this.props.connectDragSrouce
    var isDragging = this.props.isDragging

    return connectDragSrouce(<div>{this.props.pieceType}</div>)
  }
})

module.exports = DragSource('PIECE', pieceSource, collect)(Piece)
