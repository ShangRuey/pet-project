 document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const contentContainer = document.querySelector('.content-container');
    const userInfoPopup = document.getElementById('user-info-popup');
    const userInfoImg = document.getElementById('user-info-img');
    const userInfoName = document.getElementById('user-info-name');
    const chatButton = document.getElementById('chat-button');
    const scrollToBottomButton = document.getElementById('scroll-to-bottom');

    //新增聊天內容
    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        const test = 'user10';
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'enter-content';
            messageElement.innerHTML = `
                <img src="../image/ele.jpg" alt="avatar">
                <div class="enter-name">${test}</div>
                <div class="message-content">${messageText}</div>
            `;
            contentContainer.prepend(messageElement);
            messageInput.value = '';
        }
    });

    // 模擬使用者資訊
    const users = {
        'user1': { name: 'User One', img: 'path/to/user1.jpg' },
        'user2': { name: 'User Two', img: 'path/to/user2.jpg' }
    };
    
    //訊息點選頭像彈跳視窗
    contentContainer.addEventListener('click', function(event) {
      console.log(event.target.tagName);
      console.log(event.target.dataset.userId);
      userInfoPopup.style.display = 'block';
        
    });

    // 點擊其他區域隱藏彈跳視窗
    window.addEventListener('click', function(event) {
        if (event.target !== userInfoPopup && !userInfoPopup.contains(event.target) && event.target.tagName !== 'IMG') {
            userInfoPopup.style.display = 'none';
        }
    });
    
    //1.1聊天室
    chatButton.addEventListener('click', function() {
        alert('開始聊天!');
    });

    // 監聽新訊息加入事件，顯示跳轉按鈕
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                scrollToBottomButton.style.display = 'block';
            }
        });
    });

    observer.observe(contentContainer, { childList: true });

    // 跳轉到底部
    scrollToBottomButton.addEventListener('click', function() {
        contentContainer.scrollTop = contentContainer.scrollHeight;
        scrollToBottomButton.style.display = 'none'; // 隱藏按鈕
    });

    // 初始滾動到底部
    contentContainer.scrollTop = contentContainer.scrollHeight;
});