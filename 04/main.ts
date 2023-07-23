import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

function part1(): number {
    return findPrefix("00000");
}

function part2(): number {
    return findPrefix("000000");
}

// TODO: use a md5 library instead of syscall
function findPrefix(startStr: string): number {
    const inputFormatted = input.
        trim();
    let counter = 0;

    while (true) {
        let cmd = `echo -n ${inputFormatted}${counter} | md5sum`;

        let result = execSync(cmd, {
            encoding: 'utf-8'
        });

        if (result.slice(0, startStr.length) === startStr) {
            return counter;
        }

        counter++;
    }
}
