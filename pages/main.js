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

let player = {
    x: 10,
    y: 10,
    hp: 3,
    attack: 0
}

export async function mainMenu() {
    renderer.drawObject(`sword attack test`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()

    ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    renderer.drawObject(`@`, player.x, player.y)

    // console.log(keyboard.down && keyboard.down)
    if (pointer.click) {
        player.attack = 0
    }
    if (keyboard.down['d']) {
        player.x += 0.4
    }
    if (keyboard.down['a']) {
        player.x -= 0.4
    }
    if (keyboard.down['w']) {
        player.y -= 0.4
    }
    if (keyboard.down['s']) {
        player.y += 0.4
    }


    handleCombat()

    animations.move()
    if (window.clock % 2 === 0)
        animations.tick()

    animations.render()

    mouse.showCursor()
}

function handleCombat() {


    if (player.attack < art.animations.combat.swordAttack.sprites.length && player.attack !== -1) {
        renderer.drawObject(art.animations.combat.swordAttack.sprites[player.attack], player.x, player.y - 4)
        if (window.clock % 2 == 0)
            player.attack += 1
    }
}