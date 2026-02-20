async function geocodeCity(name, limit = 5) {
	const encoded = encodeURIComponent(name);
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=${limit}&language=lv&format=json`;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 8000);
		
		const response = await fetch(url, { signal: controller.signal });
		clearTimeout(timeoutId);
		
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
		console.error('Kļūda, iegūstot datus no Geocoding API:', error);
		return { error: error.name === 'AbortError' ? 'timeout' : 'network' };
	}
}

module.exports = { geocodeCity };
