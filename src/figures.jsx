// "Screenshots" drawn in HTML/CSS. Each figure takes `spot(id, className)`, which returns the
// props for a tappable region on tap questions and just the className everywhere else.

const plain = (id, className) => ({ className });

function Phone({ children, label, role = 'img' }) {
  return (
    <div className="m-phone" role={role} aria-label={label}>
      <div className="m-notch" />
      <div className="m-screen">{children}</div>
    </div>
  );
}

function Browser({ url, children, label, role = 'img' }) {
  return (
    <div className="m-browser" role={role} aria-label={label}>
      <div className="m-chrome">
        <span className="m-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="m-url">{url}</span>
      </div>
      <div className="m-page">{children}</div>
    </div>
  );
}

function Caption({ children }) {
  return <p className="m-caption">{children}</p>;
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9.5" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TinyPay() {
  return (
    <Phone label="Phone checkout screen with a tiny Pay button in the top-left corner and a large Continue shopping button at the bottom">
      <div className="m-topbar">
        <span className="m-tinybtn">Pay</span>
        <b>Checkout</b>
        <span />
      </div>
      <div className="m-pad m-stack">
        <div className="m-line"><span>Ube halaya jar</span><span>₱180</span></div>
        <div className="m-line"><span>Strawberry jam</span><span>₱220</span></div>
        <div className="m-line"><span>Peanut brittle ×2</span><span>₱150</span></div>
        <div className="m-line m-total"><span>Total</span><span>₱550</span></div>
      </div>
      <div className="m-grow" />
      <div className="m-thumb" aria-hidden="true">thumb zone</div>
      <div className="m-pad">
        <div className="m-bigbtn m-ghost">Continue shopping</div>
      </div>
    </Phone>
  );
}

function AdBanner() {
  return (
    <Browser url="mybank.ph/home" label="Bank home page; the account warning is a flashy yellow box in the sidebar ad slot, next to a real ad">
      <div className="m-bank">
        <div className="m-bankhead"><b>MyBank</b><span>Accounts · Transfers · Cards</span></div>
        <div className="m-bankbody">
          <div className="m-stack">
            <div className="m-muted">Savings ·· 4821</div>
            <div className="m-balance">₱24,310.55</div>
            <div className="m-line"><span>Oct 16 · Meralco</span><span>−₱2,140</span></div>
            <div className="m-line"><span>Oct 15 · Salary</span><span>+₱18,000</span></div>
            <div className="m-line"><span>Oct 13 · GCash in</span><span>+₱500</span></div>
          </div>
          <div className="m-side">
            <div className="m-ad m-ad-warn">
              <b>!! ACT NOW !!</b>
              <span>Your account closes Oct 31 unless you verify your ID</span>
              <em>Click here</em>
            </div>
            <div className="m-ad">
              <small>Ad</small>
              <b>50% OFF</b>
              <span>Summer sale at ShopMart</span>
              <em>Shop now</em>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function SearchShell({ children }) {
  return (
    <div className="m-pad m-stack">
      <div className="m-search"><span>mouse</span><b>Go</b></div>
      {children}
    </div>
  );
}

function SearchBlank() {
  return (
    <div className="m-fig">
      <Phone label="Search screen that stays empty while results load">
        <SearchShell>
          <div className="m-empty" />
        </SearchShell>
      </Phone>
      <Caption>0 to 2.5 s: nothing changes</Caption>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="m-fig">
      <Phone label="Search screen that shows grey placeholder rows right away while results load">
        <SearchShell>
          {[0, 1, 2, 3].map((i) => (
            <div className="m-skel" key={i}>
              <i />
              <span><b /><b /></span>
            </div>
          ))}
        </SearchShell>
      </Phone>
      <Caption>0.1 s: placeholders. 2.5 s: results</Caption>
    </div>
  );
}

function PostelForm({ spot = plain }) {
  return (
    <Phone role="group" label="Sign-up form with name, email, phone and birthday fields; the phone field shows a strict format error">
      <div className="m-topbar"><span /><b>Create account</b><span /></div>
      <div className="m-pad m-stack m-form">
        <div {...spot('name', 'm-field')}>
          <label>Full name</label>
          <div className="m-input">Maria Dela Cruz</div>
        </div>
        <div {...spot('email', 'm-field')}>
          <label>Email</label>
          <div className="m-input">maria@slu.edu.ph</div>
        </div>
        <div {...spot('phone', 'm-field')}>
          <label>Mobile number</label>
          <div className="m-input m-bad">0917 123 4567</div>
          <small className="m-err">Invalid. Use 09171234567 only. No spaces or dashes.</small>
        </div>
        <div {...spot('birthday', 'm-field')}>
          <label>Birthday</label>
          <div className="m-input">Aug 31, 2004</div>
        </div>
        <div className="m-bigbtn">Sign up</div>
      </div>
    </Phone>
  );
}

function ProximityForm() {
  return (
    <Browser url="enroll.slu.edu.ph" label="Form where each label sits exactly halfway between two text boxes">
      <div className="m-prox">
        <b className="m-h">Student details</b>
        <span>First name</span>
        <div className="m-input" />
        <span>Last name</span>
        <div className="m-input" />
        <span>Middle name</span>
        <div className="m-input" />
      </div>
    </Browser>
  );
}

function PricingFew() {
  return (
    <div className="m-fig">
      <Browser url="cloudnote.app/pricing" label="Pricing page with three plans side by side, the middle one marked recommended">
        <div className="m-pricing m-pricing-3">
          <div className="m-plan"><b>Free</b><span>₱0</span><small>1 notebook</small></div>
          <div className="m-plan m-plan-hot"><em>Recommended</em><b>Plus</b><span>₱149</span><small>Unlimited</small></div>
          <div className="m-plan"><b>Team</b><span>₱499</span><small>5 people</small></div>
        </div>
      </Browser>
    </div>
  );
}

function PricingMany() {
  const plans = [
    ['Basic', '₱49'],
    ['Basic+', '₱79'],
    ['Starter', '₱99'],
    ['Starter Pro', '₱129'],
    ['Plus', '₱149'],
    ['Plus Max', '₱199'],
    ['Team', '₱499'],
    ['Team+', '₱599'],
  ];
  return (
    <div className="m-fig">
      <Browser url="cloudnote.app/pricing" label="Pricing page with eight similar plans and no recommendation">
        <div className="m-pricing m-pricing-8">
          {plans.map(([n, p]) => (
            <div className="m-plan" key={n}><b>{n}</b><span>{p}</span></div>
          ))}
        </div>
      </Browser>
    </div>
  );
}

function WeirdShop() {
  return (
    <Browser url="tindahan.ph" label="Online store with the logo on the right, search hidden behind a question-mark icon, and the cart floating at the bottom left">
      <div className="m-shop">
        <div className="m-shophead">
          <span className="m-round">?</span>
          <span className="m-muted">New · Sale · Gifts</span>
          <b className="m-logo">Tindahan</b>
        </div>
        <div className="m-grid">
          {['Rattan bag', 'Abaca slippers', 'Inabel throw', 'Coffee beans'].map((n) => (
            <div className="m-prod" key={n}><i /><span>{n}</span></div>
          ))}
        </div>
        <span className="m-floatcart"><CartIcon /></span>
      </div>
    </Browser>
  );
}

function TabBar({ spot = plain }) {
  return (
    <Phone role="group" label="Phone app with a bottom tab bar of five empty slots">
      <div className="m-topbar"><span /><b>Habit tracker</b><span /></div>
      <div className="m-pad m-stack">
        <div className="m-card-mini" />
        <div className="m-card-mini" />
        <div className="m-card-mini" />
      </div>
      <div className="m-grow" />
      <div className="m-tabs">
        {['t1', 't2', 't3', 't4', 't5'].map((t, i) => (
          <div {...spot(t, 'm-tab')} key={t} aria-label={`Tab slot ${i + 1}`}>
            <i />
            <span>{i + 1}</span>
          </div>
        ))}
      </div>
    </Phone>
  );
}

function Clutter() {
  return (
    <Phone label="Send money screen crowded with a flashing promo, a fake video, badges and mixed fonts around a small amount field">
      <div className="m-promo">WIN A TRIP TO BORACAY!!! ★ SPIN NOW ★</div>
      <div className="m-pad m-stack">
        <div className="m-video"><span>▶ Autoplay: Meet our new mascot</span></div>
        <div className="m-badges"><i>NEW</i><i>HOT</i><i>2x points</i><i>Level 7!</i></div>
        <b className="m-fancy">Send Money</b>
        <div className="m-field">
          <label>Amount</label>
          <div className="m-input">₱ 1,500</div>
        </div>
        <div className="m-bigbtn">Send</div>
        <div className="m-confetti" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
        </div>
      </div>
    </Phone>
  );
}

function LinkHeadings() {
  return (
    <Browser url="app.example.ph/settings" label="Settings page where headings are blue and underlined and the real links are plain black text">
      <div className="m-settings">
        <a className="m-fakelink">Notifications</a>
        <div className="m-line"><span>Email alerts: on</span><span className="m-plainlink">Change</span></div>
        <div className="m-line"><span>SMS alerts: off</span><span className="m-plainlink">Change</span></div>
        <a className="m-fakelink">Privacy</a>
        <div className="m-line"><span>Profile: public</span><span className="m-plainlink">Change</span></div>
        <div className="m-line"><span>Download my data</span><span className="m-plainlink">Request</span></div>
      </div>
    </Browser>
  );
}

function Dialog({ children }) {
  return (
    <div className="m-dialogwrap">
      <div className="m-dialog">
        <b>Save changes to report.docx?</b>
        <span>Unsaved changes will be lost.</span>
        {children}
      </div>
    </div>
  );
}

function ButtonsTight() {
  return (
    <div className="m-fig">
      <Dialog>
        <div className="m-tight"><span>Save</span><span>Delete</span></div>
      </Dialog>
    </div>
  );
}

function ButtonsSpaced() {
  return (
    <div className="m-fig">
      <Dialog>
        <div className="m-spaced"><span className="m-textbtn">Delete</span><span className="m-bigbtn">Save</span></div>
      </Dialog>
    </div>
  );
}

function PrettyDate() {
  return (
    <Phone label="Beautiful booking app with a date picker whose wheels are ordered day, year, month">
      <div className="m-hero">
        <small>Baguio · 2 guests</small>
        <b>Book your stay</b>
      </div>
      <div className="m-pad m-stack">
        <div className="m-muted">Check-in</div>
        <div className="m-wheels">
          <div><span>13</span><b>14</b><span>15</span></div>
          <div><span>2025</span><b>2026</b><span>2027</span></div>
          <div><span>Oct</span><b>Nov</b><span>Dec</span></div>
        </div>
        <div className="m-bigbtn m-glow">Reserve</div>
      </div>
    </Phone>
  );
}

function Boss({ spot = plain }) {
  return (
    <Browser url="myclass.ph/profile" role="group" label="Profile page with a logo, a search bar, an ad-style notice, a card with a tiny close button, a phone field with a strict format error, and a Save button">
      <div className="m-boss">
        <div className="m-bosshead">
          <b {...spot('logo', 'm-logo')}>MyClass</b>
          <div {...spot('search', 'm-search m-search-sm')}><span>Search courses</span></div>
        </div>
        <div {...spot('notice', 'm-ad m-ad-warn m-ad-wide')}>
          <b>!! LIMITED TIME !!</b>
          <span>Your password expires TODAY. Click to keep access.</span>
        </div>
        <div className="m-bosscard">
          <span {...spot('close', 'm-tinyx')} aria-label="Close">×</span>
          <b>Contact info</b>
          <div {...spot('phone', 'm-field')}>
            <label>Mobile number</label>
            <div className="m-input m-bad">+63 917 123 4567</div>
            <small className="m-err">Numbers only. 11 digits.</small>
          </div>
          <div {...spot('save', 'm-bigbtn')}>Save</div>
        </div>
      </div>
    </Browser>
  );
}

// Gestalt pictures for the matching question. Colors come from the page theme.
function Dots({ points, alt = [], children, label }) {
  return (
    <svg className="g-fig" viewBox="0 0 164 80" role="img" aria-label={label}>
      {children}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className={alt.includes(i) ? 'g-alt' : 'g-dot'} />
      ))}
    </svg>
  );
}

// Eight evenly spaced dots, so only the cue being tested makes the pairs.
const row = () => Array.from({ length: 8 }, (_, i) => [12 + i * 20, 40]);

function GProximity() {
  const pts = [];
  for (const cx of [28, 82, 136]) for (const [dx, dy] of [[-7, -7], [7, -7], [-7, 7], [7, 7]]) pts.push([cx + dx, 40 + dy]);
  return <Dots points={pts} label="Twelve dots in three tight clusters of four" />;
}

function GSimilarity() {
  const pts = [];
  const alt = [];
  for (let c = 0; c < 6; c++)
    for (let r = 0; r < 3; r++) {
      if (c % 2) alt.push(pts.length);
      pts.push([22 + c * 24, 18 + r * 22]);
    }
  return <Dots points={pts} alt={alt} label="Evenly spaced grid of dots; every other column is a different color" />;
}

function GRegion() {
  const pts = row();
  return (
    <Dots points={pts} label="Eight evenly spaced dots; boxes enclose them in pairs">
      {[0, 2, 4, 6].map((i) => (
        <rect key={i} x={pts[i][0] - 8} y="28" width="36" height="24" rx="7" className="g-box" />
      ))}
    </Dots>
  );
}

function GConnected() {
  const pts = row();
  return (
    <Dots points={pts} label="Eight evenly spaced dots; lines join them in pairs">
      {[0, 2, 4, 6].map((i) => (
        <line key={i} x1={pts[i][0]} y1="40" x2={pts[i + 1][0]} y2="40" className="g-link" />
      ))}
    </Dots>
  );
}

// Numbered callout for case-study screens.
function Mark({ n, at = 'tl' }) {
  return <span className={`m-mark m-mark-${at}`}>{n}</span>;
}

function WalletApp() {
  const services = ['Send', 'Cash In', 'Load', 'Bills', 'Bank', 'Save', 'Invest', 'More'];
  return (
    <Phone label="E-wallet home screen. 1: eight service icons inside one white card. 2: a large round Pay QR button in the middle of the bottom bar. 3: a green banner saying the money was sent, with a streak message. 4: a bottom tab bar with Home, Inbox, Pay, History and Profile.">
      <div className="w-head">
        <div className="m-rel w-toast">
          <Mark n={3} at="tr" />
          <b>✓ Sent ₱500 to Ana B.</b>
          <span>Nice! 5-day streak</span>
        </div>
        <small>Available balance</small>
        <b className="w-bal">₱ 2,450.00</b>
      </div>
      <div className="m-pad">
        <div className="m-rel w-card">
          <Mark n={1} at="tr" />
          {services.map((x, i) => (
            <span key={x} className="w-svc">
              <i className={`w-ic c${i % 4}`} />
              {x}
            </span>
          ))}
        </div>
        <div className="w-promo">Pay bills before the 25th, no fees</div>
      </div>
      <div className="m-grow" />
      <div className="m-rel w-tabs">
        <Mark n={4} at="in" />
        <span>Home</span>
        <span>Inbox</span>
        <span className="w-qr">
          <i className="m-rel">
            Pay
            <Mark n={2} at="tr" />
          </i>
        </span>
        <span>History</span>
        <span>Profile</span>
      </div>
    </Phone>
  );
}

function GameStore() {
  return (
    <Browser url="gamevault.store/app/starfall" label="Dark game store page. 1: a bright green Add to Cart button next to a grey Wishlist button. 2: an achievements bar showing 31 of 40. 3: a search box for 52,000 games with tag filters. 4: a Recently viewed row of three games.">
      <div className="g-store">
        <aside className="m-rel g-side">
          <Mark n={3} at="tr" />
          <div className="g-search">Search 52,000 games</div>
          <div className="g-tags">
            {['Action', 'RPG', 'Indie', 'Co-op', 'Free'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </aside>
        <div className="g-main">
          <div className="g-banner">
            <b>Starfall Odyssey</b>
          </div>
          <div className="g-buy">
            <span className="g-off">−75%</span>
            <span className="g-price">
              <s>₱1,299</s> ₱324
            </span>
            <span className="g-wish">Wishlist</span>
            <span className="m-rel g-cart">
              <Mark n={1} at="tr" />
              Add to Cart
            </span>
          </div>
          <div className="m-rel g-ach">
            <Mark n={2} at="tr" />
            <span>Achievements 31 / 40</span>
            <i>
              <b style={{ width: '77.5%' }} />
            </i>
          </div>
          <div className="m-rel g-recent">
            <Mark n={4} at="tr" />
            <small>Recently viewed</small>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function SchoolPortal() {
  return (
    <Browser url="portal.school.edu.ph/enroll" label="Student portal enrollment page. 1: an error box reading Error 0x0F3 NullReferenceException. 2: Step 3 of 5 with only a Next button. 3: a text box asking for a subject code. 4: a red Drop all subjects button right beside Save.">
      <div className="sp">
        <div className="sp-head">
          <b>Student Portal</b>
          <span>Enrollment · Step 3 of 5</span>
        </div>
        <div className="sp-body">
          <div className="m-rel sp-err">
            <Mark n={1} at="tr" />
            Error 0x0F3: NullReferenceException at Enroll.cs:212
          </div>
          <div className="m-rel m-field sp-field">
            <Mark n={3} at="tr" />
            <label>Enter subject code</label>
            <div className="m-input sp-code">ITE30-____</div>
          </div>
          <div className="sp-actions">
            <span className="m-rel sp-pair">
              <Mark n={4} at="tl" />
              <span className="sp-save">Save</span>
              <span className="sp-drop">Drop all subjects</span>
            </span>
            <span className="m-rel sp-next">
              <Mark n={2} at="tr" />
              Next →
            </span>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function ErrorCode() {
  return (
    <Phone label="Phone dialog titled Error with the text 0x80070005 E_ACCESSDENIED code 403.17 and an OK button">
      <div className="m-topbar">
        <span />
        <b>Enroll</b>
        <span />
      </div>
      <div className="m-pad m-stack">
        <div className="m-card-mini" />
        <div className="m-card-mini" />
      </div>
      <div className="e-dim">
        <div className="e-dialog">
          <b>Error</b>
          <code>0x80070005: E_ACCESSDENIED (code 403.17)</code>
          <span className="e-ok">OK</span>
        </div>
      </div>
    </Phone>
  );
}

function ToastNoUndo() {
  return (
    <Phone label="File list on a phone with a toast at the bottom saying File deleted, with no Undo button">
      <div className="m-topbar">
        <span />
        <b>My files</b>
        <span />
      </div>
      <div className="m-pad m-stack">
        {['Thesis_final_v3.docx', 'Grades_Q1.xlsx', 'Org_chart.png', 'Minutes_Oct.pdf'].map((f) => (
          <div className="m-line" key={f}>
            <span>{f}</span>
            <span className="m-muted">Delete</span>
          </div>
        ))}
      </div>
      <div className="m-grow" />
      <div className="t-toast">File deleted.</div>
    </Phone>
  );
}

function DateFree() {
  return (
    <div className="m-fig">
      <div className="m-dialogwrap m-light">
        <div className="m-dialog">
          <div className="m-field">
            <label>Birthday</label>
            <div className="m-input">06/05/04</div>
            <small className="m-muted">Type your birthday</small>
          </div>
        </div>
      </div>
      <Caption>June 5 or May 6? 2004 or 1904?</Caption>
    </div>
  );
}

function DatePicker() {
  return (
    <div className="m-fig">
      <div className="m-dialogwrap m-light">
        <div className="m-dialog">
          <div className="m-field">
            <label>Birthday</label>
            <div className="dp-row">
              <span className="m-input">June ▾</span>
              <span className="m-input">5 ▾</span>
              <span className="m-input">2004 ▾</span>
            </div>
          </div>
        </div>
      </div>
      <Caption>Only real dates can be picked</Caption>
    </div>
  );
}

function EmpathyMap({ spot = plain }) {
  const note = (id, text) => (
    <span {...spot(id, 'em-note')}>{text}</span>
  );
  return (
    <div className="em" role="group" aria-label="Empathy map for Bea, a working student, with four quadrants: Says, Thinks, Does, Feels">
      <div className="em-q">
        <b>Says</b>
        {note('n1', '"I just want my schedule."')}
      </div>
      <div className="em-q">
        <b>Thinks</b>
        {note('n2', '"Maybe I\'ll get the 7 AM class again…"')}
      </div>
      <div className="em-q">
        <b>Does</b>
        {note('n5', 'Checks the portal during lunch at work')}
      </div>
      <div className="em-q">
        <b>Feels</b>
        {note('n4', 'Anxious when slots fill up')}
        {note('n3', 'Opens the portal 5 times a day')}
      </div>
      <span className="em-user">Bea, working student</span>
    </div>
  );
}


function InterviewScript({ spot = plain }) {
  const q = (id, n, text) => (
    <li>
      <span className="iv-n">Q{n}</span>
      <span {...spot(id, 'iv-q')}>{text}</span>
    </li>
  );
  return (
    <div className="iv-doc" role="group" aria-label="Interview guide for the new enrollment app, with five questions">
      <b className="iv-title">Interview guide: New enrollment app</b>
      <ol>
        {q('q1', 1, 'Walk me through the last time you enrolled.')}
        {q('q2', 2, "Don't you think the new schedule view is easier?")}
        {q('q3', 3, 'What did you do when a section was full?')}
        {q('q4', 4, 'How frustrating was the old portal?')}
        {q('q5', 5, "Is there anything else you'd like to tell me?")}
      </ol>
    </div>
  );
}

function ResearchPlan() {
  return (
    <Browser
      url="docs.team/usability-test-plan"
      label="Usability test plan for a new enrollment app. 1: participants are 5 classmates from our BSIT block. 2: script question: How much do you love the new dark mode? 3: notes: only write down comments that support the redesign. 4: the app's designer runs every session and introduces it as my app, I worked really hard on it."
    >
      <div className="rp">
        <b className="rp-title">Usability test plan: New enrollment app</b>
        <dl>
          <div>
            <dt>Goal</dt>
            <dd>See if students can enroll in under 5 minutes.</dd>
          </div>
          <div>
            <dt>Participants</dt>
            <dd className="m-rel rp-box">
              <Mark n={1} at="tr" />5 classmates from our BSIT block
            </dd>
          </div>
          <div>
            <dt>Script</dt>
            <dd className="m-rel rp-box">
              <Mark n={2} at="tr" />
              Q1: "How much do you love the new dark mode?"
            </dd>
          </div>
          <div>
            <dt>Notes</dt>
            <dd className="m-rel rp-box">
              <Mark n={3} at="tr" />
              Only write down comments that support the redesign.
            </dd>
          </div>
          <div>
            <dt>Moderator</dt>
            <dd className="m-rel rp-box">
              <Mark n={4} at="tr" />
              The app's designer runs every session: "This is my app, I worked really hard on it!"
            </dd>
          </div>
        </dl>
      </div>
    </Browser>
  );
}

export const FIGURES = {
  tinyPay: TinyPay,
  adBanner: AdBanner,
  searchBlank: SearchBlank,
  searchSkeleton: SearchSkeleton,
  postelForm: PostelForm,
  proximityForm: ProximityForm,
  pricingFew: PricingFew,
  pricingMany: PricingMany,
  weirdShop: WeirdShop,
  tabBar: TabBar,
  clutter: Clutter,
  linkHeadings: LinkHeadings,
  buttonsTight: ButtonsTight,
  buttonsSpaced: ButtonsSpaced,
  prettyDate: PrettyDate,
  boss: Boss,
  gProximity: GProximity,
  gSimilarity: GSimilarity,
  gRegion: GRegion,
  gConnected: GConnected,
  walletApp: WalletApp,
  gameStore: GameStore,
  schoolPortal: SchoolPortal,
  errorCode: ErrorCode,
  toastNoUndo: ToastNoUndo,
  dateFree: DateFree,
  datePicker: DatePicker,
  empathyMap: EmpathyMap,
  interviewScript: InterviewScript,
  researchPlan: ResearchPlan,
};
