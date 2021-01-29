let jsonData = [];
let noRepeatPlace = [];

// 綁定DOM
const cityOption = document.getElementById("selectCity");
const areaOption = document.getElementById("selectArea");

// 監聽事件
// cityOption.addEventListener("change", creatAreaOption, false);
// areaOption.addEventListener("change", showData, false);

// AJAX
$.ajax({
  type: "get",
  url: "js/data.json",
  data: "data",
  dataType: "json",
  success: function (response) {
    jsonData = response;
    creatAreaOption
  },
});

//建立分頁
function pagination(jsonData, nowPage) {
    // 取得全部資料長度
    const dataTotal = jsonData.length;

    // 設定要顯示在畫面上的資料數量
    // 預設每一頁只顯示 5 筆資料。
    const perpage = 12;

    // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
    // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
    const pageTotal = Math.ceil(dataTotal / perpage);
    console.log(dataTotal,pageTotal)
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
    const minData = currentPage * perpage - perpage + 1;
    const maxData = currentPage * perpage;

    // 先建立新陣列
    const data = [];
    // 這邊將會使用 ES6 forEach 做資料處理
    // 首先必須使用索引來判斷資料位子，所以要使用 index
    jsonData.forEach((item, index) => {
      // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
      const num = index + 1;
      // 這邊判斷式會稍微複雜一點
      // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
      if (num >= minData && num <= maxData) {
        data.push(item);
      }
    });
    // 用物件方式來傳遞資料
    const page = {
      pageTotal,
      currentPage,
      hasPage: currentPage > 1,
      hasNext: currentPage < pageTotal,
    };
    // console.log(data);
    displayData(data);
    pageBtn(page);
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
