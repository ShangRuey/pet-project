/// 設定 DOM 變數
const navBar = document.querySelector(".nav-bar");

// 定義頁面跳轉函數
function navigateTo(url) {
  window.location.href = url;
}

// 生成 header 內容
function displayHeader() {
  navBar.innerHTML = `
    <div class="logo-container">
      <p class="logo-item">
        <img src="../image/dog.png" class="logo-item" alt="logo" />BlackDog
      </p>
    </div>
    <div class="function-column">
      <div class="menu-toggle">        
        <p class="menu-login">登入</p>
        <p class="menu-register">註冊</p>
      </div>
      <div class="menu-items">
        <div class="pet-shop">用品商店</div>
        <div class="friendly-map">友善地圖</div>
        <div class="pet-adopt">認養相關</div>
        <div class="pet-community">狗狗社群</div>
        <div class="member-center">會員中心</div>
      </div>
    </div>`;
}

displayHeader();

// 事件處理函數
function handleNavigation(event) {
  const className = event.target.className;

  switch (className) {
    case "logo-item":
      navigateTo("./index.html");
      break;
    case "pet-shop":
      navigateTo("./shop.html");
      break;
    case "friendly-map":
      navigateTo("./map.html");
      break;
    case "pet-adopt":
      navigateTo("./adopt.html");
      break;
    case "pet-community":
      navigateTo("./community.html");
      break;
    case "member-center":
      navigateTo("./member.html");
      break;
    case "menu-login":
      navigateTo("./login.html");
      break;
    case "menu-register":
      navigateTo("./register.html");
      break;  
    default:
      console.log("nothing");
  }
}

// 事件委託: 將事件監聽添加到 navBar
navBar.addEventListener("click", handleNavigation);