export default {
    host: "localhost:3000",
    user: {
        register: {
            method: "POST",
            url: "/api/user/register"
        },
        login: {
            method: "POST",
            url: "/api/user/login"
        },
        contacts: {
            method: "GET",
            url: "/api/user/chats"
        },
        logout: {
            method: "POST",
            url: "/api/user/logout"
        },
        newChat: {
            method: "POST",
            url: "/api/user/chats/new-chat"
        },
        isLoggedIn: {
            method: "GET",
            url: "/api/user/isLoggedIn"
        }
    },
}