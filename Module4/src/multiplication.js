const N = parseInt(process.argv[2]) || 5;
console.log(`\nReizināšanas tabula līdz ${N}*${N}:`);

let header = "";       // Izvada galveni
for(let j = 1; j <= N; j++) {
    header += `${j.toString().padStart(3)} `;   // Formatē ar atstarpēm
}
console.log(header);

for(let i = 1; i <= N; i++) {     // Izvada katru rindu
    let row = "";
    for(let j = 1; j <= N; j++) {
        let result = i * j;
        row += `${result.toString().padStart(3)} `;  // Formatē ar atstarpēm
    }
    console.log(row);
}
console.log("Beigas - Reizināšanas tabula veiksmīgi izvadīta!\n");
