// this script just generates a random number so far

// name: genRandomNumber
// desc: primary random number generator function
// Inputs: none
// Outputs: randomNumber
// Contrubutors: Ethan
function genRandomNumber() 
{
    // Generates a random floating-point number between 0 and 1.
    const rawNum = Math.random();

    // scales the number to be between 1 and 100
    const randomNumber = Math.floor(rawNum * 100) + 1;

    // for sending to HTML files
    const displayElement = document.getElementById('ranNum');
    displayElement.textContent = randomNumber;

    // return
    return randomNumber
}
