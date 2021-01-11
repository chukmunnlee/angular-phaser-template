import {GameObjects, Scene} from 'phaser'
import {Subject} from "rxjs";
import {scaleObjectWidth} from "../../utils/helpers";
import Container = Phaser.GameObjects.Container;

export interface ButtonConfig<T> {
  scene: Scene,
  text: string,
  fontSize: string,
  resource: string,
  event?: T,
}
export class Button<T> extends GameObjects.Container {

  private origX = .5
  private origY = .5

  event = new Subject<T>()

  constructor(private config: ButtonConfig<T>) {
    super(config.scene);

    const scene = config.scene

    scene.add.text(0, 0, 'abc', )

    const text = scene.add.text(0, 0, config.text, {
      color: '#ffffff',
      fontSize: config.fontSize,
      fontStyle: 'bold'
    })
    text.setOrigin(.5, .5)
    const background = scene.add.image(0, 0, config.resource)
    scaleObjectWidth(background, text.displayWidth, 1.2)

    this.setSize(background.displayWidth, background.displayHeight)
    this.add(background)
    this.add(text)

    scene.add.existing(this)

    background.setInteractive()
    background.on('pointerdown', this.buttonPressed.bind(this))
  }

  buttonPressed() {
    this.event.next(this.config.event)
  }
}

export interface ToggleButtonConfig<T> {
  scene: Scene,
  initialState?: boolean
  onIconResource: string
  offIconResource: string
  resource: string,
}
export class ToggleButton<T> extends Container {
  event = new Subject<T>()
  constructor(private config: ToggleButtonConfig<T>) {
    super(config.scene);
  }

}
