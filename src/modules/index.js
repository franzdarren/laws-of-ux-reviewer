import LawsLessons from './laws/Lessons.jsx';
import HeuristicsLessons from './heuristics/Lessons.jsx';
import DesignLessons from './design/Lessons.jsx';
import SusLessons from './sus/Lessons.jsx';
import { QUESTIONS as lawsQ } from './laws/questions.js';
import { QUESTIONS as heuristicsQ } from './heuristics/questions.js';
import { QUESTIONS as designQ } from './design/questions.js';
import { QUESTIONS as susQ } from './sus/questions.js';

export const MODULES = [
  {
    id: 'laws',
    n: 1,
    title: 'Laws of UX',
    blurb: '30 laws on how people see, remember, decide and expect, with hands-on demos.',
    Lessons: LawsLessons,
    questions: lawsQ,
  },
  {
    id: 'heuristics',
    n: 2,
    title: '10 Usability Heuristics',
    blurb: "Nielsen's rules of thumb, heuristic evaluation and severity ratings.",
    Lessons: HeuristicsLessons,
    questions: heuristicsQ,
  },
  {
    id: 'design-thinking',
    n: 3,
    title: 'Design Thinking Process',
    blurb: 'Empathize, Define, Ideate, Prototype, Test, and the tools for each stage.',
    Lessons: DesignLessons,
    questions: designQ,
  },
  {
    id: 'sus',
    n: 4,
    title: 'System Usability Scale',
    blurb: 'The 10-item questionnaire, how to score it, and what a score means.',
    Lessons: SusLessons,
    questions: susQ,
  },
];
