import { animations } from '../lib/animations'
import { kb } from '../lib/keyboard'
import { mouse } from '../lib/mouse'
import { colisions } from '../lib/colisions'
import { gamepad } from '../lib/gamepad'
import { Block } from '../objects/Block'
import { randomInRange } from '../lib/util'

let objects = []

export function initGame() {
    console.log(window.w)
    for (let i = 0; i < 20; i += 1)
        objects.push(new Block(randomInRange(1, window.w), randomInRange(1, window.h)))
}

export async function game() {
    const pointer = mouse.info()
    const keyboard = kb.info()
    let pad = gamepad.info()

    objects.forEach(obj => {
        obj.tick()
        obj.draw()
    })

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}