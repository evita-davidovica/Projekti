const readline = require('readline');
const { loadList, saveList, getPrice, setPrice } = require('./storage.js');
const { calcLineTotal, calcGrandTotal, countUnits } = require('./utils.js');

const args = process.argv.slice(2);
const command = args[0];
let items = loadList();

function printUsage() {
    console.log('Lietošana: node shop.js add <nosaukums> <daudzums> | list | total | clear');
}

if (command === 'add' && args.length === 3) {
    const name = args[1].toLowerCase();
    const qty = parseFloat(args[2]);

    if (isNaN(qty) || qty <= 0) {
        console.error('Kļūda: Daudzumam jābūt pozitīvam skaitlim.');
        process.exit(1);
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function addItem(price) {
        const newItem = { name, qty, price };
        items.push(newItem);
        saveList(items);
        const total = calcLineTotal(newItem);
        console.log(`Pievienots: ${name} * ${qty} (${price.toFixed(2)} EUR/gab.) = ${total.toFixed(2)} EUR`);
    }

    function handlePrice() {
        const storedPrice = getPrice(name);

        if (storedPrice) {
            console.log(`Atrasta cena: ${storedPrice.toFixed(2)} EUR/gab.`);
            rl.question('[A]kceptēt / [M]ainīt? > ', (answer) => {
                const choice = answer.toLowerCase().trim();
                if (choice === 'a') {
                    addItem(storedPrice);
                    rl.close();
                } else {
                    rl.question('Jaunā cena: > ', (newPriceStr) => {
                        const newPrice = parseFloat(newPriceStr);
                        if (isNaN(newPrice) || newPrice <= 0) {
                            console.error('Kļūda: Cenai jābūt pozitīvam skaitlim.');
                            rl.close();
                            return;
                        }
                        setPrice(name, newPrice);
                        console.log(`Cena saglabāta: ${name} ${newPrice.toFixed(2)} EUR`);
                        addItem(newPrice);
                        rl.close();
                    });
                }
            });
        } else {
            rl.question('Cena nav zināma.\nIevadiet cenu: > ', (priceStr) => {
                const price = parseFloat(priceStr);
                if (isNaN(price) || price <= 0) {
                    console.error('Kļūda: Cenai jābūt pozitīvam skaitlim.');
                    rl.close();
                    return;
                }
                setPrice(name, price);
                console.log(`Cena saglabāta: ${name} (${price.toFixed(2)} EUR)`);
                addItem(price);
                rl.close();
            });
        }
    }

    handlePrice();
} else if (command === 'add') {
    console.error('Kļūda: add <nosaukums> <daudzums>');
    printUsage();
    process.exit(1);

} else if (command === 'list') {
    if (items.length === 0) {
        console.log('Iepirkumu saraksts ir tukšs.');
    } else {
        console.log('Iepirkumu saraksts:');
        items.forEach((item,index) => {
            const lineTotal = calcLineTotal(item);
            console.log(` ${index + 1}. ${item.name} * ${item.qty} - ${item.price.toFixed(2)} EUR/gab. - ${lineTotal.toFixed(2)} EUR`);
        });
    }

} else if (command === 'total') {
    const grandTotal = calcGrandTotal(items);
    const totalQty = countUnits(items);
    const productCount = items.length;
    console.log(`Kopā: ${grandTotal.toFixed(2)} EUR (${totalQty} vienības, ${productCount} produkti)`);
} else if (command === 'clear') {
    items = [];
    saveList(items);
    console.log('Iepirkumu saraksts iztukšots.');

} else {
    printUsage();
}
