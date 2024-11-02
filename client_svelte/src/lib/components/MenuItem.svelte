<a
    href={path}
    class="app__menu-link"
    class:current={current}
    on:click={onClick}
>
    <slot />
    <span>{content}</span>
</a>

<style>
a {
    width: 100%;
    display: flex;
    color: white;
    font-size: 1.4rem;
    position: relative;
    align-items: center;
    text-decoration: none;
    transition: 0.3s ease;
    padding: 1.5rem 0rem 1.5rem 3rem;
}

a:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.468);
}

:global(.app__menu-link > div) {
    width: 1.8rem;
    height: 1.8rem;
    padding: 0.1rem;
    margin-right: 0.5rem;
}

:global(.app__menu-link > div > svg) {
    width: 100%;
    height: 100%;
    stroke: white;
    fill: white;
    transition: 0.3s ease;
}

a:hover {
    cursor: pointer;
}

:global(.app__menu-link:hover > div > svg) {
    fill: var(--highlight-blue);
    stroke: var(--highlight-blue) !important;
}

@media (max-width: 600px) {
    a {
        padding: 1.5rem 0rem 1.5rem 1rem;
    }
}

/* .current-page::before {
    content: "";
    position: absolute;
    background-color: var(--highlight-blue);
    width: 0.5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 50%;
    left: 1.8rem;
    transform: translateY(-50%);
} */

</style>

<script>
    import { getContext } from "svelte";

    export let path
    export let current
    export let content
    export let onClick = () => {
        closeMenu()
    }

    let closeMenu = getContext("closeMenu")
</script>