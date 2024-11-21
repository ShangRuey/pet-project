/*RWD 側邊欄*/
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