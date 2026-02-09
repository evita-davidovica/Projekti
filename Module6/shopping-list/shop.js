// shop.js izmanto storage.js funkcijas, lai pārvaldītu iepirkumu sarakstu
const { loadList, saveList } = require('./storage');
const { calcLineTotal, calcGrandTotal, countUnits } = require('./utils');

const args = process.argv.slice(2); // Saņem komandrindas argumentus
const command = args[0]; // Pirmais arguments ir komanda
const items = loadList(); // Ielādē iepirkumu sarakstu no faila

function printUsage() {
    console.log('Lietošana:');
    console.log(' node shop.js add "Produkta nosaukums" <daudzums> <cena>');
    console.log(' node shop.js list');
    console.log(' node shop.js total');
    console.log(' node shop.js clear');
}

if (command === 'add') {
    if (args.length !== 4) {
        console.log('Kļūda: add <nosaukums> <daudzums> <cena>');
        printUsage();
        process.exit(1);
    }

    const name = args[1];
    const qty = parseInt(args[2], 10);
    const price = parseFloat(args[3]);

    if (!name || Number.isNaN(qty) || qty <= 0 || Number.isNaN(price) || price <= 0) {
        console.error('Kļūda: Nosaukums, daudzums un cena ir obligāti. Daudzumam un cenai jābūt pozitīviem skaitļiem.');
        process.exit(1);
    }

    const newItem = { name, qty, price };
    items.push(newItem);
    saveList(items);

    const lineTotal = calcLineTotal(newItem);
    console.log(`Pievienots: ${name} * ${qty} (${price.toFixed(2)} EUR/gab.) = ${lineTotal.toFixed(2)} EUR`);

} else if (command === 'list') {
    if (items.length === 0) {
        console.log('Iepirkumu saraksts ir tukšs.');
    } else {
        console.log('Iepirkumu saraksts:');
        items.forEach((item, index) => {
            const lineTotal = calcLineTotal(item);
            console.log(` ${index + 1}. ${item.name} * ${item.qty} - ${item.price.toFixed(2)} EUR/gab. - ${lineTotal.toFixed(2)} EUR`);
        });
    }

} else if (command === 'total') {
    if (items.length === 0) {
        console.log('Kopā: 0.00 EUR (0 vienības, 0 produkti)');
    } else {
        const grandTotal = calcGrandTotal(items);
        const totalQty = countUnits(items);
        const productCount = items.length;
        console.log(`Kopā: ${grandTotal.toFixed(2)} EUR (${totalQty} vienības, ${productCount} produkti)`);
    }

} else if (command === 'clear') {
    saveList([]);
    console.log('Saraksts iztukšots.');

} else {
    printUsage();
}



