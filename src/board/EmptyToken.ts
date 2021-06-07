import { BoardToken } from "./board-token.ts"

export class EmptyToken implements BoardToken {
  id: string = "0"
  token: string = "0"
}