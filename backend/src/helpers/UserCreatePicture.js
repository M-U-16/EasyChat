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

async function createProfile(firstLetter, path) {
    const canvas = PImage.make(128, 128)
    const context = canvas.getContext("2d")
    context.font = "50pt Verdana"
    context.textAlign = "center"
    context.fillStyle = getRandomColor()
    context.fillRect(0, 0, 128, 128)
    context.fillStyle = "#fff"
    context.fillText(firstLetter.toUpperCase(), 64, 80)
    await PImage.encodePNGToStream(canvas, fs.createWriteStream(path))
}

async function createGroup(path) {
    const img = PImage.make(128, 128)
    const ctx = img.getContext("2d")
    ctx.fillStyle = getRandomColor()
    ctx.fillRect(0, 0, 128, 128)
    
    const group = await PImage.decodePNGFromStream(
        fs.createReadStream("assets/images/group_64x64.png")
    )
    ctx.drawImage(group, 32, 32, 64, 64)
    await PImage.encodePNGToStream(img, fs.createWriteStream(path))
}

process.on("message", async(message) => {
    if (message.type == "group") {
        createGroup(message.path).then(() => {
            process.send("done")
            process.exit(0)
        }).catch(() => {
            process.send("error")
            process.exit(1)
        })
    } else {
        if (message.username && message.username.length === 0) {
            process.send(new Error("NO_USERNAME"))
            process.exit(1)
        } else if (message.path && message.path.length == 0) {
            process.send(new Error("NO_PATH"))
        }

        createProfile(
            message.username[0],
            path.join(message.path, "profile.png")
        ).then(()=>{
            process.send("done")
            process.exit(0)
        }).catch(()=>{
            process.send("error")
            process.exit(1)
        })
    }
})