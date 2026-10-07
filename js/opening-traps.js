const openingTrapsSurprises = [
  {
    id: "TRAP-001",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is an opening trap?",
    level: "Beginner",
    keywords: ["opening trap", "trap", "opening"],
    questions: [
      "What is an opening trap?",
      "Why are opening traps dangerous?"
    ],
    short_answer: "An opening trap is a sequence designed to tempt an opponent into a mistake.",
    answer: "Opening traps usually exploit greed, weak development, an exposed king, or a tactical oversight.",
    example: "A player may grab a pawn and overlook a developing move that wins the queen.",
    related: ["OPENING-001", "THEORY-001", "TACTIC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-002",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "Should you memorize opening traps?",
    level: "Beginner",
    keywords: ["memorize", "traps", "opening study"],
    questions: [
      "Should I memorize opening traps?",
      "Are opening traps worth learning?"
    ],
    short_answer: "Learn the ideas behind traps rather than memorizing long sequences.",
    answer: "Understanding why a trap works helps you recognize similar tactical ideas in unfamiliar positions.",
    example: "Instead of memorizing ten moves, understand why an undefended piece becomes vulnerable.",
    related: ["OPENING-060", "THEORY-078", "TRAIN-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-003",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "Why do players fall into opening traps?",
    level: "Beginner",
    keywords: ["mistake", "trap", "greed"],
    questions: [
      "Why do players fall into opening traps?",
      "What makes an opening trap effective?"
    ],
    short_answer: "Traps work because players often focus on their own plan instead of the opponent's threats.",
    answer: "Greed, automatic moves, poor development, and failure to calculate can make traps successful.",
    example: "A player sees a free pawn and captures immediately without checking the opponent's next move.",
    related: ["MISTAKE-001", "THINK-001", "OPENING-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-004",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a tactical opening trap?",
    level: "Beginner",
    keywords: ["tactical trap", "tactics", "opening"],
    questions: [
      "What is a tactical opening trap?",
      "How do tactics create opening traps?"
    ],
    short_answer: "It is an opening sequence where a tactical mistake causes immediate material or positional loss.",
    answer: "The trap may use forks, pins, skewers, discovered attacks, checks, or mating threats.",
    example: "A knight fork on the queen and rook can turn a small opening mistake into a major loss.",
    related: ["TACTIC-001", "TACTIC-010", "OPENING-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-005",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a poisoned pawn trap?",
    level: "Intermediate",
    keywords: ["poisoned pawn", "pawn", "trap"],
    questions: [
      "What is a poisoned pawn?",
      "Why can a pawn be dangerous to capture?"
    ],
    short_answer: "A poisoned pawn is a pawn that appears free but capturing it may allow dangerous activity.",
    answer: "The capturing player may lose time or expose the queen or king while the opponent gains development and initiative.",
    example: "The Sicilian Najdorf Poisoned Pawn Variation is a famous example of calculated pawn grabbing.",
    related: ["THEORY-040", "OPENING-010", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-006",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a queen trap?",
    level: "Beginner",
    keywords: ["queen trap", "queen", "trap"],
    questions: [
      "What is a queen trap?",
      "How can an opening trap win a queen?"
    ],
    short_answer: "A queen trap is a sequence in which the opponent's queen has very few or no safe escape squares.",
    answer: "Queen traps often arise because the queen moved too early or captured material without checking escape routes.",
    example: "A queen can become trapped by developing pieces that control all available retreat squares.",
    related: ["OPENING-010", "TACTIC-001", "TACTIC-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-007",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a mating trap?",
    level: "Beginner",
    keywords: ["mating trap", "checkmate", "king"],
    questions: [
      "What is a mating trap?",
      "Can an opening trap lead directly to checkmate?"
    ],
    short_answer: "Yes. A mating trap uses opening mistakes to create a forced or nearly forced attack on the king.",
    answer: "It commonly exploits weak f-pawns, undeveloped pieces, an uncastled king, or an opened diagonal.",
    example: "Scholar's Mate is the simplest famous example of an early mating threat.",
    related: ["MATE-001", "ATTACK-001", "OPENING-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-008",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a gambit trap?",
    level: "Intermediate",
    keywords: ["gambit", "trap", "sacrifice"],
    questions: [
      "What is a gambit trap?",
      "Why can accepting a gambit be dangerous?"
    ],
    short_answer: "A gambit trap occurs when accepting a sacrificed pawn or piece leads to tactical problems.",
    answer: "The gambiteer often receives development, open lines, initiative, or attacking chances in return for material.",
    example: "In some gambits, taking a second pawn can allow a strong attack against the king.",
    related: ["THEORY-070", "OPENING-010", "ATTACK-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-009",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "What is a strategic opening trap?",
    level: "Intermediate",
    keywords: ["strategic trap", "position", "opening"],
    questions: [
      "Can an opening trap be strategic rather than tactical?",
      "What is a strategic opening trap?"
    ],
    short_answer: "Yes. Some traps lead to a lasting positional advantage rather than an immediate tactical win.",
    answer: "A player may lure an opponent into a weak pawn structure, bad piece placement, or unfavorable endgame.",
    example: "A tempting pawn capture can leave a permanent weak square or backward pawn.",
    related: ["POSITION-001", "MIDDLE-001", "OPENING-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-010",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Fundamentals",
    title: "Should you play traps in every game?",
    level: "Beginner",
    keywords: ["traps", "strategy", "opening"],
    questions: [
      "Should I always try to set an opening trap?",
      "Is playing for traps good chess?"
    ],
    short_answer: "No. Sound development and good positions are more reliable than hoping for a trap.",
    answer: "A trap should support a sound opening idea rather than replace good chess principles.",
    example: "Developing a piece and creating a threat is usually better than making a weak move only because it looks tricky.",
    related: ["OPENING-001", "OPENING-060", "THINK-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-011",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Scholar's Mate trap?",
    level: "Beginner",
    keywords: ["Scholar's Mate", "Qxf7", "checkmate"],
    questions: [
      "What is Scholar's Mate?",
      "How does Scholar's Mate work?"
    ],
    short_answer: "Scholar's Mate is an early mating pattern targeting f7 with the queen and bishop.",
    answer: "The basic idea is Qh5 or Qf3 combined with a bishop attacking f7.",
    example: "After suitable careless moves, Qxf7 can deliver checkmate when the king cannot escape.",
    related: ["MATE-001", "ATTACK-010", "RULE-018"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "TRAP-012",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "How should you defend against Scholar's Mate?",
    level: "Beginner",
    keywords: ["Scholar's Mate", "defense", "f7"],
    questions: [
      "How do I stop Scholar's Mate?",
      "What should Black watch for against Scholar's Mate?"
    ],
    short_answer: "Watch the queen-and-bishop attack on f7 and develop with attention to the threat.",
    answer: "Moves such as Qe7, g6, or other appropriate defensive moves can meet the threat depending on the position.",
    example: "After Qh5, simply recognizing the threat on f7 prevents many beginner losses.",
    related: ["TRAP-011", "ATTACK-010", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-013",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Fool's Mate?",
    level: "Beginner",
    keywords: ["Fool's Mate", "checkmate", "opening"],
    questions: [
      "What is Fool's Mate?",
      "What is the fastest possible checkmate?"
    ],
    short_answer: "Fool's Mate is the shortest possible checkmate in chess, occurring after two Black moves.",
    answer: "It results from severe weakening of the king's diagonal, allowing the queen to deliver mate on h4.",
    example: "The sequence begins with very weak pawn moves such as f3 and g4 by White.",
    related: ["MATE-001", "RULE-018", "TRAP-011"],
    source: "Established chess fact",
    verified: true
  },

  {
    id: "TRAP-014",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Legal Trap?",
    level: "Intermediate",
    keywords: ["Legal Trap", "Legal's Mate", "sacrifice"],
    questions: [
      "What is the Legal Trap?",
      "Why is Legal's Mate famous?"
    ],
    short_answer: "The Legal Trap is a classic tactical trap involving a queen sacrifice followed by a mating attack.",
    answer: "The pattern uses development, a pin, and a tactical sequence against the exposed king.",
    example: "The famous motif ends with a knight-based mating attack after the queen is apparently sacrificed.",
    related: ["TACTIC-030", "MATE-020", "OPENING-010"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "TRAP-015",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Blackburne Shilling Gambit?",
    level: "Intermediate",
    keywords: ["Blackburne Shilling Gambit", "Italian Game", "trap"],
    questions: [
      "What is the Blackburne Shilling Gambit?",
      "Which opening contains the Blackburne Shilling Gambit?"
    ],
    short_answer: "It is a tactical trap arising from the Italian Game after 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nd4.",
    answer: "Black attempts to tempt White into capturing a pawn and then uses tactical threats against the queen.",
    example: "The trap is mainly useful as a teaching example of greed and tactical punishment.",
    related: ["THEORY-005", "TRAP-003", "TACTIC-001"],
    source: "Established opening pattern",
    verified: true
  },

  {
    id: "TRAP-016",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Fried Liver Attack?",
    level: "Intermediate",
    keywords: ["Fried Liver Attack", "Two Knights", "knight sacrifice"],
    questions: [
      "What is the Fried Liver Attack?",
      "Is the Fried Liver a trap?"
    ],
    short_answer: "The Fried Liver Attack is a sharp variation of the Two Knights Defense involving Nxf7.",
    answer: "White sacrifices the knight on f7 to expose the black king and create strong tactical pressure.",
    example: "The line begins 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7.",
    related: ["THEORY-005", "ATTACK-020", "TACTIC-030"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-017",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Légal Trap in practical chess?",
    level: "Beginner",
    keywords: ["Légal", "queen sacrifice", "mating pattern"],
    questions: [
      "What should I learn from the Légal Trap?",
      "What is the main lesson of Légal's Mate?"
    ],
    short_answer: "The main lesson is that a pinned piece may still create a tactical resource if the king is exposed.",
    answer: "Do not automatically assume that a pinned piece cannot move; first calculate the consequences.",
    example: "A knight can sometimes move from a pin when doing so creates checkmate or wins decisive material.",
    related: ["TRAP-014", "TACTIC-020", "TACTIC-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-018",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Blackburne Trap in the Queen's Gambit?",
    level: "Intermediate",
    keywords: ["Blackburne Trap", "Queen's Gambit", "trap"],
    questions: [
      "What is the Blackburne Trap?",
      "Where can the Blackburne Trap occur?"
    ],
    short_answer: "The Blackburne Trap is a tactical motif associated with the Queen's Gambit Declined.",
    answer: "It demonstrates how apparently natural development or pawn-taking can create tactical problems.",
    example: "The exact sequence depends on the variation and move order, so understanding the motif is more useful than memorizing moves.",
    related: ["THEORY-020", "OPENING-060", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-019",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Elephant Trap?",
    level: "Intermediate",
    keywords: ["Elephant Trap", "Queen's Gambit", "bishop"],
    questions: [
      "What is the Elephant Trap?",
      "Which opening contains the Elephant Trap?"
    ],
    short_answer: "The Elephant Trap is a famous tactical trap in the Queen's Gambit Declined involving a bishop and queen.",
    answer: "A seemingly attractive capture can lead to a tactical sequence that wins material.",
    example: "The trap is often taught as an example of why a pinned or apparently protected piece may be tactically vulnerable.",
    related: ["THEORY-020", "TACTIC-020", "TRAP-003"],
    source: "Established opening pattern",
    verified: true
  },

  {
    id: "TRAP-020",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Classic Traps",
    title: "What is the Cambridge Springs Trap?",
    level: "Intermediate",
    keywords: ["Cambridge Springs", "Queen's Gambit", "trap"],
    questions: [
      "What is the Cambridge Springs Trap?",
      "Why is Cambridge Springs tactical?"
    ],
    short_answer: "The Cambridge Springs Defense can contain tactical ideas against White's queen and bishop.",
    answer: "Black's setup places pressure on the center and can create tactical opportunities if White plays inaccurately.",
    example: "The famous trap demonstrates how a seemingly active queen can become vulnerable to tactical development.",
    related: ["THEORY-020", "TRAP-006", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-021",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Sicilian Traps",
    title: "Why is the Sicilian rich in opening traps?",
    level: "Intermediate",
    keywords: ["Sicilian Defense", "traps", "tactics"],
    questions: [
      "Why are there many Sicilian traps?",
      "Is the Sicilian tactical?"
    ],
    short_answer: "The Sicilian creates imbalanced positions with active pieces and many tactical possibilities.",
    answer: "Different pawn structures and opposite-side plans can produce sharp tactical positions very early.",
    example: "Najdorf, Dragon, Sveshnikov, and other Sicilian systems contain many forcing tactical ideas.",
    related: ["THEORY-040", "ATTACK-001", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-022",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Sicilian Traps",
    title: "What is the Magnus Smith Trap?",
    level: "Intermediate",
    keywords: ["Magnus Smith Trap", "Sicilian", "trap"],
    questions: [
      "What is the Magnus Smith Trap?",
      "Where does the Magnus Smith Trap occur?"
    ],
    short_answer: "The Magnus Smith Trap is a tactical idea associated with the Sicilian Defense, especially certain early variations.",
    answer: "The motif generally punishes inaccurate development or premature tactical play.",
    example: "As with many named traps, move-order details matter, so the tactical idea should be studied with a board.",
    related: ["THEORY-040", "TRAP-021", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-023",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Sicilian Traps",
    title: "What should Black watch for in the Sicilian?",
    level: "Intermediate",
    keywords: ["Sicilian", "king safety", "tactics"],
    questions: [
      "What are common Sicilian tactical dangers?",
      "What should Black calculate in the Sicilian?"
    ],
    short_answer: "Black must watch for rapid development, pressure on the king, tactical attacks on the center, and sacrifices.",
    answer: "The Sicilian often rewards accurate calculation because both sides can generate active play quickly.",
    example: "Before taking a pawn, check whether the capture opens a file or diagonal toward your king.",
    related: ["THEORY-040", "ATTACK-001", "THINK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-024",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Sicilian Traps",
    title: "What is a Sicilian poisoned pawn idea?",
    level: "Advanced",
    keywords: ["Sicilian", "Poisoned Pawn", "Najdorf"],
    questions: [
      "What is the Sicilian Poisoned Pawn?",
      "Why is the Najdorf Poisoned Pawn so sharp?"
    ],
    short_answer: "It is a Najdorf variation where Black allows White to take the b2-pawn for dynamic compensation and activity.",
    answer: "The resulting positions require accurate preparation because both sides receive major attacking and tactical chances.",
    example: "After the queen captures b2, Black seeks rapid development and pressure against the white king.",
    related: ["THEORY-040", "TRAP-005", "ATTACK-020"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-025",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "French Defense Traps",
    title: "What traps can occur in the French Defense?",
    level: "Intermediate",
    keywords: ["French Defense", "traps", "opening"],
    questions: [
      "Are there traps in the French Defense?",
      "What should I watch for in the French?"
    ],
    short_answer: "Yes. Tactical traps often arise from pressure on d4, e5, and the kingside.",
    answer: "The French creates closed structures where pawn breaks and tactical piece placement are especially important.",
    example: "A player who ignores a central break may suddenly face a discovered attack or loss of material.",
    related: ["THEORY-050", "OPENING-013", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-026",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Caro-Kann Traps",
    title: "What traps can occur in the Caro-Kann?",
    level: "Intermediate",
    keywords: ["Caro-Kann", "traps", "opening"],
    questions: [
      "Are there tactical traps in the Caro-Kann?",
      "What should I watch for in the Caro-Kann?"
    ],
    short_answer: "Yes. Tactical ideas can arise from development, central breaks, and pressure on the kingside.",
    answer: "Although the Caro-Kann is considered solid, careless play can still lead to tactical problems.",
    example: "A player who develops automatically may overlook a tactical central break.",
    related: ["THEORY-055", "OPENING-013", "TACTIC-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-027",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Indian Defense Traps",
    title: "Why do Indian Defenses contain tactical traps?",
    level: "Intermediate",
    keywords: ["Indian Defense", "traps", "tactics"],
    questions: [
      "Are Indian Defenses full of traps?",
      "Why are King's Indian positions tactical?"
    ],
    short_answer: "Indian Defenses often create flexible pawn structures and dynamic piece play.",
    answer: "The imbalance between central control and kingside or queenside activity creates tactical opportunities.",
    example: "A premature pawn advance can open a file or diagonal against the king.",
    related: ["THEORY-060", "THEORY-062", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-028",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Queen's Gambit Traps",
    title: "What is the main lesson of the Elephant Trap?",
    level: "Beginner",
    keywords: ["Elephant Trap", "Queen's Gambit", "lesson"],
    questions: [
      "What chess lesson does the Elephant Trap teach?",
      "Why should I study the Elephant Trap?"
    ],
    short_answer: "It teaches you to calculate tactical consequences before accepting apparently favorable material.",
    answer: "A capture that looks profitable can allow a tactical sequence against your queen or pieces.",
    example: "Always calculate the opponent's forcing replies before taking a seemingly free piece.",
    related: ["TRAP-019", "THINK-010", "TACTIC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-029",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Englund Gambit Trap?",
    level: "Intermediate",
    keywords: ["Englund Gambit", "trap", "d4"],
    questions: [
      "What is the Englund Gambit?",
      "Why can the Englund Gambit create traps?"
    ],
    short_answer: "The Englund Gambit begins with 1.d4 e5 and offers a pawn for rapid tactical chances.",
    answer: "Black aims for active piece play and traps against White's king or queen.",
    example: "White must avoid careless moves because the early pawn sacrifice creates immediate tactical possibilities.",
    related: ["THEORY-070", "TRAP-008", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-030",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Budapest Gambit trap idea?",
    level: "Intermediate",
    keywords: ["Budapest Gambit", "trap", "gambit"],
    questions: [
      "Does the Budapest Gambit contain traps?",
      "What is the main tactical idea of the Budapest Gambit?"
    ],
    short_answer: "The Budapest Gambit uses an early pawn sacrifice to gain activity and tactical opportunities.",
    answer: "Black seeks active development and pressure rather than simply recovering the pawn immediately.",
    example: "The gambit can punish White if White tries to keep material without respecting Black's initiative.",
    related: ["THEORY-071", "TRAP-008", "OPENING-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-031",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Smith-Morra Gambit trap idea?",
    level: "Intermediate",
    keywords: ["Smith-Morra Gambit", "Sicilian", "trap"],
    questions: [
      "What is the Smith-Morra Gambit trap idea?",
      "Why can accepting the Smith-Morra be dangerous?"
    ],
    short_answer: "White sacrifices a pawn in the Sicilian for rapid development and attacking chances.",
    answer: "Black must be careful because natural-looking moves can allow strong tactical pressure.",
    example: "White develops quickly and uses open files to create threats against the black king.",
    related: ["THEORY-047", "TRAP-008", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-032",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Blackmar-Diemer Gambit trap idea?",
    level: "Intermediate",
    keywords: ["Blackmar-Diemer", "gambit", "attack"],
    questions: [
      "What is the Blackmar-Diemer Gambit?",
      "Why does it produce attacking traps?"
    ],
    short_answer: "The Blackmar-Diemer Gambit sacrifices a pawn early to gain rapid development and attacking chances.",
    answer: "Its traps often involve quick piece activity and threats against the king.",
    example: "The gambiteer tries to use development and open lines before the extra pawn can become important.",
    related: ["TRAP-008", "ATTACK-001", "THEORY-070"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-033",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Stafford Gambit?",
    level: "Intermediate",
    keywords: ["Stafford Gambit", "Petrov", "trap"],
    questions: [
      "What is the Stafford Gambit?",
      "Why is the Stafford Gambit known for traps?"
    ],
    short_answer: "The Stafford Gambit is a sharp gambit in the Petrov Defense that sacrifices a pawn for attacking chances.",
    answer: "Black seeks rapid development and tactical threats against the white king.",
    example: "The opening is especially dangerous for players who take material without checking Black's threats.",
    related: ["THEORY-012", "TRAP-008", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-034",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Danish Gambit trap idea?",
    level: "Intermediate",
    keywords: ["Danish Gambit", "gambit", "development"],
    questions: [
      "What is the Danish Gambit?",
      "What makes Danish Gambit positions tactical?"
    ],
    short_answer: "The Danish Gambit sacrifices one or more pawns for rapid development and open lines.",
    answer: "The resulting activity can create tactical opportunities if Black fails to coordinate the pieces.",
    example: "White may have several developed pieces while Black is still trying to organize the position.",
    related: ["THEORY-008", "TRAP-008", "OPENING-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-035",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the Evans Gambit trap idea?",
    level: "Intermediate",
    keywords: ["Evans Gambit", "Italian Game", "gambit"],
    questions: [
      "What is the Evans Gambit?",
      "Why does the Evans Gambit create tactical chances?"
    ],
    short_answer: "The Evans Gambit sacrifices the b-pawn to accelerate development and attack the center.",
    answer: "White gains tempi against Black's bishop and creates active lines for the pieces.",
    example: "The open center and rapid development can make Black's king vulnerable.",
    related: ["THEORY-005", "TRAP-008", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-036",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Gambit Traps",
    title: "What is the King's Gambit trap idea?",
    level: "Intermediate",
    keywords: ["King's Gambit", "gambit", "attack"],
    questions: [
      "Why can the King's Gambit create traps?",
      "What is dangerous about accepting the King's Gambit?"
    ],
    short_answer: "The King's Gambit opens lines and gives White rapid attacking chances after sacrificing the f-pawn.",
    answer: "Black must develop carefully because open lines can point directly toward the king.",
    example: "Accepting the pawn without understanding the resulting position can lead to a dangerous initiative.",
    related: ["THEORY-010", "TRAP-008", "ATTACK-001"],
    source: "Established opening theory",
    verified: true
  },

  {
    id: "TRAP-037",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Queen Traps",
    title: "How does an early queen move create a trap?",
    level: "Beginner",
    keywords: ["early queen", "queen trap", "development"],
    questions: [
      "Why can moving the queen early be dangerous?",
      "How can an early queen move become a trap?"
    ],
    short_answer: "The queen can become a target for developing pieces and lose valuable tempi.",
    answer: "Knights and bishops can attack the queen while developing at the same time.",
    example: "A queen may move several times while the opponent develops three or four pieces.",
    related: ["OPENING-010", "OPENING-021", "TRAP-006"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-038",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Queen Traps",
    title: "What is the Noah's Ark Trap?",
    level: "Intermediate",
    keywords: ["Noah's Ark", "Ruy Lopez", "bishop"],
    questions: [
      "What is the Noah's Ark Trap?",
      "Which opening contains the Noah's Ark Trap?"
    ],
    short_answer: "The Noah's Ark Trap is a famous Ruy Lopez motif in which Black traps White's bishop using pawns.",
    answer: "Black's queenside pawn advances can restrict the bishop's escape squares.",
    example: "The bishop on b5 can become trapped after a sequence involving ...a6, ...b5 and further pawn advances.",
    related: ["THEORY-004", "TRAP-006", "TACTIC-001"],
    source: "Established opening pattern",
    verified: true
  },

  {
    id: "TRAP-039",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Queen Traps",
    title: "What is the Fishing Pole Trap?",
    level: "Intermediate",
    keywords: ["Fishing Pole", "Ruy Lopez", "knight"],
    questions: [
      "What is the Fishing Pole Trap?",
      "Why is it called a fishing pole?"
    ],
    short_answer: "The Fishing Pole is a tactical trap associated with the Berlin Defense of the Ruy Lopez.",
    answer: "Black uses a knight on g4 and a rook or king-side pressure to tempt White into accepting material or weakening the king.",
    example: "The knight can act as bait while Black prepares a strong kingside attack.",
    related: ["THEORY-004", "ATTACK-020", "TRAP-008"],
    source: "Established opening pattern",
    verified: true
  },

  {
    id: "TRAP-040",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Queen Traps",
    title: "What is the Rubinstein Trap?",
    level: "Intermediate",
    keywords: ["Rubinstein Trap", "Four Knights", "trap"],
    questions: [
      "What is the Rubinstein Trap?",
      "Where does the Rubinstein Trap occur?"
    ],
    short_answer: "The Rubinstein Trap is a tactical opening sequence associated with the Four Knights Game.",
    answer: "It demonstrates how a natural-looking pawn or piece capture can allow a tactical response.",
    example: "The trap is useful for learning to check tactical consequences before accepting material.",
    related: ["THEORY-006", "TRAP-003", "TACTIC-001"],
    source: "Established opening pattern",
    verified: true
  },

  {
    id: "TRAP-041",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "What is the biggest opening trap?",
    level: "Beginner",
    keywords: ["opening mistake", "trap", "development"],
    questions: [
      "What is the most common opening trap?",
      "What opening mistake causes the most problems?"
    ],
    short_answer: "One of the biggest practical traps is playing automatically without checking the opponent's threats.",
    answer: "A familiar opening does not guarantee safety. Every move changes the tactical position.",
    example: "Knowing an opening line does not help if the opponent deviates and creates a new tactical threat.",
    related: ["THINK-001", "MISTAKE-001", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-042",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Why is greed a common opening trap?",
    level: "Beginner",
    keywords: ["greed", "pawn", "trap"],
    questions: [
      "Why does greed lead to opening traps?",
      "Why shouldn't I take every free pawn?"
    ],
    short_answer: "A free pawn may cost development, king safety, or tactical control.",
    answer: "Before capturing, check whether the pawn is actually safe and what the opponent gains from the capture.",
    example: "A pawn on b2 may be poisoned because the queen can become trapped after taking it.",
    related: ["TRAP-005", "THINK-010", "OPENING-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-043",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Can developing too quickly cause a trap?",
    level: "Intermediate",
    keywords: ["development", "tempo", "trap"],
    questions: [
      "Can development itself become a trap?",
      "Can a developing move be tactically bad?"
    ],
    short_answer: "Yes. Development is good, but a developing piece can become a tactical target if moved carelessly.",
    answer: "Good development still requires attention to checks, captures, threats, and tactical details.",
    example: "A knight may develop to a square where an opponent can attack it with tempo.",
    related: ["OPENING-009", "THINK-010", "TACTIC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-044",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Can castling into a trap be dangerous?",
    level: "Intermediate",
    keywords: ["castling", "king safety", "trap"],
    questions: [
      "Can castling itself lead to a trap?",
      "Should I always castle immediately?"
    ],
    short_answer: "Castling is usually valuable, but you should consider whether the destination square is safe.",
    answer: "The opponent may already have an attack prepared on the side where you intend to castle.",
    example: "If several enemy pieces are aimed at the kingside, castling there may require careful calculation.",
    related: ["OPENING-022", "ATTACK-001", "RULE-028"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-045",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Why is moving the same piece repeatedly risky?",
    level: "Beginner",
    keywords: ["same piece", "development", "tempo"],
    questions: [
      "Why is moving one piece repeatedly dangerous?",
      "Can repeated piece moves create a trap?"
    ],
    short_answer: "Repeated moves can lose development time and allow the opponent to build a strong position.",
    answer: "The opponent may use each tempo to develop, control the center, or create threats.",
    example: "A knight that moves three times in the opening may fall behind several developed enemy pieces.",
    related: ["OPENING-009", "OPENING-010", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-046",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Why is an early bishop sortie sometimes a trap?",
    level: "Intermediate",
    keywords: ["bishop", "opening", "tempo"],
    questions: [
      "Can an early bishop move be a trap?",
      "Why can a bishop become a target?"
    ],
    short_answer: "An early bishop sortie can lose tempi if pawns attack it repeatedly.",
    answer: "The bishop may have to retreat while the opponent develops pieces.",
    example: "A bishop that ventures too far into enemy territory can become trapped by pawns.",
    related: ["OPENING-010", "TRAP-045", "TRAP-038"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-047",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "Why can grabbing a second pawn be dangerous?",
    level: "Intermediate",
    keywords: ["pawn grabbing", "greed", "trap"],
    questions: [
      "Why is taking a second pawn dangerous?",
      "Should I stop taking pawns after winning one?"
    ],
    short_answer: "A second pawn may cost valuable tempi and allow the opponent to open lines or attack your queen.",
    answer: "Material gains must be compared with development and king safety.",
    example: "A queen that captures several pawns may become trapped far from home.",
    related: ["TRAP-005", "TRAP-042", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-048",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Opening Mistakes",
    title: "What is an opening blunder?",
    level: "Beginner",
    keywords: ["blunder", "opening", "mistake"],
    questions: [
      "What is an opening blunder?",
      "How is a blunder different from a trap?"
    ],
    short_answer: "A blunder is a serious mistake; a trap is a sequence designed to encourage or exploit such a mistake.",
    answer: "A player can blunder without falling into a prepared trap.",
    example: "Leaving a piece en prise may simply be a blunder rather than an opening trap.",
    related: ["MISTAKE-001", "TRAP-001", "TACTIC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-049",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Surprise Weapons",
    title: "What is a surprise weapon?",
    level: "Intermediate",
    keywords: ["surprise weapon", "opening", "preparation"],
    questions: [
      "What is a chess surprise weapon?",
      "Why do players use surprise openings?"
    ],
    short_answer: "A surprise weapon is a playable opening choice used to take an opponent away from familiar preparation.",
    answer: "Its value comes from practical surprise, not necessarily from being objectively stronger.",
    example: "A player may choose a less common variation against a well-prepared opponent.",
    related: ["THEORY-078", "THEORY-083", "TOURNAMENT-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-050",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Surprise Weapons",
    title: "What makes a good surprise opening?",
    level: "Intermediate",
    keywords: ["surprise opening", "repertoire", "practical"],
    questions: [
      "What makes a surprise weapon effective?",
      "How should I choose a surprise opening?"
    ],
    short_answer: "It should be sound enough to play, easy for you to understand, and uncomfortable for the opponent.",
    answer: "A surprise that gives you a bad position is not useful simply because it is unusual.",
    example: "Choose a secondary variation you have studied rather than an unsound trap you have never played.",
    related: ["TRAP-049", "THEORY-083", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-051",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Surprise Weapons",
    title: "What is a sideline trap?",
    level: "Intermediate",
    keywords: ["sideline", "trap", "opening"],
    questions: [
      "What is a sideline trap?",
      "Why can a rare opening variation be dangerous?"
    ],
    short_answer: "A sideline trap occurs in a less common variation where the opponent may be unfamiliar with the tactical ideas.",
    answer: "The surprise factor can cause practical mistakes even when the line is not objectively dangerous.",
    example: "A rare move may force the opponent to calculate from the beginning instead of relying on memory.",
    related: ["TRAP-049", "THEORY-083", "THINK-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-052",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Surprise Weapons",
    title: "Can a quiet opening be a surprise weapon?",
    level: "Intermediate",
    keywords: ["quiet opening", "surprise", "system"],
    questions: [
      "Can quiet openings surprise opponents?",
      "Does a surprise weapon need to be aggressive?"
    ],
    short_answer: "Yes. A quiet system can be a strong surprise if it creates positions your opponent dislikes.",
    answer: "Surprise comes from unfamiliarity and practical difficulty, not only from tactical aggression.",
    example: "A solid setup can force an opponent to solve positional problems without prepared theory.",
    related: ["TRAP-049", "THEORY-074", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-053",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Surprise Weapons",
    title: "Should a surprise weapon be objectively sound?",
    level: "Intermediate",
    keywords: ["soundness", "surprise weapon", "opening"],
    questions: [
      "Does a surprise opening need to be sound?",
      "Can I play an objectively inferior opening as a surprise?"
    ],
    short_answer: "It should ideally be sound or at least practically defensible at your playing level.",
    answer: "A surprise factor cannot permanently compensate for a strategically or tactically losing position.",
    example: "An unusual but playable variation is generally better than a dubious trap.",
    related: ["TRAP-050", "THEORY-083", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-054",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "How do you avoid opening traps?",
    level: "Beginner",
    keywords: ["avoid traps", "defense", "opening"],
    questions: [
      "How can I avoid opening traps?",
      "What should I do when I suspect a trap?"
    ],
    short_answer: "Slow down, check forcing moves, and ask what the opponent wants.",
    answer: "Before capturing or making a natural move, examine checks, captures, threats, and tactical weaknesses.",
    example: "If an opponent offers a free pawn, first ask why the pawn is apparently free.",
    related: ["THINK-001", "THINK-010", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-055",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "What is the best defense against a trap?",
    level: "Beginner",
    keywords: ["defense", "trap", "calculation"],
    questions: [
      "What is the best way to defend against a trap?",
      "How should I react when I see a trap?"
    ],
    short_answer: "Calculate the position instead of trying to remember the trap name.",
    answer: "The board position matters more than the label. Look for legal moves, tactical threats, and safe alternatives.",
    example: "If you recognize a known trap, compare the current position with the actual tactical sequence.",
    related: ["TRAP-054", "CALC-001", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-056",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "Should you accept an offered pawn?",
    level: "Beginner",
    keywords: ["pawn", "capture", "trap"],
    questions: [
      "Should I take an offered pawn?",
      "How do I know whether a pawn is safe to capture?"
    ],
    short_answer: "Take it only after checking the opponent's tactical and positional compensation.",
    answer: "Ask whether the capture exposes your queen, delays development, weakens your king, or opens lines against you.",
    example: "A pawn may be safe to take if you can return it later while maintaining a healthy position.",
    related: ["TRAP-042", "TRAP-005", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-057",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "Should you avoid all opening traps?",
    level: "Intermediate",
    keywords: ["traps", "opening", "defense"],
    questions: [
      "Should I avoid every opening trap?",
      "Can I play a sharp opening safely?"
    ],
    short_answer: "You do not need to avoid sharp openings; you need to understand their tactical ideas.",
    answer: "Sharp openings can be excellent when you know the risks, typical tactics, and resulting positions.",
    example: "A prepared gambit is much safer than a random trap learned from a short video.",
    related: ["TRAP-050", "THEORY-078", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-058",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "What if the opponent plays an unfamiliar opening move?",
    level: "Beginner",
    keywords: ["unfamiliar move", "opening", "calculation"],
    questions: [
      "What should I do against an unusual opening move?",
      "How should I respond to an unfamiliar move?"
    ],
    short_answer: "Do not panic; evaluate the move using basic principles and tactical calculation.",
    answer: "Ask whether the move controls the center, develops a piece, creates a threat, or weakens something.",
    example: "Against a strange pawn move, develop naturally while checking whether it creates a tactical threat.",
    related: ["THINK-001", "OPENING-060", "TRAP-051"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-059",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "What is the danger of playing only by opening memory?",
    level: "Intermediate",
    keywords: ["opening memory", "calculation", "trap"],
    questions: [
      "Can opening memory cause mistakes?",
      "Why is memorizing moves not enough?"
    ],
    short_answer: "Yes. Memorized moves can fail when the opponent deviates.",
    answer: "You must understand the position well enough to find good moves when the game leaves your preparation.",
    example: "If your opponent plays an unusual move on move six, calculation becomes more important than memory.",
    related: ["THEORY-078", "THINK-001", "OPENING-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-060",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Practical Defense",
    title: "What is the best habit for avoiding traps?",
    level: "Beginner",
    keywords: ["habit", "opening", "calculation"],
    questions: [
      "What habit helps prevent opening traps?",
      "What should I check before every opening move?"
    ],
    short_answer: "After your opponent moves, ask: What changed and what is the threat?",
    answer: "This simple habit prevents many automatic moves and reveals tactical ideas early.",
    example: "If a bishop attacks your knight after a pawn move, do not continue your plan without addressing the new threat.",
    related: ["THINK-001", "THINK-010", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-061",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Trap Recognition",
    title: "What signs indicate an opening trap?",
    level: "Beginner",
    keywords: ["trap recognition", "opening", "warning signs"],
    questions: [
      "How can I recognize an opening trap?",
      "What are warning signs of a trap?"
    ],
    short_answer: "Look for unexplained free material, repeated attacks, exposed queens, and forcing moves.",
    answer: "If a move seems too good to be true, calculate why the opponent is allowing it.",
    example: "A completely undefended queen-side pawn may be bait if taking it exposes your queen to attacks.",
    related: ["TRAP-042", "TRAP-054", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-062",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Trap Recognition",
    title: "Why are forcing moves important in traps?",
    level: "Beginner",
    keywords: ["forcing moves", "checks", "captures", "threats"],
    questions: [
      "Why do traps often use forcing moves?",
      "Which moves should I calculate first?"
    ],
    short_answer: "Checks, captures, and direct threats limit the opponent's choices and make tactical traps possible.",
    answer: "Forcing moves reduce the defender's options and can create a sequence that must be answered accurately.",
    example: "A check can force the king to a square where a follow-up attack becomes possible.",
    related: ["TACTIC-001", "THINK-010", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-063",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Trap Recognition",
    title: "Can a trap work without a sacrifice?",
    level: "Beginner",
    keywords: ["trap", "sacrifice", "tactics"],
    questions: [
      "Does every trap require a sacrifice?",
      "Can a simple move create a trap?"
    ],
    short_answer: "No. Many traps win material without sacrificing anything.",
    answer: "A trap can exploit a pinned piece, overloaded defender, trapped queen, or weak square.",
    example: "A developing move that attacks the queen while creating a second threat can form a simple trap.",
    related: ["TRAP-006", "TACTIC-020", "TACTIC-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-064",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Trap Recognition",
    title: "Can a trap win only a pawn?",
    level: "Beginner",
    keywords: ["pawn", "trap", "material"],
    questions: [
      "Can an opening trap win just a pawn?",
      "Is winning one pawn from a trap important?"
    ],
    short_answer: "Yes. A trap can produce a small material advantage rather than a decisive win.",
    answer: "The value of the trap depends on the resulting position, development, king safety, and initiative.",
    example: "Winning a pawn while losing several tempi may not be a real advantage.",
    related: ["BASIC-015", "OPENING-010", "POSITION-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-065",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Trap Recognition",
    title: "Can a trap fail even when the opponent knows it?",
    level: "Intermediate",
    keywords: ["trap", "preparation", "opening"],
    questions: [
      "What happens if my opponent knows my trap?",
      "Can an opening trap still work when known?"
    ],
    short_answer: "Usually the trap loses much of its surprise value when the opponent knows the correct defense.",
    answer: "A sound opening should still give you a playable position even when the opponent avoids the trap.",
    example: "A good surprise weapon should have a useful position after the opponent chooses the safest move.",
    related: ["TRAP-050", "TRAP-053", "THEORY-083"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-066",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Training",
    title: "How should beginners study opening traps?",
    level: "Beginner",
    keywords: ["training", "traps", "beginner"],
    questions: [
      "How should a beginner learn opening traps?",
      "What is the best way to practice traps?"
    ],
    short_answer: "Study the position, understand the tactical idea, and practice finding the defense.",
    answer: "Do not only memorize the winning sequence; learn how to recognize the warning signs.",
    example: "Set the trap position on a board and practice both the attacking move and the correct defense.",
    related: ["TRAIN-001", "PUZZLE-001", "TRAP-054"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-067",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Training",
    title: "Should you practice traps from both sides?",
    level: "Intermediate",
    keywords: ["training", "both sides", "trap"],
    questions: [
      "Should I learn an opening trap from both sides?",
      "Why study the defender's side?"
    ],
    short_answer: "Yes. Knowing the defensive idea makes the trap easier to recognize and avoid.",
    answer: "Studying both sides also helps you understand when the trap is actually sound.",
    example: "If you know the defender's best response, you will know whether your trap depends on an error.",
    related: ["TRAP-054", "TRAIN-010", "THEORY-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-068",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Training",
    title: "What is the best way to remember an opening trap?",
    level: "Beginner",
    keywords: ["memory", "trap", "training"],
    questions: [
      "How can I remember opening traps?",
      "What should I memorize from a trap?"
    ],
    short_answer: "Remember the position, tactical trigger, and key idea rather than every move.",
    answer: "Understanding the pattern creates more durable memory than memorizing a move list.",
    example: "Remember that an unprotected queen becomes vulnerable after a developing attack rather than only memorizing move numbers.",
    related: ["TRAP-002", "TRAIN-001", "THEORY-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-069",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Training",
    title: "Can opening traps improve tactical vision?",
    level: "Intermediate",
    keywords: ["tactical vision", "traps", "training"],
    questions: [
      "Do opening traps help tactical training?",
      "Can studying traps improve calculation?"
    ],
    short_answer: "Yes. Good trap study teaches you to notice tactical patterns and forcing moves early.",
    answer: "The benefit is greatest when you solve the position rather than simply watch the solution.",
    example: "Pause before the trap move and try to find the opponent's best defense yourself.",
    related: ["TACTIC-001", "TRAIN-010", "PUZZLE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TRAP-070",
    type: "OPENING_TRAP",
    category: "Opening Traps",
    topic: "Opening Traps & Surprises",
    subtopic: "Final Principles",
    title: "What is the golden rule of opening traps?",
    level: "Beginner",
    keywords: ["golden rule", "opening traps", "principles"],
    questions: [
      "What is the golden rule for opening traps?",
      "What should I remember about opening traps?"
    ],
    short_answer: "Do not play for traps at the cost of sound chess.",
    answer: "Develop pieces, protect your king, control the center, and calculate tactics. A trap is a bonus, not a complete opening strategy.",
    example: "If your trap fails but you still have a healthy position, your opening choice has practical value.",
    related: ["OPENING-060", "TRAP-050", "THINK-001"],
    source: "Chess coaching principles",
    verified: true
  }
];

export default openingTrapsSurprises;