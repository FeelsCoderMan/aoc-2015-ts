import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

function part1(): number {
    return inputFormatted.reduce((count, line) => {
        let countCode = line.length;
        let l = 1;
        let r = countCode - 1;
        let countStr = 0;

        while (l < r) {
            if (line.charAt(l) === '\\') {
                l++;
                
                if (line.charAt(l) === 'x') {
                    l += 2;
                }
            }

            countStr++;
            l++;
        }
        
        return count + countCode - countStr;
    }, 0);
} 

function part2(): number {
    return inputFormatted.reduce((count, line) => {
        let countCode = line.length;
        let l = 1;
        let r = countCode - 1;
        // Increment length of string literals by
        // Double Quote: 2
        // Backslash: 2
        // Hexadecimal escape: 1
        let countStr = countCode + 4; 

        while (l < r) {
            if (line.charAt(l) === '\\') {
                l++;
                countStr += 2;

                if (line.charAt(l) === 'x') {
                    l += 2;
                    countStr--;
                }
            }

            l++;
        }
        
        return count + countStr - countCode;
    }, 0);
}
