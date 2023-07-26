import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");
const wrongLetters = "iol";

function part1(): string {
    let isValid = false;
    let password = inputFormatted[0];
    
    do {
        password  = generateNextPassword(password);
        isValid = validatePassword(password);
    } while (!isValid);

    return password;
}

function part2(): string {
    let skipPassword = 2;
    let password = inputFormatted[0];

    do {
        password = generateNextPassword(password);
        let isValid = validatePassword(password);

        if (isValid) {
            skipPassword--;
        }
    } while (skipPassword > 0);

    return password;
}

function generateNextPassword(password: string): string {
    let lowerBound = "a".charCodeAt(0);
    let upperBound = "z".charCodeAt(0);
    let generatedPassword = "";
    let i = password.length - 1;

    while (i >= 0) {
        let currentCharCode = password.charCodeAt(i);

        if (currentCharCode === upperBound) {
            generatedPassword = String.fromCharCode(lowerBound) + generatedPassword;
        } else {
            generatedPassword = String.fromCharCode(currentCharCode + 1) + generatedPassword;
            break;
        }

        i--;
    }

    return password.slice(0, i) + generatedPassword;
}

function validatePassword(password: string): boolean {
    let hasIncrementalLetters = false;
    let countRepeatingLetters = 0;
    let memRepeatingLetters: number[] = new Array(password.length);
    
    for (let i = 0; i < password.length - 2; i++) {
        let firstElementCode = password.charCodeAt(i);
        let secondElementCode = password.charCodeAt(i + 1);
        let thirdElementCode = password.charCodeAt(i + 2);

        if (secondElementCode - firstElementCode === 1 &&
            thirdElementCode - secondElementCode === 1) {
            hasIncrementalLetters = true;
        }

        if (checkIfIncludesWrongLetter(firstElementCode) || 
            checkIfIncludesWrongLetter(secondElementCode) ||
            checkIfIncludesWrongLetter(thirdElementCode)) {
            return false;
        }
        
        if (firstElementCode === secondElementCode && memRepeatingLetters[i] !== firstElementCode) {
            memRepeatingLetters[i] = firstElementCode;
            memRepeatingLetters[i + 1] = firstElementCode;
            countRepeatingLetters++;
        } else if (secondElementCode === thirdElementCode && memRepeatingLetters[i] !== secondElementCode) {
            memRepeatingLetters[i + 1] = secondElementCode;
            memRepeatingLetters[i + 2] = secondElementCode;
            countRepeatingLetters++;
        }
    }

    return hasIncrementalLetters && countRepeatingLetters > 1;
}

function checkIfIncludesWrongLetter(charCode: number): boolean {
    for (let i = 0; i < wrongLetters.length; i++) {
        let wrongCharCode = wrongLetters.charCodeAt(i);
        
        if (charCode === wrongCharCode) {
            return true;
        }
    }

    return false;
}

