export type receivedDataFormat = string[][]
export type anovaType = "one-way" | "two-way"

export const serverLocation = "http://localhost:3000"

export function generateRandomColor(){
    let letters = "0123456789abcdef"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random()*16)
        color+=letters[randomIndex]
    }
    return color
}