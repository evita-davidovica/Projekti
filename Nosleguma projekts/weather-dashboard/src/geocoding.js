async function geocodeCity(name, limit = 5) {
	const encoded = encodeURIComponent(name);
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=${limit}&language=lv&format=json`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Geocoding API kļūda: ${response.status}`);
		}

		const data = await response.json();
		if (!data.results || !Array.isArray(data.results)) {
			return [];
		}

		return data.results.map(item => ({
			name: item.name,
			country: item.country || 'Unknown',
			latitude: item.latitude,
			longitude: item.longitude
		}));
	} catch (error) {
		console.log('Neizdevās atrast lokāciju:', error.message);
		return [];
	}
}

module.exports = { geocodeCity };
