import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.json"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

function part1(): number {
    let docs = tryParseJson(inputFormatted[0]);
    
    if (docs) {
        return calculateTotalDocs(docs);
    }

    throw new Error("ERROR: could not found documents");
}

function part2(): number {
    let docs = tryParseJson(inputFormatted[0]);
    
    if (docs) {
        return calculateTotalDocs(docs, "red");
    }

    throw new Error("ERROR: could not found documents");
}

function tryParseJson(jsonStr: string): any {
    let res: any;
    try {
         res = JSON.parse(jsonStr);
    } catch (err) {
        res = undefined;
    }

    return res;
}

function calculateTotalDocs(docs: any, ignoreDoc?: string): number {

    if (typeof docs === "number") {
        return docs;
    } else if (typeof docs === "object") {
        if (Array.isArray(docs) && docs.length > 0) {
            return docs.reduce((sum, doc) => {
                return sum + calculateTotalDocs(doc, ignoreDoc);
            }, 0);
        } else {
            let tempSum = 0;

            for (const doc of Object.values(docs)) {
                if (ignoreDoc && doc === ignoreDoc) {
                    return 0;
                } else {
                    tempSum += calculateTotalDocs(doc, ignoreDoc);
                }
            }

            return tempSum;
        }
    }
    return 0;
}
