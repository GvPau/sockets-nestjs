// Connect to the Socket.IO server
const socket = io();

// Function to get the number of connected clients
function updateClientCount(count) {
  const clientCountElement = document.getElementById('clientCount');
  clientCountElement.textContent = count;
}

// Function to render chat messages
function renderMessage(message) {
  const chatMessagesElement = document.getElementById('chatMessages');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chatMessagesElement.appendChild(messageElement);
}

// Emit a message to the server
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  socket.emit('message', message);
  messageInput.value = ''; // Clear input field after sending message
}

// Add event listener to send message when button is clicked
document
  .getElementById('sendMessageButton')
  .addEventListener('click', sendMessage);

// Add event listeners, emit messages, etc.
socket.on('connect', () => {
  console.log('User Connected to Socket.IO server with id: ', socket.id);
});

// Listen for the number of connected clients update from the server
socket.on('clientCountUpdate', (count) => {
  updateClientCount(count);
});

socket.on('disconnect', () => {
  console.log('User disconnected from Socket.IO server with id: ', socket.id);
});

socket.on('OnMessage', (data) => {
  console.log('Received message:', data);
  renderMessage(data);
});

socket.on('OnUpdateUsersConnected', (data) => {
  updateClientCount(data);
});

OnUpdateUsersConnected;

// Emit a message to the server
socket.emit('chat message', 'Hello, server!');
