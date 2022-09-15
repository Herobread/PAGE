import { renderer } from "./renderer.js"

const debug = 0

export const animations = {
    activeAnimations: [],
    amount: 0,
    animate: function (animation, x, y, xVel = 0, yVel = 0) {

        if (debug)
            console.log(`added animation at ${x} ${y}`)

        this.activeAnimations.push({
            sprites: animation.sprites,
            stage: 0,
            x: x,
            y: y,
            xVel: xVel,
            yVel: yVel
        })
    },
    tick: function () {
        this.activeAnimations.map((animation, id) => {
            animation.stage += 1
            if (animation.stage >= animation.sprites.length) {

                if (debug)
                    console.log(`removed animation ${id}`)

                this.activeAnimations.splice(id, 1)
            }

            return animation
        })
    },
    move: function () {
        this.activeAnimations.map((animation, id) => {
            animation.x += animation.xVel / 3
            animation.y += animation.yVel / 3

            return animation
        })
    },
    render: function () {
        this.amount = this.activeAnimations.length
        this.activeAnimations.forEach(animation => {
            renderer.drawObject(animation.sprites[animation.stage], animation.x, animation.y)
        })
    }
}