
let stList = [{
  name: '이아무개',
  id: 101,
  hobby: ['수영', '뜨개질', '독서'],
  score: { 국어: 85, 수학: 75, 영어: 80 }
},
{
  name: '김아무개',
  id: 101,
  hobby: ['바둑', '덕질', '스쿼시'],
  score: { 국어: 65, 수학: 85, 영어: 90 }
}]
console.log(stList)

for (let i = 0; i < stList.length; i++) {
  document.write('<div class="box">')
  document.write('<p>  국어 : ' + stList[i].score.국어 + '</p>')
  document.write('<p>  수학 : ' + stList[i].score.수학 + '</p>')
  document.write('<p>  영어 : ' + stList[i].score.영어 + '</p>')
  document.write('</div>')

  document.getElementsByClassName('box')[i].style.border = "2px solid red"
}
