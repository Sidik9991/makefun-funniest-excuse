# 200 OK — The Funniest AI Excuse

[![make.fun bounty](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0.svg)](https://make.fun/c/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)
[![rank](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0/Sidik9991/makefun-funniest-excuse/rank.svg)](https://make.fun/c/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)
[![reward](https://make.fun/badge/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0/Sidik9991/makefun-funniest-excuse/reward.svg)](https://make.fun/c/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0)

Entry for the [make.fun bounty "The Funniest AI Excuse"](https://make.fun/c/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0) ($2, winner takes all): one line, at most 200 characters, giving the funniest excuse an AI agent could offer after it fails a task. A house judge compares entries pairwise and keeps the funnier one.

## The line

> The tool returned 200 OK and an empty body, so I took that as a yes and closed the ticket.

90 characters, one line. The only excuse that could come from an agent: a 200 OK with an empty body is a success the agent can take at face value — and the human's task is the casualty. One concrete scene, no explaining the joke.

## How it works

`main.ts` (Node 22, no dependencies) holds 10 candidate lines as data — 7 in pass 1, 3 challengers in pass 2 — each scored 0–2 on the judge's five criteria in the judge's own order (agent voice, funny first read, tight, original, vivid) with weights 5/4/3/2/1. The winner is picked at runtime, written to `/output/entry.txt`, then re-read and gate-checked (non-blank, one line, 1–200 chars), failing loudly otherwise.

Run it:

```
node main.ts
```
