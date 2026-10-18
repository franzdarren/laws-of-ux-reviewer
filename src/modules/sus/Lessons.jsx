import { SusCalculator, SusScale } from '../../components/demos.jsx';

export default function SusLessons() {
  return (
    <div className="lessons">
      <p className="lede">
        The System Usability Scale (SUS) is a 10-item questionnaire that gives one usability score from 0 to 100. John Brooke created
        it in 1986 at Digital Equipment Corporation as a "quick and dirty" survey. It is still the most used usability questionnaire.
      </p>

      <section className="lesson">
        <h2>How it works</h2>
        <ol className="steps">
          <li>After using the system, each person rates 10 statements from 1 (strongly disagree) to 5 (strongly agree).</li>
          <li>
            Odd items (1, 3, 5, 7, 9) are <b>positive</b>, like "I thought the system was easy to use." Even items (2, 4, 6, 8, 10) are{' '}
            <b>negative</b>, like "I found the system very cumbersome to use."
          </li>
          <li>Never skip an item. If someone can't answer, they mark the middle (3).</li>
        </ol>
      </section>

      <section className="lesson">
        <h2>Scoring in three steps</h2>
        <div className="formula-grid">
          <div>
            <span className="fg-k">Odd items</span>
            <span className="formula">response − 1</span>
          </div>
          <div>
            <span className="fg-k">Even items</span>
            <span className="formula">5 − response</span>
          </div>
          <div>
            <span className="fg-k">Score</span>
            <span className="formula">sum × 2.5</span>
          </div>
        </div>
        <p>
          Each item becomes 0 to 4 points, so the sum is 0 to 40. Multiplying by 2.5 turns that into 0 to 100. For a group, average
          everyone's scores.
        </p>
        <SusCalculator />
      </section>

      <section className="lesson">
        <h2>What the score means</h2>
        <SusScale />
        <ul className="facts">
          <li>
            <b>68</b> is the average across about 500 studies. Above 68 is above average.
          </li>
          <li>
            <b>Above 80.3</b> is an A, the top 10%.
          </li>
          <li>
            <b>Below 51</b> is an F, the bottom 15%.
          </li>
          <li>
            <b>It is not a percentage.</b> A 68 is not "68% usable"; it is the 50th percentile.
          </li>
          <li>
            <b>It is not diagnostic.</b> A low score says there is a problem, not where. Use recordings and task results to find out why.
          </li>
          <li>
            Items 4 and 10 measure <b>learnability</b>; the other 8 measure usability.
          </li>
          <li>It works with small samples, but report a confidence interval when you have few users.</li>
        </ul>
        <p className="source">
          Norms from Jeff Sauro,{' '}
          <a href="https://measuringu.com/sus/" target="_blank" rel="noreferrer">
            measuringu.com/sus
          </a>
          .
        </p>
      </section>
    </div>
  );
}
