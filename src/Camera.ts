import { Graphics } from 'pixi.js'
import { logCameraboxBounds, logViewportBounds } from './logger'
import { type TileMap } from './TileMap'

interface IBoundsData {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ICameraOptions {
  tileMap: TileMap
}

export class Camera {
  public camerabox = new Graphics()
  public tileMap!: TileMap

  static options = {
    offset: {
      x: -42,
      y: -34
    },
    initWidth: 100,
    initHeight: 100
  }

  constructor (options: ICameraOptions) {
    this.tileMap = options.tileMap
    this.draw()
  }

  draw (): void {
    const { initWidth, initHeight } = Camera.options
    this.camerabox.beginFill(0xffff00)
    this.camerabox.drawRect(0, 0, initWidth, initHeight)
    this.camerabox.endFill()
    this.camerabox.alpha = logCameraboxBounds.enabled ? 0.5 : 0
  }

  getCameraboxBounds (): IBoundsData {
    const { x, y, width, height } = this.camerabox
    const bounds: IBoundsData = {
      top: y,
      right: x + width,
      bottom: y + height,
      left: x
    }
    return bounds
  }

  updateCamerabox (): void {
    // const { position } = this.player.collisionShape
    // const { offset: { x, y } } = Game.options.camerabox
    // this.camerabox.position = {
    //   x: position.x + x,
    //   y: position.y + y
    // }
  }

  handleUpdate (deltaMS: number): void {
    this.updateCamerabox()
    const cameraboxBounds = this.getCameraboxBounds()
    const viewportBounds = this.tileMap.getViewportBounds(1)
    logViewportBounds(`top=${viewportBounds.top} right=${viewportBounds.right} bottom=${viewportBounds.bottom} left=${viewportBounds.left}`)
    const { pivot } = this.tileMap
    if (cameraboxBounds.top < viewportBounds.top) {
      pivot.y -= viewportBounds.top - cameraboxBounds.top
    } else if (cameraboxBounds.bottom > viewportBounds.bottom) {
      pivot.y += cameraboxBounds.bottom - viewportBounds.bottom
    }
    if (cameraboxBounds.left < viewportBounds.left) {
      pivot.x -= viewportBounds.left - cameraboxBounds.left
    } else if (cameraboxBounds.right > viewportBounds.right) {
      pivot.x += cameraboxBounds.right - viewportBounds.right
    }
    if (pivot.x < 0) {
      pivot.x = 0
    } else if (pivot.x > this.tileMap.maxXPivot) {
      pivot.x = this.tileMap.maxXPivot
    }
    if (pivot.y < 0) {
      pivot.y = 0
    } else if (pivot.y > this.tileMap.maxYPivot) {
      pivot.y = this.tileMap.maxYPivot
    }
  }
}
