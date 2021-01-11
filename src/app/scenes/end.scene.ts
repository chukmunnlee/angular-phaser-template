import {Subscription} from "rxjs";
import { Scene } from 'phaser'

import {SceneGrid} from "../utils/scene-utils";
import {scaleToGameWidth} from "../utils/helpers";
import {Button} from "./ui/buttons";

import {IMAGE_BUTTON_2, IMAGE_GAME_OVER, SCENE_END, SCENE_START} from "../constants";

export class EndScene extends Scene {

  button$: Subscription

  constructor() {
    super(SCENE_END);
  }

  preload() { }

  create () {
    const sceneGrid = new SceneGrid({
      scene: this, rows: 11, columns: 11
    })

    let img = sceneGrid.createImageAt(5, 2, IMAGE_GAME_OVER)
    scaleToGameWidth(img, this.game, .75)

    let button = new Button<string>({
      scene: this,
      text: 'PLAY AGAIN?',
      resource: IMAGE_BUTTON_2,
      event: 'play_again',
      fontSize: '4em'
    })

    sceneGrid.placeAt(5, 8, button)

    this.button$ = button.event.subscribe(event => {
      this.scene.start(SCENE_START)
    })

    this.events.on('destroy', (() => this.button$.unsubscribe()).bind(this))
  }

}
