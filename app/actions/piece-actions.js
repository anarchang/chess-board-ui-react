/**
* @flow
**/

const AppDispatcher = require('../dispatcher/app-dispatcher')

module.exports = {
  movePiece (toX: number, toY: number): void {
    AppDispatcher.dispatch({
      pieceId: 1,
      posX: toX,
      posY: toY
    })
  }
}
