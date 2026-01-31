// 5 validācijas funkcijas + module.exports

function isEmail(str) {  // Vienkārša e-pasta validācija
    return str.includes("@"); } 

    function isPhoneNumber(str) { // Pārbauda vai telefona numurs ir Latvijas formātā +371xxxxxxxx
    const clean = str.replace(/\s/g, ''); // Noņem atstarpes
    return clean.startsWith("+371") && clean.length === 12 && !isNaN(clean.slice(4)); // Jābūt +371 un 8 cipariem pēc valsts koda
}

function isValidAge(age) { // Pārbauda vecumu no 0 līdz 150 gadiem
    return age >= 0 && age <=150; } 

function isStrongPassword(str) { // Pārbauda vai parole ir pietiekoši stipra, un satur 8 rakstzīmes, burtus un ciparus
    let hasLetter = false, hasNumber = false; 
    for (let char of str) { 
        if (isNaN(char)) hasLetter = true; // Pārbauda vai ir burti
        else hasNumber = true; // Pārbauda vai ir cipari
    }
    return str.length >= 8 && hasLetter && hasNumber;
}

function isValidDate(str) { // Pārbauda vai datums ir formātā yyyy-mm-dd un vai tas ir derīgs datums
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regulārais izteikums datuma formātam
    if (!dateRegex.test(str)) return false; // Pārbauda formātu
    const [year, month, day] = str.split('-').map(Number); // Sadala un pārvērš skaitļos
    const date = new Date(year, month - 1, day); // Izveido datuma objektu
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day; // Pārbauda vai datums ir derīgs
}

module.exports = { // Eksportē funkcijas
    isEmail, isPhoneNumber, isValidAge, isStrongPassword, isValidDate}; 
