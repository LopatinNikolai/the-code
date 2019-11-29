const chunks = require("fs").readFileSync("input.txt", "utf8");  
 
[a, b] = chunks.split("\n");  
a = parseInt(a);
ar = b.split(" ");
mySet = new Set();
ar.forEach(element => {
    mySet.add(element);
});
process.stdout.write(String(mySet.size));

// const chunks = require("fs").readFileSync("input.txt", "utf8");  
 
// [a, b] = chunks.split("\n");  
// a = parseInt(a);
// ar = b.split(" ");
// var mySet = new Set();
// ar.forEach(element => {
//     mySet.add(element);
// });
// process.stdout.write(mySet.size);
