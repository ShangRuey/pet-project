// 選取所有主分類旁的箭頭
  const toggles = document.querySelectorAll(".fa-solid.fa-v");

  toggles.forEach(toggle => {
  toggle.addEventListener("click", function() {
    // 找到當前箭頭的父級元素裡的子分類
    const subNav = this.nextElementSibling;

    // 切換子分類的顯示狀態
    if (subNav.style.display === "block") {
      subNav.style.display = "none";
      this.classList.remove("fa-chevron-up");
      this.classList.add("fa-v"); // 恢復向下箭頭
    } else {
      subNav.style.display = "block";
      this.classList.remove("fa-v");
      this.classList.add("fa-chevron-up"); // 切換為向上箭頭
    }
  });
});

/*RWD 導覽列*/
const toggleButton = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContainer = document.querySelector('.main-container');

    // 點擊按鈕顯示或隱藏側邊欄
    toggleButton.addEventListener('click', function(event) {
      event.stopPropagation();  // 阻止事件冒泡，防止點擊按鈕時觸發關閉
      sidebar.classList.toggle('active');
    });

    // 點擊主區域時隱藏側邊欄
    document.addEventListener('click', function(event) {
      // 檢查點擊是否發生在側邊欄和按鈕之外
      if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.classList.remove('active');
      }
    });

    // 防止點擊側邊欄時關閉側邊欄
    sidebar.addEventListener('click', function(event) {
      event.stopPropagation();  // 阻止事件冒泡
    });

//圖片牆
const images = document.querySelectorAll('.wall-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImageIndex = 0;
let interval;

// 初始化時隱藏所有圖片，並顯示第一張
function initializeImages() {
  images.forEach((img, i) => {
    img.style.opacity = '0'; // 隱藏所有圖片
  });
  images[0].style.opacity = '1'; // 顯示第一張圖片
}

function showImage(index) {
  images.forEach((img, i) => {
    img.style.opacity = i === index ? '1' : '0'; // 顯示當前圖片，隱藏其他圖片
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
}

// 自動切換圖片
function startSlideshow() {
  interval = setInterval(nextImage, 5000); // 每5秒切換一張圖片
}

// 確保圖片在初始化時不顯示錯誤
initializeImages();
startSlideshow();

nextBtn.addEventListener('click', () => {
  nextImage();
  clearInterval(interval); // 切換時暫停自動播放
  startSlideshow(); // 再次啟動自動播放
});

prevBtn.addEventListener('click', () => {
  prevImage();
  clearInterval(interval);
  startSlideshow();
});