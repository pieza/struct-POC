import { BoardToken } from "../board/board-token.ts"
import { Item } from "../objects/items/item.ts"

export abstract class Character implements BoardToken {
  id: string = ""

  hp: number = 3
  token: string = "c"
  level: number = 1
  attact: number = 2
  defense: number = 2
  movement: number = 3

  items: Array<Item> = []

  stats() {

  }
}