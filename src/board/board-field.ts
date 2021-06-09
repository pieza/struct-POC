import { BoardToken } from "./board-token.ts";
import { FieldType } from "./field-type.ts";

export class BoardField {
  type: FieldType
  token: BoardToken | null = null
  isAvailable: boolean = false

  constructor(type: FieldType = FieldType.GROUND) {
    this.type = type
  }

  get isEmpty(): boolean {
    return this.token == null && this.type == FieldType.GROUND
  }

  get image(): string {
    if(this.token?.image) return this.token?.image
    return this.isAvailable ? "available" : this.type
  }
}