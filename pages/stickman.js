import { art } from '../art.js'
import { selectExperiment } from '../config/constants.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'


export async function stickman() {
    renderer.drawObject(`stickman animation`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()

    ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    if (keyboard.down[' '] || pointer.click) {
        animations.animate(art.animations.stickman, 10, 40, 2, 0, { loop: true })
    }

    if (window.clock % 12 === 0) {
        animations.move()
        animations.tick()
    }

    animations.render()

    mouse.showCursor()
}