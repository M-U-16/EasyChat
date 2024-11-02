<button 
    class='contact-panel no-select'
    class:active={active}
    title={`Chat mit ${username} öffnen`}
    on:click={()=>currentRoom.set(room_id)}
    
>
    <div class="profile">
        <div class="container">
            {#if newMessages > 0}
                <p class="new-messages">
                    {newMessages}
                </p>
            {/if}
            <div
                class="status"
                class:active={status}
            ></div>
            <img class="no-select" src="/api/user/profile/{username}" alt="Profile Bild" />
        </div>
    </div>
    <div class="text-wrapper">
        <h1>{username}</h1>
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
    let active
    let status = false
    export let room_id
    export let username
    export let lastMessage
    export let newMessages = 0

    const onlineMessenger = getContext("online-messenger")
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

    onlineMessenger.subscribe(data => {
        if (!data) return
        if (room_id == data.room_id) {
            if (data.status) {
                status = true
            } else {
                status = false
            }
        }
    })

</script>

<style>
.contact-panel {
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

.contact-panel.active,
.contact-panel:hover {
    background-color: rgb(0, 0, 0);
}

.text-wrapper h1 {
    color: white;
    text-align: start;
    margin-bottom: 0.2rem;
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

.status {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    top: -2px;
    right: -2px;
    background-color: red;
    border: 3px solid var(--online-status-border-clr);
}

.status.active {
    background-color: rgb(0, 215, 0);
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

.contact-panel::after {
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

.contact-panel.active::after,
.contact-panel:hover::after {
    opacity: 1;
}

.contact-panel:hover .lastmessage h2 {
    color: var(--highlight-blue);
}

@media screen and (max-width: 800px) {
    .contact-panel {
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