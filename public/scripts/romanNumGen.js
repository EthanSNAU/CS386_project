// this script handles random generation 

// name: genRomanNumeral
// desc: generates a random Roman numeral between I and VII
// Inputs: none
// Outputs: romanNumeral
// Contributors: Chris, Nolan

function genRomanNumeral() {
    // roman numerals from I to VII
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

    let result = "";

    // loop 4 times to build the string
    for(let i = 0; i < 4; i++){
        // generate a random index between 0 and 6
        const index = Math.floor(Math.random() * romanNumerals.length);

        // get the Roman numeral
        const romanNumeral = romanNumerals[index];

        // add it to the result string
        result += romanNumeral + " " ;

        // display it on the webpage
        const displayElement = document.getElementById(`romanNum${i + 1}`);
        displayElement.textContent = romanNumeral;
    }

    // get rid of any whitespace and return
    return result.trim();
}


// name: getKey
// desc: allows user to select what key they want to be in
// Inputs: keyName
// Outputs: keyDisplay
// Contributors: Ethan

function getKey(keyName)
{
    // creates a display element for updating the webpage
    const display = document.getElementById('keyDisplay');

    //updates the display with the selected key name
    display.textContent = `key: ${keyName}`;
}