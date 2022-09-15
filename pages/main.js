import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { gamepad } from '../lib/gamepad.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { randomInRangeFloat } from '../lib/util.js'

let x = 0
let y = 0

export function mainMenu() {
    renderer.drawObject('Hello, world!', 5, 5)

    const pointer = mouse.info()

    if (window.clock % 2 === 1) {
        animations.move()
    }
    if (window.clock % 5 === 0) {
        animations.tick()
    }

    if (pointer.click)
        renderer.drawObject(`${pointer.click.x} ${pointer.click.y} ${pointer.click.new}`, 10, 10)

    // console.log(pointer.click.new)

    x = pointer.x
    y = pointer.y

    if (pointer.down) {
        // animations.animate(art.animations.particle, x, y, 0, 0)
    }
    if (pointer.click || pointer.down) {
        animations.animate(art.animations.fire, x, y, randomInRangeFloat(-1, 1), randomInRangeFloat(-1, 1))
        animations.animate(art.animations.fire, x, y, randomInRangeFloat(-1, 1), randomInRangeFloat(-1, 1))
    }

    renderer.drawObject(art.cursor.img, x, y)
    // animations.animate(art.animations.particle, x, y, 0, 0)

    animations.render()
}