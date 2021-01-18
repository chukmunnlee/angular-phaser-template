import { Scene, GameObjects } from 'phaser'

import {SceneGrid} from "../utils/scene-utils";

import {
  SCENE_LOADER, SCENE_START,
  IMAGE_GAME_TITLE, IMAGE_GAME_OVER,
  IMAGE_BUTTON_2, IMAGE_TOGGLE_1,
  IMAGE_MUSIC_ON, IMAGE_MUSIC_OFF,
  IMAGE_SFX_ON, IMAGE_SFX_OFF
} from "../constants";

export class PreloaderScene extends Scene {

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
    this.load.image(IMAGE_MUSIC_ON, 'assets/ui/icons/music_on.png')
    this.load.image(IMAGE_MUSIC_OFF, 'assets/ui/icons/music_off.png')
    this.load.image(IMAGE_SFX_ON, 'assets/ui/icons/sfx_on.png')
    this.load.image(IMAGE_SFX_OFF, 'assets/ui/icons/sfx_off.png')
  }

  loadProgress(progress) {
    const prog = Math.floor(progress * 100)
    this.progressText.setText(`Progress: ${prog}%`)
    if (prog >= 1)
      this.time.delayedCall(1000,
        (() => this.scene.start(SCENE_START)).bind(this)
      )
  }

}
