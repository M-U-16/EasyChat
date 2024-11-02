<button 
    class="menu-button"
    class:active={activeMenu}
    on:click={toggleActive}
>
    <span class='menu__hamburger-layer'></span>
    <span class='menu__hamburger-layer'></span>
    <span class='menu__hamburger-layer'></span>
</button>

<style>
.menu-button {
    background: transparent;
    width: 3.5rem;
    height: var(--navbar-height);
    border: none;
    cursor: pointer;
    transition: 0.3s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    --span-rotation-duration: 0.2s;
}

.menu-button span {
    background: white;
    display: block;
    width: 35px;
    height: 3px;
    position: absolute;
    border-radius: 10px;
    rotate: 0;
    transform-origin: center;
}

.menu-button span:nth-child(1) {
    top: 33%;
}

.menu-button span:nth-child(2) {
    transform: translateY(-50%) translateX(0);
    top: 50%;
}

.menu-button span:nth-child(3) {
    bottom: 32%;
}

/* ACTIVE STATES */
.menu-button.active span:nth-child(1){
    top: 50%;
    transition: transform var(--span-rotation-duration) ease;
    transform: rotate(-45deg);
}

.menu-button.active span:nth-child(2) {
    opacity: 0;
    transform: translateY(-50%);
}

.menu-button.active span:nth-child(3){
    top: 50%;
    transform: rotate(45deg);
    transition: transform var(--span-rotation-duration) ease;
}
</style>

<script>
    export let activeMenu
    export let toggleActive = ()=>{}
</script>