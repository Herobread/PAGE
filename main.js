import { kb } from './lib/keyboard.js'
import { mouse } from './lib/mouse.js'
import { renderer } from './lib/renderer.js'
import { mainMenu } from './pages/main.js'
import { stickmanAttack } from './pages/stickmanAttack.js'
import { stickman } from './pages/stickman.js'
import { gunTest } from './pages/test.js'
import { sinus } from './pages/sinus.js'
import { particles } from './pages/particles.js'

const container = document.getElementById('container')
const asciicontainer = document.getElementById('asciicontainer')

window.asciiScreen = asciicontainer

window.pressedKeys = {
    'w': null,
    'a': null,
    's': null,
    'd': null,
    ' ': null,
    'ArrowUp': null,
    'ArrowDown': null,
    'ArrowRight': null,
    'ArrowLeft': null,
}

window.onload = function () {
    resizer()

    window.addEventListener('resize', resizer, false)

    function resizer() {
        asciicontainer.style.width = window.innerWidth - 1 + 'px'
        asciicontainer.style.height = window.innerHeight - 1 + 'px'

        window.w = Math.floor(window.innerWidth / (window.fsize * 0.66))
        window.h = Math.floor(window.innerHeight / (window.fsize * 1.22)) + 1
    }

    mouse.init()
    kb.init()

    window.page = 'sword'
    window.page = 'stickman'
    window.page = 'gun'
    window.page = 'stickmanAttack'
    window.page = 'sinus'
    window.page = 'particles'


    window.onkeyup = function (e) {
        window.pressedKeys[e.key] = false
    }

    window.onkeydown = function (e) {
        window.pressedKeys[e.key] = true
    }

    updateFps(10)
}

let interval = setInterval(main, 1000 / 1000)

export function updateFps(fps) {
    clearInterval(interval)

    interval = setInterval(main, 1000 / fps)
}

let performanceRes = []

function main() {
    // this function controlls pages
    // add pages and their fps(optional, but better add) here

    let sf, ef
    sf = performance.now()
    if (window.page === 'sword') {
        const fps = 60

        updateFps(fps)

        mainMenu()

    } else if (window.page === 'gun') {
        const fps = 60

        updateFps(fps)

        gunTest()
    } else if (window.page === 'stickman') {
        const fps = 60

        updateFps(fps)

        stickman()
    } else if (window.page === 'stickmanAttack') {
        const fps = 60

        updateFps(fps)

        stickmanAttack()
    } else if (window.page === 'sinus') {
        const fps = 144

        updateFps(fps)

        sinus()
    } else if (window.page === 'particles') {
        const fps = 144

        updateFps(fps)

        particles()
    }
    ef = performance.now()


    const s = performance.now()
    renderer.render()
    const e = performance.now()

    performanceRes.push({
        rendering: e - s,
        functional: ef - sf,
    })

    // if (window.clock % 200 === 0) {
    //     console.log(performanceRes)
    //     performanceRes = []
    // }
}