document.addEventListener("DOMContentLoaded", () => {
  const emailVerifyBtn = document.getElementById("email-verify-btn");
  const emailCodeVerifyBtn = document.getElementById("email-code-verify-btn");
  const phoneVerifyBtn = document.getElementById("phone-verify-btn");
  const phoneCodeVerifyBtn = document.getElementById("phone-code-verify-btn");
  const errorMessageDiv = document.querySelector(".error-message");
  const emailVerificationIcon = document.getElementById("email-verification-icon");
  const phoneVerificationIcon = document.getElementById("phone-verification-icon");

  emailVerifyBtn.addEventListener("click", startEmailVerification);
  emailCodeVerifyBtn.addEventListener("click", verifyEmailCode);
  phoneVerifyBtn.addEventListener("click", startPhoneVerification);
  phoneCodeVerifyBtn.addEventListener("click", verifyPhoneCode);

  function startEmailVerification() {
    emailVerifyBtn.disabled = true;
    let timer = 10;
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
    emailVerificationIcon.innerHTML = '<i class="fa fa-check success-icon"></i>';
    setTimeout(() => {
      emailVerificationIcon.innerHTML = '';
    }, 5000);
  }

  function verifyEmailCode() {
    const emailCode = document.getElementById("email-code").value;
    // 在這裡添加驗證碼驗證邏輯
    if (emailCode === "123456") { // 假設123456是正確的驗證碼
      displayErrorMessage("郵件驗證成功", false);
      emailVerificationIcon.innerHTML = '<span class="verify-success">驗證成功</span><i class="fa fa-check success-icon"></i>';
    } else {
      displayErrorMessage("郵件驗證失敗", true);
      emailVerificationIcon.innerHTML = '<span class="verify-error">驗證錯誤</span><i class="fa fa-times error-icon"></i>';
    }
    setTimeout(() => {
      emailVerificationIcon.innerHTML = '';
    }, 5000);
  }

  function startPhoneVerification() {
    phoneVerifyBtn.disabled = true;
    let timer = 10;
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
    phoneVerificationIcon.innerHTML = '<i class="fa fa-check success-icon"></i>';
    setTimeout(() => {
      phoneVerificationIcon.innerHTML = '';
    }, 5000);
  }

  function verifyPhoneCode() {
    const phoneCode = document.getElementById("phone-code").value;
    // 在這裡添加驗證碼驗證邏輯
    if (phoneCode === "123456") { // 假設123456是正確的驗證碼
      displayErrorMessage("手機驗證成功", false);
      phoneVerificationIcon.innerHTML = '<span class="verify-success">驗證成功</span><i class="fa fa-check success-icon"></i>';
    } else {
      displayErrorMessage("手機驗證失敗", true);
      phoneVerificationIcon.innerHTML = '<span class="verify-error">驗證錯誤</span><i class="fa fa-times error-icon"></i>';
    }
    setTimeout(() => {
      phoneVerificationIcon.innerHTML = '';
    }, 5000);
  }

  function displayErrorMessage(message, isError) {
    errorMessageDiv.textContent = message;
    if (isError) {
      errorMessageDiv.classList.add("error");
    } else {
      errorMessageDiv.classList.remove("error");
    }
    setTimeout(() => {
      errorMessageDiv.textContent = '';
    }, 5000);
  }
});