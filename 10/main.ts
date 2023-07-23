import fs from "fs";
import path from "path";

const input: string = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

function part1(): number {
    return lookAndSay(inputFormatted[0], 40);
}

function part2(): number {
    return lookAndSay(inputFormatted[0], 50);
}

function lookAndSay(sequence: string, step: number): number {

    while (step > 0) {
        let l = 0;
        let r = sequence.length;
        let newSequence = "";

        while (l < r) {
            let currNum = +sequence[l];
            let countRepetition = 1;

            while (l < r - 1 && currNum === +sequence[l + 1]) {
                countRepetition++;
                l++;
            }
            
            newSequence += countRepetition + "" + currNum;
            l++;
        }

        sequence = newSequence;
        step--;
    }

    return sequence.length;
}
