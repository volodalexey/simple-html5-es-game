import { type Game } from './Game'
import { PlayerAnimation } from './Player'

export enum EPlayerState {
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

interface IPlayerStateOptions {
  game: Game
  state: EPlayerState
}

export class PlayerState {
  public game!: Game
  public state!: EPlayerState
  constructor ({ game, state }: IPlayerStateOptions) {
    this.state = state
    this.game = game
  }

  enter (): void {
    throw new Error('enter() not implemented in child class')
  }

  handleInput (): void {
    throw new Error('handleInput() not implemented in child class')
  }
}

interface IPlayerStateChildOptions {
  game: Game
}

export class StandUp extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.standUp })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.standUp)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackUp)
    }
  }
}

export class StandRight extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.standRight })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.standRight)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackRight)
    }
  }
}

export class StandDown extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.standDown })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.standDown)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackDown)
    }
  }
}

export class StandLeft extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.standLeft })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.standLeft)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackLeft)
    }
  }
}

export class WalkUp extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.walkUp })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.walkUp)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackUp)
    } else {
      player.setState(EPlayerState.standUp)
    }
  }
}

export class WalkRight extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.walkRight })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.walkRight)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackRight)
    } else {
      player.setState(EPlayerState.standRight)
    }
  }
}

export class WalkDown extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.walkDown })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.walkDown)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackDown)
    } else {
      player.setState(EPlayerState.standDown)
    }
  }
}

export class WalkLeft extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.walkLeft })
  }

  enter (): void {
    const { player } = this.game
    player.switchAnimation(PlayerAnimation.walkLeft)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasSpecial()) {
      player.setState(EPlayerState.attackLeft)
    } else {
      player.setState(EPlayerState.standLeft)
    }
  }
}

export class AttackUp extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.attackUp })
  }

  enter (): void {
    const { player } = this.game
    player.stop()
    player.switchAnimation(PlayerAnimation.attackUp)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        player.setState(EPlayerState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        player.setState(EPlayerState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        player.setState(EPlayerState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        player.setState(EPlayerState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else {
      player.setState(EPlayerState.standLeft)
    }
  }
}

export class AttackRight extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.attackRight })
  }

  enter (): void {
    const { player } = this.game
    player.stop()
    player.switchAnimation(PlayerAnimation.attackRight)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        player.setState(EPlayerState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        player.setState(EPlayerState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        player.setState(EPlayerState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        player.setState(EPlayerState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else {
      player.setState(EPlayerState.standLeft)
    }
  }
}

export class AttackDown extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.attackDown })
  }

  enter (): void {
    const { player } = this.game
    player.stop()
    player.switchAnimation(PlayerAnimation.attackDown)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        player.setState(EPlayerState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        player.setState(EPlayerState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        player.setState(EPlayerState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        player.setState(EPlayerState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else {
      player.setState(EPlayerState.standLeft)
    }
  }
}

export class AttackLeft extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.attackLeft })
  }

  enter (): void {
    const { player } = this.game
    player.stop()
    player.switchAnimation(PlayerAnimation.attackLeft)
  }

  handleInput (): void {
    const { inputHandler, player } = this.game
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        player.setState(EPlayerState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        player.setState(EPlayerState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        player.setState(EPlayerState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        player.setState(EPlayerState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      player.setState(EPlayerState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      player.setState(EPlayerState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      player.setState(EPlayerState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      player.setState(EPlayerState.walkLeft)
    } else {
      player.setState(EPlayerState.standLeft)
    }
  }
}

export class DeadDown extends PlayerState {
  constructor ({ game }: IPlayerStateChildOptions) {
    super({ game, state: EPlayerState.deadDown })
  }

  enter (): void {
    const { player } = this.game
    player.stop()
    player.switchAnimation(PlayerAnimation.deadDown)
  }

  handleInput (): void {

  }
}
