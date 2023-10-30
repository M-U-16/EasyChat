const SERVER_CONFIG = {
    hostname: "localhost",
    port: "3000",
    logStart: true,
}
//cors options
export const corsOptions = {
    credentials: true,
    exposedHeaders: [
        "Access-Control-Allow-Origin",
        "Set-Cookie",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        
    ],
    origin: "http://127.0.0.1:5173"
}
export const whitelist = ["http://127.0.0.1:5173"]

//function for logging server start
export const startingServer = (hostname, port) => {
    console.log(`Server running at http://${hostname}:${port}`)
}

export default SERVER_CONFIG