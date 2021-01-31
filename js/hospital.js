let hospitalData = [];
let pageData = [];

//DOM
const selectZone = document.getElementById("selectZone");
const hospitalCard = document.getElementById("hospitalCard");
// const pageId = document.getElementById("pageid");

//監聽
selectZone.addEventListener("change", hospitalInfo, false);
// pageid.addEventListener("click", switchPage);

$.ajax({
  type: "get",
  url: "js/animal_hospital.json",
  data: "data",
  dataType: "json",
  success: function (response) {
    hospitalData = response;
    zoneOption();
  },
});

function zoneOption() {
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
function hospitalInfo() {
  let selected = selectZone.value;
  hospitalCard.innerHTML = "";
  for (let i = 0; i < hospitalData.length; i++) {
    if (selected == hospitalData[i].縣市) {
      hospitalCard.innerHTML += `
      <div class="row col-sm-12 col-md-6 col-lg-4 py-3">
      <div class="card ftco-animate fadeInUp ftco-animated">
      <div class="card-body">
        <h3 class="card-title">${hospitalData[i].機構名稱}</h5><hr/>
        <span class="flaticon-phone-call text-left mr-2"></span><p class="card-text"><a href="tel:${hospitalData[i].機構電話}">${hospitalData[i].機構電話}</p></a>
        <span class="flaticon-maps-and-flags text-left mr-2"></span><p class="card-text"><a target="_blank" href="http://www.google.com/search?q=${hospitalData[i].機構地址}">${hospitalData[i].機構地址}</p></a>
      </div>
    </div>
    </div>`;
    }
  }
}
