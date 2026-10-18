import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TERMS } from '../src/terms.js';
import { pointsFor, scoreAnswer, susScore } from '../src/score.js';
import { QUESTIONS as laws } from '../src/modules/laws/questions.js';
import { QUESTIONS as heuristics } from '../src/modules/heuristics/questions.js';
import { QUESTIONS as design } from '../src/modules/design/questions.js';
import { QUESTIONS as sus } from '../src/modules/sus/questions.js';
import { QUESTIONS as research } from '../src/modules/research/questions.js';

const MODULES = { laws, heuristics, design, sus, research };
const figureSrc = readFileSync(new URL('../src/figures.jsx', import.meta.url), 'utf8');
const hasFigure = (name) => new RegExp(`\\b${name}: \\w+,`).test(figureSrc);

function perfect(q) {
  switch (q.type) {
    case 'choice':
    case 'ab':
      return q.answer;
    case 'match':
      return Object.fromEntries(q.rows.map((r, i) => [i, r.answer]));
    case 'case':
      return Object.fromEntries(q.rows.map((r, i) => [i, { term: r.answer, reason: r.reason }]));
    case 'tap':
      return q.mode === 'any' ? [q.answer[0]] : q.answer;
    case 'order':
      return q.items;
    case 'number':
      return String(q.answer);
  }
}

test('ids are unique across modules', () => {
  const ids = Object.values(MODULES).flat().map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

for (const [name, qs] of Object.entries(MODULES)) {
  test(`${name}: every question is well formed and its key scores full marks`, () => {
    for (const q of qs) {
      assert.ok(q.prompt && q.explain, q.id);
      for (const l of q.laws) assert.ok(TERMS[l], `${q.id}: unknown link ${l}`);
      for (const f of [q.figure, ...(q.figures || []), ...(q.rows || []).map((r) => r.figure)].filter(Boolean))
        assert.ok(hasFigure(f), `${q.id}: missing figure ${f}`);
      assert.equal(scoreAnswer(q, perfect(q)), pointsFor(q), q.id);

      if (q.type === 'choice') {
        assert.equal(q.options.length, 4, q.id);
        q.options.forEach((o, i) => {
          if (i !== q.answer) assert.ok(o.why, `${q.id}: option ${i} has no reason`);
        });
      }
      if (q.type === 'ab') assert.ok(q.why[1 - q.answer], `${q.id}: no reason for the wrong design`);
      if (q.type === 'match' || q.type === 'case') {
        for (const r of q.rows) assert.ok(q.choices.includes(r.answer), `${q.id}: ${r.answer} not a choice`);
        for (const c of q.choices) assert.ok(q.labels?.[c] || TERMS[c], `${q.id}: ${c}`);
        assert.equal(new Set(q.rows.map((r) => r.answer)).size, q.rows.length, `${q.id}: duplicate answers`);
      }
      if (q.type === 'match') for (const r of q.rows) assert.ok(r.why, `${q.id}: row without reason`);
      if (q.type === 'case') {
        for (const r of q.rows) assert.ok(q.reasons[r.reason], `${q.id}: reason ${r.reason}`);
        assert.ok(Object.keys(q.reasons).length > q.rows.length, `${q.id}: needs decoy reasons`);
      }
      if (q.type === 'tap') {
        for (const a of q.answer) assert.ok(figureSrc.includes(`'${a}'`), `${q.id}: spot ${a}`);
        assert.equal(scoreAnswer(q, [...perfect(q), 'nope']), 0, q.id);
      }
      if (q.type === 'order') {
        assert.deepEqual([...q.start].sort(), [...q.items].sort(), q.id);
        assert.equal(scoreAnswer(q, q.start), 0, `${q.id}: starts solved`);
      }
    }
  });

  test(`${name}: correct letters are spread across a-d`, () => {
    const counts = [0, 0, 0, 0];
    for (const q of qs) if (q.type === 'choice') counts[q.answer]++;
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 2, counts.join(','));
  });
}

test('SUS number questions match the scoring formula', () => {
  assert.equal(susScore([4, 2, 5, 1, 4, 2, 5, 1, 4, 2]).score, 85);
  assert.equal(susScore(Array(10).fill(3)).score, 50);
  assert.equal(susScore([3, 4, 2, 3, 4, 2, 3, 3, 4, 2]).score, 55);
  assert.equal(scoreAnswer(sus.find((q) => q.id === 's01'), ' 85 '), 1);
});
