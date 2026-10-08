const commonMistakesPracticalTips = [

  {
    id: "MISTAKE-001",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Blunders",
    title: "One-Move Blunders",
    level: "Beginner",
    keywords: ["blunder", "one move", "mistake"],
    questions: [
      "What is a one-move blunder?",
      "How can I stop one-move blunders?"
    ],
    short_answer: "A one-move blunder immediately loses material, position, or the game.",
    answer: "Before every move, check what your opponent can capture, check, or threaten.",
    example: "Before moving your queen, ask whether the opponent can simply take it.",
    related: ["THINK-005", "CALC-050"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-002",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Loose Pieces",
    title: "Leaving Pieces Hanging",
    level: "Beginner",
    keywords: ["hanging piece", "undefended", "blunder"],
    questions: [
      "What does it mean when a piece is hanging?",
      "How do I avoid hanging pieces?"
    ],
    short_answer: "A hanging piece is vulnerable to being captured without adequate protection.",
    answer: "Regularly check which of your pieces are attacked and whether they are defended.",
    example: "A bishop attacked by a knight with no defender is often hanging.",
    related: ["BASIC-028", "TACTIC-008"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-003",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Threat Awareness",
    title: "Ignoring the Opponent's Threat",
    level: "Beginner",
    keywords: ["threat", "opponent", "defense"],
    questions: [
      "Why do players miss simple threats?",
      "What should I check before making my move?"
    ],
    short_answer: "Always identify what your opponent is threatening before choosing your move.",
    answer: "Ask: What changed after the last move? What can my opponent do next?",
    example: "If your opponent attacks your queen and a loose rook, you must address the immediate danger.",
    related: ["THINK-003", "THINK-011"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-004",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Checks",
    title: "Missing a Check",
    level: "Beginner",
    keywords: ["check", "missed check", "tactics"],
    questions: [
      "Why should I look for checks?",
      "How can I stop missing checking moves?"
    ],
    short_answer: "Checks are forcing moves and should be considered before many quiet moves.",
    answer: "After examining the opponent's threat, scan your available checks.",
    example: "A simple rook check may win a queen or force the king into a mating net.",
    related: ["TACTIC-001", "CALC-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-005",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Captures",
    title: "Missing Free Captures",
    level: "Beginner",
    keywords: ["capture", "free piece", "tactics"],
    questions: [
      "Why do players miss free pieces?",
      "What should I check before making a move?"
    ],
    short_answer: "Always scan the board for undefended or insufficiently defended pieces.",
    answer: "A quick capture scan can prevent missed tactical opportunities.",
    example: "If your knight can safely capture an undefended bishop, do not overlook it.",
    related: ["TACTIC-002", "THINK-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-006",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Threats",
    title: "Missing Simple Threats",
    level: "Beginner",
    keywords: ["threat", "tactical oversight", "blunder"],
    questions: [
      "What is a simple tactical threat?",
      "How can I recognize threats faster?"
    ],
    short_answer: "A simple threat attacks material, the king, or another important target.",
    answer: "After every opponent move, identify what that move attacks or prepares.",
    example: "A queen move attacking your rook is a threat even if it does not give check.",
    related: ["THINK-003", "TACTIC-004"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-007",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Development",
    title: "Ignoring Development",
    level: "Beginner",
    keywords: ["development", "opening", "pieces"],
    questions: [
      "Why is undeveloped development a common mistake?",
      "What should I do with my pieces in the opening?"
    ],
    short_answer: "Undeveloped pieces can leave you behind in activity and king safety.",
    answer: "Develop your minor pieces, fight for the center, and prepare king safety.",
    example: "Moving the same knight repeatedly while the other pieces remain home wastes time.",
    related: ["OPENING-011", "OPENING-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-008",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Piece Movement",
    title: "Moving the Same Piece Too Often",
    level: "Beginner",
    keywords: ["tempo", "development", "opening"],
    questions: [
      "Why is moving one piece repeatedly often bad?",
      "When is repeated piece movement justified?"
    ],
    short_answer: "Repeated moves can lose development time unless they achieve something important.",
    answer: "Move a piece repeatedly only when there is a concrete tactical or strategic reason.",
    example: "Moving your knight three times while your opponent develops four pieces usually loses time.",
    related: ["OPENING-010", "BASIC-037"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-009",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Queen",
    title: "Bringing the Queen Out Too Early",
    level: "Beginner",
    keywords: ["queen", "opening", "development"],
    questions: [
      "Why is an early queen move risky?",
      "Should I never move my queen early?"
    ],
    short_answer: "An early queen move can lose time if the queen is chased by developing pieces.",
    answer: "Early queen moves are not automatically wrong; they need a concrete purpose.",
    example: "The Scandinavian Defense develops the queen early in a specific opening context.",
    related: ["OPENING-015", "THEORY-032"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-010",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Castling",
    title: "Delaying Castling Without Reason",
    level: "Beginner",
    keywords: ["castling", "king safety", "opening"],
    questions: [
      "Why should I usually castle early?",
      "Is delaying castling always a mistake?"
    ],
    short_answer: "Delaying castling can leave the king exposed and prevent rook coordination.",
    answer: "Castle when the position is safe and castling improves your king and rook placement.",
    example: "If the center is about to open, keeping your king in the center can be dangerous.",
    related: ["OPENING-024", "ATTACK-033"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-011",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "King Safety",
    title: "Opening the Center with an Unsafe King",
    level: "Intermediate",
    keywords: ["king safety", "center", "opening"],
    questions: [
      "Why is an exposed king dangerous when the center opens?",
      "What should I consider before opening the center?"
    ],
    short_answer: "Open lines can quickly expose a king that has not reached safety.",
    answer: "Before a central pawn break, check whether files and diagonals will open toward your king.",
    example: "Opening the e-file while your king remains on e1 can create immediate tactical problems.",
    related: ["ATTACK-034", "OPENING-025"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-012",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pawn Moves",
    title: "Making Too Many Pawn Moves",
    level: "Beginner",
    keywords: ["pawn moves", "opening", "tempo"],
    questions: [
      "Why can too many pawn moves be harmful?",
      "Should I avoid pawn moves in the opening?"
    ],
    short_answer: "Unnecessary pawn moves can waste development time and create weaknesses.",
    answer: "Pawn moves should usually support development, center control, king safety, or a clear plan.",
    example: "Repeated flank pawn moves while your pieces remain undeveloped can cost valuable time.",
    related: ["OPENING-030", "POSITION-059"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-013",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pawn Structure",
    title: "Creating Unnecessary Weaknesses",
    level: "Intermediate",
    keywords: ["pawn weakness", "pawn structure", "holes"],
    questions: [
      "How do unnecessary pawn moves create weaknesses?",
      "Why should I think before pushing a pawn?"
    ],
    short_answer: "Pawn moves are often permanent and can create weak squares or targets.",
    answer: "Before pushing a pawn, consider which squares it stops controlling and what becomes weak.",
    example: "A careless pawn push may create a permanent hole that an enemy knight can occupy.",
    related: ["POSITION-008", "POSITION-056"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-014",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Material",
    title: "Grabbing Pawns Without Calculation",
    level: "Beginner",
    keywords: ["pawn grabbing", "material", "calculation"],
    questions: [
      "Why is grabbing every pawn dangerous?",
      "When should I avoid winning a pawn?"
    ],
    short_answer: "A pawn is not truly free if taking it loses time, development, or material.",
    answer: "Calculate the opponent's forcing replies before taking material.",
    example: "A pawn capture that allows a strong attack on your queen may not be worth it.",
    related: ["CALC-006", "THINK-024"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-015",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Material",
    title: "Winning Material but Losing the Position",
    level: "Intermediate",
    keywords: ["material", "initiative", "king safety"],
    questions: [
      "Can I have more material and still be worse?",
      "Why is material not everything?"
    ],
    short_answer: "Material advantage can be outweighed by king danger, activity, or tactical threats.",
    answer: "After winning material, first make sure your king and pieces remain safe.",
    example: "Winning a rook means little if your exposed king faces an unavoidable mating attack.",
    related: ["ATTACK-003", "MIDDLE-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-016",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Tactics",
    title: "Ignoring Pins",
    level: "Beginner",
    keywords: ["pin", "tactics", "piece"],
    questions: [
      "Why do players miss pins?",
      "How can I use pins more effectively?"
    ],
    short_answer: "A pinned piece may be unable to move safely because something more valuable is behind it.",
    answer: "Check whether moving a defended or pinned piece exposes the king or valuable material.",
    example: "A knight pinned to the king cannot legally move if it would expose check.",
    related: ["TACTIC-015", "CALC-011"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-017",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Tactics",
    title: "Ignoring Forks",
    level: "Beginner",
    keywords: ["fork", "knight fork", "tactics"],
    questions: [
      "Why are forks easy to miss?",
      "How can I prevent fork tactics?"
    ],
    short_answer: "A fork attacks two or more targets at once.",
    answer: "Watch for knight jumps, pawn attacks, and other moves that create multiple threats.",
    example: "A knight can fork a king and rook, winning the rook after the king moves.",
    related: ["TACTIC-010", "CALC-015"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-018",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Tactics",
    title: "Ignoring Skewers",
    level: "Intermediate",
    keywords: ["skewer", "tactics", "king"],
    questions: [
      "What tactical mistake causes a skewer?",
      "How do I notice a skewer coming?"
    ],
    short_answer: "A skewer attacks a valuable front piece and wins material behind it.",
    answer: "Check whether your king or queen is aligned with another valuable piece.",
    example: "A rook check can force the king away and expose a rook behind it.",
    related: ["TACTIC-018", "CALC-017"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-019",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Tactics",
    title: "Ignoring Discovered Attacks",
    level: "Intermediate",
    keywords: ["discovered attack", "tactics", "line"],
    questions: [
      "What is a discovered attack?",
      "Why can discovered attacks be difficult to see?"
    ],
    short_answer: "A discovered attack appears when one piece moves and uncovers an attack from another piece.",
    answer: "Look for pieces lined up behind your moving piece.",
    example: "A knight moves with tempo and opens a bishop's attack on the queen.",
    related: ["TACTIC-022", "CALC-021"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-020",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Tactics",
    title: "Forgetting the Back Rank",
    level: "Beginner",
    keywords: ["back rank", "king", "rook"],
    questions: [
      "Why is the back rank dangerous?",
      "How can I prevent back-rank problems?"
    ],
    short_answer: "A king trapped behind its own pawns can become vulnerable to a back-rank mate.",
    answer: "Create a safe escape square when appropriate and watch enemy rooks and queens on open files.",
    example: "A rook entering the seventh rank can threaten a back-rank mate when the king has no escape.",
    related: ["MATE-010", "ATTACK-038"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-021",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "King Safety",
    title: "Forgetting Flight Squares",
    level: "Intermediate",
    keywords: ["flight square", "king safety", "luft"],
    questions: [
      "What is a flight square?",
      "Why can a flight square save the king?"
    ],
    short_answer: "A flight square gives the king an escape route from certain attacks.",
    answer: "When appropriate, create an escape square without unnecessarily weakening the king.",
    example: "A pawn move creating h2-h3 or h7-h6 can sometimes give the king an escape square.",
    related: ["ATTACK-037", "MATE-011"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-022",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Piece Safety",
    title: "Moving a Defender Away",
    level: "Intermediate",
    keywords: ["defender", "tactics", "overloaded"],
    questions: [
      "Why can moving a defender be dangerous?",
      "What should I check before moving a defending piece?"
    ],
    short_answer: "A defending piece may be protecting another important piece or square.",
    answer: "Before moving it, check what responsibilities it currently has.",
    example: "Moving a knight away may leave your queen undefended against a tactical attack.",
    related: ["TACTIC-036", "MIDDLE-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-023",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Exchanges",
    title: "Exchanging the Wrong Piece",
    level: "Intermediate",
    keywords: ["exchange", "piece trade", "strategy"],
    questions: [
      "Can exchanging pieces be a mistake?",
      "How do I know which piece to exchange?"
    ],
    short_answer: "A trade can improve or worsen the position depending on which pieces remain.",
    answer: "Exchange your opponent's strong pieces and keep your useful pieces when possible.",
    example: "Trading your active knight for a badly placed enemy bishop may improve the opponent's position.",
    related: ["MIDDLE-052", "POSITION-047"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-024",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Trading",
    title: "Trading Without a Reason",
    level: "Intermediate",
    keywords: ["exchange", "trade", "plan"],
    questions: [
      "Why should I avoid random exchanges?",
      "What question should I ask before trading?"
    ],
    short_answer: "A trade should serve a tactical, positional, or practical purpose.",
    answer: "Ask what improves after the exchange and which side benefits from the resulting position.",
    example: "Trading queens when you are ahead in material can reduce your opponent's attacking chances.",
    related: ["MIDDLE-053", "END-021"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-025",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pieces",
    title: "Leaving a Bad Piece Unimproved",
    level: "Intermediate",
    keywords: ["bad piece", "improvement", "plan"],
    questions: [
      "What should I do with my worst piece?",
      "Why is improving the worst piece useful?"
    ],
    short_answer: "Improving your least active piece often increases the strength of the whole position.",
    answer: "Look for a better square, open line, or exchange that improves the piece.",
    example: "A poorly placed rook may become active after moving to an open file.",
    related: ["MIDDLE-014", "POSITION-039"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-026",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Piece Activity",
    title: "Playing with Passive Pieces",
    level: "Intermediate",
    keywords: ["passive piece", "activity", "strategy"],
    questions: [
      "Why are passive pieces a problem?",
      "How can I activate a passive piece?"
    ],
    short_answer: "Passive pieces have limited influence and make coordinated play harder.",
    answer: "Seek open lines, better squares, pawn breaks, or exchanges that improve activity.",
    example: "A rook trapped behind its own pawns may become active after opening a file.",
    related: ["POSITION-040", "MIDDLE-015"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-027",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Coordination",
    title: "Attacking with Too Few Pieces",
    level: "Intermediate",
    keywords: ["attack", "coordination", "pieces"],
    questions: [
      "Why do attacks fail when too few pieces participate?",
      "How many pieces should attack the king?"
    ],
    short_answer: "A successful attack usually requires coordination and sufficient attacking force.",
    answer: "Bring more pieces into the attack before sacrificing material or opening lines.",
    example: "A queen attacking alone against a well-defended king is often easily repelled.",
    related: ["ATTACK-008", "MATE-021"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-028",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Attack",
    title: "Attacking Too Early",
    level: "Intermediate",
    keywords: ["premature attack", "attack", "development"],
    questions: [
      "Why can attacking too early fail?",
      "What should I prepare before attacking?"
    ],
    short_answer: "A premature attack may leave your own pieces undeveloped and unsupported.",
    answer: "Develop, coordinate, identify weaknesses, and open useful lines before launching a major attack.",
    example: "A queen sortie against an uncastled opponent may fail if your own king is still exposed.",
    related: ["ATTACK-007", "OPENING-040"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-029",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Attack",
    title: "Continuing an Attack After It Has Failed",
    level: "Intermediate",
    keywords: ["attack", "adaptation", "strategy"],
    questions: [
      "When should I stop an attack?",
      "Why is continuing a failed attack dangerous?"
    ],
    short_answer: "If the opponent has defended successfully, continuing may waste time and material.",
    answer: "Reassess the position and switch to improving your pieces or creating another target.",
    example: "After the king escapes and your pieces are scattered, retreating may be better than sacrificing again.",
    related: ["ATTACK-066", "THINK-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-030",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Calculation",
    title: "Calculating Only Your Own Moves",
    level: "Beginner",
    keywords: ["calculation", "opponent", "candidate moves"],
    questions: [
      "Why is calculating only my moves a mistake?",
      "What must I include in calculation?"
    ],
    short_answer: "Every serious variation must include the opponent's strongest responses.",
    answer: "After each candidate move, ask what your opponent would play if they wanted to refute it.",
    example: "A beautiful sacrifice may fail because the opponent has one simple defensive move.",
    related: ["CALC-010", "THINK-011"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-031",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Calculation",
    title: "Stopping Calculation Too Early",
    level: "Intermediate",
    keywords: ["calculation", "variation", "tactics"],
    questions: [
      "Why should I calculate one move further?",
      "When do I need deeper calculation?"
    ],
    short_answer: "Stopping before the opponent's critical response can lead to tactical mistakes.",
    answer: "Calculate until the forcing sequence ends and you can evaluate the resulting position.",
    example: "Do not stop after winning a rook if the opponent has a forcing check that changes everything.",
    related: ["CALC-032", "THINK-035"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-032",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Calculation",
    title: "Calculating Too Many Variations",
    level: "Intermediate",
    keywords: ["calculation", "candidate moves", "time"],
    questions: [
      "Can I calculate too much?",
      "Why should I limit candidate moves?"
    ],
    short_answer: "Too many unnecessary variations waste time and reduce calculation accuracy.",
    answer: "Start with a small number of serious candidate moves, especially forcing ones.",
    example: "Calculate two strong candidates deeply instead of five weak moves superficially.",
    related: ["CALC-004", "THINK-007"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-033",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Visualization",
    title: "Moving Pieces Mentally Without Checking the Board",
    level: "Intermediate",
    keywords: ["visualization", "calculation", "board vision"],
    questions: [
      "Why do I lose track of pieces during calculation?",
      "How can I improve visualization?"
    ],
    short_answer: "Accurate visualization requires tracking every relevant piece and pawn after each move.",
    answer: "Calculate slowly at first and verify the final position on the board.",
    example: "A forgotten pawn can block a diagonal and completely change a calculated line.",
    related: ["CALC-025", "CALC-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-034",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Move Selection",
    title: "Playing the First Move That Looks Good",
    level: "Beginner",
    keywords: ["candidate move", "decision", "calculation"],
    questions: [
      "Why should I not always play my first idea?",
      "How many moves should I compare?"
    ],
    short_answer: "The first attractive move is not necessarily the strongest or safest.",
    answer: "Compare it with at least one serious alternative when the position is critical.",
    example: "A direct attack may look strong, but improving a piece first may be more effective.",
    related: ["THINK-007", "THINK-032"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-035",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Prophylaxis",
    title: "Ignoring What the Opponent Wants",
    level: "Intermediate",
    keywords: ["prophylaxis", "opponent plan", "defense"],
    questions: [
      "Why should I think about the opponent's plan?",
      "What is prophylactic thinking?"
    ],
    short_answer: "Prophylaxis means anticipating and reducing the opponent's useful ideas.",
    answer: "Ask what your opponent would like to do next and whether you can prevent or restrict it.",
    example: "Stopping an important pawn break can be stronger than making a random attacking move.",
    related: ["THINK-003", "MIDDLE-031"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-036",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Time Management",
    title: "Using Too Much Time on Easy Moves",
    level: "Intermediate",
    keywords: ["time management", "clock", "thinking"],
    questions: [
      "Why should I save time on simple positions?",
      "When should I spend more time?"
    ],
    short_answer: "Use more time when the position is critical and less when the move is straightforward.",
    answer: "Save your clock for tactical, strategic, and irreversible decisions.",
    example: "Do not spend five minutes deciding between two harmless developing moves.",
    related: ["THINK-038", "TOURNAMENT-025"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-037",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Time Management",
    title: "Playing Too Fast",
    level: "Beginner",
    keywords: ["playing fast", "blunder", "clock"],
    questions: [
      "Why is playing too fast dangerous?",
      "How can I slow down without wasting time?"
    ],
    short_answer: "Playing too quickly increases the chance of missing simple tactical details.",
    answer: "Take a short blunder-check pause before important moves.",
    example: "Spend ten extra seconds checking whether your queen is safe before moving it.",
    related: ["THINK-049", "TOURNAMENT-024"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-038",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Time Management",
    title: "Entering Time Trouble Unnecessarily",
    level: "Intermediate",
    keywords: ["time trouble", "clock", "tournament"],
    questions: [
      "How can I avoid unnecessary time trouble?",
      "Why is time management part of chess skill?"
    ],
    short_answer: "Poor time allocation can turn a good position into a practical disaster.",
    answer: "Balance thinking time across the game and avoid spending excessive time on non-critical positions.",
    example: "Save time during routine opening moves so you have enough for a complicated middlegame.",
    related: ["THINK-039", "TOURNAMENT-027"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-039",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Emotions",
    title: "Playing Emotionally After a Blunder",
    level: "Intermediate",
    keywords: ["emotion", "blunder", "recovery"],
    questions: [
      "What should I do after making a blunder?",
      "How can I avoid emotional play?"
    ],
    short_answer: "After a mistake, return to the position and find the best practical defense.",
    answer: "Do not let frustration create a second mistake.",
    example: "After losing a pawn, keep calculating instead of making a reckless sacrifice.",
    related: ["PSYCH-031", "THINK-050"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-040",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Revenge",
    title: "Trying to Win Back Material Immediately",
    level: "Intermediate",
    keywords: ["revenge", "material", "emotion"],
    questions: [
      "Why is immediately winning back material dangerous?",
      "What should I do after losing material?"
    ],
    short_answer: "Trying to recover material immediately can lead to tactical or positional mistakes.",
    answer: "First stabilize the position and determine whether the lost material can safely be recovered.",
    example: "Do not sacrifice another piece simply because you want your lost pawn back.",
    related: ["PSYCH-032", "THINK-051"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-041",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Opening Study",
    title: "Memorizing Moves Without Understanding",
    level: "Intermediate",
    keywords: ["opening", "memorization", "understanding"],
    questions: [
      "Why is memorizing opening moves alone not enough?",
      "What should I learn with an opening variation?"
    ],
    short_answer: "Understanding plans and ideas helps when the opponent leaves known theory.",
    answer: "Learn typical plans, pawn structures, piece placement, and tactical ideas alongside moves.",
    example: "Knowing why a knight belongs on a certain square is more useful than memorizing the move alone.",
    related: ["THEORY-080", "OPENING-054"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-042",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Opening",
    title: "Playing Moves Without Knowing the Purpose",
    level: "Beginner",
    keywords: ["opening", "purpose", "planning"],
    questions: [
      "Should every opening move have a purpose?",
      "How can I understand my opening better?"
    ],
    short_answer: "You should know the general purpose behind your opening moves.",
    answer: "Ask whether a move develops, controls the center, improves king safety, or prepares a plan.",
    example: "A knight move may support central control and prepare castling.",
    related: ["OPENING-004", "THEORY-079"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-043",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Opening",
    title: "Leaving the King in the Center",
    level: "Beginner",
    keywords: ["king", "castling", "opening"],
    questions: [
      "Why is an uncastled king often vulnerable?",
      "When should I consider castling?"
    ],
    short_answer: "An uncastled king can be exposed when central files and diagonals open.",
    answer: "Consider king safety before starting tactical operations in the center.",
    example: "Opening the center while your king is still on e1 can expose it to checks.",
    related: ["OPENING-024", "ATTACK-034"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-044",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Piece Placement",
    title: "Putting Pieces on Vulnerable Squares",
    level: "Beginner",
    keywords: ["piece placement", "square", "tactics"],
    questions: [
      "Why can a good-looking square be bad?",
      "What should I check before placing a piece?"
    ],
    short_answer: "A piece can become a target if the square allows attacks, forks, or tactical threats.",
    answer: "Check whether the piece can be chased or tactically attacked after reaching the square.",
    example: "A knight on an attractive square may become vulnerable to a pawn attack.",
    related: ["POSITION-030", "CALC-016"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-045",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Rooks",
    title: "Leaving Rooks Disconnected",
    level: "Beginner",
    keywords: ["rooks", "development", "coordination"],
    questions: [
      "Why should rooks usually be connected?",
      "How do I connect my rooks?"
    ],
    short_answer: "Connected rooks usually indicate that the queen and minor pieces have developed sufficiently.",
    answer: "Develop your minor pieces and clear the back rank so the rooks can support each other.",
    example: "After castling and developing the bishops and queen, the rooks may become connected.",
    related: ["OPENING-028", "BASIC-033"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-046",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Rooks",
    title: "Keeping Rooks on Closed Files",
    level: "Intermediate",
    keywords: ["rook", "open file", "activity"],
    questions: [
      "Where should I usually place active rooks?",
      "Why are open files useful for rooks?"
    ],
    short_answer: "Rooks become more effective on open or strategically important files.",
    answer: "Look for files where your rook can attack pawns, enter the seventh rank, or support a break.",
    example: "A rook on an open file can pressure a weak pawn and restrict the opponent.",
    related: ["POSITION-036", "MIDDLE-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-047",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Knights",
    title: "Putting Knights on the Rim",
    level: "Beginner",
    keywords: ["knight", "rim", "piece activity"],
    questions: [
      "Why is a knight on the rim often weak?",
      "Is a knight on the edge always bad?"
    ],
    short_answer: "A knight on the edge usually controls fewer useful squares.",
    answer: "Do not move a knight to the rim without a concrete reason or useful target.",
    example: "A knight on h1 may have very limited influence compared with a centralized knight.",
    related: ["POSITION-041", "MOVE-025"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-048",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Bishops",
    title: "Locking Your Own Bishop",
    level: "Intermediate",
    keywords: ["bishop", "pawn structure", "activity"],
    questions: [
      "How can I trap my own bishop?",
      "Why should I consider bishop diagonals?"
    ],
    short_answer: "Your pawn structure can restrict your bishop and make it passive.",
    answer: "Before fixing your pawns, consider which diagonals your bishops will need.",
    example: "Placing pawns on the same color as your bishop can restrict its useful squares.",
    related: ["POSITION-040", "POSITION-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-049",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pawn Breaks",
    title: "Missing an Important Pawn Break",
    level: "Intermediate",
    keywords: ["pawn break", "strategy", "middlegame"],
    questions: [
      "Why are pawn breaks important?",
      "How can I find a useful pawn break?"
    ],
    short_answer: "A pawn break can open lines, challenge the center, or activate pieces.",
    answer: "Look for pawn moves that change the structure in your favor and create useful lines.",
    example: "A central pawn break can open a file for your rook.",
    related: ["MIDDLE-021", "POSITION-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-050",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pawn Structure",
    title: "Creating a Weak Pawn Structure Unnecessarily",
    level: "Intermediate",
    keywords: ["pawn structure", "doubled pawns", "weakness"],
    questions: [
      "When can a pawn structure become a weakness?",
      "Should I avoid doubled pawns completely?"
    ],
    short_answer: "Pawn weaknesses matter when they can be attacked or restrict your pieces.",
    answer: "Do not fear every structural weakness; evaluate whether the weakness is actually exploitable.",
    example: "Doubled pawns may be acceptable if they open a useful file and provide strong control.",
    related: ["POSITION-010", "POSITION-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-051",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Checks",
    title: "Giving Checks Without Purpose",
    level: "Intermediate",
    keywords: ["check", "forcing move", "attack"],
    questions: [
      "Can giving check be a bad move?",
      "Why should checks have a purpose?"
    ],
    short_answer: "A check is not automatically good; it should improve your position or force something useful.",
    answer: "Do not give harmless checks that simply help the opponent improve their king.",
    example: "A repeated queen check may drive the king toward safety instead of creating progress.",
    related: ["TACTIC-001", "MATE-058"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-052",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Sacrifice",
    title: "Sacrificing Without Enough Compensation",
    level: "Intermediate",
    keywords: ["sacrifice", "compensation", "calculation"],
    questions: [
      "When is a sacrifice justified?",
      "Why should I calculate sacrifices carefully?"
    ],
    short_answer: "A sacrifice should provide sufficient compensation such as attack, material recovery, or a lasting positional gain.",
    answer: "Calculate the opponent's defensive resources before giving up material.",
    example: "A piece sacrifice may be sound if it opens the king and creates a decisive attack.",
    related: ["TACTIC-064", "CALC-035"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-053",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "King Attack",
    title: "Opening Lines Against Your Own King",
    level: "Intermediate",
    keywords: ["king safety", "pawn move", "attack"],
    questions: [
      "Why can pawn moves around my king be dangerous?",
      "When should I avoid opening lines near my king?"
    ],
    short_answer: "Pawn moves around the king can create permanent weaknesses and open attacking lines.",
    answer: "Before pushing a king-side pawn, check what squares and files will become vulnerable.",
    example: "A careless pawn push may create a permanent hole beside the castled king.",
    related: ["ATTACK-036", "POSITION-056"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-054",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Endgame",
    title: "Activating the King Too Late",
    level: "Intermediate",
    keywords: ["endgame", "king", "activity"],
    questions: [
      "Why is king activity important in the endgame?",
      "When should I activate my king?"
    ],
    short_answer: "The king becomes a strong piece in many endgames and should often become active early.",
    answer: "Centralize the king when it is safe and use it to support pawns and restrict the enemy king.",
    example: "In a king-and-pawn ending, an active king can decide the result.",
    related: ["END-007", "PRACTICAL-END-057"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-055",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Endgame",
    title: "Pushing Pawns Too Quickly",
    level: "Intermediate",
    keywords: ["endgame", "pawn push", "zugzwang"],
    questions: [
      "Why can pushing a pawn be a mistake in the endgame?",
      "Should I always push a passed pawn?"
    ],
    short_answer: "An unnecessary pawn push can lose a tempo, weaken the pawn, or change the position unfavorably.",
    answer: "Improve your king or piece first when the pawn does not need immediate promotion.",
    example: "Keeping a pawn where it is may preserve a useful reserve tempo.",
    related: ["END-019", "END-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-056",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Pawn Promotion",
    title: "Forgetting Promotion Tactics",
    level: "Beginner",
    keywords: ["promotion", "pawn", "endgame"],
    questions: [
      "Why should I calculate promotion carefully?",
      "What can happen when a pawn promotes?"
    ],
    short_answer: "Promotion can create immediate tactical threats, including checks and underpromotion possibilities.",
    answer: "Calculate the promotion square, the opponent's checks, and whether promoting gives check.",
    example: "Promoting with check can gain a critical tempo in a pawn race.",
    related: ["END-051", "PRACTICAL-END-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-057",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Stalemate",
    title: "Allowing Stalemate",
    level: "Beginner",
    keywords: ["stalemate", "endgame", "draw"],
    questions: [
      "How can I accidentally stalemate my opponent?",
      "Why should I check legal moves before finishing?"
    ],
    short_answer: "Stalemate occurs when the player to move has no legal move but is not in check.",
    answer: "When winning easily, make sure the opponent still has a legal move unless you intend to draw.",
    example: "Removing every escape square while leaving the king unchecked can produce stalemate.",
    related: ["RULE-020", "END-046"],
    source: "FIDE Laws of Chess / Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-058",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Endgame",
    title: "Rushing a Winning Endgame",
    level: "Intermediate",
    keywords: ["endgame", "conversion", "winning"],
    questions: [
      "Why should I not rush a winning endgame?",
      "What should I do before pushing the final pawn?"
    ],
    short_answer: "Winning endgames often require accurate technique rather than speed.",
    answer: "Improve your king and pieces, restrict counterplay, and calculate the critical moments.",
    example: "Before pushing a passed pawn, make sure the enemy rook cannot give perpetual checks.",
    related: ["END-053", "PRACTICAL-END-088"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-059",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Resignation",
    title: "Resigning Too Early",
    level: "Beginner",
    keywords: ["resignation", "practical chess", "comeback"],
    questions: [
      "Should I resign whenever I lose material?",
      "When is it worth continuing?"
    ],
    short_answer: "Losing material does not always mean the game is immediately lost.",
    answer: "Consider the position, practical chances, king safety, and opponent's possible mistakes before resigning.",
    example: "An extra queen may not matter if the opponent faces an immediate forced mate.",
    related: ["PSYCH-038", "THINK-051"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-060",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Chess Clock",
    title: "Forgetting the Clock",
    level: "Beginner",
    keywords: ["clock", "time", "tournament"],
    questions: [
      "Why is clock awareness important?",
      "What should I monitor during a game?"
    ],
    short_answer: "Your remaining time affects how you should allocate your thinking.",
    answer: "Know your own time and occasionally check your opponent's time without becoming distracted.",
    example: "With little time remaining, choose practical moves that reduce unnecessary calculation.",
    related: ["TOURNAMENT-023", "THINK-039"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-061",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Notation",
    title: "Writing Incorrect Notation",
    level: "Beginner",
    keywords: ["notation", "scoresheet", "moves"],
    questions: [
      "Why should I learn accurate chess notation?",
      "What happens when I write the wrong move?"
    ],
    short_answer: "Accurate notation helps record, review, and analyze the game correctly.",
    answer: "Learn algebraic notation and write each move carefully according to the event rules.",
    example: "Confusing a capture with a normal move can make later game analysis difficult.",
    related: ["NOTATION-001", "RULE-037"],
    source: "FIDE Laws of Chess / Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-062",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Touch-Move",
    title: "Forgetting Touch-Move Rules",
    level: "Beginner",
    keywords: ["touch move", "tournament", "rules"],
    questions: [
      "What is the touch-move principle?",
      "How can I avoid touch-move problems?"
    ],
    short_answer: "In formal chess, touching a piece can create obligations under the applicable rules.",
    answer: "Decide before touching a piece and avoid careless contact with pieces during tournament play.",
    example: "Do not touch your queen while still deciding whether you want to move it.",
    related: ["RULE-052", "TOURNAMENT-012"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "MISTAKE-063",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Post-Game Review",
    title: "Analyzing Only the Final Result",
    level: "Beginner",
    keywords: ["game review", "analysis", "improvement"],
    questions: [
      "Why should I analyze my games?",
      "What should I look for after a game?"
    ],
    short_answer: "The result alone does not reveal where the game was decided.",
    answer: "Find critical moments, missed opportunities, blunders, and recurring mistakes.",
    example: "A loss may have been decided by one opening misunderstanding rather than the final blunder.",
    related: ["TRAIN-041", "THINK-065"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-064",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Engine Analysis",
    title: "Using the Engine Before Thinking",
    level: "Intermediate",
    keywords: ["engine", "analysis", "improvement"],
    questions: [
      "Should I use an engine immediately after my game?",
      "Why should I analyze myself first?"
    ],
    short_answer: "Self-analysis helps you understand your own decisions before seeing engine evaluations.",
    answer: "First identify where you felt uncertain and what you considered, then compare with engine analysis.",
    example: "Write down your suspected mistake before turning on Stockfish.",
    related: ["TRAIN-043", "TECH-043"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-065",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Learning",
    title: "Studying Too Many Topics at Once",
    level: "Beginner",
    keywords: ["training", "focus", "improvement"],
    questions: [
      "Why can studying too many chess topics hurt?",
      "How should I organize my chess training?"
    ],
    short_answer: "Too many simultaneous goals can reduce focus and retention.",
    answer: "Choose a small number of priorities and practice them consistently.",
    example: "Spend one week focusing on tactical awareness instead of studying ten unrelated openings.",
    related: ["TRAIN-006", "TRAIN-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-066",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Puzzle Training",
    title: "Guessing Chess Puzzles",
    level: "Beginner",
    keywords: ["puzzles", "tactics", "calculation"],
    questions: [
      "Why should I calculate before solving a puzzle?",
      "What is wrong with guessing puzzle moves?"
    ],
    short_answer: "Guessing teaches pattern recognition without reliable calculation.",
    answer: "Calculate the complete tactical idea before playing your answer.",
    example: "Before choosing a sacrifice, calculate the opponent's best defensive reply.",
    related: ["PUZZLE-012", "CALC-038"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-067",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Online Chess",
    title: "Playing Too Many Games Without Review",
    level: "Beginner",
    keywords: ["online chess", "games", "training"],
    questions: [
      "Is playing many games enough to improve?",
      "Why should I review my games?"
    ],
    short_answer: "Playing provides experience, but review converts experience into learning.",
    answer: "After important games, identify at least one mistake and one lesson.",
    example: "After five blitz games, review the two moments where you lost material.",
    related: ["TRAIN-040", "TRAIN-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-068",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Consistency",
    title: "Changing Opening Repertoire Too Often",
    level: "Intermediate",
    keywords: ["opening repertoire", "consistency", "study"],
    questions: [
      "Why should I avoid changing openings constantly?",
      "How long should I stay with an opening?"
    ],
    short_answer: "Constantly changing openings can prevent you from understanding typical positions deeply.",
    answer: "Stay with a practical repertoire long enough to learn its structures and plans.",
    example: "Instead of changing defenses after every loss, study the position where your understanding failed.",
    related: ["THEORY-077", "TRAIN-019"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-069",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Practical Tip",
    title: "Always Ask What Changed",
    level: "Beginner",
    keywords: ["what changed", "thinking", "blunder check"],
    questions: [
      "What is one simple question I should ask after every move?",
      "Why is 'What changed?' useful?"
    ],
    short_answer: "Asking what changed helps reveal new attacks, threats, weaknesses, and opportunities.",
    answer: "Compare the position before and after the opponent's move.",
    example: "A newly opened diagonal may suddenly attack your queen or king.",
    related: ["THINK-003", "CALC-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "MISTAKE-070",
    type: "MISTAKE",
    category: "Common Mistakes",
    topic: "Common Mistakes & Practical Tips",
    subtopic: "Practical Checklist",
    title: "The Final Blunder Check",
    level: "Beginner",
    keywords: ["blunder check", "checklist", "practical chess"],
    questions: [
      "What should I check immediately before moving?",
      "What is a simple final-move checklist?"
    ],
    short_answer: "Before moving, check checks, captures, threats, loose pieces, and your opponent's reply.",
    answer: "Pause briefly and ask: Is my king safe? Is my piece safe? What is my opponent's strongest response?",
    example: "A five-second final check can prevent many one-move blunders.",
    related: ["THINK-049", "CALC-050"],
    source: "Chess coaching principle",
    verified: true
  }

];

export default commonMistakesPracticalTips;