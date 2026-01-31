const utils = require('./utils/utils.js');
console.log("=== DEMO MODULIS ===\n");

// Virkņu testi 
console.log("Virkņu testi:");
console.log('capitalize("hello"):', utils.capitalize("hello"));  // Maina uz pirmo burtu lielo
console.log('capitalize("world"):', utils.capitalize("WORLD"));  // Maina uz visiem lielajiem burtiem
console.log('capitalize(""):', utils.capitalize(""));  // Tukša virkne

console.log('truncate("abcdefgh", 5):', utils.truncate("abcdefgh", 5)); // Apgriež virkni
console.log('truncate("short", 10):', utils.truncate("short", 10)); // Īsa virkne, nav apgriežama
console.log('truncate("a", 0):', utils.truncate("a", 0)); // Apgriež līdz 0

console.log('countWords("hello world test"):', utils.countWords("hello world test")); // Saskaita vārdus
console.log('countWords(" test "):', utils.countWords(" test ")); // Viens vārds ar atstarpēm
console.log('countWords(""):', utils.countWords("")); // Tukša virkne

// Skaitļu testi
console.log("\nSkaitļu testi:");
console.log('clamp(15, 0, 10):', utils.clamp(15, 0, 10)); // Ierobežo uz augšu (10)
console.log('clamp(-5, 0, 10):', utils.clamp(-5, 0, 10)); // Ierobežo uz leju (0)
console.log('clamp(5, 0, 10):', utils.clamp(5, 0, 10));   // Nav ierobežojams (5)

console.log('isPrime(7):', utils.isPrime(7));  // Pirmskaitlis - true
console.log('isPrime(10):', utils.isPrime(10)); // Nav pirmskaitlis - false
console.log('isPrime(3):', utils.isPrime(3));  // Pirmskaitlis - true

console.log('factorial(5):', utils. factorial(5)); // Faktoriālais 5! = 120
console.log('factorial(0):', utils.factorial(0));  // Faktoriālais 0! = 1
console.log('factorial(-3):', utils.factorial(-3)); // Faktoriālais nav definēts - nulles atgriešana

// Masīvu testi
console.log("\nMasīvu testi:");
console.log('sum([1, 2, 3]):', utils.sum([1, 2, 3])); // Summa = 6
console.log('sum([10]):', utils.sum([10]));  // Summa = 10
console.log('sum([]):', utils.sum([]));  // Tukšs masīvs, summa = 0

console.log('average([1, 2, 3]):', utils.average([1, 2, 3])); // Vidējais = 2
console.log('average([10, 20]):', utils.average([10,20]));  // Vidējais = 15
console.log('average([]):', utils.average([]));  //Tukšs masīvs, vidējais = 0

// Datuma testi
console.log("\nDatuma testi:");
console.log('formatDate(new Date("2024-02-28")):', utils.formatDate(new Date("2024-02-28"))); // Formatē datumu "28-02-2024"
console.log('formatDate(new Date("2023-12-05"):', utils.formatDate(new Date("2023-12-05")));  // Formatē datumu "05-12-2023"
console.log('formatDate(new Date()):', utils.formatDate(new Date())); // Formatē šodienas datumu 

console.log('calculateAge(new Date("2000-01-01")):', utils.calculateAge(new Date("2000-01-01"))); // Aprēķina vecumu (26 gadi)
console.log('calculateAge(new Date("2010-06-15")):', utils.calculateAge(new Date("2010-06-15"))); // Aprēķina vecumu (15 gadi)
console.log('calculateAge(new Date(new Date("2025-22-07"))):', utils.calculateAge(new Date("2025-07-22"))); // Aprēķina vecumu, nav pilnu gadu (0 gadi)

// Validācijas testi
const validators = require(`./validators/validators.js`); 
console.log("\nValidācijas testi:");

console.log("isEmail('test@example.com'):", validators.isEmail('test@example.com')); // Pārbauda vai derīgs e-pasts
console.log("isPhoneNumber('+37112345678'):", validators.isPhoneNumber('+37112345678')); // Pārbauda vai telefona numurs ir Latvijas formātā +371xxxxxxxx
console.log("isValidAge(25):", validators.isValidAge(25)); // Pārbauda vecumu no 0-150 gadiem
console.log("isStrongPassword('Password'):", validators.isStrongPassword('Password')); // Pārbauda vai parole ir pareiza
console.log("isValidDate('2024-02-29'):", validators.isValidDate('2024-02-29')); // Pārbauda vai datuma formāts ir pareizs yyyy-mm-dd un vai ir derīgs

console.log("\n=== DEMO MODUĻA BEIGAS ==="); 






