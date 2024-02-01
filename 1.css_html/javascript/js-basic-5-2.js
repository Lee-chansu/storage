//student.js에서 export한 내용을 stList에 import하겠다.
import stList from "../javascript/student.js"

let stList = [{
    name : '이아무개',
    id: 101,
    hobby : [실뜨기, 삽질하기],
    score : {국어:85, 수학:75, 영어:80}
},
    
    {name : '박아무개',
    id : 102,
    hobby : [수영, 스카이다이빙], 
                // [] : 배열 
                //안의 인덱스를 써서 꺼내줘야 한다.
    score : {국어:85, 수학:75, 영어:80} 
                // {} : 객체
                //꺼내려면 key값을 구체적으로 줘야 함.
}]

for(let i = 0; i < stList.length; i++){
    document.write('<div class="box">')
    document.write('<p> 국어 : '+stList[i].score.국어+'</p>')
    document.write('<p> 수학 : '+stList[i].score.수학+'</p>')
    document.write('<p> 영어 : '+stList[i].score.영어+'</p>')
    document.write('</div>')

}