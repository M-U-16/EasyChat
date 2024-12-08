import fs from "fs"
import "dotenv/config"
import path from "path";
import * as PImage from "pureimage"

interface UserPic {
    username: string;
    userDir: string;
}

const font = PImage.registerFont(
    "../../assets/Roboto/Roboto-Medium.ttf",
    "Roboto"
)
font.loadSync()

const getRandom255 = () => Math.floor(Math.random() * 255)
const getRandomColor = () => `rgb(${getRandom255()},${getRandom255()},${getRandom255()})`

function create64x64Profile(firstLetter, path) {
    const canvas = PImage.make(64, 64)
    const context = canvas.getContext("2d")
    context.font = "20pt Roboto"
    context.textAlign = "center"
    context.fillStyle = getRandomColor()
    context.fillRect(0, 0, 64, 64)
    context.fillStyle = "#fff"
    context.fillText(firstLetter, 32, 43)
    return PImage.encodePNGToStream(canvas, fs.createWriteStream(path))
}

process.on("message", async(message: UserPic) => {
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
    })
})