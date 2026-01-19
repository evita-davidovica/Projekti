function convertTemperature(temp, unit) {
    if (typeof temp !== 'number' || isNaN(temp)) {
        return { error: "Kļūda: temperatūrai jābūt skaitlim." };
    }
    if (unit !== "C" && unit !== "F") {
        return {
            error: "Kļūda: mērvienībai jābūt 'C' vai 'F'."
        };
    }

    let celsius, fahrenheit;

    if (unit === "C") {
        celsius = temp;
        fahrenheit = (temp * 9/5) + 32;
    }

    else if (unit === "F") {
        fahrenheit = temp;
        celsius = (temp - 32) * 5/9;
    }

    return {
        celsius: parseFloat(celsius).toFixed(2) + "°C",
        fahrenheit: parseFloat(fahrenheit).toFixed(2) + "°F",
        original: temp + "°" + unit
    };
}

console.log("=== TEMPERATŪRAS KONVERTĒTĀJS ===");
console.log(convertTemperature(25, "C"));
console.log(convertTemperature(77, "F"));
console.log(convertTemperature(0, "C"));
console.log(convertTemperature(100, "C"));
console.log(convertTemperature("abc", "C"));


