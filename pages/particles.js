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

export async function particles() {
    renderer.drawObject(`sinus`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()
    const pad = gamepad.info()

    ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    if (pointer.down) {
        const radius = 5
        for (let i = 0; i < 100; i++) {
            animations.animate(art.animations.particle, pointer.x, pointer.y, randomInRangeFloat(-radius, radius), randomInRangeFloat(-radius, radius), { loop: true })
        }
    }

    animations.move()

    if (window.clock % 2 === 0)
        animations.tick()

    animations.render()

    mouse.showCursor()
}