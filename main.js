import { mouse } from './lib/mouse.js'
import { renderer } from './lib/renderer.js'
import { mainMenu } from './pages/main.js'

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

    window.page = 'mainMenu'
    // window.page = 'game'

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

function main() {
    // this function controlls pages
    // add pages and their fps(optional, but better add) here

    if (window.page === 'mainMenu') {
        const fps = 60

        updateFps(fps)

        mainMenu()
    }


    renderer.render()
}