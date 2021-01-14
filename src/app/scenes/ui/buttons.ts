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

export interface ToggleButtonConfig {
  scene: Scene,
  initialState?: boolean
  onIconResource: string
  offIconResource: string
  resource: string,
}
export class ToggleButton extends Container {

  event = new Subject<boolean>()
  get toggleState() {
    return this._toggleState
  }
  set toggleState(v: boolean) {
    this._toggleState = v
    this.updateIcon()
  }

  private _toggleState  = this.config.initialState
  private offImage: GameObjects.Image
  private onImage: GameObjects.Image

  constructor(private config: ToggleButtonConfig) {
    super(config.scene);

    const scene = config.scene
    const background = scene.add.image(0, 0, config.resource)
    this.setSize(background.displayWidth, background.displayHeight)
    this.add(background)

    const cx = Math.floor(background.displayWidth / 2)
    const cy = Math.floor(background.displayHeight / 2)
    background.setPosition(cx, cy)

    this.onImage = scene.add.image(cx, cy, config.onIconResource)
    scaleObjectWidth(this.onImage, background.displayWidth, .6)
    this.add(this.onImage)
    this.offImage = scene.add.image(cx, cy, config.offIconResource)
    scaleObjectWidth(this.offImage, background.displayWidth, .6)
    this.add(this.offImage)

    this.toggleState = config.initialState || true

    scene.add.existing(this)

    background.setInteractive()
    background.on('pointerdown', this.buttonPressed.bind(this))
  }

  private buttonPressed() {
    this.toggleButton()
    this.event.next(this._toggleState)
  }

  private updateIcon() {
    this.offImage.alpha = this.toggleState? 0: 1
    this.onImage.alpha = this.toggleState? 1: 0
  }
  toggleButton() {
    this.toggleState = !this.toggleState
    this.updateIcon()
  }
}
