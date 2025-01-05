<nav class="groups">
    <div class="groups-container">
        {#if Array.isArray($groups)}
        {#each $groups as group}
            <GroupPanel
                name={group.name}
                room_id={group.room_id}
                lastMessage={group.lastMessage}
            />
        {/each}
        {/if}
    </div>
</nav>

<script>
    import { writable } from "svelte/store";

    import GroupPanel from "./GroupPanel.svelte";
    let groups = writable([])
    
    getGroups()
    
    async function getGroups() {
        fetch("/api/user/groups")
        .then(res => res.json())
        .then(data => {
            console.log("group:", data)
            groups.set(data.groups)
        })
    }
</script>