document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    // Add the "loader-hidden" class to hide the loader and display the main content
    loader.classList.add("loader-hidden");

    // Once the transition of the loader ends, show the main content
    loader.addEventListener("transitionend", () => {
        mainContent.style.display = 'block';  // Show main content
        loader.style.display = 'none';        // Hide the loader
    });

    // Add pointerdown event to toggle clicked state for each project
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('pointerdown', () => {
            project.classList.toggle('clicked');
        });
    });

    // Throttle the device orientation event to avoid performance issues on mobile
    let lastTime = 0;
    window.addEventListener('deviceorientation', (event) => {
        const x = event.gamma;
        const currentTime = new Date().getTime();

        // Limit the updates to once every 100ms
        if (currentTime - lastTime > 100) {
            lastTime = currentTime;

            if (x > 10) {
                document.body.style.filter = "brightness(0.7)";
            } else if (x < -10) {
                document.body.style.filter = "brightness(1.3)";
            } else {
                document.body.style.filter = "brightness(1)";
            }
        }
    });

    // Limiting the frequency of confetti animation to prevent overloading mobile devices
    let isConfettiActive = false;
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('pointerdown', () => {
            // Only trigger confetti if it's not already active
            if (!isConfettiActive) {
                isConfettiActive = true;
                confetti({
                    spread: 90,
                    angle: 45,
                    particleCount: 50,  // Reduced particle count for better performance
                    origin: { x: 0.5, y: 0.5 }
                });
                // Allow the confetti to be triggered again after 2 seconds
                setTimeout(() => { isConfettiActive = false; }, 2000);
            }
        });
    });
});
