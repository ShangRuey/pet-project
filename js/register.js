document.addEventListener("DOMContentLoaded", () => {
  const emailVerifyBtn = document.getElementById("email-verify-btn");
  const emailCodeVerifyBtn = document.getElementById("email-code-verify-btn");
  const phoneVerifyBtn = document.getElementById("phone-verify-btn");
  const phoneCodeVerifyBtn = document.getElementById("phone-code-verify-btn");
  const errorMessageDiv = document.querySelector(".error-message");
  const emailVerificationIcon = document.getElementById("email-verification-icon");
  const phoneVerificationIcon = document.getElementById("phone-verification-icon");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const registerResult = document.getElementById('register-result');
  const form = document.getElementById("register-form");
  let emailAccess = false;
  let phoneAccess = false;

  // 事件監聽
  emailVerifyBtn.addEventListener("click", startEmailVerification);
  emailCodeVerifyBtn.addEventListener("click", verifyEmailCode);
  phoneVerifyBtn.addEventListener("click", startPhoneVerification);
  phoneCodeVerifyBtn.addEventListener("click", verifyPhoneCode);
  form.addEventListener("submit", registerSubmitFunc);

  // submit 確認
  function registerSubmitFunc(e) {
        e.preventDefault();
        if (form.checkValidity()) {
          if (emailAccess && phoneAccess) {
            registerResult.classList.remove('result-default');
            registerResult.innerText = '註冊成功';
            registerResult.classList.add('success');
            registerResult.classList.remove('error');
            window.location.href = "../html/login.html";
          } else {
            registerResult.innerText = '註冊失敗，請再次檢查';
            registerResult.classList.add('error');
            registerResult.classList.remove('success');
          }
        } else {
          form.reportValidity();  // 顯示表單驗證錯誤訊息
        }
      }

  // Email 發送驗證
  function startEmailVerification() {
    const emailValue = email.value;
    if (emailValue.includes("@")) {
      emailVerifyBtn.disabled = true;
      let timer = 5;
      emailVerifyBtn.innerText = `${timer}秒後重發`;
      const interval = setInterval(() => {
        timer--;
        emailVerifyBtn.innerText = `${timer}秒後重發`;
        if (timer === 0) {
          clearInterval(interval);
          emailVerifyBtn.innerText = "發送";
          emailVerifyBtn.disabled = false;
        }
      }, 1000);

      // 在這裡添加發送驗證碼到郵件的邏輯
      emailVerificationIcon.innerHTML = '<i class="fa fa-check success-icon">發送驗證</i>';
    } else {
      emailVerificationIcon.innerHTML = '<i class="fa fa-times error-icon">規格有誤</i>'
    }
  }

  // Email 進行驗證
  function verifyEmailCode() {
    const emailCode = document.getElementById("email-code").value;
    // 在這裡添加驗證碼驗證邏輯
    if (emailCode === "123456") { // 假設123456是正確的驗證碼
      emailVerificationIcon.innerHTML = '<span class="verify-success">驗證成功</span><i class="fa fa-check success-icon"></i>';
      emailAccess = true;
    } else {
      emailVerificationIcon.innerHTML = '<span class="verify-error">驗證錯誤</span><i class="fa fa-times error-icon"></i>';
      emailAccess = false;
      setTimeout(() => {
      emailVerificationIcon.innerHTML = '';
    }, 5000);
    }
    
  }

  // Phone 發送驗證
  function startPhoneVerification() {
    const phoneValue = phone.value;
    if (phoneValue.length === 10) {
      phoneVerifyBtn.disabled = true;
      let timer = 5;
      phoneVerifyBtn.innerText = `${timer}秒後重發`;
      const interval = setInterval(() => {
        timer--;
        phoneVerifyBtn.innerText = `${timer}秒後重發`;
        if (timer === 0) {
          clearInterval(interval);
          phoneVerifyBtn.innerText = "發送";
          phoneVerifyBtn.disabled = false;
        }
      }, 1000);

      // 在這裡添加發送驗證碼到手機的邏輯
      phoneVerificationIcon.innerHTML = '<i class="fa fa-check success-icon">發送驗證</i>';
    } else {
      phoneVerificationIcon.innerHTML = '<i class="fa fa-times error-icon">規格有誤</i>';
      setTimeout(() => {
        phoneVerificationIcon.innerHTML = '';
      }, 5000);
    }
  }

  // Phone 進行驗證
  function verifyPhoneCode() {
    const phoneCode = document.getElementById("phone-code").value;
    // 在這裡添加驗證碼驗證邏輯
    if (phoneCode === "123456") { // 假設123456是正確的驗證碼
      phoneVerificationIcon.innerHTML = '<span class="verify-success">驗證成功</span><i class="fa fa-check success-icon"></i>';
      phoneAccess = true;
    } else {
      phoneVerificationIcon.innerHTML = '<span class="verify-error">驗證錯誤</span><i class="fa fa-times error-icon"></i>';
      phoneAccess = false;
      setTimeout(() => {
      phoneVerificationIcon.innerHTML = '';
    }, 5000);
    }
  }
});