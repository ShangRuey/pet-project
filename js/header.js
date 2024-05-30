//設定 dom 變數
const logoContainer = document.querySelector(".logo-container");
const menuItems = document.querySelector(".menu-items");
const menuToggle = document.querySelector(".menu-toggle");

//首頁logo 跳轉進首頁
logoContainer.addEventListener("click", (t) => {
  const className = t.target.className;
  className === "logo-item"
    ? (window.location.href = "./index.html")
    : console.log("nothing");
});

//導覽列各分頁跳轉
menuItems.addEventListener("click", (t) => {
  const className = t.target.className;

  switch (className) {
    case "pet-shop":
      window.location.href = "./shop.html";
      break;
    case "friendly-map":
      window.location.href = "./map.html";
      break;
    case "pet-adopt":
      window.location.href = "./adopt.html";
      break;
    case "pet-community":
      window.location.href = "./community.html";
      break;
    case "member-center":
      window.location.href = "./member.html";
      break;
    default:
      console.log("nothing");
  }
});