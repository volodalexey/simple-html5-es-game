import { Container, Sprite, type Texture } from 'pixi.js'
import { MapSettings, type IMapSettings } from './MapSettings'
import { Hitbox } from './Hitbox'
import { logLayout } from './logger'

export interface ITileMapOptions {
  viewWidth: number
  viewHeight: number
  texture: Texture
  levelSettings: IMapSettings
}

interface IBoundsData {
  top: number
  right: number
  bottom: number
  left: number
}

export class TileMap extends Container {
  public hitboxes = new Container<Hitbox>()
  public background!: Sprite
  public viewWidth!: number
  public viewHeight!: number
  public maxXPivot = 0
  public maxYPivot = 0
  constructor (options: ITileMapOptions) {
    super()
    this.viewWidth = options.viewWidth
    this.viewHeight = options.viewHeight
    this.setup(options)
  }

  setup ({ texture }: ITileMapOptions): void {
    const background = new Sprite(texture)
    this.addChild(background)
    this.background = background

    this.addChild(this.hitboxes)
  }

  initLevel ({ levelSettings }: { levelSettings: IMapSettings }): void {
    const hitboxesPoints = MapSettings.mapObjectToPositions({
      mapSettings: levelSettings,
      layerName: 'Hitboxes'
    })

    hitboxesPoints.forEach(cp => {
      this.hitboxes.addChild(new Hitbox({
        initX: cp.x,
        initY: cp.y,
        initWidth: cp.width,
        initHeight: cp.height
      }))
    })
  }

  getViewportBounds (scale: number): IBoundsData {
    const { viewWidth, viewHeight } = this
    const { pivot: { x, y } } = this
    const bounds = {
      top: y,
      right: x + viewWidth * scale,
      bottom: y + viewHeight * scale,
      left: x
    }
    return bounds
  }

  handleResize ({ viewWidth, viewHeight }: {
    viewWidth: number
    viewHeight: number
  }): void {
    this.viewWidth = viewWidth
    this.viewHeight = viewHeight
    const { width, height, scale } = this.background
    if (width > viewWidth) {
      this.maxXPivot = (width - viewWidth) / scale.x
    } else {
      this.maxXPivot = 0
    }
    if (height > viewHeight) {
      this.maxYPivot = (height - viewHeight) / scale.y
    } else {
      this.maxYPivot = 0
    }
    logLayout(`x=${this.x} y=${this.y} w=${width} h=${height}`)
  }
}
