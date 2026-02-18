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
        let data = JSON.parse(raw);
        
        if (data.weatherHistory && Array.isArray(data.weatherHistory)) {
            let needsSave = false;
            data.weatherHistory.forEach(record => {
                if (!record.weather_code && record.weather_code !== 0) {
            
                    record.weather_code = inferWeatherCode(record);
                    needsSave = true;
                }
            });
            if (needsSave) {
                saveData(data);
            }
        }
        
        return data;
    } catch (error) {
        console.error('Nevar ielādēt datus:', error.message);
        return { locations: [], weatherHistory: [] };
    }
}

function inferWeatherCode(record) {
    if (record.temperature_2m < -15) return 75;
    if (record.relative_humidity_2m > 90) return 45;
    if (record.wind_speed_10m > 15) return 80; 
    return 3; 
}

function saveData(data) {
    const dataFile = findDataFile() || DATA_FILE;

    try {
        const dir = path.dirname(dataFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log('Dati saglabāti');
    } catch (error) {
        console.error('Nevar saglabāt datus:', error);
    }
}

module.exports = { loadData, saveData };
