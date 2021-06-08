import { InvalidActionError } from "../errors/invalid-position.ts"
import { OutOfBoundsError } from "../errors/out-of-bounds.ts"
import { TokenNotFoundError } from "../errors/token-not-found.ts"
import { BoardToken } from "./board-token.ts"
import { EmptyToken } from "./empty-token.ts"
import { Field } from "./field.ts"

export class Board {
  private _map : Array<Array<BoardToken>> = []

  constructor(width: number = 10, height: number = 10) {
    this.generateMap(width, height)
  }

  private generateMap(width: number, height: number) {
    this._map = []
    for (let i = 0; i < height; i++) {
      this._map.push([])
      for (let j = 0; j < width; j++) {
        this._map[i].push(new EmptyToken());     
      }
    }
  }

  place(token: BoardToken, y: number, x: number): boolean {
    if(this.isOutOfBounds(y, x)) throw new OutOfBoundsError(y, x)
    if(this._map[y][x].id == Field.EMPTY) {
      this._map[y][x] = token
      return true
    }
    return false
  }

  move(tokenId: string, targetY: number, targetX: number, checkAvailable: boolean = false): boolean {
    if(this.isOutOfBounds(targetY, targetX)) throw new OutOfBoundsError(targetY, targetX)

    let [originY, originX] = this.getTokenCoordinates(tokenId)

    if(originY < 0 || originX < 0) throw new TokenNotFoundError(tokenId)

    if(this._map[targetY][targetX].id == Field.EMPTY) {
      let box = (this._map[targetY][targetX] as EmptyToken)
      if(checkAvailable && !box.available) return false
      this._map[targetY][targetX] = this._map[originY][originX]
      this._map[originY][originX] = new EmptyToken()
      return true
    }

    return false
  }

  showAvailableMovements(tokenId: string) {
    let [tokenY, tokenX] = this.getTokenCoordinates(tokenId)
    let token = this.getTokenByCoordinates(tokenY, tokenX)
    let movement = token.movement

    for (let i = 0; i < movement; i++) {
      for (let y = tokenY + 1 ; y <= tokenY + movement - i; y++) {
        let x = tokenX + i
        if(this.isOutOfBounds(y, x)) break
        let box = this._map[y][x]
        if(box.id == Field.EMPTY) (box as EmptyToken).available = true
      }

      for (let y = tokenY - 1; y >= tokenY - movement + i; y--) {
        let x = tokenX - i
        if(this.isOutOfBounds(y, x)) break
        let box = this._map[y][x]
        if(box.id == Field.EMPTY) (box as EmptyToken).available = true
      }

      for (let x = tokenX + 1 ; x <= tokenX + movement - i; x++) {
        let y = tokenY - i
        if(this.isOutOfBounds(y, x)) break
        let box = this._map[y][x]
        if(box.id == Field.EMPTY) (box as EmptyToken).available = true
      }

      for (let x = tokenX - 1 ; x >= tokenX - movement + i; x--) {
        let y = tokenY + i
        if(this.isOutOfBounds(y, x)) break
        let box = this._map[y][x]
        if(box.id == Field.EMPTY) (box as EmptyToken).available = true
      }
    }
  }

  clearEmptyTokens(): void {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].id == Field.EMPTY) 
          (this._map[i][j] as EmptyToken).available = false
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
        if(this._map[i][j].id == tokenId) return [i, j]     
      }
    }
    return [-1, -1]
  }

  getTokenById(tokenId: string): BoardToken {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if(this._map[i][j].id == tokenId) return this._map[i][j]    
      }
    }

    throw new TokenNotFoundError(tokenId)
  }

  getTokenByCoordinates(y: number, x: number): BoardToken {
    if(this.isOutOfBounds(y, x)) throw new OutOfBoundsError(y, x)
    return this._map[y][x]
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