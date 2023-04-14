import { Container } from 'pixi.js'
import { type IPlayerOptions, Player } from './Player'
import { StatusBar } from './StatusBar'
import { StartModal } from './StartModal'
import { InputHandler } from './InputHandler'
import { TileMap } from './TileMap'
import { Camera } from './Camera'
import { Collider } from './Collider'
import { logLayout } from './logger'

export interface IGameOptions {
  viewWidth: number
  viewHeight: number
  textures: {
    elvenTextures: IPlayerOptions['textures']
    orcTextures: IPlayerOptions['textures']
  }
}

export class Game extends Container {
  public gameEnded = false
  public time = 0

  static options = {
    maxTime: 25000,
    startLevel: 1,
    maxLevel: 2
  }

  public currentLevel = Game.options.startLevel

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

    this.runLevel()

    setTimeout(() => {
      void this.tileMap.idleLoad().catch(console.error)
    }, 2000)
  }

  setup ({
    viewWidth,
    viewHeight,
    textures: {
      elvenTextures,
      orcTextures
    }
  }: IGameOptions): void {
    this.tileMap = new TileMap({
      viewWidth,
      viewHeight,
      orcTextures
    })
    this.addChild(this.tileMap)

    this.statusBar = new StatusBar()
    this.addChild(this.statusBar)

    this.inputHandler = new InputHandler({ eventTarget: this.tileMap })

    this.player = new Player({ inputHandler: this.inputHandler, textures: elvenTextures })

    this.camera = new Camera({ tileMap: this.tileMap })
    this.camera.watch(this.player)

    this.tileMap.addChild(this.player)

    this.startModal = new StartModal({ viewWidth, viewHeight })
    this.startModal.visible = false
    this.addChild(this.startModal)

    this.inputHandler.relativeToTarget = this.player

    this.collider = new Collider()
  }

  addEventLesteners (): void {
    this.startModal.on('click', this.startGame)
  }

  startGame = (): void => {
    this.startModal.visible = false
    this.gameEnded = false
    this.time = 0
    this.runLevel()
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

    const availableWidth = viewWidth
    const availableHeight = viewHeight
    const totalWidth = this.tileMap.background.width
    const totalHeight = this.tileMap.background.height
    const occupiedWidth = totalWidth
    const occupiedHeight = totalHeight
    const x = availableWidth > occupiedWidth ? (availableWidth - occupiedWidth) / 2 : 0
    const y = availableHeight > occupiedHeight ? (availableHeight - occupiedHeight) / 2 : 0
    logLayout(`aw=${availableWidth} (ow=${occupiedWidth}) x=${x} ah=${availableHeight} (oh=${occupiedHeight}) y=${y}`)
    this.statusBar.visible = false
    this.x = x
    this.y = y
    logLayout(`x=${x} y=${y}`)
    this.statusBar.visible = true

    const calcWidth = availableWidth > occupiedWidth ? occupiedWidth : availableWidth
    const calcHeight = availableHeight > occupiedHeight ? occupiedHeight : availableHeight
    this.statusBar.position.set(calcWidth / 2 - this.statusBar.width / 2, 0)
    this.startModal.position.set(calcWidth / 2 - this.startModal.width / 2, calcHeight / 2 - this.startModal.height / 2)
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
    this.tileMap.handleUpdate(deltaMS)
    this.collider.handleUpdate(deltaMS)
    this.camera.handleUpdate(deltaMS)
  }

  runLevel (increment?: boolean): void {
    if (increment === true) {
      this.currentLevel++
    }
    if (this.currentLevel > Game.options.maxLevel) {
      this.endGame()
      return
    }
    this.tileMap.restart()
    this.tileMap.cleanFromAll()

    const { playerPoint } = this.tileMap.initLevel(this.currentLevel)
    this.player.initX = playerPoint.x
    this.player.initY = playerPoint.y
    this.player.restart()

    this.collider.restart({
      staticShapes: this.tileMap.hitboxes.children,
      bodies: [
        this.player, ...this.tileMap.enemies.children
      ],
      levelBounds: {
        top: 0,
        left: 0,
        right: this.tileMap.background.width,
        bottom: this.tileMap.background.height
      }
    })

    this.statusBar.updateLevel(this.currentLevel)
  }
}
