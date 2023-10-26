export default {
    host: "localhost:3000",
    user: {
        route: "user",
        register: {
            method: "post",
            url: "localhost:3000/user/register"
        },
        login: {
            method: "post",
            url: "localhost:3000/user/login"
        },
        contacts: {
            method: "get",
            url: "localhost:3000/user/chats"
        },
        logout: {
            method: "post",
            url: "localhost:3000/user/logout"
        }
    }
}