import { renderer } from './renderer'

export const shapes = {
    /**
     * @param  {string} symbol symbol will be used in drawing
     * @param  {number} x1 coordinate
     * @param  {number} y1 coordinate
     * @param  {number} x2 coordinate
     * @param  {number} y2 coordinate
     */
    line: function (symbol: string, x1: number, y1: number, x2: number, y2: number) {
        // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
        let dx = Math.abs(x2 - x1)
        let sx = x1 < x2 ? 1 : -1
        let dy = -Math.abs(y2 - y1)
        let sy = y1 < y2 ? 1 : -1
        let error = dx + dy

        let end = false
        while (!end) {
            renderer.drawSymbol(symbol, x1, y1)
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
    /**
     * @param  {string} symbol symbol will be used in drawing
     * @param  {number} x1 coordinate
     * @param  {number} y1 coordinate
     * @param  {number} x2 coordinate
     * @param  {number} y2 coordinate
     */
    rectangle: function (symbol: string, x1: number, y1: number, x2: number, y2: number) {
        x1 = Math.floor(x1)
        y1 = Math.floor(y1)
        x2 = Math.floor(x2)
        y2 = Math.floor(y2)

        this.line(symbol, x1, y1, x1, y2)
        this.line(symbol, x1, y2, x2, y2)
        this.line(symbol, x2, y1, x2, y2)
        this.line(symbol, x1, y1, x2, y1)
    },
    /**
     * @param  {string} symbol symbol will be used in drawing
     * @param  {number} x1 coordinate
     * @param  {number} y1 coordinate
     * @param  {number} x2 coordinate
     * @param  {number} y2 coordinate
     */
    ellipse: function (symbol: string, x: number, y: number, a: number, b: number) {
        a = Math.abs(x - a)
        b = Math.abs(y - b)
        let xlast = x
        let ylast = y

        for (var angle = 0; angle <= 720; angle++) {
            let X = Math.floor(x + (a * Math.cos(angle * 2 * (Math.PI / 720))) + 0.5);
            let Y = Math.floor(y + (b * Math.sin(angle * 2 * (Math.PI / 720))) + 0.5);
            if (xlast != X || ylast != Y) {
                xlast = X; ylast = Y;
            }
            renderer.drawSymbol(symbol, X, Y)
        }
    }
}