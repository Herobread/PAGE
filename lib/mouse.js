let x = 0
let y = 0
let clickX = 0
let clickY = 0
let isNewClick = false
let isMouseDown = false

export const mouse = {
    info: function () {
        const isNew = isNewClick

        if (isNewClick) {
            isNewClick = false
        }

        const click = isNew ? {
            x: Math.floor(clickX / (window.fsize * 0.66)),
            y: Math.floor(clickY / (window.fsize * 1.22)) + 1,
            new: isNew
        } : null

        return {
            x: Math.floor(x / (window.fsize * 0.66)),
            y: Math.floor(y / (window.fsize * 1.22)) + 1,
            down: isMouseDown,
            click: click
        }

    },
    tick: function (event) {
        x = event.clientX
        y = event.clientY
    },
    click: function (event) {
        isNewClick = true

        console.log(event)

        clickX = event.x
        clickY = event.y
    },
    onMouseUp: function () {
        console.log('up')
        isMouseDown = false
    },
    onMouseDown: function () {
        console.log('down')
        isMouseDown = true
    },
    init: function () {
        window.addEventListener('mousemove', this.tick);
        window.addEventListener('click', this.click);
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }
}