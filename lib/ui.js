import { shapes } from "./shapes.js"
import { renderer } from "./renderer.js"
import { checkIfPointInRectangle } from "./util.js"

export const ui = {
    checkHover: function (content, x, y, pointer) {
        return checkIfPointInRectangle(pointer.x, pointer.y, x, y, x + content.length + 1, y + 2)
    },
    button: function ({ content, x, y, pointer, onClick, style }) {
        // furthest points of the button
        const xEnd = x + content.length + 1
        const yEnd = y + 2

        const isHovered = this.checkHover(content, x, y, pointer)

        const isClicked = pointer.click && checkIfPointInRectangle(pointer.click.x, pointer.click.y, x, y, xEnd, yEnd)
        if (isClicked) {
            onClick()
        }

        // rendering button
        if (style === 'underlined')
            shapes.line('-', x, yEnd, xEnd, yEnd)

        if (isHovered) {
            renderer.drawObject(content.toUpperCase(), x + 1, y + 1)
            shapes.line('=', x, yEnd, xEnd, yEnd)
        } else {
            renderer.drawObject(content, x + 1, y + 1)
        }
    },
    buttonRow: function (buttons, x, y, pointer) {
        let x_ = x
        let y_ = y

        buttons.forEach(button => {
            // console.log(button.content, x_, y_, 1)
            this.button({
                x: x_,
                y: y_,
                pointer: pointer,
                ...button
            })
            x_ += button.content.length + 3
        })
    },
    buttonColumn: function (buttons, x, y, pointer) {
        let x_ = x
        let y_ = y

        buttons.forEach(button => {
            // console.log(button.content, x_, y_, 1)
            this.button({
                x: x_,
                y: y_,
                pointer: pointer,
                ...button
            })
            y_ += 3
        })
    }
}