<div class="page">
    <Navbar>
        <MenuItem
            path="/registrieren"
            content="Registrieren"
        ><Register /></MenuItem>
        <MenuItem
            path="/login"
            content="Anmelden"
        ><Login /></MenuItem>
    </Navbar>
    <slot />
</div>

<style>
</style>

<script>
    import MenuItem from "$lib/components/MenuItem.svelte"
    import Navbar from "$lib/components/Navbar.svelte";
    import Login from "$lib/icons/login.svelte"
    import Register from "$lib/icons/register.svelte"

    /* import {onNavigate} from "$app/navigation"
    onNavigate((navigation) => {
        if (!document.startViewTransition) {return}
        return new Promise((resolve) => {
            document.startViewTransition(async()=>{
                resolve()
                await navigation.complete
            })
        })
    }) */
</script>