import { createCanvas } from "canvas";
import * as fs from "fs"

//width height image
const width = 64
const height = 64

const canvas = createCanvas(width, height)
const context = canvas.getContext("2d")

const colors = ["#764abc", "green", "blue"]

const getRandom255 = () => Math.floor(Math.random() * 255)
const getRandomColor = () => {
    return `rgb(${getRandom255()},${getRandom255()},${getRandom255()})`
}

for (let i = 0; i < 5; i++) {
    

    context.fillStyle = getRandomColor()
    context.fillRect(0, 0, width, height)

    //text
    context.font = "bold 20pt 'Verdana'"
    context.textAlign = "center"
    context.fillStyle = "#fff"

    context.fillText("z", 32, 40)

    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(`./images/${i}.png`, buffer)
}