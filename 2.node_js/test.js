// 모듈 - 코어모듈(내장모듈) vs 서브파티 모듈
//파일 입출력을 다루는 모듈

const fs = require('fs')

let fileList = fs.readdirSync('.')
// console.log(fileList);

txt = ''


for(let i of fileList){
    txt += i + '\n';
}

fs.writeFileSync('new.txt', txt);

//파일 이름 변경(세이브 후 파일이름 변경)
// fs.renameSync('test.txt', 'good.txt');

//파일 삭제
// fs.unlinkSync('./new.txt');

const os = require('os');
// console.log(os.cpus());

