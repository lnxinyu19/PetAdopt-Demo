let hospitalData = [];

//DOM
const selectZone = document.getElementById("selectZone");
const zoneID = document.getElementById("zoneID");
const hospitalCard = document.getElementById("hospitalCard");

//監聽
selectZone.addEventListener("change", hospitalInfo, false);

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
  hospitalCard.innerHTML = ''
  for (let i = 0; i < hospitalData.length; i++) {
    if (selected == hospitalData[i].縣市) {
      zoneID.innerHTML = selected;
      hospitalCard.innerHTML += `
      <div class="row col-lg-4 py-3">
      <div class="card ftco-animate fadeInUp ftco-animated">
      <div class="card-body">
        <h3 class="card-title text-center">${hospitalData[i].機構名稱}</h5>
        <p class="card-text"><span class="flaticon-phone-call mr-2"></span>${hospitalData[i].機構電話}</p>
        <p class="card-text"><span class="flaticon-maps-and-flags mr-2"></span>${hospitalData[i].機構地址}</p>
      </div>
    </div>
    </div>`;
    }
  }
}
