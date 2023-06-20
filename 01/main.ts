import * as fs from 'fs';
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, './input1.txt'), "utf-8");

function part1(input: string): number {
    return input.split("").reduce((acc: number, curr: string) => {
        if (curr === '(') {
            acc++;
        } else if (curr === ')') {
            acc--;
        }

        return acc;
    }, 0);
}

function part2(input: string): number {
    const inputStr = input.split("");
    let count = 0;

    for (var i = 0; i < inputStr.length; i++) {
        if (inputStr[i] === '(') {
            count++;
        } else {
            count--;
        }

        if (count < 0) {
           break; 
        }
    }

    return i + 1;
}
