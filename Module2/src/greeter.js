const name = process.argv[2];
const birthYear = Number(process.argv[3]);

if (!name || !birthYear) {
    console.log("Anna, 30 gadi");
    console.log("Piemērs: node greeter.js Anna 1995");
    process.exit(1);
}

const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

console.log("Sveika, Anna! Tev ir 30 gadi.");



