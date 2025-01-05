<button 
    class="group-panel"
    class:active={active}
    title={`Gruppe öffnen`}
    on:click={()=>currentRoom.set(room_id)}
>
    <div class="profile">
        <div class="container">
            {#if newMessages > 0}
                <p class="new-messages">
                    {newMessages}
                </p>
            {/if}
            <img class="no-select" src="/api/group/profile/{room_id}" alt="Profile Bild" />
        </div>
    </div>
    <div class="text-wrapper">
        <h1>{name}</h1>
        {#if lastMessage.message}
        <div class="lastmessage">
            <h2>
                {lastMessage.you ? "Du:" : lastMessage.username+":"}
            </h2>
            <p>{lastMessage.message}</p>
        </div>
        {:else}
        <div class="no-lastmessage">
            <p>Keine Nachrichten</p>
        </div>
        {/if}
    </div>         
</button>

<script>
    import { getContext } from "svelte";
    
    let newMessages = 0
    export let name
    export let lastMessage
    export let room_id

    let active
    export let username
    const contactMessenger = getContext("contact-messenger")
    const currentRoom = getContext("currentRoom")

    $: active = $currentRoom == room_id

    contactMessenger.subscribe((data) => {
        if (!data) return
        if (room_id == data.room_id) {
            console.log(data)
            lastMessage.username = data.username
            lastMessage.message = data.message
        }
    })
</script>
<style>
.group-panel {
    --online-status-border-clr: var(--secondary-blue);
    
    height: 4.5rem;
    width: 100%;
    cursor: pointer;
    transition: 0.5s ease;
    display: grid;
    grid-template-columns: auto 1fr;
    position: relative;
    isolation: isolate;
    border: none;
    border-left: 1px solid transparent;
    background-color: transparent;
    align-items: center;
}

.group-panel.active,
.group-panel:hover {
    background-color: rgb(0, 0, 0);
}

.text-wrapper h1 {
    color: white;
    text-align: start;
    margin-bottom: 0.2rem;
    font-size: 1.2rem;
}

.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 70px;
}
.profile .container {
    width: var(--profile-img-width);
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.profile .container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.new-messages {
    position: absolute;
    background-color: rgb(0, 128, 255);
    border: 3px solid var(--secondary-blue);
    z-index: 2;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 0.9rem;
    bottom: -5px;
    right: -3px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lastmessage {
    gap: 0.3rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    overflow-x: hidden;
}
.lastmessage h2,
.lastmessage p {
    font-size: 0.9rem;
    color: grey;
}

.lastmessage p {
    width: 80%;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.no-lastmessage p {
    width: 100%;
    text-align: start;
    color: grey;
}

.group-panel::after {
    content: "";
    position: absolute;
    width: 3px;
    height: 60%;
    height: 100%;
    top: 50%;
    right: calc(100% - 2px);
    background: var(--highlight-blue);
    transform: translateY(-50%);
    opacity: 0;
    transition: 0.3s ease;
}

.group-panel.active::after,
.group-panel:hover::after {
    opacity: 1;
}

.group-panel:hover .lastmessage h2 {
    color: var(--highlight-blue);
}

@media screen and (max-width: 800px) {
    .group-panel {
        grid-template-columns: 1fr;
        height: 4rem;
    }

    .profile {
        width: 100%;
    }

    .profile .container img {
        padding: 0rem;
    }

    .text-wrapper {
        display: none;
    }
}
</style>