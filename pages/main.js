import { animations } from '../lib/animations.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { randomInRange } from '../lib/util.js'
import { Block } from '../objects/block.js'
import { colisions } from '../lib/colisions.js'

let blocks = []

export function initGame() {
    for (let i = 0; i < 2; i += 1) {
        blocks.push(new Block(randomInRange(0, window.w), randomInRange(0, window.h)))
    }
}

export function game() {
    const pointer = mouse.info()
    const keyboard = kb.info()


    blocks.forEach(block => {
        block.draw()
        block.logic()
    })

    blocks[0].setPos(pointer.x - 1, pointer.y - 1)

    if (pointer.click) {
        blocks.push(new Block(pointer.x - 1, pointer.y - 1))
    }


    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}