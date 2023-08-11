import fs from "fs"

const getUnit = (num, precision) => {
  return Math.floor(num / precision);
}


const prettifyAvgGaps = (avgGaps, precision) => {
  return Object.entries(avgGaps).map(([a, b]) => {
    const x = Math.round(Number(a) * precision * 100) / 100;
    const y = Math.round((Number(a) + 1) * precision * 100) / 100;
    return `[${x},${y}[;${b}`;
  }).join("\n")
}

const lines = fs.readFileSync("addressesClaims.csv", "utf-8").split("\n").filter(l => l.length > 0)
const avgGaps1 = {};
const avgGaps02 = {};

for (const line of lines) {
  const weeks = line.split(",")[1].slice(1, -1).split(" ").map(v => Number(v));
  if (weeks.length <= 1) {
    continue;
  }
  const avgGap = (weeks.at(-1) - weeks.at(0)) / (weeks.length - 1);
  const avgUnit1 = getUnit(avgGap, 1);
  const avgUnit02 = getUnit(avgGap, 0.2);
  avgGaps1[avgUnit1] = (avgGaps1[avgUnit1] ?? 0) + 1;
  avgGaps02[avgUnit02] = (avgGaps02[avgUnit02] ?? 0) + 1;
}

console.log("# Scale 1")
console.log(prettifyAvgGaps(avgGaps1, 1));
console.log("# Scale 0.2")
console.log(prettifyAvgGaps(avgGaps02, 0.2));
