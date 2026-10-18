# Laws of UX Reviewer

Reviewer prepared by R. Domantay. Five modules, each with lessons and practice:

1. Laws of UX (lawsofux.com), with Gestalt, Fitts, Hick and Doherty demos
2. 10 Usability Heuristics (Nielsen), heuristic evaluation, severity ratings
3. Design Thinking Process (d.school five stages and tools)
4. System Usability Scale, with a live calculator
5. UX Research: methods (method map, sample sizes, card sorting, tree testing) and research biases

Practice question types: multiple choice, screenshot "spot the problem", tap the screen, A or B, dropdown matching, app case studies (law + reason), ordering, and SUS computation. Every wrong answer shows why it's wrong. Progress is saved in the browser; nothing is sent anywhere.

- Questions: `src/modules/<module>/questions.js` (types documented in `src/score.js`)
- Lessons: `src/modules/<module>/Lessons.jsx`
- Screenshots (HTML/CSS mockups): `src/figures.jsx`
- `npm test` checks every question; `npm run build` builds to `dist/`

Vercel: import the repo, framework preset Vite, no env vars.
