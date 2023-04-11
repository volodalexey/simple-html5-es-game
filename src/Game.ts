import { Container, type Texture, Graphics } from 'pixi.js'
import { type IPlayerOptions, Player } from './Player'
import { StatusBar } from './StatusBar'
import { StartModal } from './StartModal'
import { InputHandler } from './InputHandler'
import { type IMapSettings } from './MapSettings'
import { logCameraboxBounds, logViewportBounds } from './logger'
import { TileMap } from './TileMap'

export interface IGameOptions {
  viewWidth: number
  viewHeight: number
  levelSettings: IMapSettings
  textures: {
    levelBackgroundTexture: Texture
    elvenTextures: IPlayerOptions['textures']
  }
}

interface IBoundsData {
  top: number
  right: number
  bottom: number
  left: number
}

export class Game extends Container {
  public gameEnded = false
  public time = 0

  static options = {
    maxTime: 25000,
    camerabox: {
      offset: {
        x: -42,
        y: -34
      },
      initWidth: 100,
      initHeight: 100
    }
  }

  public viewWidth: number
  public viewHeight: number
  public player!: Player
  public inputHandler!: InputHandler
  public tileMap!: TileMap
  public statusBar!: StatusBar
  public startModal!: StartModal
  public camerabox = new Graphics()
  constructor (options: IGameOptions) {
    super()

    this.viewWidth = options.viewWidth
    this.viewHeight = options.viewHeight
    this.setup(options)

    this.addEventLesteners()

    this.tileMap.initLevel(options)

    this.player.restart()
  }

  setup ({
    viewWidth,
    viewHeight,
    textures: {
      levelBackgroundTexture,
      elvenTextures
    },
    levelSettings
  }: IGameOptions): void {
    this.tileMap = new TileMap({
      viewWidth,
      viewHeight,
      texture: levelBackgroundTexture,
      levelSettings
    })
    this.addChild(this.tileMap)

    this.statusBar = new StatusBar()
    this.addChild(this.statusBar)

    this.player = new Player({ game: this, textures: elvenTextures })

    this.camerabox.beginFill(0xffff00)
    this.camerabox.drawRect(0, 0, Game.options.camerabox.initWidth, Game.options.camerabox.initHeight)
    this.camerabox.endFill()
    this.camerabox.alpha = logCameraboxBounds.enabled ? 0.5 : 0
    this.addChild(this.camerabox)

    this.inputHandler = new InputHandler({ eventTarget: this.tileMap, relativeToTarget: this.player })

    this.addChild(this.player)

    this.startModal = new StartModal({ viewWidth, viewHeight })
    this.startModal.visible = false
    this.addChild(this.startModal)
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
    this.player.updateHitbox()
    const { position } = this.player.hitbox
    const { offset: { x, y } } = Game.options.camerabox
    this.camerabox.position = {
      x: position.x + x,
      y: position.y + y
    }
  }

  addEventLesteners (): void {
    this.startModal.on('click', this.startGame)
  }

  startGame = (): void => {
    this.startModal.visible = false
    this.gameEnded = false
    this.time = 0
    this.player.restart()
    this.inputHandler.restart()
  }

  endGame (success = false): void {
    this.gameEnded = true
    this.player.stop()
    this.startModal.visible = true
    this.startModal.reasonText.text = success ? 'Win!!' : 'Time out!'
  }

  handleResize ({ viewWidth, viewHeight }: {
    viewWidth: number
    viewHeight: number
  }): void {
    this.tileMap.handleResize({ viewWidth, viewHeight })
    this.statusBar.position.set(viewWidth / 2 - this.statusBar.width / 2, 0)
    this.startModal.position.set(viewWidth / 2 - this.startModal.width / 2, viewHeight / 2 - this.startModal.height / 2)
  }

  handleUpdate (deltaMS: number): void {
    if (this.gameEnded) {
      return
    }
    this.time += deltaMS
    this.statusBar.updateTime(this.time)
    if (this.time > Game.options.maxTime) {
      this.endGame()
      return
    }
    this.player.handleUpdate(deltaMS)
    this.handleCamera()
  }

  handleCamera (): void {
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
