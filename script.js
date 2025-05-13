let resultShown = false; // Flag to track if the result was just shown

// Clear the display
function clearDisplay() {
    document.getElementById('expression').value = '';
    resultShown = false; // Reset flag
}

// Append values to the display, with auto-clear after showing result
function appendToDisplay(value) {
    const display = document.getElementById('expression');

    // Clear the display if the result was just shown before appending new input
    if (resultShown) {
        display.value = '';
        resultShown = false; // Reset the flag
    }

    display.value += value;
    display.scrollLeft = display.scrollWidth; // Scroll to the right to show the last input
}

// Calculate the result and auto-clear on next input
function calculateResult() {
    const display = document.getElementById('expression');
    try {
        let expression = display.value;
        
        // Handle percentages (e.g., 50 -> 0.5)
        if (expression.includes('%')) {
            expression = expression.replace(/(\d+)%/g, (match, p1) => {
             return p1 / 100;
            });
        }

        const result = eval(expression);

        if (result === Infinity || result === -Infinity) {
            display.value = 'MathError';
        }
        else {
            display.value = result;
        }

        resultShown = true; // Set flag to true as result is now shown
    }
    catch {
        display.value = 'Error';
        resultShown = true; // Set flag to true to clear on next input
    }

    display.scrollRight = display.scrollWidth; // Scroll to the left to show the result
    }

// Function to handle button click and temporary style change
function handleClick(button) {
    button.classList.add('active');

    // Remove the active class after 200ms
    setTimeout(() => {
        button.classList.remove('active');
    }, 200);
}

// Add this to each button in your HTML
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        handleClick(button);
    });
});
