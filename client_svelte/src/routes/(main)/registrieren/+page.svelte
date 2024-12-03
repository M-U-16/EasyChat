<div class="flex-center full-height-navbar">
    {#if success}
        <div class="success-container"
            class:active={success}
        >
            <div class="success">
                <div class="icon">
                    <Check/>
                </div>
                <h1>Erfolgreich Registriert!</h1>
            </div>
            <LoginButton />
        </div>
    {:else}
        <RegisterForm success={activateSuccess} />
    {/if}

</div>
    
<style>

    .success-container {
        opacity: 0;
        padding: 1rem;
        border-radius: 5px;
        background-color: white;
        transform: translateY(100px);
        animation: success 0.5s ease 1;
    }

    .success-container.active {
        opacity: 1;
        transform: translateY(0);
    }

    .success {
        gap: 0.5rem;
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }
    
    .success-container h1 {
        color: rgb(51, 51, 51);
        font-size: 1.8rem;
    }

    .icon {
        width: 4rem;
        height: 4rem;
        color: rgb(0, 189, 117);
    }

    @keyframes success {
        from {
            opacity: 0;
            transform: translateY(50px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

<script>
    import Check from "$lib/icons/check.svelte";
    import RegisterForm from "$lib/Form/RegisterForm.svelte";
    import LoginButton from "$lib/buttons/LoginButton.svelte";
    let success = false
    function activateSuccess() {
        success = true
    }
</script>