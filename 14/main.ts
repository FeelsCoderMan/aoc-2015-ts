import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

function part1(): number {
    return calculateDistanceOfWinner(2503);
}

function part2(): number {
    return calculatePointsOfWinner(2503);
}

type Reindeer = {
    velocity: number,
    runTime: number,
    restTime: number,
    point: number,
}

function calculatePointsOfWinner(inputTime: number): number {
    let reindeerMap = new Map<string, Reindeer>();

    inputFormatted.forEach((line) => {
        const lineArr = line.split(" ");
        const name = lineArr[0];
        const velocity = +lineArr[3];
        const runTime = +lineArr[6];
        const restTime = +lineArr[lineArr.length - 2];
        reindeerMap.set(name, {
            velocity: velocity,
            runTime: runTime,
            restTime: restTime,
            point: 0
        });
    });

    for (let i = 1; i <= inputTime; i++) {
        let tempDistanceMap = new Map<string, number>();
        let maxDistance = Number.MIN_VALUE;

        for (const [name, reindeer] of reindeerMap.entries()) {
            let distance = calculateDistance(i, reindeer.runTime, reindeer.restTime, reindeer.velocity);
            tempDistanceMap.set(name, distance);

            if (maxDistance < distance) {
                maxDistance = distance;
            }
        }

        for (const [name, distance] of tempDistanceMap.entries()) {
            if (distance === maxDistance) {
                let currReindeer = reindeerMap.get(name);

                if (currReindeer) {
                    currReindeer.point++;
                }
            }
        }
    }

    let winnerPoint = Number.MIN_VALUE;

    for (const reindeer of reindeerMap.values()) {
        if (reindeer.point > winnerPoint) {
            winnerPoint = reindeer.point;
        }
    }

    return winnerPoint;
}

function calculateDistanceOfWinner(inputTime: number): number {
    let maxDistance = Number.MIN_VALUE;

    inputFormatted.forEach((line) => {
        const lineArr = line.split(" ");
        const velocity = +lineArr[3];
        const runTime = +lineArr[6];
        const restTime = +lineArr[lineArr.length - 2];
        const distance = calculateDistance(inputTime, runTime, restTime, velocity);

        if (maxDistance < distance) {
            maxDistance = distance;
        }
    });

    return maxDistance;
}

function calculateDistance(inputTime: number, runTime: number, restTime: number, velocity: number): number {
    const totalTime = runTime + restTime;
    let distance = Math.floor(inputTime / (totalTime)) * velocity * runTime;
    const remainder = inputTime % totalTime;
    const currRunTime = remainder <= runTime ? remainder : runTime;
    distance += velocity * currRunTime;
    return distance;
}
