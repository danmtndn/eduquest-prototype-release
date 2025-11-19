document.getElementById("canvas").addEventListener("touchstart", function(event) {
    console.log("Touch started at:", event.touches[0].clientX, event.touches[0].clientY);
    event.preventDefault(); // Prevents unwanted gesture interference
}, { passive: false });