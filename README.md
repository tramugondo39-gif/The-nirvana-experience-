# The Nvna Experience

A responsive, interactive React + Vite mini-site.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Create a GitHub repository and push this project.
2. Import the repository at https://vercel.com/new
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Personalise before sharing
- Edit the message in the `noteOpen` modal in `src/main.jsx`.
- Edit the song list in the `tracks` array.
- Add/remove questions in the `prompts` and `quiz` arrays.
- Track saves are stored in the visitor's browser using localStorage.

The Listening Room includes the 25-track NVNA TASTE original playlist and 25-track Deluxe Edition. Track buttons open Spotify search results; this project does not stream or host copyrighted audio.
