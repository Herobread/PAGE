import { renderer } from "lib/renderer"
import { colisions } from "../lib/colisions"
import { randomInRangeFloat } from "../lib/util"

export class Block {
    x: number
    y: number
    xVel: number
    yVel: number
    w: number
    h: number
    sprite: string
    name: string
    cd: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.xVel = randomInRangeFloat(-0.1, 0.1)
        this.yVel = randomInRangeFloat(-0.1, 0.1)
        this.w = 30
        this.h = 30
        this.name = 'block'

        this.cd = 0
        this.sprite = '###\n###\n###'
    }

    tick() {
        this.sprite = '###\n###\n###'

        this.x += this.xVel
        this.y += this.yVel

        colisions.addRectangleColision(this, () => {
            console.log('first')
            this.cd = 300
            this.sprite = '...\n...\n...'
        })

        this.cd -= 1

        if (this.cd > 0) {
            renderer.drawObject(this.sprite, this.x, this.y)
        }
        renderer.drawObject(`${this.cd}`, this.x, this.y)

    }

    draw() {
    }
}