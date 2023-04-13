import {
  PlayerStandUp, PlayerStandRight, PlayerStandDown, PlayerStandLeft,
  PlayerWalkUp, PlayerWalkRight, PlayerWalkDown, PlayerWalkLeft,
  PlayerAttackUp, PlayerAttackRight, PlayerAttackDown, PlayerAttackLeft,
  PlayerDeadDown
} from './PlayerState'
import { type IBodyOptions, Body } from './Body'
import { type BodyState, EBodyState } from './BodyState'
import { type InputHandler } from './InputHandler'

export interface IPlayerOptions {
  inputHandler: InputHandler
  textures: IBodyOptions['textures']
}

export class Player extends Body {
  public states!: Record<EBodyState, BodyState>

  public inputHandler!: InputHandler
  constructor (options: IPlayerOptions) {
    super({ ...options, moveSpeed: 200 })
    this.inputHandler = options.inputHandler

    const stateOptions = { player: this, inputHandler: this.inputHandler }
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
  }

  handleUpdate (deltaMS: number): void {
    super.handleUpdate(deltaMS)
  }
}
