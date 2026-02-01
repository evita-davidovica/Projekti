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
const doubled = myMap([1, 2, 3], function (num) { 
    return num * 2;
});
console.log(doubled); 

function myFilter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}
const evens = myFilter([1, 2, 3, 4], function (num) {
    return num % 2 === 0;
});
console.log(evens);

function myReduce(arr, callback, initial) {
    let accumulator = initial;
    for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
const sum = muReduce([1, 2, 3], function (acc,num) {
    return acc + num;
}, 0);
console.log(sum); 



