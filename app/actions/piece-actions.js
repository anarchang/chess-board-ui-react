/**
* @flow
**/

const AppDispatcher = require('../dispatcher/app-dispatcher')
const PieceStore = require('../stores/piece-store')

module.exports = {
  movePiece (pieceId: string, toX: number, toY: number): void {
    let action: PieceStore.MoveAction_T = {
      pieceId: pieceId,
      posX: toX,
      posY: toY
    }
    AppDispatcher.dispatch(action)
  }
}
