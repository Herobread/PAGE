import { animations } from '../lib/animations.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { randomInRange } from '../lib/util.js'
import { Block } from '../objects/block.js'
import { colisions } from '../lib/colisions.js'
import { renderer } from '../lib/renderer.js'

export function initGame() {

}

export function game() {
    const pointer = mouse.info()
    const keyboard = kb.info()

    renderer.drawSymbol('-', 9, 10)
    renderer.drawSymbol('-', 10, 10)
    renderer.drawSymbol('-', 11, 10)
    renderer.drawSymbol('|', 10, 9)
    renderer.drawSymbol('|', 10, 10)
    renderer.drawSymbol('|', 10, 11)

    renderer.drawSymbol('.', 10, 13)
    renderer.drawSymbol('.', 10, 14)
    renderer.drawSymbol('\'', 10, 14)
    renderer.drawSymbol('\'', 10, 15)

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}