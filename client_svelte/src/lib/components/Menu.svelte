<svelte:body on:click={(e)=>{
    if (active && !menu.contains(e.target)) {
        active = false
    }
}} />

<svelte:window bind:innerWidth={clientWidth} />

<div class="app__menu"
    bind:this={menu}
>
    <div class="app__menu-wrapper">
        <MenuButton
            activeMenu={active}
            toggleActive={toggleActive}
        />
        <div
            class="app__menu-container"
            class:active={active}
        >
            <slot></slot>
        </div>
    </div>
</div>

<style>
.app__menu {
    display: flex;
    align-items: center;
    z-index: 1;
    gap: 0.5rem;
}

.app__menu-wrapper {
    height: var(--navbar-height);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* MENU RIGHT SIDE BAR */
.app__menu-container {
    --border-size: 15px;

    position: absolute;
    top: 100%;
    right: 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    
    height: calc(100vh - var(--navbar-height));
    background: linear-gradient(45deg, var(--secondary-blue), rgb(16, 16, 16));
    opacity: 0;
    overflow: hidden;
    transition:
        0.5s ease-in-out;
    width: 17rem;
    transform: translateX(100%);
    transition: 0.5s ease;
}

.app__menu-container.active {
    transition: transform 0.5s ease;
    opacity: 1;
    transform: translateX(0);
}

@media screen and (max-width: 600px) {
    .app__menu-container {
        width: 100vw;
        transform: translateX(100vw);
    }
}
</style>

<script>
    import MenuButton from "$lib/buttons/MenuButton.svelte"
    import { setContext } from "svelte";
    setContext("closeMenu", closeMenu)

    let menu
    let active = false
    let clientWidth

    function toggleActive() {
        active = !active
    }

    function closeMenu() {
        active = false
    }

</script>