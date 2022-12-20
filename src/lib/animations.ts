import { renderer } from "lib/renderer"

const debug = false


interface animationAsset {
    sprites: string[]
}

interface options {
    /** Wait *tickSpeed* frames before updating animation position */
    tickSpeed?: number | undefined,
    /** Wait *moveSpeed* frames before updating x and y position */
    moveSpeed?: number | undefined,
    /** Start animation again after end */
    loop?: boolean | undefined
}

interface activeAnimation {
    sprites: string[],
    stage: number,
    x: number,
    y: number,
    xVel: number,
    yVel: number,
    tickSpeed: number,
    moveSpeed: number,
    loop: boolean,
}

let activeAnimations: activeAnimation[] = []

export const animations = {
    amount: 0,
    animate: async function (animation: animationAsset, x: number, y: number, xVel: number = 0, yVel: number = 0, options: options = {
        tickSpeed: 5,
        moveSpeed: 1,
        loop: false
    }) {
        let { tickSpeed, moveSpeed, loop } = options || {}

        tickSpeed ??= 5
        moveSpeed ??= 1
        loop ??= false

        if (debug)
            console.log(`added animation at ${x} ${y}, ts = ${tickSpeed}, ms = ${moveSpeed}, xVel = ${xVel}`)

        activeAnimations.push({
            sprites: animation.sprites,
            stage: 0,
            x: x,
            y: y,
            xVel: xVel,
            yVel: yVel,
            loop: loop,
            tickSpeed: tickSpeed,
            moveSpeed: moveSpeed,
        })
    },
    /**
     * this function will increase all animations stage by 1 
     * and removes animations that are far from screen
     */
    tick: function () {
        window.activeAnimations = activeAnimations.length
        activeAnimations.map((animation, id) => {
            if (window.clock % animation.tickSpeed) {
                return animation
            }

            animation.stage += 1

            const { loop } = animation

            if (loop && animation.stage >= animation.sprites.length) {
                animation.stage = 0
            }

            if (animation.x > window.w || animation.x < 0 || animation.y > window.h || animation.y < 0) {
                activeAnimations.splice(id, 1)
            }

            if (animation.stage >= animation.sprites.length) {

                if (debug)
                    console.log(`removed animation ${id}`)

                activeAnimations.splice(id, 1)
            }

            return animation
        })
    },
    move: function () {
        activeAnimations.map(animation => {

            const { xVel, yVel, moveSpeed } = animation

            animation.x += xVel / moveSpeed
            animation.y += yVel / moveSpeed

            return animation
        })
    },
    render: function () {
        this.amount = activeAnimations.length
        activeAnimations.forEach(animation => {
            renderer.drawObject(animation.sprites[animation.stage], animation.x, animation.y)
        })
    }
}