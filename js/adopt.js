// 獲取 .adopt-detail 元素
const adoptDetail = document.querySelector('.adopt-detail');
// 獲取 .adopt-content 元素
const adoptContent = document.querySelector('.adopt-content');
// 查詢按鈕
const searchBtn = document.querySelector('.search-btn');
// API URL
const apiUrl = 'https://data.moa.gov.tw/api/v1/AnimalRecognition/?animal_kind=%E7%8B%97&%24top=100&Page=1';
// 設置每頁顯示的 item 數量
const itemsPerPage = 8;
// 預設頁面
let currentPage = 1;
// 控制adoptDetail
let isDetailOpen = false;
// 接收API資料
let dataArray = [];
// 所屬縣市 id 對照表
const areaIdToChineseMap = {
   2:'臺北市',13:'雲林縣',3:'新北市',14:'嘉義縣',4:'基隆市',15:'嘉義市',5:'宜蘭縣',16:'臺南市',6:'桃園縣',17:'高雄市',7:'新竹縣',18:'屏東縣',8:'新竹市',19:'花蓮縣',9:'苗栗縣',20:'臺東縣',10:'臺中市',21:'澎湖縣',11:'彰化縣',22:'金門縣',12:'南投縣',23:'連江縣'
}
// 所屬收容所 id 對照表
const shelterIdToChineseMap = {
  48:'基隆市寵物銀行',71:'嘉義市流浪犬收容中心',49:'臺北市動物之家',72:'嘉義縣流浪犬中途之家',50:'新北市板橋區公立動物之家',73:'臺南市動物之家灣裡站',51:'新北市新店區公立動物之家',74:'臺南市動物之家善化站',53:'新北市中和區公立動物之家',75:'高雄市壽山動物保護教育園區',55:'新北市淡水區公立動物之家',76:'高雄市燕巢動物保護關愛園區',56:'新北市瑞芳區公立動物之家',77:'屏東縣流浪動物收容所',58:'新北市五股區公立動物之家',78:'宜蘭縣流浪動物中途之家',59:'新北市八里區公立動物之家',79:'花蓮縣流浪犬中途之家',60:'新北市三芝區公立動物之家',80:'臺東縣動物收容中心',61:'桃園市動物保護教育園區',81:'連江縣流浪犬收容中心',62:'新竹市動物收容所',82:'金門縣動物收容中心',63:'新竹縣動物收容所',83:'澎湖縣流浪動物收容中心',67:'臺中市動物之家南屯園區',89:'雲林縣流浪動物收容所',68:'臺中市動物之家后里園區',92:'新北市政府動物保護防疫處',69:'彰化縣流浪狗中途之家',96:'苗栗縣生態保育教育中心',70:'南投縣公立動物收容所' 
}
// 性別 id 對照表
const sexIdToChineseMap = {
  'M':'公','F':'母'
}
// 年紀 id 對照表
const ageIdToChinese = {
  'ADULT':'成年','CHILD':'幼年'
}
// 體型 id 對照表
const bodytypeToChineseMap = {
  'SMALL': '小型',
  'MEDIUM': '中型',
  'BIG': '大型'
}

// API串接 axios
axios
.get(apiUrl)
.then((res) => {
  dataArray = res.data.Data;
  console.log(dataArray);
  
  // 渲染 render-item
  renderItems(dataArray);

  // 初始化分页（增加这一行确保初始分页正确）
  initializePage(dataArray.length);

  // 選擇框選項
  populateSelect('area-select', areaIdToChineseMap);
  populateSelect('shelter-select', shelterIdToChineseMap);
  populateSelect('sex-select', sexIdToChineseMap);
  populateSelect('age-select', ageIdToChinese);

})
.catch((err) => {
  console.log(err);
})

// 查詢按鈕事件監聽器
searchBtn.addEventListener('click', () => {
  // 獲取選擇框的值
  const areaValue = document.querySelector('#area-select').value;
  const shelterValue = document.querySelector('#shelter-select').value;
  const sexValue = document.querySelector('#sex-select').value;
  const ageValue = document.querySelector('#age-select').value;

  // 篩選數據
  const filteredData = dataArray.filter( item => {
    const matchesArea = areaValue ? convertIdToChinese(item.animal_area_pkid) === areaValue : true;
    const matchesShelter = shelterValue ? convertShelterIdToChinese(item.animal_shelter_pkid) === shelterValue : true;
    const matchesSex = sexValue ? sexIdToChineseMap[item.animal_sex] === sexValue : true;
    const matchesAge = ageValue ? ageIdToChinese[item.animal_age] === ageValue : true;
    console.log('matchesArea：' + areaValue);

    return matchesArea && matchesShelter && matchesSex && matchesAge;
  });
  console.log('這是filteredData：' + filteredData);

  // 渲染篩選後的項目
  renderItems(filteredData);

  // 根據篩選後的數據更新分頁
  initializePage(filteredData.length);
});

// 動態渲染搜尋選項
function populateSelect(selectId, mapObject) {
  const select = document.querySelector(`#${selectId}`);

  select.innerHTML = '<option value="">請選擇</option>';
  console.log('mapObject：' + Object.entries(mapObject))
  for (const [value, text] of Object.entries(mapObject)) {
    const option = document.createElement('option');
    option.value = text;
    option.textContent = text;
    select.appendChild(option);
    console.log('option' + option.value)
  }
  
}

// 渲染 render-item 的function
function renderItems(data) {
  const adoptContent = document.querySelector('.adopt-content');
  adoptContent.innerHTML = ''; // 清空內容

  data.forEach(item => {
    const renderItem = document.createElement('div');
    renderItem.className = 'render-item';

    renderItem.innerHTML = `
      <div class="pet-img">
        <img src="${item.album_file || '../image/ele.jpg'}" alt="未知">
      </div>
      <span class="render-dog">性別：${sexIdToChineseMap[item.animal_sex] || '未知'}</span>
      <span class="render-dog">體型：${bodytypeToChineseMap[item.animal_bodytype] || '未知'}</span>
      <span class="render-dog">地點：${shelterIdToChineseMap[item.animal_shelter_pkid] || '未知'}</span>
    `;

    // 為新創建的元素添加事件監聽器qweqweqweqwe
    renderItem.addEventListener('click', (event) => {
      event.stopPropagation(); // 防止事件冒泡到 document
      renderDetail(item);
    });

    adoptContent.appendChild(renderItem);
  })
}

document.addEventListener('click', () => {
    closeAdoptDetail();
});

function openAdoptDetail() {
  adoptDetail.style.display = 'flex';
  isDetailOpen = true;
}

function closeAdoptDetail() {
  adoptDetail.style.display = 'none';
  isDetailOpen = false;
}

// 渲染 認養詳細資料 的 function
function renderDetail(item) {
  const detailContainer = document.querySelector('.detail-container');

  console.log('-------------START');
  console.log(item);
  console.log('-------------END');

  detailContainer.innerHTML = `
    <div class="detail-img">
      <img src="${item.album_file}" alt="寵物圖片">
    </div>
    <div class="detail-item">
      <div class="sub-title">動物狀態</div>
      <div class="sub-content">${item.animal_status || '未知'}</div>
      <div class="sub-title">收容編號</div>
      <div class="sub-content">${item.animal_subid || '未知'}</div>
      <div class="sub-title">體型</div>
      <div class="sub-content">${bodytypeToChineseMap[item.animal_bodytype]|| '未知'}</div>
      <div class="sub-title">性別</div>
      <div class="sub-content">${sexIdToChineseMap[item.animal_sex] || '未知'}</div>
      <div class="sub-title">毛色</div>
      <div class="sub-content">${item.animal_colour || '未知'}</div>
      <div class="sub-title">是否施打狂犬病疫苗</div>
      <div class="sub-content">${item.animal_bacterin || '未知'}</div>
      <div class="sub-title">所屬收容所名稱</div>
      <div class="sub-content">${shelterIdToChineseMap[item.animal_shelter_pkid] || '未知'}</div>
      <div class="sub-title">聯絡電話</div>
      <div class="sub-content">${item.shelter_tel || '未知'}</div>
      <div class="sub-title">地址</div>
      <div class="sub-content">${item.shelter_address || '未知'}</div>
    </div>
  `;

  // 顯示adopt-detail
  openAdoptDetail();

  adoptDetail.addEventListener('click', (event) => {
    event.stopPropagation();
  })
}

// 所屬縣市 id 轉換 文字 function
function convertIdToChinese(id) {
  return areaIdToChineseMap[id] || '未知';
}

// 所屬收容所 id 轉換 文字 function
function convertShelterIdToChinese(id) {
  return shelterIdToChineseMap[id] || '未知';
}

// 初始化頁面
function initializePage(filteredDataLength = 0) {
    const renderItems = document.querySelectorAll('.render-item');
    const totalItems = filteredDataLength || renderItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    showPage(currentPage);
    createPaginationButtons(totalPages);
    updateButtonStyles();
}

// 顯示指定頁碼的 items
function showPage(page) {
  const items = document.querySelectorAll('.render-item');
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  items.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// 創建分頁按鈕
function createPaginationButtons(totalPages) {
  const paginationContainer = document.querySelector('.pagination-container') || document.createElement('div');
  paginationContainer.className = 'pagination-container';
  paginationContainer.innerHTML = '';// 清空現有的按鈕

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      showPage(currentPage);
      updateButtonStyles();
    });
    paginationContainer.appendChild(button);
  }

  const adoptContent = document.querySelector('.adopt-content');
  if (!document.querySelector('.pagination-container')) {
    adoptContent.after(paginationContainer);
  }
}

// 更新按鈕樣式
function updateButtonStyles() {
  const buttons = document.querySelectorAll('.pagination-container button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}