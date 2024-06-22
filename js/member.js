document.addEventListener('DOMContentLoaded', function () {
  const memberContent = document.querySelector('.member-content');
  const menuItems = document.querySelectorAll('.menu-item');
  const contentTitle = document.getElementById('content-title');
  const contentBody = document.querySelector('.content-body');

  const contentMap = {
    profile: {
      title: '修改會員資料',
      body: ``
    },
    community: {
      title: '社群追蹤',
      body: '這裡是社群追蹤的內容。'
    },
    orders: {
      title: '訂單追蹤',
      body: '這裡是訂單追蹤的內容。'
    }
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const contentKey = item.getAttribute('data-content');
      const content = contentMap[contentKey];
      if (content) {
        contentTitle.textContent = content.title;
        contentBody.textContent = content.body;
      }
    });
  });
});