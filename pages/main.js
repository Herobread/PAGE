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
    renderer.drawObject(`Page main.js` + window.h + ' ' + window.w, 0, 0)
    const pointer = mouse.info()
    const keyboard = kb.info()

    let ddOptions = [
        {
            content: 'New',
            onClick: () => {
                console.log('first')
            }
        },
        {
            content: 'New window',
            onClick: () => {
                console.log('2')
            }
        },
        {
            content: 'Open',
            onClick: () => { }
        },
        {
            content: 'Save',
            onClick: () => { }
        },
        {
            content: 'Save as',
            onClick: () => { }
        },
        {
            content: '',
            split: true,
            onClick: () => { }
        },
        {
            content: 'Page setup',
            onClick: () => { }
        },
        {
            content: 'Print',
            onClick: () => { }
        },
        {
            content: '',
            split: true,
            onClick: () => { }
        },
        {
            content: 'Exit',
            onClick: () => { }
        },
    ]


    let ddOptions2 = [
        {
            content: 'option one',
            onClick: () => {
                console.log('first')
            }
        },
        {
            content: 'option 2',
            onClick: () => {
                console.log('2')
            }
        },
        {
            content: 'option 3',
            onClick: () => {
                console.log('3')
            }
        },
        {
            content: 'option one',
            onClick: () => {
                console.log('first')
            }
        },
        {
            content: 'option 2',
            onClick: () => {
                console.log('2')
            }
        },
        {
            content: 'option 3',
            onClick: () => {
                console.log('3')
            }
        },
        {
            content: 'option one',
            onClick: () => {
                console.log('first')
            }
        },
        {
            content: 'option 2',
            onClick: () => {
                console.log('2')
            }
        },
        {
            content: 'option 3',
            onClick: () => {
                console.log('3')
            }
        },
    ]

    const fileDropdown = ui.dropDown('File', ddOptions, 5, 5, pointer)

    ui.dropDown('Edit', ddOptions2, 5 + fileDropdown.width + 1, 5, pointer)

    renderer.drawObject(pointer.scroll + ' s', 8, 9)

    animations.move()
    if (window.clock % 3 === 0)
        animations.tick()

    animations.render()

    mouse.showCursor()
}