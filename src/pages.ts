import { game, initGame } from "pages/game"
import { initMainMenu, mainMenu } from "pages/mainMenu"
import { animationViewer, initAnimationViewer } from "utilityPages/viewAnimations"
import { assetsViewer, initAssetsViewer } from "utilityPages/viewAssets"

// fps of the game
// also you can set fps individualy for every page
const fps = 10

interface Page {
    name: string,
    fps: number,
    func: Function,
    init: Function,
}

export const pages: Page[] = [
    {
        name: 'mainMenu',
        func: mainMenu,
        fps: fps,
        init: initMainMenu
    },
    {
        name: 'game',
        func: game,
        fps: fps,
        init: initGame
    },

    /// utility pages
    {
        name: 'utility-asset-viewer',
        func: assetsViewer,
        fps: fps,
        init: () => { initAssetsViewer() }
    },
    {
        name: 'utility-animation-viewer',
        func: () => { animationViewer() },
        fps: fps,
        init: () => { initAnimationViewer() }
    }
]