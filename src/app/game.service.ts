import {Injectable} from "@angular/core";
import {Game} from "phaser";

@Injectable()
export class GameService {

  created = false
  game: Game

  constructor() { }

  createGame(debug = false) {
    if (this.created)
      return

    this.created = true
    this.game = new Game({
      width: 800, height: 800,
      parent: 'game',
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: { debug }
      }
    })
  }

  destroyGame(removeCanvas = false) {
    if (!this.created)
      return
    this.created = false
    this.game.destroy(removeCanvas)
  }

}
