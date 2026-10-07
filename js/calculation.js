const calculationVisualization = [
  {
    id: "CALC-001",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Definition",
    title: "What is chess calculation?",
    level: "Beginner",
    keywords: ["calculation", "variations", "moves"],
    questions: [
      "What is calculation in chess?",
      "What does a chess player calculate?"
    ],
    short_answer: "Calculation means mentally working out possible moves and their consequences before playing.",
    answer: "A player calculates a line by considering candidate moves, the opponent's best replies, and the resulting position.",
    example: "Before playing a capture, calculate the opponent's recapture and your next move.",
    related: ["CALC-002", "CALC-004", "CALC-009"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-002",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Candidate Moves",
    title: "What is a candidate move?",
    level: "Beginner",
    keywords: ["candidate move", "calculation", "choice"],
    questions: [
      "What is a candidate move in chess?",
      "How do I choose moves to calculate?"
    ],
    short_answer: "A candidate move is a serious move that deserves calculation.",
    answer: "Instead of calculating every legal move, first select a few promising moves based on checks, captures, threats, and positional ideas.",
    example: "If you have a forcing check and a strong capture, calculate those before quiet moves.",
    related: ["CALC-003", "CALC-004", "THINK-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-003",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Move Selection",
    title: "How many candidate moves should I calculate?",
    level: "Beginner",
    keywords: ["candidate moves", "calculation", "selection"],
    questions: [
      "How many candidate moves should I consider?",
      "Should I calculate every legal move?"
    ],
    short_answer: "Usually calculate two or three serious candidates.",
    answer: "Calculating too many moves wastes time. Focus on forcing moves and the strongest strategic possibilities.",
    example: "Compare a check, a tactical capture, and one strong positional move.",
    related: ["CALC-002", "CALC-004", "CALC-033"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-004",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Forcing Moves",
    title: "Why should I calculate forcing moves first?",
    level: "Beginner",
    keywords: ["forcing moves", "checks", "captures", "threats"],
    questions: [
      "Why calculate forcing moves first?",
      "Which moves are easiest to calculate?"
    ],
    short_answer: "Forcing moves limit the opponent's choices.",
    answer: "Checks, strong captures, and direct threats often produce concrete variations that are easier to calculate accurately.",
    example: "Look for a check before spending time on a quiet pawn move.",
    related: ["CALC-005", "TACTIC-001", "THINK-004"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-005",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Forcing Moves",
    title: "What is the checks-captures-threats method?",
    level: "Beginner",
    keywords: ["checks", "captures", "threats", "CCT"],
    questions: [
      "What should I look for before calculating?",
      "What is the checks captures threats method?"
    ],
    short_answer: "Scan checks, captures, and threats before choosing a move.",
    answer: "This forcing-move scan helps discover tactical opportunities and prevents you from overlooking immediate possibilities.",
    example: "Before making a positional move, ask: Do I have a check, capture, or direct threat?",
    related: ["CALC-004", "CALC-006", "TACTIC-002"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-006",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Opponent Responses",
    title: "How should I calculate my opponent's reply?",
    level: "Beginner",
    keywords: ["opponent", "reply", "response", "calculation"],
    questions: [
      "How do I find my opponent's best response?",
      "What should I calculate after my move?"
    ],
    short_answer: "Always search for the opponent's strongest forcing reply.",
    answer: "After imagining your move, switch perspective and look for the opponent's checks, captures, threats, and tactical resources.",
    example: "After attacking a queen, check whether your opponent has a stronger check against your king.",
    related: ["CALC-005", "CALC-007", "CALC-011"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-007",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Opponent Responses",
    title: "What does 'best reply' mean in calculation?",
    level: "Intermediate",
    keywords: ["best reply", "opponent", "calculation"],
    questions: [
      "What is the best reply in a calculation?",
      "Why must I assume strong defense?"
    ],
    short_answer: "The best reply is the opponent's strongest practical or objective response.",
    answer: "Do not calculate only the reply you hope your opponent will make. Test your move against the strongest defense you can find.",
    example: "If your move wins against one defense but fails against another, the second defense matters.",
    related: ["CALC-006", "CALC-018", "THINK-011"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-008",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Calculation Tree",
    title: "What is a calculation tree?",
    level: "Intermediate",
    keywords: ["calculation tree", "variations", "branches"],
    questions: [
      "What is a calculation tree in chess?",
      "Why do variations branch?"
    ],
    short_answer: "A calculation tree represents different possible moves and responses from a position.",
    answer: "Each move creates possible replies, creating branches. Strong calculation focuses on the most important branches rather than every legal possibility.",
    example: "Your candidate move may have three serious defensive replies, creating three main branches.",
    related: ["CALC-002", "CALC-009", "CALC-014"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-009",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Calculation Depth",
    title: "How many moves ahead should I calculate?",
    level: "Beginner",
    keywords: ["calculation depth", "moves ahead", "variations"],
    questions: [
      "How many moves should I calculate ahead?",
      "Is calculating deeper always better?"
    ],
    short_answer: "Calculate as deeply as the position requires, not to a fixed number.",
    answer: "A short tactical line may be decisive, while a complicated position may require much deeper calculation. Accuracy matters more than counting moves.",
    example: "Calculate until the tactical sequence ends and you can evaluate the resulting position.",
    related: ["CALC-010", "CALC-019", "CALC-031"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-010",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Calculation Depth",
    title: "When should I stop calculating?",
    level: "Intermediate",
    keywords: ["calculation", "stop calculation", "evaluation"],
    questions: [
      "When can I stop a variation?",
      "How do I know my calculation is finished?"
    ],
    short_answer: "Stop when the position becomes clear enough to evaluate and no forcing continuation changes the conclusion.",
    answer: "A calculation should reach a stable point where the tactical sequence has ended or the resulting position can be judged confidently.",
    example: "After exchanges finish and material and king safety are clear, evaluate the resulting position.",
    related: ["CALC-009", "CALC-020", "CALC-029"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-011",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Blunder Checking",
    title: "What is a blunder check?",
    level: "Beginner",
    keywords: ["blunder check", "blunder", "safety"],
    questions: [
      "What is a blunder check before moving?",
      "How can I avoid one-move blunders?"
    ],
    short_answer: "A blunder check is a final safety scan before you commit to a move.",
    answer: "After choosing a move, briefly check whether your opponent can give check, capture something valuable, or create a serious threat.",
    example: "Before moving your queen, ask whether the destination square is attacked.",
    related: ["CALC-005", "CALC-012", "MISTAKE-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-012",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Blunder Checking",
    title: "Why do players miss simple threats?",
    level: "Beginner",
    keywords: ["blunders", "threats", "attention"],
    questions: [
      "Why do I miss simple threats?",
      "Why do strong players still blunder?"
    ],
    short_answer: "Players can overlook threats because of time pressure, assumptions, distraction, or incomplete calculation.",
    answer: "Good calculation is not only about finding brilliant moves; it is also about checking what the opponent can do immediately.",
    example: "You may plan an attack while missing that your queen is already attacked.",
    related: ["CALC-006", "CALC-011", "MISTAKE-005"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-013",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Variations",
    title: "What is a variation in chess?",
    level: "Beginner",
    keywords: ["variation", "line", "calculation"],
    questions: [
      "What is a variation?",
      "What does calculating a line mean?"
    ],
    short_answer: "A variation is a sequence of moves that represents a possible continuation of the game.",
    answer: "Players calculate variations to compare candidate moves and predict possible outcomes.",
    example: "1.Nf3 d5 2.d4 is one possible variation from an opening position.",
    related: ["CALC-008", "CALC-014", "NOTATION-025"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "CALC-014",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Variations",
    title: "What is a main line?",
    level: "Beginner",
    keywords: ["main line", "variation", "calculation"],
    questions: [
      "What does main line mean in chess?",
      "Is the main line always the only good line?"
    ],
    short_answer: "A main line is the principal variation or most important continuation being discussed.",
    answer: "A main line may be the principal theoretical continuation or the primary variation chosen during analysis.",
    example: "An opening database may show the main line while also listing several playable alternatives.",
    related: ["CALC-013", "THEORY-082", "CALC-008"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "CALC-015",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Move Order",
    title: "Why does move order matter in calculation?",
    level: "Intermediate",
    keywords: ["move order", "calculation", "tactics"],
    questions: [
      "Why can changing move order change the result?",
      "Why should I calculate move orders carefully?"
    ],
    short_answer: "Different move orders can change which tactical and positional possibilities are available.",
    answer: "A check, capture, or threat played first may force a different response than the same move played later.",
    example: "A check before an exchange can force the king to a different square.",
    related: ["CALC-004", "CALC-016", "THEORY-086"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-016",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Move Order",
    title: "What is a zwischenzug during calculation?",
    level: "Intermediate",
    keywords: ["zwischenzug", "intermediate move", "calculation"],
    questions: [
      "What is an intermediate move?",
      "Why should I check for zwischenzugs?"
    ],
    short_answer: "A zwischenzug is a strong intermediate move played before an expected continuation.",
    answer: "During calculation, do not automatically assume the obvious recapture or response. Look for a stronger check, capture, or threat first.",
    example: "Instead of immediately recapturing, a player gives a check that improves the position before recapturing.",
    related: ["TACTIC-031", "CALC-015", "CALC-006"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "CALC-017",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Evaluation",
    title: "How do I evaluate a calculated position?",
    level: "Intermediate",
    keywords: ["evaluation", "material", "king safety", "position"],
    questions: [
      "How should I evaluate the position after calculation?",
      "What should I compare at the end of a variation?"
    ],
    short_answer: "Compare material, king safety, activity, pawn structure, space, and concrete threats.",
    answer: "Do not stop after counting material. The resulting position must be judged as a whole.",
    example: "An extra pawn may be less important if your king is exposed and your pieces are passive.",
    related: ["CALC-010", "CALC-018", "POSITION-001"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "CALC-018",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Evaluation",
    title: "Why must I calculate the opponent's strongest defense?",
    level: "Intermediate",
    keywords: ["defense", "best defense", "calculation"],
    questions: [
      "Why calculate the strongest defense?",
      "What happens if I calculate only easy replies?"
    ],
    short_answer: "A move is only reliable if it survives strong defense.",
    answer: "Ignoring defensive resources creates false variations and can make a losing move look winning.",
    example: "If your attack works only when the opponent ignores a threat, it is not a sound calculation.",
    related: ["CALC-007", "CALC-006", "THINK-011"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-019",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Accuracy",
    title: "Is deeper calculation always more accurate?",
    level: "Intermediate",
    keywords: ["depth", "accuracy", "calculation"],
    questions: [
      "Does calculating deeper always help?",
      "Can deep calculation still be wrong?"
    ],
    short_answer: "No. Deep calculation can still be wrong if the initial assumptions are wrong.",
    answer: "Accuracy depends on identifying the right candidate moves and opponent responses, not simply calculating many moves.",
    example: "A player can calculate ten moves accurately from a bad first move and still reach a losing position.",
    related: ["CALC-009", "CALC-020", "CALC-002"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-020",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Accuracy",
    title: "What is the biggest calculation mistake?",
    level: "Beginner",
    keywords: ["calculation error", "mistake", "assumption"],
    questions: [
      "What is a common calculation mistake?",
      "Why do players calculate the wrong line?"
    ],
    short_answer: "A common mistake is assuming the opponent will make the move you expect.",
    answer: "Strong calculation requires actively searching for resources that challenge your intended plan.",
    example: "Instead of assuming your opponent recaptures, check whether they have a stronger intermediate check.",
    related: ["CALC-016", "CALC-018", "MISTAKE-008"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-021",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Mental Board",
    title: "What is chess visualization?",
    level: "Beginner",
    keywords: ["visualization", "mental board", "calculation"],
    questions: [
      "What is visualization in chess?",
      "Why is visualization important?"
    ],
    short_answer: "Visualization is the ability to imagine a chess position and its changes without physically moving the pieces.",
    answer: "Good visualization helps players calculate variations accurately and understand future positions.",
    example: "Imagine your knight moving to f5 and picture the resulting attacks before touching the piece.",
    related: ["CALC-022", "CALC-024", "CALC-029"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-022",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Mental Board",
    title: "How can I improve my chess visualization?",
    level: "Beginner",
    keywords: ["visualization", "training", "mental board"],
    questions: [
      "How do I train chess visualization?",
      "What exercises improve mental board skills?"
    ],
    short_answer: "Practice short variations without moving the pieces.",
    answer: "Start with simple positions and gradually increase the length and complexity of the imagined variations.",
    example: "Choose a position and calculate three moves without touching the board, then verify it.",
    related: ["CALC-023", "CALC-030", "TRAIN-001"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-023",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Training",
    title: "What is a good beginner visualization exercise?",
    level: "Beginner",
    keywords: ["visualization exercise", "training", "beginner"],
    questions: [
      "What visualization exercise should beginners do?",
      "How can I start training visualization?"
    ],
    short_answer: "Calculate a short legal sequence and reconstruct the final position mentally.",
    answer: "Begin with two or three moves and check the final position on the board.",
    example: "Imagine 1.Nf3 d5 2.c4 and identify where every moved piece and pawn is located.",
    related: ["CALC-022", "CALC-024", "TRAIN-012"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-024",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Board Awareness",
    title: "Why must I know where every piece is?",
    level: "Beginner",
    keywords: ["board awareness", "pieces", "visualization"],
    questions: [
      "Why is piece awareness important for calculation?",
      "Why do I lose track of pieces during variations?"
    ],
    short_answer: "Accurate calculation requires knowing the location and role of all relevant pieces.",
    answer: "Forgetting one defender, attacker, or pawn can completely change a calculated line.",
    example: "A tactical combination may fail because a distant rook was forgotten.",
    related: ["CALC-022", "CALC-025", "CALC-029"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-025",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Piece Tracking",
    title: "How do I avoid forgetting pieces during calculation?",
    level: "Intermediate",
    keywords: ["piece tracking", "visualization", "calculation"],
    questions: [
      "How can I track pieces during a long variation?",
      "Why do I forget where pieces moved?"
    ],
    short_answer: "Track every piece affected by the variation and regularly reconstruct the position.",
    answer: "Pay special attention to pieces that move, are captured, become pinned, or change defensive roles.",
    example: "After an exchange, mentally remove both captured pieces before continuing the line.",
    related: ["CALC-024", "CALC-026", "CALC-029"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-026",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Captures",
    title: "Why are captures important for visualization?",
    level: "Beginner",
    keywords: ["captures", "visualization", "calculation"],
    questions: [
      "Why do captures make visualization difficult?",
      "How should I visualize exchanges?"
    ],
    short_answer: "Captures change the board by removing pieces and opening or closing lines.",
    answer: "After every capture, mentally update the board before continuing the calculation.",
    example: "When a bishop captures a knight, remove both original pieces and place the bishop on its new square.",
    related: ["CALC-025", "CALC-027", "TACTIC-004"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-027",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Lines",
    title: "How do open lines affect calculation?",
    level: "Intermediate",
    keywords: ["open lines", "files", "diagonals", "calculation"],
    questions: [
      "Why must I notice newly opened lines?",
      "How do exchanges change piece activity?"
    ],
    short_answer: "Removing pieces can open files, ranks, and diagonals and create new tactical possibilities.",
    answer: "Every exchange can change which pieces attack which squares, so the new lines must be included in your calculation.",
    example: "Exchanging a pawn may open a rook's file toward the king.",
    related: ["CALC-026", "CALC-028", "POSITION-021"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-028",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Piece Trajectories",
    title: "What is a piece trajectory?",
    level: "Intermediate",
    keywords: ["piece trajectory", "visualization", "movement"],
    questions: [
      "What is a piece trajectory in calculation?",
      "Why should I visualize where a piece moves?"
    ],
    short_answer: "A piece trajectory is the sequence of squares a piece occupies during a variation.",
    answer: "Tracking the trajectory helps prevent illegal or impossible calculations and reveals how a piece changes its influence.",
    example: "A bishop may move from c1 to g5 and later return to d2; track each square mentally.",
    related: ["CALC-025", "CALC-029", "MOVE-001"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-029",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Verification",
    title: "How can I verify my mental calculation?",
    level: "Beginner",
    keywords: ["verification", "calculation", "visualization"],
    questions: [
      "How do I check whether my calculation is correct?",
      "Should I verify calculated variations on the board?"
    ],
    short_answer: "After calculating mentally, play through the line on the board and compare it with your mental position.",
    answer: "Verification reveals where you lost a piece, missed a move, or misremembered a square.",
    example: "Calculate a three-move line mentally, then play it on a board without changing the moves.",
    related: ["CALC-022", "CALC-023", "CALC-030"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-030",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Training",
    title: "Should I calculate without moving the pieces?",
    level: "Intermediate",
    keywords: ["calculation training", "visualization", "pieces"],
    questions: [
      "Is it useful to calculate without moving pieces?",
      "Why should I practice calculation on a static board?"
    ],
    short_answer: "Yes. It trains visualization and reduces dependence on physical piece movement.",
    answer: "Start with short lines and use physical movement only after making your mental calculation.",
    example: "Think through a tactical position for one minute before touching any piece.",
    related: ["CALC-022", "CALC-029", "TRAIN-014"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-031",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Accuracy",
    title: "What is calculation discipline?",
    level: "Intermediate",
    keywords: ["calculation discipline", "accuracy", "process"],
    questions: [
      "What does calculation discipline mean?",
      "How can I make my calculation more reliable?"
    ],
    short_answer: "Calculation discipline means following a consistent process instead of guessing variations.",
    answer: "Choose candidates, calculate forcing replies, compare resulting positions, and perform a final blunder check.",
    example: "Do not move simply because a move looks attractive; complete your calculation routine first.",
    related: ["CALC-002", "CALC-005", "CALC-011"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-032",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Quiet Moves",
    title: "Are quiet moves harder to calculate?",
    level: "Intermediate",
    keywords: ["quiet moves", "calculation", "positional"],
    questions: [
      "Why can quiet moves be difficult to calculate?",
      "How do I calculate a non-forcing move?"
    ],
    short_answer: "Quiet moves can be harder because the opponent may have many possible responses.",
    answer: "For quiet moves, calculate the most important strategic and tactical responses rather than trying to list every legal move.",
    example: "After a quiet improving move, check whether your opponent can create an immediate tactical threat.",
    related: ["CALC-004", "CALC-006", "CALC-033"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-033",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Candidate Comparison",
    title: "How do I compare candidate moves?",
    level: "Intermediate",
    keywords: ["candidate moves", "comparison", "evaluation"],
    questions: [
      "How should I compare candidate moves?",
      "How do I choose between two good moves?"
    ],
    short_answer: "Calculate each serious candidate and compare the resulting positions.",
    answer: "Consider concrete tactics first, then compare activity, king safety, material, pawn structure, and plans.",
    example: "If two moves are safe, choose the one producing better piece activity or a stronger plan.",
    related: ["CALC-002", "CALC-017", "CALC-031"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-034",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Forcing Lines",
    title: "What is a forcing line?",
    level: "Beginner",
    keywords: ["forcing line", "checks", "captures", "threats"],
    questions: [
      "What is a forcing line in chess?",
      "Why are forcing lines easier to calculate?"
    ],
    short_answer: "A forcing line is a variation where the moves strongly restrict the opponent's choices.",
    answer: "Checks are usually the most forcing, followed by strong captures and direct threats.",
    example: "A sequence of checks may force the king through several squares.",
    related: ["CALC-004", "CALC-005", "CALC-013"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-035",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Checks",
    title: "Why are checks powerful calculation tools?",
    level: "Beginner",
    keywords: ["checks", "forcing moves", "calculation"],
    questions: [
      "Why should checks be calculated first?",
      "How do checks simplify calculation?"
    ],
    short_answer: "A check forces the opponent to respond to the king threat.",
    answer: "Because the opponent has limited legal responses, checks often create clear calculation branches.",
    example: "Calculate whether a checking move forces a winning exchange or a mating attack.",
    related: ["CALC-004", "CALC-034", "MATE-002"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-036",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Captures",
    title: "Why can captures change a calculation completely?",
    level: "Beginner",
    keywords: ["captures", "exchanges", "calculation"],
    questions: [
      "Why are captures important during calculation?",
      "Why can one capture change the whole position?"
    ],
    short_answer: "A capture removes material and can change lines, defenders, and tactical possibilities.",
    answer: "Every important capture should be followed by a fresh scan of checks, captures, and threats.",
    example: "After capturing a defender, a previously protected piece may become vulnerable.",
    related: ["CALC-026", "CALC-027", "CALC-005"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "CALC-037",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Threats",
    title: "How should I calculate a threat?",
    level: "Intermediate",
    keywords: ["threat", "calculation", "defense"],
    questions: [
      "How do I calculate a positional threat?",
      "What should I do when my move creates a threat?"
    ],
    short_answer: "Identify exactly what your move threatens and calculate how the opponent can respond.",
    answer: "A threat is useful only if it survives the opponent's defensive resources.",
    example: "If you attack a pinned piece, calculate whether the opponent can move the pinning piece or create a stronger counter-threat.",
    related: ["CALC-005", "CALC-006", "CALC-018"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-038",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Counterplay",
    title: "Why must I calculate counterplay?",
    level: "Intermediate",
    keywords: ["counterplay", "calculation", "defense"],
    questions: [
      "What is counterplay in calculation?",
      "Why can an opponent's counterplay ruin my plan?"
    ],
    short_answer: "Counterplay is the opponent's active way of creating threats or improving their position.",
    answer: "A strong plan can fail if it gives the opponent forcing activity.",
    example: "While attacking on the kingside, calculate whether the opponent can create a dangerous passed pawn or attack your king.",
    related: ["CALC-006", "CALC-018", "ATTACK-020"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "CALC-039",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "King Safety",
    title: "Why should king safety be checked during calculation?",
    level: "Beginner",
    keywords: ["king safety", "calculation", "checks"],
    questions: [
      "Why is king safety part of calculation?",
      "Why should I check both kings?"
    ],
    short_answer: "King safety determines whether tactical ideas and attacks are actually possible.",
    answer: "Always consider checks against both kings and changes to the king's shelter after exchanges or pawn moves.",
    example: "A sacrifice may work because opening one file exposes the enemy king.",
    related: ["CALC-040", "MATE-019", "ATTACK-001"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-040",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "King Safety",
    title: "How does an exposed king change calculation?",
    level: "Intermediate",
    keywords: ["exposed king", "king safety", "attack"],
    questions: [
      "How does an exposed king affect calculation?",
      "Why are forcing moves stronger against an exposed king?"
    ],
    short_answer: "An exposed king often gives the attacker more forcing possibilities.",
    answer: "Checks, sacrifices, open files, and attacking pieces become more important when the king has limited shelter.",
    example: "Opening the g-file may create immediate checking opportunities against a king without pawn cover.",
    related: ["CALC-039", "MATE-021", "ATTACK-006"],
    source: "Chess attacking principle",
    verified: true
  },

  {
    id: "CALC-041",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Coordinates",
    title: "How does board coordinate knowledge help calculation?",
    level: "Beginner",
    keywords: ["coordinates", "squares", "visualization"],
    questions: [
      "Why should I know chess coordinates?",
      "How do coordinates improve visualization?"
    ],
    short_answer: "Knowing square names makes it easier to track pieces and variations mentally.",
    answer: "Strong coordinate awareness reduces confusion when calculating moves without moving the pieces.",
    example: "Instead of thinking 'the knight moves there,' identify the exact square such as f5.",
    related: ["CALC-022", "CALC-042", "BASIC-003"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-042",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Square Awareness",
    title: "Why is square-color awareness useful?",
    level: "Beginner",
    keywords: ["square colors", "bishops", "visualization"],
    questions: [
      "Why should I remember square colors?",
      "How can square colors help calculation?"
    ],
    short_answer: "Square-color awareness helps especially when tracking bishops and diagonal attacks.",
    answer: "A bishop always remains on the same color complex, making square-color memory useful during visualization.",
    example: "A bishop that starts on a dark square can never move to a light square.",
    related: ["CALC-041", "MOVE-020", "BASIC-006"],
    source: "Chess board principle",
    verified: true
  },

  {
    id: "CALC-043",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Knight Awareness",
    title: "Why are knights difficult to visualize?",
    level: "Intermediate",
    keywords: ["knight", "visualization", "calculation"],
    questions: [
      "Why do players miss knight moves?",
      "How can I improve knight visualization?"
    ],
    short_answer: "Knights attack non-adjacent squares and can jump over pieces.",
    answer: "Train yourself to recognize the knight's eight possible destinations from central squares.",
    example: "From e5, mentally identify c4, c6, d3, f3, g4, g6, d7, and f7.",
    related: ["CALC-044", "MOVE-015", "BASIC-004"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-044",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Knight Awareness",
    title: "How can I train knight-square visualization?",
    level: "Beginner",
    keywords: ["knight", "visualization", "training"],
    questions: [
      "How do I practice knight moves mentally?",
      "What is a simple knight visualization drill?"
    ],
    short_answer: "Choose a square and name all legal knight destinations without looking them up.",
    answer: "Gradually practice from every board square, including edge and corner squares.",
    example: "Pick e4 and mentally list all eight possible knight destinations.",
    related: ["CALC-043", "TRAIN-020", "MOVE-015"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-045",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Sliding Pieces",
    title: "How do I visualize bishop and rook lines?",
    level: "Beginner",
    keywords: ["bishop", "rook", "lines", "visualization"],
    questions: [
      "How can I visualize long-range pieces?",
      "How do I track bishop and rook attacks?"
    ],
    short_answer: "Trace their lines square by square and account for every blocker.",
    answer: "A bishop, rook, or queen cannot attack through a blocking piece.",
    example: "Before calculating a rook move, check every piece between the rook and the target square.",
    related: ["CALC-027", "CALC-046", "MOVE-010"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "CALC-046",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Lines",
    title: "Why must I track blockers?",
    level: "Beginner",
    keywords: ["blockers", "lines", "bishop", "rook"],
    questions: [
      "Why are blockers important during calculation?",
      "How can a blocker change a tactical line?"
    ],
    short_answer: "A blocking piece can prevent an attack, check, or defense from working.",
    answer: "When a piece moves or is captured, a previously blocked line may suddenly open.",
    example: "Moving a pawn can open a rook's file and create a discovered attack.",
    related: ["CALC-027", "CALC-045", "TACTIC-019"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "CALC-047",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Prophylaxis",
    title: "Can calculation include defensive moves?",
    level: "Intermediate",
    keywords: ["defense", "prophylaxis", "calculation"],
    questions: [
      "Can I calculate a defensive move?",
      "How do I calculate prophylactic moves?"
    ],
    short_answer: "Yes. Calculation is not only for attacks; it also tests defensive and preventive moves.",
    answer: "A defensive move should be tested against the opponent's strongest continuation and the threats it prevents.",
    example: "A king-safety move may stop an attack before it becomes dangerous.",
    related: ["CALC-037", "CALC-038", "MIDDLE-031"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "CALC-048",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Pawn Breaks",
    title: "How should I calculate a pawn break?",
    level: "Intermediate",
    keywords: ["pawn break", "calculation", "pawn structure"],
    questions: [
      "How do I calculate a pawn break?",
      "What should I check before pushing a pawn break?"
    ],
    short_answer: "Calculate the resulting exchanges, opened lines, passed pawns, and changes in king safety.",
    answer: "Pawn breaks can permanently change the structure, so calculate their consequences carefully.",
    example: "Before playing a central pawn break, check which pieces will benefit from the opened files and diagonals.",
    related: ["CALC-027", "CALC-039", "POSITION-010"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "CALC-049",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Endgames",
    title: "Does calculation matter in endgames?",
    level: "Intermediate",
    keywords: ["endgame", "calculation", "accuracy"],
    questions: [
      "Is calculation important in endgames?",
      "How is endgame calculation different?"
    ],
    short_answer: "Yes. Endgames often require very precise calculation because there are fewer pieces and fewer margins for error.",
    answer: "King moves, pawn races, captures, and promotion threats often need concrete calculation.",
    example: "Calculate a pawn race until you know which side promotes first and whether the resulting position is winning.",
    related: ["CALC-050", "END-001", "PRACTICAL-END-001"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "CALC-050",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Pawn Races",
    title: "How do I calculate a pawn race?",
    level: "Intermediate",
    keywords: ["pawn race", "promotion", "calculation"],
    questions: [
      "How do I calculate a pawn race?",
      "What should I count in a pawn race?"
    ],
    short_answer: "Count promotion moves, king distances, captures, checks, and whether the promoted piece can stop the opponent.",
    answer: "Do not stop calculation when one pawn promotes; calculate the resulting position.",
    example: "A queen may promote first but still lose if the opponent promotes with check or captures it.",
    related: ["CALC-049", "END-021", "CALC-010"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "CALC-051",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Time Management",
    title: "How much time should I spend calculating?",
    level: "Intermediate",
    keywords: ["time management", "calculation", "clock"],
    questions: [
      "How much time should I spend on one position?",
      "When should I stop calculating and move?"
    ],
    short_answer: "Spend time according to the importance and complexity of the position.",
    answer: "Critical tactical positions deserve more time than routine moves, especially when a mistake could decide the game.",
    example: "Do not spend five minutes on a safe recapture while a tactical decision is waiting.",
    related: ["CALC-052", "TOURNAMENT-020", "THINK-020"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "CALC-052",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Time Management",
    title: "Should I calculate longer in critical positions?",
    level: "Beginner",
    keywords: ["critical position", "time", "calculation"],
    questions: [
      "When should I spend more time calculating?",
      "What is a critical position?"
    ],
    short_answer: "Spend more time when the position may change significantly because of your decision.",
    answer: "Tactical opportunities, king attacks, major exchanges, pawn breaks, and irreversible decisions deserve careful calculation.",
    example: "Before sacrificing material for an attack, calculate more carefully than before developing a piece.",
    related: ["CALC-051", "CALC-053", "THINK-021"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "CALC-053",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Critical Positions",
    title: "What makes a position critical?",
    level: "Intermediate",
    keywords: ["critical position", "decision", "calculation"],
    questions: [
      "What is a critical position in chess?",
      "How do I recognize a critical moment?"
    ],
    short_answer: "A critical position is one where the next decision can significantly change the game.",
    answer: "Look for tactical opportunities, major exchanges, king attacks, pawn breaks, or important strategic choices.",
    example: "A position where you can sacrifice for an attack or simplify into an endgame is often critical.",
    related: ["CALC-052", "CALC-054", "THINK-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "CALC-054",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Irreversible Moves",
    title: "Why should irreversible moves be calculated carefully?",
    level: "Intermediate",
    keywords: ["irreversible moves", "pawn moves", "captures", "calculation"],
    questions: [
      "Why should I calculate pawn moves carefully?",
      "Which chess moves are difficult to undo?"
    ],
    short_answer: "Pawn moves and captures are often irreversible and can permanently change the position.",
    answer: "Before making an irreversible move, calculate how it affects structure, lines, king safety, and future options.",
    example: "A pawn advance may create a permanent weakness that cannot be reversed.",
    related: ["CALC-048", "CALC-055", "POSITION-010"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "CALC-055",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Decision Making",
    title: "Why should I calculate before committing to an exchange?",
    level: "Intermediate",
    keywords: ["exchange", "calculation", "simplification"],
    questions: [
      "Should I calculate before exchanging pieces?",
      "Why can a simple exchange be important?"
    ],
    short_answer: "An exchange can change material, pawn structure, activity, and the character of the game.",
    answer: "Before exchanging, check whether the resulting position benefits you or your opponent.",
    example: "Trading an active bishop for a knight may create a favorable or unfavorable pawn structure.",
    related: ["CALC-036", "CALC-054", "POSITION-031"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "CALC-056",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Comparison",
    title: "How can I compare two resulting positions?",
    level: "Intermediate",
    keywords: ["comparison", "evaluation", "positions"],
    questions: [
      "How do I compare two calculated positions?",
      "What factors matter when comparing variations?"
    ],
    short_answer: "Compare material, king safety, piece activity, pawn structure, space, threats, and plans.",
    answer: "The better variation is not always the one with more material; consider the complete position.",
    example: "One line may win a pawn while another creates a dangerous attack. Compare both objectively.",
    related: ["CALC-017", "CALC-033", "POSITION-001"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "CALC-057",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Practical Calculation",
    title: "What is practical calculation?",
    level: "Intermediate",
    keywords: ["practical calculation", "human chess", "decision"],
    questions: [
      "What is practical calculation?",
      "Is the engine's best line always the best practical choice?"
    ],
    short_answer: "Practical calculation considers what can realistically be calculated and played accurately in a game.",
    answer: "A theoretically best move may be difficult to handle, while another strong move may be easier to play and understand.",
    example: "In a rapid game, a clear strong continuation may be preferable to an extremely complicated line.",
    related: ["CALC-051", "CALC-058", "THINK-027"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "CALC-058",
    type: "CALCULATION",
    category: "Calculation & Visualization",
    topic: "Calculation",
    subtopic: "Human Calculation",
    title: "How is human calculation different from engine calculation?",
    level: "Intermediate",
    keywords: ["human calculation", "engine", "analysis"],
    questions: [
      "How does human calculation differ from engine calculation?",
      "Why can humans miss engine moves?"
    ],
    short_answer: "Humans have limited calculation capacity and rely heavily on pattern recognition and judgment.",
    answer: "Engines can calculate enormous numbers of variations, while humans must prioritize promising lines.",
    example: "A player may need to identify one critical tactical idea instead of calculating every legal move.",
    related: ["CALC-002", "CALC-057", "TECH-020"],
    source: "Chess analysis principle",
    verified: true
  },

  {
    id: "CALC-059",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Blindfold Training",
    title: "Does blindfold chess improve visualization?",
    level: "Advanced",
    keywords: ["blindfold chess", "visualization", "training"],
    questions: [
      "Can blindfold chess improve visualization?",
      "Is blindfold chess useful for calculation training?"
    ],
    short_answer: "Blindfold practice can strengthen mental-board skills when used appropriately.",
    answer: "It should be approached gradually, starting with short sequences and simple positions rather than very long games.",
    example: "Try calculating a short sequence while naming the final piece locations before checking the board.",
    related: ["CALC-022", "CALC-030", "CALC-060"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "CALC-060",
    type: "VISUALIZATION",
    category: "Calculation & Visualization",
    topic: "Visualization",
    subtopic: "Training",
    title: "What is the best way to improve calculation and visualization?",
    level: "Beginner",
    keywords: ["calculation training", "visualization", "improvement"],
    questions: [
      "How can I improve my calculation skills?",
      "What is the best calculation training routine?"
    ],
    short_answer: "Practice tactical calculation, short variations, visualization exercises, and review your calculation mistakes.",
    answer: "A strong routine combines solving positions without moving pieces, checking the answers, and studying where your calculation went wrong.",
    example: "Solve five tactical positions mentally, write your line, then compare it with the correct continuation.",
    related: ["CALC-022", "CALC-029", "TRAIN-001"],
    source: "Chess training principle",
    verified: true
  }
];

export default calculationVisualization;