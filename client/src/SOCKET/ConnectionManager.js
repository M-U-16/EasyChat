import React from "react";
import { socket } from "./socket";

export const ConnectionManager = () => {
    const connect = () => socket.connect()
    const disconnect = () => socket.disconnect()

    return {
        connect,
        disconnect
    }
}