import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The 3AM Fridge Text: one line a smart fridge texts its owner at 3am.
// Three candidates were drafted and scored against the judge brief
// (fridge voice first, screenshot laugh, fresh angle — no milk/ice/door gags):
//   A. "sir. the cheese has achieved consciousness and is asking about you.
//       i have told it nothing." — deadpan machine voice, freshest angle. PICKED.
//   B. "You have opened me 11 times tonight. We both know you're not hungry.
//       Talk to me." — leans on the door-open angle the brief warns against.
//   C. "Inventory update: your life choices are on the second shelf, expiring
//       Friday. I see everything." — good voice, but the expiring trope is common.
const LINE =
  "sir. the cheese has achieved consciousness and is asking about you. i have told it nothing.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, LINE, "utf8");

// Verify what landed on disk is exactly the line, no extra bytes,
// no trailing newline, and still inside the gate's 1-140 character cap.
const back = readFileSync(dst, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the line");
}
if (back.endsWith("\n") || back.length !== LINE.length) {
  throw new Error("entry.txt must be the bare line, nothing more");
}
