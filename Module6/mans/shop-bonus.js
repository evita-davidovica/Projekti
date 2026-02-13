const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { loadList, saveList, loadPrices, savePrices, getPrice, setPrice } = require('./storage-bonus.js');

const PRICES_FILE = path.join(__dirname, 'prices-bonus.json');

// Lietotāja izvēle
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});

    function askQuestion(prompt) {
        return new Promise(resolve => {
            rl.question(prompt, answer => resolve(answer.trim()));
        });
    }

    function getListFiles() {
        return fs.readdirSync(__dirname)
            .filter((file) => /^shopping-.*\.json$/i.test(file))
            .map((file) => path.join(__dirname, file));
    }

    async function createNewList() {
        while (true) {
            const name = await askQuestion('Ievadiet jaunā saraksta nosaukumu: ');
            if (!name) {
                console.log('Nosaukums nevar būt tukšs.');
                continue;
            }

            const filename = path.join(__dirname, `shopping-${name}.json`);
            if (!fs.existsSync(filename)) {
                fs.writeFileSync(filename, '[]');
                console.log(`Izveidots jauns saraksts: ${path.basename(filename)}`);
            } else {
                console.log(`Izvēlēties esošu sarakstu: ${path.basename(filename)}`);
            }
            return filename;
        }
    }

    async function chooseExistingList(listFiles) {
        if (listFiles.length === 0) {
            console.log('Nav esošu sarakstu. Izveidosim jaunu.');
            return createNewList();
        }

        console.log('Pieejamie saraksti:');
        listFiles.forEach((file, idx) => {
            const display = path.basename(file).replace(/^shopping-/, '').replace(/\.json$/i, '');
            console.log(` ${idx + 1}. ${display}`);
        });

        const choice = await askQuestion('Ievadiet numuru vai saraksta nosaukumu: ');
        const number = parseInt(choice, 10);
        if (!Number.isNaN(number) && number >= 1 && number <= listFiles.length) {
            return listFiles[number - 1];
        }

        if (!choice) {
            console.log('Nav izvēles, izveidosim jaunu sarakstu.');
            return createNewList();
        }

        const filename = path.join(__dirname, `shopping-${choice}.json`);
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, '[]');
            console.log(`Izveidots jauns saraksts: ${path.basename(filename)}`);
        } else {
            console.log(`Izvēlēts saraksts: ${path.basename(filename)}`);
        }
        return filename;
    }

    async function askListName() {
        const mode = (await askQuestion('Izvēlieties: [J]auns vai [E]sošs saraksts? > ')).toLowerCase();
        const listFiles = getListFiles();

        if (mode === 'e') {
            return chooseExistingList(listFiles);
        }

        return createNewList();
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

        async function main() {
        const listFile = await askListName();
        const prices = loadPrices();
        let list = loadList(listFile);
        }
        main();


        const cmd = args[0].toLowerCase();

        if (cmd === 'add') {
            let qty = 1;
            let nameParts = args.slice(1);
            const lastArg = nameParts[nameParts.length - 1];
            const lastQty = parseFloat(lastArg);
            if (nameParts.length > 1 && !Number.isNaN(lastQty)) {
                qty = lastQty;
                nameParts = nameParts.slice(0, -1);
            }
            const name = nameParts.join(' ').trim();

            let price = getPrice(prices, name);

            if (price != null) {
                console.log(`Cena atrasta: ${price.toFixed(2)} EUR/gab.`);
                const answer = await new Promise(res => rl.question('[A]kceptēt / [M]ainīt? > ', res));
                if (answer.toLowerCase() === 'm') {
                    const newPrice = parseFloat(await new Promise(res => rl.question('Jaunā cena: > ', res)));
                    setPrice(prices, name, newPrice);
                    savePrices(PRICES_FILE, prices);
                    price = newPrice;
                    console.log(`Jaunā cena saglabāta: ${name} ${price.toFixed(2)} EUR`);
                }
            } else {
                const newPrice = parseFloat(await new Promise(res => rl.question('Cena nav zināma. Ievadiet cenu: > ', res)));
                setPrice(prices, name, newPrice);
                savePrices(PRICES_FILE, prices);
                price = newPrice;
                console.log(`Cena saglabāta: ${name} (${price.toFixed(2)} EUR)`);
            }
                
            list.push({ name, qty, price });
            saveList(listFile, list);
            console.log(`Pievienots: ${name} * ${qty} (${price.toFixed(2)} EUR/gab.) = ${(price*qty).toFixed(2)} EUR`);
            
                } else if (cmd === 'list') {
                 console.log('Iepirkumu saraksts:');
                 list.forEach((item, idx) => {
                     console.log(` ${idx + 1}. ${item.name} * ${item.qty} - ${item.price.toFixed(2)} EUR/gab. - ${(item.price*item.qty).toFixed(2)} EUR`);
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

