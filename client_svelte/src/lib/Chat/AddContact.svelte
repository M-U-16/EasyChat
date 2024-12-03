<svelte:body on:click={(e)=>{
    if (!form.contains(e.target) && !firstClick) {
        closePopup()
    }
    firstClick = false
}} />

<div
    class='contact-overlay'
    bind:this={ref}
    class:fade-out={popupClosed}
>
    <form
        class='contact-form'
        bind:this={form}
        on:submit={handleSubmit}
        class:slide-out={popupClosed}
    >
        <div class="top">
            <div class='contact-heading'>
                <h2>Kontakt hinzufügen</h2>
            </div>
            <button
                class='contact-close-bnt'
                type='button'
                on:click={closePopup}
            >
                <img src={close} alt="Schließen" />
            </button>
        </div>

        <div
            class="contact-input-container"
            class:searching={searching}
        >
            <input 
                placeholder='Benutzername'
                id='contact-name-input'
                name="username"
                type="text"
                bind:this={input}
                on:change={handleContact}
            />
            <div
                class="search-container"
            >

                {#each data as user}
                    <button class="user-container">
                        <img src={user.profile} alt="">
                        <p>{user.username}</p>
                    </button>
                {/each}
            </div>
        </div>
        <button
            class='contact-submit'
            type='submit'
        >Hinzufügen</button>
    </form>
</div>

<script>
    import close from "$lib/assets/icons/close-outline.svg"
    import Loader from "$lib/components/loader.svelte"

    let ref
    let form
    let input
    let searching
    export let toggle
    let firstClick = true
    let popupClosed = false

    function handleContact() {}
    function closePopup() {
        popupClosed = true
        setTimeout(() => {
            toggle.set(false)
        }, 250)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (input.value === "") {
            return
        }

        try {
            const res = await fetch("/api/user/chats/new-chat", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
                body: JSON.stringify({contactName: input.value})
            }).then(res => res.json())
            console.log(res)
            if (!res.error) {
                const event = new Event("update-contacts", {
                    bubbles: true
                })
                ref.dispatchEvent(event)
            }
        } catch(err) { console.log(err) }
    }

    const data = [
        {profile: "/api/user/profile/king", username: "king"},
        {profile: "/api/user/profile/king", username: "king"},
        {profile: "/api/user/profile/king", username: "king"}
    ]

</script>

<style>
.contact-overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    display: flex;
    justify-content: center;
    align-items: center;

    top: 0;
    left: 0;
    opacity: 1;
    z-index: 1000;
    position: absolute;
    will-change: opacity;
    animation: fadein 0.5s ease 1;
    background-color: rgba(0, 0, 0, 0.324);
}

.contact-form {
    display: flex;
    flex-direction: column;
    background-color: rgb(13, 13, 13);
    padding: 2rem;
    height: auto;
    max-width: 25rem;
    position: relative;
    animation: slidein 1 0.8s ease;
    border-radius: 5px;
    width: 100%;
}

.contact-form .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.contact-form h2 {
    font-size: 1.5rem;
}

.contact-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.contact-close-bnt {
    scale: 1.5;
    width: 2rem;
    border: none;
    height: 2rem;
    display: flex;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    transition: 0.3s ease;
    justify-content: center;
    background-color: transparent;
}

.contact-close-bnt img {
    width: 1.5rem;
    height: 1.5rem;
}

.contact-close-bnt:hover {
    background: rgba(70, 70, 70, 0.312);
}

.contact-close-bnt:active {
    scale: 0.9;
}

.contact-input-container {
    margin-top: 1rem;
    position: relative;
}

.contact-form input {
    padding: 0.9rem;
    border: none;
    width: 100%;
    outline: none;
    color: black;
    font-size: 1.3rem;
    border-radius: 5px;
    background: white;
    transition: padding 0.3s ease;
    padding-left: 1rem !important;
}

.contact-input-container.searching input {
    border-radius: 5px 5px 0 0;
}

.contact-submit {
    display: flex;
    border: none;
    padding: 0.9rem;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 1.2rem;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background: var(--highlight-blue);
}

.search-container {
    width: 100%;
    overflow: hidden;
    position: absolute;
    border-radius: 0 0 5px 5px;
    background-color: rgb(0, 0, 0);
}

.search-container button {
    border: 0;
    gap: 0.5rem;
    width: 100%;
    display: flex;
    padding: 0.5rem;
    cursor: pointer;
    align-items: center;
    background-color: transparent;
}

.search-container button:hover {
    box-shadow: inset 0px 0px 5px var(--highlight-blue);
}

.search-container button img {
    width: 3rem;
    border-radius: 50%;
}

.fade-out {
    animation: fadeout 0.3s;
}
.slide-out {
    animation: slideout 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes slidein {
    from {
        transform: translateY(100px);
    }
    to {
        transform: translateY(0px);
    }
}

@keyframes slideout {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100px);
    }
}

@media screen and (max-width: 400px) {
    .contact-form {
        padding: 2rem;
    }
    .contact-form h2 {
        margin-top: 1rem;
        font-size: 1.5rem;
    }
}
</style>