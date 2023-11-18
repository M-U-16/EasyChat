export default {
    host: "localhost:3000",
    user: {
        register: {
            method: "POST",
            url: "backend/api/user/register"
        },
        login: {
            method: "POST",
            url: "backend/api/user/login"
        },
        contacts: {
            method: "GET",
            url: "backend/api/user/chats"
        },
        logout: {
            method: "POST",
            url: "backend/api/user/logout"
        },
        newChat: {
            method: "POST",
            url: "backend/api/user/chats/new-chat"
        },
        isLoggedIn: {
            method: "GET",
            url: "backend/api/user/isLoggedIn"
        }
    },
}