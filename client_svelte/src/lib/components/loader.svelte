<div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="spinner"
        width="100"
        height="100"
    >
        <circle
            r="10"
            cx="50%"
            cy="50%"
            fill="none"
            stroke-dasharray="100"
            stroke-width="3"
        ></circle>
    </svg>
</div>

<style>
    div {
        width: 2rem;
        height: 2rem;
    }

    div svg {
        width: 100%;
        height: 100%;
    }

    .spinner {
        z-index: 5;
        /* transform: translate(-50%, -50%); */
    }

    .spinner circle {
        animation: spin 1s ease infinite;
        stroke-linecap: round;
        stroke-dasharray: 10;
        transform-origin: center center;
        stroke: rgb(57, 57, 255);
        stroke: white;
        height: 100%;
        width: 100%;
    }

    @keyframes spin {
        50% {
            scale: 1.2;
        }
        100% {
            rotate: 360deg;
        }
    }
</style>