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
└── server.js     Local development server (port 3000)
```

## Gameplay

Follow the prompts to create your character and begin the case. Click scene points of interest to investigate or speak with characters, then choose dialogue options and use the clues you uncover to advance the inquiry. Use the in-game language and audio controls to adjust the experience. The radar control can also be activated with **Space**.
