# Aenigma: Detective Mystery RPG

Aenigma is a psychological noir detective RPG set in District 7. Investigate the locked-room murder of watchmaker Aurelia Vance in the Saint Irene clocktower by examining the crime scene, questioning its occupants, and following clues through branching dialogue and skill checks.

## Features

- Create a detective, choose a signature skill and vice, and allocate character attributes.
- Explore an illustrated crime scene and inspect points of interest.
- Collect clues and items, develop thoughts, and make choices that shape the investigation.
- Play with interface and dialogue localization in English, Indonesian, Chinese (Simplified), Japanese, Korean, Spanish, French, German, Russian, Italian, Portuguese, or Arabic.
- Hear an original ambient soundscape, with an in-game audio toggle.

## Requirements

- Node.js
- A modern browser with JavaScript enabled

The project uses Node.js built-in modules and has no external package dependencies.

## Run locally

From the project directory:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The server serves the game locally; keep the terminal running while you play.

## Build

```sh
npm run build
```

This combines the source modules in `src/` into `dist/bundle.js`, which the game loads from `index.html`.

## Project structure

```text
.
├── assets/       Game artwork
├── dist/         Browser bundle
├── src/          Game logic, case data, UI, audio, and localization
├── styles/       Interface stylesheets
├── build.js      Standalone bundler
├── index.html    Game entry point
```

## Gameplay

Follow the prompts to create your character and begin the case. Click scene points of interest to investigate or speak with characters, then choose dialogue options and use the clues you uncover to advance the inquiry. 

Click the detective profile chip in the top header to inspect full psychological dossiers and vital condition pips. Click the compact case badge (`#D4-04`) to open the **Papan Investigasi & Arsip Kasus (Case Dossier & Master Board)**, where you can examine:
1. **Kasus Aktif (`#D4-04/HOR`)**: Clues and real-time evidence uncovered at the Saint Irene clocktower crime scene.
2. **Arsip Kasus Terpecahkan (`#D4-01`, `#D4-02`, `#D4-03`)**: Past solved homicides by Detective Renata Vance that yield Keystone Evidence pieces.
3. **Kasus Utama (`#PRIME-00/OMEGA`)**: The grand conspiracy web connecting all solved cases to expose the mastermind behind District 7.

Use the in-game language and audio controls to adjust the experience.


