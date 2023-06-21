import fs from "fs";
import path from "path";

const input: string = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const inputFormatted = input.
    trim().
    split("\n");

function part1(): number {
    const disallowedStrings: string[] = ["ab", "cd", "pq", "xy"];
    const vowels: string[] = ["a", "e", "i", "o", "u"];
    let countNice = 0;

    inputFormatted.forEach((word) => {
        let countVowel = 0;
        let hasRepetitive = false;
        let isValid = true;
        let l = 0;

        while (l < word.length) {
            if (vowels.includes(word[l])) {
                countVowel++;
            }

            if (l < word.length - 1 && word[l] === word[l + 1]) {
                hasRepetitive = true;
            } else if (l < word.length - 1 && disallowedStrings.includes(word[l] + word[l + 1])) {
                isValid = false;
                break;
            }
            
            l++;
        }

        if (countVowel > 2 && hasRepetitive && isValid) {
            countNice++;
        }
    })

    return countNice;
}

function part2(): number {
    let countNice = 0;
    
    inputFormatted.forEach((word) => {
        let hasRepetitive = false;
        let hasSimilarity = false;
        let pairs: string[] = [];
        let l = 0;

        while (l < word.length) {
            let countRepetitive = 0;

            while (l < word.length - 1 && word[l] === word[l + 1]) {
                countRepetitive++;
                l++;
            }

            if (countRepetitive > 0) {
                if (pairs.includes(word[l] + word[l - 1])) {
                    hasRepetitive = true;
                } else {
                    pairs.push(word[l] + word[l - 1]);
                }

                if (countRepetitive > 1) {
                    hasSimilarity = true;
                }
            }


            if (l < word.length - 1) {
                if (!pairs.includes(word[l] + word[l + 1])) {
                    pairs.push(word[l] + word[l + 1]);
                } else {
                    hasRepetitive = true;
                }
            }

            if (l < word.length - 2 && word[l] === word[l + 2]) {
                hasSimilarity = true;
            }

            if (hasRepetitive && hasSimilarity) {
                countNice++;
                break;
            }

            l++;
        }
    });

    return countNice;
}
