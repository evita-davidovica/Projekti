const fs = require('fs');
const readline = reguire('readline');
const { loadList, saveList, loadPrices, savePrices, getPrice, setPrice } = reguire('./storage');

// Lietotāja izvēle
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});

    function askListName() {
        return new Promise(resolve => {
            rl.question('Ievadiet saraksta nosaukumu vai jaunā saraksta nosaukumu: ', name => {
                const filename = `shopping-${name}.json`;
                if (!fs.existsSync(filename)) {
                    fs.writeFileSync(filename, '[]');
                    console.log(`Izveidots jauns saraksts: ${filename}`);
                } else {
                    console.log(`Izvēlēties esošu sarakstu: ${filename}`);
                }
                resolve(filename);
            });
        });
    }

    // Funkcija saraksta eksportam uz .txt formātu
    function exportList(list, filename) {
        let text = 'Iepirkumu saraksts:\n';
        let total = 0;
        let units = 0;

        list.forEach((item, idx) => {
            const itemTotal = item.price * item.qty;
            text += `${idx + 1}. ${item.name} * ${item.qty} - ${item.price.toFixed(2)} EUR/gab. - ${itemTotal.toFixed(2)} EUR\n`;
            total += itemTotal;
            units += item.qty;
        });
        text += `\nKopā: ${total.toFixed(2)} EUR (${units} vienības)\n`;
        
        const txtFile = filename.replace('.json', '.txt');
        fs.writeFileSync(txtFile, text);
        console.log(`Saraksts eksportēts uz ${txtFile}`);
        }
        
        // Pagriež galveno loģiku ar komandrindu
        async function main() {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
        console.log('Komandas: add, list, total, clear, export');
        rl.close();
        return;
        }

        const listFile = await askListName();
        const prices = loadPrices();
        let list = loadList(listFile);

        const cmd = args[0].toLowerCase();

        if (cmd === 'add') {
            const name = args[1];
            let qty = parseFloat(args[2]) || 1;

            let price = getPrice(prices, name);

            if (price != null) {
                console.log(`Cena atrasta: ${price.toFixed(2)} EUR/gab.`);
                const answer = await new Promise(res => rl.question('[A]kceptēt / [M]ainīt? > ', res));
                if (answer.toLowerCase() === 'm') {
                    const newPrice = parseFloat(await new Promise(res => rl.question('Jaunā cena: > ', res)));
                    setPrice(prices, name, newPrice);
                    savePrices(prices);
                    price = newPrice;
                    console.log(`Jaunā cena saglabāta: ${name} ${price.toFixed(2)} EUR`);
                }
            } else {
                const newPrice = parseFloat(await new Promise(res => rl.question('Cena nav zināma. Ievadiet cenu: > ', res)));
                setPrice(prices, name, newPrice);
                savePrices(prices);
                price = newPrice;
                console.log(`Cena saglabāta: ${name} (${price.toFixed(2)} EUR)`);
            }
                
            list.push({ name, qty, price });
            saveList(listFile, list);
            console.log(`Pievienots: ${name} * ${qty} (${price.toFixed(2)} EUR/gab.) = ${(price*qty).toFixed(2)} EUR`);
            
            } else if (cmd === 'list') {}
             console.log('Iepirkumu saraksts:');
             list.forEach((item, idx) => {
                console.log(` ${idx + 1}. ${item.name} * $item.qty - ${item.price.toFixed(2)} EUR/gab. - ${(item.price*item.qty).toFixed(2)} EUR`);
});

} else if (cmd === 'total') {
 const total = list.reduce((sum, item) => sum + item.price*item.qty, 0);
 const units = list.reduce((sum, item) => sum + item.qty, 0);
 console.log(`Kopā: ${total.toFixed(2)} EUR (${units} vienības)`);
 
} else if (cmd === 'clear') {
 list = [];
 saveList(listFile, list);
 console.log('Iepirkumu saraksts iztīrīts.');
 
} else if (cmd === 'export') {
 exportList(list, listFile);
 
} else {
    console.log('Neatpazīta komanda.');
}
    
rl.close();
}

main();
