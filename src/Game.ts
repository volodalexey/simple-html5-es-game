import { Container, type Texture } from 'pixi.js'
import { type IPlayerOptions, Player } from './Player'
import { StatusBar } from './StatusBar'
import { StartModal } from './StartModal'
import { InputHandler } from './InputHandler'
import { type IMapSettings } from './MapSettings'
import { TileMap } from './TileMap'
import { Camera } from './Camera'
import { Collider } from './Collider'

export interface IGameOptions {
  viewWidth: number
  viewHeight: number
  levelSettings: IMapSettings
  textures: {
    levelBackgroundTexture: Texture
    elvenTextures: IPlayerOptions['textures']
  }
}

export class Game extends Container {
  public gameEnded = false
  public time = 0

  static options = {
    maxTime: 25000
  }

  public viewWidth: number
  public viewHeight: number
  public player!: Player
  public inputHandler!: InputHandler
  public tileMap!: TileMap
  public statusBar!: StatusBar
  public startModal!: StartModal
  public camera!: Camera
  public collider!: Collider

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

    this.inputHandler = new InputHandler({ eventTarget: this.tileMap })

    this.player = new Player({ inputHandler: this.inputHandler, textures: elvenTextures })

    this.camera = new Camera({ tileMap: this.tileMap })
    const { camerabox } = this.camera
    const { width: oldWidth, height: oldHeight } = this.player
    this.player.addChild(camerabox)
    const { width: newWidth, height: newHeight } = this.player
    const addX = (newWidth - oldWidth) / 2
    const addY = (newHeight - oldHeight) / 2

    this.player.children.forEach(child => {
      if (child !== camerabox) {
        child.position.x += addX
        child.position.y += addY
      }
    })

    this.addChild(this.player)

    this.startModal = new StartModal({ viewWidth, viewHeight })
    this.startModal.visible = false
    this.addChild(this.startModal)

    this.inputHandler.relativeToTarget = this.player

    this.collider = new Collider({
      staticShapes: this.tileMap.hitboxes.children,
      bodies: [this.player]
    })
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
    this.collider.handleUpdate(deltaMS)
    this.camera.handleUpdate(deltaMS)
  }
}
