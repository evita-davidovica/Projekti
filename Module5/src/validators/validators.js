// 5 validācijas funkcijas + module.exports

function isEmail(str) { 
    return str.includes("@"); }
function isPhoneNumber(str) {
    const clean = str.replace(/\s/g, '');
    return clean.startsWith("+371") && clean.length === 12 && !isNaN(clean.slice(4));
}

function isValidAge(age) { 
    return age >= 0 && age <=150; }

function isStrongPassword(str) {
    let hasLetter = false, hasNumber = false;
    for (let char of str) {
        if (isNaN(char)) hasLetter = true;
        else hasNumber = true;
    }
    return str.length >= 8 && hasLetter && hasNumber;
}

function isValidDate(str) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(str)) return false;
    const [year, month, day] = str.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

module.exports = {
    isEmail, isPhoneNumber, isValidAge, isStrongPassword, isValidDate};
