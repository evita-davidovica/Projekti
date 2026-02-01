function myForEach(arr, callback) { // Saņem masīvu un callback funkciju
    for (let i = 0; i < arr.length; i++) { // Cikls cauri masīvam
        callback(arr[i], i, arr); // Izsauc callback ar pašreizējo elementu, indexu un masīvu
    }
}
myForEach([1, 2, 3], function (num) { // Testēšanas piemērs
    console.log(num); // Izvada katru skaitli uz konsoles
});


function myMap(arr, callback) { // Pārveido masīvu, izmantojot callback funkciju
    const result = []; // Jauns masīvs rezultātam
    for (let i = 0; i < arr.length; i++) { // Cikls cauri masīvam
        result.push(callback(arr[i], i, arr)); // Pievieno pārbaudīto elementu jaunajam masīvam
    }
    return result; // Atgriež jauno masīvu
}
const doubled = myMap([1, 2, 3], function (num) { // Pārveido katru skaitli, reizinot ar 2
    return num * 2;
});
console.log(doubled); // Izvada rezultātu


function myFilter(arr, callback) { // Filtrē masīvu, izmantojot callback funkciju
    const result = [];
    for (let i = 0; i < arr.length; i++) { // Cikls cauri masīvam
        if (callback(arr[i], i, arr)) { // Ja callback atgriež true
            result.push(arr[i]); // Pievieno elementu rezultātu masīvam
        }
    }
    return result; // Atgriež filtrēto masīvu
}
const evens = myFilter([1, 2, 3, 4], function (num) { // Filtrē pāra skaitļus
    return num % 2 === 0; // Pārbauda vai skaitlis ir pāra skaitlis
});
console.log(evens); // Izvada rezultātu

function myReduce(arr, callback, initial) { // Samazina masīvu uz vienu vērtību
    let accumulator = initial; // Sākotnējā vērtība
    for (let i = 0; i < arr.length; i++) { // Cikls cauri masīvam
        accumulator = callback(accumulator, arr[i], i, arr); // Atjaunina uzkrājumu, izmantojot callback
    }
    return accumulator; // Atgriež galīgo uzkrājumu
}
const sum = myReduce([1, 2, 3], function (acc,num) { // Saskaita visus skaitļus masīvā
    return acc + num; // Atgriež jauno summu
}, 0); 
console.log(sum); // Izvada rezultātu

module.exports = { myForEach, myMap, myFilter, myReduce };



