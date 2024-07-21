document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const mapContent = document.querySelector('.map-content');

    //新增聊天內容
    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        const test = 'user10';
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'enter-message';
            messageElement.innerHTML = `
                <img src="../image/ele.jpg" alt="avatar">
                <div class="enter-name">${test}</div>
                <div class="message-content">${messageText}</div>
            `;
            mapContent.prepend(messageElement);
            messageInput.value = '';
        }
    });

});