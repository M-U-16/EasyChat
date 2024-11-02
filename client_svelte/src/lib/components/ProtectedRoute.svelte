{#await isValid}
    <p style="color:white;">Loading...</p>
{:then isAuthorized}
    {#if isAuthorized}
        <slot/>
    {:else}
        {
        window.location.href="/login"
        }
    {/if}
{/await}
<script>
    let isValid = fetch("/api/user/isLoggedIn")
        .then(res => res.json())
        .then(body => {
            console.log(body)
            if (body.isAuthorized) {
                return true
            } else {
                return false
            }
        })
</script>