//this script generates a random roman numeral

// name: genRomanNumeral
// desc: generates a random Roman numeral between I and VII
// Inputs: none
// Outputs: romanNumeral
// Contributors: Chris

function genRomanNumeral() {
    // roman numerals from I to VII
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

    let result = "";

    //loop 4 times to build the string
    for(let i = 0; i < 4; i++){
        // generate a random index between 0 and 6
        const index = Math.floor(Math.random() * romanNumerals.length);

        // get the Roman numeral
        const romanNumeral = romanNumerals[index];

        // add it to the result string
        result += romanNumeral + " ";
    }


    // display it on the webpage
    const displayElement = document.getElementById('romanNum');
    displayElement.textContent = result.trim();
    
    //get rid of any whitespace
    complete_string = result.trim();
    
    // return
    return complete_string;
}


