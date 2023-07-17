document.addEventListener('DOMContentLoaded', () => {
  const messageContainer = document.getElementById('message-container');
  const messageTextInput = document.getElementById('message-text-input');
  const sendMessageButton = document.getElementById('send-message-button');
  const deleteAllButton = document.getElementById('delete-all-button');
  const userId = 1; // Set the user's ID here

  function appendMessage(user, messageText, isMyMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isMyMessage ? 'message my-message' : 'message';
    messageDiv.innerHTML = `
      <p class="message-user">${user}</p>
      <p class="message-text">${messageText}</p>
    `;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  function loadMessagesFromStorage() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach((message) => {
      appendMessage(message.user, message.text, message.isMyMessage);
    });
  }

  function saveMessageToStorage(user, messageText, isMyMessage) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ user, text: messageText, isMyMessage });
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  function getUserMessages() {
    fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/message/getMessagesAll?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((message) => {
          appendMessage(message.firstName, message.message, message.UserId === userId);
        });
      })
      .catch((error) => console.error(error));
  }

  function sendMessage(messageText) {
    if (messageText !== '') {
      // Create and append the message immediately
      appendMessage('You', messageText, true);

      // Save the message to LocalStorage
      saveMessageToStorage('You', messageText, true);

      fetch('https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/message/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageText,
        }),
      })
        .then(() => {
          messageTextInput.value = '';
          // getUserMessages(); // No need to fetch messages again
        })
        .catch((error) => {
          console.error(error);
          // Handle errors if necessary, e.g., display an error message to the user.
        });
    }
  }

  function deleteAllMessages() {
    if (confirm('Are you sure you want to delete all messages?')) {
      fetch('https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/message/deleteAll', {
        method: 'DELETE',
      })
        .then(() => {
          messageContainer.innerHTML = '';
          localStorage.removeItem('messages'); // Clear LocalStorage
        })
        .catch((error) => console.error(error));
    }
  }

  // Load messages from storage when the page loads
  loadMessagesFromStorage();

  // Fetch and display user messages
  getUserMessages();

  sendMessageButton.addEventListener('click', () => {
    const messageText = messageTextInput.value.trim();
    if (messageText !== '') {
      sendMessage(messageText);
    }
  });

  deleteAllButton.addEventListener('click', () => {
    deleteAllMessages();
  });
});