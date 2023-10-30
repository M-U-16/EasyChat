const socketServerConf = {
    cors: {
        origin: true,
        allowedHeaders: [
            "Access-Control-Allow-Credentials",
            "Send-Credentials"
        ],
        crendentials: true,
        methods: ["GET", "POST"],
        allowEIO3: true,
    },
    ackTimeout: 10000,
    retries: 3,
}

export { socketServerConf as socketConf }