import { BoardToken } from "./board-token.ts"
import { Field } from "./field.ts"

export class Board {
  private _map : Array<Array<any>> = []

  constructor(width: number = 10, height: number = 10) {
    this.generateMap(width, height)
  }

  private generateMap(width: number, height: number) {
    this._map = []
    for (let i = 0; i < height; i++) {
      this._map.push([])
      for (let j = 0; j < width; j++) {
        this._map[i].push(Field.EMPTY);     
      }
    }
  }

  place(x: number, y: number, token: BoardToken): boolean {
    if(this.isOutOfBounds(x, y)) return false

    if(this._map[x][y] == Field.EMPTY) {
      this._map[x][y] = token
      return false
    } else {
      return true
    }
  }

  move(originX: number, originY: number, targetX: number, targetY: number): boolean {
    if(this.isOutOfBounds(targetX, targetY)) return false

    if(this._map[originX][originY] == Field.EMPTY) {
      this._map[targetX][targetY] = this._map[originX][originY]
      this._map[originX][originY] = Field.EMPTY
      return false
    } else {
      return true
    }
  }

  getTokenCoordinates(tokenId: string): Array<number> {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j] instanceof BoardToken 
            && this._map[i][j].token == tokenId) return [i, j]     
      }
    }
    return [-1, -1]
  }

  get map() {
    return this._map
  }

  isOutOfBounds(x: number, y: number): boolean {
    let height = this._map.length
    let width = this._map[0].length

    return x >= width || x < 0 || y >= height || y < 0
  }
}