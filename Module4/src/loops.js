let header = "";       // Izvada galveni  // Pievienots no uzdevuma
for(let j = 1; j <= N; j++) {
    header += `${j.toString().padStart(3)} `;   // Formatē ar atstarpēm
}
console.log(header);

console.log("\nSāk ciklu:");   // Pievienots no uzdevuma
while(i <= N) {
    console.log(` Cikls: i=${i}, summa=${summa}`);
    summa = summa +i;
console.log(` Summa <- ${summa - i} + ${i} = ${summa}`);
i = i +1;
console.log(` i <- ${i - 1} + 1 = ${i}`);
}
console.log("Cikls beidzas");

console.log("\n=== 3. DO WHILE CIKLS ==="); // Pievienots no MI
let j = 1;
do {
    console.log(`Do while cikls: j=${j}`);
    j++;
} while(j <= 5);
console.log("\n=== Testēšana ===");
console.log("Visi cikli izpildās 5 reizes ");






