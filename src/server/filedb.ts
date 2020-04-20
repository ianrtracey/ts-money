import fs from 'fs'


const db = ({
    saveData: (data: object) => {
        const json = JSON.stringify(data)
        return fs.writeFileSync('./development.data.json', json, {flag: 'w+', encoding: 'utf8'})
    },
    readData: (key: string) => {
        const json = fs.readFileSync('./development.data.json')
        return JSON.parse(json)
    }
})

export default db