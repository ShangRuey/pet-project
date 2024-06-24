document.addEventListener('DOMContentLoaded', function () {
      const menuItems = document.querySelectorAll('.menu-item');
      const contentTitle = document.getElementById('content-title');
      const contentBody = document.querySelector('.content-body');
      const modal = document.getElementById("modal");
      const closeBtn = document.querySelector(".close");
      const modalTitle = document.getElementById("modal-title");
      const modalProducts = document.getElementById("modal-products");
      const modalTotalPrice = document.getElementById("modal-total-price");
      const modalMethod = document.getElementById("modal-method");
      const modalTime = document.getElementById("modal-time");

//通用 Start--------------------------------------------------------
//動態渲染網頁功能
const contentMap = {
              profile: {
                title: '修改會員資料',
                body: `
                  <form class="update-form">
                    <label class="update-label">會員ID：</label>
                    <input class="update-input" type="text">
                    <label class="update-label">密碼：</label>
                    <input class="update-input" type="text">
                    <button class="update-btn">更改密碼</button>
                    <label class="update-label">電子郵件：</label>
                    <input class="update-input" type="text">
                    <button class="update-btn">更改電子郵件</button>
                    <label class="update-label">手機：</label>
                    <input class="update-input" type="text">
                    <button class="update-btn">更改手機號碼</button>
                    <label class="update-label">城市</label>
                    <select class="update-select" required>
                      <option value="" selected>選擇城市</option>
                      <option value="">預設1</option>
                    </select>
                    <label class="update-label">區</label>
                    <select class="update-select" required>
                      <option value="">選擇區</option>
                      <option value="">預設1</option>
                    </select>
                    <label class="update-label">路</label>
                    <select class="update-select" required>
                      <option value="">選擇路</option>
                      <option value="">預設1</option>
                    </select>
                    <label class="update-label">詳細地址</label>
                    <input type="text" class="update-input" id="address" maxlength="12" pattern="[\u4e00-\u9fa5A-Za-z0-9]+" required/>
                    <button class="update-btn" type="submit">修改</button>
                  </form>
                `
              },
              community: {
                title: '社群追蹤',
                body: `
                  <div class="followers-list">
  <!-- 动态渲染追踪名单 -->
</div>
<div class="pagination-controls">
  <button id="prev-follower-page">上一頁</button>
  <span id="follower-pagination-buttons"></span>
  <button id="next-follower-page">下一頁</button>
</div>
                `
              },
              orders: {
                title: '交易紀錄',
                body: `
                  <div class="trade-container">
                    <div class="trade-content"></div>
                    <div class="pagination-controls">
                      <button id="prev-page">上一頁</button>
                      <span id="pagination-buttons"></span>
                      <button id="next-page">下一頁</button>
                    </div>
                  </div>
                `
              }
            };

// 監聽 aside 功能點選
       menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentKey = item.getAttribute('data-content');
            const content = contentMap[contentKey];
            if (content) {
                contentTitle.textContent = content.title;
                contentBody.innerHTML = content.body;
                if (contentKey === 'orders') {
                    renderTransactions(currentPage);
                } else if (contentKey === 'community') {
                    renderFollowers(currentPage);
                }
            }
        });
    });
//通用 End--------------------------------------------------------

//交易紀錄 Start--------------------------------------------------------

//模擬詳細交易筆數
      const transactions = [
        { id: 1, products: [{ description: '商品1', price: 50 }, { description: '商品2', price: 50 }], time: '2024-01-01 10:00', method: '信用卡' },
        { id: 2, products: [{ description: '商品3', price: 100 }, { description: '商品4', price: 100 }], time: '2024-01-02 11:00', method: '信用卡' },
        { id: 3, products: [{ description: '商品5', price: 150 }, { description: '商品6', price: 150 }], time: '2024-01-03 12:00', method: '信用卡' },
        { id: 4, products: [{ description: '商品7', price: 200 }, { description: '商品8', price: 200 }], time: '2024-01-04 13:00', method: '信用卡' },
        { id: 5, products: [{ description: '商品9', price: 250 }, { description: '商品10', price: 250 }], time: '2024-01-05 14:00', method: '信用卡' },
        { id: 6, products: [{ description: '商品11', price: 300 }, { description: '商品12', price: 300 }], time: '2024-01-06 15:00', method: '信用卡' },
        { id: 7, products: [{ description: '商品13', price: 350 }, { description: '商品14', price: 350 }], time: '2024-01-07 16:00', method: '信用卡' },
        { id: 8, products: [{ description: '商品15', price: 400 }, { description: '商品16', price: 400 }], time: '2024-01-08 17:00', method: '信用卡' },
        { id: 9, products: [{ description: '商品17', price: 450 }, { description: '商品18', price: 450 }], time: '2024-01-09 18:00', method: '信用卡' },
        { id: 10, products: [{ description: '商品19', price: 500 }, { description: '商品20', price: 500 }], time: '2024-01-10 19:00', method: '信用卡' },
        { id: 11, products: [{ description: '商品21', price: 550 }, { description: '商品22', price: 550 }], time: '2024-01-11 10:00', method: '信用卡' },
        { id: 12, products: [{ description: '商品23', price: 600 }, { description: '商品24', price: 600 }], time: '2024-01-12 11:00', method: '信用卡' },
        { id: 13, products: [{ description: '商品25', price: 650 }, { description: '商品26', price: 650 }], time: '2024-01-13 12:00', method: '信用卡' },
        { id: 14, products: [{ description: '商品27', price: 700 }, { description: '商品28', price: 700 }], time: '2024-01-14 13:00', method: '信用卡' },
        { id: 15, products: [{ description: '商品29', price: 750 }, { description: '商品30', price: 750 }], time: '2024-01-15 14:00', method: '信用卡' },
        { id: 16, products: [{ description: '商品31', price: 800 }, { description: '商品32', price: 800 }], time: '2024-01-16 15:00', method: '信用卡' },
        { id: 17, products: [{ description: '商品33', price: 850 }, { description: '商品34', price: 850 }], time: '2024-01-17 16:00', method: '信用卡' },
        { id: 18, products: [{ description: '商品35', price: 900 }, { description: '商品36', price: 900 }], time: '2024-01-18 17:00', method: '信用卡' },
        { id: 19, products: [{ description: '商品37', price: 950 }, { description: '商品38', price: 950 }], time: '2024-01-19 18:00', method: '信用卡' },
        { id: 20, products: [{ description: '商品39', price: 1000 }, { description: '商品40', price: 1000 }], time: '2024-01-20 19:00', method: '信用卡' }
      ];

//當前頁面
      let currentPage = 1;
// 第一次渲染
      renderTransactions(currentPage);
//每頁渲染筆數
      const recordsPerPage = 6;
// 渲染交易紀錄
      function renderTransactions(page) {
        const tradeContent = document.querySelector('.trade-content');
        if (!tradeContent) return;

        tradeContent.innerHTML = '';
        const start = (page - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const pageTransactions = transactions.slice(start, end);

        pageTransactions.forEach((transaction, index) => {
          const perTrade = document.createElement('div');
          perTrade.classList.add('per-trade');

          const tradeNumber = document.createElement('div');
          tradeNumber.classList.add('trade-number');
          tradeNumber.textContent = start + index + 1;

          const tradeDesc = document.createElement('div');
          tradeDesc.classList.add('trade-desc');
          tradeDesc.textContent = `共 ${transaction.products.length} 件商品`;

          const tradeTime = document.createElement('div');
          tradeTime.classList.add('trade-time');
          tradeTime.textContent = transaction.time;

          perTrade.appendChild(tradeNumber);
          perTrade.appendChild(tradeDesc);
          perTrade.appendChild(tradeTime);

          tradeContent.appendChild(perTrade);
        });

        updatePagination(page);
      }

// 更新分頁
      function updatePagination(currentPage) {
        const totalPages = Math.ceil(transactions.length / recordsPerPage);
        const paginationButtons = document.getElementById('pagination-buttons');
        if (!paginationButtons) return;

        paginationButtons.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement('button');
          button.classList.add('pagination-button');
          button.textContent = i;
          button.disabled = i === currentPage;
          button.addEventListener('click', () => {
            currentPage = i;
            renderTransactions(currentPage);
          });
          paginationButtons.appendChild(button);
        }

        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages;

        document.getElementById('prev-page').addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            renderTransactions(currentPage);
          }
        });

        document.getElementById('next-page').addEventListener('click', () => {
          if (currentPage < totalPages) {
            currentPage++;
            renderTransactions(currentPage);
          }
        });
      }
// 點擊 .per-trade 跳出詳細視窗
      document.addEventListener('click', function(event) {
        const target = event.target.closest('.per-trade');
        if (target) {
          const index = parseInt(target.querySelector('.trade-number').textContent) - 1;
          const transaction = transactions[index];

          // 顯示詳細交易訊息
          modalTitle.textContent = '交易詳細資訊';
          modalProducts.innerHTML = transaction.products.map(product => `<p>${product.description}: $${product.price}</p>`).join('');
          const totalPrice = transaction.products.reduce((total, product) => total + product.price, 0);
          modalTotalPrice.textContent = `總價格: $${totalPrice}`;
          modalMethod.textContent = `交易方式: ${transaction.method}`;
          modalTime.textContent = `交易日期: ${transaction.time}`;

          modal.style.display = "block";
        }
      });

// 關閉詳細交易視窗
      closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
      });

//通用 End--------------------------------------------------------

//追蹤名單 Start--------------------------------------------------------

//模擬追蹤者資料
const followers = [
        { id: 1, name: '追蹤者1', avatar: '../image/adopt.png', isFollowed: true },
        { id: 2, name: '追蹤者2', avatar: '../image/adopt.png', isFollowed: false },
        { id: 3, name: '追蹤者3', avatar: '../image/adopt.png', isFollowed: true },
        { id: 4, name: '追蹤者4', avatar: '../image/adopt.png', isFollowed: false },
        { id: 5, name: '追蹤者5', avatar: '../image/adopt.png', isFollowed: true },
        { id: 6, name: '追蹤者6', avatar: '../image/adopt.png', isFollowed: false },
        { id: 7, name: '追蹤者1', avatar: '../image/adopt.png', isFollowed: true },
        { id: 8, name: '追蹤者2', avatar: '../image/adopt.png', isFollowed: false },
        { id: 9, name: '追蹤者3', avatar: '../image/adopt.png', isFollowed: true },
        { id: 10, name: '追蹤者4', avatar: '../image/adopt.png', isFollowed: false },
        { id: 11, name: '追蹤者5', avatar: '../image/adopt.png', isFollowed: true },
        { id: 12, name: '追蹤者6', avatar: '../image/adopt.png', isFollowed: false },
        { id: 13, name: '追蹤者1', avatar: '../image/adopt.png', isFollowed: true },
        { id: 14, name: '追蹤者2', avatar: '../image/adopt.png', isFollowed: false },
        { id: 15, name: '追蹤者3', avatar: '../image/adopt.png', isFollowed: true },
        { id: 16, name: '追蹤者4', avatar: '../image/adopt.png', isFollowed: false },
        { id: 17, name: '追蹤者5', avatar: '../image/adopt.png', isFollowed: true },
        { id: 18, name: '追蹤者6', avatar: '../image/adopt.png', isFollowed: false }
      ];

//渲染 追蹤者
const followersPerPage = 12;
renderFollowers(1);


function renderFollowers(page) {
    const followersList = document.querySelector('.followers-list');
    if (!followersList) return;

    followersList.innerHTML = '';
    const start = (page - 1) * followersPerPage;
    const end = start + followersPerPage;
    const pageFollowers = followers.slice(start, end);

    pageFollowers.forEach(follower => {
        const followerDiv = document.createElement('div');
        followerDiv.classList.add('follower');

        const avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = follower.avatar;

        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = follower.name;

        const followButton = document.createElement('button');
        followButton.classList.add('follow-button');
        followButton.textContent = follower.isFollowed ? '取消追蹤' : '追蹤';
        followButton.addEventListener('click', () => {
            follower.isFollowed = !follower.isFollowed;
            followButton.textContent = follower.isFollowed ? '取消追蹤' : '追蹤';
        });

        followerDiv.appendChild(avatar);
        followerDiv.appendChild(name);
        followerDiv.appendChild(followButton);

        followersList.appendChild(followerDiv);
    });

    updateFollowerPagination(page);
}


function updateFollowerPagination(currentPage) {
    const totalPages = Math.ceil(followers.length / followersPerPage);
    const paginationButtons = document.getElementById('follower-pagination-buttons');
    if (!paginationButtons) return;

    paginationButtons.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('pagination-button');
        button.textContent = i;
        button.disabled = i === currentPage;
        button.addEventListener('click', () => {
            renderFollowers(i);
        });
        paginationButtons.appendChild(button);
    }

    document.getElementById('prev-follower-page').disabled = currentPage === 1;
    document.getElementById('next-follower-page').disabled = currentPage === totalPages;

    document.getElementById('prev-follower-page').addEventListener('click', () => {
        if (currentPage > 1) {
            renderFollowers(currentPage - 1);
        }
    });

    document.getElementById('next-follower-page').addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderFollowers(currentPage + 1);
        }
    });
}


//追蹤名單 End--------------------------------------------------------
    });