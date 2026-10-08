const openingTheoryRepertoire = [
  {
    id: "THEORY-001",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Open Games",
    title: "What is an open game?",
    level: "Beginner",
    keywords: ["open game", "1.e4", "opening"],
    questions: [
      "What is an open game in chess?",
      "Which openings are called open games?"
    ],
    short_answer: "Open games usually begin with 1.e4 e5.",
    answer: "They often lead to open lines and active piece play.",
    example: "The Italian Game and Ruy Lopez are classic open games.",
    related: ["THEORY-002", "THEORY-003"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-002",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Italian Game",
    title: "What is the Italian Game?",
    level: "Beginner",
    keywords: ["Italian Game", "1.e4", "Bc4"],
    questions: [
      "What is the Italian Game?",
      "How does the Italian Game begin?"
    ],
    short_answer: "The Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4.",
    answer: "It develops quickly and often focuses on central control and king safety.",
    example: "1.e4 e5 2.Nf3 Nc6 3.Bc4 is the basic Italian setup.",
    related: ["THEORY-001", "THEORY-004"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-003",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Ruy Lopez",
    title: "What is the Ruy Lopez?",
    level: "Intermediate",
    keywords: ["Ruy Lopez", "Spanish Opening", "Bb5"],
    questions: [
      "What is the Ruy Lopez?",
      "How does the Spanish Opening begin?"
    ],
    short_answer: "The Ruy Lopez begins 1.e4 e5 2.Nf3 Nc6 3.Bb5.",
    answer: "White develops actively and puts pressure on the knight defending e5.",
    example: "1.e4 e5 2.Nf3 Nc6 3.Bb5 is the Ruy Lopez.",
    related: ["THEORY-001", "THEORY-005"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-004",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Scotch Game",
    title: "What is the Scotch Game?",
    level: "Intermediate",
    keywords: ["Scotch Game", "1.e4", "d4"],
    questions: [
      "What is the Scotch Game?",
      "How does the Scotch Game start?"
    ],
    short_answer: "The Scotch Game begins 1.e4 e5 2.Nf3 Nc6 3.d4.",
    answer: "White immediately challenges the center and usually creates active play.",
    example: "3.d4 is the defining move of the Scotch Game.",
    related: ["THEORY-001", "THEORY-006"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-005",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Four Knights",
    title: "What is the Four Knights Game?",
    level: "Beginner",
    keywords: ["Four Knights", "Nc3", "Nf6"],
    questions: [
      "What is the Four Knights Game?",
      "How does the Four Knights Game begin?"
    ],
    short_answer: "A common Four Knights setup is 1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6.",
    answer: "Both sides develop knights naturally and contest the center.",
    example: "After 3...Nf6, all four knights have been developed.",
    related: ["THEORY-002", "THEORY-007"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-006",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Vienna Game",
    title: "What is the Vienna Game?",
    level: "Intermediate",
    keywords: ["Vienna Game", "1.e4", "Nc3"],
    questions: [
      "What is the Vienna Game?",
      "How does the Vienna Game begin?"
    ],
    short_answer: "The Vienna Game commonly begins 1.e4 e5 2.Nc3.",
    answer: "White develops the knight before playing Nf3 and can choose several attacking setups.",
    example: "1.e4 e5 2.Nc3 is the basic Vienna move order.",
    related: ["THEORY-005", "THEORY-008"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-007",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "King's Gambit",
    title: "What is the King's Gambit?",
    level: "Intermediate",
    keywords: ["King's Gambit", "gambit", "1.e4"],
    questions: [
      "What is the King's Gambit?",
      "How does the King's Gambit begin?"
    ],
    short_answer: "The King's Gambit begins 1.e4 e5 2.f4.",
    answer: "White offers the f-pawn to gain central influence and attacking chances.",
    example: "2.f4 challenges Black's e5-pawn.",
    related: ["THEORY-001", "THEORY-009"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-008",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Petrov Defense",
    title: "What is the Petrov Defense?",
    level: "Intermediate",
    keywords: ["Petrov", "Russian Defense", "Nf6"],
    questions: [
      "What is the Petrov Defense?",
      "How does the Petrov Defense begin?"
    ],
    short_answer: "The Petrov Defense begins 1.e4 e5 2.Nf3 Nf6.",
    answer: "Black immediately attacks White's e4-pawn and often seeks solid equality.",
    example: "2...Nf6 is the defining Petrov move.",
    related: ["THEORY-001", "THEORY-010"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-009",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Philidor Defense",
    title: "What is the Philidor Defense?",
    level: "Intermediate",
    keywords: ["Philidor", "Defense", "1.e4"],
    questions: [
      "What is the Philidor Defense?",
      "How does the Philidor Defense begin?"
    ],
    short_answer: "The Philidor Defense begins 1.e4 e5 2.Nf3 d6.",
    answer: "Black supports the e5-pawn and prepares a solid but somewhat passive setup.",
    example: "2...d6 protects e5 directly.",
    related: ["THEORY-001", "THEORY-011"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-010",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Defense",
    title: "What is the Sicilian Defense?",
    level: "Beginner",
    keywords: ["Sicilian Defense", "1.e4", "c5"],
    questions: [
      "What is the Sicilian Defense?",
      "How does the Sicilian Defense begin?"
    ],
    short_answer: "The Sicilian Defense begins 1.e4 c5.",
    answer: "Black avoids symmetry and creates an unbalanced fight for the center.",
    example: "1.e4 c5 is the basic Sicilian move order.",
    related: ["THEORY-012", "THEORY-013"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-011",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Pirc Defense",
    title: "What is the Pirc Defense?",
    level: "Intermediate",
    keywords: ["Pirc", "Defense", "g6"],
    questions: [
      "What is the Pirc Defense?",
      "How does the Pirc Defense usually begin?"
    ],
    short_answer: "The Pirc commonly begins 1.e4 d6 2.d4 Nf6 3.Nc3 g6.",
    answer: "Black allows White a broad center and plans to challenge it later.",
    example: "The ...g6 setup prepares a kingside fianchetto.",
    related: ["THEORY-014", "THEORY-010"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-012",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Modern Defense",
    title: "What is the Modern Defense?",
    level: "Intermediate",
    keywords: ["Modern Defense", "g6", "opening"],
    questions: [
      "What is the Modern Defense?",
      "What is Black's basic idea in the Modern?"
    ],
    short_answer: "The Modern Defense allows White central space while Black develops the dark-squared bishop to g7.",
    answer: "Black plans to challenge White's center later rather than immediately occupying it.",
    example: "1.e4 g6 can lead to a Modern Defense setup.",
    related: ["THEORY-011", "THEORY-015"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-013",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Alekhine Defense",
    title: "What is the Alekhine Defense?",
    level: "Intermediate",
    keywords: ["Alekhine", "Defense", "Nf6"],
    questions: [
      "What is the Alekhine Defense?",
      "How does the Alekhine begin?"
    ],
    short_answer: "The Alekhine Defense begins 1.e4 Nf6.",
    answer: "Black attacks the e4-pawn and encourages White to advance it.",
    example: "1.e4 Nf6 is the Alekhine Defense.",
    related: ["THEORY-010", "THEORY-016"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-014",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Scandinavian Defense",
    title: "What is the Scandinavian Defense?",
    level: "Beginner",
    keywords: ["Scandinavian", "Defense", "1...d5"],
    questions: [
      "What is the Scandinavian Defense?",
      "How does the Scandinavian begin?"
    ],
    short_answer: "The Scandinavian Defense begins 1.e4 d5.",
    answer: "Black immediately challenges the e4-pawn instead of allowing White to build a classical center.",
    example: "1.e4 d5 2.exd5 is the main starting exchange.",
    related: ["THEORY-010", "THEORY-017"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-015",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "French Defense",
    title: "What is the French Defense?",
    level: "Beginner",
    keywords: ["French Defense", "1.e4", "e6"],
    questions: [
      "What is the French Defense?",
      "How does the French Defense begin?"
    ],
    short_answer: "The French Defense begins 1.e4 e6.",
    answer: "Black prepares ...d5 and challenges White's center.",
    example: "1.e4 e6 2.d4 d5 is the classical French structure.",
    related: ["THEORY-018", "THEORY-019"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-016",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Caro-Kann",
    title: "What is the Caro-Kann Defense?",
    level: "Beginner",
    keywords: ["Caro-Kann", "Defense", "c6"],
    questions: [
      "What is the Caro-Kann?",
      "How does the Caro-Kann begin?"
    ],
    short_answer: "The Caro-Kann begins 1.e4 c6.",
    answer: "Black prepares ...d5 while aiming for a solid pawn structure.",
    example: "1.e4 c6 2.d4 d5 is the classical Caro-Kann structure.",
    related: ["THEORY-015", "THEORY-020"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-017",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Gambit",
    title: "What is the Queen's Gambit?",
    level: "Beginner",
    keywords: ["Queen's Gambit", "1.d4", "c4"],
    questions: [
      "What is the Queen's Gambit?",
      "How does the Queen's Gambit begin?"
    ],
    short_answer: "The Queen's Gambit begins 1.d4 d5 2.c4.",
    answer: "White challenges Black's central d5-pawn and seeks central influence.",
    example: "1.d4 d5 2.c4 is the Queen's Gambit.",
    related: ["THEORY-021", "THEORY-022"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-018",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Gambit Declined",
    title: "What is the Queen's Gambit Declined?",
    level: "Intermediate",
    keywords: ["QGD", "Queen's Gambit", "d5"],
    questions: [
      "What is the Queen's Gambit Declined?",
      "How does the QGD begin?"
    ],
    short_answer: "The Queen's Gambit Declined commonly begins 1.d4 d5 2.c4 e6.",
    answer: "Black supports the d5-pawn with ...e6 and maintains a solid central structure.",
    example: "2...e6 defines the basic QGD setup.",
    related: ["THEORY-017", "THEORY-023"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-019",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Gambit Accepted",
    title: "What is the Queen's Gambit Accepted?",
    level: "Intermediate",
    keywords: ["QGA", "Queen's Gambit", "c4"],
    questions: [
      "What is the Queen's Gambit Accepted?",
      "What happens in the QGA?"
    ],
    short_answer: "In the QGA, Black accepts the c4-pawn with ...dxc4.",
    answer: "Black temporarily gives up the central pawn while seeking active development and later recovery of material.",
    example: "1.d4 d5 2.c4 dxc4 is the Queen's Gambit Accepted.",
    related: ["THEORY-017", "THEORY-024"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-020",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Slav Defense",
    title: "What is the Slav Defense?",
    level: "Intermediate",
    keywords: ["Slav", "Defense", "c6"],
    questions: [
      "What is the Slav Defense?",
      "How does the Slav usually begin?"
    ],
    short_answer: "The Slav Defense commonly begins 1.d4 d5 2.c4 c6.",
    answer: "Black supports d5 with ...c6 while keeping the c8 bishop's diagonal more flexible than in the QGD.",
    example: "2...c6 creates the basic Slav structure.",
    related: ["THEORY-018", "THEORY-025"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-021",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "London System",
    title: "What is the London System?",
    level: "Beginner",
    keywords: ["London System", "d4", "Bf4"],
    questions: [
      "What is the London System?",
      "What is White's typical setup in the London?"
    ],
    short_answer: "The London System is a 1.d4-based system often featuring Bf4 and a solid central setup.",
    answer: "White often develops the dark-squared bishop before playing e3.",
    example: "A common setup is d4, Nf3, Bf4, e3, and Bd3.",
    related: ["THEORY-017", "THEORY-026"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-022",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Colle System",
    title: "What is the Colle System?",
    level: "Beginner",
    keywords: ["Colle", "System", "d4"],
    questions: [
      "What is the Colle System?",
      "What is White's basic Colle setup?"
    ],
    short_answer: "The Colle is a 1.d4 system often built around Nf3, e3, Bd3, and a later e4 break.",
    answer: "It emphasizes a solid setup and a central kingside attack in suitable positions.",
    example: "White may play d4, Nf3, e3, Bd3, and O-O.",
    related: ["THEORY-021", "THEORY-027"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-023",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Trompowsky",
    title: "What is the Trompowsky Attack?",
    level: "Intermediate",
    keywords: ["Trompowsky", "Bg5", "d4"],
    questions: [
      "What is the Trompowsky Attack?",
      "How does the Trompowsky begin?"
    ],
    short_answer: "The Trompowsky commonly begins 1.d4 Nf6 2.Bg5.",
    answer: "White immediately pins or challenges the knight and can create unusual structures.",
    example: "2.Bg5 is the defining move.",
    related: ["THEORY-017", "THEORY-028"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-024",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Torre Attack",
    title: "What is the Torre Attack?",
    level: "Intermediate",
    keywords: ["Torre Attack", "Bg5", "d4"],
    questions: [
      "What is the Torre Attack?",
      "What is White's typical Torre setup?"
    ],
    short_answer: "The Torre Attack is a 1.d4 system often featuring Nf3 and Bg5.",
    answer: "White develops actively while keeping the central structure flexible.",
    example: "1.d4 Nf6 2.Nf3 e6 3.Bg5 is a Torre-type setup.",
    related: ["THEORY-023", "THEORY-029"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-025",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Indian Defenses",
    title: "What is the Nimzo-Indian Defense?",
    level: "Intermediate",
    keywords: ["Nimzo-Indian", "Bb4", "d4"],
    questions: [
      "What is the Nimzo-Indian Defense?",
      "How does the Nimzo-Indian begin?"
    ],
    short_answer: "The Nimzo-Indian commonly begins 1.d4 Nf6 2.c4 e6 3.Nc3 Bb4.",
    answer: "Black pins the knight and fights for the center through piece pressure and pawn structure.",
    example: "3...Bb4 creates the defining Nimzo-Indian pin.",
    related: ["THEORY-030", "THEORY-031"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-026",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Indian",
    title: "What is the Queen's Indian Defense?",
    level: "Intermediate",
    keywords: ["Queen's Indian", "b6", "Bb7"],
    questions: [
      "What is the Queen's Indian Defense?",
      "What is Black's basic plan in the Queen's Indian?"
    ],
    short_answer: "The Queen's Indian commonly begins 1.d4 Nf6 2.c4 e6 3.Nf3 b6.",
    answer: "Black develops the queen bishop toward b7 and puts pressure on the center.",
    example: "The ...b6 and ...Bb7 setup is a key Queen's Indian idea.",
    related: ["THEORY-025", "THEORY-032"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-027",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "King's Indian",
    title: "What is the King's Indian Defense?",
    level: "Intermediate",
    keywords: ["King's Indian", "g6", "Bg7"],
    questions: [
      "What is the King's Indian Defense?",
      "What is Black's basic King's Indian setup?"
    ],
    short_answer: "Black commonly develops Nf6, g6, and Bg7 against 1.d4.",
    answer: "Black allows White central space and plans counterplay against it.",
    example: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 is a standard setup.",
    related: ["THEORY-011", "THEORY-033"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-028",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Grünfeld Defense",
    title: "What is the Grünfeld Defense?",
    level: "Intermediate",
    keywords: ["Grunfeld", "Grünfeld", "d5"],
    questions: [
      "What is the Grünfeld Defense?",
      "What is Black's main idea in the Grünfeld?"
    ],
    short_answer: "The Grünfeld allows White a large center and attacks it with piece pressure and ...d5.",
    answer: "Black aims for active counterplay rather than simply maintaining a static center.",
    example: "A typical Grünfeld setup includes ...Nf6, ...g6, ...Bg7, and ...d5.",
    related: ["THEORY-027", "THEORY-034"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-029",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Benoni",
    title: "What is the Benoni Defense?",
    level: "Intermediate",
    keywords: ["Benoni", "Benoni Defense", "c5"],
    questions: [
      "What is the Benoni Defense?",
      "What is the main idea of the Benoni?"
    ],
    short_answer: "The Benoni gives Black an asymmetrical pawn structure and active counterplay against White's center.",
    answer: "Black often accepts structural weaknesses in return for dynamic play.",
    example: "The Modern Benoni commonly arises after 1.d4 Nf6 2.c4 c5 3.d5 e6.",
    related: ["THEORY-027", "THEORY-035"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-030",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Benko Gambit",
    title: "What is the Benko Gambit?",
    level: "Intermediate",
    keywords: ["Benko Gambit", "b5", "gambit"],
    questions: [
      "What is the Benko Gambit?",
      "What does Black sacrifice in the Benko?"
    ],
    short_answer: "Black gives up a pawn to obtain long-term queenside pressure and active rook play.",
    answer: "The gambit is especially associated with pressure on the a- and b-files.",
    example: "The Benko often arises after ...b5 and cxb5 a6.",
    related: ["THEORY-029", "THEORY-036"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-031",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Bogo-Indian",
    title: "What is the Bogo-Indian Defense?",
    level: "Intermediate",
    keywords: ["Bogo-Indian", "Bb4", "e6"],
    questions: [
      "What is the Bogo-Indian Defense?",
      "How does the Bogo-Indian develop Black's bishop?"
    ],
    short_answer: "The Bogo-Indian commonly features ...Bb4+ against White's king knight.",
    answer: "Black uses development and pressure rather than allowing the Nimzo-Indian structure.",
    example: "1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ is a Bogo-Indian setup.",
    related: ["THEORY-025", "THEORY-026"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-032",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Budapest Gambit",
    title: "What is the Budapest Gambit?",
    level: "Intermediate",
    keywords: ["Budapest Gambit", "gambit", "Nf6"],
    questions: [
      "What is the Budapest Gambit?",
      "How does the Budapest Gambit begin?"
    ],
    short_answer: "The Budapest Gambit begins 1.d4 Nf6 2.c4 e5.",
    answer: "Black sacrifices a pawn for rapid development and active piece play.",
    example: "2...e5 is the characteristic Budapest Gambit move.",
    related: ["THEORY-017", "THEORY-037"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-033",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Dutch Defense",
    title: "What is the Dutch Defense?",
    level: "Intermediate",
    keywords: ["Dutch Defense", "f5", "1.d4"],
    questions: [
      "What is the Dutch Defense?",
      "How does the Dutch Defense begin?"
    ],
    short_answer: "The Dutch Defense begins 1.d4 f5.",
    answer: "Black immediately fights for e4 and seeks an unbalanced kingside-oriented position.",
    example: "1.d4 f5 is the Dutch Defense.",
    related: ["THEORY-017", "THEORY-038"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-034",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "English Opening",
    title: "What is the English Opening?",
    level: "Beginner",
    keywords: ["English Opening", "c4", "opening"],
    questions: [
      "What is the English Opening?",
      "How does the English Opening begin?"
    ],
    short_answer: "The English Opening begins 1.c4.",
    answer: "White controls central squares from the flank and can transpose into many structures.",
    example: "1.c4 can lead to English, reversed Sicilian, or other structures.",
    related: ["THEORY-035", "THEORY-039"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-035",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Réti",
    title: "What is the Réti Opening?",
    level: "Intermediate",
    keywords: ["Reti", "Réti", "Nf3"],
    questions: [
      "What is the Réti Opening?",
      "How does the Réti commonly begin?"
    ],
    short_answer: "The Réti commonly begins 1.Nf3 and uses flexible development and indirect central control.",
    answer: "White often fianchettoes a bishop and delays committing central pawns.",
    example: "1.Nf3 followed by g3 and Bg2 is a typical Réti setup.",
    related: ["THEORY-034", "THEORY-040"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-036",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Nimzo-Larsen",
    title: "What is the Nimzo-Larsen Attack?",
    level: "Intermediate",
    keywords: ["Nimzo-Larsen", "b3", "Bb2"],
    questions: [
      "What is the Nimzo-Larsen Attack?",
      "What is White's typical idea in the Nimzo-Larsen?"
    ],
    short_answer: "The Nimzo-Larsen commonly begins 1.b3 and prepares Bb2.",
    answer: "White develops the bishop on the long diagonal and controls the center from the flank.",
    example: "1.b3 followed by Bb2 is a typical setup.",
    related: ["THEORY-035", "THEORY-041"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-037",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Bird Opening",
    title: "What is Bird's Opening?",
    level: "Intermediate",
    keywords: ["Bird Opening", "f4", "opening"],
    questions: [
      "What is Bird's Opening?",
      "How does Bird's Opening begin?"
    ],
    short_answer: "Bird's Opening begins 1.f4.",
    answer: "White gains kingside space and controls e5 but accepts some king-safety considerations.",
    example: "1.f4 is the defining move.",
    related: ["THEORY-033", "THEORY-042"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-038",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Polish Opening",
    title: "What is the Polish Opening?",
    level: "Intermediate",
    keywords: ["Polish Opening", "1.b4", "Sokolsky"],
    questions: [
      "What is the Polish Opening?",
      "How does the Polish Opening begin?"
    ],
    short_answer: "The Polish Opening begins 1.b4.",
    answer: "It is also known as the Sokolsky Opening and immediately attacks the queenside structure.",
    example: "1.b4 is the characteristic Polish move.",
    related: ["THEORY-036", "THEORY-043"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-039",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "King's Indian Attack",
    title: "What is the King's Indian Attack?",
    level: "Intermediate",
    keywords: ["King's Indian Attack", "KIA", "Nf3"],
    questions: [
      "What is the King's Indian Attack?",
      "What is the typical KIA setup?"
    ],
    short_answer: "The King's Indian Attack is a flexible White system often featuring Nf3, g3, Bg2, and O-O.",
    answer: "White builds a kingside setup that can be used against many Black structures.",
    example: "Nf3, g3, Bg2, and O-O form a typical KIA setup.",
    related: ["THEORY-027", "THEORY-035"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-040",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Najdorf",
    title: "What is the Sicilian Najdorf?",
    level: "Intermediate",
    keywords: ["Najdorf", "Sicilian", "a6"],
    questions: [
      "What is the Najdorf Variation?",
      "How does the Sicilian Najdorf arise?"
    ],
    short_answer: "The Najdorf commonly arises after 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6.",
    answer: "Black uses ...a6 to control b5 and prepare flexible counterplay.",
    example: "5...a6 is the defining Najdorf move.",
    related: ["THEORY-010", "THEORY-041"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-041",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Dragon",
    title: "What is the Sicilian Dragon?",
    level: "Intermediate",
    keywords: ["Dragon", "Sicilian", "g6"],
    questions: [
      "What is the Sicilian Dragon?",
      "What is Black's setup in the Dragon?"
    ],
    short_answer: "The Dragon features ...g6 and a fianchettoed bishop on g7.",
    answer: "Black develops aggressively and often creates sharp opposite-wing attacking chances.",
    example: "The Dragon commonly arises after ...g6 and ...Bg7 in the Sicilian.",
    related: ["THEORY-010", "THEORY-042"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-042",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Accelerated Dragon",
    title: "What is the Accelerated Dragon?",
    level: "Intermediate",
    keywords: ["Accelerated Dragon", "Sicilian", "g6"],
    questions: [
      "What is the Accelerated Dragon?",
      "How is it different from the regular Dragon?"
    ],
    short_answer: "The Accelerated Dragon plays ...g6 earlier, before ...d6.",
    answer: "This allows Black to challenge the center with ...d5 under favorable circumstances.",
    example: "1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 is a typical move order.",
    related: ["THEORY-041", "THEORY-043"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-043",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Taimanov",
    title: "What is the Sicilian Taimanov?",
    level: "Intermediate",
    keywords: ["Taimanov", "Sicilian", "Nc6"],
    questions: [
      "What is the Sicilian Taimanov?",
      "What is Black's basic Taimanov setup?"
    ],
    short_answer: "The Taimanov develops the knight to c6 and often the queen knight to a flexible b8-a6 or e7 route.",
    answer: "Black combines solid development with flexible central and queenside plans.",
    example: "1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6 can lead to the Taimanov.",
    related: ["THEORY-010", "THEORY-044"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-044",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Kan",
    title: "What is the Sicilian Kan?",
    level: "Intermediate",
    keywords: ["Kan", "Sicilian", "a6"],
    questions: [
      "What is the Sicilian Kan?",
      "What is the main idea of the Kan?"
    ],
    short_answer: "The Kan uses ...e6 and often ...a6 with flexible development.",
    answer: "Black delays committing the knight to c6 and keeps several setup options.",
    example: "1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 is a Kan-type setup.",
    related: ["THEORY-043", "THEORY-045"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-045",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Scheveningen",
    title: "What is the Sicilian Scheveningen?",
    level: "Intermediate",
    keywords: ["Scheveningen", "Sicilian", "e6"],
    questions: [
      "What is the Scheveningen Sicilian?",
      "What is Black's typical Scheveningen setup?"
    ],
    short_answer: "The Scheveningen commonly uses ...e6 and ...d6, creating a strong pawn formation.",
    answer: "Black keeps a compact center and prepares active counterplay on the wings.",
    example: "A typical structure has Black pawns on e6 and d6.",
    related: ["THEORY-040", "THEORY-046"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-046",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Sveshnikov",
    title: "What is the Sicilian Sveshnikov?",
    level: "Advanced",
    keywords: ["Sveshnikov", "Sicilian", "e5"],
    questions: [
      "What is the Sveshnikov Sicilian?",
      "What is Black's main idea in the Sveshnikov?"
    ],
    short_answer: "The Sveshnikov creates an active position by playing ...e5 and accepting structural weaknesses.",
    answer: "Black gains activity and central control while accepting potential weaknesses such as the d5-square.",
    example: "The Sveshnikov is associated with the Sicilian sequence involving ...e5 and ...Nc6.",
    related: ["THEORY-010", "THEORY-047"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-047",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Classical",
    title: "What is the Sicilian Classical Variation?",
    level: "Intermediate",
    keywords: ["Classical Sicilian", "Sicilian", "Nc6"],
    questions: [
      "What is the Classical Sicilian?",
      "What is Black's typical setup in the Classical Sicilian?"
    ],
    short_answer: "The Classical Sicilian develops the knight to c6 and often the other knight to f6 without committing to ...e6 or ...g6 immediately.",
    answer: "It offers Black flexible development and central pressure.",
    example: "A typical setup features ...Nc6 and ...Nf6.",
    related: ["THEORY-010", "THEORY-045"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-048",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Alapin",
    title: "What is the Sicilian Alapin?",
    level: "Intermediate",
    keywords: ["Alapin", "Sicilian", "c3"],
    questions: [
      "What is the Alapin Variation?",
      "How does White play the Alapin against the Sicilian?"
    ],
    short_answer: "The Alapin begins 1.e4 c5 2.c3.",
    answer: "White prepares d4 and aims for a strong central pawn setup without entering many main Sicilian lines.",
    example: "2.c3 prepares d4 on the next move.",
    related: ["THEORY-010", "THEORY-049"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-049",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Rossolimo",
    title: "What is the Rossolimo Variation?",
    level: "Intermediate",
    keywords: ["Rossolimo", "Sicilian", "Bb5"],
    questions: [
      "What is the Rossolimo?",
      "How does the Rossolimo begin?"
    ],
    short_answer: "The Rossolimo commonly begins 1.e4 c5 2.Nf3 Nc6 3.Bb5.",
    answer: "White avoids many theoretical Open Sicilian positions and applies pressure with the bishop.",
    example: "3.Bb5 is the defining Rossolimo move.",
    related: ["THEORY-010", "THEORY-050"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-050",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Grand Prix",
    title: "What is the Grand Prix Attack?",
    level: "Intermediate",
    keywords: ["Grand Prix Attack", "Sicilian", "f4"],
    questions: [
      "What is the Grand Prix Attack?",
      "What is White's attacking idea in the Grand Prix?"
    ],
    short_answer: "The Grand Prix Attack uses an early f4 setup against the Sicilian.",
    answer: "White often aims for kingside space and attacking chances.",
    example: "An early f4 can prepare a kingside attack.",
    related: ["THEORY-010", "THEORY-051"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-051",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Sicilian Smith-Morra",
    title: "What is the Smith-Morra Gambit?",
    level: "Intermediate",
    keywords: ["Smith-Morra", "Sicilian", "gambit"],
    questions: [
      "What is the Smith-Morra Gambit?",
      "What does White sacrifice in the Smith-Morra?"
    ],
    short_answer: "The Smith-Morra begins 1.e4 c5 2.d4 cxd4 3.c3.",
    answer: "White offers the c-pawn for rapid development and active piece play.",
    example: "3.c3 is the characteristic Smith-Morra move.",
    related: ["THEORY-010", "THEORY-052"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-052",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "French Defense",
    title: "What is the French Advance Variation?",
    level: "Intermediate",
    keywords: ["French", "Advance", "e5"],
    questions: [
      "What is the Advance Variation of the French?",
      "How does White play the French Advance?"
    ],
    short_answer: "The Advance Variation begins 1.e4 e6 2.d4 d5 3.e5.",
    answer: "White gains space while Black plans to challenge the pawn chain.",
    example: "3.e5 creates the characteristic advanced white pawn chain.",
    related: ["THEORY-015", "THEORY-053"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-053",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "French Defense",
    title: "What is the French Tarrasch?",
    level: "Intermediate",
    keywords: ["French Tarrasch", "Nc3", "French"],
    questions: [
      "What is the French Tarrasch?",
      "How does the Tarrasch Variation begin?"
    ],
    short_answer: "The Tarrasch Variation commonly begins 1.e4 e6 2.d4 d5 3.Nd2.",
    answer: "White avoids some pinning ideas and keeps the option of c3.",
    example: "3.Nd2 is the defining move.",
    related: ["THEORY-015", "THEORY-054"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-054",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Caro-Kann",
    title: "What is the Caro-Kann Advance?",
    level: "Intermediate",
    keywords: ["Caro-Kann", "Advance", "e5"],
    questions: [
      "What is the Advance Variation of the Caro-Kann?",
      "How does White advance against the Caro-Kann?"
    ],
    short_answer: "The Advance Variation begins 1.e4 c6 2.d4 d5 3.e5.",
    answer: "White gains space while Black prepares to challenge the center.",
    example: "3.e5 is the defining Advance move.",
    related: ["THEORY-016", "THEORY-055"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-055",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Caro-Kann",
    title: "What is the Caro-Kann Classical Variation?",
    level: "Intermediate",
    keywords: ["Caro-Kann", "Classical", "Nc3"],
    questions: [
      "What is the Classical Caro-Kann?",
      "What is White's main setup in the Classical Caro-Kann?"
    ],
    short_answer: "The Classical Variation commonly uses 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4.",
    answer: "White develops actively while Black aims for a solid structure.",
    example: "Nc3 and Nxe4 are typical in the Classical structure.",
    related: ["THEORY-016", "THEORY-054"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-056",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Gambit",
    title: "What is the Queen's Gambit Accepted idea?",
    level: "Intermediate",
    keywords: ["QGA", "gambit", "d4"],
    questions: [
      "Why does Black accept the Queen's Gambit?",
      "What is Black trying to achieve in the QGA?"
    ],
    short_answer: "Black temporarily wins a pawn while aiming for development and central counterplay.",
    answer: "The pawn is often difficult to hold permanently without falling behind in development.",
    example: "After ...dxc4, Black develops quickly and may return the pawn to gain activity.",
    related: ["THEORY-019", "THEORY-057"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-057",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Queen's Gambit",
    title: "What is the QGD Orthodox setup?",
    level: "Intermediate",
    keywords: ["QGD", "Orthodox", "e6"],
    questions: [
      "What is the Orthodox Queen's Gambit Declined?",
      "What is the basic Orthodox QGD setup?"
    ],
    short_answer: "The Orthodox QGD uses ...e6, ...Be7, and often ...O-O with a solid central structure.",
    answer: "Black prioritizes a stable center and reliable development.",
    example: "A typical setup has pawns on d5 and e6 and a bishop developed to e7.",
    related: ["THEORY-018", "THEORY-058"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-058",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Semi-Slav",
    title: "What is the Semi-Slav Defense?",
    level: "Intermediate",
    keywords: ["Semi-Slav", "Slav", "e6"],
    questions: [
      "What is the Semi-Slav?",
      "How does the Semi-Slav combine Slav and QGD ideas?"
    ],
    short_answer: "The Semi-Slav combines ...d5, ...c6, and ...e6.",
    answer: "Black builds a strong center while keeping active counterplay available.",
    example: "A typical structure has black pawns on d5, c6, and e6.",
    related: ["THEORY-018", "THEORY-020"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-059",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Indian Defenses",
    title: "What is the Old Indian Defense?",
    level: "Intermediate",
    keywords: ["Old Indian", "Defense", "d6"],
    questions: [
      "What is the Old Indian Defense?",
      "What is Black's setup in the Old Indian?"
    ],
    short_answer: "The Old Indian often uses ...Nf6 and ...d6 against White's d4 and c4 setup.",
    answer: "Black develops solidly and keeps the center more restrained than in the King's Indian.",
    example: "1.d4 Nf6 2.c4 d6 can lead to the Old Indian.",
    related: ["THEORY-027", "THEORY-060"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-060",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Indian Defenses",
    title: "What is the Modern Benoni?",
    level: "Intermediate",
    keywords: ["Modern Benoni", "Benoni", "d5"],
    questions: [
      "What is the Modern Benoni?",
      "What makes the Modern Benoni different?"
    ],
    short_answer: "The Modern Benoni gives Black an asymmetrical structure with active counterplay after ...c5 and ...e6.",
    answer: "Black often accepts a space disadvantage in exchange for dynamic play.",
    example: "The structure can arise after 1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5.",
    related: ["THEORY-029", "THEORY-061"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-061",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Gambits",
    title: "What is a gambit?",
    level: "Beginner",
    keywords: ["gambit", "sacrifice", "opening"],
    questions: [
      "What is a gambit in chess?",
      "Why do players sacrifice a pawn in the opening?"
    ],
    short_answer: "A gambit is an opening in which a player voluntarily offers material for compensation.",
    answer: "The compensation may be development, activity, initiative, or attacking chances.",
    example: "The King's Gambit offers the f-pawn for active play.",
    related: ["THEORY-007", "THEORY-062"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-062",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Gambits",
    title: "What is compensation in a gambit?",
    level: "Intermediate",
    keywords: ["gambit", "compensation", "material"],
    questions: [
      "What does compensation mean in an opening gambit?",
      "What do you get for a sacrificed pawn?"
    ],
    short_answer: "Compensation is the positional or tactical benefit received in return for sacrificed material.",
    answer: "It may include development, open lines, initiative, king exposure, or long-term activity.",
    example: "A sacrificed pawn may open a file for a rook and give rapid development.",
    related: ["THEORY-061", "TACTIC-067"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "THEORY-063",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Gambits",
    title: "Should I accept every gambit?",
    level: "Intermediate",
    keywords: ["gambit", "accept", "opening"],
    questions: [
      "Should I always accept a gambit?",
      "Is taking a gambit pawn always best?"
    ],
    short_answer: "No. Accepting a gambit is a position-dependent decision.",
    answer: "Keeping the pawn may cost development or expose the king.",
    example: "Returning a gambit pawn can sometimes give a safer and more active position.",
    related: ["THEORY-061", "THEORY-064"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-064",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Gambits",
    title: "Can I decline a gambit?",
    level: "Beginner",
    keywords: ["gambit", "decline", "opening"],
    questions: [
      "What does declining a gambit mean?",
      "Can I refuse a gambit pawn?"
    ],
    short_answer: "Yes. You can decline a gambit and keep the material balance.",
    answer: "The best choice depends on development, king safety, and the resulting position.",
    example: "A player may decline a gambit if accepting it gives the opponent too much activity.",
    related: ["THEORY-061", "THEORY-063"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "THEORY-065",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Systems",
    title: "What is an opening system?",
    level: "Beginner",
    keywords: ["opening system", "system", "repertoire"],
    questions: [
      "What is a chess opening system?",
      "How is a system different from a variation?"
    ],
    short_answer: "A system is a repeatable setup that can be used against several different responses.",
    answer: "Systems emphasize familiar piece placement and plans rather than memorizing one exact sequence.",
    example: "The London System uses a recurring setup for White.",
    related: ["THEORY-021", "THEORY-066"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-066",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Variations",
    title: "What is an opening variation?",
    level: "Beginner",
    keywords: ["variation", "opening", "theory"],
    questions: [
      "What is an opening variation?",
      "What does variation mean in opening theory?"
    ],
    short_answer: "A variation is a specific branch or line within an opening.",
    answer: "Different responses create different variations of the same opening.",
    example: "The Najdorf is a major variation of the Sicilian Defense.",
    related: ["THEORY-065", "THEORY-067"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-067",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Main Lines",
    title: "What is an opening main line?",
    level: "Beginner",
    keywords: ["main line", "opening theory", "variation"],
    questions: [
      "What does main line mean in chess openings?",
      "Why is a line called the main line?"
    ],
    short_answer: "A main line is a well-established or heavily analyzed continuation of an opening.",
    answer: "It is not necessarily the only good line, but it is often a major theoretical branch.",
    example: "A database may label the most frequently studied continuation as a main line.",
    related: ["THEORY-066", "THEORY-068"],
    source: "Standard opening terminology",
    verified: true
  },
  {
    id: "THEORY-068",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Theory",
    title: "What does opening theory mean?",
    level: "Beginner",
    keywords: ["opening theory", "theory", "chess"],
    questions: [
      "What does opening theory mean?",
      "What does it mean to know theory?"
    ],
    short_answer: "Opening theory is the body of analyzed and established knowledge about opening positions and variations.",
    answer: "It includes move orders, plans, tactical ideas, evaluations, and important alternatives.",
    example: "A player who knows a critical Najdorf line is familiar with its opening theory.",
    related: ["THEORY-067", "THEORY-069"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-069",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Theory",
    title: "What is an opening novelty?",
    level: "Advanced",
    keywords: ["novelty", "opening", "theory"],
    questions: [
      "What is a chess opening novelty?",
      "What does novelty mean in opening preparation?"
    ],
    short_answer: "A novelty is a new or previously uncommon move introduced into an analyzed opening position.",
    answer: "A novelty may be prepared at home or discovered during a game.",
    example: "A player may introduce a new move on move 15 in a well-known opening position.",
    related: ["THEORY-068", "THEORY-089"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-070",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Move Orders",
    title: "What is an opening move order?",
    level: "Intermediate",
    keywords: ["move order", "opening", "transposition"],
    questions: [
      "What is a move order in chess openings?",
      "Why do players care about move orders?"
    ],
    short_answer: "A move order is the sequence in which opening moves are played.",
    answer: "Different move orders can reach similar positions while avoiding or allowing different alternatives.",
    example: "White may delay Nf3 to prevent Black from choosing a particular setup.",
    related: ["THEORY-071", "THEORY-072"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-071",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Transpositions",
    title: "What is a transposition?",
    level: "Intermediate",
    keywords: ["transposition", "opening", "position"],
    questions: [
      "What is a chess transposition?",
      "What does transposing into another opening mean?"
    ],
    short_answer: "A transposition occurs when different move orders reach the same or very similar position.",
    answer: "Players can use transpositions to enter preferred structures while avoiding certain alternatives.",
    example: "A Réti move order can transpose into a Queen's Indian-type position.",
    related: ["THEORY-070", "THEORY-072"],
    source: "Standard opening terminology",
    verified: true
  },
  {
    id: "THEORY-072",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Transpositions",
    title: "Why are transpositions useful?",
    level: "Intermediate",
    keywords: ["transposition", "repertoire", "opening"],
    questions: [
      "Why should I understand transpositions?",
      "How can transpositions help my opening repertoire?"
    ],
    short_answer: "They allow you to reach familiar positions through flexible move orders.",
    answer: "Understanding transpositions reduces the need to memorize every possible move order separately.",
    example: "A player can reach a known structure through a different opening sequence.",
    related: ["THEORY-070", "THEORY-071"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-073",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "What is a tabiya?",
    level: "Intermediate",
    keywords: ["tabiya", "opening", "position"],
    questions: [
      "What is a tabiya in chess?",
      "What does tabiya mean in opening study?"
    ],
    short_answer: "A tabiya is a characteristic position from which many opening plans or variations begin.",
    answer: "Players study the ideas of the tabiya rather than only memorizing the moves before it.",
    example: "A well-known opening structure may be treated as a tabiya for studying plans.",
    related: ["THEORY-068", "THEORY-074"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "THEORY-074",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "What is an opening repertoire?",
    level: "Beginner",
    keywords: ["repertoire", "opening", "study"],
    questions: [
      "What is a chess opening repertoire?",
      "What should a player's repertoire contain?"
    ],
    short_answer: "A repertoire is the collection of openings and variations a player regularly uses.",
    answer: "A complete repertoire usually includes choices for both White and Black.",
    example: "A player may choose 1.e4 as White, the Sicilian against 1.e4, and the Queen's Gambit Declined against 1.d4.",
    related: ["THEORY-075", "THEORY-076"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "THEORY-075",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "How should a beginner build a repertoire?",
    level: "Beginner",
    keywords: ["repertoire", "beginner", "opening"],
    questions: [
      "How should I build my first opening repertoire?",
      "Which openings should a beginner study?"
    ],
    short_answer: "Choose a small number of sound openings and learn their ideas before expanding.",
    answer: "A simple repertoire makes it easier to build experience and understand recurring structures.",
    example: "Start with one White opening and one response to 1.e4 and 1.d4.",
    related: ["THEORY-074", "THEORY-076"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-076",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "Should my opening repertoire be narrow or wide?",
    level: "Intermediate",
    keywords: ["repertoire", "opening study", "choice"],
    questions: [
      "Should I study many openings?",
      "Is a narrow repertoire better?"
    ],
    short_answer: "A focused repertoire is usually easier to master before expanding.",
    answer: "Depth and understanding are generally more valuable than memorizing many unrelated openings.",
    example: "Mastering one defense against 1.e4 can be more useful than knowing five superficially.",
    related: ["THEORY-074", "THEORY-075"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-077",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "Should I use the same opening as White every time?",
    level: "Intermediate",
    keywords: ["White repertoire", "opening", "choice"],
    questions: [
      "Should I always play the same opening as White?",
      "Is a consistent White repertoire useful?"
    ],
    short_answer: "Consistency can help you build deep understanding, but flexibility can also be valuable.",
    answer: "The best choice depends on your style, goals, and opponents.",
    example: "A player may consistently use 1.e4 while learning several responses to Black's defenses.",
    related: ["THEORY-074", "THEORY-078"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-078",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "Should I choose openings based on my style?",
    level: "Intermediate",
    keywords: ["opening style", "repertoire", "player"],
    questions: [
      "Should my openings match my playing style?",
      "How does playing style affect opening choice?"
    ],
    short_answer: "Yes, but soundness and understanding should come first.",
    answer: "Aggressive players may prefer dynamic openings, while others may prefer strategic or solid structures.",
    example: "A tactical player may enjoy sharp Sicilian positions.",
    related: ["THEORY-074", "THEORY-079"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-079",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Repertoire",
    title: "What makes a good opening repertoire?",
    level: "Intermediate",
    keywords: ["repertoire", "opening", "quality"],
    questions: [
      "What makes an opening repertoire good?",
      "How do I know if my repertoire is practical?"
    ],
    short_answer: "A good repertoire is sound, understandable, practical, and suitable for the player's level and style.",
    answer: "It should give you positions you understand and can play confidently.",
    example: "A simple system that you know deeply may be more practical than a complex line you barely understand.",
    related: ["THEORY-075", "THEORY-078"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-080",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "What is a model game?",
    level: "Beginner",
    keywords: ["model game", "opening", "study"],
    questions: [
      "What is a model game in opening study?",
      "Why should I study model games?"
    ],
    short_answer: "A model game is a representative game that demonstrates typical plans and ideas of an opening.",
    answer: "Model games help connect opening moves with middlegame plans.",
    example: "After learning the Queen's Gambit, study a strong game showing its typical minority attack.",
    related: ["THEORY-081", "THEORY-082"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-081",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "Why study model games instead of only variations?",
    level: "Intermediate",
    keywords: ["model games", "opening", "understanding"],
    questions: [
      "Why are model games useful?",
      "Can model games teach opening plans better than memorization?"
    ],
    short_answer: "Model games show how opening ideas become practical middlegame plans.",
    answer: "They teach piece placement, pawn breaks, exchanges, attacks, and typical mistakes.",
    example: "A model game can show why a rook belongs on an open file after a specific opening.",
    related: ["THEORY-080", "THEORY-082"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-082",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "How should I study an opening?",
    level: "Beginner",
    keywords: ["opening study", "training", "repertoire"],
    questions: [
      "How can I study an opening effectively?",
      "What is the best way to learn opening theory?"
    ],
    short_answer: "Learn the basic moves, understand the plans, study model games, and practice the critical positions.",
    answer: "Use an opening database or engine only after understanding the human ideas.",
    example: "Study a line, identify its pawn break, then play practice positions from it.",
    related: ["THEORY-080", "THEORY-083"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-083",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "Should I memorize every opening move?",
    level: "Intermediate",
    keywords: ["memorization", "opening", "theory"],
    questions: [
      "Do I need to memorize long opening lines?",
      "How much opening theory should I memorize?"
    ],
    short_answer: "Memorize critical lines, but prioritize understanding over raw memorization.",
    answer: "You need enough theory to reach playable positions confidently.",
    example: "Memorize the main tactical sequence but understand the plan behind it.",
    related: ["OPENING-056", "THEORY-082"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-084",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Preparation",
    title: "What is an opening database?",
    level: "Beginner",
    keywords: ["opening database", "games", "theory"],
    questions: [
      "What is an opening database?",
      "How is a chess database useful for openings?"
    ],
    short_answer: "An opening database contains chess games and statistics that can help study opening moves.",
    answer: "It can show move frequencies, player choices, and game results.",
    example: "You can check how often a move has been played in a particular opening position.",
    related: ["THEORY-085", "THEORY-086"],
    source: "Chess database terminology",
    verified: true
  },
  {
    id: "THEORY-085",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "ECO",
    title: "What is ECO in chess openings?",
    level: "Beginner",
    keywords: ["ECO", "opening code", "classification"],
    questions: [
      "What does ECO mean in chess?",
      "What are ECO codes?"
    ],
    short_answer: "ECO stands for Encyclopaedia of Chess Openings.",
    answer: "ECO codes classify chess openings using a standardized five-volume system from A00 to E99.",
    example: "The Sicilian Defense occupies several ECO codes in the B20-B99 range.",
    related: ["THEORY-084", "THEORY-086"],
    source: "Encyclopaedia of Chess Openings",
    verified: true
  },
  {
    id: "THEORY-086",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Databases",
    title: "Can opening statistics tell me the best move?",
    level: "Intermediate",
    keywords: ["opening statistics", "database", "best move"],
    questions: [
      "Are database percentages enough to choose an opening move?",
      "Can statistics replace analysis?"
    ],
    short_answer: "No. Statistics are useful evidence but do not replace position-specific analysis.",
    answer: "Player strength, sample size, move order, and position type all affect statistics.",
    example: "A move with a high win percentage may have been played mostly by stronger players.",
    related: ["THEORY-084", "THEORY-087"],
    source: "Practical chess analysis",
    verified: true
  },
  {
    id: "THEORY-087",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Engines",
    title: "Should I use an engine to study openings?",
    level: "Intermediate",
    keywords: ["engine", "opening", "analysis"],
    questions: [
      "Should I use Stockfish for opening preparation?",
      "How can an engine help with openings?"
    ],
    short_answer: "Yes, but use it to verify ideas and critical positions rather than blindly memorizing engine moves.",
    answer: "An engine is especially useful for checking tactics and evaluating deviations.",
    example: "After learning an opening plan, use Stockfish to test whether an opponent's unusual move is dangerous.",
    related: ["THEORY-088", "TECH-020"],
    source: "Practical chess analysis",
    verified: true
  },
  {
    id: "THEORY-088",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Engines",
    title: "Why should I not blindly follow engine moves?",
    level: "Intermediate",
    keywords: ["engine", "opening", "understanding"],
    questions: [
      "Why shouldn't I memorize engine moves without understanding?",
      "Can engine opening analysis confuse beginners?"
    ],
    short_answer: "Engine moves can be difficult to understand and may not fit your practical needs.",
    answer: "Human understanding helps you find good moves when the opponent leaves the known line.",
    example: "Knowing why ...c5 is played is more useful than memorizing that Stockfish prefers ...c5.",
    related: ["THEORY-087", "THEORY-089"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-089",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Preparation",
    title: "What is home preparation?",
    level: "Intermediate",
    keywords: ["opening preparation", "home preparation", "analysis"],
    questions: [
      "What does home preparation mean in chess?",
      "How do players prepare openings before tournaments?"
    ],
    short_answer: "Home preparation is opening analysis done before a game or event.",
    answer: "Players study likely variations, opponents, databases, model games, and engine analysis.",
    example: "A player may prepare a new line against an opponent's favorite defense.",
    related: ["THEORY-069", "THEORY-090"],
    source: "Practical chess terminology",
    verified: true
  },
  {
    id: "THEORY-090",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Preparation",
    title: "What is opponent-specific opening preparation?",
    level: "Intermediate",
    keywords: ["opponent preparation", "opening", "tournament"],
    questions: [
      "How can I prepare an opening against a specific opponent?",
      "What should I study before playing someone?"
    ],
    short_answer: "Study the opponent's usual openings, preferences, and recurring choices, then prepare practical responses.",
    answer: "Preparation should be based on reliable game evidence rather than assumptions.",
    example: "If an opponent repeatedly plays the Najdorf, prepare the variation you expect to face.",
    related: ["THEORY-089", "THEORY-091"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-091",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Preparation",
    title: "What should I do if my opponent leaves theory?",
    level: "Beginner",
    keywords: ["opening", "out of book", "theory"],
    questions: [
      "What should I do when my opponent plays an unfamiliar move?",
      "How should I react when my opponent leaves opening theory?"
    ],
    short_answer: "Stop relying on memorization and evaluate the position using normal chess principles.",
    answer: "Check threats, development, king safety, pawn structure, and tactical opportunities.",
    example: "If your opponent plays a new move on move eight, calculate the position instead of guessing the book response.",
    related: ["THEORY-092", "THINK-001"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-092",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Out of Book",
    title: "What does 'out of book' mean?",
    level: "Beginner",
    keywords: ["out of book", "opening", "theory"],
    questions: [
      "What does out of book mean in chess?",
      "What does it mean when a game leaves theory?"
    ],
    short_answer: "It means the game has reached a position outside the opening moves stored or recognized by a database or reference.",
    answer: "It does not automatically mean the move played is bad.",
    example: "An unusual but strong move can take a game out of book immediately.",
    related: ["THEORY-091", "THEORY-093"],
    source: "Chess database terminology",
    verified: true
  },
  {
    id: "THEORY-093",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Critical Positions",
    title: "What is a critical opening position?",
    level: "Intermediate",
    keywords: ["critical position", "opening", "calculation"],
    questions: [
      "What is a critical position in opening theory?",
      "Which opening positions deserve the most study?"
    ],
    short_answer: "A critical position is one where an important decision can significantly affect the evaluation or direction of the game.",
    answer: "These positions deserve deeper calculation and understanding than routine moves.",
    example: "A tactical central break can be a critical point in a theoretical opening.",
    related: ["THEORY-082", "CALC-001"],
    source: "Practical chess analysis",
    verified: true
  },
  {
    id: "THEORY-094",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Deviations",
    title: "What is an opening deviation?",
    level: "Intermediate",
    keywords: ["deviation", "opening", "theory"],
    questions: [
      "What is an opening deviation?",
      "What does it mean to deviate from theory?"
    ],
    short_answer: "A deviation is a move that differs from a known or commonly played theoretical line.",
    answer: "A deviation may be strong, harmless, or inaccurate depending on the position.",
    example: "An opponent may play an uncommon sixth move instead of the main theoretical continuation.",
    related: ["THEORY-091", "THEORY-092"],
    source: "Standard opening terminology",
    verified: true
  },
  {
    id: "THEORY-095",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Move Orders",
    title: "Why do strong players use flexible move orders?",
    level: "Advanced",
    keywords: ["move order", "flexibility", "opening"],
    questions: [
      "Why are move orders important at high level?",
      "How can a move order avoid an opponent's preparation?"
    ],
    short_answer: "Flexible move orders can preserve options and prevent the opponent from reaching their preferred line.",
    answer: "They can also create transpositions into favorable structures.",
    example: "A player may delay a central commitment until seeing the opponent's setup.",
    related: ["THEORY-070", "THEORY-071"],
    source: "Advanced opening practice",
    verified: true
  },
  {
    id: "THEORY-096",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Choice",
    title: "What is a sound opening?",
    level: "Beginner",
    keywords: ["sound opening", "opening choice", "chess"],
    questions: [
      "What makes an opening sound?",
      "What does a sound opening mean?"
    ],
    short_answer: "A sound opening gives reasonable chances without relying on unsound play or hope for mistakes.",
    answer: "Soundness does not mean every line is equal or easy to play.",
    example: "The Ruy Lopez is considered a sound opening with extensive theoretical support.",
    related: ["THEORY-079", "THEORY-097"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "THEORY-097",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Choice",
    title: "Does every opening have to be objectively equal?",
    level: "Intermediate",
    keywords: ["opening evaluation", "equality", "opening"],
    questions: [
      "Must an opening be objectively equal to be playable?",
      "Can a slightly inferior opening still be practical?"
    ],
    short_answer: "No. A playable opening can offer practical chances even if it is not the engine's top choice.",
    answer: "Practical difficulty, familiarity, and style also matter.",
    example: "A sharp opening may be attractive in rapid chess despite being slightly less accurate according to an engine.",
    related: ["THEORY-096", "THEORY-098"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-098",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Practical Opening",
    title: "What is a practical opening?",
    level: "Intermediate",
    keywords: ["practical opening", "opening choice", "player"],
    questions: [
      "What makes an opening practical?",
      "Should I choose an opening that is easy for me to play?"
    ],
    short_answer: "A practical opening gives you positions you understand and can handle confidently within your time control.",
    answer: "Practical value includes familiarity, clarity of plans, and the likelihood of reaching positions you enjoy.",
    example: "A simple system may be practical for a player with limited preparation time.",
    related: ["THEORY-079", "THEORY-097"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "THEORY-099",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Repertoire",
    title: "What should I prepare against 1.e4?",
    level: "Beginner",
    keywords: ["1.e4", "Black repertoire", "opening"],
    questions: [
      "How should I build a defense against 1.e4?",
      "What should my Black repertoire against 1.e4 include?"
    ],
    short_answer: "Choose one main defense and learn its structures, plans, critical variations, and common alternatives.",
    answer: "The Sicilian, French, Caro-Kann, 1...e5, and other defenses all offer different styles.",
    example: "A player may choose the Caro-Kann as a solid response to 1.e4.",
    related: ["THEORY-015", "THEORY-016", "THEORY-010"],
    source: "Standard opening theory",
    verified: true
  },
  {
    id: "THEORY-100",
    type: "OPENING",
    category: "Opening Theory",
    topic: "Opening Theory & Repertoire",
    subtopic: "Opening Repertoire",
    title: "What should I prepare against 1.d4?",
    level: "Beginner",
    keywords: ["1.d4", "Black repertoire", "opening"],
    questions: [
      "How should I build a defense against 1.d4?",
      "What should my Black repertoire against 1.d4 include?"
    ],
    short_answer: "Choose a coherent defense and study its main structures, plans, and critical variations.",
    answer: "The Queen's Gambit Declined, Slav, Nimzo-Indian, King's Indian, Grünfeld, and Dutch are among the major choices.",
    example: "A player may choose the Nimzo-Indian against 1.d4 when White allows it.",
    related: ["THEORY-018", "THEORY-020", "THEORY-025", "THEORY-027"],
    source: "Standard opening theory",
    verified: true
  }
];

export default openingTheoryRepertoire;