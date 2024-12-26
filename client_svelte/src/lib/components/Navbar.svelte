<nav
    class="navbar"
    class:isChat={ asChat }
>
    <slot name="top-left">
        <a href="/" class="logo">
            <h2>Easy</h2>
            <h1>Chat</h1>
        </a>
    </slot>

    <div class="app_nav">
        <slot name="nav-button">
            <!-- <HomeButton /> -->
        </slot>
        <Menu>
            <slot />
        </Menu>
    </div>
</nav>

<style>
.navbar {
    height: var(--navbar-height);
    width: 100%;

    background: #121211;
    box-shadow: 0px 0px 2px rgb(26, 103, 255);
    
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    transition: 0.3s ease;
}

.navbar.isChat {
    position: relative;
}

.logo {
    height: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    /* background: rgb(8, 8, 8); */
}

.logo h1,
.logo h2 {
    transition: 0.3s ease;
}

.logo h1 {
    color: var(--highlight-blue);
}

.logo h2 {
    color: white;
}

.logo:hover h1 {
    filter: drop-shadow(0px 0px 10px var(--highlight-blue));
}

.logo:hover h2 {
    filter: drop-shadow(0px 0px 10px white)
}

.app_nav {
    display: flex;
    align-items: center;
    z-index: 1;
    gap: 0.5rem;
}
</style>

<script>
    import Menu from "$lib/components/Menu.svelte"
    import HomeButton from "$lib/buttons/HomeButton.svelte"
    export let asChat = false
</script>