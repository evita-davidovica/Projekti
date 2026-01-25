// 4.2 Diagramma -> Kods: 1. Moduļa algoritms Ikdienas rutīna

console.log("Sākam rīta rutīnu");

console.log("Pamosties");
console.log("Izslēgt modinātāju");
console.log("Piecelties no gultas");
console.log("Doties uz vannas istabu");
console.log("Nomazgāt seju");
console.log("Iztīrīt zobus");

console.log("\nPirmā lēmuma punkts:"); // Pirmais no diviem lēmuma punktiem, kurā jāizvēlas laikapstākļiem atbilstošs apģērbs

let isCold = Math.random() > 0.5; // Simulē laika apstākļus if/else
if(isCold) {
    console.log("Ja ārā ir auksts, uzvilkt siltu džemperi");
} else {
    console.log("Ja ārā ir silts, uzvilkt vieglu apģērbu"); // Neatkarīgi no izvēles, turpināt ar nākamo soli
}

console.log("\nBrokastis:");

console.log("Pagatavot brokastis");
console.log("Ēst brokastis");
console.log("Pagatavot kafiju");
console.log("Dzert kafiju");

console.log("\nOtrais lēmuma punkts:"); //Otrais lēmuma punkts, kurā jāizvēlas aktivitāte, atkarībā no brīvā laika esamības

let hasFreeTime = Math.random() > 0.3; // Simulē brīvā laika esamību if/else
if(hasFreeTime) {
    console.log("Ja ir brīvais laiks, tad palasīt grāmatu");
} else {
    console.log("Ja nav brīvā laika, tad pārbaudīt telefonu"); // Neatkarīgi no izvēles, turpināt dzer, kafiju, kamēr krūze nav tukša, lai cikls noslēgtos
}

// Diagrammas cikls - kamēr kafijas krūze nav tukša

console.log("\nKafijas dzeršanas cikls:");
let coffeeCups = 5; // Kafijas malku skaits piemēram
while(coffeeCups > 0) {
    console.log(`Dzert kafiju, kamēr krūze nav tukša. (${coffeeCups})`);
    coffeeCups--;
}

console.log("Kafijas krūze ir tukša!"); // Tikai tad, kad kafijas krūze ir tukša, drīkst gatavoties iziešanai ārpus mājas

console.log("\nGatavošanās iziešanai ārpus mājas:");
console.log("Uzvilkt jaku");
console.log("Paņemt atslēgas");
console.log("Iziet no mājām");

console.log("\nBeigt - rīta rutīna veiksmīga!");
