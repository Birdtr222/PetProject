// 필요한 변수들
var map = null; // 지도 객체
var geocoder = null; // 주소-좌표 변환 객체
var marker = null; // 현재 마커
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 인포윈도우 객체

// 지도 초기화 함수
function initMap() {
  var mapContainer = document.getElementById("map"); // 지도를 표시할 div
  var mapOptions = {
    center: new kakao.maps.LatLng(37.5299749717494, 126.9968169506717), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

  // 지도 생성
  map = new kakao.maps.Map(mapContainer, mapOptions);
  geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성
}

// 사업장명 클릭 이벤트 핸들러
function handleItemClick(item) {
  var address = item.소재지전체주소;

  // 주소로 좌표를 검색
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐을 때
    if (status === kakao.maps.services.Status.OK) {
      // 기존 마커 제거
      if (marker) {
        marker.setMap(null);
      }

      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 마커 생성
      marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 인포윈도우 내용 설정
      var content = '<div style="padding:10px;">';
      content += "<div><strong>" + item.사업장명 + "</strong></div>";
      content += "<div>" + item.소재지전화 + "</div>";
      content += "</div>";

      // 인포윈도우 표시
      infowindow.setContent(content);
      infowindow.open(map, marker);

      // 지도 중심 위치를 해당 마커 위치로 설정
      map.setCenter(coords);
    }
  });
}

// 데이터를 표시하는 함수
function displayData() {
  // 데이터를 불러와 표시
  fetch("./hospital.json")
    .then((response) => response.json())
    .then((data) => {

      
      // 데이터를 표시할 HTML 요소 선택
      const table = document.getElementById("data-table");

      // 열 제목 생성
      const headerRow = document.createElement("tr");

      const header1 = document.createElement("th");
      header1.innerHTML = "사업장명";
      headerRow.appendChild(header1);

      const header2 = document.createElement("th");
      header2.innerHTML = "소재지전체주소";
      headerRow.appendChild(header2);

      const header3 = document.createElement("th");
      header3.innerHTML = "소재지전화";
      headerRow.appendChild(header3);

      const header4 = document.createElement("th");
      header4.innerHTML = "영업상태명";
      headerRow.appendChild(header4);

      // 테이블에 열 제목 추가
      table.appendChild(headerRow);

      // 데이터 반복 처리
      data.item.forEach((item) => {
        // 영업상태명이 "영업/정상"인 경우에만 표시
        if (item.영업상태명 === "영업/정상") {
          // 새로운 행(row) 생성
          const row = document.createElement("tr");

          // 각 데이터 항목을 셀(cell)로 추가
          const cell1 = document.createElement("td");
          cell1.innerHTML = item.사업장명;
          row.appendChild(cell1);

          const cell2 = document.createElement("td");
          cell2.innerHTML = item.소재지전체주소;
          row.appendChild(cell2);

          const cell3 = document.createElement("td");
          cell3.innerHTML = item.소재지전화;
          row.appendChild(cell3);

          const cell4 = document.createElement("td");
          cell4.innerHTML = item.영업상태명;
          row.appendChild(cell4);

          // 사업장명 클릭 이벤트 등록
          row.addEventListener("click", function () {
            handleItemClick(item);
          });

          // 행을 테이블에 추가
          table.appendChild(row);
        }
      });
  const select = document.getElementById('area');

// select 값이 변경될 때마다 필터링 함수 실행
select.addEventListener('change', filterData);

function filterData() {
  // 선택된 도/특별시/광역시 값 가져오기
  const selectedValue = select.value;

  // 데이터를 표시할 HTML 요소 선택
  const table = document.getElementById('data-table');

  // 기존 테이블 내용 제거
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // 열 제목 생성
  const headerRow = document.createElement('tr');

  const header1 = document.createElement('th');
  header1.innerHTML = '사업장명';
  headerRow.appendChild(header1);

  const header2 = document.createElement('th');
  header2.innerHTML = '소재지전체주소';
  headerRow.appendChild(header2);

  const header3 = document.createElement('th');
  header3.innerHTML = '소재지전화';
  headerRow.appendChild(header3);

  const header4 = document.createElement('th');
  header4.innerHTML = '영업상태명';
  headerRow.appendChild(header4);

  // 테이블에 열 제목 추가
  table.appendChild(headerRow);

  // 데이터 반복 처리
  data.item.forEach((item) => {
    // 전체 주소에서 시/도 명 가져오기
    const addressPrefix = item.소재지전체주소.split(' ')[0];

    // 선택된 값과 일치하는 데이터만 표시
    if (addressPrefix === selectedValue && item.영업상태명 === '영업/정상') {
      // 새로운 행(row) 생성
      const row = document.createElement('tr');

      // 각 데이터 항목을 셀(cell)로 추가
      const cell1 = document.createElement('td');
      cell1.innerHTML = item.사업장명;
      row.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.innerHTML = item.소재지전체주소;
      row.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.innerHTML = item.소재지전화;
      row.appendChild(cell3);

      const cell4 = document.createElement('td');
      cell4.innerHTML = item.영업상태명;
      row.appendChild(cell4);

      row.addEventListener("click", function () {
        handleItemClick(item);
      });

      


      // 행을 테이블에 추가
      table.appendChild(row);
    }


    if ( selectedValue=="" && item.영업상태명 === '영업/정상') {
      // 새로운 행(row) 생성
      const row = document.createElement('tr');

      // 각 데이터 항목을 셀(cell)로 추가
      const cell1 = document.createElement('td');
      cell1.innerHTML = item.사업장명;
      row.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.innerHTML = item.소재지전체주소;
      row.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.innerHTML = item.소재지전화;
      row.appendChild(cell3);

      const cell4 = document.createElement('td');
      cell4.innerHTML = item.영업상태명;
      row.appendChild(cell4);

      row.addEventListener("click", function () {
        handleItemClick(item);
      });

      


      // 행을 테이블에 추가
      table.appendChild(row);
    }




  });
  

}




    })
    .catch((error) => {
      console.log("데이터를 가져오는 중에 오류가 발생했습니다.", error);
    });
}

// 페이지 로드 시 데이터 표시 및 지도 초기화
window.addEventListener("DOMContentLoaded", function () {
  displayData();
  initMap();
});
