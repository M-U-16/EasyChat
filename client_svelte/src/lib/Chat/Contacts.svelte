<svelte:document on:update-contacts={getContacts}/>
<nav class='contacts'>
    {#if Array.isArray($contacts)}
    {#each $contacts as contact}
        <ContactPanel
            room_id={contact.room_id}
            username={contact.username}
            lastMessage={contact.lastMessage}
        />
    {/each}
    {/if}
</nav>

<style>
    .contacts {
        width: 100%;
        overflow: hidden;
    }
</style>

<script>
    import { writable } from "svelte/store";
    import { getContext } from "svelte";
    import ContactPanel from "./ContactPanel.svelte";

    let firstLoad = true
    const currentRoom = getContext("currentRoom")

    let contacts = writable([])
    getContacts()

    async function getContacts() {
        fetch("/api/user/chats")
        .then(res => res.json())
        .then(data => {
            console.log("contacts: ", data)
            if (firstLoad) {
                if (data.contacts.length != 0) {
                    currentRoom.set(data.contacts[0].room_id)
                }
                firstLoad = false
            }
            contacts.set(data.contacts)
        })
    }
</script>