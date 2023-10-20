import { Router } from "express";
import { encryptToken } from "../../helpers/JWT.js";
const router = Router()


const fakeContacts = [
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
    {
        username: "deez-nuts",
        status: true,
        lastMessage: {
            username: "You",
            message: "hey whats up hey whats up lol?"
        },
        newMessages: 0
    },
    {
        username: "Dad",
        status: false,
        lastMessage: {
            username: "Dad",
            message: "Are you at home?"
        },
        newMessages: 1
    },
]

router.get("/" ,(req, res) => {
    const token = req.cookies["access-token-web-chat"]
    console.log(encryptToken(token))

    res.json({contacts: fakeContacts})
})

export { router as contactRouter }