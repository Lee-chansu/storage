
// ok버튼
let okUpdate = document.getElementsByClassName('ok')[0]

// 각 input상자에서 값 가져오기
let 
  addName = document.getElementById('addName'),
  addTeam  =  document.getElementById('addTeam'),
  addPosition =  document.getElementById('addPosition'),
  addEmail =  document.getElementById('addEmail'),
  addPhone =  document.getElementById('addPhone'),
  addBirthday =  document.getElementById('addBirthday')


// 콜백함수의 매개변수로 이벤트에 관련된 정보를 넘겨준다
okUpdate.addEventListener('click', function(e){
  
  let id = e.currentTarget.dataset.id;

  let newInfo ={
    id,
    name : addName.value, // 해당 input값 불러오기
    team : addTeam.value,
    position : addPosition.value,
    emailAddress : addEmail.value,
    phoneNumber : addPhone.value,
    birthday : addBirthday.value
  }


  // put 요청
  fetch('/edit/'+id, {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify(newInfo)
  }) 
  .then( r => r.text())
  .then( r => {
    window.location.href="/member"; 
  })
  .catch(err => { 
    console.log(err);
  })

}); 

