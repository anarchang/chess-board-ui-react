/**
*
* This is the "Controller View" for the Chess Board App.
* It listents for changes in the PieceStore and passes the new data to its children.
*
* @flow
**/

const PieceStore = require('../stores/piece-store')
const React = require('react')
const Board = require('./board')



module.exports = React.createClass({

  getInitialState () {
    PieceStore.fetchAll()
    return PieceStore.getAll()
  },

  componentDidMount() {
      PieceStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
      PieceStore.removeChangeListener(this._onChange)
  },

  render () {
    return (
      <Board boardState={this.state}/>
    )
  },

  _onChange (): void {
    this.setState(PieceStore.getAll())
  }
})
