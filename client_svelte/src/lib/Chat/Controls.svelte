<div class='chat__side-control-container'>
    <button
        class='chat__new-chat-btn'
        title='Kontak hinzufügen'
        on:click={addContactModel}
    >
        <img src={plusIcon} alt="Benutzer Hinzufügen" />
    </button>
    <div class="chat-switcher"></div>
    <div class="search-container">
        <button title='Nach Kontakt Suchen' class='chat__search-btn'>
            <img src={searchIcon} alt="Suchen" />
        </button>
    </div>
</div>

<script>
    import searchIcon from "$lib/assets/icons/search.svg"
    import plusIcon from "$lib/assets/icons/add.svg"
    import { getContext } from "svelte";

    let showAddContact = getContext("showAddContact")
    function addContactModel() {
        showAddContact.set(true)
    }

</script>

<style>
.chat__side-control-container {
    --control-panel-height: 65%;

    position: sticky;
    top: 0;
    display: grid;
    place-items: center;
    grid-template-columns: auto 1fr auto;
    height: 4rem;
    box-shadow: 0px 0px 3px rgb(0, 110, 255);
}

.chat__new-chat-btn {
    width: 2.8rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    height: var(--control-panel-height);
    cursor: pointer;
    background: #1d1d1d;
    border: none;
    font-size: 2rem;
    color: var(--highlight-blue);
    transition: 0.3s ease;
    outline: none;
    border-radius: 5px;
    margin: 0rem 0.8rem 0rem 0.8rem;
}

.chat__new-chat-btn img {
    width: 2rem;
}

.chat__new-chat-btn:hover {
    background-color: #171717;
}

.chat__new-chat-btn:active {
    scale: 1;
}

.search-container {
    display: flex;
    justify-content: end;
    height: 4rem;
    width: 100%;
    align-items: center;
    padding-right: 1rem;
}

.search-container::after {
    content: "";
    width: 80%;
    height: 3px;
    border-radius: 5px;
    position: absolute;
    background-color: rgb(54, 54, 54);
    top: calc(100% - 5px);
    display: none;
}

.search-container img {
    width: 1rem;
    transition: 0.2s ease;
    aspect-ratio: 1;
}

.chat__search-btn {
    height: var(--control-panel-height);
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: var(--highlight-blue);
}

.chat__search-btn:active img {
    scale: 0.8;
}

@media screen and (max-width: 800px) { 
    .chat__side-control-container {
        grid-template-columns: 1fr;
        height: auto;
        background: none;
        border: none;
        box-shadow: none;
        margin-bottom: 0.2rem;
    }
    
    .chat__new-chat-btn {
        width: 3rem;
        height: 3rem;
        margin: 0.5rem 0rem 0.5rem 0rem;
    }
    
    .search-container {
        height: auto;
        padding-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-container::after {
        display: block;
    }
    
    .chat__search-btn {
        width: 3rem;
        height: 3rem;
        margin: 0 0 1rem 0;
    }
}
</style>