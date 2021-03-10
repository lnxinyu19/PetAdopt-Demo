let hospitalData = [];

const selectZone = document.getElementById('selectZone');
const pageId = document.getElementById("pageid");
const pagination = document.querySelector('.pagination')


selectZone.addEventListener('change',showPageBtn)

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

function showPageBtn() {
  let selected = selectZone.value;
  let pageData = [];
  for (let i = 0; i < hospitalData.length; i++) {
    if (selected == hospitalData[i].縣市) {
      pageData.push(i);
    }
  }
  const prePage = 20;
  const pageTotal = Math.ceil(pageData.length / prePage)
  for (let i = 1; i < pageTotal; i++) {
    pageId.innerHTML += `<li class="page-item"><span class="page-link" data-page=${i}>${i}</span></li>`
  }
}

