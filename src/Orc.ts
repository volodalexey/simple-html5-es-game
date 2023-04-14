import { type IBodyOptions, Body } from './Body'
import { EBodyState } from './BodyState'

export interface IOrcOptions {
  textures: IBodyOptions['textures']
}

export class Orc extends Body {
  constructor (options: IOrcOptions) {
    super({ ...options, moveSpeed: 100 })
  }

  handleUpdate (deltaMS: number): void {
    super.handleUpdate(deltaMS)
  }

  restart (): void {
    this.stop()
    this.setCollisionShapePosition({ x: this.initX, y: this.initY })
    this.setState(EBodyState.standDown)
  }
}
