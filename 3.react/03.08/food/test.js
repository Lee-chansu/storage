let arr = [1,2,3]

let arr2= [4,5,6]

result = [...arr, ...arr2]

console.log(result)




let newItem = 1000
let idx = 3
let prev = result.slice(0, idx);
let last = result.slice(idx +1)
console.log(prev)
console.log(last)

let newResult = [...prev, newItem, ...last]
console.log(newResult)