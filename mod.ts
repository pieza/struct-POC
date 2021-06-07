import { Warrior } from "./src/characters/warrior.ts"
import { Game } from "./src/game.ts"
import { Player } from "./src/player.ts"

let p1 = new Player()
let p2 = new Player()
let game = new Game([p1, p2])


function printMap() {
  let result = ""
  let m = game.board.map
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      result += m[i][j].token ? m[i][j].token : m[i][j];
    }
    result += "\n"
  }
  console.log(result)
}

game.start()
game.place("a", 5, new Warrior())
printMap()
