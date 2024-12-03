{#if $page.data.isAuthorized}
    <div class="chat-container">
        <Navbar asChat={true}>
            <div slot="top-left" class="user-profile">
                <div class="user-img">
                    <img src="/api/user/profile/{$page.data.username}" alt="Profilbild">
                </div>
                <div class="profile-username">
                    <h2>{$page.data.username}</h2>
                </div>
            </div>
            <MenuItem
                path="/"
                current={false}
                content="Logout"
                onClick={logoutAction}
            >
                <LogoutIcon />
            </MenuItem>
            <div slot="nav-button"></div>
        </Navbar>
        <div class="chat">
            <Sidepanel />
            <div
                class="chat-messages-input"
            >
                <p>{navigator.userAgent}</p>

                {#if $showAddContact}
                    <AddContact toggle={showAddContact}/>
                {/if}
                <div
                    class="messages-container"
                    bind:this={messagesContainer}
                    style:scrollBehavior={scrollBehavior}
                >
                    {#each $messages as message}
                        <Message data={message}/>
                    {/each}
                </div>
                <ChatInputContainer />
            </div>
        </div>
    </div>
{:else}
<p></p>
{/if}

<script>

    import { page } from "$app/stores"
    import { onNavigate } from "$app/navigation"
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { logout as logoutAction } from "$lib/actions.js"
    import Message from "$lib/Chat/Message.svelte";
    import LogoutIcon from "$lib/icons/logout.svelte"
    import MenuItem from "$lib/components/MenuItem.svelte";
    import Navbar from "$lib/components/Navbar.svelte"
    import Sidepanel from "$lib/Chat/Sidepanel.svelte"
    import AddContact from "$lib/Chat/AddContact.svelte";
    import ChatInputContainer from "$lib/Chat/ChatInputContainer.svelte"

    import socket from "$lib/socket.js"
    let messagesContainer
    let scrollBehavior = "auto;"

    let CurrentRoom
    let mounted = false
    setContext("socket", socket)
    let messages = setContext("messages", writable([]))
    let currentRoom = setContext("currentRoom", writable(-1))
    let showAddContact = setContext("showAddContact", writable(false))
    let onlineMessenger = setContext("online-messenger", writable())
    let contactMessenger = setContext("contact-messenger", writable())

    onMount(() => {
        socket.on("disconnect", disconnect)
        socket.on(":user_online", useronline)
        socket.on(":user_offline", useroffline)
        socket.connect()
        mounted = true
    })

    onNavigate(()=> {
        console.log("navigating...")
        if (mounted) {
            socket.disconnect()
        }
    })

    socket.on(":new_message", (data) => {
        console.log(data.room_id, CurrentRoom)
        contactMessenger.set(data)
        if (data.room_id == CurrentRoom) {
            messages.update((prev) => {
                prev.push(data)
                return prev
            })
        }
    })

    currentRoom.subscribe((room) => {
        if (!room) return
        CurrentRoom = room
        getChat(room)
    })

    messages.subscribe(() => {
        if (!messagesContainer) return
            
        // without timeout messages container would scroll
        // before message is added
        setTimeout(()=> {
            const height = messagesContainer.scrollHeight-messagesContainer.clientHeight
            messagesContainer.scrollTo(0, height)
            if (scrollBehavior != "") scrollBehavior = ""
        }, 10)
    })

    function disconnect() {
        console.log("disconnected")
    }

    function useroffline(data) {
        onlineMessenger.set({
            room_id: data.room_id,
            status: false
        })
    }

    function useronline(data) {
        onlineMessenger.set({
            room_id: data.room_id,
            status: true
        })
    }

    function getChat(room_id) {
        if (typeof(room_id) != 'number') return

        socket.emit(":get_chat", {room_id: room_id},
            (response) => {
                scrollBehavior = "auto"
                messages.set(response.messages)
                currentRoom = room_id
            }
        )
    }
</script>

<style>
    .chat-container {
        width: 100%;
        height: 100vh;
        display: grid;
        overflow: hidden;
        position: relative;
        grid-template-rows: auto 1fr;
    }

    .chat {
        display: grid;
        grid-template-rows: subgrid;
        grid-template-columns: auto 1fr;
    }

    .user-profile {
        height: 45px;
        display: flex;
        overflow: hidden;
        align-items: center;
        padding: 0 1rem 0 0;
        margin: 0 0 0 0.7rem;
    }

    .user-profile h2 {
        font-size: 1.2rem;
        margin-left: 0.5rem;
        height: 100%;
    }
    
    .user-img {
        width: 45px;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        flex-direction: row;
    }
    
    .user-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .chat-messages-input {
        display: grid;
        position: relative;
        grid-template-rows: 1fr auto;
        overflow-y: auto;
    }

    .messages-container {
        height: auto;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-color: rgb(110, 110, 110) black;
       /*  scroll-behavior: smooth; */
    }
</style>