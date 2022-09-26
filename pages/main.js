import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

let selected = ''
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export async function mainMenu() {
    renderer.drawObject(`Page main.js` + window.h + ' ' + window.w, 5, 5)
    const pointer = mouse.info()

    renderer.drawObject(characters.charAt(randomInRange(0, characters.length)), 3, 5)

    if (pointer.down) {
        for (let i = 0; i < 10; i++) {
            animations.animate(
                randomInRange(0, 1) ? art.animations.fire : art.animations.particle, pointer.x, pointer.y,
                randomInRangeFloat(-5, 5),
                randomInRangeFloat(-3, 3),
                {
                    // loop: true
                }
            )
        }
    }
    if (window.clock % 1 === 0)
        animations.move()
    if (window.clock % 4 === 0)
        animations.tick()
    animations.render()

    mouse.showCursor()
}