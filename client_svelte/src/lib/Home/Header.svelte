<header class='app__homepage-header'>
<div class='app__landing-section'>
    <div class="app__landing-headings">
        <h2>Easy</h2>
        <h1>
          <span>
            Chat
            <img class='app__chat-icon' src={checkbox} alt="Chat Icon"/>
          </span>
        </h1>
    </div>
    <p>
        ... ermöglicht es dir
        mit Freunden und Familie zu Chatten und in Kontakt zu bleiben.
    </p>
    <div class="app__cta-container">
        <LoginButton />
        <RegisterButton />
    </div>
</div>
</header>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.app__homepage-header {
    min-height: 100vh;
    display: grid;
    overflow-x: hidden;
    grid-template-columns: 2fr 1fr;
    place-items: center;
    align-content: center;
    background:
        radial-gradient(circle at 0 0, rgb(0, 0, 0), transparent),
        radial-gradient(circle at 100% 0, rgba(0, 0, 255, 0.585), transparent);
    background-attachment: fixed;
}
.app__landing-section {
    height: auto;
    padding: 2rem;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    margin-top: var(--navbar-height);
    max-width: 40rem;
}
.app__landing-section::before {
    content: "";
    position: absolute;
    bottom: -1.7rem;
    right: -1.5rem;
    display: none;
    width: 3rem;
    height: 3rem;
    border-radius: 50% 50% 0rem;
    background-color: rgb(8, 8, 8);
    box-shadow: inset 0px 0px 5px rgba(255, 255, 255, 0.507);
}
.app__landing-headings {
    padding: 0rem 0rem 0.5rem 0rem;
    line-height: 0.9;
    position: relative;
}
.app__landing-headings h2 {
    font-size: 4rem;
    color: white;
}
.app__landing-headings h1 {
    position: relative;
    font-size: 5rem;
    color: var(--highlight-blue);
}
.app__landing-headings span {
    position: relative;
}
.app__chat-icon {
    position: absolute;
    width: 4rem;
    top: 0;
    rotate: 20deg;
}
.app__landing-section p {
    font-size: 1.5rem;
    transform: translateY(-20px);
    width: 100%;
    text-wrap: balance;
    font-family: Verdana;
    padding: 1rem 0 0 0;
    border-radius: 1rem;
    border-bottom-right-radius: 0;
    text-align: start;
    display: inline-block;
}
.app__cta-container {
    display: flex;
    justify-content: space-between;
    max-width: 22rem;
    /* margin-bottom: 2rem; */
    gap: 1rem;
}

.app__cta-container:last-child {
    margin: 0 !important;
}

@media screen and (max-width: 750px) {
    
    .app__landing-section {
        width: 90%;
    }

    .app__cta-container {
        flex-direction: column;
        gap: 0;
    }

    :global(.app__cta-container > a) {
        margin: 0 0 1rem 0;
        width: 100% !important;
    }

    .app__homepage-header {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 500px) {
    
    .app__landing-section {
        padding: 1rem;
        margin-left: 0;
    }
}
</style>

<script>
    import checkbox from "$lib/assets/icons/chatbox-ellipse.svg"
    import LoginButton from "$lib/buttons/LoginButton.svelte";
    import RegisterButton from "$lib/buttons/RegisterButton.svelte";
</script>