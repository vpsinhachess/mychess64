const chessPuzzlesChallenges = [

  {
    id: "PUZZLE-001",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Basics",
    title: "What Is a Chess Puzzle?",
    level: "Beginner",
    keywords: ["puzzle", "tactics", "training"],
    questions: [
      "What is a chess puzzle?",
      "Why are chess puzzles useful?"
    ],
    short_answer: "A chess puzzle is a position that asks you to find a strong or best move.",
    answer: "Most training puzzles focus on tactics, but puzzles can also test strategy and endgames.",
    example: "A position may ask you to find a winning fork.",
    related: ["TRAIN-011", "TACTIC-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-002",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Purpose",
    title: "Why Solve Chess Puzzles?",
    level: "Beginner",
    keywords: ["puzzles", "improvement", "tactics"],
    questions: [
      "Why should I solve chess puzzles?",
      "Can puzzles improve my game?"
    ],
    short_answer: "Puzzles improve pattern recognition, calculation, and tactical awareness.",
    answer: "Regular practice helps you recognize tactical opportunities faster during games.",
    example: "After solving many fork puzzles, you may notice fork opportunities more quickly.",
    related: ["TRAIN-011", "TRAIN-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-003",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Types",
    title: "Types of Chess Puzzles",
    level: "Beginner",
    keywords: ["puzzle types", "tactics", "training"],
    questions: [
      "What types of chess puzzles are there?",
      "Are all chess puzzles tactical?"
    ],
    short_answer: "Puzzles can cover tactics, checkmates, endgames, strategy, calculation, and defense.",
    answer: "A balanced puzzle collection develops more than one chess skill.",
    example: "One puzzle may be a mate in two while another tests an endgame technique.",
    related: ["PUZZLE-004", "PUZZLE-005"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-004",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Tactical Puzzles",
    title: "Tactical Chess Puzzles",
    level: "Beginner",
    keywords: ["tactics", "puzzles", "combination"],
    questions: [
      "What is a tactical puzzle?",
      "What skills do tactical puzzles train?"
    ],
    short_answer: "Tactical puzzles ask you to find concrete moves that win material, attack the king, or gain an advantage.",
    answer: "They train calculation and recognition of tactical patterns.",
    example: "A puzzle may require a pin followed by a winning capture.",
    related: ["TACTIC-004", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-005",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mating Puzzles",
    title: "Checkmate Puzzles",
    level: "Beginner",
    keywords: ["checkmate", "mate", "puzzle"],
    questions: [
      "What are checkmate puzzles?",
      "Why should I practice mating puzzles?"
    ],
    short_answer: "Checkmate puzzles require you to find a move or sequence that forces mate.",
    answer: "They improve attacking patterns and the ability to recognize mating nets.",
    example: "A mate-in-two puzzle requires you to find the first move and the forced response.",
    related: ["MATE-001", "MATE-050"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-006",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Endgame Puzzles",
    title: "Endgame Puzzles",
    level: "Intermediate",
    keywords: ["endgame", "puzzles", "technique"],
    questions: [
      "What are endgame puzzles?",
      "Why are endgame puzzles important?"
    ],
    short_answer: "Endgame puzzles test technique, calculation, king activity, and precise moves.",
    answer: "They teach you how to convert advantages or save difficult positions.",
    example: "A puzzle may ask whether a pawn ending is won or drawn.",
    related: ["END-001", "TRAIN-056"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-007",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Strategic Puzzles",
    title: "Strategic Chess Puzzles",
    level: "Advanced",
    keywords: ["strategy", "positional", "puzzle"],
    questions: [
      "Can chess puzzles test strategy?",
      "What is a strategic puzzle?"
    ],
    short_answer: "Strategic puzzles ask you to find the best plan or positional move rather than a forcing tactic.",
    answer: "They train evaluation, planning, piece improvement, and long-term thinking.",
    example: "A puzzle may ask you to choose the best pawn break in a closed position.",
    related: ["MIDDLE-001", "POSITION-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-008",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Defensive Puzzles",
    title: "Defensive Chess Puzzles",
    level: "Intermediate",
    keywords: ["defense", "puzzle", "counterplay"],
    questions: [
      "What is a defensive chess puzzle?",
      "Why should I practice defensive puzzles?"
    ],
    short_answer: "Defensive puzzles require you to find the best way to survive an opponent's threat.",
    answer: "They develop defensive calculation and practical resourcefulness.",
    example: "A puzzle may ask you to find the only move that prevents checkmate.",
    related: ["ATTACK-039", "TRAIN-059"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-009",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Calculation",
    title: "Calculation Puzzles",
    level: "Intermediate",
    keywords: ["calculation", "puzzle", "visualization"],
    questions: [
      "What are calculation puzzles?",
      "How do calculation puzzles help?"
    ],
    short_answer: "Calculation puzzles require you to calculate a sequence accurately before choosing a move.",
    answer: "They train visualization, candidate moves, and accurate evaluation of variations.",
    example: "Calculate a forcing sequence three or four moves deep without moving the pieces.",
    related: ["CALC-014", "TRAIN-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-010",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Tactical Themes",
    title: "Puzzle Themes",
    level: "Beginner",
    keywords: ["themes", "tactics", "patterns"],
    questions: [
      "Should I solve puzzles by tactical theme?",
      "Why are puzzle themes useful?"
    ],
    short_answer: "Theme-based puzzles help you recognize recurring tactical patterns.",
    answer: "Study forks, pins, skewers, discovered attacks, deflections, and other motifs separately.",
    example: "Solve several fork puzzles to strengthen your ability to spot fork squares.",
    related: ["TRAIN-048", "TACTIC-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-011",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Checks",
    title: "Check-Based Puzzle Scan",
    level: "Beginner",
    keywords: ["checks", "tactics", "puzzle"],
    questions: [
      "Why should I look for checks first in tactical puzzles?",
      "How do checks help solve puzzles?"
    ],
    short_answer: "Checks are forcing moves that sharply reduce the opponent's choices.",
    answer: "Start many tactical positions by scanning all useful checks.",
    example: "A checking sacrifice may force the king onto a square where a fork becomes possible.",
    related: ["TACTIC-001", "CALC-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-012",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Calculation",
    title: "Solve Before Moving",
    level: "Beginner",
    keywords: ["calculation", "puzzle solving", "thinking"],
    questions: [
      "Should I move pieces while solving puzzles?",
      "Why should I calculate before moving?"
    ],
    short_answer: "Calculate the solution first so the puzzle trains your thinking rather than trial and error.",
    answer: "Try to see the complete tactical idea before making the move.",
    example: "Find the sacrifice and calculate the opponent's forced reply before playing it.",
    related: ["TRAIN-013", "TRAIN-046"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-013",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Difficulty",
    title: "Choose the Right Puzzle Difficulty",
    level: "Beginner",
    keywords: ["difficulty", "puzzles", "training"],
    questions: [
      "How difficult should my chess puzzles be?",
      "Should beginners solve hard puzzles?"
    ],
    short_answer: "Use puzzles that challenge you without making every position a blind guess.",
    answer: "Build a foundation with manageable positions and gradually increase difficulty.",
    example: "A beginner can start with simple forks and mates before attempting complex combinations.",
    related: ["TRAIN-072", "TRAIN-048"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-014",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Difficulty",
    title: "When a Puzzle Is Too Hard",
    level: "Beginner",
    keywords: ["hard puzzle", "learning", "training"],
    questions: [
      "What should I do if a puzzle is too hard?",
      "Should I keep guessing?"
    ],
    short_answer: "Stop guessing, study the solution, and understand the tactical idea.",
    answer: "A difficult puzzle can still teach you if you understand why the solution works.",
    example: "After missing a sacrifice, reconstruct the position and calculate the line again.",
    related: ["TRAIN-047", "TRAIN-052"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-015",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Errors",
    title: "Learn from a Wrong Puzzle Answer",
    level: "Beginner",
    keywords: ["wrong answer", "puzzle", "learning"],
    questions: [
      "What should I do after getting a puzzle wrong?",
      "Is getting puzzles wrong useful?"
    ],
    short_answer: "Yes, if you understand the reason for the mistake.",
    answer: "Identify whether you missed a tactic, miscalculated, overlooked a defense, or misunderstood the position.",
    example: "If you missed a defender, study why the target was actually protected.",
    related: ["TRAIN-041", "TRAIN-047"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-016",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Pattern Recognition",
    title: "Puzzle Pattern Recognition",
    level: "Beginner",
    keywords: ["patterns", "recognition", "tactics"],
    questions: [
      "How do puzzles improve pattern recognition?",
      "Why do familiar tactics become easier?"
    ],
    short_answer: "Repeated exposure helps your brain recognize similar tactical structures faster.",
    answer: "Study the underlying pattern rather than memorizing the exact position.",
    example: "After many smothered mate puzzles, you may recognize the setup immediately.",
    related: ["TRAIN-049", "MATE-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-017",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Visualization",
    title: "Puzzle Visualization",
    level: "Intermediate",
    keywords: ["visualization", "puzzle", "calculation"],
    questions: [
      "Can puzzles improve visualization?",
      "How should I visualize a puzzle line?"
    ],
    short_answer: "Calculate the moves mentally and keep track of the changed position.",
    answer: "Focus on the relevant pieces and update their squares after every move.",
    example: "Visualize a knight fork after your queen sacrifice before checking the board.",
    related: ["CALC-025", "TRAIN-031"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-018",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Method",
    title: "Use Checks, Captures, Threats",
    level: "Beginner",
    keywords: ["checks", "captures", "threats", "puzzle"],
    questions: [
      "What method can I use to solve tactical puzzles?",
      "What should I scan first?"
    ],
    short_answer: "Start with checks, captures, and strong threats.",
    answer: "These forcing moves reduce the number of candidate moves and often reveal the tactical solution.",
    example: "Look for a checking move before considering a quiet improvement.",
    related: ["CALC-006", "THINK-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-019",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Candidate Moves",
    title: "Generate Candidates in Puzzles",
    level: "Intermediate",
    keywords: ["candidate moves", "puzzles", "calculation"],
    questions: [
      "How many candidate moves should I consider in a puzzle?",
      "Why should I limit candidates?"
    ],
    short_answer: "Consider a small number of serious candidates, starting with forcing moves.",
    answer: "Too many weak candidates can make calculation slower and less accurate.",
    example: "Compare two strong tactical moves rather than every legal queen move.",
    related: ["CALC-004", "TRAIN-017"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-020",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Opponent Defense",
    title: "Find the Opponent's Best Defense",
    level: "Intermediate",
    keywords: ["defense", "calculation", "puzzle"],
    questions: [
      "Why should I find the opponent's best defense in a puzzle?",
      "How does defensive calculation help?"
    ],
    short_answer: "A correct solution must survive the opponent's strongest response.",
    answer: "After finding your candidate move, actively search for the best defensive reply.",
    example: "A sacrifice is not correct if the opponent has one simple move that stops the attack.",
    related: ["CALC-010", "TRAIN-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-021",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Forks",
    title: "Fork Puzzles",
    level: "Beginner",
    keywords: ["fork", "knight fork", "puzzle"],
    questions: [
      "What is a fork puzzle?",
      "How should I solve fork puzzles?"
    ],
    short_answer: "Find a move that attacks two or more targets simultaneously.",
    answer: "Look for pieces or pawns that can attack multiple valuable targets from one square.",
    example: "A knight forks the king and rook, winning the rook.",
    related: ["TACTIC-010", "MISTAKE-017"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-022",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Pins",
    title: "Pin Puzzles",
    level: "Beginner",
    keywords: ["pin", "tactics", "puzzle"],
    questions: [
      "What is a pin puzzle?",
      "How do I recognize a tactical pin?"
    ],
    short_answer: "Find a move that restricts a piece because moving it exposes a more valuable target.",
    answer: "Check lines involving kings, queens, and other valuable pieces.",
    example: "A bishop pins a knight to the king and creates a tactical win.",
    related: ["TACTIC-015", "MISTAKE-016"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-023",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Skewers",
    title: "Skewer Puzzles",
    level: "Intermediate",
    keywords: ["skewer", "tactics", "puzzle"],
    questions: [
      "What is a skewer puzzle?",
      "How do I spot a skewer?"
    ],
    short_answer: "A skewer attacks a valuable front piece and wins something behind it after the front piece moves.",
    answer: "Look for aligned king, queen, rook, or other valuable pieces.",
    example: "A rook checks the king and then captures the rook behind it.",
    related: ["TACTIC-018", "MISTAKE-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-024",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Discovered Attack",
    title: "Discovered Attack Puzzles",
    level: "Intermediate",
    keywords: ["discovered attack", "tactics", "puzzle"],
    questions: [
      "What should I look for in discovered attack puzzles?",
      "How does a discovered attack work?"
    ],
    short_answer: "Move one piece to uncover an attack from another piece behind it.",
    answer: "Look for aligned pieces where moving the front piece creates a new threat.",
    example: "A knight moves with tempo while a bishop behind it attacks the queen.",
    related: ["TACTIC-022", "MISTAKE-019"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-025",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Double Attack",
    title: "Double Attack Puzzles",
    level: "Beginner",
    keywords: ["double attack", "tactics", "puzzle"],
    questions: [
      "What is a double attack puzzle?",
      "How do double attacks win material?"
    ],
    short_answer: "A double attack creates two threats at once.",
    answer: "The opponent may be unable to defend both targets simultaneously.",
    example: "A queen move attacks both a rook and a weak pawn.",
    related: ["TACTIC-025", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-026",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Deflection",
    title: "Deflection Puzzles",
    level: "Intermediate",
    keywords: ["deflection", "tactics", "puzzle"],
    questions: [
      "What is a deflection puzzle?",
      "How does deflection work?"
    ],
    short_answer: "Deflection forces a defending piece away from an important square or target.",
    answer: "Find a move that makes the defender leave its defensive duty.",
    example: "A sacrifice forces a rook away from protecting the queen.",
    related: ["TACTIC-036", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-027",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Decoy",
    title: "Decoy Puzzles",
    level: "Intermediate",
    keywords: ["decoy", "attraction", "tactics"],
    questions: [
      "What is a decoy puzzle?",
      "How does a decoy tactic work?"
    ],
    short_answer: "A decoy lures a piece onto a vulnerable square where a tactic can be executed.",
    answer: "Look for a valuable piece that can be attracted to a specific square.",
    example: "A sacrifice lures the king onto a square where a fork becomes possible.",
    related: ["TACTIC-034", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-028",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Removing Defender",
    title: "Remove the Defender Puzzles",
    level: "Intermediate",
    keywords: ["remove defender", "tactics", "puzzle"],
    questions: [
      "What is a removing-the-defender puzzle?",
      "How do I identify the defending piece?"
    ],
    short_answer: "The solution first eliminates a key defender and then wins the target.",
    answer: "Identify which piece is protecting the tactical target.",
    example: "Capture the only defender of a rook and then win the rook.",
    related: ["TACTIC-036", "TACTIC-038"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-029",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Overloading",
    title: "Overloading Puzzles",
    level: "Intermediate",
    keywords: ["overloading", "defender", "tactics"],
    questions: [
      "What is an overloaded piece?",
      "How do overload puzzles work?"
    ],
    short_answer: "An overloaded piece has too many defensive responsibilities.",
    answer: "Attack one of its duties so the defender cannot maintain everything.",
    example: "A queen defending both a rook and a mating square cannot handle both threats.",
    related: ["TACTIC-041", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-030",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Interference",
    title: "Interference Puzzles",
    level: "Advanced",
    keywords: ["interference", "line", "tactics"],
    questions: [
      "What is an interference puzzle?",
      "How does interference work?"
    ],
    short_answer: "Interference blocks a line between a defending piece and its target.",
    answer: "Look for a square where a piece can interrupt an important defensive line.",
    example: "A knight lands between a rook and the piece it protects.",
    related: ["TACTIC-044", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-031",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Clearance",
    title: "Clearance Puzzles",
    level: "Advanced",
    keywords: ["clearance", "tactics", "line"],
    questions: [
      "What is a clearance tactic?",
      "How do clearance puzzles work?"
    ],
    short_answer: "A clearance move vacates a square or line so another piece can use it.",
    answer: "Look for a piece that can move with tempo while opening a line for another piece.",
    example: "A bishop moves away to clear a diagonal for the queen.",
    related: ["TACTIC-046", "CALC-021"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-032",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Zwischenzug",
    title: "Zwischenzug Puzzles",
    level: "Advanced",
    keywords: ["zwischenzug", "intermediate move", "tactics"],
    questions: [
      "What is a zwischenzug puzzle?",
      "Why are intermediate moves difficult?"
    ],
    short_answer: "A zwischenzug is a forcing intermediate move played before an expected recapture.",
    answer: "Look for checks, captures, or threats that change the position before completing the obvious move.",
    example: "Instead of immediately recapturing, give a check that wins additional material.",
    related: ["TACTIC-050", "CALC-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-033",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Back Rank",
    title: "Back-Rank Puzzle",
    level: "Beginner",
    keywords: ["back rank", "mate", "puzzle"],
    questions: [
      "What is a back-rank puzzle?",
      "How do I spot a back-rank tactic?"
    ],
    short_answer: "Back-rank puzzles often involve a trapped king and a rook or queen delivering mate or winning material.",
    answer: "Check whether the king has escape squares and whether the back rank can be attacked.",
    example: "A rook check on the back rank can produce mate when the king is trapped by its own pawns.",
    related: ["MATE-010", "MISTAKE-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-034",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mating Net",
    title: "Mating Net Puzzles",
    level: "Intermediate",
    keywords: ["mating net", "attack", "puzzle"],
    questions: [
      "What is a mating-net puzzle?",
      "How do mating nets work?"
    ],
    short_answer: "A mating net restricts the king until checkmate becomes unavoidable.",
    answer: "Look for ways to remove escape squares and coordinate attacking pieces.",
    example: "A queen and knight can combine to cover the king's escape squares.",
    related: ["MATE-017", "ATTACK-005"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-035",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Sacrifice",
    title: "Sacrifice Puzzles",
    level: "Intermediate",
    keywords: ["sacrifice", "combination", "puzzle"],
    questions: [
      "How should I solve sacrifice puzzles?",
      "When can a sacrifice be correct?"
    ],
    short_answer: "Calculate the compensation before giving up material.",
    answer: "Look for forced mate, material recovery, promotion, or a decisive positional gain.",
    example: "A bishop sacrifice may open lines toward the enemy king.",
    related: ["TACTIC-064", "MISTAKE-052"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-036",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Greek Gift",
    title: "Greek Gift Puzzles",
    level: "Advanced",
    keywords: ["Greek Gift", "bishop sacrifice", "attack"],
    questions: [
      "What is a Greek Gift puzzle?",
      "What should I calculate before a Greek Gift sacrifice?"
    ],
    short_answer: "The Greek Gift is typically a bishop sacrifice on h7 or h2 designed to expose the king and launch an attack.",
    answer: "Check the attacking pieces, king escape squares, and continuation before sacrificing.",
    example: "A bishop sacrifices on h7 followed by a knight or queen joining the attack.",
    related: ["MATE-026", "TACTIC-064"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-037",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Promotion",
    title: "Promotion Puzzles",
    level: "Intermediate",
    keywords: ["promotion", "pawn", "puzzle"],
    questions: [
      "What should I look for in promotion puzzles?",
      "Can promotion itself be a tactical move?"
    ],
    short_answer: "Promotion can create immediate threats and may sometimes involve underpromotion.",
    answer: "Calculate whether promotion gives check and what the opponent can do afterward.",
    example: "A pawn promotes with check and forces the king away from defending another pawn.",
    related: ["END-051", "PRACTICAL-END-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-038",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Underpromotion",
    title: "Underpromotion Puzzles",
    level: "Advanced",
    keywords: ["underpromotion", "knight", "promotion"],
    questions: [
      "Why would a player underpromote?",
      "What do underpromotion puzzles test?"
    ],
    short_answer: "Sometimes promoting to a knight, rook, or bishop is more useful than choosing a queen.",
    answer: "Underpromotion can deliver check, avoid stalemate, or create a specific tactical result.",
    example: "Promoting to a knight can give a unique check that a queen cannot give.",
    related: ["MOVE-046", "PRACTICAL-END-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-039",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Perpetual Check",
    title: "Perpetual Check Puzzles",
    level: "Intermediate",
    keywords: ["perpetual check", "draw", "queen"],
    questions: [
      "What is a perpetual-check puzzle?",
      "When is perpetual check the correct solution?"
    ],
    short_answer: "Perpetual check can force a draw when the opponent cannot escape repeated checks.",
    answer: "It is especially important when you are worse but can force repetition.",
    example: "A queen repeatedly checks an exposed king and prevents the opponent from escaping.",
    related: ["END-043", "TACTIC-073"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-040",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Defensive Tactics",
    title: "Defensive Tactical Puzzles",
    level: "Intermediate",
    keywords: ["defense", "tactics", "puzzle"],
    questions: [
      "Can a defensive move be a tactical solution?",
      "Why are defensive puzzles important?"
    ],
    short_answer: "Yes. The best move may prevent a threat, force simplification, or create counterplay.",
    answer: "Do not assume every puzzle requires an attack.",
    example: "A queen trade may be the only move that prevents a mating attack.",
    related: ["ATTACK-039", "TRAIN-059"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-041",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Repeated Practice",
    title: "Repeat Missed Puzzles",
    level: "Beginner",
    keywords: ["repeat", "puzzle", "training"],
    questions: [
      "Should I repeat puzzles I missed?",
      "How often should I revisit difficult puzzles?"
    ],
    short_answer: "Revisit missed puzzles until you understand the underlying pattern.",
    answer: "Leave some time between attempts so you test understanding rather than short-term memory.",
    example: "Retry a difficult tactical puzzle a few days later.",
    related: ["TRAIN-047", "PUZZLE-015"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-042",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Journal",
    title: "Keep a Puzzle Mistake Log",
    level: "Intermediate",
    keywords: ["puzzle log", "mistakes", "training"],
    questions: [
      "Should I record puzzle mistakes?",
      "What should I write in a puzzle log?"
    ],
    short_answer: "A puzzle log can reveal which tactical themes you repeatedly miss.",
    answer: "Record the theme, why you missed it, and what you should notice next time.",
    example: "Write 'missed defender' after repeatedly overlooking a protected piece.",
    related: ["TRAIN-045", "TRAIN-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-043",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Speed",
    title: "Puzzle Speed vs Accuracy",
    level: "Beginner",
    keywords: ["speed", "accuracy", "puzzles"],
    questions: [
      "Should I solve puzzles quickly?",
      "Is speed more important than accuracy?"
    ],
    short_answer: "Accuracy should come before speed during serious tactical training.",
    answer: "Calculate correctly first; speed develops naturally through pattern recognition.",
    example: "Take enough time to verify a combination rather than guessing quickly.",
    related: ["TRAIN-072", "CALC-032"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-044",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Timed Puzzles",
    title: "Timed Puzzle Training",
    level: "Intermediate",
    keywords: ["timed puzzles", "speed", "training"],
    questions: [
      "Are timed chess puzzles useful?",
      "When should I use puzzle speed training?"
    ],
    short_answer: "Timed puzzles can improve tactical recognition after basic accuracy is established.",
    answer: "Use timed practice as a supplement, not as a replacement for deep calculation.",
    example: "After learning fork patterns, solve a timed set to improve recognition speed.",
    related: ["PUZZLE-043", "TRAIN-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-045",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Blindfold",
    title: "Blindfold Puzzle Training",
    level: "Advanced",
    keywords: ["blindfold", "visualization", "puzzles"],
    questions: [
      "Can I solve chess puzzles without seeing the board?",
      "Is blindfold puzzle solving useful?"
    ],
    short_answer: "It can strengthen visualization when used at an appropriate difficulty.",
    answer: "Start with short tactical sequences and gradually increase complexity.",
    example: "Read a FEN and calculate a simple tactical combination without displaying the board.",
    related: ["TRAIN-032", "CALC-027"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-046",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "FEN",
    title: "Solve Puzzles from FEN",
    level: "Intermediate",
    keywords: ["FEN", "puzzle", "position"],
    questions: [
      "Can chess puzzles be given as FEN?",
      "Why is FEN useful for puzzle training?"
    ],
    short_answer: "FEN describes a chess position precisely and can be used to recreate puzzle positions.",
    answer: "FEN is useful for digital chess tools, analysis boards, and custom training systems.",
    example: "Load a FEN into a chessboard and solve the position without seeing the original game.",
    related: ["NOTATION-041", "TECH-012"],
    source: "Chess notation standard / Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-047",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "PGN",
    title: "Create Puzzles from Games",
    level: "Intermediate",
    keywords: ["PGN", "games", "puzzles"],
    questions: [
      "Can I create puzzles from my own games?",
      "Why are personal-game puzzles useful?"
    ],
    short_answer: "Yes. Critical positions from your own games make highly relevant training puzzles.",
    answer: "Select positions where you missed a tactic, plan, defense, or winning opportunity.",
    example: "Turn a missed fork from your own game into a puzzle and solve it later.",
    related: ["TRAIN-037", "TRAIN-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-048",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Creation",
    title: "Create Your Own Chess Puzzles",
    level: "Intermediate",
    keywords: ["puzzle creation", "training", "positions"],
    questions: [
      "How can I create my own chess puzzles?",
      "What makes a good chess puzzle?"
    ],
    short_answer: "A good puzzle has a clear instructional idea and a meaningful best move or sequence.",
    answer: "Use positions from games, studies, tactical examples, or your own training material.",
    example: "Create a puzzle where the learner must find a defensive resource.",
    related: ["PUZZLE-047", "TRAIN-052"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-049",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Quality",
    title: "What Makes a Good Puzzle?",
    level: "Intermediate",
    keywords: ["puzzle quality", "training", "tactics"],
    questions: [
      "What makes a chess puzzle useful?",
      "Should every puzzle have one obvious answer?"
    ],
    short_answer: "A useful puzzle has a meaningful decision and teaches a recognizable chess idea.",
    answer: "The solution should be understandable and connected to a practical concept.",
    example: "A puzzle showing a typical back-rank tactic is useful because the pattern can recur in games.",
    related: ["PUZZLE-048", "TRAIN-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-050",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Sources",
    title: "Use Real Game Positions",
    level: "Intermediate",
    keywords: ["real games", "puzzles", "training"],
    questions: [
      "Are puzzles from real games useful?",
      "Why study tactical positions from actual games?"
    ],
    short_answer: "Real-game positions connect puzzle patterns with practical chess.",
    answer: "They show how tactics arise naturally from opening and middlegame positions.",
    example: "Study a tactical mistake from a tournament game and identify what the player missed.",
    related: ["GAME-001", "TRAIN-037"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-051",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mate in One",
    title: "Mate-in-One Puzzles",
    level: "Beginner",
    keywords: ["mate in one", "checkmate", "puzzle"],
    questions: [
      "What is a mate-in-one puzzle?",
      "Why should beginners solve mate-in-one puzzles?"
    ],
    short_answer: "A mate-in-one puzzle asks you to find a single move that checkmates.",
    answer: "These puzzles teach basic mating patterns and awareness of escape squares.",
    example: "Find the queen move that covers every king escape square and gives mate.",
    related: ["MATE-050", "TRAIN-048"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-052",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mate in Two",
    title: "Mate-in-Two Puzzles",
    level: "Intermediate",
    keywords: ["mate in two", "checkmate", "puzzle"],
    questions: [
      "What is a mate-in-two puzzle?",
      "Why are mate-in-two puzzles harder?"
    ],
    short_answer: "A mate-in-two requires a first move that creates unavoidable mate after the opponent's response.",
    answer: "You must consider multiple defensive replies and the mating move for each.",
    example: "The key move may not give check but creates a threat of mate.",
    related: ["MATE-051", "CALC-032"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-053",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mate in Three",
    title: "Mate-in-Three Puzzles",
    level: "Advanced",
    keywords: ["mate in three", "checkmate", "calculation"],
    questions: [
      "What is a mate-in-three puzzle?",
      "What skill does mate-in-three training develop?"
    ],
    short_answer: "Mate-in-three puzzles require deeper calculation and control of multiple defensive resources.",
    answer: "They train long forcing variations and mating-net construction.",
    example: "The first move creates a threat, the opponent defends, and the final sequence mates.",
    related: ["MATE-052", "CALC-035"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-054",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Chess Studies",
    title: "Chess Studies",
    level: "Advanced",
    keywords: ["chess study", "composition", "endgame"],
    questions: [
      "What is a chess study?",
      "How are chess studies different from normal puzzles?"
    ],
    short_answer: "A chess study is a composed position designed around a specific problem or artistic idea.",
    answer: "Studies often contain deep endgame ideas, surprising moves, or precise solutions.",
    example: "A study may require a unique move to draw an apparently lost ending.",
    related: ["END-060", "PUZZLE-006"],
    source: "Chess composition principle",
    verified: true
  },

  {
    id: "PUZZLE-055",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Retro",
    title: "Retro Chess Puzzles",
    level: "Advanced",
    keywords: ["retro puzzle", "chess composition", "history"],
    questions: [
      "What is a retro chess puzzle?",
      "What do retro puzzles ask?"
    ],
    short_answer: "Retro puzzles ask questions about the possible history of a chess position.",
    answer: "They may ask which move was played previously or how a position could have arisen.",
    example: "A retro puzzle may ask whether the last move could have been an en passant capture.",
    related: ["RULE-029", "HISTORY-060"],
    source: "Chess composition principle",
    verified: true
  },

  {
    id: "PUZZLE-056",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Fairy Chess",
    title: "Fairy Chess Puzzles",
    level: "Advanced",
    keywords: ["fairy chess", "composition", "puzzle"],
    questions: [
      "What is fairy chess?",
      "Are fairy chess puzzles standard chess?"
    ],
    short_answer: "Fairy chess uses non-standard pieces, rules, or conditions in chess compositions.",
    answer: "It is a chess-composition field rather than ordinary tournament chess.",
    example: "A composition may introduce a special piece with different movement rules.",
    related: ["HISTORY-060", "FACT-090"],
    source: "Chess composition principle",
    verified: true
  },

  {
    id: "PUZZLE-057",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Endgame Challenge",
    title: "King and Pawn Challenge",
    level: "Beginner",
    keywords: ["king pawn", "endgame", "challenge"],
    questions: [
      "What is a good beginner endgame challenge?",
      "Why practice king and pawn endings?"
    ],
    short_answer: "King-and-pawn endings teach opposition, key squares, and accurate calculation.",
    answer: "They provide a simple environment for learning fundamental endgame technique.",
    example: "Determine whether the king can reach the key square before the pawn promotes.",
    related: ["END-005", "PRACTICAL-END-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-058",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Rook Challenge",
    title: "Rook Endgame Challenge",
    level: "Intermediate",
    keywords: ["rook ending", "endgame", "challenge"],
    questions: [
      "What is a useful rook-endgame puzzle?",
      "Which rook techniques should I practice?"
    ],
    short_answer: "Practice active rook defense, checking, cutting off the king, and conversion techniques.",
    answer: "Rook endings reward accurate calculation and active piece placement.",
    example: "Find the drawing method in a rook-versus-pawn position.",
    related: ["PRACTICAL-END-025", "END-031"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-059",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mating Challenge",
    title: "Mating Pattern Challenge",
    level: "Beginner",
    keywords: ["mating patterns", "checkmate", "challenge"],
    questions: [
      "How can I train mating patterns?",
      "What mating patterns should I know?"
    ],
    short_answer: "Practice back-rank, smothered, corridor, and common queen-piece mating patterns.",
    answer: "Pattern recognition makes attacking opportunities easier to recognize.",
    example: "Set up a king trapped behind pawns and practice finding the mating move.",
    related: ["MATE-010", "MATE-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-060",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Blunder Challenge",
    title: "Find the Blunder Challenge",
    level: "Intermediate",
    keywords: ["blunder", "analysis", "challenge"],
    questions: [
      "What is a find-the-blunder puzzle?",
      "How does it help improve my chess?"
    ],
    short_answer: "You identify the move that caused a serious tactical or positional problem.",
    answer: "This trains awareness of turning points and practical mistakes.",
    example: "Given a game position, identify which move first allowed a winning tactic.",
    related: ["TRAIN-038", "TRAIN-039"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-061",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Best Move",
    title: "Find the Best Move",
    level: "Intermediate",
    keywords: ["best move", "position", "challenge"],
    questions: [
      "What does a find-the-best-move puzzle test?",
      "Why are best-move puzzles useful?"
    ],
    short_answer: "They test your ability to evaluate a position and choose the strongest practical move.",
    answer: "Unlike pure tactics, the best move may be quiet and require positional understanding.",
    example: "The correct move may simply improve your worst piece.",
    related: ["THINK-032", "MIDDLE-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-062",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Defensive Challenge",
    title: "Find the Only Defense",
    level: "Advanced",
    keywords: ["only move", "defense", "challenge"],
    questions: [
      "What is an only-move puzzle?",
      "Why are only-move puzzles difficult?"
    ],
    short_answer: "An only-move puzzle requires finding the single move that maintains the position or avoids a serious loss.",
    answer: "These puzzles develop defensive calculation and accuracy under pressure.",
    example: "Only one move prevents a forced mating attack.",
    related: ["ATTACK-041", "TRAIN-059"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-063",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Zugzwang",
    title: "Zugzwang Puzzles",
    level: "Advanced",
    keywords: ["zugzwang", "endgame", "puzzle"],
    questions: [
      "What is a zugzwang puzzle?",
      "Why is zugzwang important in chess?"
    ],
    short_answer: "A zugzwang position forces a player to move even though every move worsens the position.",
    answer: "Such puzzles teach the value of waiting, opposition, and reserve tempi.",
    example: "In a king-and-pawn ending, one king may lose because it must move first.",
    related: ["END-019", "PRACTICAL-END-023"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-064",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Prophylaxis",
    title: "Prophylactic Puzzles",
    level: "Advanced",
    keywords: ["prophylaxis", "strategy", "puzzle"],
    questions: [
      "Can puzzles test prophylaxis?",
      "What does a prophylactic puzzle ask?"
    ],
    short_answer: "It asks you to prevent the opponent's important plan before pursuing your own.",
    answer: "These puzzles develop strategic awareness rather than tactical pattern recognition alone.",
    example: "The best move may stop an opponent's pawn break instead of starting your own attack.",
    related: ["MIDDLE-031", "THINK-031"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-065",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Difficulty",
    title: "Progressive Puzzle Training",
    level: "Beginner",
    keywords: ["progressive training", "difficulty", "puzzles"],
    questions: [
      "How should puzzle difficulty increase?",
      "Why use progressive puzzle training?"
    ],
    short_answer: "Increase difficulty gradually as accuracy and understanding improve.",
    answer: "Progress from simple patterns to multi-step combinations and complex strategic positions.",
    example: "Move from mate-in-one puzzles to mate-in-two and then deeper combinations.",
    related: ["PUZZLE-013", "TRAIN-070"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-066",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Mixed Training",
    title: "Mixed Puzzle Sets",
    level: "Intermediate",
    keywords: ["mixed puzzles", "training", "tactics"],
    questions: [
      "Why solve mixed chess puzzles?",
      "Are mixed puzzles harder than themed puzzles?"
    ],
    short_answer: "Mixed puzzles force you to identify the tactical or strategic idea without being told the theme.",
    answer: "They more closely resemble real-game decision-making.",
    example: "A mixed puzzle may be a fork, pin, sacrifice, or quiet defensive move without revealing which.",
    related: ["TRAIN-049", "PUZZLE-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-067",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Difficulty",
    title: "Easy Puzzles Still Matter",
    level: "Beginner",
    keywords: ["easy puzzles", "training", "patterns"],
    questions: [
      "Are easy chess puzzles useful?",
      "Should strong players still solve simple puzzles?"
    ],
    short_answer: "Easy puzzles can reinforce basic patterns and improve recognition speed.",
    answer: "Use them for confidence, pattern reinforcement, and quick tactical warm-ups.",
    example: "Solve a short set of basic forks before a serious calculation session.",
    related: ["PUZZLE-043", "TRAIN-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-068",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Daily Training",
    title: "Daily Puzzle Habit",
    level: "Beginner",
    keywords: ["daily puzzle", "routine", "training"],
    questions: [
      "Should I solve chess puzzles every day?",
      "How many puzzles should I solve daily?"
    ],
    short_answer: "A small, consistent puzzle habit can be very effective.",
    answer: "Quality and calculation matter more than simply counting solved puzzles.",
    example: "Solve five carefully calculated puzzles each day and review the ones you miss.",
    related: ["TRAIN-006", "TRAIN-007"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-069",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Puzzle Review",
    title: "Review Your Puzzle Session",
    level: "Intermediate",
    keywords: ["puzzle review", "training", "mistakes"],
    questions: [
      "Should I review puzzles after solving them?",
      "What should I review?"
    ],
    short_answer: "Reviewing mistakes turns puzzle solving into deeper learning.",
    answer: "Check why your answer failed and identify the tactical or strategic pattern.",
    example: "If you missed a defender, examine the board again and identify the hidden protection.",
    related: ["TRAIN-041", "PUZZLE-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PUZZLE-070",
    type: "PUZZLE",
    category: "Chess Puzzles",
    topic: "Chess Puzzles & Challenges",
    subtopic: "Complete Puzzle Method",
    title: "The Complete Puzzle-Solving Method",
    level: "Intermediate",
    keywords: ["puzzle method", "calculation", "tactics"],
    questions: [
      "What is the best way to solve a chess puzzle?",
      "What should I do before giving my answer?"
    ],
    short_answer: "Scan forcing moves, calculate the opponent's best defense, and verify the final position.",
    answer: "Start with checks, captures, and threats; compare serious candidates; calculate the line; then confirm the result.",
    example: "Find a checking move, calculate every legal reply, and verify whether the resulting position actually wins.",
    related: ["CALC-006", "TRAIN-014", "MISTAKE-070"],
    source: "Chess coaching principle",
    verified: true
  }

];

export default chessPuzzlesChallenges;