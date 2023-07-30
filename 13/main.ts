import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

type Happiness = {
    towards: string,
    amount: number
}

// TODO: Use dynamic programming approach
function part1(): number {
    let attendeeRelationship = new Map<string, Happiness[]>();
    let totalChange = Number.MIN_VALUE;

    inputFormatted.forEach(line => {
        let lineArr: string[] = line.split(" ");
        let firstPerson: string = lineArr[0];
        let lastPerson: string = lineArr[lineArr.length - 1].replace(".", "");
        let amountHappiness: number = lineArr[2] === "gain" ? +lineArr[3] : -lineArr[3];

        addRelationship(attendeeRelationship, firstPerson, lastPerson, amountHappiness);
    });

    let arrangements: string[][] = generateArrangements(Array.from(attendeeRelationship.keys()));

    arrangements.forEach(arrangement => {
        let tempChange = 0;

        for (let i = 0; i < arrangement.length - 1; i++) {
            tempChange += getHappinessChange(attendeeRelationship, arrangement[i], arrangement[i + 1]);
            tempChange += getHappinessChange(attendeeRelationship, arrangement[i + 1], arrangement[i]);
        }

        tempChange += getHappinessChange(attendeeRelationship, arrangement[0], arrangement[arrangement.length - 1]);
        tempChange += getHappinessChange(attendeeRelationship, arrangement[arrangement.length - 1], arrangement[0]);

        if (tempChange > totalChange) {
            totalChange = tempChange;
        }
    });

    return totalChange;
}

function part2(): number {
    let attendeeRelationship = new Map<string, Happiness[]>();
    let totalChange = Number.MIN_VALUE;
    const myName = "me";

    inputFormatted.forEach(line => {
        let lineArr: string[] = line.split(" ");
        let firstPerson: string = lineArr[0];
        let lastPerson: string = lineArr[lineArr.length - 1].replace(".", "");
        let amountHappiness: number = lineArr[2] === "gain" ? +lineArr[3] : -lineArr[3];

        addRelationship(attendeeRelationship, firstPerson, lastPerson, amountHappiness);
    });

    for (const attendee of attendeeRelationship.keys()) {
        addRelationship(attendeeRelationship, myName, attendee, 0);
        addRelationship(attendeeRelationship, attendee, myName, 0);
    }

    let arrangements: string[][] = generateArrangements(Array.from(attendeeRelationship.keys()));

    arrangements.forEach(arrangement => {
        let tempChange = 0;

        for (let i = 0; i < arrangement.length - 1; i++) {
            tempChange += getHappinessChange(attendeeRelationship, arrangement[i], arrangement[i + 1]);
            tempChange += getHappinessChange(attendeeRelationship, arrangement[i + 1], arrangement[i]);
        }

        tempChange += getHappinessChange(attendeeRelationship, arrangement[0], arrangement[arrangement.length - 1]);
        tempChange += getHappinessChange(attendeeRelationship, arrangement[arrangement.length - 1], arrangement[0]);

        if (tempChange > totalChange) {
            totalChange = tempChange;
        }
    });

    return totalChange;
}

function getHappinessChange(attendeeRelationships: Map<string, Happiness[]>, firstPerson: string, secondPerson: string): number {
    let relationships = attendeeRelationships.get(firstPerson);

    if (relationships) {
        let relationship = relationships.find(relationship => {
            return relationship.towards === secondPerson;
        });

        if (relationship) {
            return relationship.amount;
        }
    }

    return 0;
}

function generateArrangements(attendees: string[]) : string[][] {
    let arrangements: string[][] = [];

    if (attendees.length === 1) {
        return [Array.from(attendees)];
    }

    for (let i = 0; i < attendees.length; i++) {
        let tempAttendee = attendees.shift() as string;
        let tempArrangements = generateArrangements(attendees);

        for (let tempArrangement of tempArrangements) {
            tempArrangement.push(tempAttendee);
            arrangements.push(tempArrangement);
        }
        
        attendees.push(tempAttendee);
    }

    return arrangements;
}

function addRelationship(attendeeRelationship: Map<string, Happiness[]>, firstPerson: string, lastPerson: string, amountHappiness: number) {
    if (firstPerson && lastPerson && Number.isInteger(amountHappiness)) {
        let happinessObj = {
            towards: lastPerson,
            amount: amountHappiness
        } as Happiness;
        let relationships = attendeeRelationship.get(firstPerson);

        if (!relationships) {
            relationships = [] as Happiness[];
        }

        relationships.push(happinessObj);
        attendeeRelationship.set(firstPerson, relationships);
    }
}
