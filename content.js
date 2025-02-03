let usernameColors = new Map();
let usernameBatch = new Map();
let isEnabled = localStorage.getItem('highlighterState') === 'on'; // Default state based on saved state

// Listen for toggle action from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    isEnabled = !isEnabled;
    // Save the new state to localStorage
    localStorage.setItem('highlighterState', isEnabled ? 'on' : 'off');

    // Update the button's state in the UI
    updateButtonState();

    if (isEnabled) {
      highlightUsernames();
    } else {
      clearHighlights();
    }
    sendResponse({ enabled: isEnabled });
  }
});

// Update button UI to reflect the highlighter state
function updateButtonState() {
  const button = document.getElementById('highlighter-toggle'); // Assuming you have a button with this ID
  if (!button) return;

  if (isEnabled) {
    // Example: change button text or add a class to indicate it's "on"
    button.innerText = 'Disable Highlighter';  // Text change
    button.classList.add('enabled');          // Add "enabled" class for styles
    button.classList.remove('disabled');     // Remove "disabled" class if exists
  } else {
    button.innerText = 'Enable Highlighter';  // Text change
    button.classList.add('disabled');        // Add "disabled" class for styles
    button.classList.remove('enabled');     // Remove "enabled" class if exists
  }
}

// Load usernames and GIFs from external JSON file
fetch(chrome.runtime.getURL("usernames.json"))
  .then(response => response.json())
  .then(data => {
    for (const [batchName, batchData] of Object.entries(data)) {
      batchData.usernames.forEach(username => {
        usernameColors.set("@" + username, { 
          color: batchData.color, 
          icon: batchData.gif ? chrome.runtime.getURL(batchData.gif) : null // Convert local path
        });
        usernameBatch.set("@" + username, batchName);
      });
    }
    if (isEnabled) highlightUsernames();
    updateButtonState(); // Make sure the button reflects the correct state on page load
  })
  .catch(error => console.error("Failed to load usernames.json:", error));

// Function to highlight usernames and add GIFs
function highlightUsernames() {
  if (!isEnabled) return;

  document.querySelectorAll('div[dir="ltr"] span, a[dir="ltr"]').forEach(el => {
    const username = el.innerText.trim();

    if (username.startsWith("@") && !el.dataset.highlighted) {
      if (usernameColors.has(username)) {
        const { color, icon } = usernameColors.get(username);

        // Apply color and bold style
        el.style.color = color;
        el.style.fontWeight = "bold";
        el.dataset.highlighted = "true";

        // Ensure we only insert the GIF for profile usernames and post maker usernames
        const isProfileUsername = el.closest('div[data-testid="UserName"]');
        const isPostMakerUsername = el.closest('article')?.querySelector('div[dir="ltr"] span') === el;

        if (icon && (isProfileUsername || isPostMakerUsername) && !el.nextSibling?.classList?.contains("username-gif")) {
          const gifImage = document.createElement("img");
          gifImage.src = icon;
          gifImage.alt = "GIF";
          gifImage.classList.add("username-gif");
          gifImage.style.width = "40px";
          gifImage.style.height = "30px";
          gifImage.style.marginLeft = "5px";
          gifImage.style.verticalAlign = "middle";

          // Insert the GIF immediately after the username
          el.parentNode.insertBefore(gifImage, el.nextSibling);
        }

        // Tooltip event handlers
        const mouseOverHandler = () => showBatchName(el, username);
        const mouseOutHandler = hideBatchName;

        el._mouseOverHandler = mouseOverHandler;
        el._mouseOutHandler = mouseOutHandler;

        el.addEventListener("mouseover", mouseOverHandler);
        el.addEventListener("mouseout", mouseOutHandler);
      } else {
        // Clear styles if username is not listed
        el.style.color = "";
        el.style.fontWeight = "";

        // Remove associated GIF if present
        const nextSibling = el.nextSibling;
        if (nextSibling && nextSibling.classList.contains("username-gif")) {
          nextSibling.remove();
        }
      }
    }
  });
}

// Function to remove highlights and GIFs
function clearHighlights() {
  document.querySelectorAll('[data-highlighted="true"]').forEach(el => {
    el.style.color = "";
    el.style.fontWeight = "";
    el.removeAttribute("data-highlighted");

    // Remove associated GIF
    const nextSibling = el.nextSibling;
    if (nextSibling && nextSibling.classList.contains("username-gif")) {
      nextSibling.remove();
    }

    // Remove event listeners for tooltips
    if (el._mouseOverHandler) {
      el.removeEventListener("mouseover", el._mouseOverHandler);
      delete el._mouseOverHandler;
    }
    if (el._mouseOutHandler) {
      el.removeEventListener("mouseout", el._mouseOutHandler);
      delete el._mouseOutHandler;
    }
  });
}

// Function to show tooltip with batch name
function showBatchName(element, username) {
  const batchName = usernameBatch.get(username);
  if (!batchName) return;

  let tooltip = document.getElementById("batch-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "batch-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#0c0200";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.boxShadow = "0 2px 10px rgba(248, 162, 162, 0.1)";
    tooltip.style.fontSize = "12px";
    tooltip.style.display = "none";
    tooltip.style.color = "white";
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `<strong>${batchName}</strong>`;

  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top + window.scrollY + rect.height + 5}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.display = "block";
}

// Function to hide tooltip
function hideBatchName() {
  const tooltip = document.getElementById("batch-tooltip");
  if (tooltip) {
    tooltip.style.display = "none";
  }
}

// Mutation observer for dynamic content
const observer = new MutationObserver(() => {
  clearTimeout(window.highlightTimeout);
  window.highlightTimeout = setTimeout(() => {
    clearHighlights();
    highlightUsernames();
  }, 300);
});
observer.observe(document.body, { childList: true, subtree: true });
