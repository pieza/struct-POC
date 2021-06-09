import { BoardToken } from "../board/board-token.ts"
import { Item } from "../objects/items/item.ts"

export abstract class Character extends BoardToken {
  id: string = ""
  image: string = ""
  owner: any = null
  range: number = 0
  movement: number = 0

  hp: number = 3
  level: number = 1
  attact: number = 2
  defense: number = 2

  items: Array<Item> = []

  stats() {

  }
}