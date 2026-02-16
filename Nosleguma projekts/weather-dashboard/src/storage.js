const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/weather-data.json');

function findDataFile() {
    const possiblePath = [
        path.join(__dirname, 'weather-data.json'),
        path.join(__dirname, '..', 'weather-data.json'),
        path.join(__dirname, '..', '..', 'weather-data.json')
    ];

    for (const filePath of possiblePath) {
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    return null;
}

function loadData() {
    const dataFile = findDataFile() || DATA_FILE;

    try {
        if (!fs.existsSync(dataFile)) {
            return { locations: [], weatherHistory: [] };
        }
        const raw = fs.readFileSync(dataFile, 'utf-8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Nevar ielādēt datus:', error.message);
        return { locations: [], weatherHistory: [] };
    }
}

function saveData(data) {
    const dataFile = findDataFile() || DATA_FILE;

    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log('Dati saglabāti');
    } catch (error) {
        console.error('Nevar saglabāt datus:', error);
    }
}

module.exports = { loadData, saveData };
