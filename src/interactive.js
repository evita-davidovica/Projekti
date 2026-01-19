const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});

let answers = {};

function askName() {
    rl.question('Kā tevi sauc? ', (name) => {
        answers.name = name || 'Vārds netika ievadīts';
        console.log(`DEBUG: Saņemtais vārds:  [${name}]`); 
        console.log(`Sveiks, ${answers.name}!`);
        askAge(); 
    });
}

function askAge() {
    rl.question('Cik gadi tev ir? ', (age) => {
        answers.age = age;
        console.log(`Tu esi ${age} gadus vecs.`);
        askCity();
    });
}

function askCity() {
    rl.question('Kurā pilsētā tu dzīvo? ', (city) => {
        answers.city = city;
        console.log(`Tu dzīvo ${city}.`);

        showSummary();
    });
}

function showSummary() {
    console.log('\n=== ANKETAS KOPSAVILKUMS ===');
    console.log(`Vārds: ${answers.name}`);
    console.log(`Vecums: ${answers.age} gadi`);
    console.log(`Pilsēta: ${answers.city}`);
    console.log('Paldies par dalību!');

    rl.close();
}

askName();