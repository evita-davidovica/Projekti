const fs = require('fs'); // Ielādē failu sistēmas moduli, kas ļauj lasīt un rakstīt failus
const PATH = 'shopping-bonus.json'; // Definē ceļu uz failu, kurā tiks saglabāts iepirkumu saraksts

function normalizeItems(items) { // Funkcija, kas normalizē un validē preču sarakstu, lai nodrošinātu, ka dati ir pareizi formatēti
    if (!Array.isArray(items)) return []; // Ja items nav masīvs, atgriež tukšu masīvu

    return items
        .map((item) => { // Pārveido katru preci, pārbaudot tās struktūru un vērtības
            if (!item || typeof item !== 'object') return null; // Ja prece nav objekts, atgriež null

            const name = typeof item.name === 'string' ? item.name.trim() : ''; // Pārbauda, vai name ir virkne, un noņem liekās atstarpes
            const qtyRaw = item.qty !== undefined ? item.qty : 1; // Ja qty nav definēts, pieņem, ka tas ir 1
            const priceRaw = item.price; // Cenai jābūt definētai, nav noklusējuma vērtības
            const qty = parseFloat(qtyRaw); // Pārveido qty par peldošo skaitli
            const price = parseFloat(priceRaw); // Pārveido price par peldošo skaitli

            if (!name || Number.isNaN(qty) || qty <= 0 || Number.isNaN(price) || price <= 0) { // Pārbauda, vai name nav tukšs, qty un price ir derīgi pozitīvi skaitļi
                return null; // Ja kāda no pārbaudēm neizdodas, atgriež null, lai šī prece tiktu izfiltrēta
            }

            return { name, qty, price }; // Ja prece ir derīga, atgriež normalizēto preci ar name, qty un price
        })
        .filter(Boolean); // Filtrē null vērtības, atstājot tikai derīgas preces
}

function loadList(filename) { // Funkcija, kas ielādē iepirkumu sarakstu no faila
    try {
        if (!fs.existsSync(filename)) return [];
        const data = fs.readFileSync(filename, 'utf8'); // Mēģina nolasīt failu, ja fails neeksistē vai ir bojāts, tiks izmests kļūdas izņēmums
        return normalizeItems(JSON.parse(data)); // Pārveido nolasīto JSON datu par JavaScript objektu un normalizē to, lai nodrošinātu, ka dati ir pareizi formatēti
    } catch { // Ja rodas kļūda (piemēram, fails neeksistē), atgriež tukšu sarakstu
        return []; 
    }
}

function saveList(filename, items) { // Saglabā sarakstu failā
    const normalized = normalizeItems(items); // Normalizē preču sarakstu, lai nodrošinātu, ka dati ir pareizi formatēti pirms saglabāšanas
    fs.writeFileSync(filename, JSON.stringify(normalized, null, 2)); // null, 2 - formatē JSON ar atkāpēm, lai būtu vieglāk lasāms
}


function loadPrices(filename = 'prices.json') { // Funkcija, kas ielādē cenas no faila
    try {
        if (!fs.existsSync(filename)) return {};
        const data = fs.readFileSync(filename, 'utf8'); // Mēģina nolasīt failu, ja fails neeksistē vai ir bojāts, tiks izmests kļūdas izņēmums
        return JSON.parse(data); // Pārveido nolasīto JSON datu par JavaScript objektu, kurā atslēgas ir preču nosaukumi un vērtības ir cenas
    } catch (error) { // Ja rodas kļūda (piemēram, fails neeksistē), atgriež tukšu objektu
        return {};
    }
}

function savePrices(filename = 'prices.json', prices) { // Funkcija, kas saglabā cenas failā
    fs.writeFileSync(filename, JSON.stringify(prices, null, 2)); // Saglabā cenas objektu kā JSON datni, formatējot to ar atkāpēm, lai būtu vieglāk lasāms
}

function getPrice(prices, name) { // Funkcija, kas iegūst cenu priekš konkrēta preces nosaukuma
    if (!prices || typeof prices !== 'object') return null;
    return prices[name] != null ? prices[name] : null; // Atgriež cenu priekš dotā nosaukuma, ja tā ir saglabāta, pretējā gadījumā atgriež null
}

function setPrice(prices, name, price) { // Funkcija, kas saglabā cenu priekš konkrēta preces nosaukuma
    if (!prices || typeof prices !== 'object') return;
    prices[name] = price; // Atjaunina cenu priekš dotā nosaukuma ar jauno vērtību
}


module.exports = { loadList, saveList, loadPrices, savePrices, getPrice, setPrice };

