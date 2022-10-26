import { mainMenu } from "./pages/main.js"
import { test } from "./pages/test.js"

export const pages = [
    {
        name: 'main',
        func: () => {
            mainMenu()
        },
        fps: 60
    },
    {
        name: 'test',
        func: () => { test() },
        fps: 60
    }
]