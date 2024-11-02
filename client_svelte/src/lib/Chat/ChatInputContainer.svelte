<div class='chat__input-container'>
    <div class="chat__input-wrapper">
        <input
            type="text"
            class='chat__input'
            bind:this={userInput}
            on:keydown={checkEnter}
            placeholder='Nachricht Senden...'
        />
        <button
            class='chat__input-send-btn'
            on:click={sendMessage}
        >
            <img src={sendIcon} alt="Send" />
        </button>
    </div>
</div>

<script>
    import sendIcon from "$lib/assets/icons/send.svg"
    import { getContext } from "svelte";
    import { get } from "svelte/store";
    let userInput

    const messages = getContext("messages")
    const socket = getContext("socket")
    const currentRoom = getContext("currentRoom")
    const contactMessenger = getContext("contact-messenger")

    function checkEnter(e) {
        if (e.key == "Enter") sendMessage()
    }

    function updateMessages(data) {
        const message = {
            username: data.username,
            message: data.message,
            you: data.you,
            date: data.date,
            room_id: get(currentRoom)
        }
        messages.update((prev) => {
            contactMessenger.set(message)
            prev.push(message)
            return prev
        })
    }

    function sendMessage() {
        if (userInput.value == "") return

        const date = new Date()
        const seconds = date.getSeconds().toString()
        const formatedDate = date.getFullYear() + "-" +
        date.getMonth() + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes() + ":" +
        (seconds.length < 2 ? "0"+seconds:seconds)
        
        socket.emit(":send_message",
            {   
                message: userInput.value,
                date: formatedDate,
                room_id: get(currentRoom)
            }, //message object with date
            (data) => {
                updateMessages(data)
            } //callback function
        )
        userInput.value = ""
    }


</script>

<style>
.chat__input-container {
    height: 6rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chat__input-wrapper {
    width: 90%;
    max-width: 40rem;
    position: relative;
}
.chat__input {
    font-size: 1.5rem;
    padding: 0.8rem 4rem 0.8rem 2rem;
    border-radius: 2rem;
    border: none;
    color: black;
    background: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
    outline: grey;
    outline-offset: -5px;
    outline-color: black;
}
.chat__input-send-btn {
    position: absolute;
    height: 100%;
    aspect-ratio: 1;
    background: var(--highlight-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    top: 0;
    right: 0;
    cursor: pointer;
    scale: 1.1;
}
.chat__input-send-btn img {
    width: 1,8rem;
    height: 1.8rem;
    rotate: -45deg;
    transform: translate(2px);
}
</style>