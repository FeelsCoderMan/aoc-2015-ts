import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputFormatted = input.trim().
    split("\n");

type Distance = {
    to: string,
    dist: number,
}

// TODO: implement Dijkstra algorithm, every vertex must be visited

function part1(): number {
    let map: Map<string, Distance[]> = generateLocations();
    let routes = generateRoutes(Array.from(map.keys()));
    
    let minDistance = Number.MAX_VALUE;

    routes.forEach(route => {
        let currDistance = 0;

        for (let i = 0; i < route.length - 1; i++) {
            let distance = findDistance(map, route[i], route[i + 1]);

            if (distance > 0) {
                currDistance += distance;
            }
        }
        
        if (currDistance < minDistance) {
            minDistance = currDistance;
        }
    })


    return minDistance;
}

function part2(): number {
    let map: Map<string, Distance[]> = generateLocations();
    let routes = generateRoutes(Array.from(map.keys()));
    
    let maxDistance = Number.MIN_VALUE;

    routes.forEach(route => {
        let currDistance = 0;

        for (let i = 0; i < route.length - 1; i++) {
            let distance = findDistance(map, route[i], route[i + 1]);

            if (distance > 0) {
                currDistance += distance;
            }
        }
        
        if (currDistance > maxDistance) {
            maxDistance = currDistance;
        }
    })


    return maxDistance;
}

function findDistance(map: Map<string, Distance[]>, locationOne: string, locationTwo: string): number {
    let currDistanceArr = map.get(locationOne);


    if (currDistanceArr) {
        let distance = currDistanceArr.find(currDistance => currDistance.to === locationTwo);

        if (distance) {
            return distance.dist;
        }
    }

    return -1;
}

function generateRoutes(distances: string[]) : string[][] {
    let routes: string[][] = [];

    if (distances.length === 1) {
        return [Array.from(distances)];
    }

    for (let i = 0; i < distances.length; i++) {
        let firstVal = distances.shift() as string;
        let tempRoutes = generateRoutes(distances);

        for (let tempRoute of tempRoutes) {
            tempRoute.push(firstVal);
            routes.push(tempRoute);
        }
        
        distances.push(firstVal);
    }

    return routes;
}

// TODO: avoid duplicated memory usage
// find a way of obtaining distinct locations
function generateLocations(): Map<string, Distance[]> {
    let map = new Map<string, Distance[]>();

    inputFormatted.forEach(line => {
        const distArr = line.split(" ");

        pushLocation(map, distArr[0], distArr[2], +distArr[4]);
        pushLocation(map, distArr[2], distArr[0], +distArr[4]);
    });

    return map;
}


function pushLocation(map: Map<string, Distance[]>, from: string, to: string, dist: number): void {
        let route = {
            to: to,
            dist: dist,
        } as Distance;
        let currDistance = map.get(from);

        if (!currDistance) {
            currDistance = [] as Distance[];
        }

        currDistance.push(route);
        map.set(from, currDistance);
}

console.log(part2());
