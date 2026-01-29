// Module3 calculator.js refaktorizēts -> modulāra bibliotēka

// Validācija
function isValid(a, op, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) return false;
    if (!['+', '-', '*', '/', '%'].includes(op)) return false;
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
function formatResult(result) {
    return Number(result.toFixed(2));
}

// Galvenā funkcija (izsauc pārējās)
function calculate(a, op, b) {
    if (!isValid(a, op, b)) return null;
    
    let result;
    switch (op) {
        case '+': result = add(a, b); break;
        case '-': result = substract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        case '%': result = modulo(a, b); break;
    }
    return formatResult(result);
}

// CLI interfeiss (process.argv kā Module3/src/calculator.js)
const args = process.argv.slice(2);
if (args.length !== 3) {
    console.log(`Kļūda: Nepareizs argumentu skaits! Lietošana: node calculator-refactored.js <a> <op> <b>`);
    process.exit(1);
}

const num1 = Number(args[0]);
const operator = args[1];
const num2 = Number(args[2]);

const result = calculate(num1, operator, num2);
if (result === null) {
    console.log(`Kļūda: ${args[0]} ${operator} ${args[2]} nav derīga operācija!`);
} else {
    console.log(`${args[0]} ${operator} ${args[2]} = ${result}`);
}

console.log("Rēķināšana pabeigta!");

// Eksportēšana
module.exports = { calculate, add, substract, multiply, divide, modulo, formatResult, isValid };
