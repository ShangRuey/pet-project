//設定 dom 變數
const connection = document.querySelector(".connection");

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