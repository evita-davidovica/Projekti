const { getDescription } = require('./utils.js');
const { loadData } = require('./storage.js');

async function showHistory(appData, rl) {
    if (!appData) appData = loadData(); 

    if (!appData.weatherHistory || appData.weatherHistory.length === 0) {
        console.log('Vēsture ir tukša. Nav saglabātu laikapstākļu datu.');
        return;
    }

    const locations = appData.locations || [];
    if (locations.length === 0) {
        console.log('Nav saglabātu lokāciju.');
        return;
    }

    console.log('\n=== Laikapstākļu vēsture: ===');
    locations.forEach((loc, i) => {
        console.log(` ${i + 1}. ${loc.name}, ${loc.country}`);
    });

    const locChoise = await askQuestion(rl, 'Izvēlēties lokāciju, kuras vēsturi vēlies redzēt (ievadi numuru): ');
    const locIndex = parseInt(locChoise) - 1;
    
    if (isNaN(locIndex) || locIndex < 0 || locIndex >= locations.length) {
        console.log(`Nepareiza izvēle. Lūdzu, izvēlieties numuru no 1 līdz ${locations.length}.`);
        return;
    }
    
    const selectedLoc = locations[locIndex];

    const days = await askQuestion(rl, 'Dienu skaits vēsturē (noklusējums 5) [Enter=5]: ') || '5';
    const limitDays = parseInt(days) || 5;

    displayLocationHistory(appData.weatherHistory, selectedLoc.id, limitDays);
}

function displayLocationHistory(history, locationId, daysBack) {
    const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
    const locHistory = history.filter(record => record.locationId === locationId && new Date(record.fetchedAt) >= cutoff)
.sort((a, b) => new Date(b.fetchedAt) - new Date(a.fetchedAt))
.slice(0, 20);

if (locHistory.length === 0) {
    console.log(`Nav datu par šo lokāciju pēdējās ${daysBack} dienās.`);
    return;
}

console.log(`\n=== Laikapstākļu vēsture lokācijai ${locationId} pēdējās ${daysBack} dienās: ===`);
    console.log('Laiks                | Temp (°C) | Mitrums (%) | Vējš (m/s) | Apraksts');
    console.log('---------------------|-----------|-------------|------------|----------------');
    locHistory.forEach(record => {
    const time = new Date(record.fetchedAt).toLocaleString();
    const temp = (record.temperature_2m || record.temp || 0).toFixed(1);
    const humidity = (record.relative_humidity_2m || record.humidity || 0).toFixed(1);
    const wind = (record.wind_speed_10m || record.wind || 0).toFixed(1);
    const description = getDescription(record.weather_code || record.weatherCode);
        console.log(`${time} | ${temp}       | ${humidity}         | ${wind}        | ${description}`);
    });

const temps = locHistory.map(r => r.temperature_2m || r.temp || r.temperature).filter(v => v !== undefined && v !== null);
    const hums = locHistory.map(r => r.relative_humidity_2m || r.humidity).filter(v => v !== undefined && v !== null);

console.log('---------------------|-----------|-------------|------------|----------------');
    console.log(`--Statistika (${locHistory.length} ieraksti) --`);
    if (temps.length > 0) {
        console.log(` Vidējā temperatūra: ${avg(temps).toFixed(1)} °C`);
        console.log(` Min / Max:          ${Math.min(...temps).toFixed(1)} / ${Math.max(...temps).toFixed(1)} °C`);
    }
    if (hums.length > 0) {
        console.log(` Vidējais mitrums:   ${avg(hums).toFixed(1)} %`);
    }
}

function avg(array) {
    return array.length ? array.reduce((a, b) => a + b) / array.length : 0;
}

function getLocName(locationId) {
    const data = loadData();
    const loc = data.locations?.find(l => l.id === locationId);
    return loc?.name || 'Nezināma lokācija';
}

async function askQuestion(rl, prompt) {
    return new Promise(resolve => {
        rl.question(prompt, answer => {
            resolve(answer.trim());
        });
    });
}

module.exports = { showHistory };
