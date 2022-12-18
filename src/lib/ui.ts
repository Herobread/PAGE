import { shapes } from "./shapes"
import { renderer } from "./renderer"
import { checkIfPointInRectangle, repeatSymbol } from "./util"

interface opened {
    [key: string]: boolean
}
let opened: opened = {}

interface button {
    content: string,
    x: number,
    y: number,
    pointer: any,
    onClick: Function,
    style: null | 'default' | 'underlined',
    disabled: boolean
}

interface dropDownOption {
    content: string,
    onClick: Function,
    split: boolean
}

export const ui = {
    checkHover: function (content: string, x: number, y: number, pointer: any) {
        return checkIfPointInRectangle(pointer.x, pointer.y, x, y, x + content.length + 1, y + 2)
    },
    // ui.button({ content, x, y, pointer, onClick })
    button: function (buttonOptions: button) {
        let { content, x, y, pointer, onClick, style, disabled } = buttonOptions

        x = Math.floor(x)
        y = Math.floor(y)

        // furthest points of the button
        const xEnd = x + content.length + 1
        const yEnd = y + 2

        const isHovered = this.checkHover(content, x, y, pointer)

        const isClicked = pointer.click && checkIfPointInRectangle(pointer.click.x, pointer.click.y, x, y, xEnd, yEnd)
        if (isClicked && !disabled) {
            onClick()
        }

        // rendering button
        if (style === 'underlined')
            shapes.line('-', x, yEnd, xEnd, yEnd)

        if (isHovered && !disabled) {
            renderer.drawObject(content.toUpperCase(), x + 1, y + 1)
            shapes.line('=', x, yEnd, xEnd, yEnd)
        } else {
            renderer.drawObject(content, x + 1, y + 1)
        }
    },
    buttonRow: function (buttons: button[], x: number, y: number, pointer: any) {
        let x_ = x
        let y_ = y

        buttons.forEach(button => {
            if (button.content === 'split_') {
                renderer.drawObject(':\n:\n:', x_, y_)
                x_ += 2
            }
            else {
                this.button({
                    ...button
                })
                x_ += button.content.length + 3
            }
        })
    },
    buttonColumn: function (buttons: button[], x: number, y: number, pointer: any) {
        let x_ = x
        let y_ = y

        buttons.forEach(button => {
            this.button({
                ...button
            })
            y_ += 3
        })
    },
    dropDown: function (name: string, options: dropDownOption[], x: number, y: number, pointer: any, onOpen: Function = () => { }, onClose: Function = () => { }) {
        let totalX = name.length + 3
        let totalY = 1

        onOpen ??= () => { }
        onClose ??= () => { }

        if (opened[name]) {
            shapes.line(':', x, y, x, y + options.length * 2)
            renderer.drawObject('+ ' + name, x, y)
        } else {
            renderer.drawObject('- ' + name, x, y)
        }

        let maxWidth = 0

        options.forEach((option) => {
            if (maxWidth < option.content.length) {
                maxWidth = option.content.length
            }
        })

        if (opened[name]) {
            options.forEach((option, i) => {
                let x_ = x + 2
                let y_ = y + 2 + i * 2

                if (option.split) {
                    renderer.drawObject('=' + repeatSymbol('-', maxWidth + 1), x, y + 2 + i * 2)
                } else {
                    renderer.drawObject(option.content, x + 2, y + 2 + i * 2)
                    if (checkIfPointInRectangle(pointer.x, pointer.y, x_, y_, x_ + option.content.length, y_ + 1)) {
                        renderer.drawObject('+>', x_ - 2, y_)
                        if (pointer.click) {
                            opened[name] = false
                            option.onClick()
                            onClose()
                        }
                    }
                }

            })
        }

        if (pointer.click) {
            if (checkIfPointInRectangle(pointer.x, pointer.y, x, y, x + name.length + 2, y)) {
                onOpen()
                // console.log('first')
                opened[name] = !opened[name]
            } else if (opened[name]) {
                onClose()
                opened[name] = false
            }
        }

        return {
            width: totalX,
            height: totalY
        }
    }
}