import { useState } from 'react';

// The five modes from Stanford d.school. Running example: an enrollment app for working students.
const STAGES = [
  {
    id: 'empathize',
    name: 'Empathize',
    goal: 'Understand the people you are designing for: what they do, say, think and feel.',
    methods: 'Interviews, observation, shadowing, immersing yourself in their experience, empathy maps.',
    output: 'Notes, quotes, photos, an empathy map.',
    eg: 'Interview five working students about how they enroll and watch one try it at lunch break.',
  },
  {
    id: 'define',
    name: 'Define',
    goal: 'Make sense of the research and frame the right problem to solve.',
    methods: 'Clustering findings, personas, point-of-view (POV) statements, "How might we" questions.',
    output: 'A POV statement and a few "How might we" questions.',
    eg: 'POV: "Working students need to enroll by phone because they are at work when slots open."',
  },
  {
    id: 'ideate',
    name: 'Ideate',
    goal: 'Generate as many ideas as possible, then pick a few to try.',
    methods: 'Brainstorming, Crazy 8s, mind maps, sketching, dot voting.',
    output: 'Lots of ideas and a short list to prototype.',
    eg: '"HMW help working students grab a slot before classes fill?" → slot alerts, queue numbers, saved schedules…',
  },
  {
    id: 'prototype',
    name: 'Prototype',
    goal: 'Build quick, cheap versions of ideas that people can react to.',
    methods: 'Paper sketches, storyboards, role-play, clickable mockups (Figma).',
    output: 'Something users can see, hold or click.',
    eg: 'A paper version of a "Slot alert" screen, made in 20 minutes.',
  },
  {
    id: 'test',
    name: 'Test',
    goal: 'Put the prototype in front of real users and learn what works and what does not.',
    methods: 'Usability tests, think-aloud, "I like, I wish, what if" feedback, SUS questionnaires.',
    output: 'Findings that send you forward, or back to an earlier stage.',
    eg: 'Three students try the alert screen; two miss the "Enroll now" button.',
  },
];

export default function DesignLessons() {
  const [stage, setStage] = useState('empathize');
  const s = STAGES.find((x) => x.id === stage);
  return (
    <div className="lessons">
      <p className="lede">
        Design thinking is a human-centered way to solve problems: start from people's real needs, try ideas quickly, and learn from
        them. The five-stage model comes from the Stanford d.school (Hasso Plattner Institute of Design).
      </p>

      <section className="lesson">
        <h2>The five stages</h2>
        <p className="hint">Tap a stage to see what happens in it.</p>
        <StageMap active={stage} onPick={setStage} />
        <div className="stage-card" aria-live="polite">
          <h3>{s.name}</h3>
          <dl>
            <div>
              <dt>Goal</dt>
              <dd>{s.goal}</dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>{s.methods}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{s.output}</dd>
            </div>
            <div>
              <dt>Example</dt>
              <dd>{s.eg}</dd>
            </div>
          </dl>
        </div>
        <p>
          <b>It is not a straight line.</b> The stages often overlap and repeat. A failed test can send you back to Ideate, or even to
          Empathize when you realize you misunderstood the user.
        </p>
      </section>

      <section className="lesson">
        <h2>Tools you should know</h2>
        <div className="tools">
          <div className="tool">
            <h3>Empathy map</h3>
            <p>Four quadrants about one user:</p>
            <div className="emap">
              <span>
                <b>Says</b> quotes
              </span>
              <span>
                <b>Thinks</b> beliefs, worries
              </span>
              <span>
                <b>Does</b> actions you can see
              </span>
              <span>
                <b>Feels</b> emotions
              </span>
            </div>
          </div>
          <div className="tool">
            <h3>Point-of-view statement</h3>
            <p className="formula">[User] needs [need] because [insight].</p>
            <p>It names a real person, a need (a verb, not a feature), and a surprising insight from research.</p>
          </div>
          <div className="tool">
            <h3>"How might we…?"</h3>
            <p>Turns the POV into a question that invites many answers.</p>
            <p className="formula">How might we help working students grab a slot before classes fill up?</p>
            <p>Too narrow: "HMW add a chatbot?" Too broad: "HMW fix enrollment?"</p>
          </div>
          <div className="tool">
            <h3>Brainstorming rules</h3>
            <ul>
              <li>Defer judgment</li>
              <li>Go for quantity</li>
              <li>Encourage wild ideas</li>
              <li>Build on the ideas of others</li>
              <li>Stay focused on the topic</li>
              <li>One conversation at a time; be visual</li>
            </ul>
          </div>
          <div className="tool">
            <h3>Low vs high fidelity</h3>
            <p>
              <b>Low:</b> paper, sketches, quick and cheap. Best early, to test ideas.
              <br />
              <b>High:</b> polished, clickable, close to the real thing. Best later, to test details.
            </p>
          </div>
          <div className="tool">
            <h3>Three lenses (IDEO)</h3>
            <Lenses />
            <p>The best ideas are desirable (people want it), feasible (it can be built) and viable (it can last as a business).</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StageMap({ active, onPick }) {
  return (
    <div className="stagemap">
      <ol>
        {STAGES.map((s, i) => (
          <li key={s.id}>
            <button className={`stage-btn st-${s.id}`} aria-pressed={active === s.id} onClick={() => onPick(s.id)}>
              <span className="stage-n">{i + 1}</span>
              {s.name}
            </button>
          </li>
        ))}
      </ol>
      <p className="loop" aria-hidden="true">
        ↺ Test results loop back to any earlier stage
      </p>
    </div>
  );
}

function Lenses() {
  return (
    <svg className="lenses" viewBox="0 0 200 150" role="img" aria-label="Three overlapping circles: desirability, feasibility, viability">
      <circle cx="75" cy="58" r="44" className="lens l1" />
      <circle cx="125" cy="58" r="44" className="lens l2" />
      <circle cx="100" cy="100" r="44" className="lens l3" />
      <text x="58" y="44" className="lens-t" textAnchor="middle">
        Desirable
      </text>
      <text x="144" y="44" className="lens-t" textAnchor="middle">
        Feasible
      </text>
      <text x="100" y="132" className="lens-t" textAnchor="middle">
        Viable
      </text>
      <text x="100" y="76" className="lens-t lens-c" textAnchor="middle">
        ★
      </text>
    </svg>
  );
}
