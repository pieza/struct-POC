import { BoardToken } from "./board/board-token.ts";
import { Board } from "./board/board.ts";
import { Letter } from "./enums/letter.ts";
import { Player } from "./player.ts";

export class Game {
  board: Board
  players: Array<Player>
  turn: number
  tokens: Array<BoardToken>

  constructor(players: Array<Player>) {
    this.board = new Board()
    this.players = players
    this.turn = 0
    this.tokens = []
  }

  start() {

  }

  nextTurn() {
    if(this.turn == this.players.length - 1) {
      this.turn = 0
    } else {
      this.turn++
    }
  }

  place(token: BoardToken, x: string, y: number): boolean {
    token.id = token.token
    if(this.board.place(token, y, (<any>Letter)[x.toUpperCase()])) {
      this.tokens.push(token)
      return true
    }
    return false
  }

  move(tokenId: string, x: string, y: number): boolean {
    return this.board.move(tokenId, y, (<any>Letter)[x.toUpperCase()])
  }
}