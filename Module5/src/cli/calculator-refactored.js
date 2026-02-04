// Module3 calculator.js refaktorizēts -> modulāra bibliotēka

// Validācija (atsevišķa funkcija)
function isValid(a, op, b) { 
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) return false; // Pārbauda, vai a un b ir skaitļi un nav NaN
    if (!['+', '-', '*', '/', '%'].includes(op)) return false; // Pārbauda, vai operators ir derīgs
    if (b === 0 && (op === '/' || op === '%')) return false; // Dalīšana ar nulli nav atļauta
    return true;
}

// Kalkulatora operācijas (5 operācijas, katra kā atsevišķa funkcija)
function add(a, b) { return a + b; } 
function substract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; } 
function modulo(a, b) { return a % b; } 

// Formatēšana (atsevišķa funkcija)
function formatResult(result) { // Noapaļo rezultātu līdz 2 cipariem aiz komata
    return result.toFixed(2); // Piemēram, 3.14159 -> "3.14"
}

// Galvenā funkcija (izsauc atbilstošo operāciju pēc operatora)
function calculate(a, op, b) { // Pārbauda derīgumu
    if (!isValid(a, op, b)) return null; // Ja nav derīgs, atgriež null
    
    let result; // Izvēlas operāciju
    switch (op) { // Izsauc atbilstošo funkciju
        case '+': result = add(a, b); break; 
        case '-': result = substract(a, b); break; 
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        case '%': result = modulo(a, b); break;
    }
    return formatResult(result); // Formatē un atgriež rezultātu
}

// CLI interfeiss (process.argv kā Module3/src/calculator.js)
const args = process.argv.slice(2); 
if (args.length !== 3) { // Pārbauda argumentu skaitu
    console.log(`Kļūda: Nepareizs argumentu skaits! Lietošana: node calculator-refactored.js <a> <op> <b>`); // Ja nav 3 argumenti, izvada kļūdas ziņojumu
    process.exit(1); //
}

const num1 = Number(args[0]); // Pārveido argumentus uz skaitļiem
const operator = args[1];     // Operators paliek kā string
const num2 = Number(args[2]); 

const result = calculate(num1, operator, num2); // Izsauc galveno funkciju
if (result === null) { // Pārbauda rezultātu
    console.log(`Kļūda: ${args[0]} ${operator} ${args[2]} nav derīga operācija!`); // Ja rezultāts ir null, izvada kļūdas ziņojumu
} else {
    console.log(`${args[0]} ${operator} ${args[2]} = ${result}`); // Ja rezultāts ir derīgs, izvada rezultātu
}

console.log("Rēķināšana pabeigta!"); 

// Eksportēšana
module.exports = { calculate, add, substract, multiply, divide, modulo, formatResult, isValid };
