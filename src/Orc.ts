import { Dummy } from './AI'
import { type IBodyOptions, Body } from './Body'
import { EBodyState } from './BodyState'

export interface IOrcOptions {
  textures: IBodyOptions['textures']
}

export class Orc extends Body {
  public ai = new Dummy()
  public jump = 30
  public halfJUmp = this.jump / 2
  public sword = 5
  constructor (options: IOrcOptions) {
    super({ ...options, moveSpeed: 100 })
    this.ai.control(this)
  }

  handleUpdate (deltaMS: number): void {
    if (this.isDead()) {
      return
    }
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

  canJumpAndHit ({ top, right, bottom, left }: { top: number, right: number, bottom: number, left: number }): boolean {
    const enemyBounds = this.getCollisionShapeBounds(this)
    const { jump, halfJUmp, sword } = this
    const { width, height } = this.collisionShape
    // left tactical jump
    if (right > enemyBounds.left - jump &&
        right < enemyBounds.left &&
        bottom > enemyBounds.top - halfJUmp &&
        top < enemyBounds.bottom + halfJUmp) {
      this.setState(EBodyState.attackLeft)
      this.setCollisionShapePosition({ x: right + sword, y: top })
      return true
    }
    // up tactical jump
    if (bottom > enemyBounds.top - jump &&
        bottom < enemyBounds.top &&
        right > enemyBounds.left - halfJUmp &&
        left < enemyBounds.right + halfJUmp) {
      this.setState(EBodyState.attackUp)
      this.setCollisionShapePosition({ x: left, y: bottom })
      return true
    }
    // right tactical jump
    if (left < enemyBounds.right + jump &&
        left > enemyBounds.right &&
        bottom > enemyBounds.top - halfJUmp &&
        top < enemyBounds.bottom + halfJUmp) {
      this.setState(EBodyState.attackRight)
      this.setCollisionShapePosition({ x: left - sword - width, y: top })
      return true
    }
    // down tactical jump
    if (top < enemyBounds.bottom + jump &&
        top > enemyBounds.bottom &&
        right > enemyBounds.left - halfJUmp &&
        left < enemyBounds.right + halfJUmp) {
      this.setState(EBodyState.attackDown)
      this.setCollisionShapePosition({ x: left, y: top - height })
      return true
    }

    return false
  }
}
