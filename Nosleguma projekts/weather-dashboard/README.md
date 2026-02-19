# Laikapstāļu lietotne

CLI rīks ar Open-Meteo API, Geocoding API, datu saglabāšanu un statistiku.

## Uzstādīšana
1. `npm install` (pēc izvēles)
2. `node index.js`


## Lietošana
1. Atver termināli
2. `node index.js` - tests darbojas
3. Pēc tam seko Izvēlne piedāvātajām iespējām, jāievada vajadzīgais skaitlis, lai izvēlētos.

## Piemēri izvēlnei
1. Iegūt Rīgas laikapstākļus (kā noklusējuma pilsēta)
2. Skatīt vēsturi
3. Izvada saglabātās lokācijas
4. Iespēja pievienot jaunas lokācijas
5. Iespēja izvēlēties lokāciju no saraksta
6. Iziet

### Failu struktūra
- `weather-data.json` - Glabā visus galvenos datus par lokācijām un laikapstākļu vēsturi
- `api.js` - API integrācija un testi
- `index.js` - CLI izvēlne
- `display.js` - veids, kādā izvada informāciju terminālī
- `geocoding.js` - Geocoding lokāciju pievienošana
- `history.js` - Apstrādā laikapstākļu vēstures izvadi konsolē
- `storage.js` - Glabā un ielādē datus no JSON faila
- `utils.js` - Glabā weatherCodes un pārvērš weather-code lasāmā veidā ar emoji
- `.gitignore` - Neiekļauj noteiktus failus Git, nevajag commit
- `DEVLOG.md` - Projekta izstrādes žurnāls
- `flowchart-weather.drawio.png` - Projekta plūsmas diagramma

#### Testa scenārijs (prasību pārbaude)
1. Dzēs `data/weather-data.json` (ja eksistē) un palaid programmu.
	- Sagaidāms: programma startē bez kļūdas, tiek izveidota tukša struktūra.
2. Izvēlies `1` (Rīgas laikapstākļi - noklusējums).
	- Sagaidāms: pēc veiksmīgas atbildes tiek saglabāti dati JSON failā.
3. Atver `data/weather-data.json` un pārbaudi:
	- Sagaidāms: `locations` un `weatherHistory` ir aizpildīti.
4. Atvieno internetu un atkārto `1`.
	- Sagaidāms: parādās kļūdas ziņojums un tiek piedāvāts kešatmiņas skats.
5. Apstiprini kešatmiņu ar `j` vai noraidi ar `n`.
	- Sagaidāms: tiek parādīti pēdējie saglabātie laikapstākļi.
6. Izvēlies `4` (Pievienot lokāciju) un ievadi pilsētu - internetam jābūt pieejamam.
	- Sagaidāms: lokācija tiek saglabāta JSON failā.
7. Pārbaudi, ka `saveData` izveido `data/` mapi, ja tās nav.

##### Izstrādes žurnāls
- Posms 1 - Projekta inicializācija un mapju struktūras izveide
- Posms 2 - Open-Meteo API pieprasījuma izveide
- Posms 3 - Lokāciju pievienošana
- Posms 4 - INformācijas saglabāšana JSON failā
- Posms 5 - index.js labošana un papildināšana
- Posms 6 - history.js izveide, papildināšana, lai izvade ir tabulas veidā, labošana
- Posms 7 - Izvades labošana - pievienoti emoji
- Posms 8 - Plūsmas diagrammas izveide
- Posms 9 - Projekta dokumentācija (README.md, DEVLOG.md)

