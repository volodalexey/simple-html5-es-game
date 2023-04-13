import { BodyAnimation, type Body } from './Body'
import { EVectorDirection } from './Vector'

export enum EBodyState {
  standLeft = 'standLeft',
  standRight = 'standRight',
  standUp = 'standUp',
  standDown = 'standDown',
  walkLeft = 'walkLeft',
  walkRight = 'walkRight',
  walkUp = 'walkUp',
  walkDown = 'walkDown',
  attackLeft = 'attackLeft',
  attackRight = 'attackRight',
  attackUp = 'attackUp',
  attackDown = 'attackDown',
  deadDown = 'deadDown',
}

interface IBodyStateOptions {
  body: Body
  state: EBodyState
}

export class BodyState {
  public body!: Body
  public state!: EBodyState
  constructor ({ body, state }: IBodyStateOptions) {
    this.body = body
    this.state = state
  }

  enter (): void {
    throw new Error('enter() not implemented in child class')
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

interface IBodyStateChildOptions {
  body: Body
}

export class StandUp extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.standUp })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.up, speed: 0 })
    this.body.switchAnimation(BodyAnimation.standUp)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class StandRight extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.standRight })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.right, speed: 0 })
    this.body.switchAnimation(BodyAnimation.standRight)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class StandDown extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.standDown })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.down, speed: 0 })
    this.body.switchAnimation(BodyAnimation.standDown)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class StandLeft extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.standLeft })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.left, speed: 0 })
    this.body.switchAnimation(BodyAnimation.standLeft)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class WalkUp extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.walkUp })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.up, speed: this.body.moveSpeed })
    this.body.switchAnimation(BodyAnimation.walkUp)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class WalkRight extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.walkRight })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.right, speed: this.body.moveSpeed })
    this.body.switchAnimation(BodyAnimation.walkRight)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class WalkDown extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.walkDown })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.down, speed: this.body.moveSpeed })
    this.body.switchAnimation(BodyAnimation.walkDown)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class WalkLeft extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.walkLeft })
  }

  enter (): void {
    this.body.velocity.setDirection({ direction: EVectorDirection.left, speed: this.body.moveSpeed })
    this.body.switchAnimation(BodyAnimation.walkLeft)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class AttackUp extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.attackUp })
  }

  enter (): void {
    this.body.stop()
    this.body.switchAnimation(BodyAnimation.attackUp)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class AttackRight extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.attackRight })
  }

  enter (): void {
    this.body.stop()
    this.body.switchAnimation(BodyAnimation.attackRight)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class AttackDown extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.attackDown })
  }

  enter (): void {
    this.body.stop()
    this.body.switchAnimation(BodyAnimation.attackDown)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class AttackLeft extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.attackLeft })
  }

  enter (): void {
    this.body.stop()
    this.body.switchAnimation(BodyAnimation.attackLeft)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

export class DeadDown extends BodyState {
  constructor ({ body }: IBodyStateChildOptions) {
    super({ body, state: EBodyState.deadDown })
  }

  enter (): void {
    this.body.stop()
    this.body.switchAnimation(BodyAnimation.deadDown)
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}
