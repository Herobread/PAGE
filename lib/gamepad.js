import { clamp } from "./util.js"

const debug = 0

export const gamepad = {
    info: function (id = 0) {
        const gamepads = navigator.getGamepads()
        // todo: add every button
        let min = 0.3
        let max = 1
        if (gamepads[id]) {
            let buttons = {
                axes: {
                    x1: this.deadzone(gamepads[id].axes[0], min, max),
                    y1: this.deadzone(gamepads[id].axes[1], min, max),
                    x2: this.deadzone(gamepads[id].axes[2], min, max),
                    y2: this.deadzone(gamepads[id].axes[3], min, max),
                },
                buttons: {
                    cross: gamepads[0].buttons[0].pressed
                }
            }
            return buttons
        }
        return null
    },
    deadzone: function (num, min, max) {
        if (num < min && num > -min)
            return 0
        if (num > max && num < -max)
            return num < 0 ? -1 : 1
        return num
    }
}