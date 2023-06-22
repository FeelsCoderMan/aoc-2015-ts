import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.
    trim().
    split("\n");
const gridLen = 1000;

type Point = {
    x: number,
    y: number,
}

type Instruction = {
    instruction: Action,
    start: Point,
    end: Point,
}

enum Action {
    TurnOn,
    TurnOff,
    Toggle
}

function part1(): number {
    const board: boolean[][] = createBoard(false);
    let countLight = 0;

    inputFormatted.forEach((line) => {
        const instructionObj: Instruction = createInstruction(line);

        for (let i = instructionObj.start.y; i <= instructionObj.end.y; i++) {
            for (let j = instructionObj.start.x; j <= instructionObj.end.x; j++) {
                if (instructionObj.instruction === Action.TurnOn) {
                    if (!board[i][j]) {
                        board[i][j] = true;
                        countLight++;
                    }
                } else if (instructionObj.instruction === Action.TurnOff) {
                    if (board[i][j]) {
                        board[i][j] = false;
                        countLight--;
                    }
                } else {
                    countLight += board[i][j] ? -1 : 1;
                    board[i][j] = !board[i][j];
                }
            }
        }
    });
    
    return countLight;
}

function part2(): number {
    const board: number[][] = createBoard(0);
    let countLight = 0;

    inputFormatted.forEach((line) => {
        const instructionObj: Instruction = createInstruction(line);

        for (let i = instructionObj.start.y; i <= instructionObj.end.y; i++) {
            for (let j = instructionObj.start.x; j <= instructionObj.end.x; j++) {
                if (instructionObj.instruction === Action.TurnOn) {
                    board[i][j]++;
                    countLight++;
                } else if (instructionObj.instruction === Action.TurnOff) {
                    if (board[i][j] > 0) {
                        board[i][j]--;
                        countLight--;
                    }
                } else {
                    board[i][j] += 2;
                    countLight += 2;
                }
            }
        }
    });
    
    return countLight;
}

function createBoard<T>(value: T): T[][] {
    const board: T[][] = new Array(gridLen).fill(value);

    for (let i = 0; i < gridLen; i++) {
        board[i] = new Array(gridLen).fill(value);
    }
    
    return board;
}

function createInstruction(line: string): Instruction {
    const lineArr = line.split(" ");
    const endArr = lineArr[lineArr.length - 1].split(",");
    const startArr = lineArr[lineArr.length - 3].split(",");
    const instructionStr = lineArr.slice(0, lineArr.length - 3).join("");
    let instruction: Action;

    switch (instructionStr) {
        case "turnon":
            instruction = Action.TurnOn;
            break;
        case "turnoff":
            instruction = Action.TurnOff;
            break;
        default:
            instruction = Action.Toggle;
            break;
    }

    return {
        start: {
            x: +startArr[0],
            y: +startArr[1],
        } as Point,
        end: {
            x: +endArr[0],
            y: +endArr[1],
        } as Point,
        instruction: instruction
    }
}
