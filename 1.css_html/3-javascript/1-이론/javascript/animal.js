let animals = [
  "Albatross",
  "Aardvark",
  "Alligator",
  "Alpaca",
  "Ant",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Cat",
  "Caterpillar",
  "Cattle",
  "Chamois",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Chough",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cod",
  "Cormorant",
  "Dugong",
  "Dunlin",
  "Eagle",
  "Echidna",
  "Eel",
  "Eland",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gaur",
  "Gazelle",
  "Gerbil",
  "Giraffe",
  "Grasshopper",
  "Heron",
  "Herring",
  "Hippopotamus",
  "Hornet",
  "Horse",
  "Kangaroo",
  "Kingfisher",
  "Koala",
  "Kookabura",
  "Moose",
  "Narwhal",
  "Newt",
  "Nightingale",
  "Octopus",
  "Okapi",
  "Opossum",
  "Quail",
  "Quelea",
  "Quetzal",
  "Rabbit",
  "Raccoon",
  "Rail",
  "Ram",
  "Rat",
  "Raven",
  "Red deer",
  "Sandpiper",
  "Sardine",
  "Sparrow",
  "Spider",
  "Spoonbill",
  "Squid",
  "Squirrel",
  "Starling",
  "Stingray",
  "Tiger",
  "Toad",
  "Whale",
  "Wildcat",
  "Wolf",
  "Worm",
  "Wren",
  "Yak",
  "Zebra",
];

//1. 마지막 아이템 zebra 제거

animals.pop('zebra') // 대소문자 구분없이 단어 일치하면 제거
animals.pop() // 그냥 마지막 제거 ( yak 제거됨)

// 2. Dog 추가
animals.push('Dog')

// 3. Mosquito, Mouse, Mull 추가
animals.push('Mosquito')
animals.push('Mouse')
animals.push('Mull')

// 4. "Human" 있는가? 검사
console.log(animals.includes('Human'))
console.log(animals.includes('Dog')) // 대소문자 모두 일치해야 true

// 5. "Cat"있는가? 검사
console.log(animals.includes('Cat'))

// [indexOf를 적절히 사용하시오]

// 6. "Red deer"을 "Deer로 바꾸시오"

let deer_index = animals.indexOf('Red deer')
console.log( deer_index )
console.log( "인덱스번호 : " + animals[77] )
console.log( "변수에 담아서 : " + animals[deer_index] )
console.log( "indexOf이용 : " + animals[ animals.indexOf('Red deer') ] )

animals[deer_index] = 'Deer' // 값 바꾸기
console.log( animals[77] )

// 7. "Spider"부터 3개의 아이템을 제거하시오. 
start_i = animals.indexOf('Spider')
console.log(start_i)
console.log( animals.slice(start_i, start_i+3 ) )
animals.splice(start_i, 3)


// 8. "Tiger" 이후의 값을 제거하시오
tiger_i = animals.indexOf('Tiger')
animals.splice(tiger_i) // 종료번호 생략하면 지정위치부터 끝까지 삭제

// 9. "B"로 시작되는 아이템인 "Baboon"부터 "Bison까지 가져와 새로운 어레이에 저장"

// Q. 변수 선언한적이 없는데 변수가 사용이 가능하다? 왜? 
// - var 선언이 붙은 것과 같이 된다
// x, y, arr2 선언한적이 없음, 근데 값이 할당이 됨. 자동으로 vat로 선언이 되었다고 보면됨.

// slice ( 시작인덱스, 종료인덱스 )
// splice (시작인덱스, 갯수 )
x = animals.indexOf('Baboon')
y = animals.indexOf('Bison')

arr_slice = animals.slice(x, y+1) // 지운 부분만 따로 저장 가능
arr_splice = animals.splice(x, y-x+1)

console.log(arr_slice)
console.log(arr_splice)

console.log(animals)