import { Assets, Container, Sprite, type Texture } from 'pixi.js'
import { MapSettings, type IMapSettings, type IPositionData } from './MapSettings'
import { Hitbox } from './Hitbox'
import { logLayout } from './logger'
import { manifest } from './LoaderScene'
import { type IBodyOptions } from './Body'
import { Orc } from './Orc'
import { type Arrow } from './Arrow'
import { type Player } from './Player'
import { EBodyState } from './BodyState'

export interface ITileMapOptions {
  viewWidth: number
  viewHeight: number
  orcTextures: IBodyOptions['textures']
}

interface IBoundsData {
  top: number
  right: number
  bottom: number
  left: number
}

export class TileMap extends Container {
  public hitboxes = new Container<Hitbox>()
  public enemies = new Container<Orc>()
  public arrows = new Container<Arrow>()
  public background = new Sprite()
  public viewWidth!: number
  public viewHeight!: number
  public maxXPivot = 0
  public maxYPivot = 0
  public orcTextures !: ITileMapOptions['orcTextures']
  public player !: Player
  constructor (options: ITileMapOptions) {
    super()
    this.viewWidth = options.viewWidth
    this.viewHeight = options.viewHeight
    this.orcTextures = options.orcTextures
    this.setup()
  }

  setup (): void {
    this.addChild(this.background)
    this.addChild(this.hitboxes)
    this.addChild(this.enemies)
    this.addChild(this.arrows)
  }

  async idleLoad (): Promise<void> {
    await Assets.loadBundle(manifest.bundles
      .map(b => b.name)
      .filter((_, idx) => {
        return idx > 0
      }))
  }

  initLevel (levelIndex: number): {
    playerPoint: IPositionData
  } {
    const background: Texture = Assets.get(`level${levelIndex}Background`)
    const settings: IMapSettings = Assets.get(`level${levelIndex}Settings`)

    this.background.texture = background

    const hitboxesPoints = MapSettings.mapTilesToPositions({
      mapSettings: settings,
      layerName: 'Misc'
    })

    hitboxesPoints.forEach(cp => {
      this.hitboxes.addChild(new Hitbox({
        initX: cp.x,
        initY: cp.y,
        initWidth: cp.width,
        initHeight: cp.height
      }))
    })

    const playerPoints = MapSettings.mapObjectToPositions({
      mapSettings: settings,
      layerName: 'Player'
    })

    const orcPoints = MapSettings.mapObjectToPositions({
      mapSettings: settings,
      layerName: 'Orcs'
    })

    orcPoints.forEach(orcPoint => {
      const orc = new Orc({ textures: this.orcTextures })
      orc.initX = orcPoint.x
      orc.initY = orcPoint.y
      orc.setCollisionShapePosition(orcPoint)
      this.enemies.addChild(orc)

      orc.restart()
    })

    return {
      playerPoint: playerPoints[0]
    }
  }

  getViewportBounds (): IBoundsData {
    const { viewWidth, viewHeight } = this
    const { pivot: { x, y } } = this
    const bounds = {
      top: y,
      right: x + viewWidth,
      bottom: y + viewHeight,
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

  restart (): void {
    this.pivot.set(0, 0)
  }

  cleanFromAll (): void {
    while (this.hitboxes.children[0] != null) {
      this.hitboxes.children[0].removeFromParent()
    }
    while (this.enemies.children[0] != null) {
      this.enemies.children[0].removeFromParent()
    }
    while (this.arrows.children[0] != null) {
      this.arrows.children[0].removeFromParent()
    }
  }

  addPlayer (player: Player): void {
    this.player = player
    this.addChild(player)
  }

  handleUpdate (deltaMS: number): void {
    const { player } = this
    const { top, right, bottom, left } = player.getCollisionShapeBounds(player)
    const JUMP = 30 // use level settings cell
    const HALF_JUMP = JUMP / 2
    const sword = 5
    this.enemies.children.forEach(enemy => {
      if (!player.isDead() && !enemy.isDead()) {
        const enemyBounds = enemy.getCollisionShapeBounds(enemy)
        // left tactical jump
        if (right > enemyBounds.left - JUMP &&
          right < enemyBounds.left &&
          bottom > enemyBounds.top - HALF_JUMP &&
          top < enemyBounds.bottom + HALF_JUMP) {
          enemy.setState(EBodyState.attackLeft)
          enemy.setCollisionShapePosition({ x: right + sword, y: top })
          player.setState(EBodyState.deadDown)
          return
        }
        // up tactical jump
        if (bottom > enemyBounds.top - JUMP &&
          bottom < enemyBounds.top &&
          right > enemyBounds.left - HALF_JUMP &&
          left < enemyBounds.right + HALF_JUMP) {
          enemy.setState(EBodyState.attackUp)
          enemy.setCollisionShapePosition({ x: left, y: bottom })
          player.setState(EBodyState.deadDown)
          return
        }
        // right tactical jump
        if (left < enemyBounds.right + JUMP &&
          left > enemyBounds.right &&
          bottom > enemyBounds.top - HALF_JUMP &&
          top < enemyBounds.bottom + HALF_JUMP) {
          enemy.setState(EBodyState.attackRight)
          enemy.setCollisionShapePosition({ x: left - sword - enemy.collisionShape.width, y: top })
          player.setState(EBodyState.deadDown)
          return
        }
        // down tactical jump
        if (top < enemyBounds.bottom + JUMP &&
          top > enemyBounds.bottom &&
          right > enemyBounds.left - HALF_JUMP &&
          left < enemyBounds.right + HALF_JUMP) {
          enemy.setState(EBodyState.attackDown)
          enemy.setCollisionShapePosition({ x: left, y: top - enemy.collisionShape.height })
          player.setState(EBodyState.deadDown)
          return
        }
      }
      enemy.handleUpdate(deltaMS)
    })
    this.arrows.children.forEach(arrow => {
      if (this.enemies.children
        .filter(enemy => !enemy.isDead())
        .some(enemy => arrow.isHit({ enemy }))) {
        arrow.markedForDeletion = true
        // this.statusBar.updateOrcs(this.tileMap.getLiveEnemiesCount())
      } else {
        arrow.handleUpdate(deltaMS)
      }
    })
    for (let i = 0; i < this.arrows.children.length; i++) {
      const arrow = this.arrows.children[i]
      arrow.markedForDeletion = arrow.markedForDeletion
        ? true
        : arrow.isOutOfViewport({
          top: 0,
          left: 0,
          right: this.background.width,
          bottom: this.background.height
        })
      if (arrow.markedForDeletion) {
        arrow.removeFromParent()
        i--
      }
    }
  }

  getLiveEnemiesCount (): number {
    return this.enemies.children.filter(e => !e.isDead()).length
  }
}
