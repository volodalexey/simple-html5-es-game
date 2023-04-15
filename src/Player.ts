import {
  PlayerStandUp, PlayerStandRight, PlayerStandDown, PlayerStandLeft,
  PlayerWalkUp, PlayerWalkRight, PlayerWalkDown, PlayerWalkLeft,
  PlayerAttackUp, PlayerAttackRight, PlayerAttackDown, PlayerAttackLeft,
  PlayerDeadDown
} from './PlayerState'
import { type IBodyOptions, Body } from './Body'
import { type BodyState, EBodyState } from './BodyState'
import { type Game } from './Game'
import { Arrow, type IArrowOptions } from './Arrow'
import { AUDIO } from './audio'

export interface IPlayerOptions {
  game: Game
  textures: {
    elvenTextures: IBodyOptions['textures']
    arrowTextures: IArrowOptions['textures']
  }
}

export class Player extends Body {
  public states!: Record<EBodyState, BodyState>

  public game!: Game
  public arrowTextures!: IArrowOptions['textures']
  constructor (options: IPlayerOptions) {
    super({ textures: options.textures.elvenTextures, moveSpeed: 200, attackAnimationSpeed: 0.6 })
    this.game = options.game
    this.arrowTextures = options.textures.arrowTextures

    const stateOptions = { player: this, inputHandler: this.game.inputHandler }
    this.states = {
      [EBodyState.standUp]: new PlayerStandUp(stateOptions),
      [EBodyState.standRight]: new PlayerStandRight(stateOptions),
      [EBodyState.standDown]: new PlayerStandDown(stateOptions),
      [EBodyState.standLeft]: new PlayerStandLeft(stateOptions),
      [EBodyState.walkUp]: new PlayerWalkUp(stateOptions),
      [EBodyState.walkRight]: new PlayerWalkRight(stateOptions),
      [EBodyState.walkDown]: new PlayerWalkDown(stateOptions),
      [EBodyState.walkLeft]: new PlayerWalkLeft(stateOptions),
      [EBodyState.attackUp]: new PlayerAttackUp(stateOptions),
      [EBodyState.attackRight]: new PlayerAttackRight(stateOptions),
      [EBodyState.attackDown]: new PlayerAttackDown(stateOptions),
      [EBodyState.attackLeft]: new PlayerAttackLeft(stateOptions),
      [EBodyState.deadDown]: new PlayerDeadDown(stateOptions)
    }

    this.onAttackCompleted = this.shootArrow
  }

  handleUpdate (deltaMS: number): void {
    super.handleUpdate(deltaMS)
  }

  shootArrow (): void {
    AUDIO.arrow.play()
    const arrow = new Arrow({
      textures: this.arrowTextures,
      direction: this.velocity.direction,
      initX: this.x,
      initY: this.y
    })
    this.game.tileMap.arrows.addChild(arrow)
  }
}
