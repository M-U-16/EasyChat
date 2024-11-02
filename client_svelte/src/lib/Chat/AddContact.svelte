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
        <button
            class='contact-close-bnt'
            type='button'
            on:click={closePopup}
        >
            <img src={close} alt="Schließen" />
        </button>
        <div class='contact-heading'>
            <h2>Kontakt hinzufügen</h2>
        </div>
        <div class="contact-input-container">
            <input 
                placeholder='Benutzername'
                id='contact-name-input'
                name="username"
                type="text"
                bind:this={input}
                on:change={handleContact}
            />
        </div>
        <button
            class='contact-submit'
            type='submit'
        >Hinzufügen
            <!-- <Loader /> -->
        </button>
    </form>
</div>

<script>
    import close from "$lib/assets/icons/close-outline.svg"
    import Loader from "$lib/components/loader.svelte"

    let ref
    let form
    let input
    let firstClick = true
    let popupClosed = false
    export let toggle

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
    padding: 3rem;
    height: auto;
    max-width: 25rem;
    position: relative;
    animation: slidein 1 0.8s ease;
    border-radius: 5px;
    width: 100%;
    min-height: 30rem;
}
.contact-form h2 {
    font-size: 2rem;
}

.contact-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.contact-close-bnt {
    position: absolute;
    width: 2rem;
    height: 2rem;
    scale: 1.5;
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
    transition: 0.3s ease;
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
    position: relative;
    margin-top: 1rem;
}

.contact-form input {
    padding: 1rem;
    font-size: 1.3rem;
    outline: none;
    border: none;
    border-radius: 10px;
    width: 100%;
    background: white;
    box-shadow: inset 0px 0px 3px black;
    color: black;
    transition: padding 0.3s ease;
    padding-left: 1rem !important;
}

.contact-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 0.9rem;
    border-radius: 10px;
    cursor: pointer;
    background: var(--highlight-blue);
    border: none;
    font-size: 1.2rem;
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