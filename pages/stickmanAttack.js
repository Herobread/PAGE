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

let x = 10
let attack = 0

let player = {
    x: 10,
    y: 10
}

export async function stickmanAttack() {
    renderer.drawObject(`attack test`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()

    // ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    // renderer.drawObject(art)

    if (pointer.click) {
        animations.animate(art.animations.combat.swordAttack2, player.x - 2, player.y - 4)
    }
    if (keyboard.down['d']) {
        player.x += 0.7 - 0.3
    }
    if (keyboard.down['a']) {
        player.x -= 0.7 - 0.3
    }
    if (keyboard.down['w']) {
        player.y -= 0.5 - 0.3
    }
    if (keyboard.down['s']) {
        player.y += 0.5 - 0.3
    }

    renderer.drawObject('@', player.x, player.y)


    renderer.drawObject('@', 20, 20)

    if (keyboard.down['f']) {
        animations.animate(art.animations.particle, 20, 20, randomInRangeFloat(0, 4), randomInRangeFloat(-4, 4))
    }


    if (window.clock % 3 === 0) {
        animations.move()
        animations.tick()
    }

    animations.render()

    mouse.showCursor()
}