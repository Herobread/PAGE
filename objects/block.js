import { colisions } from "../lib/colisions.js"
import { renderer } from "../lib/renderer.js"

export class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.w = 3
        this.h = 3

        this.sprite = `···\n···\n···`
    }

    draw() {
        renderer.drawObject(this.sprite, this.x, this.y)
    }

    logic() {
        this.sprite = `···\n···\n···`


        colisions.addRectangleColision(this, 'block', (name) => {
            console.log(name)
            this.sprite = '###\n###\n###'
        })
    }

    setPos(x, y) {
        this.x = x
        this.y = y
    }
}