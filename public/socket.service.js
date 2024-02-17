// Function to get the number of connected clients
export function updateClientCount(count) {
  const clientCountElement = document.getElementById('clientCount');
  clientCountElement.textContent = count;
}

// Function to render chat messages
export function renderMessage(message) {
  const chatMessagesElement = document.getElementById('chatMessages');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chatMessagesElement.appendChild(messageElement);
}

// Emit a message to the server
export function sendMessage(messageInput) {
  const message = messageInput.value;
  socket.emit('message', message);
  messageInput.value = '';
}
