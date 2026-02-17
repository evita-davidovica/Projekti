const weatherCodes = {
    0: '☀️ Skaidrs laiks',
    1: '🌤️ Pārsvarā skaidrs',
    2: '⛅ Daļēji mākoņains',
    3: '☁️ Apmācies',
    45: '🌫️ Migla',
    48: '🌫️ Migla ar sīku krusu',
    51: '🌦️ Viegls lietus smidzināšana',
    53: '🌧️ Mērens lietus smidzināšana',
    55: '🌧️ Stiprs lietus smidzināšana',
    61: '🌦️ Viegls lietus',
    63: '🌧️ Mērens lietus',
    65: '🌧️ Stiprs lietus',
    71: '❄️ Viegla snigšana',
    73: '❄️ Mērena snigšana',
    75: '❄️ Stipra snigšana',
    80: '🌦️ Vieglas lietusgāzes',
    81: '🌧️ Mērenas lietusgāzes',
    82: '🌧️ Stipras lietusgāzes',
    95: '⛈️ Pērkona negaiss',
    96: '⛈️ Viegls pērkona negaiss',
    99: '⛈️ Stiprs pērkona negaiss'
};

function getDescription(code) {
    return weatherCodes[code] || `Kods ${code}`;
}

module.exports = { getDescription };
