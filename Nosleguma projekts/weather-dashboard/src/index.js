const readline = require('readline');
const { displayWeather } = require('./display.js');
const { loadData, saveData } = require('./storage.js');
const { geocodeCity } = require('./geocoding.js');
const { showHistory } = require('./history.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let appData = loadData();
let selectedLocationId = appData.locations[0]?.id || null;

console.log('Laikapstākļu informācijas panelis - Dashboard v1.0');
console.log('================================');

showMenu();

function showMenu() {
    console.log('\nIzvēlne:');
    console.log('1. Parādīt pašreizējos Rīgas laikapstākļus');
    console.log('2. Skatīt vēsturi');
    console.log('3. Izvadīt lokācijas');
    console.log('4. Pievienot lokāciju');
    console.log('5. Izvēlēties lokāciju');
    console.log('6. Iziet');
    rl.question('Izvēlne: ', handleChoice);
}

async function handleChoice(choice) {
    switch(choice) {
        case '1':
            await getRigaWeather();
            break;
        case '2':
            await showHistory(appData, rl);
            break;
        case '3':
            listLocations();
            break;
        case '4':
            await addLocation();
            break;
        case '5':
            await chooseLocation();
            break;
        case '6':
            console.log('Iziet no programmas. Uz redzēšanos!');
            rl.close();
            return;
        default:
            console.log('Nepareiza izvēle. Lūdzu, izvēlieties no 1 līdz 6.');
            break;
    }
    showMenu();
}

async function getRigaWeather() {
    const riga = getOrCreateRiga();
    await getWeatherForLocation(riga, 'Rīga');
}

function listLocations() {
    if (appData.locations.length === 0) {
        console.log('Nav saglabātu lokāciju.');
        return;
    }

    console.log('\nSaglabātās lokācijas:');
    appData.locations.forEach((loc, index) => {
        const marker = loc.id === selectedLocationId ? ' [izvēlēta]' : '';
        console.log(`${index + 1}. ${loc.name}, ${loc.country} (${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)})${marker}`);
    });
}

function nextLocationId() {
    const used = appData.locations
        .map(loc => parseInt(String(loc.id).replace('loc_', ''), 10))
        .filter(value => Number.isFinite(value));
    const next = used.length ? Math.max(...used) + 1 : 1;
    return `loc_${String(next).padStart(3, '0')}`;
}

function getOrCreateRiga() {
    const existing = appData.locations.find(loc => loc.name.toLowerCase() === 'rīga' || loc.name.toLowerCase() === 'riga');
    if (existing) {
        return existing;
    }
    const riga = {
        id: nextLocationId(),
        name: 'Rīga',
        country: 'Latvia',
        latitude: 56.9496,
        longitude: 24.1052,
        addedAt: new Date().toISOString()
    };
    appData.locations.push(riga);
    saveData(appData);
    return riga;
}

function ask(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())));
}

async function addLocation() {
    const query = await ask('Ievadi pilsētas nosaukumu: ');
    if (!query) {
        console.log('Nav ievadīts pilsētas nosaukums.');
        return;
    }

    const results = await geocodeCity(query);
    if (!results.length) {
        console.log('Netika atrasti rezultāti.');
        return;
    }

    console.log('\nAtrastās lokācijas:');
    results.forEach((loc, index) => {
        console.log(`${index + 1}. ${loc.name}, ${loc.country} (${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)})`);
    });

    const choice = await ask(`\nIzvēlies numuru (1-${results.length}): `);
    const idx = Number(choice) - 1;
    if (!Number.isInteger(idx) || idx < 0 || idx >= results.length) {
        console.log('Nepareiza izvēle.');
        return;
    }

    const chosen = results[idx];
    const existing = appData.locations.find(loc =>
        loc.name.toLowerCase() === chosen.name.toLowerCase() &&
        loc.country.toLowerCase() === chosen.country.toLowerCase()
    );

    if (existing) {
        selectedLocationId = existing.id;
        console.log('Lokācija jau bija saglabāta. Tā tika izvēlēta.');
        return;
    }

    const newLocation = {
        id: nextLocationId(),
        name: chosen.name,
        country: chosen.country,
        latitude: chosen.latitude,
        longitude: chosen.longitude,
        addedAt: new Date().toISOString()
    };

    appData.locations.push(newLocation);
    saveData(appData);
    selectedLocationId = newLocation.id;
    console.log('Lokācija saglabāta un izvēlēta.');
}

async function chooseLocation() {
    if (appData.locations.length === 0) {
        console.log('Nav saglabātu lokāciju.');
        return;
    }

    listLocations();
    const choice = await ask(`Izvēlies numuru (1-${appData.locations.length}): `);
    const idx = Number(choice) - 1;
    if (!Number.isInteger(idx) || idx < 0 || idx >= appData.locations.length) {
        console.log('Nepareiza izvēle.');
        return;
    }

    selectedLocationId = appData.locations[idx].id;
    console.log(`Izvēlētā lokācija: ${appData.locations[idx].name}`);
    await getWeatherForLocation(appData.locations[idx]);
}

async function getWeatherForLocation(location, labelOverride) {
    console.log(`\nIegūst datus no Open-Meteo API (${location.name})...`);

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sekunžu timeout
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`API kļūda: ${response.status}`);

        const data = await response.json();
        if (!data.current) throw new Error('API atbilde nesatur pašreizējos datus');

        const current = data.current;

        try {
            appData.weatherHistory.unshift({
                locationId: location.id,
                fetchedAt: new Date().toISOString(),
                temperature_2m: current.temperature_2m,
                relative_humidity_2m: current.relative_humidity_2m,
                wind_speed_10m: current.wind_speed_10m,
                weather_code: current.weather_code
            });
            saveData(appData);
            console.log('Dati saglabāti kešatmiņā.');
        } catch (saveError) {
            console.log('Kļūda: nevar saglabāt datus kešatmiņā');
        }

        displayWeather(current, labelOverride || location.name);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('API pieprasījums pārsnēdza laika limitu (10s). Izmanto KEŠATMIŅU.');
        } else {
            console.log('Tīkla kļūda. Izmanto KEŠATMIŅU.');
            console.log(`Kļūdas ziņojums: ${error.message}`);
        }
        const cached = appData.weatherHistory.find(record => record.locationId === location.id);
        if (cached) {
            displayWeather(cached, 'KEŠATMIŅA');
        } else {
            console.log('Nav kešatmiņas datu. Lūdzu, pārbaudiet savu interneta savienojumu un mēģiniet vēlreiz.');
        }
    }
}


