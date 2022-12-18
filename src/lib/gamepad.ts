const debug = 0

interface GamepadButtons {
    axes: {
        x1: number,
        y1: number,
        x2: number,
        y2: number,
    },
    buttons: {
        cross: boolean,
        circle: boolean,
        square: boolean,
        triangle: boolean,
        L1: boolean,
        R1: boolean,
        L2: number,
        R2: number,
        share: boolean,
        options: boolean,
        L3: boolean,
        R3: boolean,
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean,
        ps: boolean,
        touchpad: boolean,
    }
}

export const gamepad = {
    info: function (id: number = 0): (GamepadButtons | null) {
        const gamepads: any = navigator.getGamepads()

        if (!gamepads) {
            return null
        } else if (gamepads[id]) {
            let buttons = {
                axes: {
                    x1: gamepads[id].axes[0],
                    y1: gamepads[id].axes[1],
                    x2: gamepads[id].axes[2],
                    y2: gamepads[id].axes[3],
                },
                buttons: {
                    cross: gamepads[id].buttons[0].pressed,
                    circle: gamepads[id].buttons[1].pressed,
                    square: gamepads[id].buttons[2].pressed,
                    triangle: gamepads[id].buttons[3].pressed,
                    L1: gamepads[id].buttons[4].pressed,
                    R1: gamepads[id].buttons[5].pressed,
                    L2: gamepads[id].buttons[6].pressed,
                    R2: gamepads[id].buttons[7].pressed,
                    share: gamepads[id].buttons[8].pressed,
                    options: gamepads[id].buttons[9].pressed,
                    L3: gamepads[id].buttons[10].pressed,
                    R3: gamepads[id].buttons[11].pressed,
                    up: gamepads[id].buttons[12].pressed,
                    down: gamepads[id].buttons[13].pressed,
                    left: gamepads[id].buttons[14].pressed,
                    right: gamepads[id].buttons[15].pressed,
                    ps: gamepads[id].buttons[16].pressed,
                    touchpad: gamepads[id].buttons[17].pressed,
                }
            }
            return buttons
        }

        return null
    }
}