import { useEffect, useState } from 'react';
import { MODULES } from './modules/index.js';
import Practice from './components/Practice.jsx';

function parseHash() {
  const [, id = '', view = ''] = (window.location.hash || '#/').split('/');
  const mod = MODULES.find((m) => m.id === id);
  if (!mod) return { mod: null };
  return { mod, view: view === 'practice' ? 'practice' : 'lessons' };
}

export default function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = route.mod ? `${route.mod.title} · Laws of UX Reviewer` : 'Laws of UX Reviewer';
  }, [route]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href="#/">
            Laws of UX Reviewer
          </a>
          {route.mod && (
            <nav className="modnav" aria-label="Modules">
              {MODULES.map((m) => (
                <a
                  key={m.id}
                  href={`#/${m.id}`}
                  aria-current={m.id === route.mod.id ? 'page' : undefined}
                  title={m.title}
                >
                  <span className="modnav-n">{m.n}</span>
                  <span className="modnav-t">{m.title}</span>
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="wrap">{route.mod ? <ModulePage mod={route.mod} view={route.view} /> : <Home />}</main>
    </>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <p className="eyebrow">ITE reviewer · prepared by R. Domantay</p>
        <h1>Laws of UX Reviewer</h1>
        <p className="lede">
          Four modules on designing for people. Read the lessons, try the demos, then practice with screenshots, app case studies and
          matching. Every wrong answer tells you why.
        </p>
      </div>
      <ol className="modules">
        {MODULES.map((m) => (
          <li key={m.id}>
            <a className={`mod-card mc-${m.id}`} href={`#/${m.id}`}>
              <span className="mod-n">Module {m.n}</span>
              <span className="mod-t">{m.title}</span>
              <span className="mod-b">{m.blurb}</span>
              <span className="mod-meta">{m.questions.length} practice questions</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ModulePage({ mod, view }) {
  const { Lessons } = mod;
  const next = MODULES[MODULES.indexOf(mod) + 1];
  return (
    <div className="module">
      <div className="mod-head">
        <p className="eyebrow">Module {mod.n}</p>
        <h1 className="mod-title">{mod.title}</h1>
        <nav className="tabs" aria-label={`${mod.title} sections`}>
          <a aria-current={view === 'lessons' ? 'page' : undefined} href={`#/${mod.id}`}>
            Lessons
          </a>
          <a aria-current={view === 'practice' ? 'page' : undefined} href={`#/${mod.id}/practice`}>
            Practice <span className="tab-count">{mod.questions.length}</span>
          </a>
        </nav>
      </div>
      {view === 'lessons' ? (
        <>
          <Lessons />
          <div className="mod-foot">
            <a className="primary" href={`#/${mod.id}/practice`}>
              Practice this module
            </a>
            {next && (
              <a className="secondary" href={`#/${next.id}`}>
                Next: {next.title}
              </a>
            )}
          </div>
        </>
      ) : (
        <Practice key={mod.id} mod={mod} />
      )}
    </div>
  );
}
