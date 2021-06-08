import { BoardToken } from "./board/board-token.ts";
import { Board } from "./board/board.ts";
import { Letter } from "./enums/letter.ts";
import { Player } from "./player.ts";

export class Game {
  private _board: Board
  private _players: Array<Player>
  tokens: Array<BoardToken>
  turn: number

  constructor() {
    this._board = new Board()
    this._players = []
    this.turn = 0
    this.tokens = []
  }

  start() {

  }

  addPlayer(player: Player) {
    const p = this._players.find(p => p.id == player.id)
    if(p) return 
    this._players.push(player)
  }

  nextTurn() {
    if(this.turn == this._players.length - 1) {
      this.turn = 0
    } else {
      this.turn++
    }
  }

  place(token: BoardToken, x: string, y: number): boolean {
    if(this._board.place(token, y, (<any>Letter)[x.toUpperCase()])) {
      this.tokens.push(token)
      this._board.showAvailableMovements(token.id)
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