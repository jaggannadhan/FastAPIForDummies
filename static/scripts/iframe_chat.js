// Select elements
const messageView = document.getElementById('message-view');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Establish WebSocket connection
const socket = new WebSocket('ws://127.0.0.1:8080/send');

// Function to add a message to the message view
function addMessage(message, isSelf = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.backgroundColor = isSelf ? '#d1e7dd' : '#f9f9f9';
    messageView.appendChild(messageDiv);
    messageView.scrollTop = messageView.scrollHeight; // Scroll to the bottom
}

// Handle incoming messages from the server
socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    addMessage(data.message);
};

// Handle connection errors
socket.onerror = function (error) {
    console.error('WebSocket error:', error);
};

// Handle connection close
socket.onclose = function () {
    console.log('WebSocket connection closed');
};

// Send button click event
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Send the message to the server
        socket.send(JSON.stringify({ message }));
        addMessage(message, true); // Display the sent message locally
        messageInput.value = ''; // Clear the input field
    }
});

// Allow sending messages by pressing Enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});

const portDetElm = document.getElementById("port-id");
if(portDetElm) {
    portDetElm.innerText = window.location.origin.split(":")[2];
} 