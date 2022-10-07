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
    attack: 0,
    shootCooldown: 0
}

export async function gunTest() {
    renderer.drawObject(`gun attack test`, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()
    const pad = gamepad.info()

    ui.dropDown('Select experiment', selectExperiment, 5, 5, pointer)

    renderer.drawObject(`@`, player.x, player.y)

    // console.log(keyboard.down && keyboard.down)

    if (player.shootCooldown >= 0)
        player.shootCooldown -= 1

    if (pad) {
        player.x += 0.7 * pad.axes.x1
        player.y += 0.7 * pad.axes.y1

        const angle = Math.atan2((pad.axes.y2), (pad.axes.x2))
        console.log(angle)
        renderer.drawObject('*', player.x + Math.cos(angle) * 7, player.y + Math.sin(angle) * 5)
        if (pad.buttons.cross && player.shootCooldown < 0) {
            addBullet({
                x: player.x + Math.cos(angle) * 7,
                y: player.y + Math.sin(angle) * 5
            })

            player.shootCooldown = 10
        }
    }

    if (pointer.down && player.shootCooldown < 0) {
        addBullet(pointer)

        player.shootCooldown = 10
    }
    if (keyboard.down['d']) {
        player.x += 0.7
    }
    if (keyboard.down['a']) {
        player.x -= 0.7
    }
    if (keyboard.down['w']) {
        player.y -= 0.5
    }
    if (keyboard.down['s']) {
        player.y += 0.5
    }
    // shapes.line('.', pointer.x, pointer.y, player.x, player.y)

    animations.move()

    // if (window.clock % 1 === 0)
        animations.tick()

    animations.render()

    mouse.showCursor()
}

let bullets = []

function addBullet(pointer) {
    const angle = Math.atan2((pointer.y - player.y), (pointer.x - player.x))

    // angle *= 10

    // renderer.drawObject(Math.cos(angle) + ' s', 30, 5)

    const bSpeed = 5

    animations.animate({ sprites: ['--\n--', '--\n--'] }, player.x, player.y, Math.cos(angle) * bSpeed, Math.sin(angle) * bSpeed, { loop: true })
    // animations.animate({ sprites: ['-', '='] }, player.x, player.y, Math.cos(angle) * bSpeed, Math.sin(angle) * bSpeed, { loop: true })

    // console.table(Math.sin(angle), Math.cos(angle), Math.tan(angle), 1 / Math.tan(angle),)
    console.log(angle)

}

function handleBullet() {

}