import fs from "fs"
import "dotenv/config"
import { createCanvas } from "canvas";
import path from "path";

const getRandom255 = () => Math.floor(Math.random() * 255)
const getRandomColor = () => `rgb(${getRandom255()},${getRandom255()},${getRandom255()})`

function create64x64Profile(firstLetter, path) {
    const canvas = createCanvas(64, 64)
    const context = canvas.getContext("2d")
    context.font = "bold 20pt 'Verdana'"
    context.textAlign = "center"
    context.fillStyle = getRandomColor()
    context.fillRect(0, 0, 64, 64)
    context.fillStyle = "#fff"
    context.fillText(firstLetter, 32, 43)
    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(path, buffer)
}

process.on("message", message => {
    create64x64Profile(
        message.username[0],
        path.join(message.userDir, "profile.png")
    )
    process.send("done")
    process.exit(0)
})