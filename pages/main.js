import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

let x = 10
let y = 10

let xp = 10
let yp = 9

let pressCooldown = 20
let click = null
let symbol = '.'

export function mainMenu() {
    renderer.drawObject(`Page main.js`, 5, 5)
    const pointer = mouse.info()

    if (pointer.click) {
        click = pointer.click
        // symbol = symbol === '.' ? ',' : '.'
    }
    // shapes.line('%', 30, 30, mouse.x, mouse.y)

    shapes.line(symbol, click?.x ?? 0, click?.y ?? 0, pointer.x ?? 40, pointer.y ?? 46)
    // shapes.line('#', 30, 30, 50, 60)
    // shapes.line('%', 30, 30, 50, 70)
    // shapes.line('@', 30, 30, 50, 80)

    let pressed = 0


    if (window.pressedKeys[' '] && (!pressCooldown || pressed)) {
        pressCooldown = 20
        window.page = "test"
    }

    if (pressed) {
        pressCooldown = 1
    }

    animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(0, 0), randomInRangeFloat(0, 0))

    if (pointer.click?.new) {
        for (let i = 0; i < 10; i += 1)
            animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
    }

    if (window.clock % 3 === 0)
        animations.tick()

    animations.move()
    animations.render()

    mouse.showCursor()
}