<a href="/login">
    <span>Anmelden</span>
    <img src={ArrowRight} alt="" />
</a>

<style>
a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 1rem 0.8rem 1rem;
    border-radius: 10px;
    border: none;
    width: 10rem;
    background: var(--highlight-blue);
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    color: white;
    text-decoration: none;
}
a span {
    transition: 0.3s ease;
    transform: translateY(-2px);
    border: none;
}
a:hover span {
    margin-left: -1.5rem;
}
a img {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 1.2rem;
    scale: 0;
    opacity: 0;
    transition: var(--normal-transition);
    transform: translateX(50px);
}
a:hover img {
    scale: 1;
    opacity: 1;
    transform: translateX(0px);
}

</style>

<script>
    import ArrowRight from "$lib/assets/icons/arrow-right.svg"
</script>