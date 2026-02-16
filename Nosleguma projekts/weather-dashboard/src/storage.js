const fs = require('fs');
const path = require('path');

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
    const dataFile = findDataFile();

    if (dataFile) {
        try {
            return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        } catch (error) {
            console.log('storage.js: bojāti dati weather-data.json');
        }
    }

return {
    locations: [],
    weatherHistory: []
};
}

function saveData(data) {
    const dataFile = findDataFile() || path.join(__dirname, 'weather-data.json');

    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log('Dati saglabāti');
    } catch (error) {
        console.error('Nevar saglabāt datus:', error);
    }
}

module.exports = { loadData, saveData };
