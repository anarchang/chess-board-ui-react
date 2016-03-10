/**
* @flow
**/

const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

const WhiteQueen = require('../components/white-queen')
const BlackQueen = require('../components/black-queen')
const WhiteKing = require('../components/white-king')
const BlackKing = require('../components/black-king')
const WhiteRook = require('../components/white-rook')
const BlackRook = require('../components/black-rook')
const WhiteBishop = require('../components/white-bishop')
const BlackBishop = require('../components/black-bishop')
const WhiteKnight = require('../components/white-knight')
const BlackKnight = require('../components/black-knight')
const WhitePawn = require('../components/white-pawn')
const BlackPawn = require('../components/black-pawn')

const Queen = require('../components/queen')
const React = require('react')
const AppDispatcher= require('../dispatcher/app-dispatcher')
const axios = require('axios')

class MoveAction_T {
  pieceId: string;
  posX: number;
  posY: number;
}

class CHANGE_EVENT_T {}
var CHANGE_EVENT = new CHANGE_EVENT_T()

type PieceType =  WhiteQueen | BlackQueen | WhiteKing | BlackKing | WhiteRook | BlackRook | WhiteBishop | BlackBishop | WhiteKnight | BlackKnight | WhitePawn | BlackPawn
type PieceStoreType = {[id: string]: {
  pieceType: PieceType,
  pieceTypeId: number,
  positionX: number,
  positionY: number}}

function createPieceType (typeId: number) : React.Element {
  switch (typeId) {
    case 0:
      return <WhiteQueen />
    case 1:
      return <BlackQueen />
    case 2:
      return <WhiteKing />
    case 3:
      return <BlackKing />
    case 4:
      return <WhiteRook />
    case 5:
      return <BlackRook />
    case 6:
      return <WhiteBishop />
    case 7:
      return <BlackBishop />
    case 8:
      return <WhiteKnight />
    case 9:
      return <BlackKnight />
    case 10:
      return <WhitePawn />
    case 11:
      return <BlackPawn />
  }
}

var _pieces: PieceStoreType = {}
// _pieces[1] = {
//   pieceType: <Knight />,
//   positionX: 1,
//   positionY: 2
// }
// _pieces[2] = {
//   pieceType: <Queen />,
//   positionX: 5,
//   positionY: 5
// }

/**
* Move a piece
* @param {number} id - The id of the piece to move
* @param {number} posX - The new X position
* @param {number} posY - The new Y position
**/
function movePiece (id: string, posX: number, posY: number): void {
  _pieces[id] = assign({}, _pieces[id], {positionX: posX, positionY: posY})
}

var PieceStore = assign({}, EventEmitter.prototype, {

  fetchAll(): void {
    axios
      .get('http://localhost:3000/gridpiece')
      .then(pieces => {
        pieces.data.map( piece => {
          _pieces[piece.id] = {
            pieceType: createPieceType(piece.pieceType),
            pieceTypeId: piece.pieceType,
            positionX: piece.x,
            positionY: piece.y
          }
        })
      })
      .then( () => this.emit(CHANGE_EVENT))
  },

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

  let piece = _pieces[action.pieceId]

  let jsonPiece = {
    id: parseInt(action.pieceId),
    pieceType: piece.pieceTypeId,
    x: piece.positionX,
    y: piece.positionY
  }

  axios.put(`http://localhost:3000/gridpiece/${action.pieceId}`, jsonPiece)
})

module.exports = PieceStore

