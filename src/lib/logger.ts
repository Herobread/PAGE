interface Log {
    [key: string]: number[]
}

let logs: Log = {}

export const logger = {
    add: function (name: string) {
        logs[name] = []
    },
    checkForExistance: function (name: string) {
        if (!logs[name])
            this.add(name)
    },
    log: function (name: string, log: number) {
        this.checkForExistance(name)

        logs[name].push(log)
    },
    getLog: function (name: string, isConsoleLog: boolean = false) {
        this.checkForExistance(name)

        let total = 0
        let amount = logs[name].length

        logs[name].forEach(log => {
            total += log
        })

        if (isConsoleLog)
            console.log(`${name}: ${total / amount}(${amount})`)

        logs[name] = []

        return total / amount
    }
}