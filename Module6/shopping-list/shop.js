const readline = require('readline'); // Ielādē readline moduli, kas ļauj lasīt ievadi no komandrindas
const { loadList, saveList, getPrice, setPrice } = require('./storage.js'); // Ielādē funkcijas no storage.js, kas atbild par datu ielādi un saglabāšanu
const { calcLineTotal, calcGrandTotal, countUnits } = require('./utils.js'); // Ielādē funkcijas no utils.js, kas atbild par cenu aprēķiniem un vienību skaitīšanu

const args = process.argv.slice(2); // Saņem komandrindas argumentus, izņemot pirmos divus (node un skripta nosaukums)
const command = args[0]; // Pirmais arguments ir komanda (add, list, total, clear)
let items = loadList(); // Ielādē iepirkumu sarakstu no faila

function printUsage() { // Izvada lietošanas instrukciju
    console.log('Lietošana: node shop.js add <nosaukums> <daudzums> | list | total | clear'); // Piemērs: node shop.js add maize 2
}

if (command === 'add' && args.length === 3) { // Pārbauda, vai komanda ir "add" un ir trīs argumenti (add, nosaukums, daudzums)
    const name = args[1].toLowerCase(); // Nosaukums tiek pārveidots uz mazajiem burtiem, lai nodrošinātu vienotu formātu
    const qty = parseFloat(args[2]); // Daudzums tiek pārveidots par skaitli

    if (isNaN(qty) || qty <= 0) { // Pārbauda, vai daudzums ir derīgs pozitīvs skaitlis
        console.error('Kļūda: Daudzumam jābūt pozitīvam skaitlim.'); // Ja nav pozitīvs skaitlis, tad izvada kļūdas ziņojumu
        process.exit(1); // Pārtrauc programmu ar kļūdas kodu
    }

    const rl = readline.createInterface({ // Izveido readline interfeisu, lai lasītu ievadi no komandrindas
        input: process.stdin, // Ievade no standarta ievades (komandrindas)
        output: process.stdout // Izvade uz standarta izvades (komandrindas)
    });

    function addItem(price) { // Funkcija, kas pievieno preci sarakstam ar norādīto cenu
        const newItem = { name, qty, price }; // Izveido jaunu preces objektu ar nosaukumu, daudzumu un cenu
        items.push(newItem); // Pievieno jauno preci sarakstam
        saveList(items); // Saglabā atjaunināto sarakstu failā
        const total = calcLineTotal(newItem); // Aprēķina preces kopējo cenu (daudzums * cena)
        console.log(`Pievienots: ${name} * ${qty} (${price.toFixed(2)} EUR/gab.) = ${total.toFixed(2)} EUR`); // Izvada informāciju par pievienoto preci un tās kopējo cenu
    }

    function handlePrice() { // Funkcija, kas apstrādā cenas iegūšanu vai ievadi
        const storedPrice = getPrice(name); // Mēģina iegūt saglabāto cenu priekš šīs preces nosaukuma

        if (storedPrice) { // Ja cena ir saglabāta, piedāvā to akceptēt vai mainīt
            console.log(`Atrasta cena: ${storedPrice.toFixed(2)} EUR/gab.`); // Izvada atrasto cenu
            rl.question('[A]kceptēt / [M]ainīt? > ', (answer) => { // Uzdod jautājumu, vai akceptēt atrasto cenu vai mainīt to
                const choice = answer.toLowerCase().trim(); // Pārveido atbildi uz mazajiem burtiem un noņem liekās atstarpes
                if (choice === 'a') { // Ja izvēle ir akceptēt, pievieno preci ar atrasto cenu
                    addItem(storedPrice); // Pievieno preci ar atrasto cenu
                    rl.close(); 
                } else {
                    rl.question('Jaunā cena: > ', (newPriceStr) => { // Ja izvēle ir mainīt, uzdod jautājumu par jauno cenu
                        const newPrice = parseFloat(newPriceStr); // Pārveido jauno cenu par skaitli
                        if (isNaN(newPrice) || newPrice <= 0) { // Pārbauda, vai jaunā cena ir derīgs pozitīvs skaitlis
                            console.error('Kļūda: Cenai jābūt pozitīvam skaitlim.'); // Ja nav pozitīvs skaitlis, izvada kļūdas ziņojumu
                            rl.close();
                            return; // Pārtrauc funkciju, ja cena nav derīga
                        }
                        setPrice(name, newPrice); // Saglabā jauno cenu ar preces nosaukumu
                        console.log(`Cena saglabāta: ${name} ${newPrice.toFixed(2)} EUR`); // Izvada informāciju par saglabāto cenu
                        addItem(newPrice); // Pievieno preci ar jauno cenu
                        rl.close(); 
                    });
                }
            });
        } else { 
            rl.question('Cena nav zināma.\nIevadiet cenu: > ', (priceStr) => { // Ja cena nav saglabāta, uzdod jautājumu par cenu
                const price = parseFloat(priceStr); // Pārveido ievadīto cenu par skaitli
                if (isNaN(price) || price <= 0) { // Pārbauda, vai ievadītā cena ir derīgs pozitīvs skaitlis
                    console.error('Kļūda: Cenai jābūt pozitīvam skaitlim.'); // Ja nav pozitīvs skaitlis, izvada kļūdas ziņojumu
                    rl.close();
                    return;
                }
                setPrice(name, price); // Saglabā ievadīto cenu ar preces nosaukumu
                console.log(`Cena saglabāta: ${name} (${price.toFixed(2)} EUR)`); // Izvada informāciju par saglabāto cenu
                addItem(price); // Pievieno preci ar ievadīto cenu
                rl.close();
            });
        }
    }

    handlePrice(); // Sāk cenu apstrādi (iegūšanu vai ievadi)
} else if (command === 'add') { // Ja komanda ir "add", bet nav pareizi norādīti argumenti, izvada kļūdas ziņojumu un lietošanas instrukciju
    console.error('Kļūda: add <nosaukums> <daudzums>'); // Piemērs: node shop.js add maize 2
    printUsage(); // Izvada lietošanas instrukciju
    process.exit(1); 

} else if (command === 'list') { // Ja komanda ir "list", izvada iepirkumu sarakstu
    if (items.length === 0) { // Ja saraksts ir tukšs, izvada informāciju par to
        console.log('Iepirkumu saraksts ir tukšs.'); // Ja saraksts nav tukšs, izvada katru preci ar tās informāciju
    } else {
        console.log('Iepirkumu saraksts:'); // Izvada virsrakstu sarakstam
        items.forEach((item,index) => { // Izvada katru preci ar tās informāciju (nosaukums, daudzums, cena un kopējā cena)
            const lineTotal = calcLineTotal(item); // Aprēķina preces kopējo cenu (daudzums * cena)
            console.log(` ${index + 1}. ${item.name} * ${item.qty} - ${item.price.toFixed(2)} EUR/gab. - ${lineTotal.toFixed(2)} EUR`); // Izvada informāciju par preci, tās daudzumu, cenu un kopējo cenu
        });
    }

} else if (command === 'total') { // Ja komanda ir "total", izvada visu preču kopējo cenu, kopējo daudzumu un produktu skaitu
    const grandTotal = calcGrandTotal(items); // Aprēķina visu preču kopējo cenu, summējot katras preces kopējo cenu
    const totalQty = countUnits(items); // Saskaita visu preču daudzumu, summējot katras preces daudzumu
    const productCount = items.length; // Saskaita produktu skaitu
    console.log(`Kopā: ${grandTotal.toFixed(2)} EUR (${totalQty} vienības, ${productCount} produkti)`);
} else if (command === 'clear') { // Ja komanda ir "clear", iztukšo iepirkumu sarakstu
    items = [];
    saveList(items); // Saglabā tukšo sarakstu
    console.log('Iepirkumu saraksts iztukšots.'); // Izvada informāciju par iztukšoto sarakstu

} else {
    printUsage(); // Ja komanda nav atpazīta, izvada lietošanas instrukciju
}
