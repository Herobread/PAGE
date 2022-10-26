import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

export async function mainMenu() {
    renderer.drawObject(`Page main.js` + window.h + ' ' + window.w, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()

    // animations.animate(art.animations.particle,
    //     randomInRange(0, window.w),
    //     randomInRange(0, window.h),
    //     randomInRangeFloat(-2, 2),
    //     randomInRangeFloat(-2, 2),
    // )

    if (pointer.down) {
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2), 3)
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
        animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-2, 2), randomInRangeFloat(-2, 2))
    }

    animations.move()
    animations.tick()

    animations.render()

    mouse.showCursor()
}