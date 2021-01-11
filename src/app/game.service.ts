import {Injectable} from "@angular/core";
import {Game} from "phaser";
import {LoaderScene} from "./scenes/loader.scene";
import {StartScene} from "./scenes/start.scene";
import {PlayScene} from "./scenes/play.scene";
import {EndScene} from "./scenes/end.scene";

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
      },
      scene: [ LoaderScene, StartScene, PlayScene, EndScene ]
    })
  }

  destroyGame(removeCanvas = false) {
    if (!this.created)
      return
    this.created = false
    this.game.destroy(removeCanvas)
  }

}
