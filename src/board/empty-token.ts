import { BoardToken } from "./board-token.ts"
import { Field } from "./field.ts"

export class EmptyToken implements BoardToken {
  id: string = Field.EMPTY
  range: number = 0
  owner: any = null
  movement: number = 0
  available: boolean = false

  get token() {
    return this.available ? "🟩" : "🟨"
  }
}