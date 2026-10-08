const attackDefenseKingSafety = [
  {
    id: "ATTACK-001",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Basics",
    title: "What is king safety?",
    level: "Beginner",
    keywords: ["king safety", "king", "defense"],
    questions: [
      "What does king safety mean?",
      "Why is king safety important?"
    ],
    short_answer: "King safety means protecting your king from checks, attacks, and mating threats.",
    answer: "A safe king has adequate shelter, defenders, and fewer dangerous lines directed toward it.",
    example: "Castling early can improve king safety by placing the king behind a pawn shield.",
    related: ["ATTACK-002", "ATTACK-003", "MATE-019"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "ATTACK-002",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Basics",
    title: "What is a chess attack?",
    level: "Beginner",
    keywords: ["attack", "threat", "king"],
    questions: [
      "What is an attack in chess?",
      "What does it mean to attack the opponent?"
    ],
    short_answer: "An attack is coordinated pressure against a target such as the king, piece, pawn, or square.",
    answer: "A strong attack combines active pieces, useful lines, targets, and concrete threats.",
    example: "Two rooks and a queen attacking a weak pawn create a coordinated attack.",
    related: ["ATTACK-003", "ATTACK-012", "MIDDLE-057"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "ATTACK-003",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Initiative",
    title: "What is attacking initiative?",
    level: "Beginner",
    keywords: ["initiative", "attack", "pressure"],
    questions: [
      "What does initiative mean during an attack?",
      "How do I keep attacking momentum?"
    ],
    short_answer: "Attacking initiative means keeping the opponent busy responding to your threats.",
    answer: "The initiative is useful when your moves create concrete problems while improving your position.",
    example: "A forcing check followed by another threat can keep the defender under pressure.",
    related: ["ATTACK-004", "MIDDLE-010", "MATE-003"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-004",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Preparation",
    title: "How should I prepare an attack?",
    level: "Beginner",
    keywords: ["attack preparation", "piece coordination", "king"],
    questions: [
      "How do I prepare a chess attack?",
      "What should I do before attacking?"
    ],
    short_answer: "Improve your pieces, identify a target, create useful lines, and check for tactical opportunities.",
    answer: "Attacking without enough pieces or a clear target often allows the opponent to defend comfortably.",
    example: "Bring a rook to an open file before launching a kingside attack.",
    related: ["ATTACK-005", "ATTACK-012", "CALC-039"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-005",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Targets",
    title: "How do I choose an attacking target?",
    level: "Beginner",
    keywords: ["target", "attack", "weakness"],
    questions: [
      "What should I attack?",
      "How do I find a target for my pieces?"
    ],
    short_answer: "Look for a weak king, weak pawn, loose piece, weak square, or poorly defended area.",
    answer: "The best target is one that can be attacked effectively and is difficult for the opponent to defend.",
    example: "A weak pawn near the king can become a target for queen and rook pressure.",
    related: ["ATTACK-006", "ATTACK-007", "POSITION-003"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-006",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Attack",
    subtopic: "King Shelter",
    title: "How do I attack a castled king?",
    level: "Intermediate",
    keywords: ["castled king", "king attack", "pawn shield"],
    questions: [
      "How can I attack a castled king?",
      "What should I look for around a castled king?"
    ],
    short_answer: "Look for weak pawns, open files, weak squares, missing defenders, and opportunities to bring more pieces toward the king.",
    answer: "A king attack becomes dangerous when several attacking pieces can coordinate against limited defenders.",
    example: "Open a file near the castled king and place a rook on it to increase pressure.",
    related: ["ATTACK-007", "ATTACK-012", "MATE-021"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-007",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Pawn Shield",
    title: "What is a king's pawn shield?",
    level: "Beginner",
    keywords: ["pawn shield", "king safety", "castling"],
    questions: [
      "What is a pawn shield?",
      "How does the pawn shield protect the king?"
    ],
    short_answer: "The pawn shield is the group of pawns that provides protection around a king, especially after castling.",
    answer: "These pawns control entry squares and can block enemy pieces, but their movement can also create weaknesses.",
    example: "Moving a pawn in front of your castled king may open a square for enemy pieces.",
    related: ["ATTACK-008", "ATTACK-009", "MIDDLE-032"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-008",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Pawn Shield",
    title: "When is a pawn shield weak?",
    level: "Beginner",
    keywords: ["pawn shield", "king safety", "weakness"],
    questions: [
      "When is a king's pawn shield weak?",
      "How can the pawn shield become vulnerable?"
    ],
    short_answer: "A pawn shield is weak when pawns are missing, advanced, isolated, or unable to control important attacking squares.",
    answer: "Open files and diagonals near the king can make such weaknesses more dangerous.",
    example: "An advanced pawn near the king may leave a hole behind it.",
    related: ["ATTACK-007", "ATTACK-009", "MIDDLE-033"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-009",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Weak Squares",
    title: "How do weak squares around the king help an attacker?",
    level: "Intermediate",
    keywords: ["weak squares", "king", "attack"],
    questions: [
      "Why are weak squares around the king dangerous?",
      "How can an attacker use a weak square?"
    ],
    short_answer: "Weak squares can become entry points for attacking pieces.",
    answer: "A knight, bishop, queen, or rook may use a weak square to increase pressure around the king.",
    example: "A knight established on a protected square near the king can create mating threats.",
    related: ["ATTACK-010", "POSITION-006", "MATE-021"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-010",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Weak Squares",
    title: "What is a hole around the king?",
    level: "Beginner",
    keywords: ["hole", "weak square", "king safety"],
    questions: [
      "What is a hole near the king?",
      "How can a hole become dangerous?"
    ],
    short_answer: "A hole is a weak square that cannot easily be controlled or challenged by a pawn.",
    answer: "A hole near the king can become an entry point for enemy pieces.",
    example: "A knight occupying a protected hole near the king may support a strong attack.",
    related: ["ATTACK-009", "POSITION-006", "MATE-019"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-011",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Piece Coordination",
    title: "Why do attacking pieces need coordination?",
    level: "Beginner",
    keywords: ["coordination", "attack", "pieces"],
    questions: [
      "Why must attacking pieces work together?",
      "Can one piece attack the king alone?"
    ],
    short_answer: "Coordinated pieces create stronger threats and make defensive resources harder to find.",
    answer: "A single attacker can often be driven away, while several coordinated pieces can support each other.",
    example: "A queen supported by a bishop can create threats that the queen alone could not.",
    related: ["ATTACK-012", "ATTACK-013", "MIDDLE-016"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-012",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Piece Coordination",
    title: "How many pieces should attack a king?",
    level: "Intermediate",
    keywords: ["king attack", "pieces", "coordination"],
    questions: [
      "How many pieces are needed for a king attack?",
      "Is more attacking material always better?"
    ],
    short_answer: "There is no fixed number; the required force depends on the king's defenses and the position.",
    answer: "Quality of coordination matters more than simply counting attacking pieces.",
    example: "Three well-coordinated pieces can be more dangerous than five poorly placed ones.",
    related: ["ATTACK-011", "ATTACK-013", "MATE-003"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-013",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Batteries",
    title: "What is a battery in an attack?",
    level: "Intermediate",
    keywords: ["battery", "queen", "rook", "attack"],
    questions: [
      "How does a battery help an attack?",
      "What attacking pieces form a battery?"
    ],
    short_answer: "A battery places two or more pieces on the same line or toward the same target.",
    answer: "Common attacking batteries include queen and rook or queen and bishop.",
    example: "A queen and rook aligned on a file can increase pressure against the king.",
    related: ["ATTACK-011", "MIDDLE-018", "MATE-024"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "ATTACK-014",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Open Lines",
    title: "Why are open lines important for attacks?",
    level: "Beginner",
    keywords: ["open lines", "attack", "rook", "bishop"],
    questions: [
      "Why do attacks need open lines?",
      "How can I open lines toward the king?"
    ],
    short_answer: "Open files, ranks, and diagonals give attacking pieces direct access to important squares.",
    answer: "Pawn breaks and exchanges can open lines for rooks, bishops, and queens.",
    example: "Opening a file beside a castled king can give a rook a direct attacking route.",
    related: ["ATTACK-015", "ATTACK-016", "MIDDLE-048"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-015",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Open Files",
    title: "How can a rook use an open file to attack?",
    level: "Beginner",
    keywords: ["rook", "open file", "king attack"],
    questions: [
      "How does a rook attack through an open file?",
      "Why is an open file near the king dangerous?"
    ],
    short_answer: "A rook can use an open file to penetrate toward the king or attack weaknesses.",
    answer: "The rook becomes especially dangerous when it can enter the seventh rank or attack the king's shelter.",
    example: "A rook on an open file beside the king can create mating threats.",
    related: ["ATTACK-014", "ATTACK-017", "MIDDLE-021"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-016",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Diagonals",
    title: "Why are open diagonals dangerous near the king?",
    level: "Beginner",
    keywords: ["diagonal", "bishop", "king attack"],
    questions: [
      "How does a bishop attack along an open diagonal?",
      "Why should I watch diagonals near my king?"
    ],
    short_answer: "An open diagonal can give a bishop or queen direct access to the king or key defensive squares.",
    answer: "A single pawn move or exchange can suddenly open a dangerous diagonal.",
    example: "Removing a central pawn may open a bishop's diagonal toward the king.",
    related: ["ATTACK-014", "ATTACK-018", "MATE-026"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-017",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Rook Lift",
    title: "What is a rook lift?",
    level: "Intermediate",
    keywords: ["rook lift", "rook", "attack"],
    questions: [
      "What is a rook lift?",
      "How does a rook lift help an attack?"
    ],
    short_answer: "A rook lift moves a rook from its original file to an active rank or file, often to support an attack.",
    answer: "Rook lifts can bring a rook toward the king without waiting for a file to open.",
    example: "A rook may move to the third rank and then across to the kingside.",
    related: ["ATTACK-015", "ATTACK-019", "MATE-025"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-018",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Bishop Attack",
    title: "How can a bishop support a king attack?",
    level: "Beginner",
    keywords: ["bishop", "king attack", "diagonal"],
    questions: [
      "How does a bishop help attack the king?",
      "Why are bishops useful in king attacks?"
    ],
    short_answer: "A bishop can control long diagonals, key escape squares, and squares around the king.",
    answer: "Bishops become particularly dangerous when the pawn shield has weaknesses on their color complex.",
    example: "A bishop on a long diagonal can support a queen near the enemy king.",
    related: ["ATTACK-016", "ATTACK-019", "MATE-026"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-019",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Queen Attack",
    title: "How should the queen participate in a king attack?",
    level: "Beginner",
    keywords: ["queen", "king attack", "coordination"],
    questions: [
      "How does the queen help a king attack?",
      "Where should the attacking queen go?"
    ],
    short_answer: "The queen should join the attack from a safe square where it supports threats and coordinates with other pieces.",
    answer: "The queen is powerful but vulnerable, so attacking activity must not expose it to unnecessary tempo-gaining attacks.",
    example: "A queen may support a mating threat from a square protected by another piece.",
    related: ["ATTACK-011", "ATTACK-013", "MATE-024"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-020",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Basics",
    title: "What is defense in chess?",
    level: "Beginner",
    keywords: ["defense", "king safety", "counterplay"],
    questions: [
      "What does defense mean in chess?",
      "How do I defend a position?"
    ],
    short_answer: "Defense means preventing or reducing the opponent's threats while improving your own position.",
    answer: "Good defense may involve blocking lines, moving the king, exchanging attackers, adding defenders, or creating counterplay.",
    example: "Place another defender on a piece that is attacked twice.",
    related: ["ATTACK-021", "ATTACK-022", "MIDDLE-058"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "ATTACK-021",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Defenders",
    title: "How do I add defenders to a target?",
    level: "Beginner",
    keywords: ["defender", "defense", "target"],
    questions: [
      "How can I defend a weak piece?",
      "How do I add another defender?"
    ],
    short_answer: "Move or coordinate another piece so that it protects the target or controls the attacking route.",
    answer: "The best defensive move often solves several problems while improving piece activity.",
    example: "Move a rook behind a weak pawn so the pawn receives additional protection.",
    related: ["ATTACK-022", "ATTACK-023", "MIDDLE-016"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-022",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Overloaded Defenders",
    title: "What is an overloaded defender?",
    level: "Intermediate",
    keywords: ["overloaded defender", "defense", "tactics"],
    questions: [
      "What is an overloaded defender?",
      "Why can one defender fail under pressure?"
    ],
    short_answer: "An overloaded defender is responsible for protecting more than one important target.",
    answer: "The attacker may create a second threat that forces the defender to abandon one responsibility.",
    example: "A queen defending both a rook and a mating square may become overloaded.",
    related: ["ATTACK-021", "TACTIC-024", "CALC-006"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "ATTACK-023",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Blocking",
    title: "How can blocking stop an attack?",
    level: "Beginner",
    keywords: ["blocking", "defense", "line"],
    questions: [
      "How does blocking work in defense?",
      "Can I stop an attack by blocking a line?"
    ],
    short_answer: "A blocking move places a piece or pawn between the attacker and its target.",
    answer: "Blocking can stop checks, close dangerous files, or interrupt bishop and queen diagonals.",
    example: "Place a piece between an attacking bishop and your king.",
    related: ["ATTACK-024", "ATTACK-025", "MATE-005"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-024",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Exchanges",
    title: "Why is exchanging attacking pieces a defensive technique?",
    level: "Beginner",
    keywords: ["exchange", "attack", "defense"],
    questions: [
      "Why should I exchange attacking pieces?",
      "How can exchanges reduce an attack?"
    ],
    short_answer: "Removing an important attacker can reduce the opponent's attacking force.",
    answer: "This is especially useful when the exchanged piece is central to the opponent's plan.",
    example: "Exchange the enemy bishop controlling key squares around your king.",
    related: ["ATTACK-025", "MIDDLE-059", "POSITION-058"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-025",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Counterplay",
    title: "What is defensive counterplay?",
    level: "Intermediate",
    keywords: ["counterplay", "defense", "attack"],
    questions: [
      "What is counterplay in defense?",
      "How can counterplay help me defend?"
    ],
    short_answer: "Counterplay creates threats that force the attacker to respond instead of continuing the attack.",
    answer: "Active defense is often stronger than passive waiting.",
    example: "A central pawn break can force the attacking pieces to deal with a new threat.",
    related: ["ATTACK-026", "MIDDLE-058", "CALC-038"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-026",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Active Defense",
    title: "What is active defense?",
    level: "Beginner",
    keywords: ["active defense", "defense", "counterplay"],
    questions: [
      "What is active defense?",
      "Why is active defense better than passive defense?"
    ],
    short_answer: "Active defense solves threats while creating useful activity or counter-threats.",
    answer: "The defender tries to change the position instead of simply waiting for the attack to continue.",
    example: "Attack the opponent's queen while simultaneously defending your king.",
    related: ["ATTACK-025", "ATTACK-027", "MIDDLE-058"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-027",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Passive Defense",
    title: "What is passive defense?",
    level: "Beginner",
    keywords: ["passive defense", "defense", "king"],
    questions: [
      "What is passive defense?",
      "Why can passive defense be dangerous?"
    ],
    short_answer: "Passive defense focuses only on stopping threats without creating activity.",
    answer: "It may be necessary, but too much passivity can allow the attacker to improve pieces and create stronger threats.",
    example: "Keeping all pieces tied to defense may give the opponent time to bring more attackers.",
    related: ["ATTACK-026", "ATTACK-028", "MIDDLE-058"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-028",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Defensive Coordination",
    title: "How should defensive pieces be coordinated?",
    level: "Intermediate",
    keywords: ["defensive coordination", "defense", "pieces"],
    questions: [
      "How do I coordinate my defenders?",
      "What makes a defense strong?"
    ],
    short_answer: "Defenders should protect key squares and targets while supporting each other.",
    answer: "Avoid placing all defensive responsibility on one piece when possible.",
    example: "A rook can defend a rank while a knight controls an important escape square.",
    related: ["ATTACK-021", "ATTACK-029", "MIDDLE-016"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-029",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "King Defense",
    title: "How many defenders should protect my king?",
    level: "Intermediate",
    keywords: ["king defense", "defenders", "king safety"],
    questions: [
      "How many pieces should defend my king?",
      "Is counting defenders enough for king safety?"
    ],
    short_answer: "There is no fixed number; king safety depends on the attackers, escape squares, lines, and tactical possibilities.",
    answer: "A king can be unsafe even with several defenders if those defenders are overloaded or poorly placed.",
    example: "Three pieces may defend the king but still fail against a forcing sacrifice.",
    related: ["ATTACK-028", "ATTACK-030", "MATE-003"],
    source: "Chess king-safety principle",
    verified: true
  },

  {
    id: "ATTACK-030",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Escape Squares",
    title: "Why are escape squares important?",
    level: "Beginner",
    keywords: ["escape squares", "king", "mating attack"],
    questions: [
      "What are escape squares?",
      "Why does a king need escape squares?"
    ],
    short_answer: "Escape squares give the king legal destinations when it is attacked.",
    answer: "Removing or controlling all escape squares can make a king vulnerable to checkmate.",
    example: "A pawn move that removes the king's only escape square may create a mating threat.",
    related: ["ATTACK-031", "MATE-011", "MATE-014"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-031",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "King Attack",
    subtopic: "Flight Squares",
    title: "What are flight squares?",
    level: "Beginner",
    keywords: ["flight squares", "king", "attack"],
    questions: [
      "What are flight squares in chess?",
      "How do flight squares help a king?"
    ],
    short_answer: "Flight squares are safe or potentially safe squares available for the king to escape to.",
    answer: "Creating a useful flight square can reduce the danger of back-rank or mating attacks.",
    example: "A pawn move that gives the king an escape square can prevent a back-rank mate.",
    related: ["ATTACK-030", "MATE-011", "MATE-012"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-032",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Back Rank",
    title: "What is back-rank weakness?",
    level: "Beginner",
    keywords: ["back rank", "king safety", "mate"],
    questions: [
      "What is a back-rank weakness?",
      "Why can the back rank be dangerous?"
    ],
    short_answer: "Back-rank weakness occurs when the king has limited escape squares and can be attacked along its back rank.",
    answer: "A lack of flight squares can make a back-rank checkmate possible.",
    example: "A king trapped behind its own pawns can be vulnerable to a rook check on the back rank.",
    related: ["ATTACK-031", "MATE-011", "MATE-012"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-033",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Castling",
    title: "Why does castling usually improve king safety?",
    level: "Beginner",
    keywords: ["castling", "king safety", "rook"],
    questions: [
      "Why is castling good for king safety?",
      "How does castling protect the king?"
    ],
    short_answer: "Castling moves the king away from the center and usually places it behind a pawn shield.",
    answer: "It also develops the rook toward the center of the board.",
    example: "After kingside castling, the king is usually sheltered by pawns on the f-, g-, and h-files.",
    related: ["ATTACK-034", "RULE-030", "MIDDLE-031"],
    source: "FIDE Laws of Chess; chess principle",
    verified: true
  },

  {
    id: "ATTACK-034",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Castling",
    title: "Can castling ever make the king less safe?",
    level: "Intermediate",
    keywords: ["castling", "king safety", "attack"],
    questions: [
      "Can castling create weaknesses?",
      "Is castling always the safest move?"
    ],
    short_answer: "Castling is generally useful, but its value depends on the resulting position.",
    answer: "If the opponent already has a strong attack on that side, castling there may place the king closer to the danger.",
    example: "Do not castle automatically into an already-open file or prepared attack.",
    related: ["ATTACK-033", "ATTACK-035", "CALC-039"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-035",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Castling",
    title: "Should I always castle early?",
    level: "Beginner",
    keywords: ["castling", "opening", "king safety"],
    questions: [
      "Should I always castle as early as possible?",
      "Is early castling always correct?"
    ],
    short_answer: "Castling early is often useful, but the position should determine the timing.",
    answer: "Consider whether castling is legal, whether the king is safe on either side, and whether delaying has a concrete purpose.",
    example: "If the center is about to open, king safety may require careful calculation before choosing the castling side.",
    related: ["ATTACK-033", "ATTACK-034", "OPENING-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "ATTACK-036",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Center",
    title: "Why can a king be unsafe in the center?",
    level: "Beginner",
    keywords: ["king", "center", "king safety"],
    questions: [
      "Why is a king in the center dangerous?",
      "When is a central king vulnerable?"
    ],
    short_answer: "The central king can be exposed to checks and attacks along open files and diagonals.",
    answer: "When the center opens, many pieces can gain direct access to the king.",
    example: "Opening the e-file while the enemy king remains in the center can create tactical threats.",
    related: ["ATTACK-037", "CALC-039", "MATE-019"],
    source: "Chess king-safety principle",
    verified: true
  },

  {
    id: "ATTACK-037",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Open Center",
    title: "Why is an open center dangerous for an uncastled king?",
    level: "Intermediate",
    keywords: ["open center", "uncastled king", "attack"],
    questions: [
      "Why is an open center dangerous for the king?",
      "How can central exchanges attack an uncastled king?"
    ],
    short_answer: "Opening central lines can give checks and attacks against a king still in the center.",
    answer: "Central files and diagonals may become available to queens, rooks, and bishops.",
    example: "A central pawn exchange can open a file that allows a rook to check the king.",
    related: ["ATTACK-036", "ATTACK-038", "CALC-027"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-038",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Queen Safety",
    title: "Why is queen activity near the king dangerous?",
    level: "Intermediate",
    keywords: ["queen", "king attack", "checks"],
    questions: [
      "Why is an enemy queen near my king dangerous?",
      "How should I deal with an attacking queen?"
    ],
    short_answer: "The queen can deliver checks and create multiple threats from nearby squares.",
    answer: "Defend critical squares and look for ways to exchange, attack, or restrict the queen.",
    example: "A knight move that attacks the enemy queen while defending a key square can be an effective defensive move.",
    related: ["ATTACK-039", "ATTACK-024", "MATE-024"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-039",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Attacking Queen",
    title: "How can I drive away an attacking queen?",
    level: "Intermediate",
    keywords: ["queen attack", "defense", "tempo"],
    questions: [
      "How do I chase an enemy queen away from my king?",
      "What is the best way to attack an attacking queen?"
    ],
    short_answer: "Use moves that attack the queen while also improving your defense whenever possible.",
    answer: "Avoid wasting tempi if the queen can simply move to another strong attacking square.",
    example: "A developing move that attacks the queen may gain time while adding another defender.",
    related: ["ATTACK-038", "ATTACK-040", "MIDDLE-017"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-040",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Queen Exchange",
    title: "When should I exchange queens for safety?",
    level: "Beginner",
    keywords: ["queen exchange", "king safety", "defense"],
    questions: [
      "Should I exchange queens when my king is under attack?",
      "Why can a queen trade help defense?"
    ],
    short_answer: "Exchanging queens can greatly reduce mating and checking threats, but only if the resulting position is favorable.",
    answer: "A queen exchange is especially useful when the opponent's attack depends heavily on queen activity.",
    example: "Offer a queen trade when it removes the main attacker and leaves you with a safe position.",
    related: ["ATTACK-024", "ATTACK-038", "MIDDLE-063"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-041",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "King Escape",
    title: "What should I do when my king is under check?",
    level: "Beginner",
    keywords: ["check", "king", "defense"],
    questions: [
      "What should I do when my king is checked?",
      "How can I respond to check?"
    ],
    short_answer: "You must make a legal move that removes the check.",
    answer: "Depending on the type of check, you may move the king, capture the checking piece, or block the line of attack.",
    example: "Against a rook check along a file, you may be able to block the file if the rules allow it.",
    related: ["RULE-016", "RULE-017", "MATE-005"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "ATTACK-042",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Double Check",
    title: "Why is double check so dangerous?",
    level: "Intermediate",
    keywords: ["double check", "king", "defense"],
    questions: [
      "Why is double check difficult to defend?",
      "Can I block a double check?"
    ],
    short_answer: "In a double check, the king normally must move because capturing or blocking one attacker does not remove the other.",
    answer: "The exact legal response depends on the position, but a king move is generally required.",
    example: "A discovered attack that also gives check can create a double check.",
    related: ["MATE-019", "TACTIC-019", "RULE-016"],
    source: "FIDE Laws of Chess; tactical principle",
    verified: true
  },

  {
    id: "ATTACK-043",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Checking Pieces",
    title: "How do I capture a checking piece?",
    level: "Beginner",
    keywords: ["check", "capture", "defense"],
    questions: [
      "Can I capture the piece giving check?",
      "When is capturing a checking piece legal?"
    ],
    short_answer: "You may capture the checking piece if the move removes the check and does not leave your king in check.",
    answer: "The destination square must be safe for the king if the king itself is making the capture.",
    example: "A king can capture a checking piece only if the resulting square is not attacked.",
    related: ["ATTACK-041", "RULE-016", "MATE-005"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "ATTACK-044",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Blocking",
    title: "When can I block a check?",
    level: "Beginner",
    keywords: ["block check", "check", "defense"],
    questions: [
      "Can every check be blocked?",
      "When is blocking a check possible?"
    ],
    short_answer: "Only line checks from pieces such as rooks, bishops, and queens can generally be blocked.",
    answer: "Knight checks, pawn checks, king checks, and many close-range checks cannot be blocked.",
    example: "A rook checking along a rank can sometimes be stopped by placing a piece between the rook and king.",
    related: ["ATTACK-023", "ATTACK-041", "RULE-016"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "ATTACK-045",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Removing Attackers",
    title: "How can I reduce the number of attackers?",
    level: "Beginner",
    keywords: ["attackers", "defense", "exchange"],
    questions: [
      "How can I reduce attacking pressure?",
      "What should I exchange when defending?"
    ],
    short_answer: "Exchange or drive away the most dangerous attacking pieces whenever possible.",
    answer: "Reducing the attacker's force can make the remaining threats manageable.",
    example: "Trading an active bishop can remove an important attacker from the king's vicinity.",
    related: ["ATTACK-024", "ATTACK-046", "ATTACK-058"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-046",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Attackers",
    title: "Which attacking piece should I eliminate first?",
    level: "Intermediate",
    keywords: ["attacking piece", "defense", "king attack"],
    questions: [
      "Which attacker should I exchange first?",
      "How do I identify the most dangerous attacker?"
    ],
    short_answer: "Target the piece that creates the greatest immediate threat or supports the opponent's key tactical idea.",
    answer: "The most valuable defender is not always the most dangerous attacker, so evaluate the actual position.",
    example: "Removing the queen may be impossible, but exchanging the bishop supporting the queen can weaken the attack.",
    related: ["ATTACK-045", "ATTACK-047", "CALC-018"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-047",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Defensive Priorities",
    title: "What should I defend first?",
    level: "Beginner",
    keywords: ["defensive priorities", "threats", "king"],
    questions: [
      "What should I defend first?",
      "How do I prioritize defensive problems?"
    ],
    short_answer: "Deal with immediate checks, mating threats, tactical losses, and king danger first.",
    answer: "After urgent threats are handled, improve your position and address longer-term weaknesses.",
    example: "Do not defend a pawn while ignoring a direct attack on your king.",
    related: ["ATTACK-048", "CALC-005", "MATE-003"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-048",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Threat Assessment",
    title: "How do I know whether a threat is real?",
    level: "Intermediate",
    keywords: ["threat", "defense", "calculation"],
    questions: [
      "How do I evaluate an opponent's threat?",
      "How can I tell whether I really need to defend?"
    ],
    short_answer: "Calculate what happens if the opponent carries out the threat and whether you have a stronger response.",
    answer: "Not every apparent threat needs immediate defense if it cannot actually be executed or if you have stronger counterplay.",
    example: "An attack on a pawn may be harmless if taking the pawn allows a decisive tactical response.",
    related: ["ATTACK-047", "ATTACK-049", "CALC-037"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "ATTACK-049",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Counterattack",
    title: "Can a counterattack be the best defense?",
    level: "Beginner",
    keywords: ["counterattack", "defense", "initiative"],
    questions: [
      "Can I defend by attacking?",
      "Why is counterattack sometimes the best defense?"
    ],
    short_answer: "Yes. A forcing counterattack can make the opponent abandon or reduce their attack.",
    answer: "Checks and direct threats are particularly effective because they force the opponent to respond.",
    example: "A check against the attacking king can interrupt an opponent's attack on your king.",
    related: ["ATTACK-025", "ATTACK-050", "CALC-004"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-050",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Counterattack",
    title: "What is a counterattack?",
    level: "Beginner",
    keywords: ["counterattack", "attack", "initiative"],
    questions: [
      "What is a counterattack in chess?",
      "How does a counterattack work?"
    ],
    short_answer: "A counterattack creates threats against the opponent while they are attacking you.",
    answer: "It can force the attacker to change plans and may turn the defensive position into an active one.",
    example: "Attack the opponent's queen while they are preparing a kingside attack.",
    related: ["ATTACK-049", "ATTACK-051", "MIDDLE-025"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-051",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Overextension",
    title: "What is an overextended attack?",
    level: "Intermediate",
    keywords: ["overextension", "attack", "defense"],
    questions: [
      "What is an overextended attack?",
      "How can an attack go too far?"
    ],
    short_answer: "An attack becomes overextended when the attacking pieces or pawns advance beyond effective support.",
    answer: "The defender may then attack the advanced pieces, close lines, or create counterplay.",
    example: "Pushing too many pawns toward the king without enough piece support can weaken your own position.",
    related: ["ATTACK-052", "ATTACK-053", "MIDDLE-012"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-052",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Overextension",
    title: "How do I defend against an overextended attack?",
    level: "Intermediate",
    keywords: ["overextended attack", "defense", "counterplay"],
    questions: [
      "How do I punish an overextended attack?",
      "What should I do when the opponent attacks too far?"
    ],
    short_answer: "Attack the unsupported pieces, block lines, and create counterplay against the weakened structure.",
    answer: "An overextended attack can leave the attacker with weak pawns and poor coordination.",
    example: "Challenge an advanced pawn chain with a timely pawn break.",
    related: ["ATTACK-051", "ATTACK-053", "MIDDLE-048"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-053",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Piece Support",
    title: "Why must attacking pieces be supported?",
    level: "Beginner",
    keywords: ["support", "attack", "pieces"],
    questions: [
      "Why should attacking pieces support each other?",
      "What happens when an attacking piece is unsupported?"
    ],
    short_answer: "Unsupported attacking pieces can often be exchanged, chased away, or trapped.",
    answer: "Support allows an attacking piece to occupy important squares without becoming an easy target.",
    example: "A knight on an attacking outpost is stronger when protected by a pawn or piece.",
    related: ["ATTACK-011", "ATTACK-051", "MIDDLE-016"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-054",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Sacrifice",
    title: "When is a sacrifice near the king justified?",
    level: "Intermediate",
    keywords: ["sacrifice", "king attack", "calculation"],
    questions: [
      "When should I sacrifice material for a king attack?",
      "How do I know whether a sacrifice works?"
    ],
    short_answer: "A sacrifice is justified when it creates concrete compensation such as mate, decisive material gain, or a lasting attack.",
    answer: "Calculate the defender's best responses before sacrificing.",
    example: "Sacrifice a bishop on the king's pawn shield only when the resulting attack is concrete.",
    related: ["ATTACK-055", "MATE-026", "CALC-018"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-055",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Sacrifice",
    title: "What makes an attacking sacrifice sound?",
    level: "Intermediate",
    keywords: ["sacrifice", "compensation", "attack"],
    questions: [
      "What makes a sacrifice sound?",
      "How can I calculate an attacking sacrifice?"
    ],
    short_answer: "A sound sacrifice has concrete compensation that justifies the material given.",
    answer: "Look for forced checks, mating threats, material recovery, or a lasting positional advantage.",
    example: "A sacrifice that forces the king into a mating net can be sound even when material is initially lost.",
    related: ["ATTACK-054", "MATE-026", "CALC-034"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-056",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Removing Defenders",
    title: "Why should I remove defenders before attacking?",
    level: "Intermediate",
    keywords: ["remove defender", "attack", "tactics"],
    questions: [
      "Why remove defenders before an attack?",
      "How does removing a defender help a king attack?"
    ],
    short_answer: "Removing an important defender makes the remaining attacking threats harder to stop.",
    answer: "This can turn a difficult attack into a forcing tactical sequence.",
    example: "Exchange the defender of a key escape square before delivering a mating threat.",
    related: ["ATTACK-057", "TACTIC-025", "MATE-020"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-057",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Deflection",
    title: "How can I deflect a defender?",
    level: "Intermediate",
    keywords: ["deflection", "defender", "attack"],
    questions: [
      "What is deflection in a king attack?",
      "How can I force a defender away?"
    ],
    short_answer: "Deflection forces an important defender away from the square or piece it protects.",
    answer: "A sacrifice or tactical threat can make the defender move and leave a critical target exposed.",
    example: "Force a queen away from defending a mating square, then occupy that square.",
    related: ["ATTACK-056", "TACTIC-021", "MATE-020"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "ATTACK-058",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Defensive Exchanges",
    title: "Why can trading queens stop a mating attack?",
    level: "Beginner",
    keywords: ["queen exchange", "mating attack", "defense"],
    questions: [
      "Can exchanging queens stop a mating attack?",
      "Why is queen exchange a common defensive idea?"
    ],
    short_answer: "Without queens, many direct mating and checking attacks disappear or become much weaker.",
    answer: "The exchange is not automatically correct, but it can be a powerful defensive resource.",
    example: "Offer a queen trade when the opponent's attack depends on queen checks near your king.",
    related: ["ATTACK-040", "ATTACK-045", "MATE-024"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-059",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "King Centralization",
    title: "When can the king become active?",
    level: "Beginner",
    keywords: ["king activity", "king safety", "endgame"],
    questions: [
      "When can I activate my king?",
      "Why is king activity useful later in the game?"
    ],
    short_answer: "The king can become more active when major attacking pieces have been exchanged and the position is safe.",
    answer: "King activity becomes increasingly important as the game moves toward the endgame.",
    example: "After queens are exchanged, the king may safely move toward the center.",
    related: ["ATTACK-060", "END-004", "MIDDLE-030"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "ATTACK-060",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "King Activity",
    title: "Why should the king stay safe before becoming active?",
    level: "Beginner",
    keywords: ["king safety", "king activity", "middlegame"],
    questions: [
      "Why not centralize the king immediately?",
      "When is king activity dangerous?"
    ],
    short_answer: "An exposed king can become a target while queens and attacking pieces remain on the board.",
    answer: "King activity should be balanced against the tactical danger of checks and attacks.",
    example: "Keep the king sheltered while queens are active unless there is a concrete reason to move.",
    related: ["ATTACK-059", "ATTACK-061", "CALC-039"],
    source: "Chess king-safety principle",
    verified: true
  },

  {
    id: "ATTACK-061",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "King Exposure",
    title: "What is an exposed king?",
    level: "Beginner",
    keywords: ["exposed king", "king safety", "attack"],
    questions: [
      "What is an exposed king?",
      "How does a king become exposed?"
    ],
    short_answer: "An exposed king has limited shelter or is vulnerable to direct checks and attacks.",
    answer: "Open files, weak squares, missing pawns, and active enemy pieces can expose the king.",
    example: "After several pawn exchanges near the king, open files may give enemy rooks access.",
    related: ["ATTACK-062", "ATTACK-063", "MATE-019"],
    source: "Chess king-safety principle",
    verified: true
  },

  {
    id: "ATTACK-062",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "King Exposure",
    title: "How can I exploit an exposed king?",
    level: "Intermediate",
    keywords: ["exposed king", "attack", "checks"],
    questions: [
      "How should I attack an exposed king?",
      "What should I look for around an exposed king?"
    ],
    short_answer: "Look for forcing checks, open lines, weak escape squares, and ways to bring more pieces into the attack.",
    answer: "The attack should remain concrete because an exposed king can sometimes escape if the attacker lacks enough force.",
    example: "Use an open file for rook checks while the queen controls escape squares.",
    related: ["ATTACK-063", "MATE-003", "CALC-035"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-063",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Escape Squares",
    title: "How can I remove a king's escape squares?",
    level: "Intermediate",
    keywords: ["escape squares", "king attack", "mating net"],
    questions: [
      "How do I take away the king's escape squares?",
      "Why are escape squares important in mating attacks?"
    ],
    short_answer: "Control the king's legal escape squares with pieces, pawns, or the board edge.",
    answer: "Removing escape squares makes checks more powerful and can create mating nets.",
    example: "A knight can control escape squares while a rook delivers the final check.",
    related: ["ATTACK-030", "ATTACK-031", "MATE-014"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-064",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Flight Squares",
    title: "How can I create a flight square for my king?",
    level: "Beginner",
    keywords: ["flight square", "king safety", "back rank"],
    questions: [
      "How can I give my king an escape square?",
      "Why should I create luft?"
    ],
    short_answer: "A suitable pawn move can create an escape square when the position allows it.",
    answer: "The move must not create greater weaknesses or expose the king to another attack.",
    example: "A pawn move can give the king an additional square against a potential back-rank mate.",
    related: ["ATTACK-031", "ATTACK-032", "ATTACK-065"],
    source: "Chess defensive principle",
    verified: true
  },

  {
    id: "ATTACK-065",
    type: "KING_SAFETY",
    category: "Attack, Defense & King Safety",
    topic: "King Safety",
    subtopic: "Luft",
    title: "What does 'luft' mean in chess?",
    level: "Beginner",
    keywords: ["luft", "king safety", "flight square"],
    questions: [
      "What does luft mean?",
      "Why is luft important?"
    ],
    short_answer: "Luft is a safe escape square created for the king, usually by moving a pawn near it.",
    answer: "It can reduce the danger of a back-rank checkmate.",
    example: "Creating a safe square for the king can prevent a rook from delivering a simple back-rank mate.",
    related: ["ATTACK-064", "ATTACK-032", "MATE-011"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "ATTACK-066",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Final Attack",
    title: "When should I launch the final attack?",
    level: "Intermediate",
    keywords: ["attack", "mating attack", "calculation"],
    questions: [
      "When should I launch a king attack?",
      "How do I know the attack is ready?"
    ],
    short_answer: "Launch the attack when your pieces are coordinated and the opponent's king has concrete weaknesses.",
    answer: "Calculate the forcing continuation before committing to sacrifices or irreversible pawn advances.",
    example: "Bring the final attacking piece into position before opening the file toward the king.",
    related: ["ATTACK-004", "ATTACK-067", "CALC-018"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-067",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Attack Timing",
    title: "Why is timing important in an attack?",
    level: "Intermediate",
    keywords: ["attack timing", "initiative", "calculation"],
    questions: [
      "Why does attack timing matter?",
      "When is an attack too early?"
    ],
    short_answer: "An attack works best when the necessary pieces and lines are ready and the defender lacks enough time to organize.",
    answer: "Attacking too early can leave your pieces unsupported and give the opponent counterplay.",
    example: "Improve one more piece before opening the position if the attack is not yet concrete.",
    related: ["ATTACK-066", "ATTACK-051", "MIDDLE-011"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-068",
    type: "DEFENSE",
    category: "Attack, Defense & King Safety",
    topic: "Defense",
    subtopic: "Defensive Checklist",
    title: "What is a simple king-defense checklist?",
    level: "Beginner",
    keywords: ["defense checklist", "king safety", "threats"],
    questions: [
      "What should I check when my king is under pressure?",
      "What is a quick king-safety checklist?"
    ],
    short_answer: "Check immediate threats, escape squares, attackers, defenders, open lines, and possible exchanges.",
    answer: "Then look for active defensive moves or counterplay instead of defending passively.",
    example: "Ask: What is the opponent's threat? Can I exchange an attacker? Can I create an escape square?",
    related: ["ATTACK-047", "ATTACK-058", "ATTACK-069"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "ATTACK-069",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack",
    subtopic: "Attacking Checklist",
    title: "What is a simple attacking checklist?",
    level: "Beginner",
    keywords: ["attack checklist", "king attack", "strategy"],
    questions: [
      "What should I check before attacking?",
      "What is a quick king-attack checklist?"
    ],
    short_answer: "Check the king's weaknesses, escape squares, defenders, open lines, attacking pieces, and forcing moves.",
    answer: "Do not start the attack until you know what target you are attacking and how the defender can respond.",
    example: "Count attackers and defenders, then calculate your strongest checks, captures, and threats.",
    related: ["ATTACK-005", "ATTACK-011", "CALC-005"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "ATTACK-070",
    type: "ATTACK",
    category: "Attack, Defense & King Safety",
    topic: "Attack & Defense",
    subtopic: "Golden Rule",
    title: "What is the golden rule of attack and defense?",
    level: "Beginner",
    keywords: ["attack", "defense", "king safety", "strategy"],
    questions: [
      "What is the most important rule for attacking and defending?",
      "What should I remember about king safety?"
    ],
    short_answer: "Create threats while respecting the opponent's threats.",
    answer: "A strong player constantly balances attack and defense: improve your position, create forcing ideas, and never ignore the opponent's counterplay.",
    example: "Before launching an attack, ask what the opponent can do against your own king.",
    related: ["ATTACK-047", "ATTACK-066", "MIDDLE-080"],
    source: "Chess coaching principle",
    verified: true
  }
];

export default attackDefenseKingSafety;