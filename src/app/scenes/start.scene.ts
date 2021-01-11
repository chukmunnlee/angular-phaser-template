import { Scene } from 'phaser'

import {SceneGrid} from "../utils/scene-utils";

import {IMAGE_BUTTON_2, IMAGE_GAME_TITLE, SCENE_PLAY, SCENE_START} from "../constants";
import {scaleToGameWidth} from "../utils/helpers";
import {Button} from "./ui/buttons";
import {Subscription} from "rxjs";

export class StartScene extends Scene {

  button$: Subscription

  constructor() {
    super(SCENE_START);
  }

  preload() { }

  create () {
    const sceneGrid = new SceneGrid({
      scene: this, rows: 11, columns: 11
    })

    let img = sceneGrid.createImageAt(5, 2, IMAGE_GAME_TITLE)
    scaleToGameWidth(img, this.game, .75)

    let button = new Button<string>({
      scene: this,
      text: 'START',
      resource: IMAGE_BUTTON_2,
      event: 'start',
      fontSize: '5em'
    })

    sceneGrid.placeAt(5, 8, button)

    this.button$ = button.event.subscribe(event => {
      this.scene.start(SCENE_PLAY)
    })

    this.events.on('destroy', (() => this.button$.unsubscribe()).bind(this))
  }

}
