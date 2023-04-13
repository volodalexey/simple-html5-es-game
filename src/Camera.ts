import { type Container } from 'pixi.js'
import { type TileMap } from './TileMap'

export interface ICameraOptions {
  tileMap: TileMap
}

export class Camera {
  public tileMap!: TileMap
  public watchObject?: Container

  static options = {
    scrollEdge: 200,
    initWidth: 200,
    initHeight: 200
  }

  constructor (options: ICameraOptions) {
    this.tileMap = options.tileMap
  }

  watch (watchObject: Container): void {
    this.watchObject = watchObject
  }

  handleUpdate (deltaMS: number): void {
    if (this.watchObject == null) {
      return
    }
    const { pivot } = this.tileMap
    const { scrollEdge } = Camera.options
    const { viewWidth, viewHeight } = this.tileMap
    const centerX = this.watchObject.x + this.watchObject.width / 2
    const centerY = this.watchObject.y + this.watchObject.height / 2
    if (centerX > pivot.x + viewWidth - scrollEdge) {
      pivot.x = centerX - viewWidth + scrollEdge
    } else if (centerX < pivot.x + scrollEdge) {
      pivot.x = centerX - scrollEdge
    }
    if (pivot.x < 0) {
      pivot.x = 0
    } else if (pivot.x > this.tileMap.maxXPivot) {
      pivot.x = this.tileMap.maxXPivot
    }

    if (centerY > pivot.y + viewHeight - scrollEdge) {
      pivot.y = centerY - viewHeight + scrollEdge
    } else if (centerY < pivot.y + scrollEdge) {
      pivot.y = centerY - scrollEdge
    }
    if (pivot.y < 0) {
      pivot.y = 0
    } else if (pivot.y > this.tileMap.maxYPivot) {
      pivot.y = this.tileMap.maxYPivot
    }
  }
}
