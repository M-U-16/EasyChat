export default {
    host: "localhost:3000",
    user: {
        route: "user",
        register: {
            method: "POST",
            url: "localhost:3000/user/register"
        },
        login: {
            method: "POST",
            url: "localhost:3000/user/login"
        },
        contacts: {
            method: "GET",
            url: "localhost:3000/user/chats"
        },
        logout: {
            method: "POST",
            url: "localhost:3000/user/logout"
        },
        newChat: {
            method: "POST",
            url: "localhost:3000/user/chats/new-chat"
        }
    }
}