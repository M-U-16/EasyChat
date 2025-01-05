<div class="user">
    <img
        src={"/api/user/profile/"+username}
        alt="Profilbild von '{username}'"
    >
    <p>{username}</p>
    <button
        type="button"
        class="delete-user"
        on:click={() => {
            removeUser(username)
        }}
    >
        <Close />
    </button>
</div>

<style>
.user {
    display: grid;
    grid-template-columns: auto 1fr auto;
    height: 3rem;
    min-width: 10rem;
    justify-content: space-between;
    padding: 0.5rem;
    overflow: hidden;
    border-radius: 5px;
    width: min-content;
    align-items: center;
    background-color: black;
    border-radius: 5px;
}

.user img {
    width: 2rem;
    border-radius: 5px;
}

.user button {
    color: rgb(255, 36, 36);
    width: 2rem;
    height: 100%;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.user p {
    padding: 0 0.5rem;
    width: 100%;
}
</style>

<script>
    import Close from "$lib/icons/close.svelte"
    export let removeUser = () => {}
    export let username
</script>