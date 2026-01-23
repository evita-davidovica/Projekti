// converter.js - Uzdevums 3.4: Vienību konvertors (readline)
// Lietošana: node converter.js -> izvēlēties tipu -> ievadīt skaitli

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Konstantes - konvertācijas koeficienti

const KM_TO_MILES = 0.621371;
const KG_TO_LBS = 2.20462;
const L_TO_GALLONS = 0.264172;

// Jautā konversijas tipu

rl.question(`Kādu konversiju vēlies veikt?\n1. km <-> jūdzes\n2. kg <->mārciņas\n3. l <-> galoni\nIzvēlies (1-3): `, (typeChoice) => {

    const type = typeChoice.trim();

// Pārbauda izvēli 

    if (type !== '1' && type !== '2' && type !== '3') {
        console.log('Kļūda: Nepareiza izvēle! Izvēlies 1, 2, vai 3!');
        rl.close();
        return;
}

// Jautā skaitli

rl.question(`Ievadiet vērtību konvertēšanai (${type === '1' ? 'km/jūdzes' : type === '2' ? 'kg/mārciņas' : 'l/galoni'}): `, (valueStr) => {
    const value = Number(valueStr);
    if (isNaN(value) || value < 0) {
        console.log('Kļūda: Ievadiet pareizu skaitli!');
        rl.close();
        return;
}

// Konverte (pēc izvēles)

let result, fromUnit, toUnit;

if (type === '1') { 
    fromUnit = value < 10 ? 'jūdzes' : 'km';
    toUnit = fromUnit === 'km' ? 'jūdzes' : 'km';
    result = fromUnit === 'km' ?  (value * KM_TO_MILES).toFixed(2) : (value / KM_TO_MILES).toFixed(2);
}

else if (type === '2') { 
    fromUnit = value < 10 ? 'mārciņas' : 'kg';
    toUnit = fromUnit === 'kg' ? 'mārciņas' : 'kg';
    result = fromUnit === 'kg' ? (value * KG_TO_LBS).toFixed(2) : (value / KG_TO_LBS).toFixed(2);
}

else {
    fromUnit = value <10 ? 'galoni' : 'l';
    toUnit = fromUnit === 'l' ? 'galoni' : 'l';
    result = fromUnit === 'l' ? (value * L_TO_GALLONS).toFixed(2) : (value / L_TO_GALLONS).toFixed(2);
}

// Izvada rezultātu

console.log(`\n${value} ${fromUnit} = ${result} ${toUnit}`);
console.log('Konvertēšana pabeigta!');

rl.close();
});
});


