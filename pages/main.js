import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { gamepad } from '../lib/gamepad.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

let x = 0
let y = 0

export function mainMenu() {
    const cursor = mouse.info()

    renderer.drawObject(`Hello world!`, 5, 5)

    x = cursor.x
    y = cursor.y

    if (cursor.down) {
        animations.animate(art.animations.particle, x, y, randomInRangeFloat(-1, 1), randomInRangeFloat(-1, 1))
    }

    if (window.clock % 3 === 0)
        animations.tick()
    animations.move()

    renderer.drawObject('+', x, y)

    animations.render()
}