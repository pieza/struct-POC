import { OutOfBoundsError } from "../errors/out-of-bounds.ts"
import { TokenNotFoundError } from "../errors/token-not-found.ts"
import { BoardField } from "./board-field.ts"
import { BoardToken } from "./board-token.ts"

/**
 * Representation of a game board table that handles the logic to place and move
 * tokens over the board.
 * 
 * @author Jose Ulloa
 */
export class Board {

  private _map : Array<Array<BoardField>> = []

  constructor(width: number = 10, height: number = 10) {
    this.generateMap(width, height)
  }

  private generateMap(width: number, height: number) {
    this._map = []
    for (let i = 0; i < height; i++) {
      this._map.push([])
      for (let j = 0; j < width; j++) {
        this._map[i].push(new BoardField());     
      }
    }
  }

  place(token: BoardToken, y: number, x: number): boolean {
    if(this.isOutOfBounds(y, x)) throw new OutOfBoundsError(y, x)
    if(this._map[y][x].isEmpty) {
      this._map[y][x].token = token
      return true
    }
    return false
  }

  move(tokenId: string, targetY: number, targetX: number, checkAvailable: boolean = false): boolean {
    if(this.isOutOfBounds(targetY, targetX)) throw new OutOfBoundsError(targetY, targetX)

    let [originY, originX] = this.getTokenCoordinates(tokenId)

    if(originY < 0 || originX < 0) throw new TokenNotFoundError(tokenId)

    if(this._map[targetY][targetX].isEmpty) {
      if(checkAvailable && !this._map[targetY][targetX].isAvailable) return false
      this._map[targetY][targetX].token = this._map[originY][originX].token
      this._map[originY][originX].token = null
      return true
    }

    return false
  }

  showAvailableMovements(tokenId: string, range: number) {
    let [tokenY, tokenX] = this.getTokenCoordinates(tokenId)
    let token = this.getTokenByCoordinates(tokenY, tokenX)

    if(!token) throw new TokenNotFoundError(tokenId)

    for (let i = 0; i < range; i++) {
      for (let y = tokenY + 1 ; y <= tokenY + range - i; y++) {
        let x = tokenX + i
        if(this.isOutOfBounds(y, x)) break
        if(this._map[y][x].isEmpty) this._map[y][x].isAvailable = true
      }

      for (let y = tokenY - 1; y >= tokenY - range + i; y--) {
        let x = tokenX - i
        if(this.isOutOfBounds(y, x)) break
        if(this._map[y][x].isEmpty) this._map[y][x].isAvailable = true
      }

      for (let x = tokenX + 1 ; x <= tokenX + range - i; x++) {
        let y = tokenY - i
        if(this.isOutOfBounds(y, x)) break
        if(this._map[y][x].isEmpty) this._map[y][x].isAvailable = true
      }

      for (let x = tokenX - 1 ; x >= tokenX - range + i; x--) {
        let y = tokenY + i
        if(this.isOutOfBounds(y, x)) break
        if(this._map[y][x].isEmpty) this._map[y][x].isAvailable = true
      }
    }
  }

  clearEmptyTokens(): void {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].isEmpty) 
          this._map[i][j].isAvailable = false
      }
    }
  }

  getDistance(originY: number, originX: number, targetY: number, targetX: number) {
    let diffY = Math.abs(originY - targetY)
    let diffX = Math.abs(originX - targetX)
    return diffY + diffX
  }

  getTokenCoordinates(tokenId: string): Array<number> {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].token?.id == tokenId) return [i, j]     
      }
    }
    return [-1, -1]
  }

  getTokenById(tokenId: string): BoardToken | null {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].token?.id == tokenId) return this._map[i][j].token   
      }
    }

    throw new TokenNotFoundError(tokenId)
  }

  getTokenByCoordinates(y: number, x: number): BoardToken | null {
    if(this.isOutOfBounds(y, x)) throw new OutOfBoundsError(y, x)
    return this._map[y][x].token
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