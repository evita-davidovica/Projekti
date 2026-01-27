// Izmantots Sieta metode, lai atrastu visus pirmskaitļus

const N = parseInt(process.argv[2]) || 100;
console.log(`Atrastie pirmskaitļi līdz ${N}: `);

const startTime = process.hrtime.bigint();  // Laiks sākumā (nanosekundes)

function findPrimes(limit) {   // Sieta metode
    const sieve = new Array(limit + 1).fill(true);   // Sākotnēji visi skaitļi ir potenciāli pirmskaitļi
    sieve[0] = sieve[1] = false; // 0 un 1 nav pirmskaitļi

    for(let i = 2; i * i <= limit; i++) {   // Sākot no 2 līdz kvadrātsaknei no limita
        if(sieve[i]) {
            for(let j = i * i; j <= limit; j += i) {   
                sieve[j] = false;  
            }
        }
    }

const primes = [];    // Savāc visus pirmskaitļus
for(let i = 2; i <= limit; i++) {
    if(sieve[i]) primes.push(i);  // Ja ir pirmskaitlis, tad pievieno sarakstam
}
return primes;  
}

const primes = findPrimes(N);  // Atrod pirmskaitļus līdz N

const endTime = process.hrtime.bigint();  // Laiks beigās (nanosekundes)
const durationNs = endTime - startTime;   // Aprēķina izpildes laiku
const durationMs = Number(durationNs) / 1e6;
const durationSec = durationMs / 1000;

console.log(`\nAtrasti pirmskaitļi līdz ${primes.length} skaitļiem:`);
console.log(primes.join(", "));

console.log(`\nIzpildes laiks: ${durationMs.toFixed(3)} ms (${durationSec.toFixed(6)}s)`);
console.log("Beigas - Pirmskaitļi veiksmīgi atrasti!");


