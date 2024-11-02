<form on:submit={action}>
    <h1>{title}</h1>
    <slot/>
</form>
<style>
    form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 3rem;
        border-radius: 10px;
        max-width: 33rem;
        width: 70%;
        animation: 0.3s popup ease;
        animation-duration: 1;
        scale: 1;
    }

    form h1 {
        text-align: center;
        color: black;
    }

    @keyframes popup {
        from {
            transform: scale(0.5) translateY(100px);
        }
        to {
            transform: scale(1) translateY(0px);
        }
    }
    @media screen and (max-width: 700px) {
        form {
            width: 90%;
            padding: 2rem;
        }
    }
</style>
<script>
    export let title
    export let action = () => {}
</script>