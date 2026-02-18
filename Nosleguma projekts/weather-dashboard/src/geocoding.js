async function geocodeCity(name, limit = 5) {
	const encoded = encodeURIComponent(name);
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=${limit}&language=lv&format=json`;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 sekunžu timeout
		
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
		if (error.name === 'AbortError') {
			console.log('\n⚠ Geocoding API pieprasījums pārsniedza laika limitu.');
			console.log('  Mēģini vēlreiz.\n');
		} else if (error.message.includes('fetch failed')) {
			console.log('\n⚠ Neizdevās savienoties ar Geocoding serveri.');
			console.log('  Pārbaudi interneta savienojumu.\n');
		} else {
			console.log('\n⚠ Neizdevās atrast lokāciju.');
			console.log(`  Detaļas: ${error.message}\n`);
		}
		return [];
	}
}

module.exports = { geocodeCity };
