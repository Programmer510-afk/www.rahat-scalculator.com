let resultShown = false;

// Clear the display
function clearDisplay() {
  document.getElementById('expression').value = '';
  resultShown = false;
}

// Append values to the display
function appendToDisplay(value) {
  const display = document.getElementById('expression');

  if (resultShown) {
    display.value = '';
    resultShown = false;
  }

  display.value += value;
  display.scrollLeft = display.scrollWidth;
}

// Calculate the result
function calculateResult() {
  const display = document.getElementById('expression');
  try {
    let expression = display.value;

    // Handle percentages
    if (expression.includes('%')) {
      expression = expression.replace(/(\d+)%/g, (match, p1) => {
        return p1 / 100;
      });
    }

    const result = eval(expression);

    if (result === Infinity || result === -Infinity) {
      display.value = 'MathError';
    } else {
      display.value = result;
    }

    resultShown = true;
  } catch {
    display.value = 'Error';
    resultShown = true;
  }

  display.scrollLeft = display.scrollWidth;
}

// Button press animation
function handleClick(button) {
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 200);
}

// Add click listener to all buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
    handleClick(button);
  });
});

// 🔔 OPTIONAL: Warn if in desktop mode on mobile
if (screen.width < 768 && window.innerWidth > 768) {
  document.body.classList.add("desktop-mode-on-mobile");
}
