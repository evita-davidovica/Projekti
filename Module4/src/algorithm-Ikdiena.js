// 4.2 Diagramma -> Kods: 1. Moduļa algoritms ikdienas rutīna

console.log("Sākam rīta rutīnu");

console.log("Pamosties");
console.log("Izslēgt modinātāju");
console.log("Piecelties no gultas");
console.log("Doties uz vannas istabu");
console.log("Nomazgāt seju");
console.log("Iztīrīt zobus");

console.log("\nPirmā lēmuma punkts:");

let isCold = Math.random() > 0.5; // Simulē laika apstākļus true/false
if(isCold) {
    console.log("Ja ārā ir auksts, uzvilkt siltu džemperi");
} else {
    console.log("Ja ārā ir silts, uzvilkt vieglu apģērbu");
}

console.log("\nBrokastis:");

console.log("Pagatavot brokastis");
console.log("Ēst brokastis");
console.log("Pagatavot kafiju");
console.log("Dzert kafiju");

console.log("\nOtrais lēmuma punkts:");

let hasFreeTime = Math.random() > 0.3; // Simulē brīvā laika esamību true/false
if(hasFreeTime) {
    console.log("Ja ir brīvais laiks, tad palasīt grāmatu");
} else {
    console.log("Ja nav brīvā laika, tad pārbaudīt telefonu");
}

// Diagrammas cikls - kamēr kafijas krūze nav tukša

console.log("\nKafijas dzeršanas cikls:");
let coffeeCups = 5; // Kafijas malku skaits piemēram
while(coffeeCups > 0) {
    console.log(`Dzert kafiju, kamēr krūze nav tukša. (${coffeeCups})`);
    coffeeCups--;
}

console.log("Kafijas krūze ir tukša!");

console.log("\nGatavošanās iziešanai ārpus mājas:");
console.log("Uzvilkt jaku");
console.log("Paņemt atslēgas");
console.log("Iziet no mājām");

console.log("\nBeigt - rīta rutīna veiksmīga!");
