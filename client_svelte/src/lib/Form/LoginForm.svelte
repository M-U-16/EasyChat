<Form
    action={submit}
    title="Anmelden"
>
    <Input
        placeholder="Email"
        type="email"
        name="email"
        value={email}
        errorMessage={emailError}
        onChange={emailChange}
    />
        
    <Input
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        errorMessage={passwordError}
        onChange={passwordChange}
    />
    <SubmitButton />

    <div class="test-buttons">
        <button class="test-account" type="button" on:click={function() {
            email.set("TestAccount1@email")
            password.set("TestAccount1")
        }}>
            TestAccount1
        </button>
        <button class="test-account" type="button" on:click={function() {
            email.set("TestAccount2@email")
            password.set("TestAccount2")
        }}>
            TestAccount2
        </button>
    </div>
</Form>

<!-- <div class="debug">
    <p bind:this={loginOutput}></p>
</div> -->

<style>
    .debug {
        position: absolute;
        background-color: white;
        color: black;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4rem;
    }

    .test-buttons {
        gap: 0.5rem;
        display: flex;
        margin: 0.5rem 0 0 0;
    }

    .test-account {
        flex: 1;
        padding: 1rem;
        cursor: pointer;
        border-radius: 10px;
        color: var(--highlight-blue);
        background-color: transparent;
        border: 2px solid var(--highlight-blue);
    }
</style>

<script>
    import SubmitButton from "$lib/buttons/SubmitButton.svelte"
    import Form from "$lib/Form/Form.svelte"
    import Input from "$lib/Form/Input.svelte"
    import { get, writable } from "svelte/store";
    import {goto} from "$app/navigation"

    let emailError = "", passwordError = ""

    let loginOutput
    const email = writable("")
    const password = writable("")

    function passwordChange() { passwordError = "" }
    function emailChange() { emailError = "" }

    async function submit(e) {
        e.preventDefault()
        const res = await fetch(
            "/api/user/login",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
                credentials: "include",
                body: JSON.stringify({
                    password: get(password),
                    email: get(email)
                })
            }
        ).then(res => res.json())

        if (!res.error) {
            goto("/chat")
        }
        if (res.message == "EMAIL_DOES_NOT_EXIST") {
            emailError = "Email Existiert nicht!"
        }
        if (res.message == "PASSWORD_IS_INCORRECT") {
            passwordError = "Passwort ist inkorrekt!"
        }
    }
</script>