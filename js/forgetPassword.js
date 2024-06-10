const forgetForm = document.querySelector('.forget-form');


forgetForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    
    // 1.驗證電子郵件有無存在資料庫
    verifyEmail(email).then(user => {
        if (user) {
            // 2. 提供驗證選項
            showVerificationOptions(user);
        } else {
            alert('電子郵件不存在，請重新輸入');
        }
    }).catch(error => {
        console.error('Error verifying email:', error);
    });
});

function verifyEmail(email) {
    // 模擬向伺服器發送request，驗證mail
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 返回response
            const mockDatabase = {
                'test@example.com': { email: 'test@example.com', phone: '0912345678' },
                'user@example.com': { email: 'user@example.com', phone: '0987654321' }
            };
            resolve(mockDatabase[email] || null);
        }, 1000);
    });
}

function showVerificationOptions(user) {
    const maskedPhone = maskPhoneNumber(user.phone);
    const container = document.querySelector('.forget-container');
    container.innerHTML = `
        <h2 class="forget-title">選擇驗證方式</h2>
        <div class="verification-options">
            <button class="verification-button" onclick="sendVerificationCode('email', '${user.email}')">通過電子郵件發送驗證</button>
            <button class="verification-button" onclick="sendVerificationCode('phone', '${user.phone}')">通過手機簡訊發送驗證 ${maskedPhone}</button>
        </div>
    `;
}

function maskPhoneNumber(phone) {
    return phone.slice(0, 4) + 'xxx' + phone.slice(-3);
}

function sendVerificationCode(method, contact) {
    // 發送驗證碼
    console.log(`Sending verification code via ${method} to ${contact}`);
    
    const container = document.querySelector('.forget-container');
    container.innerHTML = `
        <h2 class="forget-title">請輸入驗證碼</h2>
        <form class="verification-form" onsubmit="verifyCode(event)">
            <label for="code" class="forget-label">驗證碼</label>
            <input type="text" id="code" maxlength="10" class="forget-input" required />
            <button type="submit" class="forget-submit">下一步</button>
        </form>
    `;
}

function verifyCode(event) {
    event.preventDefault();
    const code = document.getElementById('code').value;
    
    // 模擬驗證碼對錯
    if (code === '123456') { // 假设 123456 是正確的驗證碼
        showResetPasswordForm();
    } else {
        alert('驗證碼錯誤，請重新輸入');
    }
}

function showResetPasswordForm() {
    const container = document.querySelector('.forget-container');
    container.innerHTML = `
        <h2 class="forget-title">重設密碼</h2>
        <form class="reset-password-form" onsubmit="resetPassword(event)">
            <label for="new-password" class="forget-label">輸入新密碼</label>
            <div class="new-password">大小寫字母或數字、長度在1-16字數</div>
            <input type="password" id="new-password" class="forget-input" maxlength="16" pattern="[A-Za-z0-9]{1,16}" required />
            <label for="confirm-password" class="forget-label">請再次輸入新密碼</label>
            <input type="password" id="confirm-password" class="forget-input" maxlength="16" pattern="[A-Za-z0-9]{1,16}" required />
            <button type="submit" class="forget-submit">修改</button>
        </form>
    `;
}

function resetPassword(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword === confirmPassword) {
        // 模拟重设密码请求
        console.log('Password reset successfully');
        alert('密碼重設成功');
        window.location.href="./login.html"
    } else {
        alert('兩次輸入的密碼不一致，請重新輸入');
    }
}