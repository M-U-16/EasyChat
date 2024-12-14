<!-- <svelte:body on:click={(e)=>{
    if (!form.contains(e.target) && !firstClick) {
        closePopup()
    }
    firstClick = false
}} />
 -->

<div class='contact-overlay'>
    <form
        class='contact-form'
        bind:this={form}
        on:submit={handleSubmit}
        class:slide-out={popupClosed}
        class:in-effect={!popupClosed}
    >
        <div class="top">
            <div class='contact-heading'>
                {#if contactType == "contact"}
                    <h2>Neuer Kontakt</h2>
                {:else}
                    <h2>Neue Gruppe</h2>
                {/if}
            </div>
            <button
                class='contact-close-btn'
                type='button'
                on:click={closePopup}
            >
                <Close />
            </button>
        </div>

        <div class="type-switcher-container">
            <div class="type-switcher">
                <button
                    type="button"
                    on:click={handleContactType}
                    data-contact="contact"
                    class:active={contactType=="contact"}
                >Kontakt</button>
                <button
                    type="button"
                    on:click={handleContactType}
                    data-contact="group"
                >Gruppe</button>
                <div class="slider"></div>
            </div>
        </div>

        {#if contactType == "contact" && $users.length > 0}
            <div class="new-users-container">
                {#each $users as user}
                    <div class="user">
                        <img
                        src={"/api/user/profile/"+user.username}
                        alt="Profilbild von '{user.username}'"
                    >
                        <p>{user.username}</p>
                        <button type="button" class="delete-user">
                            <Close />
                        </button>
                    </div>
                {/each}
            </div>
        {:else}
            <div
                class="contact-input-container"
                class:searching={searching}
            >
                <input 
                    placeholder='Suchen...'
                    id='contact-name-input'
                    name="username"
                    type="text"
                    bind:this={input}
                    on:input={handleSearchInput}
                    on:focusin={(e) => {searchFocus = true}}
                    on:focusout={(e)=>{searchFocus = false}}
                    on:keydown={(e) => {
                        if (e.code == "Escape" && searchFocus) {
                            resetSearch()
                        }
                    }}
                />
                <div class="search-container">
                    {#if Array.isArray($searchResults)}
                        {#if $searchResults.length == 0}
                        <p class="no-result">Keine Ergebnisse</p>
                        {:else}
                        {#each $searchResults as user}
                            <button
                                class="user-container"
                                type="button"
                                data-user={JSON.stringify(user)}
                                on:click={() => {
                                    addUser(user)
                                    resetSearch()
                                }}
                            >
                                <img
                                    src={"/api/user/profile/"+user.username}
                                    alt="Profilbild von '{user.username}'"
                                >
                                <p>{user.username}</p>
                            </button>
                        {/each}
                        {/if}
                    {/if}
                </div>
            </div>
        {/if}
        
        <button
            class='contact-submit'
            type='submit'
        >Erstellen</button>
    </form>
</div>

<script>
    import close from "$lib/assets/icons/close-outline.svg"
    import Close from "$lib/icons/close.svelte"
    import Loader from "$lib/components/loader.svelte"
    import { writable } from "svelte/store";

    let ref
    let form
    let input
    export let toggle
    let searching = false
    let firstClick = true
    let popupClosed = false
    let contactType = "contact"

    let searchFocus
    let searchTimeout
    let searchResults = writable([])
    let users = writable([])

    function handleContactType(e) {
        contactType = e.target.dataset.contact
    }

    function handleSearchInput() {
        if (searchTimeout) {
            return
        }

        searchTimeout = setTimeout(() => {
            searching = true
            console.log(input.value)
            fetch("/api/user/search?username="+input.value, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                searchResults.set(data.users)
            })
            searchTimeout = null
        }, 500)
    }

    function resetSearch() {
        searching = false
        searchResults.set([])
        document.activeElement.blur()
        input.value = ""
    }

    function addUser(user) {
        $users.push(user)
        console.log($users)
    }

    function closePopup() {
        popupClosed = true
        toggle.set(false)
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
    /* justify-content: center;
    align-items: center; */

    top: 0;
    left: 0;
    opacity: 1;
    /* z-index: 1000;
    position: absolute; */
    will-change: opacity;
    animation: fadein 0.8s ease 1;
    /* background-color: rgba(0, 0, 0, 0.324); */
}

.contact-form {
    display: flex;
    flex-direction: column;
    /* background-color: rgb(13, 13, 13); */
    padding: 2rem;
    height: auto;
    /* max-width: 25rem; */
    position: relative;
    animation: slidein 1 0.5s ease;
    border-radius: 5px;
    width: 100%;
}

.type-switcher-container {
    padding: 0.3rem;
    border-radius: 5px;
    background-color: black;
}

.type-switcher {
    width: 100%;
    height: 3rem;
    display: grid;
    gap: 0.3rem;
    grid-template-columns: 1fr 1fr;
    border: none;
    justify-content: space-evenly;
    position: relative;
}

.type-switcher .slider {
    height: 100%;
    width: 50%;
    content: "";
    padding: inherit;
    border-radius: 5px;
    position: absolute;
    pointer-events: none;
    left: 50%;
    transition: 0.2s ease;
    background-color: rgb(19, 19, 19);
}

.type-switcher button.active ~ .slider {
    left: 0;
}

.contact-form .type-switcher button {
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
    z-index: 1;
}

.contact-form .top {
    width: 100%;
    display: flex;
    margin-bottom: 1.5rem;
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

.contact-close-btn {
    scale: 1.5;
    width: 2rem;
    border: none;
    height: 2rem;
    display: flex;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 50%;
    align-items: center;
    transition: 0.3s ease;
    justify-content: center;
    color: var(--highlight-blue);
    background-color: transparent;
}

.contact-close-btn:hover {
    background: rgba(70, 70, 70, 0.312);
}

.contact-close-btn:active {
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
    width: min-content;
}

.search-container {
    width: 100%;
    max-height: 12rem;
    overflow-y: auto;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    border-radius: 0 0 5px 5px;
    background-color: rgb(10, 10, 10);
}

.search-container p.no-result {
    padding: 0.5rem;
}

.contact-input-container.searching .search-container {
    opacity: 1;
    pointer-events: all;
}

.search-container::-webkit-scrollbar {
    width: 5px;
    background-color: grey;
}

.search-container::-webkit-scrollbar-thumb {
    background-color: var(--highlight-blue);
}

.search-container button {
    border: 0;
    gap: 0.5rem;
    width: 100%;
    display: flex;
    padding: 0.5rem;
    height: 4rem;
    cursor: pointer;
    align-items: center;
    background-color: transparent;
}

.search-container button::after {
    content: "+";
    position: absolute;
    right: 1rem;
    font-size: 1.2rem;
    transform: translateX(-50%);
    transition: 0.3s ease;
    opacity: 0;
}

.search-container button:hover::after {
    opacity: 1;
}

.search-container button img {
    width: 3rem;
    border-radius: 50%;
}

@keyframes in {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0px);
        opacity: 1;
    }
}

@keyframes out {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(50px);
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