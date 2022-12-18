interface key {
    pressed: boolean,
    alt: boolean,
    ctrl: boolean,
}

let pressedKeys: { [key: string]: key } = {}
let newKeys: { [key: string]: key } = {}

export const kb = {
    init: function () {
        window.addEventListener('keydown', (e) => {
            pressedKeys[e.key] = {
                pressed: true,
                alt: e.altKey,
                ctrl: e.ctrlKey,
            }

            newKeys[e.key] = {
                pressed: true,
                alt: e.altKey,
                ctrl: e.ctrlKey,
            }
        })
        window.addEventListener('keyup', (e) => {
            delete pressedKeys[e.key]
        })
    },
    info: function () {
        let temp = newKeys
        newKeys = {}
        return {
            down: pressedKeys, // keys that are down. Example: kkkkkkkk. Good for game
            new: temp // strangely timed key info. Example: k *delay* kkkkkkk. Good for UI
        }
    }
}