const readline = require('readline');

const secretNumber = Math.floor(Math.random() * 100) + 1;  // Ģenerē nejaušu skaitli 1-100
let attempts = 0;
const maxAttempts = 10;

console.log("Minēšanas spēle!");
console.log(`Uzmini skaitli no 1 lidz 100 (${maxAttempts} mēģinājumi)`);

const rl = readline.createInterface({   // Izveido ieejas/izejas sistēmu
    input: process.stdin,
    output: process.stdout
});

function askGuess() {    // Funkcija minēšanai
    attempts++;
    rl.question(`\nMēģinājums ${attempts}/${maxAttempts}: Tavs minējums? `, (guess) => {
        const userGuess = parseInt(guess);

        if(isNaN(userGuess)) {       // Pārbauda minējumu
            console.log("Lūdzu ievadi derīgu skaitli.");
            attempts--;              // Neskaita nederīgu skaitli
            return askGuess();
        }

        // Nerādām noslēpuma skaitli, atspoguļojam mēģinājuma numuru
        console.log(`Tavs minējums ir: ${userGuess}, mēģinājums nr. ${attempts}`);
        if(userGuess === secretNumber) {
            console.log(`Apsveicu! Tu uzminēji skaitli ${attempts} mēģinājumos!`);
            rl.close();
         } 
         else if(attempts >= maxAttempts) {
            console.log(`Diemžēl, tu neuzminēji. Pareizais skaitlis bija ${secretNumber}`);
            rl.close();
         }
         else if(userGuess > secretNumber) {
            console.log("Skaitlis ir par lielu. Mini vēlreiz.");
            askGuess();
         }
         else {
            console.log("Skaitlis ir par mazu. Mini vēlreiz.");
            askGuess();
         }
    });
}

askGuess();  //Sāk minēšanas procesu