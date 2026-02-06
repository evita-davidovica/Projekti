const fs = require('fs'); 
const PATH = 'shopping.json'; 

function loadList() { 
    try {
        const data = fs.readFileSync(PATH, 'utf8'); 
        return JSON.parse(data);
    } catch {
        return []; 
    }
}

function saveList(items) { // Saglabā sarakstu failā
    fs.writeFileSync(PATH, JSON.stringify(items, null, 2)); // null, 2 - formatē JSON ar atkāpēm, lai būtu vieglāk lasāms
}

module.exports = { loadList, saveList };

