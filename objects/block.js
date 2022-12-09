import { colisions } from "../lib/colisions.js"
import { renderer } from "../lib/renderer.js"
import { randomInRange } from "../lib/util.js"

export class Block {
    constructor(x, y) {
        this.name = 'block'
        this.x = x
        this.y = y
        this.w = 3
        this.h = 3

        this.xVelocity = 1
        this.yVelocity = 5

        // ·
        this.sprite = `...\n...\n...`
    }

    draw() {
        renderer.drawObject(this.sprite, this.x, this.y)
    }

    tick() {
        this.sprite = `...\n...\n...`

        colisions.addRectangleColision(this, (object) => {
            console.log('colided with ', object)
            this.sprite = '###\n###\n###'
            this.x = randomInRange(0, window.w - 3)
            this.y = randomInRange(0, window.h - 3)
            // console.log(object)
            // this.x = -object.xVelocity
            // this.y = -object.yVelocity
        })
    }

    setPos(x, y) {
        this.x = x
        this.y = y
    }
}