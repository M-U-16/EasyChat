<div class='input-wrapper'>
    <div
        class="error-message no-select"
        class:active={errorMessage!==""}
    >{errorMessage}</div>

    <label for={name} class:active={active}>
        {placeholder}
    </label>
    <input
        class:error={error}
        required
        name={name}
        type={type}
        bind:this={input}
        on:input={oninput}
        on:focus={()=>{active=true}}
        on:focusout={()=>{
            if (input.value == "") {
                active=false
            }
        }}
    />
</div>

<style>
    .input-wrapper {
        margin-top: 0.8rem;
        position: relative;
    }

    .input-wrapper label {
        position: absolute;
        color: grey;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 1rem;
        pointer-events: none;
        font-size: 1.2rem;
        padding: 0 0.2rem;
        transition: 0.3s ease;
        background-color: white;

    }
    
    .input-wrapper label.active {
        top: 0;
        font-size: 0.9rem;
    }

    input {
        width: 100%;
        border: none;
        height: 100%;
        color: black;
        padding: 1rem;
        outline: none;
        font-size: 1.2rem;
        background: white;
        border-radius: 10px;
        transition: 0.4s ease;
        border: 2px solid rgb(157, 157, 157);
    }
    
    input:focus,
    input:active {
        border: 2px solid var(--highlight-blue);
    }

    input.error {
        border: 2px solid red !important;
    }

    .error-message {
        color: red;
        top: 0.2rem;
        right: 0.5rem;
        opacity: 0;
        transition: 0.3s ease;
        transform: translateY(-10px);
        position: absolute;
        pointer-events: none;
    }

    .error-message.active {
        opacity: 1;
        transform: translateY(0);
    }

</style>

<script>
    let input
    let active
    export let value
    export let name, type
    export let placeholder
    export let errorMessage
    let error = errorMessage != ""
    $: error = errorMessage != ""
    export let onChange = () => {}

    function oninput(e) {
        value.set(input.value)
        onChange()
    }
</script>