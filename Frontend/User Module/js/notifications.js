export function showNotification(message, type = "info", duration = 3000) {
  const container = document.getElementById("notification-container");
  if (!container) {
    return;
  }
  
  const notification = document.createElement("div");
  notification.className = `custom-alert alert-${type}`;
  
  // Format message with clickable links
  const formattedMessage = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  
  // Notification content
  notification.innerHTML = `
        <span class="icon">${getIcon(type)}</span>
        <span>${formattedMessage}</span>
    `;
  
  container.appendChild(notification);
  
  // Show notification with smooth fade-in effect
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 500);
  }, duration);
}

// Function to get SVG icons
function getIcon(type) {
  switch (type) {
    case "error":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-alert-icon lucide-cloud-alert"><path d="M12 12v4"/><path d="M12 20h.01"/><path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708"/></svg>`;
      
    case "success":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
      
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
  }
}









