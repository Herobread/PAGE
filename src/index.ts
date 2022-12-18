import { kb } from './lib/keyboard'
import { logger } from './lib/logger'
import { mouse } from './lib/mouse'
import { asciiMap, renderer } from './lib/renderer'
import { pages } from './pages'

declare global {
    interface Window {
        renderer: {
            showTransperencyOverlays: boolean,
            showPerformance: boolean
        },
        showUndefinedTransperencyMapWarning: boolean
        showPerformanceLogs: boolean,
        showColisionBoxes: boolean,

        objects: number,
        colisionObjects: number,
        renderTime: number,
        frameTime: number,
        frt: number,
        logic: number,
        activeAnimations: number,
        clock: number,
        fps: number,
        w: number,
        h: number,
        page: string,
        currentPage: string
        currentPageFunction: Function,
        asciiScreen: HTMLElement,
        fsize: number
    }
}


//// editable config
//(also, you can change them in console)

const startPageId = 1 // start page, selects page with corresponding id in page.js file

// window.showPerformanceLogs = true // log average render and logic time for 200 frames in console 
window.showColisionBoxes = true // draws colision boxes

window.renderer = {
    showTransperencyOverlays: false, // helps to configure transperency maps, works only for renderer.drawTransparentObject(...)
    showPerformance: true, // show perfomance overlay
}
window.showUndefinedTransperencyMapWarning = true // show error info near the object and log warn to the console if there is no 'tm' attribute in sprite, that was sent to renderer.drawTransparentObject(...)

//// end editable config
//// info variables

window.frt = 0 // frame render time
window.logic = 0 // logic processing time
// window.objects = 0 // WIP amount of active objects
window.activeAnimations = 0 // amount of active animations
window.clock = 0 // counts from 0 to 1000, adds 1 every frame
window.fps = 0 // target fps

// width and height of screen in symbols
window.w = 10
window.h = 10

//// end info variables
//// constants

const symbolWidth = 0.66
const symbolHeight = 1.22

////

let interval: NodeJS.Timer

window.asciiScreen = document.getElementById('asciicontainer') as HTMLElement

window.page = 'main'
window.currentPage = window.page
window.currentPageFunction = pages[startPageId].func
window.fps = pages[startPageId].fps

function resizer() {
    window.w = Math.floor(window.innerWidth / (window.fsize * symbolWidth))
    window.h = Math.floor(window.innerHeight / (window.fsize * symbolHeight)) + 1

    asciiMap.init()
}

window.onload = function () {
    resizer()
    pages[startPageId].init()
    asciiMap.init()

    window.addEventListener('resize', resizer, false)

    updateFps(window.fps)

    mouse.init()
    kb.init()

    interval = setInterval(main, 1000 / 1000)
}


export function updateFps(fps: number) {
    clearInterval(interval)

    window.fps = fps
    window.renderTime = 1000 / fps
    interval = setInterval(main, window.renderTime)
}

function main() {
    const renderTimeStart = performance.now()

    renderer.render()

    if (window.currentPage === window.page) {
        const logicTimeStart = performance.now()

        window.currentPageFunction()
        logger.log('logic', performance.now() - logicTimeStart)

        if (window.showPerformanceLogs && window.clock % 200 === 1) {
            console.log('logic: ', logger.getLog('logic'))
        }
    } else {
        pages.forEach(page => {
            if (page.name === window.page) {
                updateFps(page.fps)

                window.currentPage = window.page
                window.currentPageFunction = page.func

                page.init()
            }
        })
    }

    const renderTimeEnd = performance.now()
    const renderTime = renderTimeEnd - renderTimeStart

    logger.log('rendertime', renderTime)

    window.frameTime = renderTime

    if (window.clock % 20 === 0) {
        const frt = logger.getLog('rendertime')
        const logic = logger.getLog('logic')

        window.frt = frt
        window.logic = logic
    }
}