import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

export async function mainMenu() {
    const pointer = mouse.info()
    const keyboard = kb.info()

    renderer.drawObject('Just another page', 5, 10)

    ui.button({
        content: 'Go to test.js',
        x: 5,
        y: 20,
        pointer: pointer,
        onClick: () => {
            window.page = 'test'
        },
    })

    animations.move()
    animations.tick()

    animations.render()

    mouse.showCursor()
}