//設定 dom 變數
const logoContainer = document.querySelector(".logo-container");
const menuItems = document.querySelector(".menu-items");
const connection = document.querySelector(".connection");
const menuToggle = document.querySelector(".menu-toggle");
/*----------------------------Header----------------------------*/

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

//test RWD

/*----------------------------Header----------------------------*/

/*----------------------------Main----------------------------*/

/*----------------------------Main----------------------------*/

/*----------------------------Footer----------------------------*/
function findClass(arr1, arr2) {
  return arr1.find((value) => arr2.includes(value));
}

connection.addEventListener("click", (t) => {
  const classList = Array.from(t.target.classList);
  const targetClasses = ["fb-icon", "mail-icon", "line-icon"];

  const result = findClass(classList, targetClasses);

  switch (result) {
    case "fb-icon":
      window.location.href = "https://www.facebook.com/?locale=zh_TW";
      break;
    case "line-icon":
      window.location.href = "https://line.me/tw/";
      break;
    case "mail-icon":
      window.location.href =
        "https://www.google.com/intl/zh-TW_tw/gmail/about/";
      break;
    default:
      console.log("nothing");
  }
});
/*----------------------------Footer----------------------------*/
