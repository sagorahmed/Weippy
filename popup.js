let usernames = [];

// Fetch usernames from the JSON file
fetch(chrome.runtime.getURL('TwitterUsernames.json'))
  .then(response => response.json())
  .then(data => {
    usernames = data;
    displayUsernames(usernames);
  });

function displayUsernames(userList) {
  const userListDiv = document.getElementById('user-list');
  userListDiv.innerHTML = '';

  userList.forEach(username => {
    const userLink = document.createElement('a');
    userLink.href = `https://twitter.com/${username}`;
    userLink.textContent = `@${username}`;
    userLink.target = '_blank';
    userLink.classList.add('user-link');
    userListDiv.appendChild(userLink);
  });
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().replace(/^@/, '');
  const filteredUsernames = usernames.filter(username => username.toLowerCase().includes(query));
  displayUsernames(filteredUsernames);
});

// Toggle functionality
document.getElementById("toggleButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
    const button = document.getElementById("toggleButton");
    if (response.enabled) {
      button.textContent = "Turn Off";
    } else {
      button.textContent = "Turn On";
    }
  });
});

// Set initial button state based on saved state
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toggleButton");
  const state = localStorage.getItem('highlighterState');
  if (state === 'on') {
    button.textContent = "Turn Off";  // Highlighter is enabled
  } else {
    button.textContent = "Turn On";   // Highlighter is disabled
  }
});
