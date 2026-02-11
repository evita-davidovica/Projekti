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
function capitalize(str) { // Pārbauda, vai virkne nav tukša, un pārvērš pirmo burtu par lielo burtu, atstājot pārējo daļu nemainītu
    if (str.length === 0) return str; // Ja virkne ir tukša, atgriež to pašu
    return str[0].toUpperCase() + str.slice(1); // Pārvērš pirmo burtu par lielo un pievieno pārējo virkni
}

/**
* truncate - Apgriež virkni līdz maxLen un pievieno "..." ja nepieciešams
* @param {string} str - Ievades virkne
* @param {number} maxLen - Maksimālais garums
* @returns {string} - Apgrieztā virkne
* @example truncate("abcdefgh", 5) => "abcde..."
*/
function truncate(str, maxLen) { // Pārbauda, vai virkne ir garāka par maxLen, un apgriež to, pievienojot "..." ja nepieciešams
    if (str.length <= maxLen) return str; // Ja virkne nav garāka par maxLen, atgriež to pašu
    return str.slice(0, maxLen) + "..."; // Apgriež virkni līdz maxLen un pievieno "..."
}

/** 
* countWords - Saskaita vārdus virknē
* @param {string} str - Ievades virkne
* @returns {number} - Vārdu skaits
* @example countWords("hello world test") => 3
*/
function countWords(str) { // Noņem liekās atstarpes un saskaita vārdus, dalot virkni pēc vienas vai vairākām atstarpēm
    const cleaned = str.trim(); // Noņem liekās atstarpes no sākuma un beigām
    if (cleaned.length === 0) return 0; // Ja virkne ir tukša pēc noņemšanas, atgriež 0
    return cleaned.split(/\s+/).length; // Dalot virkni pēc vienas vai vairākām atstarpēm, saskaita vārdus
}

/** 
* clamp - Ierobežo skaitli diapazonā starp min un max
* @param {number} num - Ievades skaitlis
* @param {number} min - Minimālā vērtība
* @param {number} max - Maksimālā vērtība
* @returns {number} - Ierobežotais skaitlis
* @example clamp(10, 1, 5) => 5
*/
function clamp(num, min, max) { // Pārbauda, vai num ir mazāks par min vai lielāks par max, un atgriež attiecīgi min vai max, pretējā gadījumā atgriež num
    if (num < min) return min; // Ja num ir mazāks par min, atgriež min
    if (num > max) return max; // Ja num ir lielāks par max, atgriež max
    return num; // Ja num ir starp min un max, atgriež num
}

/**
* isPrime - Pārbauda vai skaitlis ir pirmskaitlis
* @param {number} num - Ievadītais skaitlis
* @returns {boolean} - true, ja pirmskaitlis, false, ja nav
* @example isPrime(7) => true
*/
function isPrime(num) { // Pārbauda vai skaitlis ir pirmskaitlis
    if (num <= 1) return false; // Ja num ir mazāks vai vienāds ar 1, tas nav pirmskaitlis
    if (num <= 3) return true; // Ja num ir 2 vai 3, tas ir pirmskaitlis
    if (num % 2 === 0 || num % 3 === 0) return false; // Ja num ir dalāms ar 2 vai 3, tas nav pirmskaitlis
    for (let i = 5; i * i <= num; i += 6) { // Pārbauda dalāmību ar skaitļiem, kas ir 6k ± 1, līdz i*i ir lielāks par num
        if (num % i === 0 || num % (i + 2) === 0) return false; // Ja num ir dalāms ar i vai i+2, tas nav pirmskaitlis
    }
    return true; // Ja num nav dalāms ar nevienu no pārbaudītajiem skaitļiem, tas ir pirmskaitlis
}

/**
* factorial - Aprēķina n! (n faktoriālu)
* @param {number} n - Ievadītais skaitlis, n >= 0
* @returns {number} - n faktoriālais
* @example factorial(5) => 120
*/
function factorial(n) { // Aprēķina n! (n faktoriālu) iteratīvi, pārbaudot, vai n ir negatīvs, un atgriežot null, ja tas tā ir
    if (n < 0) return null; // Faktoriāls nav definēts negatīviem skaitļiem, tāpēc atgriež null
    let result = 1; // Faktoriāla sākotnējā vērtība ir 1 (0! = 1)
    for (let i = 2; i <= n; i++) { // Iterē no 2 līdz n, reizinot result ar katru i, lai aprēķinātu faktoriālu
        result *= i; // Reizina result ar i, lai iegūtu faktoriāla vērtību
    }
    return result; // Atgriež aprēķināto faktoriālu
}

/**
* sum  - Saskaita visus skaitļus masīvā (bez iebūvētām metodēm)
* @param {number[]} arr - Skaitļu masīvs
* @return {number} - Skaitļu summa
* @example sum([1,2,3]) => 6
*/
function sum(arr) { // Saskaita visus skaitļus masīvā, iterējot cauri katram elementam un pievienojot to kopējam summai
    let total = 0; // Inicializē total ar 0, lai uzkrātu skaitļu summu
    for (let i = 0; i < arr.length; i++) { // Iterē cauri katram elementam masīvā, pievienojot to total
        total += arr[i]; // Pievieno katru elementu arr[i] kopējam total, lai iegūtu skaitļu summu
    }
    return total; // Atgriež kopējo summu pēc tam, kad visi elementi ir saskaitīti
}

/**
* average - Aprēķina skaitļu masīva vidējo vērtību (vidējais aritmētiskais)
* @param {number[]} arr - Skaitļu masīvs
* @returns {number} - Vidējā vērtība
* @example average([1,2,3]) => 2
*/
function average(arr) { // Aprēķina skaitļu masīva vidējo vērtību, izmantojot sum funkciju, un dalot to ar masīva garumu, pārbaudot, vai masīvs nav tukšs
    if (arr.length === 0) return 0; // Ja masīvs ir tukšs, atgriež 0, lai izvairītos no dalīšanas ar nulli
    return sum(arr) / arr.length; // Izmanto sum funkciju, lai iegūtu skaitļu summu, un dalot to ar masīva garumu, lai aprēķinātu vidējo vērtību
}

/**
* formatDate - Formatē datumu "DD-MM-YYYY" formātā
* @param {Date} date - Ievadītais datums
* @returns {string} - Formatētā datuma virkne "2026-01-29"
* @example formatDate(new Date("2026-01-29")) => "29-01-2026"
*/
function formatDate(date) { // Formatē datumu "YYYY-MM-DD" formātā, iegūstot gadu, mēnesi un dienu no datuma objekta, un formatējot tos ar nullēm, ja nepieciešams
    const year = date.getFullYear(); // Iegūst gadu no datuma objekta
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Iegūst mēnesi (0-11) no datuma objekta, pievieno 1, lai iegūtu 1-12, un formatē ar nulli, ja nepieciešams
    const day = String(date.getDate()).padStart(2, '0'); // Iegūst dienu no datuma objekta un formatē ar nulli, ja nepieciešams
    return `${year}-${month}-${day}`; // Atgriež formatētu datumu "YYYY-MM-DD"
}

/**
* calculateAge - Aprēķina vecumu no dzimšanas datuma
* @param {Date} birthDate - Dzimšanas datums
* @returns {number} - Vecums gados (pilni gadi)
* @example calculateAge(new Date("1990-06-15")) => 35 (atkarībā no pašreizējā datuma)
*/
function calculateAge(birthDate) { // Aprēķina vecumu no dzimšanas datuma, iegūstot pašreizējo datumu, un salīdzinot gadu, mēnesi un dienu, lai noteiktu, vai dzimšanas diena ir pagājusi šogad
    const today = new Date(); // Iegūst pašreizējo datumu
    let age = today.getFullYear() - birthDate.getFullYear(); // Aprēķina vecumu, atņemot dzimšanas gadu no pašreizējā gada
    const monthDiff = today.getMonth() - birthDate.getMonth(); // Aprēķina mēneša atšķirību, lai noteiktu, vai dzimšanas diena ir pagājusi šogad
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) { // Ja mēneša atšķirība ir negatīva (dzimšanas mēnesis vēl nav pienācis) vai mēneša atšķirība ir 0 un dienas atšķirība ir negatīva (dzimšanas diena vēl nav pienākusi), tad vecums jāsamazina par 1
        age--; // Samazina vecumu par 1, ja dzimšanas diena vēl nav pienākusi šogad
    }
    return age; // Atgriež aprēķināto vecumu gados
}

function calcLineTotal(item) { // Aprēķina preces kopējo cenu
    return item.qty * item.price; // Daudzums reizināts ar cenu
}

function calcGrandTotal(items) { // Aprēķina visu preču kopējo cenu
    return items.reduce((sum, item) => sum + calcLineTotal(item), 0); // Kopējo preču summa
}

function countUnits(items) { // Saaskaita visu preču daudzumu
    return items.reduce((sum, item) => sum + item.qty, 0); // Kopējais preču daudzums
}


function calcLineTotal(item) { // Aprēķina preces kopējo cenu, reizinot daudzumu (qty) ar cenu (price)
    return item.qty * item.price; // Daudzums reizināts ar cenu, lai iegūtu kopējo cenu par šo preci
}

function calcGrandTotal(items) { // Aprēķina visu preču kopējo cenu, izmantojot reduce, lai saskaitītu katras preces kopējo cenu, ko aprēķina ar calcLineTotal
    return items.reduce((sum, item) => sum + calcLineTotal(item), 0); // Sākot ar 0, iterē cauri katrai precei, aprēķina tās kopējo cenu ar calcLineTotal, un pievieno to summai, lai iegūtu visu preču kopējo cenu
}

function countUnits(items) { // Saskaita visu preču daudzumu, izmantojot reduce, lai saskaitītu katras preces daudzumu (qty)
    return items.reduce((sum, item) => sum + item.qty, 0); // Sākot ar 0, iterē cauri katrai precei, pievieno tās daudzumu (qty) summai, lai iegūtu visu preču kopējo daudzumu
}

module.exports = { capitalize, truncate, countWords, clamp, isPrime, factorial, sum, average, formatDate, calculateAge, calcLineTotal, calcGrandTotal, countUnits };
