<a href="/" class='app__home-button'>
    <img src={home} alt="" />
</a>

<style>
/* .app__home-button-wrapper {
    background: none;
    border: none;
} */

.app__home-button {
    --padding: 0.4rem;

    bottom: 0rem;
    right: 0rem;
    display: flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: var(--padding);

    border-radius: 5px;
    transition: 0.3s ease;
    background: var(--highlight-blue);
}

.app__home-button:hover,
.app__home-button:focus {
    outline: none;
    background: var(--highlight-blue);
    
}

.app__home-button img {
    width: 1.4rem;
    aspect-ratio: 1 / 1;
    filter: invert(90%);
}

/* .app__home-button span {
    font-size: 1.2rem;
    margin-left: 0.2rem;
} */
</style>

<script>
    import home from "$lib/assets/icons/home.svg"
</script>