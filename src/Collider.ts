import { type Body } from './Body'

export interface IColliderOptions {
  staticShapes?: IStaticShape[]
  bodies?: Body[]
  levelBounds: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

interface IColliderBody {
  x: number
  initX: number
  y: number
  initY: number
  obj: Body
}

interface IStaticShape {
  x: number
  y: number
  width: number
  height: number
}

export class Collider {
  public staticShapes: IStaticShape[] = []
  public bodies: IColliderBody[] = []
  public levelBounds = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  handleUpdate (deltaMS: number): void {
    this.checkStatic(deltaMS)
  }

  addKinematicBody (body: Body): void {
    this.bodies.push({
      x: body.x,
      initX: body.x,
      y: body.y,
      initY: body.y,
      obj: body
    })
  }

  restart ({ staticShapes, bodies, levelBounds }: IColliderOptions): void {
    this.staticShapes = Array.isArray(staticShapes) ? staticShapes : []
    this.bodies = []
    if (Array.isArray(bodies)) {
      bodies.forEach(body => { this.addKinematicBody(body) })
    }
    Object.assign(this.levelBounds, levelBounds)
  }

  checkStatic (deltaMS: number): void {
    this.bodies.forEach(body => {
      const oldX = body.x
      const oldY = body.y
      let x = body.obj.x
      let y = body.obj.y
      const { x: csX, y: csY, width: csW, height: csH } = body.obj.collisionShape
      const csBounds = {
        top: csY,
        right: csX + csW,
        bottom: csY + csH,
        left: csX
      }
      // moving right
      if (x > oldX) {
        if (x + csBounds.right > this.levelBounds.right) {
          x = Math.min(x + csBounds.right, this.levelBounds.right) - csX - csW
        }
        this.staticShapes.forEach(shape => {
          if (
            ((oldX - 1 + csBounds.right) < shape.x) &&
                      ((x + csBounds.right) > shape.x) &&
                      ((y + csY) < (shape.y + shape.height)) &&
                      ((y + csBounds.bottom) > shape.y)
          ) {
            x = Math.min(x + csBounds.right, shape.x) - csX - csW
          }
        })
      }

      // moving left
      if (x < oldX) {
        if (x + csX < this.levelBounds.left) {
          x = Math.max(x + csX, this.levelBounds.left) - csX
        }
        this.staticShapes.forEach(shape => {
          if (
            ((oldX + 1 + csX) > (shape.x + shape.width)) &&
                      ((x + csX) < (shape.x + shape.width)) &&
                      ((y + csY) < (shape.y + shape.height)) &&
                      ((y + csBounds.bottom) > shape.y)
          ) {
            x = Math.max(x + csX, shape.x + shape.width) - csX
          }
        })
      }

      // moving down
      if (y > oldY) {
        if (y + csBounds.bottom > this.levelBounds.bottom) {
          y = Math.min(y + csBounds.bottom, this.levelBounds.bottom) - csY - csH
        }
        this.staticShapes.forEach(shape => {
          if (
            ((oldY - 1 + csBounds.bottom) < shape.y) &&
                      ((y + csBounds.bottom) > shape.y) &&
                     ((x + csX) < (shape.x + shape.width)) &&
                     ((x + csBounds.right) > shape.x)
          ) {
            y = Math.min(y + csBounds.bottom, shape.y) - csY - csH
          }
        })
      }

      // moving up
      if (y < oldY) {
        if (y + csY < this.levelBounds.top) {
          y = Math.max(y + csY, this.levelBounds.top) - csY
        }
        this.staticShapes.forEach(shape => {
          if (
            ((oldY + 1 + csY) > (shape.y + shape.height)) &&
                      ((y + csY) < (shape.y + shape.height)) &&
                     ((x + csX) < (shape.x + shape.width)) &&
                     ((x + csBounds.right) > shape.x)
          ) {
            y = Math.max(y + csY, shape.y + shape.height) - csY
          }
        })
      }

      body.x = x
      body.y = y
      body.obj.x = x
      body.obj.y = y
    })
  }
}
