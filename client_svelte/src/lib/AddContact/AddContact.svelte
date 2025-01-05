<div class='contact-overlay'>
    <form
        class='contact-form'
        on:submit={handleSubmit}
        class:slide-out={popupClosed}
        class:in-effect={!popupClosed}
    >
        <div class="top">
            <div class='contact-heading'>
                {#if isContact}
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
                    class:active={isContact}
                >Kontakt</button>
                <button
                    type="button"
                    on:click={handleContactType}
                    data-contact="group"
                >Gruppe</button>
                <div class="slider"></div>
            </div>
        </div>
        {#if $users.length != 0}
        <div class="new-users-container">
            {#each $users as user (user.username)}
                <User
                    username={user.username}
                    removeUser={removeUser}
                />
            {/each}
        </div>
        {/if}
        <div
            class="contact-input-container"
            class:searching={searching}
            style={!hasUsers? "margin-top:1rem;" : ""}
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
                    console.log(e.code == "Escape" && searchFocus)
                    if (e.code == "Escape" && searchFocus) {
                        disableSearchResults()
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

        {#if !isContact}
            <div class="group-input-container">
                <input
                    type="text"
                    placeholder="Gruppen Name"
                    bind:value={groupName}
                >
            </div>
        {/if}
                
        <button
            class='contact-submit'
            type='submit'
        >Erstellen</button>
    </form>
</div>

<script>
    import { writable } from "svelte/store"
    import Close from "$lib/icons/close.svelte"
    import User from "./User.svelte"
    export let toggle

    let ref
    let input
    let groupName
    let isContact
    let searching = false
    let popupClosed = false
    let hasUsers = false

    let searchFocus
    let searchTimeout
    let searchResults = writable([])
    let users = writable([])

    $: hasUsers = $users.length > 0

    function handleContactType(e) {
        isContact = e.target.dataset.contact == "contact"
    }

    function handleSearchInput() {
        if (searchTimeout) {
            return
        }
        
        searchTimeout = setTimeout(() => {
            searching = true
            console.log("handleSearchInput:", input.value, `(${input.value.length})`)
            if (input.value.length == 0) {
                resetSearch()
                return
            }

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
        input.value = ""
        disableSearchResults()
    }
    
    function disableSearchResults() {
        searching = false
        searchResults.set([])
        searchTimeout = null
    }   

    function removeFocus() {
        document.activeElement.blur()
    }

    function addUser(user) {
        $users.push(user)
        $users = $users
    }

    function removeUser(username) {
        users.set(
            $users.filter((user)=>{
                return user.username != username
            })
        )
    }

    function closePopup() {
        popupClosed = true
        toggle.set(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await fetch("/api/user/chats/new-chat", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
                body: JSON.stringify({
                    users: $users,
                    isContact: isContact,
                    group_name: !isContact ? groupName : ""
                })
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
    top: 0;
    left: 0;
    opacity: 1;
    will-change: opacity;
    animation: fadein 0.8s ease 1;
}

.contact-form {
    width: 100%;
    height: auto;
    display: flex;
    padding: 2rem;
    max-width: 40rem;
    position: relative;
    border-radius: 5px;
    flex-direction: column;
    animation: slidein 1 0.5s ease;
    margin: 0 auto;
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

.new-users-container {
    display: flex;
    padding: 0.5rem 0;
    gap: 0.5rem;
}

.group-input-container {
    margin-top: 1rem;
}

</style>