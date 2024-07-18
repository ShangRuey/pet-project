//設定 dom 變數
const imageMapContainer = document.querySelector(".image-map-container");
const imageMapRwd = document.querySelector(".image-map-rwd");
const imageDog = document.querySelector(".image-dog");
const imageAdopt = document.querySelector(".image-adopt");
const imageMap = document.querySelector(".image-map");
const imageShop = document.querySelector(".image-shop");
const imageCommunity = document.querySelector(".image-community");


imageMapContainer.addEventListener("click", (e) =>{
  const target = e.target.className;

  switch(target){
    case 'image-dog':
      window.location.href="../html/member.html";
      break;
    case 'image-adopt':
      window.location.href="../html/adopt.html";
      break;
    case 'image-map':
      window.location.href="../html/map.html";
      break;
    case 'image-shop':
      window.location.href="../html/shop.html";
      break;
    case 'image-community':
      window.location.href="../html/community.html";
      break;
    default:
      break;        
  }
})

imageMapRwd.addEventListener("click", (e) =>{
  // 找到被點擊的最近的 .image-map-rwd-item 父元素
  const clickedItem = e.target.closest('.image-map-rwd-item');
  
  if (clickedItem) {
    // 根據項目的內容決定跳轉的頁面
    const text = clickedItem.querySelector('.map-rwd-des p').textContent;
    
    switch(text) {
      case '用品商店':
        window.location.href = "../html/shop.html";
        break;
      case '友善地圖':
        window.location.href = "../html/map.html";
        break;
      case '認養相關':
        window.location.href = "../html/adopt.html";
        break;
      case '狗狗社群':
        window.location.href = "../html/community.html";
        break;
      case '會員中心':
        window.location.href = "../html/member.html";
        break;
      default:
        break;
    }
  }
})