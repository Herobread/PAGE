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

let y = 0

export async function sinus() {
    renderer.drawObject(`sinus`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()
    const pad = gamepad.info()

    ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    y += 0.08

    animations.animate(art.animations.letters, window.w - 1, Math.sin(y) * 20 + 30, -5, 0, { loop: true })

    // if (randomInRange(0, 20) === 0) {
    for (let i = 0; i < 10; i++) {
        animations.animate(art.animations.particle, window.w - 1, Math.sin(y) * 20 + 30, randomInRangeFloat(-5, 0), randomInRangeFloat(-2, 2), { loop: false })

    }
    // }

    animations.move()

    if (window.clock % 2 === 0)
        animations.tick()

    animations.render()

    mouse.showCursor()
}