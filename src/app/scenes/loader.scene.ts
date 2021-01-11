import { Scene, GameObjects } from 'phaser'

import {SceneGrid} from "../utils/scene-utils";

import {
  SCENE_LOADER, SCENE_START,
  IMAGE_GAME_TITLE, IMAGE_GAME_OVER, IMAGE_BUTTON_2, IMAGE_TOGGLE_1, SCENE_END
} from "../constants";

export class LoaderScene extends Scene {

  progressText: GameObjects.Text

  constructor() {
    super(SCENE_LOADER);
  }

  preload() {
    const sceneGrid = new SceneGrid({
      scene: this, rows: 11, columns: 11
    })

    this.progressText = this.add.text(0, 0, 'Progress: 0%', {
      color: '#ffff00',
      fontSize: '6em',
      fontStyle: 'bolder'
    })
    this.progressText.setOrigin(.5, .5)
    sceneGrid.placeAt(5, 5, this.progressText)

    this.load.on('progress', this.loadProgress.bind(this))

    // load resources
    this.load.image(IMAGE_GAME_TITLE, 'assets/images/game_title.png')
    this.load.image(IMAGE_GAME_OVER, 'assets/images/game_over.png')
    this.load.image(IMAGE_BUTTON_2, 'assets/ui/buttons/2/2.png')
    this.load.image(IMAGE_TOGGLE_1, 'assets/ui/toggles/1.png')
  }

  loadProgress(progress) {
    const prog = Math.floor(progress * 100)
    this.progressText.setText(`Progress: ${prog}%`)
    if (prog >= 1) {
      this.scene.start(SCENE_START)
    }
  }

}
