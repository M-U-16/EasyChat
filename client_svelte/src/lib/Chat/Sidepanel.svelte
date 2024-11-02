<div class="sidepanel">
    <Controls/>
    <Contacts />
</div>

<style>
.sidepanel {
    --profile-img-width: 50px;
    --side-panel-width: 20rem;
    
    width: var(--side-panel-width);
    height: calc(100vh - var(--navbar-height));
    background: var(--secondary-blue);
    background: linear-gradient(45deg, var(--secondary-blue), rgb(16, 16, 16));
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
}
.sidepanel::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
}

/* SIDEPANEL MEDIA */
@media screen and (max-width: 800px) {
    .sidepanel::-webkit-scrollbar {
        width: 0px;
    }

    .sidepanel {
        width: calc(var(--profile-img-width) + 1rem);
    }

    .sidepanel:first-child {
        background-color: red;
    }
}
</style>

<script>
    import Contacts from "./Contacts.svelte";
    import Controls from "./Controls.svelte";
</script>