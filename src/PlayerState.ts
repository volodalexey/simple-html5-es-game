import {
  EBodyState,
  StandUp, StandRight, StandDown, StandLeft,
  WalkUp, WalkRight, WalkDown, WalkLeft,
  AttackUp, AttackRight, AttackDown, AttackLeft,
  DeadDown
} from './BodyState'
import { type InputHandler } from './InputHandler'
import { type Player } from './Player'
import { logPlayerState } from './logger'

interface IPlayerStateChildOptions {
  player: Player
  inputHandler: InputHandler
}

export class PlayerStandUp extends StandUp {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackUp)
    }
  }
}

export class PlayerStandRight extends StandRight {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackRight)
    }
  }
}

export class PlayerStandDown extends StandDown {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackDown)
    }
  }
}

export class PlayerStandLeft extends StandLeft {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackLeft)
    }
  }
}

export class PlayerWalkUp extends WalkUp {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackUp)
    } else if (!inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.standUp)
    }
  }
}

export class PlayerWalkRight extends WalkRight {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackRight)
    } else if (!inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.standRight)
    }
  }
}

export class PlayerWalkDown extends WalkDown {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackDown)
    } else if (!inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.standDown)
    }
  }
}

export class PlayerWalkLeft extends WalkLeft {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasSpecial()) {
      body.setState(EBodyState.attackLeft)
    } else if (!inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.standLeft)
    }
  }
}

export class PlayerAttackUp extends AttackUp {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        body.setState(EBodyState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        body.setState(EBodyState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        body.setState(EBodyState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        body.setState(EBodyState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    }
  }
}

export class PlayerAttackRight extends AttackRight {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        body.setState(EBodyState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        body.setState(EBodyState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        body.setState(EBodyState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        body.setState(EBodyState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    }
  }
}

export class PlayerAttackDown extends AttackDown {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        body.setState(EBodyState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        body.setState(EBodyState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        body.setState(EBodyState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        body.setState(EBodyState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    }
  }
}

export class PlayerAttackLeft extends AttackLeft {
  public inputHandler !: InputHandler

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  handleInput (): void {
    const { inputHandler, body } = this
    if (inputHandler.hasSpecial()) {
      if (inputHandler.hasDirectionUp()) {
        body.setState(EBodyState.attackUp)
      } else if (inputHandler.hasDirectionRight()) {
        body.setState(EBodyState.attackRight)
      } else if (inputHandler.hasDirectionDown()) {
        body.setState(EBodyState.attackDown)
      } else if (inputHandler.hasDirectionLeft()) {
        body.setState(EBodyState.attackLeft)
      }
    } else if (inputHandler.hasDirectionUp()) {
      body.setState(EBodyState.walkUp)
    } else if (inputHandler.hasDirectionRight()) {
      body.setState(EBodyState.walkRight)
    } else if (inputHandler.hasDirectionDown()) {
      body.setState(EBodyState.walkDown)
    } else if (inputHandler.hasDirectionLeft()) {
      body.setState(EBodyState.walkLeft)
    }
  }
}

export class PlayerDeadDown extends DeadDown {
  public inputHandler !: InputHandler

  enter (state: EBodyState): void {
    super.enter(state)
    logPlayerState(`state=${state}`)
  }

  constructor ({ player, inputHandler }: IPlayerStateChildOptions) {
    super({ body: player })
    this.inputHandler = inputHandler
  }
}
