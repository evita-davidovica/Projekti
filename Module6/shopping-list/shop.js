// shop.js izmanto storage.js funkcijas, lai pārvaldītu iepirkumu sarakstu
const { loadList, saveList } = require('./storage');

const args = process.argv.slice(2); // Saņem komandrindas argumentus
const command = args[0]; // Pirmais arguments ir komanda
const items = loadList(); // Ielādē iepirkumu sarakstu no faila

if (command === 'add' && args[1] && args[2]) {
    const name = args[1];
    const price = parseFloat(args[2]);

    items.push({ name, price });
    saveList(items);
    console.log(`Pievienots: ${name} (${price} EUR)`);
} else if (command === 'list') {
    if (items.length === 0) {
        console.log('Saraksts ir tukšs.');
    } else {
        console.log('Iepirkumu saraksts:');
        items.forEach((item, index) => {
            console.log(` ${index + 1}. ${item.name} - ${item.price.toFixed(2)} EUR`);
        });
    }

} else if (command === 'total') {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    console.log(`Kopējā summa: ${total.toFixed(2)} EUR (${items.length} produkti)`);

} else if (command === 'clear') {
    saveList([]);
    console.log(`Saraksts iztukšots.`);

} else {
    console.log('Lietošana: ');
    console.log(' node shop.js add "Produkta nosaukums" "Cena"');
    console.log(' node shop.js list');
    console.log(' node shop.js total');
    console.log(' node shop.js clear');
}


