import { BoardToken } from "./board/board-token.ts";
import { Board } from "./board/board.ts";
import { Letter } from "./enums/letter.ts";
import { Player } from "./player.ts";

export class Game {
  private _board: Board = new Board()
  private _players: Array<Player> = []
  tokens: Array<BoardToken> = []
  turn: number = 0
  player: any = null
  movementsLeft: number = 0
  manaLeft: number = 0

  start() {
    this.placeTokens()
    // TODO: validate if the game can start
  }

  placeTokens() {

  }

  addPlayer(player: Player) {
    const p = this._players.find(p => p.id == player.id)
    if(p) return 
    this._players.push(player)
  }

  nextTurn() {
    let token = this.tokens.shift()
    this.turn++
    this.movementsLeft = token?.movement || 0
    this.player = token?.owner
  }

  place(token: BoardToken, x: string, y: number): boolean {
    if(this._board.place(token, y, (<any>Letter)[x.toUpperCase()])) {
      this.tokens.push(token)
      this._board.showAvailableMovements(token.id, token.movement)
      return true
    }
    return false
  }

  move(tokenId: string, x: string, y: number): boolean {
    if(this._board.move(tokenId, y, (<any>Letter)[x.toUpperCase()], true)) {
      this._board.clearEmptyTokens()
      return true
    }
    return false
  }

  get map() {
    return this._board.map
  }
}