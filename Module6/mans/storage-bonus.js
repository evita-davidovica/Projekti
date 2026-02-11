const fs = require('fs'); // Ielādē failu sistēmas moduli, kas ļauj lasīt un rakstīt failus
const PATH = 'shopping.json'; // Definē ceļu uz failu, kurā tiks saglabāts iepirkumu saraksts

function normalizeItems(items) { // Funkcija, kas normalizē un validē preču sarakstu, lai nodrošinātu, ka dati ir pareizi formatēti
    if (!Array.isArray(items)) return []; // Ja items nav masīvs, atgriež tukšu masīvu

    return items
        .map((item) => { // Pārveido katru preci, pārbaudot tās struktūru un vērtības
            if (!item || typeof item !== 'object') return null; // Ja prece nav objekts, atgriež null

            const name = typeof item.name === 'string' ? item.name.trim() : ''; // Pārbauda, vai name ir virkne, un noņem liekās atstarpes
            const qtyRaw = item.qty !== undefined ? item.qty : 1; // Ja qty nav definēts, pieņem, ka tas ir 1
            const priceRaw = item.price; // Cenai jābūt definētai, nav noklusējuma vērtības
            const qty = parseInt(qtyRaw, 10); // Pārveido qty par veselu skaitli
            const price = parseFloat(priceRaw); // Pārveido price par peldošo skaitli

            if (!name || Number.isNaN(qty) || qty <= 0 || Number.isNaN(price) || price <= 0) { // Pārbauda, vai name nav tukšs, qty un price ir derīgi pozitīvi skaitļi
                return null; // Ja kāda no pārbaudēm neizdodas, atgriež null, lai šī prece tiktu izfiltrēta
            }

            return { name, qty, price }; // Ja prece ir derīga, atgriež normalizēto preci ar name, qty un price
        })
        .filter(Boolean); // Filtrē null vērtības, atstājot tikai derīgas preces
}

function loadList() { // Funkcija, kas ielādē iepirkumu sarakstu no faila
    try {
        const data = fs.readFileSync(PATH, 'utf8'); // Mēģina nolasīt failu, ja fails neeksistē vai ir bojāts, tiks izmests kļūdas izņēmums
        return normalizeItems(JSON.parse(data)); // Pārveido nolasīto JSON datu par JavaScript objektu un normalizē to, lai nodrošinātu, ka dati ir pareizi formatēti
    } catch { // Ja rodas kļūda (piemēram, fails neeksistē), atgriež tukšu sarakstu
        return []; 
    }
}

function saveList(items) { // Saglabā sarakstu failā
    const normalized = normalizeItems(items); // Normalizē preču sarakstu, lai nodrošinātu, ka dati ir pareizi formatēti pirms saglabāšanas
    fs.writeFileSync(PATH, JSON.stringify(normalized, null, 2)); // null, 2 - formatē JSON ar atkāpēm, lai būtu vieglāk lasāms
}

const PRICES_PATH = 'prices.json'; // Definē ceļu uz failu, kurā tiks saglabātas preču cenas

function loadPrices() { // Funkcija, kas ielādē cenas no faila
    try {
        const data = fs.readFileSync(PRICES_PATH, 'utf8'); // Mēģina nolasīt failu, ja fails neeksistē vai ir bojāts, tiks izmests kļūdas izņēmums
        return JSON.parse(data); // Pārveido nolasīto JSON datu par JavaScript objektu, kurā atslēgas ir preču nosaukumi un vērtības ir cenas
    } catch (error) { // Ja rodas kļūda (piemēram, fails neeksistē), atgriež tukšu objektu
        return {};
    }
}

function savePrices(prices) { // Funkcija, kas saglabā cenas failā
    fs.writeFileSync(PRICES_PATH, JSON.stringify(prices, null, 2)); // Saglabā cenas objektu kā JSON datni, formatējot to ar atkāpēm, lai būtu vieglāk lasāms
}

function getPrice(name) { // Funkcija, kas iegūst cenu priekš konkrēta preces nosaukuma
    const prices = loadPrices(); // Ielādē cenas no faila, lai iegūtu aktuālo cenu sarakstu
    return prices[name] || null; // Atgriež cenu priekš dotā nosaukuma, ja tā ir saglabāta, pretējā gadījumā atgriež null
}

function setPrice(name, price) { // Funkcija, kas saglabā cenu priekš konkrēta preces nosaukuma
    const prices = loadPrices(); // Ielādē cenas no faila, lai iegūtu aktuālo cenu sarakstu
    prices[name] = price; // Atjaunina cenu priekš dotā nosaukuma ar jauno vērtību
    savePrices(prices); // Saglabā atjaunināto cenu sarakstu atpakaļ failā, lai izmaiņas tiktu saglabātas
}


module.exports = { loadList, saveList, loadPrices, savePrices, getPrice, setPrice };

