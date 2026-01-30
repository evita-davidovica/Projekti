function isEmail(str) {
return str.includes("@");
}

console.log(isEmail("evita@gmail.com")); // true
console.log(isEmail("evitagmail.com")); // false
console.log(isEmail("evita@.com")); // true (īstenībā mainīt, jo false)
console.log(isEmail("evita@com")); // true (īstenībā mainīt, jo false)




function isPhoneNumber(str) {
    return str.startsWith("+371") && str.length === 12 && !isNaN(str.slice(4));
}

console.log(isPhoneNumber("+37112345678")); // true
console.log(isPhoneNumber("12345678")); // false
console.log(isPhoneNumber("+3711234abcd")); // false

function isValidAge(age) {
    return age >= 0 && age <= 150;
}

console.log(isValidAge(25)); // true
console.log(isValidAge(0)); // true
console.log(isValidAge(151)); // false
console.log(isValidAge(-3)); // false

function isStrongPassword(str) {
    let hasLetter = false;
    let hasNumber = false;

    for (let char of str) {
        if(isNaN(char)) {
            hasLetter = true;
        } else {
            hasNumber = true;
        }
    }
    return str.length >= 8 && hasLetter && hasNumber; // Vismaz 8 rakstzīmes, vismaz viens burts un viens cipars
}

console.log(isStrongPassword("myname12")); // true
console.log(isStrongPassword("nick12")); // false (par īsu)
console.log(isStrongPassword("1234")); // false (nav burti)
console.log(isStrongPassword("abcd")); // false (nav cipari)
console.log(isStrongPassword("linda12345")); // true

function isValidDate(str) {
    const date = new Date(str); 
    return !isNaN(date.getTime()); 
}

console.log(isValidDate("2023-10-15")); // true
console.log(isValidDate("15-10-2023")); // false
console.log(isValidDate("2000-13-12")); // false
console.log(isValidDate("2024-02-29")); // true (pārbauda arī garo gadu)