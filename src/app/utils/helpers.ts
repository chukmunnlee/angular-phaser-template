import {Game} from 'phaser';

export const gameWidth = (game: Game) => game.config.width as number
export const gameHeight = (game: Game) => game.config.height as number

export const scaleToGameWidth = (obj: any, game: Game, scale: number) => {
  const size = Math.floor(gameWidth(game) * scale)
  obj.displayWidth = size
  obj.scaleY = obj.scaleX
  return obj
}
export const scaleToGameHeight = (obj: any, game: Game, scale: number) => {
  const size = Math.floor(gameHeight(game))
  obj.displayHeight = size
  obj.scaleX = obj.scaleY
  return obj
}
