import { useEffect, useState } from 'react';
import QuestionView, { TermLinks } from './QuestionView.jsx';
import { isReady, pointsFor, scoreAnswer } from '../score.js';

const key = (id) => `laws-of-ux-reviewer:${id}`;

function load(id, count) {
  try {
    const saved = JSON.parse(localStorage.getItem(key(id)));
    if (Array.isArray(saved) && saved.length <= count) return saved;
  } catch {
    // nothing saved
  }
  return [];
}

function save(id, answers) {
  try {
    localStorage.setItem(key(id), JSON.stringify(answers));
  } catch {
    // storage blocked; progress just won't survive a reload
  }
}

export default function Practice({ mod }) {
  const questions = mod.questions;
  const [answers, setAnswers] = useState(() => load(mod.id, questions.length));
  const [draft, setDraft] = useState(null);

  useEffect(() => save(mod.id, answers), [mod.id, answers]);

  const checked = !!draft?.checked;
  const qi = checked ? answers.length - 1 : answers.length;
  const done = qi >= questions.length;

  function restart() {
    setAnswers([]);
    setDraft(null);
    window.scrollTo(0, 0);
  }

  if (done) return <Summary mod={mod} answers={answers} onRestart={restart} />;

  const q = questions[qi];
  const value = checked ? answers[qi] : draft?.value ?? (q.type === 'order' ? q.start : undefined);

  function check() {
    setAnswers([...answers, value]);
    setDraft({ checked: true });
  }

  function next() {
    setDraft(null);
    window.scrollTo(0, 0);
  }

  const answered = answers.length;
  const pct = 3 + (answered / questions.length) * 97;

  return (
    <div className="practice">
      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answered} aria-label="Questions answered">
        <i style={{ width: `${pct}%` }} />
      </div>
      <QuestionView
        key={q.id}
        q={q}
        n={qi + 1}
        total={questions.length}
        value={value}
        checked={checked}
        onChange={(v) => setDraft({ value: v })}
      />
      <div className="actions">
        {checked ? (
          <button className="primary" onClick={next}>
            {qi + 1 === questions.length ? 'Finish' : 'Next question'}
          </button>
        ) : (
          <button className="primary" onClick={check} disabled={!isReady(q, value)}>
            Check
          </button>
        )}
        {answered > 0 && !checked && (
          <button className="ghost" onClick={restart}>
            Start over
          </button>
        )}
      </div>
    </div>
  );
}

function Summary({ mod, answers, onRestart }) {
  const rows = mod.questions.map((q, i) => ({ q, got: scoreAnswer(q, answers[i]), max: pointsFor(q) }));
  const got = rows.reduce((n, r) => n + r.got, 0);
  const max = rows.reduce((n, r) => n + r.max, 0);
  const misses = rows.filter((r) => r.got < r.max);
  return (
    <div className="summary">
      <p className="eyebrow">Practice finished</p>
      <h2 className="big">
        {got}
        <small> / {max} points</small>
      </h2>
      {misses.length ? (
        <>
          <h3 className="sub">Worth another look</h3>
          <ul className="review">
            {misses.map(({ q, got: g, max: m }) => (
              <li key={q.id}>
                <span className="review-n">
                  {g}/{m}
                </span>
                <span className="review-q">
                  {q.prompt}
                  <TermLinks keys={q.laws} />
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="lede">Everything right. Nice work.</p>
      )}
      <div className="actions">
        <button className="primary" onClick={onRestart}>
          Practice again
        </button>
        <a className="secondary" href="#/">
          All modules
        </a>
      </div>
    </div>
  );
}
