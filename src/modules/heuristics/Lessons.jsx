import { useState } from 'react';
import { TERMS } from '../../terms.js';

// Definitions follow nngroup.com/articles/ten-usability-heuristics/.
const HEURISTICS = [
  {
    id: 'h1',
    def: 'The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.',
    good: 'A delivery app shows "Rider is 5 min away" on a live map.',
    bad: 'Pressing Upload shows nothing until the file is done, so people press it again.',
  },
  {
    id: 'h2',
    def: "The design should speak the users' language. Use words, phrases and concepts familiar to the user, not internal jargon, and follow real-world order.",
    good: 'A shopping app uses a cart icon and the word "Cart".',
    bad: 'An enroll button that says "Commit transaction to registrar DB".',
  },
  {
    id: 'h3',
    def: 'Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without a long process.',
    good: 'Gmail\'s "Undo send" right after sending.',
    bad: 'A 5-step wizard with no Back or Cancel button.',
  },
  {
    id: 'h4',
    def: 'Users should not have to wonder whether different words, situations or actions mean the same thing. Follow platform and industry conventions.',
    good: 'The same "Save" label and icon on every screen.',
    bad: '"Submit", "Send" and "Confirm" for the same action on different pages.',
  },
  {
    id: 'h5',
    def: 'Good error messages are important, but the best designs prevent problems in the first place. Remove error-prone conditions or ask for confirmation before a risky action.',
    good: 'A date picker that only allows valid dates.',
    bad: 'A "Delete all" button right next to "Save" with no confirmation.',
  },
  {
    id: 'h6',
    def: 'Minimize memory load by making elements, actions and options visible. Users should not have to remember information from one part of the interface to another.',
    good: 'Recent searches appear under the search box.',
    bad: 'Typing a subject code from memory instead of picking the subject from a list.',
  },
  {
    id: 'h7',
    def: 'Shortcuts, hidden from novice users, can speed up interaction for experts, so the design serves both. Let users tailor frequent actions.',
    good: 'Ctrl+C / Ctrl+V, or swipe-to-archive in an email app.',
    bad: 'An admin must click through 6 menus for a task they do 50 times a day.',
  },
  {
    id: 'h8',
    def: 'Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with the relevant ones.',
    good: 'A checkout page with only the fields needed to pay.',
    bad: 'A dashboard with 30 stats when staff only use 4.',
  },
  {
    id: 'h9',
    def: 'Error messages should be in plain language (no error codes), precisely say what the problem is, and suggest a solution.',
    good: '"That section is full. Choose another section of IT 30."',
    bad: '"Error 0x0F3: NullReferenceException."',
  },
  {
    id: 'h10',
    def: 'It is best if the system needs no extra explanation. When help is needed, it should be easy to search, focused on the task, and concise.',
    good: 'A "?" next to a tricky field with a two-line tip.',
    bad: 'A 60-page PDF manual linked from the footer.',
  },
];

const SEVERITY = [
  ['0', 'Not a usability problem', 'Evaluators disagree it is a problem at all.'],
  ['1', 'Cosmetic problem', 'Fix only if there is extra time. Example: a typo in the footer.'],
  ['2', 'Minor usability problem', 'Low priority to fix.'],
  ['3', 'Major usability problem', 'Important to fix; high priority.'],
  ['4', 'Usability catastrophe', 'Must be fixed before the product is released.'],
];

export default function HeuristicsLessons() {
  const [open, setOpen] = useState(null);
  return (
    <div className="lessons">
      <p className="lede">
        Jakob Nielsen and Rolf Molich wrote these in 1990; Nielsen refined them in 1994. They are "heuristics" because they are broad
        rules of thumb, not specific guidelines. Evaluators use them to find usability problems without testing with users.
      </p>

      <section className="lesson">
        <h2>The 10 heuristics</h2>
        <p className="hint">Tap a heuristic to see a good and a bad example.</p>
        <ol className="heur">
          {HEURISTICS.map((h, i) => {
            const isOpen = open === h.id;
            return (
              <li key={h.id} className={isOpen ? 'is-open' : ''}>
                <button className="heur-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : h.id)}>
                  <span className="heur-n">{i + 1}</span>
                  <span className="heur-name">{TERMS[h.id].short}</span>
                  <span className="heur-chev" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <p className="heur-def">{h.def}</p>
                {isOpen && (
                  <div className="heur-eg">
                    <p className="good">
                      <b>Follows it:</b> {h.good}
                    </p>
                    <p className="bad">
                      <b>Breaks it:</b> {h.bad}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="lesson">
        <h2>Doing a heuristic evaluation</h2>
        <ol className="steps">
          <li>Pick 3 to 5 evaluators. One person finds only about a third of the problems; five find about 75%.</li>
          <li>Each evaluator goes through the interface alone, at least twice, and notes every problem and the heuristic it breaks.</li>
          <li>Only then do evaluators combine their lists, so they don't influence each other.</li>
          <li>Rate each problem's severity (below) and decide what to fix first.</li>
        </ol>
        <p>
          Heuristic evaluation is cheap and fast, but it is done by evaluators, not real users. Pair it with usability testing.
        </p>
      </section>

      <section className="lesson">
        <h2>Severity ratings (0 to 4)</h2>
        <p>Severity depends on how often the problem happens, how much it hurts, and whether users run into it again and again.</p>
        <div className="table-wrap">
          <table className="sev">
            <thead>
              <tr>
                <th scope="col">Rating</th>
                <th scope="col">Meaning</th>
                <th scope="col">What to do</th>
              </tr>
            </thead>
            <tbody>
              {SEVERITY.map(([n, name, note]) => (
                <tr key={n}>
                  <td className={`sev-n s${n}`}>{n}</td>
                  <td>{name}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
