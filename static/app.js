// Connect to the server
const socket = io('http://localhost:5001');

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const chatWindow = document.getElementById('chatWindow');
const usernameInput = document.getElementById('usernameInput');
const joinButton = document.getElementById('joinButton');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const onlineCount = document.getElementById('onlineCount');

let currentUser = '';
let typingTimer;

// Join chat
joinButton.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

function joinChat() {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        loginScreen.style.display = 'none';
        chatWindow.style.display = 'flex';
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();
        
        // Notify server about new user
        socket.emit('set_username', { nickname: username });
    }
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send_message', { message });
        messageInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    } else {
        // Notify others that user is typing
        clearTimeout(typingTimer);
        socket.emit('typing');
        typingTimer = setTimeout(() => {
            // Clear typing indicator after 1 second of no typing
        }, 1000);
    }
});

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('receive_message', (data) => {
    addMessage(data, data.nickname === currentUser ? 'sent' : 'received');
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user_joined', (data) => {
    addSystemMessage(`${data.nickname} joined the chat`);
    onlineCount.textContent = data.users.length;
});

socket.on('user_left', (data) => {
    addSystemMessage(`${data.nickname} left the chat`);
    onlineCount.textContent = data.users.length;
});

socket.on('user_typing', (data) => {
    typingIndicator.textContent = `${data.nickname} is typing...`;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        typingIndicator.textContent = '';
    }, 2000);
});

// Helper functions
function addMessage(data, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const metaDiv = document.createElement('div');
    metaDiv.className = 'meta';
    metaDiv.textContent = `${data.nickname} • ${data.timestamp}`;
    
    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = data.message;
    
    messageDiv.appendChild(metaDiv);
    messageDiv.appendChild(textDiv);
    chatMessages.appendChild(messageDiv);
}

function addSystemMessage(message) {
    const systemMessage = document.createElement('div');
    systemMessage.className = 'system-message';
    systemMessage.textContent = message;
    systemMessage.style.textAlign = 'center';
    systemMessage.style.color = '#666';
    systemMessage.style.margin = '10px 0';
    systemMessage.style.fontSize = '0.9em';
    chatMessages.appendChild(systemMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
