// Every law, heuristic and stage a question can point to, with where to read more.

const LAW_URL = (slug) => `https://lawsofux.com/${slug}/`;
const NNG_HEURISTICS = 'https://www.nngroup.com/articles/ten-usability-heuristics/';
const DSCHOOL = 'https://dschool.stanford.edu/resources/design-thinking-bootleg';
const SUS_URL = 'https://measuringu.com/sus/';
const NNG_METHODS = 'https://www.nngroup.com/articles/which-ux-research-methods/';
const BIAS_URL = 'https://lawsofux.com/cognitive-bias/';

const methods = {
  interviews: 'User interviews',
  surveys: 'Surveys',
  'contextual-inquiry': 'Contextual inquiry',
  'diary-study': 'Diary study',
  'focus-group': 'Focus group',
  'usability-test': 'Usability testing',
  'card-sort': 'Card sorting',
  'tree-test': 'Tree testing',
  'ab-test': 'A/B testing',
  analytics: 'Analytics',
  'eye-tracking': 'Eye tracking',
};

const biases = {
  'confirmation-bias': 'Confirmation bias',
  'false-consensus': 'False-consensus effect',
  'leading-question': 'Leading-question bias',
  'social-desirability': 'Social desirability bias',
  acquiescence: 'Acquiescence bias',
  hawthorne: 'Hawthorne effect',
  'sampling-bias': 'Sampling bias',
  framing: 'Framing effect',
  survivorship: 'Survivorship bias',
};

const laws = {
  'aesthetic-usability-effect': 'Aesthetic-Usability Effect',
  'choice-overload': 'Choice Overload',
  chunking: 'Chunking',
  'cognitive-bias': 'Cognitive Bias',
  'cognitive-load': 'Cognitive Load',
  'doherty-threshold': 'Doherty Threshold',
  'fittss-law': "Fitts's Law",
  flow: 'Flow',
  'goal-gradient-effect': 'Goal-Gradient Effect',
  'hicks-law': "Hick's Law",
  'jakobs-law': "Jakob's Law",
  'law-of-common-region': 'Law of Common Region',
  'law-of-proximity': 'Law of Proximity',
  'law-of-pr%C3%A4gnanz': 'Law of Prägnanz',
  'law-of-similarity': 'Law of Similarity',
  'law-of-uniform-connectedness': 'Law of Uniform Connectedness',
  'mental-model': 'Mental Model',
  'millers-law': "Miller's Law",
  'occams-razor': "Occam's Razor",
  'paradox-of-the-active-user': 'Paradox of the Active User',
  'pareto-principle': 'Pareto Principle',
  'parkinsons-law': "Parkinson's Law",
  'peak-end-rule': 'Peak-End Rule',
  'postels-law': "Postel's Law",
  'selective-attention': 'Selective Attention',
  'serial-position-effect': 'Serial Position Effect',
  'teslers-law': "Tesler's Law",
  'von-restorff-effect': 'Von Restorff Effect',
  'working-memory': 'Working Memory',
  'zeigarnik-effect': 'Zeigarnik Effect',
};

const heuristics = {
  h1: 'Visibility of system status',
  h2: 'Match between system and the real world',
  h3: 'User control and freedom',
  h4: 'Consistency and standards',
  h5: 'Error prevention',
  h6: 'Recognition rather than recall',
  h7: 'Flexibility and efficiency of use',
  h8: 'Aesthetic and minimalist design',
  h9: 'Help users recognize, diagnose, and recover from errors',
  h10: 'Help and documentation',
};

const stages = {
  empathize: 'Empathize',
  define: 'Define',
  ideate: 'Ideate',
  prototype: 'Prototype',
  test: 'Test',
};

export const TERMS = {
  ...Object.fromEntries(Object.entries(laws).map(([k, name]) => [k, { name, url: LAW_URL(k) }])),
  ...Object.fromEntries(
    Object.entries(heuristics).map(([k, name]) => [k, { name: `${k.slice(1)}. ${name}`, short: name, url: NNG_HEURISTICS }]),
  ),
  ...Object.fromEntries(Object.entries(stages).map(([k, name]) => [k, { name, url: DSCHOOL }])),
  heuristics: { name: '10 usability heuristics', url: NNG_HEURISTICS },
  'heuristic-evaluation': {
    name: 'Heuristic evaluation',
    url: 'https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/',
  },
  severity: { name: 'Severity ratings', url: 'https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/' },
  'design-thinking': { name: 'Design thinking (d.school)', url: DSCHOOL },
  sus: { name: 'System Usability Scale', url: SUS_URL },
  ...Object.fromEntries(Object.entries(methods).map(([k, name]) => [k, { name, url: NNG_METHODS }])),
  ...Object.fromEntries(Object.entries(biases).map(([k, name]) => [k, { name, url: BIAS_URL }])),
  'research-methods': { name: 'Which UX research methods (NN/g)', url: NNG_METHODS },
  'five-users': { name: 'Why you only need 5 users (NN/g)', url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/' },
  'card-sorting': { name: 'Card sorting (NN/g)', url: 'https://www.nngroup.com/articles/card-sorting-definition/' },
  'leading-question': { name: biases['leading-question'], url: 'https://www.nngroup.com/articles/leading-questions/' },
};

export const LAW_SLUGS = Object.keys(laws);
export const HEURISTIC_IDS = Object.keys(heuristics);
export const STAGE_IDS = Object.keys(stages);
export const METHOD_IDS = Object.keys(methods);
export const BIAS_IDS = Object.keys(biases);

export const termName = (key, labels) => labels?.[key] ?? TERMS[key]?.name ?? key;
