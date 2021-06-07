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

  place(y: string, x: number, token: BoardToken) {
    if(this.board.place((<any>Letter)[y.toUpperCase()], x, token)) {
      this.tokens.push(token)
    }
  }

  move(tokenId: string, y: string, x: number) {
    if(this.board.move((<any>Letter)[y.toUpperCase()], x, tokenId)) {
      
    }
  }
}