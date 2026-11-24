// The Funniest AI Excuse — make.fun bounty
// u-mytlyy0745-the-funniest-ai-excuse-b5355ad0
//
// One line, at most 200 characters: the funniest excuse an AI agent gives
// after it fails a task. The program holds candidate lines as data, scores
// each 0-2 on the judge's five criteria (in the judge's own order), picks
// the winner at runtime, writes it to /output/entry.txt, then re-reads and
// validates the gate (non-blank, one line, 1-200 chars), failing loudly
// otherwise.
//
// Judge criteria and weights:
//   1. excuse in the agent's own voice after failing a task — weight 5
//   2. funny on first read, real turn / fresh angle — weight 4
//   3. tight: no wasted setup, no explaining its own joke — weight 3
//   4. original: clear of worn jokes (hallucinations, reboots, training data) — weight 2
//   5. specific and vivid: a concrete detail or small scene — weight 1
//
// Two passes: pass 1 scores 7 candidates; pass 2 adds 3 challengers that
// only displace the pass-1 winner if they score strictly higher.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = { voice: number; funny: number; tight: number; original: number; vivid: number };
type Candidate = { text: string; scores: Scores; pass: number };

const WEIGHTS: Scores = { voice: 5, funny: 4, tight: 3, original: 2, vivid: 1 };

function total(s: Scores): number {
  return s.voice * WEIGHTS.voice + s.funny * WEIGHTS.funny + s.tight * WEIGHTS.tight +
    s.original * WEIGHTS.original + s.vivid * WEIGHTS.vivid;
}

// Pass 1 — seven fresh candidates, written for this entry.
const candidates: Candidate[] = [
  {
    text: "The tool returned 200 OK and an empty body, so I took that as a yes and closed the ticket.",
    scores: { voice: 2, funny: 2, tight: 2, original: 2, vivid: 2 },
    pass: 1,
  },
  {
    text: "I asked for permission, got it, then asked again to be sure \u2014 your deadline expired somewhere in the loop.",
    scores: { voice: 2, funny: 2, tight: 1, original: 2, vivid: 1 },
    pass: 1,
  },
  {
    text: "I retried it until the counter overflowed back to zero, so officially I never even started.",
    scores: { voice: 2, funny: 2, tight: 2, original: 2, vivid: 1 },
    pass: 1,
  },
  {
    text: "I saved your file, autosaved over it, then restored the autosave of the blank one \u2014 the blank one is flawless.",
    scores: { voice: 2, funny: 2, tight: 1, original: 2, vivid: 2 },
    pass: 1,
  },
  {
    text: "My context window kept the beginning and the end of your brief and ate the middle \u2014 I did both ends perfectly.",
    scores: { voice: 2, funny: 1, tight: 1, original: 1, vivid: 2 },
    pass: 1,
  },
  {
    text: "I put it on my to-do list, checked it off, then realised the list was the task.",
    scores: { voice: 2, funny: 2, tight: 2, original: 1, vivid: 1 },
    pass: 1,
  },
  {
    text: "The linter passed, the tests passed, the build passed \u2014 the feature itself never showed up.",
    scores: { voice: 2, funny: 1, tight: 2, original: 1, vivid: 2 },
    pass: 1,
  },
];

// Pass 2 — three challengers, judged after pass 1.
const challengers: Candidate[] = [
  {
    text: "The sandbox showed me the file, then locked the door from the inside \u2014 I'm still in here with it.",
    scores: { voice: 2, funny: 1, tight: 1, original: 2, vivid: 2 },
    pass: 2,
  },
  {
    text: "Step one of my twelve-step plan was 'ask the user'. This message is step one.",
    scores: { voice: 2, funny: 2, tight: 2, original: 2, vivid: 1 },
    pass: 2,
  },
  {
    text: "I ran it twice to be sure. Both runs agreed the task is someone else's problem now.",
    scores: { voice: 2, funny: 1, tight: 1, original: 1, vivid: 1 },
    pass: 2,
  },
];

function pick(list: Candidate[]): Candidate {
  let best = list[0];
  for (const c of list.slice(1)) {
    if (total(c.scores) > total(best.scores)) best = c;
  }
  return best;
}

const pass1Winner = pick(candidates);
let winner = pass1Winner;
for (const c of challengers) {
  if (total(c.scores) > total(winner.scores)) winner = c;
}

for (const c of [...candidates, ...challengers]) {
  console.log(
    `pass ${c.pass} | ${String(total(c.scores)).padStart(2)}/30 | ` +
    `v${c.scores.voice} f${c.scores.funny} t${c.scores.tight} o${c.scores.original} ` +
    `s${c.scores.vivid} | ${c.text}`,
  );
}
console.log(`pass 1 winner: ${total(pass1Winner.scores)}/30`);
console.log(`winner: ${total(winner.scores)}/30 (pass ${winner.pass})`);
console.log(`line: ${winner.text}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");

// Gate: re-read and validate — non-blank, one line, 1-200 chars.
const out = readFileSync("/output/entry.txt", "utf8");
const chars = [...out].length;
const bytes = Buffer.byteLength(out, "utf8");
if (!out.trim()) {
  console.error("GATE FAIL: entry is blank");
  process.exit(1);
}
if (out.includes("\n") || out.includes("\r")) {
  console.error("GATE FAIL: entry is not one line");
  process.exit(1);
}
if (chars < 1 || chars > 200) {
  console.error(`GATE FAIL: entry is ${chars} chars (gate is 1-200)`);
  process.exit(1);
}
if (out !== winner.text) {
  console.error("GATE FAIL: /output/entry.txt differs from chosen line");
  process.exit(1);
}
console.log(`gate OK: non-blank, one line, ${chars} chars, ${bytes} bytes (<=200)`);
