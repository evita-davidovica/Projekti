// 4.3 Diagramma -> Kods: 1. Moduļa algoritms Summa līdz N

console.log("Summēšana no 1 līdz N");

// Tiek ievadīts skaitlis N

const N = parseInt(process.argv[2]) || 7;
console.log(`Izvēlētais skaitlis N ir ${N}`);
let summa = 0;      // Sāk ar summu 0
console.log(`Summa <-0`);
let i = 1;          // i ir sākotnēji 1
console.log(`i <- 1`);

// Diagrammas cikls, kamēr i ir mazāks vai vienāds ar N

console.log("\nSāk ciklu:");
while(i <= N) {
    console.log(` Cikls: i=${i}, summa=${summa}`);

// Skaitam klāt i, kamēr i ir mazāks vai vienāds ar N

summa = summa +i;
console.log(` Summa <- ${summa - i} + ${i} = ${summa}`);
i = i +1;
console.log(` i <- ${i - 1} + 1 = ${i}`);
}
console.log("Cikls beidzas");

// Izvada rezultātu

console.log("\nPārbaude:");
console.log(`Formula: ${N} * (${N} + 1)/2 = ${N * (N + 1) /2 }`);
console.log(summa === N * (N + 1) / 2 ? "Aprēķins ir pareizs!" : "Kļūda aprēķinā!");
console.log(`Rezultāts: Summa no 1 līdz ${N} ir ${summa}`);

console.log("Beigas - Summa veiksmīgi aprēķināta!");
