<Form
    title="Registrieren"
    action={submit}
>
    <Input
        placeholder='Email'
        name="email"
        type="email"
        value={email}
        errorMessage={emailError}
    />
    <Input
        placeholder='Benutzername'
        name="username"
        type="text"
        value={username}
        errorMessage={usernameError}
    />
    <Input
        placeholder='Passwort'
        name="password"
        type="password"
        value={password}
        errorMessage={passwordError}
    />
    <SubmitButton />
</Form>

<script>
    import { get, writable } from "svelte/store";
    import SubmitButton from "$lib/buttons/SubmitButton.svelte"
    import Form from "$lib/Form/Form.svelte";
    import Input from "$lib/Form/Input.svelte"

    let success = false

    let email = writable("")
    let username = writable("")
    let password = writable("")

    let emailError = "" /* "Email existiert bereits!" */
    let usernameError = "" /* "Benutzername vergeben!" */
    let passwordError = "" /* "Falsches Passwort!" */
    
    let firstRender = true
    const unsubEmail = email.subscribe((v) => {
        if (firstRender) return
        emailError = ""
    })
    const unsubPassword = password.subscribe((v) => {
        if (firstRender) return
        passwordError = ""
    })
    const unsubUsername = username.subscribe((v) => {
        if (firstRender) return
        usernameError = ""
    })
    firstRender = false

    async function submit(e) {
        e.preventDefault()
        const res = await fetch(
            "/api/user/register",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
                body: JSON.stringify({
                    password: get(password),
                    username: get(username),
                    email: get(email)
                })
            }
        ).then(res => res.json())
        
        console.log(res)
        if (!res.error) {
            success = true
        } else {

        }
    }
</script>