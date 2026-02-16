const readline = require('readline');
const { displayWeather } = require('./display.js');
const { getDescription } = require('./utils.js');
const { loadData, saveData } = require('./storage.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let appData = loadData();

console.log('Laikapstākļu informācijas panelis - Dashboard v1.0');
console.log('================================');

showMenu();

    function showMenu() {
        console.log('\nIzvēlne:');
        console.log('1. Parādīt pašreizējos Rīgas laikapstākļus');
        console.log('2. Skatīt vēsturi');
        console.log('3. Izvadīt lokācijas');
        console.log('4. Iziet');
        rl.question('Izvēlne: ', handleChoice);
    }

async function handleChoice(choice) {
    switch(choice) {
        case '1':
            await getRigaWeather();
            break;
        case '2':
            showHistory();
            break;
        case '3':
            listLocations();
            break;
        case '4':
            console.log('Iziet no programmas. Uz redzēšanos!');
            rl.close();
            return;
            default:
                console.log('Nepareiza izvēle. Lūdzu, izvēlieties no 1 līdz 4.');
    }
    showMenu();
}

async function getRigaWeather() {
    console.log('\nIegūst Rīgas datus no Open-Meteo API...');

    const riga = { latitude: 56.9496, longitude: 24.1052, name: 'Rīga' };
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${riga.latitude}&longitude=${riga.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe/Riga`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const current = data.current;

        appData.weatherHistory.unshift({
            locationId: 'loc_001',
            fetchedAt: new Date().toISOString(),
            ...current});

        saveData(appData);
        displayWeather(current, 'Rīga');

    } catch (error) {
        console.log('Tīkla kļūda. Izmanto pēdējos datus.');
        showCatchWeather('loc_001');
    }
}

function showHistory() {
    if (appData.weatherHistory.length === 0) {
        console.log('Vēsture ir tukša.');
        return;
    }

    console.log('\nLaikapstākļu vēsture:');
    appData.weatherHistory.slice(0, 5).forEach((record, i) => {
        const loc = appData.locations.find(l => l.id === record.locationId);
        console.log(`${i+1}. ${new Date(record.fetchedAt).toLocaleString('lv-LV')} - ${record.temperature_2m}°C, ${getDescription(record.weather_code)}`);
    });
}

function listLocations() {
    if (appData.locations.length === 0) {
        console.log('Nav saglabātu lokāciju.');
        return;
    }

    console.log('\nSaglabātās lokācijas:');
    appData.locations.forEach(loc => {
        console.log(`- ${loc.name}, ${loc.country} (${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)})`);
    });
}

function showCatchWeather(locationId) {
    const history = appData.weatherHistory.filter(h => h.locationId === locationId);
    if (history.length > 0) {
        const latest = history[0];
        displayWeather(latest, 'KEŠS');
    }
}

