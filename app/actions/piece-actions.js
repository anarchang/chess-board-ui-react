/**
* @flow
**/

const AppDispatcher = require('../dispatcher/app-dispatcher')

module.exports = {
  movePiece (pieceId: string, toX: number, toY: number): void {
    AppDispatcher.dispatch({
      pieceId: pieceId,
      posX: toX,
      posY: toY
    })
  }
}
