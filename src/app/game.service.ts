import {Injectable} from "@angular/core";
import {Game} from "phaser";
import {PreloaderScene} from "./scenes/preloader.scene";
import {StartScene} from "./scenes/start.scene";
import {PlayScene} from "./scenes/play.scene";
import {EndScene} from "./scenes/end.scene";

@Injectable()
export class GameService {

  created = false
  game: Game
  debug = false

  constructor() { }

  createGame(debug = false) {
    if (this.created)
      return

    this.debug = debug
    this.created = true
    this.game = new Game({
      width: 800, height: 800,
      parent: 'game',
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: { debug }
      },
      scene: [ PreloaderScene, StartScene, PlayScene, EndScene ]
    })
  }

  destroyGame(removeCanvas = false) {
    if (!this.created)
      return
    this.created = false
    this.game.destroy(removeCanvas)
  }

}
