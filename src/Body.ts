import { AnimatedSprite, Container, Graphics, type IPointData, Sprite, type Texture } from 'pixi.js'
import {
  StandUp, StandRight, StandDown, StandLeft,
  WalkUp, WalkRight, WalkDown, WalkLeft,
  AttackUp, AttackRight, AttackDown, AttackLeft,
  DeadDown,
  type BodyState, EBodyState
} from './BodyState'
import { logPlayerBounds, logPlayerState } from './logger'
import { EVectorDirection, Vector } from './Vector'

export interface IBodyOptions {
  moveSpeed: number
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

export enum BodyAnimation {
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

export class Body extends Container {
  public velocity = new Vector({ direction: EVectorDirection.down, speed: 0 })

  static options = {
    collisionShape: {
      offset: {
        x: 18,
        y: 15
      },
      initWidth: 28,
      initHeight: 49
    }
  }

  public moveSpeed!: IBodyOptions['moveSpeed']
  public attackAnimationSpeed = 0.2
  public walkAnimationSpeed = 0.2
  public deadAnimationSpeed = 0.2

  public states!: Record<EBodyState, BodyState>
  public currentState!: BodyState
  public initialRect!: Graphics
  public collisionShape!: Graphics
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

  constructor (options: IBodyOptions) {
    super()
    this.moveSpeed = options.moveSpeed
    this.setup(options)

    const initialRect = new Graphics()
    initialRect.beginFill(0xff00ff)
    initialRect.drawRect(0, 0, this.width, this.height)
    initialRect.endFill()
    initialRect.alpha = logPlayerBounds.enabled ? 0.5 : 0
    this.addChild(initialRect)
    this.initialRect = initialRect

    const { offset, initWidth, initHeight } = Body.options.collisionShape
    const collisionShape = new Graphics()
    collisionShape.beginFill(0x00ffff)
    collisionShape.drawRect(0, 0, initWidth, initHeight)
    collisionShape.endFill()
    collisionShape.alpha = logPlayerBounds.enabled ? 0.5 : 0
    collisionShape.position.set(offset.x, offset.y)
    this.addChild(collisionShape)
    this.collisionShape = collisionShape

    const stateOptions = { body: this }
    this.states = {
      [EBodyState.standUp]: new StandUp(stateOptions),
      [EBodyState.standRight]: new StandRight(stateOptions),
      [EBodyState.standDown]: new StandDown(stateOptions),
      [EBodyState.standLeft]: new StandLeft(stateOptions),
      [EBodyState.walkUp]: new WalkUp(stateOptions),
      [EBodyState.walkRight]: new WalkRight(stateOptions),
      [EBodyState.walkDown]: new WalkDown(stateOptions),
      [EBodyState.walkLeft]: new WalkLeft(stateOptions),
      [EBodyState.attackUp]: new AttackUp(stateOptions),
      [EBodyState.attackRight]: new AttackRight(stateOptions),
      [EBodyState.attackDown]: new AttackDown(stateOptions),
      [EBodyState.attackLeft]: new AttackLeft(stateOptions),
      [EBodyState.deadDown]: new DeadDown(stateOptions)
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
  }: IBodyOptions): void {
    const { attackAnimationSpeed, walkAnimationSpeed, deadAnimationSpeed } = this
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

  switchAnimation (animation: BodyAnimation): void {
    let newAnimation
    switch (animation) {
      case BodyAnimation.standUp:
        newAnimation = this.standUpAnimation
        break
      case BodyAnimation.standRight:
        newAnimation = this.standRightAnimation
        break
      case BodyAnimation.standDown:
        newAnimation = this.standDownAnimation
        break
      case BodyAnimation.standLeft:
        newAnimation = this.standLeftAnimation
        break
      case BodyAnimation.walkUp:
        newAnimation = this.walkUpAnimation
        break
      case BodyAnimation.walkRight:
        newAnimation = this.walkRightAnimation
        break
      case BodyAnimation.walkDown:
        newAnimation = this.walkDownAnimation
        break
      case BodyAnimation.walkLeft:
        newAnimation = this.walkLeftAnimation
        break
      case BodyAnimation.attackUp:
        newAnimation = this.attackUpAnimation
        break
      case BodyAnimation.attackRight:
        newAnimation = this.attackRightAnimation
        break
      case BodyAnimation.attackDown:
        newAnimation = this.attackDownAnimation
        break
      case BodyAnimation.attackLeft:
        newAnimation = this.attackLeftAnimation
        break
      case BodyAnimation.deadDown:
        newAnimation = this.deadDownAnimation
        break
    }
    if (newAnimation === this.currentAnimation) {
      return
    }
    this.currentAnimation = newAnimation
    this.hideAllAnimations()
    if (this.currentAnimation instanceof AnimatedSprite) {
      console.log('switchAnimation gotoAndPlay')
      this.currentAnimation.gotoAndPlay(0)
    }
    this.currentAnimation.visible = true
  }

  isShooting (): boolean {
    const attackAnimations: Array<AnimatedSprite | Sprite> = [this.attackUpAnimation, this.attackRightAnimation,
      this.attackDownAnimation, this.attackLeftAnimation]
    return attackAnimations.includes(this.currentAnimation)
  }

  setState (state: EBodyState): void {
    this.currentState = this.states[state]
    this.currentState.enter()
    logPlayerState(`state=${state}`)
  }

  stop (): void {
    this.velocity.stop()
  }

  handleUpdate (deltaMS: number): void {
    this.currentState.handleInput()

    if (!this.isShooting()) {
      this.velocity.move({ object: this, dt: deltaMS })
    }
  }

  restart (): void {
    this.stop()
    this.setPosition({ x: 150, y: 50 })
    this.setState(EBodyState.standDown)
  }

  setPosition ({ x, y }: { x?: number, y?: number }): void {
    if (x != null) {
      this.position.x = x + (this.position.x - this.collisionShape.position.x)
    }
    if (y != null) {
      this.position.y = y + (this.position.y - this.collisionShape.position.y)
    }
  }

  getCollisionShapeBounds (relativePoint?: IPointData): {
    top: number
    right: number
    bottom: number
    left: number
  } {
    const { position, width, height } = this.collisionShape
    const bounds = {
      top: position.y,
      right: position.x + width,
      bottom: position.y + height,
      left: position.x
    }
    if (relativePoint != null) {
      bounds.top = relativePoint.y + bounds.top
      bounds.right = relativePoint.x + bounds.right
      bounds.bottom = relativePoint.y + bounds.bottom
      bounds.left = relativePoint.x + bounds.left
    }
    return bounds
  }
}
