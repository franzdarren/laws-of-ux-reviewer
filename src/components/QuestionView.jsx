import { useEffect, useRef } from 'react';
import { TERMS, termName } from '../terms.js';
import { pointsFor, scoreAnswer } from '../score.js';
import { FIGURES } from '../figures.jsx';

const LETTERS = ['a', 'b', 'c', 'd'];

export function TermLinks({ keys }) {
  return (
    <span className="lawlinks">
      {keys
        .filter((k) => TERMS[k])
        .map((k) => (
          <a key={k} href={TERMS[k].url} target="_blank" rel="noreferrer">
            {TERMS[k].short ?? TERMS[k].name} <span aria-hidden="true">↗</span>
          </a>
        ))}
    </span>
  );
}

function Figure({ name, spot }) {
  const F = FIGURES[name];
  return F ? <F spot={spot} /> : null;
}

export default function QuestionView({ q, n, total, value, checked, onChange }) {
  const got = checked ? scoreAnswer(q, value) : 0;
  const max = pointsFor(q);
  const headingRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (checked) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [checked]);

  const wrongWhy = checked && got < max ? whyWrong(q, value) : null;

  return (
    <section className={`q q-${q.type}`}>
      <p className="eyebrow">
        Question {n} of {total}
        {max > 1 && ` · ${max} points`}
      </p>
      <h2 tabIndex={-1} ref={headingRef}>
        {q.prompt}
      </h2>
      {q.type === 'choice' && <Choice q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'ab' && <AB q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'tap' && <Tap q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'match' && <Match q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'case' && <Case q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'order' && <Order q={q} value={value} checked={checked} onChange={onChange} />}
      {q.type === 'number' && <NumberAnswer q={q} value={value} checked={checked} onChange={onChange} />}
      <div className="feedback-slot" aria-live="polite">
        {checked && (
          <div ref={feedbackRef} className={`feedback ${got === max ? 'is-right' : got > 0 ? 'is-part' : 'is-wrong'}`}>
            <p className="verdict">{got === max ? 'Correct.' : got > 0 ? `${got} of ${max} right.` : 'Not quite.'}</p>
            {wrongWhy && (
              <p className="why">
                <b>Why yours is wrong:</b> {wrongWhy}
              </p>
            )}
            <p>{q.explain}</p>
            <p className="more">
              Read more: <TermLinks keys={q.laws} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// The reason shown for a wrong answer, for types where one reason fits.
function whyWrong(q, value) {
  if (q.type === 'choice') return q.options[value]?.why;
  if (q.type === 'ab') return q.why?.[value];
  if (q.type === 'tap') {
    const wrong = value.filter((id) => !q.answer.includes(id));
    if (wrong.length) return wrong.map((id) => q.why?.[id]).filter(Boolean).join(' ');
    if (q.mode === 'all') return `You found ${value.length} of ${q.answer.length}. The dashed outlines show the ones you missed.`;
    return null;
  }
  if (q.type === 'order') return 'The highlighted steps are in the wrong place. The right order is shown below each one.';
  if (q.type === 'number') return `You answered ${value}; the answer is ${q.answer}.`;
  return null;
}

function stateFor(i, value, answer, checked) {
  if (!checked) return i === value ? 'is-on' : '';
  if (i === answer) return 'is-right';
  return i === value ? 'is-wrong' : 'is-dim';
}

function Choice({ q, value, checked, onChange }) {
  return (
    <>
      {q.figure && (
        <div className="stage">
          <Figure name={q.figure} />
        </div>
      )}
      <div className="options" role="radiogroup" aria-label="Answers">
        {q.options.map((opt, i) => (
          <button
            key={i}
            role="radio"
            aria-checked={i === value}
            className={`option ${stateFor(i, value, q.answer, checked)}`}
            disabled={checked}
            onClick={() => onChange(i)}
          >
            <span className="letter">{LETTERS[i]}</span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function AB({ q, value, checked, onChange }) {
  return (
    <div className="ab" role="radiogroup" aria-label="Designs">
      {q.figures.map((f, i) => (
        <button
          key={f}
          role="radio"
          aria-checked={i === value}
          className={`ab-pick ${stateFor(i, value, q.answer, checked)}`}
          disabled={checked}
          onClick={() => onChange(i)}
        >
          <span className="ab-tag">{i ? 'B' : 'A'}</span>
          <Figure name={f} />
        </button>
      ))}
    </div>
  );
}

function Tap({ q, value, checked, onChange }) {
  const picked = value || [];
  function toggle(id) {
    if (checked) return;
    if (q.mode === 'any') onChange([id]);
    else onChange(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);
  }
  const spot = (id, cls) => {
    const on = picked.includes(id);
    let state = on ? 'is-on' : '';
    if (checked) {
      const right = q.answer.includes(id);
      state = on ? (right ? 'is-right' : 'is-wrong') : right ? 'is-answer' : '';
    }
    return {
      className: `${cls} spot ${state}`,
      'data-spot': id,
      role: 'button',
      tabIndex: checked ? -1 : 0,
      'aria-pressed': on,
      onClick: () => toggle(id),
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle(id);
        }
      },
    };
  };
  return (
    <>
      <p className="hint">
        {q.mode === 'all' ? 'Tap to mark, tap again to unmark.' : 'Tap one spot.'}
        {q.mode === 'all' && picked.length > 0 && ` ${picked.length} marked.`}
      </p>
      <div className="stage stage-tap">
        <Figure name={q.figure} spot={spot} />
      </div>
    </>
  );
}

function Select({ id, label, value, options, labels, disabled, onChange, placeholder }) {
  return (
    <select id={id} aria-label={label} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((c) => (
        <option key={c} value={c}>
          {labels ? labels[c] : termName(c)}
        </option>
      ))}
    </select>
  );
}

function Match({ q, value, checked, onChange }) {
  const picks = value || {};
  return (
    <ol className="match">
      {q.rows.map((r, i) => {
        const pick = picks[i] || '';
        const ok = pick === r.answer;
        return (
          <li key={i} className={`match-row ${checked ? (ok ? 'is-right' : 'is-wrong') : ''}`}>
            {r.figure ? (
              <div className="match-fig">
                <Figure name={r.figure} />
                <span className="match-label">{r.label}</span>
              </div>
            ) : (
              <p className="match-text">{r.text}</p>
            )}
            <div className="match-pick">
              <Select
                id={`${q.id}-row${i}`}
                label={r.label || r.text}
                value={pick}
                options={q.choices}
                labels={q.labels}
                disabled={checked}
                placeholder={q.labels ? 'Choose…' : 'Choose a law or principle…'}
                onChange={(v) => onChange({ ...picks, [i]: v })}
              />
              {checked && !ok && (
                <p className="fix">
                  <b>Answer: {termName(r.answer, q.labels)}.</b> {r.why}
                  {pick && <span className="fix-wrong"> {termName(pick, q.labels)} doesn't fit here.</span>}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Case({ q, value, checked, onChange }) {
  const picks = value || {};
  // Reasons are listed once as A, B, C… (sorted so the answer order isn't given away); dropdowns pick a letter.
  const reasonKeys = Object.keys(q.reasons).sort((a, b) => q.reasons[a].localeCompare(q.reasons[b]));
  const letter = Object.fromEntries(reasonKeys.map((k, i) => [k, String.fromCharCode(65 + i)]));
  const reasonLabels = Object.fromEntries(reasonKeys.map((k) => [k, `${letter[k]}. ${q.reasons[k]}`]));
  return (
    <>
      <div className="stage">
        <Figure name={q.figure} />
      </div>
      <ul className="reasons" aria-label="Reasons">
        {reasonKeys.map((k) => (
          <li key={k}>
            <b>{letter[k]}</b>
            <span>{q.reasons[k]}</span>
          </li>
        ))}
      </ul>
      <ol className="case">
        {q.rows.map((r, i) => {
          const pick = picks[i] || {};
          const termOk = pick.term === r.answer;
          const reasonOk = pick.reason === r.reason;
          const set = (k, v) => onChange({ ...picks, [i]: { ...pick, [k]: v } });
          return (
            <li key={i} className={`case-row ${checked ? (termOk && reasonOk ? 'is-right' : 'is-wrong') : ''}`}>
              <span className="case-n" aria-hidden="true">
                {r.n}
              </span>
              <div className="case-picks">
                <label htmlFor={`${q.id}-t${i}`}>Number {r.n} applies</label>
                <Select
                  id={`${q.id}-t${i}`}
                  label={`Number ${r.n}: law or principle`}
                  value={pick.term || ''}
                  options={q.choices}
                  disabled={checked}
                  placeholder="Choose a law or principle…"
                  onChange={(v) => set('term', v)}
                />
                <label htmlFor={`${q.id}-r${i}`}>because…</label>
                <Select
                  id={`${q.id}-r${i}`}
                  label={`Number ${r.n}: reason`}
                  value={pick.reason || ''}
                  options={reasonKeys}
                  labels={reasonLabels}
                  disabled={checked}
                  placeholder="Choose a reason (A–F)…"
                  onChange={(v) => set('reason', v)}
                />
                {checked && !termOk && (
                  <p className="fix">
                    <b>Answer: {termName(r.answer)}.</b>
                  </p>
                )}
                {checked && !reasonOk && (
                  <p className="fix">
                    <b>Because: {letter[r.reason]}.</b> {q.reasons[r.reason]}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function Order({ q, value, checked, onChange }) {
  const list = value || q.start;
  function move(i, d) {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  return (
    <>
      <p className="hint">Use the arrows to move each step up or down.</p>
      <ol className="order">
        {list.map((item, i) => {
          const ok = item === q.items[i];
          return (
            <li key={item} className={`order-row ${checked ? (ok ? 'is-right' : 'is-wrong') : ''}`}>
              <span className="order-n">{i + 1}</span>
              <span className="order-text">
                {item}
                {checked && !ok && <small className="fix"> Should be: {q.items[i]}</small>}
              </span>
              <span className="order-btns">
                <button disabled={checked || i === 0} onClick={() => move(i, -1)} aria-label={`Move ${item} up`}>
                  ↑
                </button>
                <button disabled={checked || i === list.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${item} down`}>
                  ↓
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function NumberAnswer({ q, value, checked, onChange }) {
  return (
    <div className="number">
      {q.hint && <p className="hint">{q.hint}</p>}
      <label htmlFor={`${q.id}-num`}>Your answer</label>
      <input
        id={`${q.id}-num`}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value ?? ''}
        disabled={checked}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
