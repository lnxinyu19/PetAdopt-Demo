// 全域使用變數
let jsonData = [];
let noRepeatPlace = [];
let pageData = []; //存放點選需顯示的分頁資料


// 綁定DOM
const cityOption = document.getElementById("selectCity");
const areaOption = document.getElementById("selectArea");

// 監聽事件
cityOption.addEventListener("change", creatAreaOption, false);
areaOption.addEventListener("change", showData, false);

// AJAX
$.ajax({
  type: "get",
  url: "js/data.json",
  data: "data",
  dataType: "json",
  success: function (response) {
    jsonData = response;
    creatCityOption();

  },
});

function creatCityOption() {
  let placeFilter = []; // 存放所有的動物之家地點使用
  // 存放不重複的動物之家地點
  for (let i = 0; i < jsonData.length; i++) {
    placeFilter.push(jsonData[i].animal_place);
  }
  noRepeatPlace = Array.from(new Set(placeFilter.sort()));
  //預設選單內容
  let cityStr = `<option value="">請選擇縣市</option>`;
  let citySelect = [];
  for (let i = 0; i < noRepeatPlace.length; i++) {
    let city = noRepeatPlace[i];
    citySelect.push(city.substr(0, 3)); //取前三個字放入陣列內
    citySelect = citySelect.filter(function (element, index, arr) {
      return arr.indexOf(element) === index; //回傳不重複的陣列值
    });
  }
  for (let i = 0; i < citySelect.length; i++) {
    cityStr += `<option value="${citySelect[i]}">${citySelect[i]}</option>`;
    cityOption.innerHTML = cityStr;
  }
}

function creatAreaOption() {
  let placeOption = [];
  placeOption[0] = ["南投縣公立動物收容所"];
  placeOption[1] = ["嘉義市動物保護教育園區"];
  placeOption[2] = ["嘉義縣流浪犬中途之家"];
  placeOption[3] = ["基隆市寵物銀行"];
  placeOption[4] = ["宜蘭縣流浪動物中途之家"];
  placeOption[5] = ["屏東縣公立犬貓中途之家"];
  placeOption[6] = ["彰化縣流浪狗中途之家"];
  placeOption[7] = [
    "新北市三芝區公立動物之家",
    "新北市中和區公立動物之家",
    "新北市五股區公立動物之家",
    "新北市八里區公立動物之家",
    "新北市政府動物保護防疫處",
    "新北市新店區公立動物之家",
    "新北市板橋區公立動物之家",
    "新北市淡水區公立動物之家",
    "新北市瑞芳區公立動物之家",
  ];
  placeOption[8] = ["新竹市動物保護教育園區"];
  placeOption[9] = ["新竹縣公立動物收容所"];
  placeOption[10] = ["桃園市動物保護教育園區"];
  placeOption[11] = ["澎湖縣流浪動物收容中心"];
  placeOption[12] = ["臺中市動物之家南屯園區"];
  placeOption[13] = ["臺北市動物之家"];
  placeOption[14] = ["臺南市動物之家善化站", "臺南市動物之家灣裡站"];
  placeOption[15] = ["臺東縣動物收容中心"];
  placeOption[16] = ["花蓮縣流浪犬中途之家"];
  placeOption[17] = ["苗栗縣生態保育教育中心(動物收容所)"];
  placeOption[18] = ["連江縣流浪犬收容中心"];
  placeOption[19] = ["金門縣動物收容中心"];
  placeOption[20] = ["雲林縣流浪動物收容所"];
  placeOption[21] = ["高雄市壽山動物保護教育園區"];
  let index = cityOption.selectedIndex - 1;
  let areaStr = `<option value="">----  請選擇地點  ----</option>`;
  for (let i = 0; i < placeOption[index].length; i++) {
    areaStr += `<option value="${placeOption[index][i]}">${placeOption[index][i]}</option>`;
  }
  areaOption.innerHTML = areaStr;
}

function showData() {
  let selected = areaOption.value;
  let cardInfo = document.getElementById("animalCard");
  let areaInfo = document.getElementById("areaInfo");
  cardInfo.innerHTML = ""; //每次區域變化將資料清空
  areaInfo.innerHTML = "";
  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].animal_sex === "M") {
      jsonData[i].animal_sex = "男生";
    } else {
      jsonData[i].animal_sex = "女生";
    }
    if (selected === jsonData[i].animal_place) {
      pageData.push(jsonData[i])
      // cardInfo.innerHTML += `
      //   <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated" >
      //   <div class="staff">
      //     <div class="img-wrap d-flex align-items-stretch">
      //       <div class="img align-self-stretch" style="background-image: url(${jsonData[i].album_file});"></div>
      //     </div>
      //     <div class="text pt-3 px-3 pb-4 text-center">
      //       <h3>我的號碼是：${jsonData[i].animal_id}</h3>
      //       <span class="position mb-2">種類：${jsonData[i].animal_kind}${jsonData[i].animal_kind}</span>
      //       <div class="faded">
      //         <p>我是${jsonData[i].animal_sex}</p>
      //         <p>顏色：${jsonData[i].animal_colour}</p>
      //         <span>建檔時間：${jsonData[i].animal_createtime}</span>
      //       </div>
      //     </div>
      //   </div>
      // </div>`;
      // areaInfo.innerHTML = `<h4>聯絡資訊</h4>
      // <span class="flaticon-phone-call mr-2"></span><a href="tel:${jsonData[i].shelter_tel}">${jsonData[i].shelter_tel}</a>
      // <br>
      // <span class="flaticon-maps-and-flags mr-2"></span><a target="_blank" href="http://www.google.com/search?q=${jsonData[i].shelter_address}">${jsonData[i].shelter_address}</a>`;
    }
    // 如果未提供照片，則出現未有照片
    if (jsonData[i].album_file === "") {
      jsonData[i].album_file = "/images/no_image.jpg";
    }
  }
  pagination(pageData,1)
}

function pagination(pageData, nowPage) {
  const dataTotal = pageData.length
  // 取得全部資料長度  
  // 設定要顯示在畫面上的資料數量
  // 預設每一頁只顯示 12 筆資料。
  const perpage = 12;
  
  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  const pageTotal = Math.ceil(dataTotal / perpage);
  
  // 當前頁數，對應現在當前頁數
  let currentPage = nowPage;
  
  // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
  // 所以要在寫入一個判斷避免這種狀況。
  // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
  // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況，例如：nowPage 突然發神經？！
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }
  
  // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
  const minData = (currentPage * perpage) - perpage + 1 ;
  const maxData = (currentPage * perpage) ;
  
  // 先建立新陣列
  const data = [];
  // 這邊將會使用 ES6 forEach 做資料處理
  // 首先必須使用索引來判斷資料位子，所以要使用 index
  pageData.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if ( num >= minData && num <= maxData) {
      data.push(item);
    }
  })
  // 用物件方式來傳遞資料
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
  }
  displayData(data)
  pageBtn(page);
}

function displayData(data) {
  let cardInfo = document.getElementById("animalCard");
  let str = ''
  data.forEach((item) => {
    str += 
     `<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated" >
      <div class="animalInfo">
        <div class="img-wrap d-flex align-items-stretch">
          <div class="img align-self-stretch" style="background-image: url(${item.album_file});"></div>
        </div>
        <div class="text pt-3 px-3 pb-4 text-center">
          <h3>我的號碼是：${item.animal_id}</h3>
          <span class="position mb-2">種類：${item.animal_kind}${item.animal_kind}</span>
          <div class="faded">
            <p>我是${item.animal_sex}</p>
            <p>顏色：${item.animal_colour}</p>
            <span>建檔時間：${item.animal_createtime}</span>
          </div>
        </div>
      </div>
    </div>`;
    cardInfo.innerHTML = str
    areaInfo.innerHTML = `<h4>聯絡資訊</h4>
    <span class="flaticon-phone-call mr-2"></span><a href="tel:${item.shelter_tel}">${item.shelter_tel}</a>
    <br>
    <span class="flaticon-maps-and-flags mr-2"></span><a target="_blank" href="http://www.google.com/search?q=${item.shelter_address}">${item.shelter_address}</a>`;
  });
  // cardInfo.innerHTML = str;
}

const pageId = document.getElementById('pageid');

function pageBtn (page){
  let str = '';
  const total = page.pageTotal;
  
  if(page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">&lt;</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">&lt;</span></li>`;
  }
  

  for(let i = 1; i <= total; i++){
    if(Number(page.currentPage) === i) {
      str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
  };

  if(page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">&gt;</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">&gt;</span></li>`;
  }

  pageid.innerHTML = str;
}

function switchPage(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A') return;
  const page = e.target.dataset.page;
  pagination(pageData, page);
}

pageid.addEventListener('click', switchPage);