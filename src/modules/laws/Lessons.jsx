import { GROUPS } from './lessons.js';
import { TERMS } from '../../terms.js';
import { DohertyDemo, FittsDemo, GestaltDemo, HickDemo } from '../../components/demos.jsx';

const DEMOS = { gestalt: GestaltDemo, fitts: FittsDemo, hick: HickDemo, doherty: DohertyDemo };

export default function LawsLessons() {
  return (
    <div className="lessons">
      <p className="lede">
        Thirty laws from <a href="https://lawsofux.com/" target="_blank" rel="noreferrer">lawsofux.com</a>, in four groups. Each one has
        the law, what to do with it, and an example.
      </p>
      <nav className="toc" aria-label="Groups">
        {GROUPS.map((g) => (
          <a key={g.id} href={`#laws-${g.id}`} onClick={(e) => jump(e, `laws-${g.id}`)}>
            {g.title} <span>{g.laws.length}</span>
          </a>
        ))}
      </nav>
      {GROUPS.map((g) => {
        const GroupDemo = g.demo && DEMOS[g.demo];
        return (
          <section key={g.id} id={`laws-${g.id}`} className="lesson">
            <h2>{g.title}</h2>
            <p>{g.intro}</p>
            {GroupDemo && <GroupDemo />}
            <dl className="lawlist">
              {g.laws.map((l) => {
                const Demo = l.demo && DEMOS[l.demo];
                return (
                  <div key={l.slug} className="law">
                    <dt>
                      <a href={TERMS[l.slug].url} target="_blank" rel="noreferrer">
                        {TERMS[l.slug].name}
                      </a>
                    </dt>
                    <dd>
                      <p className="law-def">{l.def}</p>
                      <p>
                        <b>Do:</b> {l.do}
                      </p>
                      <p className="law-eg">
                        <b>Example:</b> {l.eg}
                      </p>
                      {Demo && <Demo />}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        );
      })}
    </div>
  );
}

// In-page jumps without touching the hash router.
export function jump(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
