const fs = require('fs');
const PATH = 'shopping.json';

function normalizeItems(items) {
    if (!Array.isArray(items)) return [];

    return items
        .map((item) => {
            if (!item || typeof item !== 'object') return null;

            const name = typeof item.name === 'string' ? item.name.trim() : '';
            const qtyRaw = item.qty !== undefined ? item.qty : 1;
            const priceRaw = item.price;
            const qty = parseInt(qtyRaw, 10);
            const price = parseFloat(priceRaw);

            if (!name || Number.isNaN(qty) || qty <= 0 || Number.isNaN(price) || price <= 0) {
                return null;
            }

            return { name, qty, price };
        })
        .filter(Boolean);
}

function loadList() {
    try {
        const data = fs.readFileSync(PATH, 'utf8');
        return normalizeItems(JSON.parse(data));
    } catch {
        return [];
    }
}

function saveList(items) { // Saglabā sarakstu failā
    const normalized = normalizeItems(items);
    fs.writeFileSync(PATH, JSON.stringify(normalized, null, 2)); // null, 2 - formatē JSON ar atkāpēm, lai būtu vieglāk lasāms
}

module.exports = { loadList, saveList };

