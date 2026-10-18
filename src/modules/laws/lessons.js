// Lesson notes for the 30 laws on lawsofux.com, grouped by what they are about.
// `def` follows the site's wording; `do` is the main takeaway; `eg` is an everyday example.

export const GROUPS = [
  {
    id: 'perception',
    title: 'How we see and group things',
    intro: 'Gestalt psychology studies how people turn separate shapes into groups and wholes. These laws explain why a layout looks organized or messy.',
    demo: 'gestalt',
    laws: [
      {
        slug: 'law-of-proximity',
        def: 'Objects that are near each other tend to be grouped together.',
        do: 'Put related things close together and unrelated things farther apart.',
        eg: 'A label sits right above its own text box, not halfway between two boxes.',
      },
      {
        slug: 'law-of-similarity',
        def: 'Elements that look alike are seen as a whole group, even when they are apart.',
        do: 'Make things that work the same look the same, and make links look different from plain text.',
        eg: 'Every clickable link is blue; headings are not.',
      },
      {
        slug: 'law-of-common-region',
        def: 'Elements are seen as a group when they share an area with a clear boundary.',
        do: 'Use a border or background behind items that belong together.',
        eg: 'E-wallet service icons sit together inside one white card.',
      },
      {
        slug: 'law-of-uniform-connectedness',
        def: 'Elements that are visually connected are seen as more related than elements with no connection.',
        do: 'Join related steps or items with lines, arrows or frames.',
        eg: 'A delivery tracker draws a line through Ordered → Preparing → On the way → Delivered.',
      },
      {
        slug: 'law-of-pr%C3%A4gnanz',
        def: 'People read ambiguous or complex images as the simplest form possible, because it takes the least effort.',
        do: 'Prefer simple, clear shapes for icons and logos.',
        eg: 'The Olympic logo is seen as five rings, not one complex tangle of curves.',
      },
      {
        slug: 'von-restorff-effect',
        def: 'When several similar objects are present, the one that differs from the rest is most likely to be remembered.',
        do: 'Make the key action stand out, but sparingly, and not by color alone.',
        eg: 'The one green "Add to Cart" button on a dark game store page.',
      },
      {
        slug: 'aesthetic-usability-effect',
        def: 'Users often perceive aesthetically pleasing design as design that is more usable.',
        do: 'Good looks buy patience, but they can hide real problems in usability testing.',
        eg: 'Kurosu and Kashimura (1995): people rated better-looking ATM screens as easier to use.',
      },
    ],
  },
  {
    id: 'memory',
    title: 'Memory and attention',
    intro: 'People can only hold a little in their heads at once and only notice part of a screen. These laws are about designing within those limits.',
    laws: [
      {
        slug: 'millers-law',
        def: 'The average person can only keep 7 (plus or minus 2) items in their working memory.',
        do: "Chunk content, but don't use the number 7 to justify arbitrary limits.",
        eg: 'George Miller, 1956. A menu is not "wrong" because it has 9 items.',
      },
      {
        slug: 'working-memory',
        def: 'A cognitive system that temporarily holds and manipulates information needed to complete tasks.',
        do: 'Show information instead of making people remember it between screens.',
        eg: 'A side-by-side comparison table for three laptops.',
      },
      {
        slug: 'chunking',
        def: 'Breaking individual pieces of information into groups that form a meaningful whole.',
        do: 'Group content into small, labeled sections.',
        eg: 'A mobile number written 0917 123 4567 instead of 09171234567.',
      },
      {
        slug: 'cognitive-load',
        def: 'The amount of mental resources needed to understand and interact with an interface.',
        do: 'Cut extraneous load (distractions, decoration). Intrinsic load comes from the task itself.',
        eg: 'A send-money screen with flashing promos adds extraneous load.',
      },
      {
        slug: 'selective-attention',
        def: 'Focusing attention only on a subset of stimuli, usually those related to our goals.',
        do: 'Never make real content look like an ad (banner blindness), and watch for changes users may miss (change blindness).',
        eg: 'A warning styled like a flashy ad gets ignored.',
      },
      {
        slug: 'serial-position-effect',
        def: 'Users have a tendency to best remember the first and last items in a series.',
        do: 'Put key items at the start and end; less important ones in the middle.',
        eg: 'Most apps put Home first and Profile last in the bottom tab bar.',
      },
      {
        slug: 'zeigarnik-effect',
        def: 'People remember uncompleted or interrupted tasks better than completed tasks.',
        do: 'Show what is left to do so people come back to finish.',
        eg: 'LinkedIn\'s "Profile 70% complete" keeps nagging at you.',
      },
      {
        slug: 'peak-end-rule',
        def: 'People judge an experience by how they felt at its peak and at its end, not by the average of every moment.',
        do: 'Design the most intense moment and the ending with care; bad moments stick more than good ones.',
        eg: 'A cheerful "Sent!" screen after a money transfer.',
      },
    ],
  },
  {
    id: 'decisions',
    title: 'Decisions, effort and time',
    intro: 'These laws are about how long things take: finding a button, picking an option, waiting for the system, finishing a task.',
    laws: [
      {
        slug: 'hicks-law',
        def: 'The time it takes to make a decision increases with the number and complexity of choices.',
        do: 'Reduce choices when speed matters, highlight a recommended option, and break long tasks into steps.',
        eg: 'Hick and Hyman, 1952. A menu with 3 items and "More" beats one with 40.',
        demo: 'hick',
      },
      {
        slug: 'choice-overload',
        def: 'People get overwhelmed when they are presented with a large number of options.',
        do: 'Offer side-by-side comparisons, a featured pick, search and filters.',
        eg: 'Term coined by Alvin Toffler in Future Shock (1970).',
      },
      {
        slug: 'fittss-law',
        def: 'The time to acquire a target is a function of the distance to and size of the target.',
        do: 'Make touch targets big, space them apart, and put them within easy reach.',
        eg: 'Paul Fitts, 1954. A big Pay button in the thumb zone.',
        demo: 'fitts',
      },
      {
        slug: 'doherty-threshold',
        def: 'Productivity soars when a computer and its users interact at a pace (under 400 ms) where neither has to wait on the other.',
        do: 'Respond within 400 ms; use skeletons, animation and progress bars to make waits feel shorter.',
        eg: 'Doherty and Thadani, IBM, 1982. The old standard was 2 seconds.',
        demo: 'doherty',
      },
      {
        slug: 'goal-gradient-effect',
        def: 'The tendency to approach a goal increases with proximity to the goal.',
        do: 'Show progress clearly, and consider a head start.',
        eg: 'A coffee card that starts with 2 of 10 stamps filled. Clark Hull, 1932.',
      },
      {
        slug: 'parkinsons-law',
        def: 'Any task will inflate until all of the available time is spent.',
        do: 'Make tasks take less time than users expect, for example with autofill.',
        eg: 'Cyril Northcote Parkinson, The Economist, 1955.',
      },
      {
        slug: 'flow',
        def: 'A mental state of full focus, energy and enjoyment in an activity.',
        do: 'Match challenge to skill, give feedback, and remove interruptions.',
        eg: 'A "Rate us!" pop-up mid-sentence breaks a writer\'s flow.',
      },
      {
        slug: 'teslers-law',
        def: 'For any system there is a certain amount of complexity which cannot be reduced, only moved (law of conservation of complexity).',
        do: 'Have the system carry the complexity, not the user.',
        eg: 'Detect the timezone instead of asking users to type "UTC+8". Larry Tesler, Xerox PARC.',
      },
      {
        slug: 'occams-razor',
        def: 'Among competing hypotheses that predict equally well, the one with the fewest assumptions should be selected.',
        do: 'Remove elements until removing more would hurt the design.',
        eg: 'A sign-up form cut from 12 fields to 4.',
      },
      {
        slug: 'pareto-principle',
        def: 'For many events, roughly 80% of the effects come from 20% of the causes.',
        do: 'Focus effort on the areas that bring the most benefit to the most users.',
        eg: 'Vilfredo Pareto: 80% of Italy\'s land was owned by 20% of the people.',
      },
      {
        slug: 'postels-law',
        def: 'Be liberal in what you accept, and conservative in what you send.',
        do: 'Accept many input formats, convert them yourself, and give clear feedback.',
        eg: 'A phone field that accepts "0917 123 4567", "0917-123-4567" and "+63 917…". Jon Postel, TCP.',
      },
    ],
  },
  {
    id: 'expectations',
    title: 'Expectations and habits',
    intro: 'People bring what they already know into every product. These laws are about meeting those expectations.',
    laws: [
      {
        slug: 'jakobs-law',
        def: 'Users spend most of their time on other sites, so they prefer your site to work the same way as the sites they already know.',
        do: 'Follow common patterns, and when you change something, let people keep the old version for a while.',
        eg: 'Logo top-left goes home; cart icon top-right. Jakob Nielsen.',
      },
      {
        slug: 'mental-model',
        def: 'A compressed model based on what we think we know about a system and how it works.',
        do: 'Design to match what users already believe about how things work.',
        eg: 'People expect the trash to let them restore files.',
      },
      {
        slug: 'paradox-of-the-active-user',
        def: 'Users never read manuals but start using the software immediately.',
        do: 'Put help inside the product, at the moment it is needed, like tooltips.',
        eg: 'Rosson and Carroll, 1987.',
      },
      {
        slug: 'cognitive-bias',
        def: 'A systematic error of thinking or rationality in judgment that affects how we see the world and make decisions.',
        do: 'Know your own biases (like confirmation bias) when doing research and making design decisions.',
        eg: 'Only noticing test results that support the design you already like.',
      },
    ],
  },
];
