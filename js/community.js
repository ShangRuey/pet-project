 document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const contentContainer = document.querySelector('.content-container');
    const userInfoPopup = document.getElementById('user-info-popup');
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


    // 檢查是否需要顯示滾動按鈕的函數
    function checkScrollButton() {
        if (contentContainer.scrollHeight > contentContainer.clientHeight) {
            // 內容高度大於容器高度，表示有滾動條
            scrollToBottomButton.style.display = 'block';
        } else {
            scrollToBottomButton.style.display = 'none';
        }
    }

    // 初始檢查
    checkScrollButton();
    
    // 監聽新訊息加入事件
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                checkScrollButton();
            }
        });
    });

    observer.observe(contentContainer, { childList: true });

    // 監聽窗口大小變化
    window.addEventListener('resize', checkScrollButton);


    // 跳轉到底部
    scrollToBottomButton.addEventListener('click', function() {
        contentContainer.scrollTop = contentContainer.scrollHeight;
    });

    // 監聽滾動事件
    contentContainer.addEventListener('scroll', function() {
        // 如果已經滾動到底部，隱藏按鈕
        if (contentContainer.scrollHeight - contentContainer.scrollTop === contentContainer.clientHeight) {
            scrollToBottomButton.style.display = 'none';
        } else {
            checkScrollButton();
        }
    });
});