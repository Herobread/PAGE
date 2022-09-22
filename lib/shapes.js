import { renderer } from './renderer.js'

export const shapes = {
    line: function (symbol, x1, y1, x2, y2) {
        // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

        let dx = Math.abs(x2 - x1)
        let sx = x1 < x2 ? 1 : -1
        let dy = -Math.abs(y2 - y1)
        let sy = y1 < y2 ? 1 : -1
        let error = dx + dy

        let end = false
        while (!end) {
            renderer.drawObject(symbol, x1, y1)
            if (x1 == x2 && y1 == y2)
                end = true
            let e2 = 2 * error
            if (e2 >= dy) {
                if (x1 == x2)
                    end = true
                error = error + dy
                x1 = x1 + sx
            }
            if (e2 <= dx) {
                if (y1 == y2)
                    end = true
                error = error + dx
                y1 = y1 + sy
            }
        }
    },
    rectangleCoords: function (x1, y1, x2, y2) {

        renderer.drawObject()
    }
}