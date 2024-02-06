// rejected 될 경우
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then( res => res.text(), (err)=>{console.log('Fail!')/*작업상태 코드가 rejected가 될 경우*/} ) 
  .then( result => console.log(JSON.parse(result).name) )