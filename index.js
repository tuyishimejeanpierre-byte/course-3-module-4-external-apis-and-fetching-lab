// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.querySelector('#state-input');
const button = document.querySelector('#fetch-alerts');
const resultsDiv = document.querySelector('#alerts-display');
const errorDiv = document.querySelector('#error-message');

// Show error
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

// Clear error
function clearError() {
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

// Validate input (BONUS)
function isValidState(state) {
  return /^[A-Z]{2}$/.test(state);
}

// Fetch alerts
function fetchWeatherAlerts(state) {
  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather alerts');
      }
      return response.json();
    })
    .then(data => {
      clearError();
      displayAlerts(data);
      input.value = ''; // Clear input
    })
    .catch(error => {
      displayError(error.message);
    });
}

// Display alerts
function displayAlerts(data) {
  resultsDiv.innerHTML = ''; // Clear previous results

  const alerts = data.features || [];
  const title = data.title || 'Weather Alerts';

  // Summary
  const summary = document.createElement('h2');
  summary.textContent = `${title}: ${alerts.length}`;
  resultsDiv.appendChild(summary);

  // List
  const ul = document.createElement('ul');

  alerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  resultsDiv.appendChild(ul);
}

// Button click
button.addEventListener('click', () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    displayError('Please enter a state abbreviation');
    return;
  }

  if (!isValidState(state)) {
    displayError('State must be two capital letters');
    return;
  }

  fetchWeatherAlerts(state);
});