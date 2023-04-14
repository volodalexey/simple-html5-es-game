import { Dummy } from './AI'
import { type IBodyOptions, Body } from './Body'
import { EBodyState } from './BodyState'

export interface IOrcOptions {
  textures: IBodyOptions['textures']
}

export class Orc extends Body {
  public ai = new Dummy()
  constructor (options: IOrcOptions) {
    super({ ...options, moveSpeed: 100 })
    this.ai.control(this)
  }

  handleUpdate (deltaMS: number): void {
    this.ai.handleUpdate(deltaMS)
    if (!this.isAttacking()) {
      this.velocity.move({ object: this, dt: deltaMS })
    }
  }

  restart (): void {
    this.stop()
    this.setCollisionShapePosition({ x: this.initX, y: this.initY })
    this.setState(EBodyState.standDown)
  }
}
