/** 
* Utilītu bibliotēka
* 3 virkņu, 3 skaitļu, 2 masīvu, 2 datuma funkcijas
*/

/** 
* capitalize - Pārvērš pirmo burtu par lielo burtu
* @param {string} str - Ievades virkne
* @returns {string} - Virkne ar lielo pirmo burtu
* @example capitalize("hello") => "Hello"
*/
function capitalize(str) {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1);
}

/**
* truncate - Apgriež virkni līdz maxLen un pievieno "..." ja nepieciešams
* @param {string} str - Ievades virkne
* @param {number} maxLen - Maksimālais garums
* @returns {string} - Apgrieztā virkne
* @example truncate("abcdefgh", 5) => "abcde..."
*/
function truncate(str, maxLen) {
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen) + "...";
}

/** 
* countWords - Saskaita vārdus virknē
* @param {string} str - Ievades virkne
* @returns {number} - Vārdu skaits
* @example countWords("hello world test") => 3
*/
function countWords(str) {
    const cleaned = str.trim();
    if (cleaned.length === 0) return 0;
    return cleaned.split(/\s+/).length;
}

/** 
* clamp - Ierobežo skaitli diapazonā starp min un max
* @param {number} num - Ievades skaitlis
* @param {number} min - Minimālā vērtība
* @param {number} max - Maksimālā vērtība
* @returns {number} - Ierobežotais skaitlis
* @example clamp(10, 1, 5) => 5
*/
function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}

/**
* isPrime - Pārbauda vai skaitlis ir pirmskaitlis
* @param {number} num - Ievadītais skaitlis
* @returns {boolean} - true, ja pirmskaitlis, false, ja nav
* @example isPrime(7) => true
*/
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

/**
* factorial - Aprēķina n! (n faktoriālu)
* @param {number} n - Ievadītais skaitlis, n >= 0
* @returns {number} - n faktoriālais
* @example factorial(5) => 120
*/
function factorial(n) {
    if (n < 0) return null;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
* sum  - Saskaita visus skaitļus masīvā (bez iebūvētām metodēm)
* @param {number[]} arr - Skaitļu masīvs
* @return {number} - Skaitļu summa
* @example sum([1,2,3]) => 6
*/
function sum(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

/**
* average - Aprēķina skaitļu masīva vidējo vērtību (vidējais aritmētiskais)
* @param {number[]} arr - Skaitļu masīvs
* @returns {number} - Vidējā vērtība
* @example average([1,2,3]) => 2
*/
function average(arr) {
    if (arr.length === 0) return 0;
    return sum(arr) / arr.length;
}

/**
* formatDate - Formatē datumu "DD-MM-YYYY" formātā
* @param {Date} date - Ievadītais datums
* @returns {string} - Formatētā datuma virkne "2026-01-29"
* @example formatDate(new Date("2026-01-29")) => "29-01-2026"
*/
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
* calculateAge - Aprēķina vecumu no dzimšanas datuma
* @param {Date} birthDate - Dzimšanas datums
* @returns {number} - Vecums gados (pilni gadi)
* @example calculateAge(new Date("1990-06-15")) => 35 (atkarībā no pašreizējā datuma)
*/
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calcLineTotal(item) {
    return item.qty * item.price;
}

function calcGrandTotal(items) {
    return items.reduce((sum, item) => sum + calcLineTotal(item), 0);
}

function countUnits(items) {
    return items.reduce((sum, item) => sum + item.qty, 0);
}

module.exports = {
    capitalize, truncate, countWords,
    clamp, isPrime, factorial,
    sum, average,
    formatDate, calculateAge, calcLineTotal, calcGrandTotal, countUnits
};


