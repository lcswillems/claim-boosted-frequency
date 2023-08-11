import fs from "fs"

const lines = fs.readFileSync("addressesClaims.csv", "utf-8").split("\n").filter(l => l.length > 0)
const floorAvgGaps = {};

for (const line of lines) {
  const weeks = line.split(",")[1].slice(1, -1).split(" ").map(v => Number(v));
  if (weeks.length <= 1) {
    continue;
  }
  const avgGap = (weeks.at(-1) - weeks.at(0)) / (weeks.length - 1);
  const floorAvgGap = Math.floor(avgGap);
  floorAvgGaps[floorAvgGap] = (floorAvgGaps[floorAvgGap] ?? 0) + 1;
}

console.log(Object.entries(floorAvgGaps).map(([a, b]) => `[${a},${Number(a)+1}[;${b}`).join("\n"));
