# Motor City Quest

Created by Anthony. October 6, 2026.

A fantasy role-playing game set in real Detroit places. Pick a hero, walk into six Detroit landmarks with a fantasy twist, make a move, roll the die. Win a round and you meet a legend: a real, sourced quote from a Black hero through history, plus one true Detroit fact.

Built for a live, projected demo. One laptop, one screen, keyboard-driven. No internet, no server, no account, no API spend.

## Run it at the demo

1. Open `dist/index.html` by double-clicking it (or the copy at the project root, `Motor City Quest - DEMO.html`). It is one self-contained file.
2. Press **F** for fullscreen.
3. Press **Space** to begin.

| Key | What it does |
|---|---|
| Space or Enter | Start, continue, next place, play again |
| 1, 2, 3 | Pick a hero, or pick a move |
| F | Fullscreen on and off |
| Shift + W | Sure-win switch. Next rolls land a 20. A small gold dot shows top-right while it is on. Press again to turn off. |

Everything also works with the mouse.

## How a round goes (about 60 to 90 seconds)

1. A Detroit place appears with its quest name, real name, and a four-sentence scene.
2. Three moves. Each uses Might, Mind, or Heart. Each shows its target number and your odds.
3. Press a number. A 20-sided die rolls. Roll plus your stat beats the target and you win.
4. Win: confetti, a legend's quote card, and a Detroit truth about the place.
5. Miss: you lose a heart and pick a different move. Lose all three hearts and the Spirit of Detroit restores them and moves you on. No game over, the demo keeps moving.
6. After six rounds: the Book of Legends shows every quote you earned.

## Heroes

| Hero | Might | Mind | Heart |
|---|---|---|---|
| The Builder | 4 | 1 | 2 |
| The Scholar | 1 | 4 | 2 |
| The Spark | 2 | 1 | 4 |

Every hero totals 7 points. No hero is strictly better. The best-matched move always has at least a 60 percent chance.

## The content

- `src/data/landmarks.ts`: 12 Detroit places. Belle Isle, the Spirit of Detroit, Hitsville U.S.A., Eastern Market, the Fist, the DIA, the Wright Museum, Michigan Central Station, the Gateway to Freedom memorial, Black Bottom and Paradise Valley, the Heidelberg Project, the Fox Theatre. Each game draws six at random.
- `src/data/legends.ts`: 30 Black heroes with one quote each and its source. Detroit-connected heroes carry a `313` tag that shows on the card. The rule in that file: never add a quote that cannot be traced to a speech, book, interview, or published letter.

To add a place or a legend, add one object to the matching file and run the tests. The tests check that ids are unique, every place uses all three stats, every target is 10 to 13, and every legend has a source.

## Develop

```
npm install
npm run dev        # http://localhost:5173
npm test           # engine and content tests
npm run build      # one-file build to dist/index.html
```

Stack: React 19, Vite, Tailwind 4, Framer Motion, canvas-confetti, vite-plugin-singlefile. Same base as Money Multiplier. The rules live in `src/engine/engine.ts` with no React in them, so the game logic can be tested and swapped without touching screens.

## Not in v1

- No audio.
- No audience-on-phones mode. The layout is desktop and projector first. It does work on a phone, but it was built for a big screen.
- No brand. Detroit night sky, gold, and the Spirit of Detroit's patina green.

## Change log

- 2026-10-06 v1.0: built from Jermaine's one-line idea for a live demo. Youth audience, no brand, projected laptop, choose-your-path rounds.
