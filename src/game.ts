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

  place(token: BoardToken, y: string, x: number) {
    if(this.board.place(token, (<any>Letter)[y.toUpperCase()], x)) {
      this.tokens.push(token)
    }
  }

  move(tokenId: string, y: string, x: number) {
    if(this.board.move(tokenId, (<any>Letter)[y.toUpperCase()], x)) {
      
    }
  }
}