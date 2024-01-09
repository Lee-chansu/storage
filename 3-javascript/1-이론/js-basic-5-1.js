let name = ['김아무개', '송아무개', '정아무개']
let age = [32, 24, 29]
let address = ['서울시', '인천시', '경기도']
let phone = ['010-0000-1111', '010-0000-1111', '010-0000-1111']

// 객체 = object {key : value} - key중복되면 저장x
let person = {
  name: '김아무개',
  age: 32,
  address: '서울시',
  phone: '010-0000-1111',
}
console.log(person)
console.log(person.name)
console.log(person['name'])
person.age = 22 // 값변경
console.log(person.age)

// [] : 배열이라서
// {} : 객체라서

let people = [
  {
    name: '이아무개',
    age: 24
  },
  {
    name: '김아무개',
    age: 32
  },
  {
    name: '송아무개',
    age: 27
  }
]

console.log(people)
console.log(people[0].name)
console.log(people[1]['name'])
console.log(people[2].name)


let student = {
  name: '이아무개',
  id: 101,
  hobby: ['수영', '뜨개질', '독서'],
  score: { 국어: 85, 수학: 75, 영어: 80 }
}

console.log(student.hobby)
console.log(student.hobby[0])
console.log(student.hobby[1])
console.log(student.hobby[2])

console.log(student.score.국어)
console.log(student.score.수학)
console.log(student.score.영어)

console.log(student.score['국어'])
console.log(student.score['수학'])
console.log(student.score['영어'])
