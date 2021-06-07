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

  place(y: number, x: number, token: BoardToken): boolean {
    if(this.isOutOfBounds(y, x)) return false

    if(this._map[y][x] == Field.EMPTY) {
      this._map[y][x] = token
      return false
    } else {
      return true
    }
  }

  move(tokenId: string, targetX: number, targetY: number): boolean {
    if(this.isOutOfBounds(targetY, targetX)) return false

    let [originY, originX] = this.getTokenCoordinates(tokenId)

    if(this._map[originY][originX] == Field.EMPTY) {
      this._map[originY][originX] = this._map[originY][originX]
      this._map[originY][originX] = Field.EMPTY
      return false
    } else {
      return true
    }
  }

  getTokenCoordinates(tokenId: string): Array<number> {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].token 
            && this._map[i][j].token == tokenId) return [i, j]     
      }
    }
    return [-1, -1]
  }

  get map() {
    return this._map
  }

  isOutOfBounds(y: number, x: number): boolean {
    let height = this._map.length
    let width = this._map[0].length

    return x >= width || x < 0 || y >= height || y < 0
  }
}