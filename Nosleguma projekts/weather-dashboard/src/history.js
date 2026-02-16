const { getDescription } = require('./utils.js');

function showHistory(appData, limit = 5) {
	if (!appData || !Array.isArray(appData.weatherHistory) || appData.weatherHistory.length === 0) {
		console.log('Vēsture ir tukša.');
		return;
	}

	console.log('\nLaikapstākļu vēsture:');
	appData.weatherHistory.slice(0, limit).forEach((record, index) => {
		const loc = Array.isArray(appData.locations)
			? appData.locations.find(item => item.id === record.locationId)
			: null;
		const locName = loc ? loc.name : 'Nezināma lokācija';
		console.log(`${index + 1}. ${new Date(record.fetchedAt).toLocaleString('lv-LV')} - ${locName}: ${record.temperature_2m}°C, ${getDescription(record.weather_code)}`);
	});
}

module.exports = { showHistory };
