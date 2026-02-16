const { getDescription } = require('./utils.js');

function displayWeather(data, location = 'Rīga') {
    console.log(`
        
┌─────────────────────────────┐
│     🌤️ ${location}          │
├─────────────────────────────┤
│  🌡️  ${data.temperature_2m}°C     │
│  💧  ${data.relative_humidity_2m}% │
│  💨  ${data.wind_speed_10m} m/s   │
│  ${getDescription(data.weather_code)} │
└─────────────────────────────┘    
`);
}

module.exports = { displayWeather };

