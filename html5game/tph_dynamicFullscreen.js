(function() {
    // Define base resolution dimensions for the game
    const baseWidth = 1280;  // Game's base resolution width
    const baseHeight = 720;  // Game's base resolution height

    // Helper function to check if the browser is in fullscreen mode
    function isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }

    // Function to resize the canvas dynamically based on window size
    function resizeCanvas() {
        const canvas = document.getElementById("canvas");
        if (!canvas) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);

        const newWidth = Math.floor(baseWidth * scale);
        const newHeight = Math.floor(baseHeight * scale);

        canvas.style.width = newWidth + "px";
        canvas.style.height = newHeight + "px";
        canvas.style.position = "absolute";
        canvas.style.left = "50%";
        canvas.style.top = "50%";
        canvas.style.transform = "translate(-50%, -50%)";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "black";

        document.getElementById("fullscreen-btn").style.display = isFullscreen() ? "none" : "block";
    }

    // Function to enable fullscreen mode for the document
    function enableFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    // Listener to handle changes in fullscreen state and resize the canvas
    function fullscreenChangeListener() {
        resizeCanvas(); // Also updates fullscreen button visibility
    }

    // Function to wait for the canvas and fullscreen button to be available, then initialize
    function waitForCanvasAndInit() {
        const canvas = document.getElementById("canvas");
        const btn = document.getElementById("fullscreen-btn");
        if (canvas && btn) {
            resizeCanvas();
            btn.addEventListener("click", enableFullscreen);
            window.addEventListener("resize", resizeCanvas);
            window.addEventListener("orientationchange", resizeCanvas);

            document.addEventListener("fullscreenchange", fullscreenChangeListener);
            document.addEventListener("webkitfullscreenchange", fullscreenChangeListener);
            document.addEventListener("msfullscreenchange", fullscreenChangeListener);

            // Show the button if not fullscreen
            if (!isFullscreen()) {
                btn.style.display = "block";
            }
        } else {
            setTimeout(waitForCanvasAndInit, 100);
        }
    }

    // Start the initialization process
    waitForCanvasAndInit();
})();