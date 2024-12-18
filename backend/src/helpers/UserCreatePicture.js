import fs from "fs"
import "dotenv/config"
import path from "path";
import * as PImage from "pureimage"

const font = PImage.registerFont(
    "assets/Verdana/Verdana-Bold.ttf",
    "Verdana"
)
font.loadSync()

const getRandom255 = () => Math.floor(Math.random() * 255)
const getRandomColor = () => `rgb(${getRandom255()},${getRandom255()},${getRandom255()})`

const canvas = PImage.make(128, 128)
const context = canvas.getContext("2d")

async function create64x64Profile(firstLetter, path) {
    context.font = "50pt Verdana"
    context.textAlign = "center"
    context.fillStyle = getRandomColor()
    context.fillRect(0, 0, 128, 128)
    context.fillStyle = "#fff"
    context.fillText(firstLetter.toUpperCase(), 64, 80)
    await PImage.encodePNGToStream(canvas, fs.createWriteStream(path))
}

process.on("message", async(message) => {
    if (message.username.length === 0) {
        process.send(new Error("username length zero"))
        process.exit(1)
    } else if (message.userDir.length == 0) {
        process.send(new Error("userDir length zero"))
    }

    create64x64Profile(
        message.username[0],
        path.join(message.userDir, "profile.png")
    ).then(()=>{
        process.send("done")
        process.exit(0)
    }).catch(()=>{
        process.send("error")
        process.exit(1)
    })
})