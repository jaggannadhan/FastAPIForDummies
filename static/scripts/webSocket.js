// Create a WebSocket object
const socket = new WebSocket('ws://localhost:8000/send'); 
const broadcastSocket = new WebSocket('ws://localhost:8000/broadcast'); 

// Event listeners for WebSocket events
socket.onopen = () => {
  console.log('WebSocket connection opened');
};

broadcastSocket.onopen = () => {
    console.log('Broadcast WebSocket connection opened');
};


// Handle inbound messages
socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

broadcastSocket.onmessage = (event) => {
    console.log('Message from server:', event.data);
};


// Close WebSocket connections
socket.onclose = () => {
  console.log('WebSocket connection closed');
};

broadcastSocket.onclose = () => {
    console.log('WebSocket connection closed');
};


// Handle WebSocket errors
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

broadcastSocket.onerror = (error) => {
    console.error('WebSocket error:', error);
};


// Send Messages to the server
function sendMessage(message) {
  socket.send(message);
}

function sendBroadcastMessage(message) {
    broadcastSocket.send(message);
}