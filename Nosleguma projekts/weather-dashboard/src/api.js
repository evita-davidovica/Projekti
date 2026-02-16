console.log('Posms 2: Open-Meteo API tests');

async function testRigaCoords() {
    const fs = require('fs');
    const { loadData } = require('./storage.js');
    const appData = loadData();
    const data = JSON.stringify(appData);
    let riga = appData.locations[0];

    if (riga && riga.name) {
        console.log('Rīga no storage.js: ', riga.name, riga.latitude, riga.longitude);
    } else {
        console.log('Lieto fiksētas Rīgas koordinātes');
        riga = { name: 'Rīga', latitude: 56.9496, longitude: 24.1052 };
    }
    return riga;
}

async function testOpenMeteoAPI() {
    const riga = await testRigaCoords();

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${riga.latitude}&longitude=${riga.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe/Riga`;

    try {
        console.log('\nIegūstam datus no Open-Meteo API...');
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current;
        console.log('API atbilde saņemta!');
        console.log(`Temperatūra: ${current.temperature_2m}°C
            Gaisa mitrums: ${current.relative_humidity_2m}%
            Vēja ātrums: ${current.wind_speed_10m} m/s
            Laika kods: ${current.weather_code}
            `);

const { displayWeather } = require('./display.js');
displayWeather(current, riga.name || 'Rīga');

    } catch (error) {
        console.error('Kļūda, iegūstot datus no Open-Meteo API:', error);
    }
}


testOpenMeteoAPI();
