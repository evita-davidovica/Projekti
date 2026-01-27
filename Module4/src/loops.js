console.log("\nSāk ciklu:");
while(i <= N) {
    console.log(` Cikls: i=${i}, summa=${summa}`);
    summa = summa +i;
console.log(` Summa <- ${summa - i} + ${i} = ${summa}`);
i = i +1;
console.log(` i <- ${i - 1} + 1 = ${i}`);
}
console.log("Cikls beidzas");