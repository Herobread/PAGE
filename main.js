import { kb } from './lib/keyboard.js'
import { logger } from './lib/logger.js'
import { mouse } from './lib/mouse.js'
import { renderer } from './lib/renderer.js'
import { pages } from './pages.js'
import { mainMenu } from './pages/main.js'
import { test } from './pages/test.js'

// const container = document.getElementById('container')
const asciicontainer = document.getElementById('asciicontainer')

window.frt = 1
window.asciiScreen = asciicontainer
window.page = 'test'
window.currentPage = window.page
window.currentPageFunction = pages[1].func
window.clock = 0

window.onload = function () {
    resizer()

    window.addEventListener('resize', resizer, false)

    function resizer() {
        // asciicontainer.style.width = window.innerWidth - 1 + 'px'
        // asciicontainer.style.height = window.innerHeight - 1 + 'px'

        window.w = Math.floor(window.innerWidth / (window.fsize * 0.66))
        window.h = Math.floor(window.innerHeight / (window.fsize * 1.22)) + 1
    }

    mouse.init()
    kb.init()
}

let interval = setInterval(main, 1000 / 1000)

export function updateFps(fps) {
    clearInterval(interval)

    window.renderTime = 1000 / fps
    interval = setInterval(main, window.renderTime)
}

console.log(page[0].fps + ' ')
updateFps(page[0].fps)

function main() {
    const start = performance.now()

    renderer.render()

    if (window.currentPage == window.page) {
        window.currentPageFunction()
    } else {
        pages.forEach(page => {
            if (page.name === window.page) {
                updateFps(page.fps)
                window.currentPage = window.page
                window.currentPageFunction = page.func
            }
        })
    }

    const end = performance.now()

    logger.log('rendertime', end - start)

    window.frameTime = end - start

    if (window.clock % 20 === 0) {
        // frame render time
        const frt = logger.getLog('rendertime')
        window.frt = frt
    }
}