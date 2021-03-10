let hospitalData = [];
let pageData = [];

//DOM
const selectZone = document.getElementById("selectZone");
const hospitalCard = document.getElementById("hospitalCard");
const pageId = document.getElementById("pageid");

//監聽
selectZone.addEventListener("change", compliedData, false);
pageid.addEventListener("click", switchPage);

$.ajax({
  type: "get",
  url: "js/animal_hospital.json",
  data: "data",
  dataType: "json",
  success: function (response) {
    hospitalData = response;
    addZoneOption();
  },
});

function addZoneOption() {
  let zoneFilter = [];
  hospitalData.forEach((element) => {
    zoneFilter.push(element.縣市);
  });
  let noRepeatZone = Array.from(new Set(zoneFilter));
  selectZone.innerHTML = `<option value="">-- 請選擇縣市 --</option>`;
  for (let i = 0; i < noRepeatZone.length; i++) {
    selectZone.innerHTML += `<option value="${noRepeatZone[i]}">${noRepeatZone[i]}</option>`;
  }
}

function compliedData() {
  pageData = []
  let selected = selectZone.value;
  for (let i = 0; i < hospitalData.length; i++) {
    if (selected == hospitalData[i].縣市) {
      pageData.push(hospitalData[i]);
    }
  }
  pagination(pageData, 1);
}

function pagination(pageData, nowPage) {
  const dataTotal = pageData.length;
  const perpage = 30;
  const pageTotal = Math.ceil(dataTotal / perpage);

  let currentPage = nowPage;
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }

  const minData = currentPage * perpage - perpage + 1;
  const maxData = currentPage * perpage;
  const data = [];

  pageData.forEach((item, index) => {
    const num = index + 1;
    if (num >= minData && num <= maxData) {
      data.push(item);
    }
  });
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
  };
  displayData(data);
  pageBtn(page);
}

function displayData(data) {
  hospitalCard.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    hospitalCard.innerHTML += `
          <div class="row col col-sm-12 col-md-6 col-lg-4 py-3">
          <div class="card ftco-animate fadeInUp ftco-animated">
          <div class="card-body">
            <h3 class="card-title">${data[i].機構名稱}</h5><hr/>
            <span class="flaticon-phone-call text-left mr-2"></span><p class="card-text"><a href="tel:${data[i].機構電話}">${data[i].機構電話}</p></a>
            <span class="flaticon-maps-and-flags text-left mr-2"></span><p class="card-text"><a target="_blank" href="http://www.google.com/search?q=${data[i].機構地址}">${data[i].機構地址}</p></a>
          </div>
        </div>
        </div>`;
  }
}

function pageBtn(page) {
  let str = "";
  const total = page.pageTotal;

  if (page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) - 1
    }">&lt;</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">&lt;</span></li>`;
  }

  for (let i = 1; i <= total; i++) {
    if (Number(page.currentPage) === i) {
      str += `<li class="page-item active disable"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str += `<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}">${i}</a></li>`;
    }
  }

  if (page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) + 1
    }">&gt;</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">&gt;</span></li>`;
  }
  pageid.innerHTML = str;
}

function switchPage(e) {
  e.preventDefault();
  if (e.target.nodeName !== "A") return;
  const page = e.target.dataset.page;
  pagination(pageData, page);
  window.scrollTo(0,500) ;
}
