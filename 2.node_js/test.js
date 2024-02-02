

// 모듈 - 코어모듈(내장모듈) vs 서브파티 모듈


const fs = require('fs')

let fileList = fs.readdirSync('.')
console.log(fileList);

const os = require('os');
console.log(os.cpus());

