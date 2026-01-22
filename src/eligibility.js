// eligibility.js - Uzdevums 3.3: Atbilstības pārbaudītājs
// Lietošana: node eligibility.js 32 true false false

// Nolasa argumentus no komandrindas

const args = process.argv.slice(2);

// Pārbauda argumentu skaitu (4: vecums, autovadītāja apliecība, students, veterāns)

if (args.length !== 4) {
    console.log(`Kļūda: Vajag 4 argumentus!
        LIETOŠANA: node eligibility.js <vecums> <autovadītāja apliecība> <students> <veterāns>
        PIEMĒRS: node eligibility.js 32 true false false`);
    process.exit(1);
}

// Izņem un pārveido datus

const age = Number(args[0]);
const hasLicense = args[1] === 'true';
const isStudent = args[2] === 'true';
const isVeteran = args[3] === 'true';

// Pārbauda, vai vecums ir derīgs

if (isNaN(age) || age < 0 || age > 150) {
    console.log(`KĻUDA: Vecums "${args[0]}" nav derīgs (0-150 gadi)!`);
    process.exit(1);
}

// Pārbauda, vai veterāna statuss ir iespējams

if (isVeteran && age < 65) {
    console.log(`KĻUDA: Veterāns nevar būt jaunāks par 18 gadiem!`);
    process.exit(1);
}

// Kompleksas loģiskās izteiksmes

console.log(`\n=== ATBILSTĪBAS PĀRBAUDE vecumam ${age} ===`);
console.log(`Autovadītāja apliecība: ${hasLicense ? 'Jā' : 'Nē'}`);
console.log(`Students: ${isStudent ? 'Jā' : 'Nē'}`);
console.log(`Veterāns: ${isVeteran ? 'Jā' : 'Nē'}\n`);

// Balsot (>= 18 gadi)

const canVote = age >= 18;
console.log(`Var balsot: ${canVote ? 'Jā' : 'Nē'} ${age >= 18 ? '(pilngadīgs)' : '(nepilngadīgs)'}`);

// Īrēt auto (>= 21 gads un autovadītāja apliecība)

const canRentCar = age >= 21 && hasLicense;
console.log(`Var īrēt auto: ${canRentCar ? 'Jā' : 'Nē'} ${!canRentCar ? '(vecums < 21 vai nav apliecības)' : ''}`);

// Senioru atlaide (>= 65 gadi vai veterāns un >= 18 gadi)

const seniorDiscount = age >= 65 || (isVeteran && age >= 18);
console.log(`Senioru atlaide: ${seniorDiscount ? 'Jā' : 'Nē'} ${age < 65 && !isVeteran ? '(nav 65+ un nav veterāns)' : ''}`);

// Studentu atlaide (>= 16 gadi un <= 26 gadi un students)

const studentDiscount = age >= 16 && age <= 26 && isStudent;
console.log(`Studentu atlaide: ${studentDiscount ? 'Jā' : 'Nē'} ${!studentDiscount ? '(nav students vai vecums ārpus 16-26 gadiem)' : ''}`);

console.log(`\nPārbaude pabeigta.`);






