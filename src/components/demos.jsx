import { useEffect, useRef, useState } from 'react';
import { susGrade, susScore } from '../score.js';

// ---------- Gestalt: the same 8 dots, grouped by a different cue each time ----------
const CUES = [
  { id: 'none', label: 'No cue', note: 'Eight evenly spaced dots. No groups yet.' },
  { id: 'proximity', label: 'Proximity', note: 'Only the spacing changed, and you see pairs.' },
  { id: 'similarity', label: 'Similarity', note: 'Same spacing, but color makes pairs.' },
  { id: 'region', label: 'Common region', note: 'Same spacing, but boxes make pairs.' },
  { id: 'connected', label: 'Connectedness', note: 'Same spacing, but lines make pairs.' },
];

export function GestaltDemo() {
  const [cue, setCue] = useState('none');
  const xs = Array.from({ length: 8 }, (_, i) => (cue === 'proximity' ? 22 + Math.floor(i / 2) * 44 + (i % 2) * 16 : 20 + i * 21));
  const note = CUES.find((c) => c.id === cue).note;
  return (
    <div className="demo">
      <p className="demo-title">Try it: switch the grouping cue</p>
      <div className="seg" role="group" aria-label="Grouping cue">
        {CUES.map((c) => (
          <button key={c.id} aria-pressed={cue === c.id} onClick={() => setCue(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <svg className="demo-svg" viewBox="0 0 190 60" role="img" aria-label={note}>
        {cue === 'region' &&
          [0, 2, 4, 6].map((i) => <rect key={i} x={xs[i] - 9} y="18" width="39" height="24" rx="7" className="g-box" />)}
        {cue === 'connected' &&
          [0, 2, 4, 6].map((i) => <line key={i} x1={xs[i]} y1="30" x2={xs[i + 1]} y2="30" className="g-link" />)}
        {xs.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy="30"
            r="6"
            className={cue === 'similarity' && Math.floor(i / 2) % 2 ? 'g-alt' : 'g-dot'}
            style={{ transition: 'cx .35s ease' }}
          />
        ))}
      </svg>
      <p className="demo-note">{note}</p>
    </div>
  );
}

// ---------- Fitts: click big near targets and small far ones, compare times ----------
const FITTS_ROUNDS = 8;

export function FittsDemo() {
  const [round, setRound] = useState(-1); // -1 = not started
  const [times, setTimes] = useState([]);
  const [target, setTarget] = useState(null);
  const shownAt = useRef(0);

  function place(r) {
    const big = r % 2 === 0;
    const size = big ? 64 : 18;
    // Big targets near the middle, small ones near a corner.
    const x = big ? 40 + Math.random() * 20 : Math.random() < 0.5 ? 3 + Math.random() * 6 : 91 + Math.random() * 6;
    const y = big ? 35 + Math.random() * 30 : Math.random() < 0.5 ? 8 + Math.random() * 8 : 84 + Math.random() * 8;
    setTarget({ big, size, x, y });
    shownAt.current = performance.now();
  }

  function start() {
    setTimes([]);
    setRound(0);
    place(0);
  }

  function hit() {
    const ms = performance.now() - shownAt.current;
    const next = [...times, { big: target.big, ms }];
    setTimes(next);
    if (round + 1 >= FITTS_ROUNDS) {
      setRound(FITTS_ROUNDS);
      setTarget(null);
    } else {
      setRound(round + 1);
      place(round + 1);
    }
  }

  const avg = (big) => {
    const t = times.filter((x) => x.big === big);
    return t.length ? Math.round(t.reduce((a, b) => a + b.ms, 0) / t.length) : null;
  };
  const finished = round >= FITTS_ROUNDS;

  return (
    <div className="demo">
      <p className="demo-title">Try it: hit the targets as fast as you can</p>
      <div className="fitts-area">
        {round === -1 && (
          <button className="secondary" onClick={start}>
            Start ({FITTS_ROUNDS} targets)
          </button>
        )}
        {target && (
          <button
            className={`fitts-target ${target.big ? 'is-big' : ''}`}
            style={{ width: target.size, height: target.size, left: `${target.x}%`, top: `${target.y}%` }}
            onClick={hit}
            aria-label={target.big ? 'Big target' : 'Small target'}
          />
        )}
        {finished && (
          <div className="fitts-result">
            <p>
              Big, close targets: <b>{avg(true)} ms</b>
              <br />
              Small, far targets: <b>{avg(false)} ms</b>
            </p>
            <button className="secondary" onClick={start}>
              Try again
            </button>
          </div>
        )}
      </div>
      <p className="demo-note">
        {round >= 0 && !finished ? `Target ${round + 1} of ${FITTS_ROUNDS}` : 'Small targets far away usually take longer and cause more misses.'}
      </p>
    </div>
  );
}

// ---------- Hick: find one word among 4, then among 16 ----------
const WORDS = [
  'Settings', 'Profile', 'Inbox', 'Wallet', 'Games', 'Rewards', 'Help', 'Orders',
  'Friends', 'Photos', 'Music', 'Maps', 'Notes', 'Files', 'Calendar', 'Weather',
];

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export function HickDemo() {
  const [stage, setStage] = useState(0); // 0 idle, 1 four, 2 sixteen, 3 done
  const [opts, setOpts] = useState([]);
  const [goal, setGoal] = useState('');
  const [times, setTimes] = useState([]);
  const [miss, setMiss] = useState(false);
  const t0 = useRef(0);

  function go(s, prev = []) {
    const n = s === 1 ? 4 : 16;
    const list = shuffle(WORDS).slice(0, n);
    setOpts(list);
    setGoal(list[Math.floor(Math.random() * n)]);
    setStage(s);
    setTimes(prev);
    setMiss(false);
    t0.current = performance.now();
  }

  function pick(w) {
    if (w !== goal) {
      setMiss(true);
      return;
    }
    const next = [...times, Math.round(performance.now() - t0.current)];
    if (stage === 1) go(2, next);
    else {
      setTimes(next);
      setStage(3);
    }
  }

  return (
    <div className="demo">
      <p className="demo-title">Try it: find the word, first among 4, then among 16</p>
      {stage === 0 && (
        <button className="secondary" onClick={() => go(1)}>
          Start
        </button>
      )}
      {(stage === 1 || stage === 2) && (
        <>
          <p className="hick-goal">
            Tap <b>{goal}</b>
            {miss && <span className="hick-miss"> Not that one.</span>}
          </p>
          <div className={`hick-grid n${opts.length}`}>
            {opts.map((w) => (
              <button key={w} onClick={() => pick(w)}>
                {w}
              </button>
            ))}
          </div>
        </>
      )}
      {stage === 3 && (
        <div className="fitts-result">
          <p>
            4 choices: <b>{times[0]} ms</b>
            <br />
            16 choices: <b>{times[1]} ms</b>
          </p>
          <button className="secondary" onClick={() => go(1)}>
            Try again
          </button>
        </div>
      )}
      <p className="demo-note">More choices usually means a slower decision.</p>
    </div>
  );
}

// ---------- Doherty: the same button at three response times ----------
const DELAYS = [100, 400, 1500];

function LikeButton({ delay }) {
  const [state, setState] = useState('idle');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function tap() {
    if (state === 'wait') return;
    setState('wait');
    timer.current = setTimeout(() => setState((s) => (s === 'wait' ? 'liked' : s)), delay);
  }
  return (
    <div className="like">
      <button className={`like-btn is-${state}`} onClick={state === 'liked' ? () => setState('idle') : tap} aria-pressed={state === 'liked'}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
        {state === 'liked' ? 'Liked' : 'Like'}
      </button>
      <span className="like-ms">{delay} ms</span>
    </div>
  );
}

export function DohertyDemo() {
  return (
    <div className="demo">
      <p className="demo-title">Try it: tap each Like button and feel the delay</p>
      <div className="likes">
        {DELAYS.map((d) => (
          <LikeButton key={d} delay={d} />
        ))}
      </div>
      <p className="demo-note">Under 400 ms feels responsive. At 1.5 s people wonder if the tap worked and tap again.</p>
    </div>
  );
}

// ---------- SUS calculator ----------
export const SUS_ITEMS = [
  'I think that I would like to use this system frequently.',
  'I found the system unnecessarily complex.',
  'I thought the system was easy to use.',
  'I think that I would need the support of a technical person to be able to use this system.',
  'I found the various functions in this system were well integrated.',
  'I thought there was too much inconsistency in this system.',
  'I would imagine that most people would learn to use this system very quickly.',
  'I found the system very cumbersome to use.',
  'I felt very confident using the system.',
  'I needed to learn a lot of things before I could get going with this system.',
];

const SAMPLE = [4, 2, 4, 1, 4, 2, 5, 2, 4, 2];

export function SusCalculator() {
  const [r, setR] = useState(SAMPLE);
  const { parts, raw, score } = susScore(r);
  const { grade, note } = susGrade(score);
  return (
    <div className="demo sus-calc">
      <p className="demo-title">Try it: SUS calculator (filled with a sample answer sheet)</p>
      <ol className="sus-items">
        {SUS_ITEMS.map((text, i) => (
          <li key={i}>
            <p className="sus-q">
              <span className="sus-num">{i + 1}</span>
              {text}
              <span className={`sus-tag ${i % 2 ? 'neg' : 'pos'}`}>{i % 2 ? 'negative' : 'positive'}</span>
            </p>
            <div className="sus-row">
              <div className="likert" role="radiogroup" aria-label={`Item ${i + 1} response`}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    role="radio"
                    aria-checked={r[i] === v}
                    className={r[i] === v ? 'is-on' : ''}
                    onClick={() => setR(r.map((x, j) => (j === i ? v : x)))}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <span className="sus-part">
                {i % 2 ? `5 − ${r[i]}` : `${r[i]} − 1`} = <b>{parts[i]}</b>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="likert-key">1 = strongly disagree · 5 = strongly agree</p>
      <div className="sus-total">
        <div>
          <span className="sus-label">Sum</span>
          <b>{raw}</b>
        </div>
        <div>
          <span className="sus-label">× 2.5</span>
          <b className="sus-score">{score}</b>
        </div>
        <div>
          <span className="sus-label">Meaning</span>
          <b>{grade}</b>
          <small>{note}</small>
        </div>
      </div>
      <SusScale score={score} />
      <button className="ghost" onClick={() => setR(SAMPLE)}>
        Reset sample
      </button>
    </div>
  );
}

export function SusScale({ score }) {
  return (
    <div className="sus-scale" aria-hidden="true">
      <div className="sus-band f" style={{ width: '51%' }} />
      <div className="sus-band d" style={{ width: '17%' }} />
      <div className="sus-band b" style={{ width: '12.3%' }} />
      <div className="sus-band a" style={{ width: '19.7%' }} />
      {score != null && <i className="sus-marker" style={{ left: `${score}%` }} />}
      <span style={{ left: '0%' }}>0</span>
      <span style={{ left: '51%' }}>51</span>
      <span style={{ left: '68%' }}>68</span>
      <span style={{ left: '80.3%' }}>80.3</span>
      <span style={{ left: '100%' }}>100</span>
    </div>
  );
}
