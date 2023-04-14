import { type Body } from './Body'
import { EBodyState } from './BodyState'
import { EVectorDirection } from './Vector'

export class AI {
  public body?: Body

  control (body: Body): void {
    this.body = body
  }

  handleUpdate (deltaMS: number): void {}
}

export class Dummy extends AI {
  public direction = EVectorDirection.down
  public changeTime = 1000
  public elapsedTime = 0

  changeDirection (): void {
    this.direction = [
      EVectorDirection.up, EVectorDirection.right, EVectorDirection.down, EVectorDirection.left
    ][Math.floor(Math.random() * 4)]
  }

  applyDirection (): void {
    if (this.body == null) {
      return
    }
    let newState: EBodyState | null = null
    switch (this.direction) {
      case EVectorDirection.up:
        newState = EBodyState.walkUp
        break

      case EVectorDirection.down:
        newState = EBodyState.walkDown
        break

      case EVectorDirection.right:
        newState = EBodyState.walkRight
        break

      case EVectorDirection.left:
        newState = EBodyState.walkLeft
        break
    }
    if (newState !== null) {
      this.body.setState(newState)
    }
  }

  handleUpdate (deltaMS: number): void {
    if (this.elapsedTime >= this.changeTime) {
      this.elapsedTime = 0
      this.changeDirection()
      this.applyDirection()
    } else {
      this.elapsedTime += deltaMS
    }
    super.handleUpdate(deltaMS)
  }
}
