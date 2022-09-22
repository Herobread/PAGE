let objects

export const colisions = {
    /**
     * @param  {} x1 x coordinate of the point
     * @param  {} y1 y coordinate of the point
     * @param  {} x x coordinate of the rectangle
     * @param  {} y y coordinate of the rectangle
     * @param  {} w width of the rectangle
     * @param  {} h height of the rectangle
     * 
     */
    checkPointInSquare: function (x1, y1, x, y, w, h) {
        x1 = Math.floor(x1)
        y1 = Math.floor(y1)
        x = Math.floor(x)
        y = Math.floor(y)
        w = Math.floor(w)
        h = Math.floor(h)

        const checkWidth = x <= x1 && x1 < x + w
        const checkHeight = y <= y1 && y1 < y + h

        // console.log(x1, x, x + w, y1, y, y + h, checkHeight && checkWidth)

        if (checkHeight && checkWidth) {
            return true
        }
        return false
    },
}