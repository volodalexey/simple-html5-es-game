import { AnimatedSprite, Container, Graphics, Sprite, type Texture } from 'pixi.js'
import {
  StandUp, StandRight, StandDown, StandLeft,
  WalkUp, WalkRight, WalkDown, WalkLeft,
  AttackUp, AttackRight, AttackDown, AttackLeft,
  DeadDown,
  type PlayerState, EPlayerState
} from './PlayerState'
import { type Game } from './Game'
import { logPlayerBounds, logPlayerState } from './logger'
import { type Hitbox } from './Hitbox'

export interface IPlayerOptions {
  game: Game
  textures: {
    attackLeftTextures: Texture[]
    attackRightTextures: Texture[]
    attackUpTextures: Texture[]
    attackDownTextures: Texture[]
    walkLeftTextures: Texture[]
    walkRightTextures: Texture[]
    walkUpTextures: Texture[]
    walkDownTextures: Texture[]
    deadDownTextures: Texture[]
  }
}

export enum PlayerAnimation {
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

export class Player extends Container {
  public velocity = {
    vx: 0,
    vy: 0
  }

  public hitbox = {
    position: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 10
    },
    width: 17,
    height: 30
  }

  static options = {
    moveSpeed: 2,
    attackAnimationSpeed: 0.2,
    walkAnimationSpeed: 0.2,
    deadAnimationSpeed: 0.2
  }

  public game!: Game
  public states!: Record<EPlayerState, PlayerState>
  public currentState!: PlayerState
  standLeftAnimation!: Sprite
  standRightAnimation!: Sprite
  standUpAnimation!: Sprite
  standDownAnimation!: Sprite
  walkLeftAnimation!: AnimatedSprite
  walkRightAnimation!: AnimatedSprite
  walkUpAnimation!: AnimatedSprite
  walkDownAnimation!: AnimatedSprite
  attackLeftAnimation!: AnimatedSprite
  attackRightAnimation!: AnimatedSprite
  attackUpAnimation!: AnimatedSprite
  attackDownAnimation!: AnimatedSprite
  deadDownAnimation!: AnimatedSprite
  public currentAnimation!: AnimatedSprite | Sprite
  spritesContainer!: Container<AnimatedSprite | Sprite>
  public playerBox!: Graphics

  constructor (options: IPlayerOptions) {
    super()
    this.game = options.game
    this.setup(options)
    this.updateHitbox()
    if (logPlayerBounds.enabled) {
      const graphics = new Graphics()
      graphics.beginFill(0xff00ff)
      graphics.drawRect(0, 0, this.width, this.height)
      graphics.endFill()
      graphics.alpha = 0.5
      this.addChild(graphics)

      const hitboxGraphics = new Graphics()
      hitboxGraphics.beginFill(0x00ffff)
      hitboxGraphics.drawRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
      hitboxGraphics.endFill()
      hitboxGraphics.alpha = 0.5
      this.addChild(hitboxGraphics)
    }

    this.states = {
      [EPlayerState.standUp]: new StandUp({ game: options.game }),
      [EPlayerState.standRight]: new StandRight({ game: options.game }),
      [EPlayerState.standDown]: new StandDown({ game: options.game }),
      [EPlayerState.standLeft]: new StandLeft({ game: options.game }),
      [EPlayerState.walkUp]: new WalkUp({ game: options.game }),
      [EPlayerState.walkRight]: new WalkRight({ game: options.game }),
      [EPlayerState.walkDown]: new WalkDown({ game: options.game }),
      [EPlayerState.walkLeft]: new WalkLeft({ game: options.game }),
      [EPlayerState.attackUp]: new AttackUp({ game: options.game }),
      [EPlayerState.attackRight]: new AttackRight({ game: options.game }),
      [EPlayerState.attackDown]: new AttackDown({ game: options.game }),
      [EPlayerState.attackLeft]: new AttackLeft({ game: options.game }),
      [EPlayerState.deadDown]: new DeadDown({ game: options.game })
    }
  }

  setup ({
    textures: {
      attackLeftTextures,
      attackRightTextures,
      attackUpTextures,
      attackDownTextures,
      walkLeftTextures,
      walkRightTextures,
      walkUpTextures,
      walkDownTextures,
      deadDownTextures
    }
  }: IPlayerOptions): void {
    const { attackAnimationSpeed, walkAnimationSpeed, deadAnimationSpeed } = Player.options
    const playerBox = new Graphics()
    this.addChild(playerBox)
    this.playerBox = playerBox

    const spritesContainer = new Container<AnimatedSprite | Sprite>()
    this.addChild(spritesContainer)
    this.spritesContainer = spritesContainer

    const standUpAnimation = new Sprite(walkUpTextures[0])
    spritesContainer.addChild(standUpAnimation)
    this.standUpAnimation = standUpAnimation

    const standRightAnimation = new Sprite(walkRightTextures[0])
    spritesContainer.addChild(standRightAnimation)
    this.standRightAnimation = standRightAnimation

    const standDownAnimation = new Sprite(walkDownTextures[0])
    spritesContainer.addChild(standDownAnimation)
    this.standDownAnimation = standDownAnimation

    const standLeftAnimation = new Sprite(walkLeftTextures[0])
    spritesContainer.addChild(standLeftAnimation)
    this.standLeftAnimation = standLeftAnimation

    const attackLeftAnimation = new AnimatedSprite(attackLeftTextures)
    spritesContainer.addChild(attackLeftAnimation)
    this.attackLeftAnimation = attackLeftAnimation

    const attackRightAnimation = new AnimatedSprite(attackRightTextures)
    spritesContainer.addChild(attackRightAnimation)
    this.attackRightAnimation = attackRightAnimation

    const attackUpAnimation = new AnimatedSprite(attackUpTextures)
    spritesContainer.addChild(attackUpAnimation)
    this.attackUpAnimation = attackUpAnimation

    const attackDownAnimation = new AnimatedSprite(attackDownTextures)
    spritesContainer.addChild(attackDownAnimation)
    this.attackDownAnimation = attackDownAnimation

    attackLeftAnimation.animationSpeed = attackRightAnimation.animationSpeed =
    attackUpAnimation.animationSpeed = attackDownAnimation.animationSpeed = attackAnimationSpeed

    const walkLeftAnimation = new AnimatedSprite(walkLeftTextures)
    spritesContainer.addChild(walkLeftAnimation)
    this.walkLeftAnimation = walkLeftAnimation

    const walkRightAnimation = new AnimatedSprite(walkRightTextures)
    spritesContainer.addChild(walkRightAnimation)
    this.walkRightAnimation = walkRightAnimation

    const walkUpAnimation = new AnimatedSprite(walkUpTextures)
    spritesContainer.addChild(walkUpAnimation)
    this.walkUpAnimation = walkUpAnimation

    const walkDownAnimation = new AnimatedSprite(walkDownTextures)
    spritesContainer.addChild(walkDownAnimation)
    this.walkDownAnimation = walkDownAnimation

    walkLeftAnimation.animationSpeed = walkRightAnimation.animationSpeed =
    walkUpAnimation.animationSpeed = walkDownAnimation.animationSpeed = walkAnimationSpeed

    const deadDownAnimation = new AnimatedSprite(deadDownTextures)
    spritesContainer.addChild(deadDownAnimation)
    this.deadDownAnimation = deadDownAnimation

    deadDownAnimation.animationSpeed = deadAnimationSpeed
  }

  hideAllAnimations (): void {
    this.spritesContainer.children.forEach(spr => {
      spr.visible = false
    })
  }

  switchAnimation (animation: PlayerAnimation): void {
    let newAnimation
    switch (animation) {
      case PlayerAnimation.standUp:
        newAnimation = this.standUpAnimation
        break
      case PlayerAnimation.standRight:
        newAnimation = this.standRightAnimation
        break
      case PlayerAnimation.standDown:
        newAnimation = this.standDownAnimation
        break
      case PlayerAnimation.standLeft:
        newAnimation = this.standLeftAnimation
        break
      case PlayerAnimation.walkUp:
        newAnimation = this.walkUpAnimation
        break
      case PlayerAnimation.walkRight:
        newAnimation = this.walkRightAnimation
        break
      case PlayerAnimation.walkDown:
        newAnimation = this.walkDownAnimation
        break
      case PlayerAnimation.walkLeft:
        newAnimation = this.walkLeftAnimation
        break
      case PlayerAnimation.attackUp:
        newAnimation = this.attackUpAnimation
        break
      case PlayerAnimation.attackRight:
        newAnimation = this.attackRightAnimation
        break
      case PlayerAnimation.attackDown:
        newAnimation = this.attackDownAnimation
        break
      case PlayerAnimation.attackLeft:
        newAnimation = this.attackLeftAnimation
        break
      case PlayerAnimation.deadDown:
        newAnimation = this.deadDownAnimation
        break
    }
    if (newAnimation === this.currentAnimation) {
      return
    }
    this.currentAnimation = newAnimation
    this.hideAllAnimations()
    if (this.currentAnimation instanceof AnimatedSprite) {
      this.currentAnimation.gotoAndPlay(0)
    }
    this.currentAnimation.visible = true
  }

  setState (state: EPlayerState): void {
    this.currentState = this.states[state]
    this.currentState.enter()
    logPlayerState(`state=${state}`)
  }

  stop (): void {
    this.velocity.vx = 0
    this.velocity.vy = 0
  }

  handleUpdate (deltaMS: number): void {
    const { inputHandler } = this.game

    this.currentState.handleInput()
    if (inputHandler.hasDirectionLeft()) {
      this.velocity.vx = -Player.options.moveSpeed
    } else if (inputHandler.hasDirectionRight()) {
      this.velocity.vx = Player.options.moveSpeed
    } else {
      this.velocity.vx = 0
    }

    const horizontalBlock = this.checkForHorizontalCollisions()
    if (horizontalBlock == null) {
      this.x += this.velocity.vx
    }

    const verticalBlock = this.checkForVerticalCollisions()
    if (verticalBlock == null) {
      this.y += this.velocity.vy
    }
  }

  restart (): void {
    this.velocity.vx = 0
    this.velocity.vy = 0
    this.setPosition({ x: 150, y: 50 })
    this.setState(EPlayerState.standDown)
  }

  checkForHorizontalCollisions (): Hitbox | undefined {
    const playerBounds = this.getHitboxBounds({ addXVelocity: true })

    return this.game.tileMap.hitboxes.children.find(collisionBlock => {
      const blockBounds = collisionBlock.getRectBounds()
      if (
        playerBounds.left <= blockBounds.right &&
        playerBounds.right >= blockBounds.left &&
        playerBounds.bottom > blockBounds.top &&
        playerBounds.top < blockBounds.bottom
      ) {
        if (this.velocity.vx < 0) {
          this.velocity.vx = 0
          this.setPosition({ x: blockBounds.right })
          return true
        }

        if (this.velocity.vx > 0) {
          this.velocity.vx = 0
          this.setPosition({ x: blockBounds.left - this.hitbox.width })
          return true
        }
      }
      return false
    })
  }

  checkForVerticalCollisions (): Hitbox | undefined {
    const playerBounds = this.getHitboxBounds()
    const nextPlayerBottom = playerBounds.bottom + this.velocity.vy
    return this.game.tileMap.hitboxes.children.find(collisionBlock => {
      const blockBounds = collisionBlock.getRectBounds()
      const collideByX = playerBounds.left <= blockBounds.right && playerBounds.right >= blockBounds.left
      if (!collideByX) {
        return false
      }
      if (
        playerBounds.bottom <= blockBounds.top && nextPlayerBottom > blockBounds.top
      ) {
        this.velocity.vy = 0
        this.setPosition({ y: blockBounds.top - this.hitbox.height })
        return true
      }

      return false
    })
  }

  updateHitbox (): void {
    const { position, offset, width, height } = this.hitbox
    position.x = this.position.x + (this.width - width) / 2 + offset.x
    position.y = this.position.y + (this.height - height) / 2 + offset.y
  }

  setPosition ({ x, y }: { x?: number, y?: number }): void {
    this.updateHitbox()
    if (x != null) {
      this.position.x = x + (this.position.x - this.hitbox.position.x)
    }
    if (y != null) {
      this.position.y = y + (this.position.y - this.hitbox.position.y)
    }
  }

  getHitboxBounds ({ addXVelocity = false, addYVelocity = false } = {}): {
    top: number
    right: number
    bottom: number
    left: number
  } {
    this.updateHitbox()
    const bounds = {
      top: this.hitbox.position.y,
      right: this.hitbox.position.x + this.hitbox.width,
      bottom: this.hitbox.position.y + this.hitbox.height,
      left: this.hitbox.position.x
    }
    if (addXVelocity) {
      bounds.left += this.velocity.vx
      bounds.right += this.velocity.vx
    }
    if (addYVelocity) {
      bounds.top += this.velocity.vy
      bounds.bottom += this.velocity.vy
    }
    return bounds
  }
}
