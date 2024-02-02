const fs = require('fs');

let fileList = fs.readdirSync('.')
console.log(fileList)

//(function(exports, require, module, __filename, __dirname)){}
/* 
    1. Node.js 는 모듈을 로드하기 전에 그 전체코드를 Module wrapper function이라는 것으로 감싸줍니다.
    2. Module wrapper function은 그 5개의 인자에 각각 적잘한 값이나 객체를 설정해주는데
    3. 우리가 모듈 내의 코드에서 exports 인자로 넘어와서 그 프로퍼티를 하나씩 채워나가는 객체
    (또는 module 인자의 exports 프로퍼티로 설정되는 객체)가
    4. 다른 모듈에서 이 모듈을 require 함수로 로드햇을 때 리턴되는 객체입니다.


*/


// 모듈 코드
function add(a,b) {
    return a + b
}

// exports.이름 = 함수명 설정하면 modeul.export의 값도 동이랗게 설정이 된다.

exports.add = add;
//module.exports = {add}


// console.log('---------------------module')
console.dir('main.js')