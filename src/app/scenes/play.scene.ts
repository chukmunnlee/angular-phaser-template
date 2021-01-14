import { Scene } from 'phaser'
import {SCENE_PLAY, IMAGE_TOGGLE_1,
  IMAGE_MUSIC_ON, IMAGE_MUSIC_OFF, IMAGE_SFX_ON, IMAGE_SFX_OFF
} from "../constants";
import {SceneGrid} from "../utils/scene-utils";
import {ToggleButton} from "./ui/buttons";
import {Subscription} from "rxjs";
import {scaleToGameWidth} from "../utils/helpers";
import {GameService} from "../game.service";
import {Globals} from "../utils/globals";
export class PlayScene extends Scene {

  music$: Subscription
  sfx$: Subscription
  gameSvc: GameService

  constructor() {
    super(SCENE_PLAY);

    this.gameSvc = Globals.injector.get(GameService)
  }

  preload() { }

  create () {
    const sceneGrid = new SceneGrid({
      scene: this,
      columns: 10, rows: 10
    })

    if (this.gameSvc.debug)
      sceneGrid.drawGrid()

    let button = new ToggleButton({
      scene: this,
      resource: IMAGE_TOGGLE_1,
      onIconResource: IMAGE_MUSIC_ON,
      offIconResource: IMAGE_MUSIC_OFF
    })
    button = scaleToGameWidth(button, this.game, .08)
    sceneGrid.placeAt(0, 0, button)
    this.music$ = button.event.subscribe(
      (value => {
        console.info('music: ', value)
      }).bind(this)
    )

    button = new ToggleButton({
      scene: this,
      resource: IMAGE_TOGGLE_1,
      onIconResource: IMAGE_SFX_ON,
      offIconResource: IMAGE_SFX_OFF
    })
    button = scaleToGameWidth(button, this.game, .08)
    sceneGrid.placeAt(8, 0, button)
    this.sfx$ = button.event.subscribe(
      (value => {
        console.info('sfx: ', value)
      }).bind(this)
    )

    this.events.on('destroy',
      (() => {
        this.sfx$.unsubscribe()
        this.music$.unsubscribe()
      }).bind(this)
    )
  }

  update() {

  }

}
