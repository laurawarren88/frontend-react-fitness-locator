export const showMessage = (containerId, message, type) => {
    const container = document.getElementById(containerId);
    container.textContent = message;
    container.className = `alert alert-${type}`;
  };