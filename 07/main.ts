import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n")


function part1(): number {
    let circuit = generateCircuit();
    return calculateSignalByWire("a", circuit);
}

function part2(): number {
    let circuit = generateCircuit();
    let signalA = calculateSignalByWire("a", circuit);
    circuit.set("b", signalA.toString());
    return calculateSignalByWire("a", circuit);
}

function generateCircuit(): Map<string, string> {
    return inputFormatted.reduce((map, line) => {
        const [instruction, outWire] = line.split(" -> ");
        return map.set(outWire, instruction);
    }, new Map<string, string>());
}

function calculateSignalByWire(wire: string, circuit: Map<string, string>): number {
    let memoMap = new Map<string, number>();

    function generateSignal(wire: string): number {
        if (isWireNum(wire)) {
            return +wire;
        }

        let memoWireSignal = memoMap.get(wire);

        if (memoWireSignal) {
            return memoWireSignal;
        }

        const currentWire = circuit.get(wire);

        if (!currentWire) {
            throw new Error("couldn't find instruction in the wire: " + wire);
        }

        const instruction = currentWire.split(" ");
        let signal: number;

        switch (true) {
            case instruction.includes("AND"):
                signal = generateSignal(instruction[0]) & generateSignal(instruction[2]);
                break;
            case instruction.includes("OR"):
                signal = generateSignal(instruction[0]) | generateSignal(instruction[2]);
                break;
            case instruction.includes("LSHIFT"):
                signal = generateSignal(instruction[0]) << generateSignal(instruction[2]);
                break;
            case instruction.includes("RSHIFT"):
                signal = generateSignal(instruction[0]) >> generateSignal(instruction[2]);
                break;
            case instruction.includes("NOT"):
                signal = ~generateSignal(instruction[1]) & 0xffff;
                break;
            default:
                signal = generateSignal(instruction[0]);
                break;
        }

        memoMap.set(wire, signal);
        return signal;
    }

    return generateSignal(wire);
}


function isWireNum(wire: string): boolean {
    return /^\d+$/.test(wire);
}

