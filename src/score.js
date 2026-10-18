// Scoring shared by the practice page and the tests.
// Question types:
//   choice — pick one; options are { text, why } (why = why it's wrong)
//   ab     — pick design A or B; `why` = [why A is wrong, why B is wrong]
//   tap    — tap spots on a screenshot; mode 'any' (one right spot) or 'all' (every listed spot);
//            `why` = { spotId: why tapping it is wrong }
//   match  — one dropdown per row, 1 point each; row.why = why the right answer fits
//   case   — numbered callouts on an app screen; each row has a law dropdown and a "because" dropdown,
//            1 point each
//   order  — put `items` in order (given in the right order; `start` is the shuffled starting order)
//   number — type a number; `answer`, optional `tolerance`

export function pointsFor(q) {
  if (q.type === 'match') return q.rows.length;
  if (q.type === 'case') return q.rows.length * 2;
  return 1;
}

export function scoreAnswer(q, r) {
  if (r == null) return 0;
  switch (q.type) {
    case 'choice':
    case 'ab':
      return r === q.answer ? 1 : 0;
    case 'match':
      return q.rows.filter((row, i) => r[i] === row.answer).length;
    case 'case':
      return q.rows.reduce((n, row, i) => n + (r[i]?.term === row.answer) + (r[i]?.reason === row.reason), 0);
    case 'tap': {
      const picked = new Set(r);
      if (q.mode === 'any') return picked.size === 1 && q.answer.includes([...picked][0]) ? 1 : 0;
      return picked.size === q.answer.length && q.answer.every((a) => picked.has(a)) ? 1 : 0;
    }
    case 'order':
      return r.length === q.items.length && r.every((item, i) => item === q.items[i]) ? 1 : 0;
    case 'number': {
      const n = Number(String(r).replace(/,/g, ''));
      return Number.isFinite(n) && Math.abs(n - q.answer) <= (q.tolerance ?? 0) ? 1 : 0;
    }
    default:
      return 0;
  }
}

export function isReady(q, r) {
  if (r == null) return false;
  if (q.type === 'match') return q.rows.every((_, i) => r[i]);
  if (q.type === 'case') return q.rows.every((_, i) => r[i]?.term && r[i]?.reason);
  if (q.type === 'tap') return r.length > 0;
  if (q.type === 'number') return String(r).trim() !== '' && Number.isFinite(Number(String(r).replace(/,/g, '')));
  return true;
}

// SUS: odd items score (response - 1), even items (5 - response); sum x 2.5.
export function susScore(responses) {
  const parts = responses.map((v, i) => (i % 2 === 0 ? v - 1 : 5 - v));
  return { parts, raw: parts.reduce((a, b) => a + b, 0), score: parts.reduce((a, b) => a + b, 0) * 2.5 };
}

// measuringu.com/sus: 68 is the average; above 80.3 is an A (top 10%); below 51 is an F (bottom 15%).
export function susGrade(score) {
  if (score > 80.3) return { grade: 'A', note: 'Top 10%' };
  if (score > 68) return { grade: 'Above average', note: 'Between 68 and 80.3' };
  if (score === 68) return { grade: 'Average', note: 'The 50th percentile' };
  if (score >= 51) return { grade: 'Below average', note: 'Between 51 and 68' };
  return { grade: 'F', note: 'Bottom 15%' };
}
