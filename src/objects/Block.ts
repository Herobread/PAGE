import { renderer } from "lib/renderer"
import { art } from "../art"
import { animations } from "../lib/animations"
import { colisions } from "../lib/colisions"
import { randomInRange, randomInRangeFloat } from "../lib/util"

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
        this.xVel = randomInRangeFloat(0.2, 0.3) * (randomInRange(0, 1) === 0 ? 1 : -1)
        this.yVel = randomInRangeFloat(0.2, 0.3) * (randomInRange(0, 1) === 0 ? 1 : -1)
        this.w = 3
        this.h = 3
        this.name = 'block'

        this.cd = 0
        this.sprite = '###\n###\n###'
    }

    tick() {
        this.sprite = '###\n###\n###'

        colisions.addRectangleColision(this, () => {
            this.sprite = '...\n...\n...'
        })

        this.x += this.xVel
        this.y += this.yVel

        if (this.x < 0 || this.x + this.w > window.w) {
            this.xVel *= -1
        }

        if (this.y < 0 || this.y + this.h > window.h) {
            this.yVel *= -1
        }
    }

    draw() {
        renderer.drawObject(this.sprite, this.x, this.y)

        animations.animate(art.animations.particle, this.x, this.y, 0, 0, {
            moveSpeed: 1
        })
    }
}