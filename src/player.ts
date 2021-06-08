import { Character } from "./characters/character.ts"

export class Player {
  id = ""
  name: string = ""
  characters: Array<Character> = []
}