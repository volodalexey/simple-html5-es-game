import { Sprite, type Texture } from 'pixi.js'
import { EVectorDirection, Vector } from './Vector'

export interface IProjectileOptions {
  texture: Texture
  direction: EVectorDirection
  speed: number
}

export class Projectile extends Sprite {
  public velocity !: Vector

  constructor ({ texture, direction, speed }: IProjectileOptions) {
    super(texture)
    this.velocity = new Vector({ direction, speed })
  }

  handleUpdate (deltaMS: number): void {
    this.velocity.move({ object: this, dt: deltaMS })
  }
}

export interface IArrowOptions {
  initX: number
  initY: number
  textures: {
    upTexture: Texture
    rightTexture: Texture
    downTexture: Texture
    leftTexture: Texture
  }
  direction: EVectorDirection
}

export class Arrow extends Projectile {
  public markedForDeletion = false
  static offset = {
    [EVectorDirection.up]: {
      x: 0,
      y: 0
    },
    [EVectorDirection.right]: {
      x: 0,
      y: 0
    },
    [EVectorDirection.down]: {
      x: 0,
      y: 0
    },
    [EVectorDirection.left]: {
      x: 0,
      y: 0
    }
  }

  constructor ({ direction, textures, initX, initY }: IArrowOptions) {
    let texture
    switch (direction) {
      case EVectorDirection.up:
        texture = textures.upTexture
        break

      case EVectorDirection.down:
        texture = textures.downTexture
        break

      case EVectorDirection.right:
        texture = textures.rightTexture
        break

      case EVectorDirection.left:
        texture = textures.leftTexture
        break
    }
    if (texture == null) {
      throw new Error('Unable to detect arrow texture by provided direction')
    }
    super({ texture, direction, speed: 400 })

    this.position.set(initX + Arrow.offset[direction].x, initY + Arrow.offset[direction].y)
  }

  isOutOfViewport ({ left, top, right, bottom }: { left: number, top: number, right: number, bottom: number }): boolean {
    const pLeft = this.x
    const pTop = this.y
    const pRight = this.x + this.width
    const pBottom = this.y + this.height
    if (pRight < left) {
      return true
    }
    if (pLeft > right) {
      return true
    }
    if (pBottom < top) {
      return true
    }
    if (pTop > bottom) {
      return true
    }
    return false
  }
}
