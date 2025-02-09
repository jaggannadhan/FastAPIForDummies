// Select elements
const messageView = document.getElementById('message-view');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Establish WebSocket connection
const iframe_socket = new WebSocket('ws://localhost:8080/send');

// Function to add a message to the message view
function addMessage(message, isSelf = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.backgroundColor = isSelf ? '#d1e7dd' : '#f9f9f9';
    messageView.appendChild(messageDiv);
    messageView.scrollTop = messageView.scrollHeight; // Scroll to the bottom
}

// Handle incoming messages from the server
iframe_socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    addMessage(data.message);
};

// Handle connection errors
iframe_socket.onerror = function (error) {
    console.error('iFrame WebSocket error:', error);
};

// Handle connection close
iframe_socket.onclose = function () {
    console.log('iFrame WebSocket connection closed');
};

// Send button click event
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Send the message to the server
        iframe_socket.send(JSON.stringify({ message }));
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