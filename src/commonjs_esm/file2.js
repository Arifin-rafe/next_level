const {c : x} = require('./file1')
const {c : y} = require('./file3')
const add = require('./add')
const sub = require('./sub')

console.log("add(x, y):", add(x, y))
console.log("sub(x, y):", sub(x, y))
console.log("x:", x)
console.log("y:", y)