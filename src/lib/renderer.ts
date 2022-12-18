import { logger } from "./logger"

window.fsize = 10
window.clock = 0
let screen = Array(window.w).fill(' ').map(() => Array(window.h))

interface TransperentObject {
    img: string,
    tm: string,
    w: number,
    h: number,
    [key: string]: any
}

export const asciiMap = {
    putSymbol: function (char: string, x: number, y: number) {
        if (x >= 0 && x < window.w && y >= 0 && y < window.h && screen) {

            screen[y][x] = char
        }
    },
    getSymbol: function (x: number, y: number) {
        return screen[y][x]
    },
    init: function () {
        screen = Array(window.w).fill(null).map(() => Array(window.h))
    },
}

export const renderer = {
    put: async function (text: string) {
        window.asciiScreen.textContent = text
    },
    drawSymbol: function (symbol: string, x: number, y: number) {
        x = Math.floor(x)
        y = Math.floor(y)

        if (!symbol) {
            throw 'Object to draw is not defined'
        }
        if (x == undefined) {
            throw `X is not defined(${symbol})`
        }
        if (y == undefined) {
            throw `Y is not defined(${symbol})`
        }

        asciiMap.putSymbol(symbol[0], x, y)
    },
    drawObject: async function (object: string, x: number, y: number) {
        if (!object) {
            throw 'Object to draw is not defined'
        }
        if (x == undefined) {
            throw `X is not defined(${object})`
        }
        if (y == undefined) {
            throw `Y is not defined(${object})`
        }

        let _y = 0
        let _x = 0
        x = Math.floor(x)
        y = Math.floor(y)

        for (let i = 0; i < object.length; i++) {
            if (object.charAt(i) != '\n') {
                asciiMap.putSymbol(object.charAt(i), x + _x, y + _y)
                _x++
            } else {
                _x = 0
                _y++
            }
        }
    },
    drawTransparentObject: async function (object: TransperentObject, x: number, y: number) {
        let _y = 0
        let _x = 0
        x = Math.floor(x)
        y = Math.floor(y)

        let transperencyMap = object.tm
        const img = object.img

        for (let i = 0; i < img.length; i++) {
            if (!transperencyMap) {

                // legacy support

                if (img.charAt(i) !== '\n') {
                    if (img.charAt(i) !== ' ') {
                        asciiMap.putSymbol(img.charAt(i), x + _x, y + _y)
                        // asciiMap.putSymbol('$', x + _x, y + _y)
                    }
                    _x++
                } else {
                    _x = 0
                    _y++
                }
            } else {
                // transperency map found

                if (img.charAt(i) !== '\n') {
                    if (transperencyMap.charAt(i) !== ' ') {
                        asciiMap.putSymbol(img.charAt(i), x + _x, y + _y)

                        if (window.renderer.showTransperencyOverlays) {
                            asciiMap.putSymbol(':', x + _x, y + _y)
                        }
                    }

                    _x += 1
                } else {
                    _x = 0
                    _y += 1
                }
            }
        }


        if (!transperencyMap && window.showUndefinedTransperencyMapWarning) {
            console.warn(`No transperency map found for ${object.img}`)
            this.drawObject('transperency map\nnot found\n<--for this object', x + 10, y - 1)
        }
    },
    clear: async function () {
        asciiMap.init()
    },
    render: async function () {
        if (window.renderer.showPerformance) {
            this.drawObject(`Page ${window.page}.js h=${window.h} w=${window.w}, \nFrame render time = ${window.frt.toFixed(2)} ms${(1000 / window.frt).toFixed(2)}, logic time = ${window.logic.toFixed(2)}, (${(window.logic / window.frt * 100).toFixed(2)}%)
Active animations:${window.activeAnimations}, objects: ${window.objects}, colision obj: ${window.colisionObjects}`, 5, 5)
        }

        const start = performance.now()

        window.clock += 1

        if (window.clock === 1001) {
            window.clock = 0
        }

        let res = ''

        for (let y = 0; y < window.h; y += 1) {
            for (let x = 0; x < window.w; x += 1) {
                const symbol = asciiMap.getSymbol(x, y)

                if (symbol)
                    res += symbol
                else
                    res += ' '
            }
            res += '\n'
        }
        this.put(res)
        this.clear()

        const end = performance.now()

        logger.log('render', end - start)

        if (window.clock % 200 == 0) {
            if (window.showPerformanceLogs) {
                console.log(logger.getLog('render'))
            }
        }
    }
}
