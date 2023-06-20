import fs from "fs";
import path from "path";

type Point = {
    x: number,
    y: number
}

const dirPath: { [key: string]: Point } = {
    ">": {x: 0, y: 1},
    "<": {x: 0, y: -1},
    "^": {x: -1, y: 0},
    "v": {x: 1, y: 0},
}
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

function part1(): number {
    let inputFormatted = input.
        trim().
        split("");
    let initial = {
        x: 0,
        y: 0,
    };
    let storage = new Set().add(formatPath(initial));
    
    for (let chr of inputFormatted) {
        let {x, y} = dirPath[chr];
        initial.x += x;
        initial.y += y;
        storage.add(formatPath(initial));
    }

    return storage.size;
}

function part2(): number {
    let inputFormatted = input.
        trim().
        split("");
    let runner = {x: 0, y: 0};
    let walker = {x: 0, y: 0};
    let storage: Set<String> = new Set<String>().add(`${runner.x},${runner.y}`);

    for (let i = 0; i < input.length; i++) {
        let chr = inputFormatted[i];
        let dir = dirPath[chr];

        if (i % 2 === 0) {
            walkAndStorePath(walker, storage, dir);
        } else {
            walkAndStorePath(runner, storage, dir);
        }
        
    }

    return storage.size;
}

function walkAndStorePath(user: Point, storage: Set<String>, dir: Point) {
    user.x += dir.x;
    user.y += dir.y;
    storage.add(formatPath(user));
}

function formatPath(point: Point) {
    return `${point.x},${point.y}`;
}
