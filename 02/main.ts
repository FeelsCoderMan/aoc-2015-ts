import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, './input.txt'), "utf-8");

function part1(): number {
    return input.split("\n").
        filter((line) => line.length > 0).
        map((box: string) => {
        const [l, w, h]: number[] = box.split("x").map((str) => +str);
        const comb1 = l * w;
        const comb2 = w * h;
        const comb3 = l * h
        let result = 2 * (comb1 + comb2 + comb3);
        return result + Math.min(comb1, comb2, comb3);
    }).
        reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}

function part2(): number {
    return input.split("\n").
        filter((line) => line.length > 0).
        map((box: string) => {
        const sizes: number[] = box.split("x").map((str) => +str);
        let smallest = Number.MAX_VALUE;
        let smallestIdx: number = -1;
        let secondSmallest = Number.MAX_VALUE;
        for (let i = 0; i < sizes.length; i++) {
            if (smallest > sizes[i]) {
                smallest = sizes[i];
                smallestIdx = i;
            }
        }

        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i] >= smallest && sizes[i] < secondSmallest && i !== smallestIdx) {
                secondSmallest = sizes[i];
            }
        }

        return 2 * (smallest + secondSmallest) + sizes.reduce((acc, size) => {
            return acc * size;
        }, 1);
        
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}

