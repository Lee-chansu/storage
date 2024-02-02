const fs = require('fs')

let fileList = fs.readdirSync('.')
console.log(fileList)

let txt = ''

for(i in  fileList){
    txt += fileList[i] + '\n'
}

fs.writeFileSync('new.txt', txt)
let data = fs.readFileSync('new.txt','utf-8')
console.log(data)

//---------------------

const os = require('os')
console.log(os.cpus())

/*
Application Programming Interface : API
플랫폼이나 실행환경 등에서 제공하는 인터페이스
NODE.JS와 웹브라우저 에서 제공하는 API가 다르다.
ex) 시각적 표현   x,  o
    UI관련 api   x,  o
    브라우저 객체 X, 0
    컴퓨터 제어  0, X (브라우저에 필요X,  보안상 위험)
PC의 깊은 부분까지 제어가능한 API를 제공하기 때문에 컴퓨터 프로그램 개발이 가능하다
NODE.JS + Electron = pc 제작 프로그램
팁 : 특정브라우저가 표준 자바스크립트 문법을 어디까지 제공하는지? 확인 필요. node도 마찬가지
각 브라우저별 자바스크립트 표준 구현 현황: https://compat-table.github.io/compat-table/es6/
*/
/*

  서드파티 모듈
  - 다른 개발자나 회사들이 만들어서 인터넷상에 공개 저장소에 제공하는 모듈

  Node Packege Manager
*/

const cowsay = require('cowsay')

console.log(cowsay.say({
  text:'i love u'
}))

