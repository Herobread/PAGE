import { shapes } from "./shapes"

interface baseColisionRectangle {
    x: number,
    y: number,
    w: number,
    h: number,
    name: string,
    [key: string]: any
}

interface basePoint {
    x: number,
    y: number,
    [key: string]: any
}

let objects: baseColisionRectangle[] = []

export const colisions = {
    checkIfPointInSquare: function (point: basePoint, rectangle: baseColisionRectangle) {
        let { x, y } = point
        let x1 = Math.floor(x)
        let y1 = Math.floor(y)

        let { w, h } = rectangle

        x = Math.floor(rectangle.x)
        y = Math.floor(rectangle.y)
        w = Math.floor(w)
        h = Math.floor(h)

        const checkWidth = x <= x1 && x1 < x + w
        const checkHeight = y <= y1 && y1 < y + h

        return checkHeight && checkWidth
    },
    checkRectanglesColision: function (rectangle1: baseColisionRectangle, rectangle2: baseColisionRectangle) {
        console.log(rectangle1)
        return (
            rectangle1.x <= rectangle2.x + rectangle2.w &&
            rectangle1.x + rectangle1.w >= rectangle2.x &&
            rectangle1.y <= rectangle2.y + rectangle2.h &&
            rectangle1.h + rectangle1.y >= rectangle2.y
        )
    },
    distance: function (point1: basePoint, point2: basePoint) {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y))
    },
    addRectangleColision: function (object: baseColisionRectangle, onColision: Function) {
        const { w, h, x, y, name } = object

        objects.push({
            onColision: onColision,
            object: object,
            name: name,
            w: w,
            h: h,
            x: x,
            y: y
        })
    },
    check: function () {
        window.colisionObjects = objects.length


        objects.forEach(object1 => {
            if (window.showColisionBoxes) {
                shapes.rectangle('#', object1.x, object1.y, object1.x + object1.w, object1.y + object1.h - 1)
            }

            objects.forEach(object2 => {
                if (object1 !== object2) {
                    if (this.checkRectanglesColision(object1, object2)) {
                        object1.onColision(object2.object)
                        object2.onColision(object1.object)
                    }
                }
            })
        })

        objects = []
    }
}