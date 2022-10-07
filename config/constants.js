export const selectExperiment = [
    {
        content: 'Sword',
        onClick: () => { window.page = 'sword' }
    },
    {
        content: 'Gun',
        onClick: () => { window.page = 'gun' }
    },
    {
        split: true,
        content: '',
        onClick: () => { }
    },
    {
        content: 'Stickman',
        onClick: () => { window.page = 'stickman' }
    },
    {
        content: 'Stickman Attack',
        onClick: () => { window.page = 'stickmanAttack' }
    },
    {
        split: true,
        content: '',
        onClick: () => { }
    },
    {
        content: 'Wave sinus',
        onClick: () => { window.page = 'sinus' }
    },
    {
        content: 'Particles on click',
        onClick: () => { window.page = 'particles' }
    },
]