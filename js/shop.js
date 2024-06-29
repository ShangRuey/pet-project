document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const searchButton = document.getElementById('search-btn');
  const contentBody = document.getElementById('content-body');
  const paginationControls = document.getElementById('pagination-controls');
  let currentPage = 1;
  const itemsPerPage = 12;

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const subMenu = item.nextElementSibling;
      if (subMenu && subMenu.classList.contains('submenu')) {
        subMenu.classList.toggle('active');
      }
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      loadItems(item.dataset.content);
    });
  });

  searchButton.addEventListener('click', () => {
    const searchText = document.getElementById('content-title').value;
    loadItems('search', searchText);
  });

  function loadItems(category, searchText = '') {
    const allItems = generateMockData();
    let filteredItems = allItems.filter(item => {
      if (category === 'search') {
        return item.name.includes(searchText);
      }
      return item.category === category;
    });

    renderItems(filteredItems);
  }

  function renderItems(items) {
    contentBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const currentItems = items.slice(startIndex, endIndex);

    currentItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('product-item');
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="product-name">${item.name}</div>
        <div class="product-price">${item.price} 元</div>
        <div class="quantity-control">
          <button class="decrease-quantity">-</button>
          <input type="number" value="1" min="1">
          <button class="increase-quantity">+</button>
        </div>
        <button class="add-to-cart">加入購物車</button>
      `;
      contentBody.appendChild(itemDiv);
    });

    renderPagination(items.length);
  }

  function renderPagination(totalItems) {
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        loadItems(document.querySelector('.menu-item.active').dataset.content);
      });
      paginationControls.appendChild(button);
    }
  }

  function generateMockData() {
    return [
      { id: 1, name: '商品1', category: 'category1', price: 100, img: '../image/SampleProduct.png' },
      { id: 2, name: '商品2', category: 'category1-1', price: 200, img: '../image/SampleProduct.png' },
      // 更多模拟数据
    ];
  }

  loadItems('category1');
});
