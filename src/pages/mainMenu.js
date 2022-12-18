import { animations } from '../lib/animations'
import { kb } from '../lib/keyboard'
import { mouse } from '../lib/mouse'
import { colisions } from '../lib/colisions'
import { gamepad } from '../lib/gamepad'

export function initMainMenu() {

}

export async function mainMenu() {
    const pointer = mouse.info()
    const keyboard = kb.info()
    let pad = gamepad.info()


    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}