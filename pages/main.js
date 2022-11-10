import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

export async function mainMenu() {
    const pointer = mouse.info()
    const keyboard = kb.info()

    renderer.drawObject('Just another page', 5, 10)

    if (pointer.down) {
        for (let i = 0; i < 20; i += 1) {
            animations.animate(
                art.animations.particle,
                pointer.x,
                pointer.y,
                randomInRangeFloat(-2, 2),
                randomInRangeFloat(-1, 1),
                {
                    loop: false,
                    tickSpeed: randomInRange(1, 10),
                    moveSpeed: 2
                }
            )
        }
    } else {
        renderer.drawObject('Click to create a lot of 60 fps particles!', pointer.x + 3, pointer.y)
    }

    ui.button({
        content: 'Go to test.js',
        x: 5,
        y: 20,
        pointer: pointer,
        onClick: () => {
            console.log('first')
            window.page = 'test'
        },
    })

    animations.move()
    animations.tick()

    animations.render()

    mouse.showCursor()
}