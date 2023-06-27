// 개월 수 계산하는 창
function calculateAge() {
    var birthDate = document.getElementById("birthdate").value;
    var currentDate = new Date();
    
    // 생년월일을 날짜 객체로 변환
    var birthDateObj = new Date(birthDate);
    
    // 생년월일부터 현재까지의 개월 수 계산
    var months = (currentDate.getFullYear() - birthDateObj.getFullYear()) * 12;
    months -= birthDateObj.getMonth();
    months += currentDate.getMonth();
    
    // 결과를 표시할 요소를 찾고 개월 수를 설정
    var ageElement = document.getElementById("age");
    ageElement.textContent = months + "개월";
    
    var btnElement = document.querySelector(".btn");
    btnElement.classList.add("btn-clicked");
    
  }
  
  // 라디오 버튼 (개, 고양이, 토끼) 클릭 시 정보 보여주는 창
  function getAnimalVaccineInfo(event) {
      var value = event.target.value;
  
      document.getElementById("schedule_puppy").style.display = "none";
      document.getElementById("schedule_cat").style.display = "none";
      document.getElementById("schedule_rabbit").style.display = "none";
  
      if (value === "puppy_vacc1") {
        document.getElementById("schedule_puppy").style.display = "block";
      } 
      if (value=== "cat_vacc2"){
        document.getElementById("schedule_cat").style.display = "block";
      } 
      if (value=== "rabbit_vacc3"){
        document.getElementById("schedule_rabbit").style.display = "block";
      } 
    }