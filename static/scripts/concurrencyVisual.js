const steps = document.querySelectorAll('.box');
let currentStep = 0;

function animateSteps() {
    // Pause all animations
    steps.forEach(step => step.style.animationPlayState = 'paused');

    // Play animation for the current step
    if (currentStep < steps.length) {
        steps[currentStep].style.animationPlayState = 'running';
        currentStep++;
    } else {
        // Reset to the first step
        currentStep = 0;
    }

    // Schedule the next step
    setTimeout(animateSteps, 1000); // Adjust timing as needed
}

// Start the animation loop
animateSteps();
