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

export async function test() {
    renderer.drawObject(`Page main.js` + window.h + ' ' + window.w, 5, 5)
    const pointer = mouse.info()

    for (let i = 0; i < 6; i += 1)
        renderer.drawObject(characters.charAt(randomInRange(0, characters.length)), randomInRangeFloat(0, 4), randomInRangeFloat(0, 4))

    if (pointer.down) {
        for (let i = 0; i < 100; i++) {
            animations.animate(
                randomInRange(0, 1) ? art.animations.fire : art.animations.particle, pointer.x, pointer.y,
                randomInRangeFloat(-15, 15),
                randomInRangeFloat(-13, 13),
                {
                    // loop: true
                }
            )
        }
    } else {
        renderer.drawObject('Click to create a lot of particles!', pointer.x + 3, pointer.y)
    }


    animations.move()
    if (window.clock % 3 === 0)
        animations.tick()
    animations.render()

    mouse.showCursor()
}