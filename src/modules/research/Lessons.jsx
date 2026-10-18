import { useState } from 'react';
import { TERMS } from '../../terms.js';
import { BIASES, LEADING, METHODS } from './lessons.js';

// Phases follow NN/g's "When to Use Which User-Experience Research Methods".
const PHASES = [
  {
    name: 'Explore',
    kind: 'Generative',
    goal: 'Discover who the users are, what they need and what problems are worth solving, before anything is designed.',
    eg: 'Interviews, contextual inquiry, diary studies',
  },
  {
    name: 'Design',
    kind: 'Evaluative (formative)',
    goal: 'Check and improve a design while it is still changing.',
    eg: 'Usability tests on prototypes, card sorting, tree testing',
  },
  {
    name: 'Launch and assess',
    kind: 'Evaluative (summative)',
    goal: 'Measure how well the finished product works, and compare it with competitors or older versions.',
    eg: 'Analytics, A/B tests, surveys like SUS',
  },
];

const SAMPLE = [
  ['Usability test (qualitative)', '5 per round', 'Finds about 85% of problems. Fix them, then test again.'],
  ['Interviews', '5 to 10 per user group', 'Stop when you stop hearing new things.'],
  ['Card sorting', 'At least 15', '30 to 50 if you need statistics.'],
  ['Tree testing', 'About 50', 'Enough for reliable success rates.'],
  ['Quantitative usability metrics', '20 to 40', 'Needed for numbers like average task time.'],
  ['Surveys, A/B tests, analytics', 'Hundreds or more', 'More people means smaller margins of error.'],
];

export default function ResearchLessons() {
  return (
    <div className="lessons">
      <p className="lede">
        UX research is how a team learns about users instead of guessing. It answers two kinds of questions: what people need (before
        designing) and whether the design works (after). The right method depends on what you want to learn and when.
      </p>

      <section className="lesson">
        <h2>Research across a project</h2>
        <div className="tools">
          {PHASES.map((p, i) => (
            <div key={p.name} className="tool">
              <span className="stage-n">Phase {i + 1}</span>
              <h3>{p.name}</h3>
              <p className="phase-kind">{p.kind}</p>
              <p>{p.goal}</p>
              <p className="muted">{p.eg}</p>
            </div>
          ))}
        </div>
        <p>
          <b>Generative</b> research creates new understanding and ideas. <b>Evaluative</b> research tests something that already exists:
          formative while it is being shaped, summative once it is done.
        </p>
      </section>

      <section className="lesson">
        <h2>Two questions that sort every method</h2>
        <div className="tools">
          <div className="tool">
            <h3>Attitudinal or behavioral?</h3>
            <p>
              <b>Attitudinal</b> methods collect what people <i>say</i>: opinions, beliefs, preferences. <b>Behavioral</b> methods watch
              what people <i>do</i>.
            </p>
            <p className="formula">What people say ≠ what people do</p>
          </div>
          <div className="tool">
            <h3>Qualitative or quantitative?</h3>
            <p>
              <b>Qualitative</b> methods observe a few people directly and answer <i>why</i> and <i>how to fix it</i>.{' '}
              <b>Quantitative</b> methods measure many people and answer <i>how many</i> and <i>how much</i>.
            </p>
            <p className="formula">Qual finds the why. Quant counts the what.</p>
          </div>
        </div>
      </section>

      <MethodMap />

      <section className="lesson">
        <h2>How many participants?</h2>
        <FiveUsers />
        <div className="table-wrap">
          <table className="sev">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Typical number</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE.map(([m, n, note]) => (
                <tr key={m}>
                  <td>{m}</td>
                  <td>
                    <b>{n}</b>
                  </td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="lesson">
        <h2>Card sorting and tree testing</h2>
        <div className="tools">
          <div className="tool">
            <h3>Card sorting</h3>
            <p>People sort topics on cards into groups that make sense to them. It shows how users expect content to be organized.</p>
            <ul>
              <li>
                <b>Open:</b> people make and name their own groups.
              </li>
              <li>
                <b>Closed:</b> people sort cards into groups you already named.
              </li>
              <li>
                <b>Hybrid:</b> fixed groups, but people may add new ones.
              </li>
            </ul>
          </div>
          <div className="tool">
            <h3>Tree testing</h3>
            <p>
              The reverse. People get a task ("Where would you find your grades?") and click through a text-only menu tree. It checks
              whether a navigation structure works, without any visual design getting in the way.
            </p>
            <p className="muted">Common order: card sort to create the menu, tree test to check it.</p>
          </div>
        </div>
      </section>

      <section className="lesson">
        <h2>Research biases</h2>
        <p>
          A bias is a systematic error that pushes results away from the truth. It can come from the researcher, the participants or the
          way the study is set up. You can't remove bias completely, but you can plan around it.
        </p>
        <ul className="bias-grid">
          {BIASES.map((b) => (
            <li key={b.id} className="bias">
              <h3>{TERMS[b.id].name}</h3>
              <p>{b.what}</p>
              <p className="bias-eg">
                <b>Example:</b> {b.eg}
              </p>
              <p className="bias-fix">
                <b>Avoid it:</b> {b.fix}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <Neutralizer />

      <section className="lesson">
        <h2>Running a fair session</h2>
        <ol className="steps">
          <li>Recruit people who match your real users, not just friends or classmates.</li>
          <li>Say that you are testing the design, not them, and that there are no wrong answers.</li>
          <li>Ask open questions and let silences happen. Don't explain the design or help.</li>
          <li>Ask about past behavior ("Tell me about the last time…"), not future guesses ("Would you…?").</li>
          <li>Have more than one person take notes and analyze, and look for evidence against your ideas.</li>
        </ol>
      </section>
    </div>
  );
}

function MethodMap() {
  const [pick, setPick] = useState('usability-test');
  const m = METHODS.find((x) => x.id === pick);
  return (
    <section className="lesson">
      <h2>The method map</h2>
      <p className="hint">Tap a method to see what it is and when to use it.</p>
      <div className="mmap">
        <span className="mmap-ax mmap-x0">Says</span>
        <span className="mmap-ax mmap-x1">Does</span>
        <span className="mmap-ax mmap-y0">Why · qualitative</span>
        <span className="mmap-ax mmap-y1">How many · quantitative</span>
        <div className="mmap-plot">
          {METHODS.map((x, i) => (
            <button
              key={x.id}
              className="mmap-dot"
              style={{ left: `${6 + x.x * 88}%`, top: `${6 + x.y * 88}%` }}
              aria-pressed={pick === x.id}
              aria-label={TERMS[x.id].name}
              onClick={() => setPick(x.id)}
            >
              <span aria-hidden="true">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <ol className="mmap-list">
        {METHODS.map((x) => (
          <li key={x.id}>
            <button aria-pressed={pick === x.id} onClick={() => setPick(x.id)}>
              {TERMS[x.id].name}
            </button>
          </li>
        ))}
      </ol>
      <div className="stage-card" aria-live="polite">
        <h3>{TERMS[m.id].name}</h3>
        <p className="muted">
          {m.x < 0.5 ? 'Mostly attitudinal (what people say)' : 'Mostly behavioral (what people do)'},{' '}
          {m.y < 0.5 ? 'qualitative' : 'quantitative'}
        </p>
        <dl>
          <div>
            <dt>What</dt>
            <dd>{m.what}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{m.when}</dd>
          </div>
          <div>
            <dt>How many</dt>
            <dd>{m.who}</dd>
          </div>
          <div>
            <dt>Watch out</dt>
            <dd>{m.watch}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

// Nielsen and Landauer: problems found = 1 − (1 − L)^n, with L ≈ 31%.
function FiveUsers() {
  const [n, setN] = useState(5);
  const found = Math.round((1 - Math.pow(1 - 0.31, n)) * 100);
  return (
    <div className="demo">
      <p className="demo-title">How many problems do n users find?</p>
      <label className="fu-row">
        <span>
          Users: <b>{n}</b>
        </span>
        <input type="range" min="1" max="15" value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <div className="fu-bar" aria-hidden="true">
        <span style={{ width: `${found}%` }} />
      </div>
      <p aria-live="polite">
        About <b>{found}%</b> of the usability problems.
      </p>
      <p className="demo-note">
        Formula: found = 1 − (1 − 0.31)<sup>n</sup>. One user finds about 31%. After 5, each new user mostly repeats what you saw, so
        it is better to fix the problems and run another round of 5.
      </p>
    </div>
  );
}

function Neutralizer() {
  const [fixed, setFixed] = useState([]);
  const toggle = (i) => setFixed((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));
  return (
    <section className="lesson">
      <h2>Make it neutral</h2>
      <p className="hint">Each question leads the participant. Tap to rewrite it.</p>
      <ul className="neutral">
        {LEADING.map(([bad, good], i) => {
          const on = fixed.includes(i);
          return (
            <li key={i}>
              <button className={on ? 'is-fixed' : ''} aria-pressed={on} onClick={() => toggle(i)}>
                <span className="neutral-tag">{on ? 'Neutral' : 'Leading'}</span>
                <span aria-live="polite">{on ? good : bad}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p>
        Leading questions put words in people's mouths, assume a feeling ("love", "trouble"), or ask for a prediction instead of a real
        experience.
      </p>
    </section>
  );
}
