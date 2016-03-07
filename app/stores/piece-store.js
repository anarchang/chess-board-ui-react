/**
* @flow
**/

const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')
const Knight = require('../components/knight')
const Queen = require('../components/queen')
const React = require('react')
const AppDispatcher= require('../dispatcher/app-dispatcher')

class MoveAction_T {
  pieceId: number;
  posX: number;
  posY: number;
}

class CHANGE_EVENT_T {}
var CHANGE_EVENT = new CHANGE_EVENT_T()

type PieceType = Knight | Queen

type PieceStoreType = {[id: number]: {pieceType: PieceType, positionX: number, positionY: number}}

var _pieces: PieceStoreType = {}
_pieces[1] = {
  pieceType: <Knight />,
  positionX: 1,
  positionY: 2
}
_pieces[2] = {
  pieceType: <Queen />,
  positionX: 5,
  positionY: 5
}

/**
* Move a piece
* @param {number} id - The id of the piece to move
* @param {number} posX - The new X position
* @param {number} posY - The new Y position
**/
function movePiece (id: number, posX: number, posY: number): void {
  _pieces[id] = assign({}, _pieces[id], {positionX: posX, positionY: posY})
}

var PieceStore = assign({}, EventEmitter.prototype, {

  /**
  * Get all of the pieces
  * @return {PieceStoreType}
  **/
  getAll (): PieceStoreType {
    return _pieces
  },

  emitChange (): void {
    this.emit(CHANGE_EVENT)
  },

  /**
  * @param {function} callback
  **/
  addChangeListener (callback: () => void ): void {
    this.on(CHANGE_EVENT, callback)
  },

  /**
  * @param {function} callback
  **/
  removeChangeListner (callback: () => void): void {
    this.removeChangeListner(CHANGE_EVENT, callback)
  }
})

AppDispatcher.register(function(action: MoveAction_T) {

  _pieces[action.pieceId].positionX = action.posX
  _pieces[action.pieceId].positionY = action.posY

  PieceStore.emitChange()
})

module.exports = PieceStore

