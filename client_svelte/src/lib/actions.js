export async function logout() {
    return fetch(
        "api/user/logout",
        { 
            method: "POST",
            credentials: "include",
            mode: "no-cors"
        }
    ).then(res => res.json())
}