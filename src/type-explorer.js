// type-explorer.js - Uzdevums 3.1: Obligātie piemēri
// PRIMITĪVIE TIPI + typeof + obligātās konversijas

//Divi mainīgie katram tipam 

const str1 = "8", str2 = "abc";
const num1 = 2, num2 = 32;
const bool1 = true, bool2 = false;

console.log("=== PRIMITĪVIE TIPI ===");
console.log("str1 tips:", typeof str1);
console.log("num1 tips:", typeof num1);
console.log("bool1 tips:", typeof bool1);

// 4 automātiskās konversijas

console.log("\n=== AUTOMĀTISKĀS KONVERSIJAS ===");
console.log("8"+ 2);
console.log("8" - 2);
console.log("8" * 2);
console.log("8" / 2);

// 3 eksplicītās konversijas ar robežgadījumiem

console.log("\n=== EKSPLICĪTĀS KONVERSIJAS AR ROBEŽGADĪJUMIEM ===");
console.log(Number("abc"));
console.log(Boolean(""));
console.log(Boolean("0"));
console.log(Number(""));
console.log(parseInt("32px"));

console.log("\n === BEIGAS ===");




