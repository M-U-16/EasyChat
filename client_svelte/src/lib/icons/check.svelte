<script>
    import { draw, fade } from "svelte/transition"
    import { linear, quintIn } from "svelte/easing"
    let show = false
    setTimeout(()=>{
        show = true
    }, 1)
</script>

<style>
    svg {
        transition: 1s ease;
        transform: scale(0);
    }

    svg.active {
        transform: scale(1);
    }
</style>

<div>
    {#if show}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
        class:active={show}
    >
        <path
            transition:fade="{{
                duration: 250,
                easing: quintIn
            }}"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
        />
        <path
            transition:draw="{{
                duration: 200,
                easing: linear,
                delay: 200
            }}"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M352 176L217.6 336 160 272"
        />
    </svg>
    {/if}
</div>