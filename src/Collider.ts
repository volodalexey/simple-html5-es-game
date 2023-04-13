import { type Body } from './Body'

export interface IColliderOptions {
  staticShapes: IStaticShape[]
  bodies?: Body[]
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
  public staticShapes!: IColliderOptions['staticShapes']
  public bodies: IColliderBody[] = []
  constructor ({ staticShapes, bodies }: IColliderOptions) {
    this.staticShapes = staticShapes
    if (Array.isArray(bodies)) {
      bodies.forEach(body => { this.addKinematicBody(body) })
    }
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

  restart (): void {
    this.bodies.forEach(b => {
      b.x = b.initX
      b.y = b.initY
    })
  }

  checkStatic (deltaMS: number): void {
    this.bodies.forEach(body => {
      const oldX = body.x
      const oldY = body.y
      let x = body.obj.x
      let y = body.obj.y
      // moving right
      if (x > oldX) {
        this.staticShapes.forEach(shape => {
          if (
            ((oldX - 1 + body.obj.collisionShape.x + body.obj.collisionShape.width) < shape.x) &&
                      ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x) &&
                      ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                      ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
          ) {
            x = Math.min(x + body.obj.collisionShape.x + body.obj.collisionShape.width, shape.x) -
                          body.obj.collisionShape.x - body.obj.collisionShape.width
          }
        })
      }

      // moving left
      if (x < oldX) {
        this.staticShapes.forEach(shape => {
          if (
            ((oldX + 1 + body.obj.collisionShape.x) > (shape.x + shape.width)) &&
                      ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                      ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                      ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
          ) {
            x = Math.max(x + body.obj.collisionShape.x, shape.x + shape.width) -
                          body.obj.collisionShape.x
          }
        })
      }

      // moving down
      if (y > oldY) {
        this.staticShapes.forEach(shape => {
          if (
            ((oldY - 1 + body.obj.collisionShape.y + body.obj.collisionShape.height) < shape.y) &&
                      ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y) &&
                     ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                     ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
          ) {
            y = Math.min(y + body.obj.collisionShape.y + body.obj.collisionShape.height, shape.y) - body.obj.collisionShape.y - body.obj.collisionShape.height
          }
        })
      }

      // moving up
      if (y < oldY) {
        this.staticShapes.forEach(shape => {
          if (
            ((oldY + 1 + body.obj.collisionShape.y) > (shape.y + shape.height)) &&
                      ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                     ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                     ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
          ) {
            y = Math.max(y + body.obj.collisionShape.y, shape.y + shape.height) - body.obj.collisionShape.y
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
