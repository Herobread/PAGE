import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { renderer } from '../lib/renderer.js'

let x = 10
let y = 10

let xp = 10
let yp = 9

let pressCooldown = 20

export function test() {
    renderer.drawObject(`Hello world!`, 5, 5)

    let pressed = 0

    renderer.drawObject(art.textures.block.img, x, y)

    if (pressCooldown)
        pressCooldown -= 1

    if (window.pressedKeys['w'] && !pressCooldown) {
        y -= 0.2
        pressed = 1
    }
    if (window.pressedKeys['s'] && !pressCooldown) {
        y += 0.2
        pressed = 1
    }
    if (window.pressedKeys['d'] && !pressCooldown) {
        x += 0.2
        pressed = 1
    }
    if (window.pressedKeys['a'] && !pressCooldown) {
        x -= 0.2
        pressed = 1
    }

    if (colisions.checkPointInSquare(xp, yp, x, y, 4, 4)) {
        renderer.drawObject('@', xp, yp)
    } else {
        renderer.drawObject('=', xp, yp)
    }

    if (pressed) {
        pressCooldown = 2
    }

    if (window.pressedKeys[' '] && (!pressCooldown || pressed)) {
        pressCooldown = 20
        window.page = "mainMenu"
    }

    animations.render()
}