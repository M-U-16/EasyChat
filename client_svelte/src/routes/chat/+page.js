import {redirect} from "@sveltejs/kit"

export async function load({fetch}) {
    let username, loggedin

    loggedin = await fetch("/api/user/isLoggedIn", {
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json())

    if (!loggedin.isAuthorized) {
        throw redirect(302, "/login")
    }

    if (loggedin.isAuthorized) {
        username = await fetch("/api/user/username")
            .then(res => res.json())
            .then(data => {
                return data.username
            })
    }

    await fetch("/api/test", {
        method:"POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "mode": "cors"
        },
        body: JSON.stringify({...loggedin, username: username})
    })

    return {
        isAuthorized: loggedin.isAuthorized,
        username: username
    }
}
export const ssr = false