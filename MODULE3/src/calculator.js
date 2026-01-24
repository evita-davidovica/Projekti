// calculator.js - Uzdevums 3.2: Kalkulators ar argumentiem
// Lietošana: node calculator.js 8 + 6

// Nolasa argumentus no komandrindas

const args = process.argv.slice (2);

// Pārbauda, vai ir pietiekami argumenti

if (args.length !== 3) {
    console.log(`Kļūda: Nepareizs argumentu skaits!
LIETOŠANA: node calculator.js <skaitlis1> <operators> < skaitlis2>
PIEMĒRS: node calculator.js 8 + 6`);
    process.exit(1);
}

// Izņem argumentus

const num1Str = args[0];
const operator = args[1];
const num2Str = args[2];

// Pārbauda un pārveido skaitļus

const num1 = Number(num1Str);
const num2 = Number(num2Str);

if (isNaN(num1) || isNaN(num2)) {
    console.log(`Kļūda: "${num1Str}" vai "${num2Str}" nav skaitļi!`);
    process.exit(1);
}

// Galvenā loģika - Switch ar template literals

console.log(`${num1Str} ${operator} ${num2Str} = ?`);

switch (operator) {
    case '+':
        console.log(`${num1} + ${num2} = ${num1 + num2}`);
        break;
    case '-':
        console.log(`${num1} - ${num2} = ${num1 - num2}`);
        break;
    case '*':
        console.log(`${num1} * ${num2} = ${num1 * num2}`);
        break;
    case '/':
        if (num2 === 0) {
            console.log(`Kļūda: Dalīšana ar nulli nav atļauta!`);
        } else {
            console.log(`${num1} / ${num2} = ${num1 / num2}`);
        }
        break;
    case '%':
        console.log(`${num1} % ${num2} = ${num1 % num2}`);
        break;
    default:
        console.log(`Kļūda: Nezināms operators "${operator}"`);
}

// Beigas

console.log("Rēķināšana pabeigta!");


