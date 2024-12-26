<div class='message__container'>
    <div
        class="chat__message"
        class:is_you={data.username == $page.data.username}
        class:lastIsSame={lastIsSame}
    >
        {#if !lastIsSame}
            <div class="message__profile-container">
                <img src="/api/user/profile/{data.username}" alt="{data.username}" />
                <p class="chat__message-name">
                    {data.username}:
                </p>
            </div>
        {/if}
        <div class="message__text-content">
            <p
                class="chat__message-content"
                class:lastIsSame={lastIsSame}
            >
                {data.message}
            </p>
        </div>
    </div>
</div>

<style>
.message__container {
    width: 100%;
}

.chat__message {
    display: grid;

  /*   box-shadow: 0px 0px 1px rgba(255, 255, 255, 0.411); */
    flex-direction: row;
    align-items: center;
    margin: 1rem 1rem 0.2rem 1rem;
    border-radius: 5px;
    min-width: 0;
    overflow: hidden;
    float: left;
    color: #ffffff;
    max-width: 40rem;
    background: rgb(21, 21, 21);
}

.chat__message.lastIsSame {
    margin: 0 1rem 0.2rem 1rem;
}

.chat__message.is_you {
    float: right;
    position: relative;
    color: white;
    background: rgba(31, 96, 202, 0.882) !important;
}

.message__profile-container {
    gap: 0.5rem;
    display: flex;
    margin: 0.5rem 1rem 0 1rem;
    padding-bottom: 0.5rem;
    align-items: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.372);
}

.message__profile-container img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border-radius: 50%;
}

.chat__message-name {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0);
    color: rgb(255, 255, 255);
}

.chat__message-content {
    border-radius: 5px;
    border-radius: 0px 0px 5px 5px;
    width: 100%;
    padding: 0.5rem 1rem 1rem 1rem;
}

.chat__message-content.lastIsSame {
    padding: 0.8rem;
}
</style>

<script>
    import {page} from "$app/stores"
    export let data
    export let lastIsSame
</script>