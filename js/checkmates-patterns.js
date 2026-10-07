const checkmatesAttackingPatterns = [
  {
    id: "MATE-001",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "What is checkmate?",
    level: "Beginner",
    keywords: ["checkmate", "mate", "king"],
    questions: [
      "What is checkmate?",
      "When is a king checkmated?"
    ],
    short_answer: "Checkmate occurs when the king is in check and has no legal way to escape.",
    answer: "The checking piece cannot be ignored, captured, blocked, or otherwise neutralized.",
    example: "A queen gives check while every escape square is controlled and the queen cannot be captured.",
    related: ["RULE-018", "MATE-002", "ATTACK-001"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "MATE-002",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "What is the difference between check and checkmate?",
    level: "Beginner",
    keywords: ["check", "checkmate", "king"],
    questions: [
      "How is check different from checkmate?",
      "Does every check mean checkmate?"
    ],
    short_answer: "Check means the king is attacked; checkmate means the king is attacked with no legal escape.",
    answer: "A checked king may be able to move, capture the attacker, or block the attack.",
    example: "If the king has one safe square, the position is check, not checkmate.",
    related: ["RULE-015", "MATE-001", "MATE-003"],
    source: "FIDE Laws",
    verified: true
  },

  {
    id: "MATE-003",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "How many ways can a player escape check?",
    level: "Beginner",
    keywords: ["check", "defense", "king"],
    questions: [
      "How can a king escape check?",
      "What are the ways to defend against check?"
    ],
    short_answer: "The king can move, the checking piece can be captured, or the line of attack can sometimes be blocked.",
    answer: "Blocking is possible only against a sliding-piece check and not against a knight or adjacent attack.",
    example: "Against a rook check along a file, a piece may sometimes interpose between the rook and king.",
    related: ["RULE-015", "MATE-002", "TACTIC-025"],
    source: "FIDE Laws",
    verified: true
  },

  {
    id: "MATE-004",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "Can a king capture a checking piece?",
    level: "Beginner",
    keywords: ["king", "capture", "check"],
    questions: [
      "Can the king capture the checking piece?",
      "When can a king capture an attacking piece?"
    ],
    short_answer: "Yes, if the destination square is not controlled by an enemy piece.",
    answer: "The king may never move onto a square where it would still be in check.",
    example: "A king can capture an unprotected checking rook if the capture square is safe.",
    related: ["RULE-015", "MOVE-010", "MATE-003"],
    source: "FIDE Laws",
    verified: true
  },

  {
    id: "MATE-005",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "Can a knight check be blocked?",
    level: "Beginner",
    keywords: ["knight check", "block", "checkmate"],
    questions: [
      "Can you block a knight check?",
      "How do you defend against a knight check?"
    ],
    short_answer: "No. A knight jumps directly to its destination and cannot be blocked.",
    answer: "Against a knight check, the king must move or the knight must be captured if possible.",
    example: "A knight checking from f7 cannot be blocked by placing another piece between it and the king.",
    related: ["MOVE-025", "MATE-003", "RULE-015"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "MATE-006",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "Can a pawn check be blocked?",
    level: "Beginner",
    keywords: ["pawn check", "check", "pawn"],
    questions: [
      "Can a pawn check be blocked?",
      "How do you respond to a pawn check?"
    ],
    short_answer: "A pawn attacks diagonally, so its attack cannot be blocked.",
    answer: "The king must move or the attacking pawn must be captured when legally possible.",
    example: "If a pawn attacks the king from an adjacent diagonal, placing a piece in between does not help.",
    related: ["MOVE-030", "MATE-003", "RULE-015"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "MATE-007",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "What is a mating pattern?",
    level: "Beginner",
    keywords: ["mating pattern", "checkmate", "pattern"],
    questions: [
      "What is a mating pattern?",
      "Why should chess players learn mating patterns?"
    ],
    short_answer: "A mating pattern is a recurring arrangement that leads to checkmate.",
    answer: "Learning patterns helps players recognize mating opportunities faster.",
    example: "Back-rank mate is a common pattern involving a rook or queen and a restricted king.",
    related: ["MATE-030", "MATE-020", "TRAIN-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-008",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "Why are mating patterns important?",
    level: "Beginner",
    keywords: ["mating patterns", "training", "checkmate"],
    questions: [
      "Why should I study checkmate patterns?",
      "How do mating patterns improve chess?"
    ],
    short_answer: "They help you recognize winning attacks and avoid missing simple mates.",
    answer: "Pattern recognition reduces calculation time in familiar attacking positions.",
    example: "Once you know the back-rank pattern, you can spot it quickly during a game.",
    related: ["MATE-007", "TRAIN-010", "TACTIC-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-009",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Fundamentals",
    title: "What is a mating threat?",
    level: "Beginner",
    keywords: ["mating threat", "checkmate", "attack"],
    questions: [
      "What is a mating threat?",
      "How do I recognize a mating threat?"
    ],
    short_answer: "A mating threat is a move or plan that threatens to deliver checkmate.",
    answer: "The defender must respond if the threat cannot be ignored.",
    example: "A queen move threatening Qh7# forces the opponent to address the danger.",
    related: ["MATE-010", "ATTACK-001", "TACTIC-056"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-010",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Double Check",
    title: "Why is double check so dangerous?",
    level: "Intermediate",
    keywords: ["double check", "checkmate", "king"],
    questions: [
      "Why is double check powerful?",
      "Why must the king usually move in double check?"
    ],
    short_answer: "Two pieces are checking simultaneously, so capturing or blocking only one attacker is insufficient.",
    answer: "The king normally has to move because both attacks must be removed.",
    example: "A discovered double check can leave the king with very few safe squares.",
    related: ["TACTIC-025", "MATE-003", "MATE-020"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "MATE-011",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Basic Mates",
    title: "What is Fool's Mate?",
    level: "Beginner",
    keywords: ["Fool's Mate", "fastest mate", "checkmate"],
    questions: [
      "What is Fool's Mate?",
      "What is the fastest possible checkmate?"
    ],
    short_answer: "Fool's Mate is the shortest possible checkmate in chess.",
    answer: "It occurs after two Black moves when White makes extremely weakening pawn moves.",
    example: "The pattern ends with ...Qh4# after White has weakened the diagonal to the king.",
    related: ["TRAP-013", "MATE-001", "RULE-018"],
    source: "Established chess fact",
    verified: true
  },

  {
    id: "MATE-012",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Basic Mates",
    title: "What is Scholar's Mate?",
    level: "Beginner",
    keywords: ["Scholar's Mate", "Qxf7", "checkmate"],
    questions: [
      "What is Scholar's Mate?",
      "What is the idea behind Scholar's Mate?"
    ],
    short_answer: "Scholar's Mate attacks f7 with the queen and bishop.",
    answer: "It is a basic mating pattern that teaches the importance of king safety and defending f7.",
    example: "Qh5 and Bc4 can combine against f7 when Black fails to defend properly.",
    related: ["TRAP-011", "ATTACK-010", "MATE-001"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "MATE-013",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Basic Mates",
    title: "What is back-rank mate?",
    level: "Beginner",
    keywords: ["back rank mate", "rook", "queen"],
    questions: [
      "What is back-rank checkmate?",
      "How does a back-rank mate happen?"
    ],
    short_answer: "A back-rank mate occurs when a rook or queen checks a king trapped by its own pieces or pawns.",
    answer: "The king cannot escape because its own pieces occupy the surrounding squares.",
    example: "A rook delivers mate on the eighth rank against a king trapped behind pawns.",
    related: ["TACTIC-042", "MATE-014", "ATTACK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-014",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Back Rank",
    title: "What is back-rank weakness?",
    level: "Beginner",
    keywords: ["back rank", "king safety", "weakness"],
    questions: [
      "What is a back-rank weakness?",
      "Why can a king be trapped on the back rank?"
    ],
    short_answer: "It occurs when the king has few or no escape squares on its starting rank.",
    answer: "The king's own pawns can act like a prison when an enemy rook or queen enters the rank.",
    example: "A king on g8 behind pawns on f7, g7, and h7 can be vulnerable to a rook on the eighth rank.",
    related: ["MATE-013", "TACTIC-043", "ATTACK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-015",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Back Rank",
    title: "What is a back-rank escape square?",
    level: "Beginner",
    keywords: ["luft", "escape square", "back rank"],
    questions: [
      "What is a back-rank escape square?",
      "Why is a luft useful?"
    ],
    short_answer: "It is a safe square created for the king so it cannot be trapped on the back rank.",
    answer: "A pawn move can sometimes create such a square.",
    example: "h3 may create h2 as a possible king escape square for White.",
    related: ["TACTIC-043", "MATE-013", "ATTACK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-016",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Basic Mates",
    title: "What is a smothered mate?",
    level: "Intermediate",
    keywords: ["smothered mate", "knight", "checkmate"],
    questions: [
      "What is smothered mate?",
      "Which piece usually delivers smothered mate?"
    ],
    short_answer: "Smothered mate is a knight checkmate where the king is surrounded by its own pieces.",
    answer: "Because the king's own pieces block its escape squares, a knight can deliver the final check.",
    example: "A knight gives check next to a king trapped by its own rook, bishop, and pawns.",
    related: ["MATE-017", "TACTIC-029", "TACTIC-057"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "MATE-017",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Smothered Mate",
    title: "Why does a knight deliver smothered mate?",
    level: "Intermediate",
    keywords: ["smothered mate", "knight", "mating pattern"],
    questions: [
      "Why is a knight ideal for smothered mate?",
      "Why can't a king capture the knight in a smothered mate?"
    ],
    short_answer: "The knight checks from a square the king cannot capture while surrounding pieces prevent escape.",
    answer: "The king's own pieces effectively create the mating net.",
    example: "A knight on f7 can give check to a king on h8 in a suitable smothered-mate pattern.",
    related: ["MATE-016", "MOVE-025", "MATE-020"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "MATE-018",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Nets",
    title: "What is a mating net?",
    level: "Intermediate",
    keywords: ["mating net", "king", "attack"],
    questions: [
      "What is a mating net?",
      "How does a mating net trap the king?"
    ],
    short_answer: "A mating net restricts the king's escape squares until a mating move becomes possible.",
    answer: "Several pieces usually work together to control the surrounding squares.",
    example: "A queen controls escape squares while a bishop and knight support the attack.",
    related: ["MATE-007", "MATE-019", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-019",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Nets",
    title: "How do you build a mating net?",
    level: "Intermediate",
    keywords: ["mating net", "attack", "king"],
    questions: [
      "How can I create a mating net?",
      "What is needed for a mating net?"
    ],
    short_answer: "Restrict escape squares, bring attacking pieces closer, and use forcing checks.",
    answer: "A mating net becomes stronger when the king has fewer safe squares.",
    example: "A bishop controls one diagonal while a queen controls the remaining escape squares.",
    related: ["MATE-018", "ATTACK-020", "TACTIC-057"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-020",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a mating attack?",
    level: "Intermediate",
    keywords: ["mating attack", "king attack", "checkmate"],
    questions: [
      "What is a mating attack?",
      "How does a mating attack develop?"
    ],
    short_answer: "A mating attack uses coordinated pieces to create a decisive threat against the king.",
    answer: "The attack often involves sacrifices, checks, open lines, and control of escape squares.",
    example: "A queen and bishop battery can create a mating threat against a weakened kingside.",
    related: ["ATTACK-020", "MATE-018", "TACTIC-056"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-021",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a queen and bishop battery?",
    level: "Intermediate",
    keywords: ["queen bishop battery", "battery", "attack"],
    questions: [
      "What is a queen-bishop battery?",
      "Why are queen and bishop batteries dangerous?"
    ],
    short_answer: "A queen and bishop battery places both pieces on a line aimed toward the king.",
    answer: "The bishop often controls escape squares while the queen delivers or threatens mate.",
    example: "A bishop on c4 and queen on h5 can cooperate against f7.",
    related: ["MATE-012", "ATTACK-020", "TACTIC-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-022",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a queen and knight mating attack?",
    level: "Intermediate",
    keywords: ["queen knight", "mating attack", "king"],
    questions: [
      "Why are queen and knight combinations dangerous?",
      "How do queen and knight create mating threats?"
    ],
    short_answer: "The queen gives long-range checks while the knight controls key escape squares.",
    answer: "The two pieces attack different squares, making them difficult for the king to escape.",
    example: "A queen check near the king can be supported by a knight covering the escape square.",
    related: ["MATE-018", "ATTACK-020", "TACTIC-011"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-023",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a rook lift in an attack?",
    level: "Intermediate",
    keywords: ["rook lift", "rook", "attack"],
    questions: [
      "What is a rook lift?",
      "How can a rook lift support a mating attack?"
    ],
    short_answer: "A rook lift brings a rook from a file onto a rank where it can attack the king.",
    answer: "It can add an extra attacker without needing an open file directly toward the king.",
    example: "A rook moves to the third rank and then across to the kingside attack.",
    related: ["ATTACK-020", "MIDDLE-020", "TACTIC-060"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-024",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a battery in chess?",
    level: "Intermediate",
    keywords: ["battery", "queen rook", "attack"],
    questions: [
      "What is a battery in chess?",
      "How does a battery help an attack?"
    ],
    short_answer: "A battery is two pieces aligned on the same line to increase pressure on a target.",
    answer: "Queen and rook batteries are especially powerful on open files and ranks.",
    example: "Two rooks on an open file can create overwhelming pressure against the king.",
    related: ["MATE-021", "ATTACK-020", "MIDDLE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-025",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a sacrifice near the king?",
    level: "Intermediate",
    keywords: ["king sacrifice", "sacrifice", "attack"],
    questions: [
      "Why sacrifice a piece near the enemy king?",
      "How does a king-side sacrifice work?"
    ],
    short_answer: "A sacrifice near the king can remove defenders or open lines for a mating attack.",
    answer: "The key is whether the resulting attack is concrete and strong enough.",
    example: "A bishop sacrifice on h7 can expose the king to queen and knight checks.",
    related: ["TACTIC-050", "TACTIC-054", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-026",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is the Greek Gift attack?",
    level: "Advanced",
    keywords: ["Greek Gift", "Bxh7", "attack"],
    questions: [
      "What is the Greek Gift attack?",
      "Why is Bxh7+ associated with the Greek Gift?"
    ],
    short_answer: "The Greek Gift is a classic bishop sacrifice on h7 or h2 that can expose the king.",
    answer: "It usually requires supporting pieces and accurate calculation before the sacrifice is played.",
    example: "Bxh7+ followed by Ng5 and Qh5 can create a dangerous attack in suitable structures.",
    related: ["TACTIC-054", "MATE-025", "ATTACK-020"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "MATE-027",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a windmill attack?",
    level: "Advanced",
    keywords: ["windmill", "discovered check", "rook"],
    questions: [
      "What is a windmill tactic?",
      "How does a windmill attack work?"
    ],
    short_answer: "A windmill repeatedly uses checks and discovered attacks to win material.",
    answer: "A rook or another piece gives repeated checks while a second piece captures valuable targets.",
    example: "A rook checks the king repeatedly while a bishop or rook captures pieces behind it.",
    related: ["TACTIC-024", "TACTIC-025", "TACTIC-001"],
    source: "Established tactical pattern",
    verified: true
  },

  {
    id: "MATE-028",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "King Safety",
    title: "Why is king shelter important?",
    level: "Beginner",
    keywords: ["king shelter", "king safety", "attack"],
    questions: [
      "What is king shelter?",
      "Why is king shelter important?"
    ],
    short_answer: "King shelter is the protection provided by nearby pawns and pieces.",
    answer: "A healthy shelter reduces the number of checking routes and safe attacking squares.",
    example: "Castled kings are often protected by three pawns forming a shelter.",
    related: ["ATTACK-001", "OPENING-022", "MATE-014"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-029",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "King Safety",
    title: "What weakens a king's shelter?",
    level: "Beginner",
    keywords: ["king shelter", "pawn structure", "king safety"],
    questions: [
      "What weakens king shelter?",
      "Which pawn moves can expose the king?"
    ],
    short_answer: "Unnecessary pawn advances, exchanges, and open files near the king can weaken its shelter.",
    answer: "Once the pawn cover is damaged, enemy pieces may gain checking routes.",
    example: "Advancing the g-pawn can create weaknesses on dark squares around the king.",
    related: ["MATE-028", "ATTACK-010", "POSITION-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-030",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Back Rank",
    title: "How do you prevent back-rank mate?",
    level: "Beginner",
    keywords: ["back rank", "defense", "mate"],
    questions: [
      "How can I prevent back-rank mate?",
      "What is the easiest back-rank defense?"
    ],
    short_answer: "Give the king an escape square or maintain sufficient control of the back rank.",
    answer: "Creating luft is a common practical solution, but it should not create new weaknesses.",
    example: "A carefully timed h3 or h6 can give the king an escape square.",
    related: ["MATE-013", "MATE-015", "TACTIC-043"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-031",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Corner Mates",
    title: "Why is a king in the corner vulnerable?",
    level: "Beginner",
    keywords: ["corner", "king", "mate"],
    questions: [
      "Why is a king vulnerable in the corner?",
      "Is a cornered king easier to checkmate?"
    ],
    short_answer: "A cornered king has fewer escape squares.",
    answer: "Attackers can therefore control the remaining squares more easily.",
    example: "A queen supported by a knight can create a mating net against a king in the corner.",
    related: ["MATE-018", "MATE-022", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-032",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Corner Mates",
    title: "What is a corner mating pattern?",
    level: "Intermediate",
    keywords: ["corner mate", "mating pattern", "king"],
    questions: [
      "What is a corner mating pattern?",
      "How do pieces cooperate against a cornered king?"
    ],
    short_answer: "It is a mating pattern where the king's limited corner squares are controlled by coordinated pieces.",
    answer: "The attacker usually needs to cover the few available escape squares.",
    example: "A queen controls the rank while a knight controls a nearby escape square.",
    related: ["MATE-031", "MATE-022", "MATE-018"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-033",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Diagonal Attacks",
    title: "Why are long diagonals dangerous to kings?",
    level: "Intermediate",
    keywords: ["diagonal", "bishop", "king attack"],
    questions: [
      "Why are open diagonals dangerous for the king?",
      "How can a bishop attack a king from far away?"
    ],
    short_answer: "An open diagonal allows a bishop or queen to attack the king from long range.",
    answer: "A diagonal can become active suddenly after a pawn moves or is captured.",
    example: "Opening the diagonal toward g7 can create a direct bishop attack on the king.",
    related: ["TACTIC-048", "ATTACK-010", "MATE-021"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-034",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Files and Ranks",
    title: "Why are open files useful for mating attacks?",
    level: "Intermediate",
    keywords: ["open file", "rook", "king attack"],
    questions: [
      "Why are open files important in king attacks?",
      "How can rooks use open files to attack a king?"
    ],
    short_answer: "Open files allow rooks and queens to penetrate toward the king without pawn obstruction.",
    answer: "A rook on an open file can create checks or force the king into a restricted area.",
    example: "A rook on the seventh rank can attack pawns around a king and prepare checks.",
    related: ["ATTACK-020", "MATE-024", "POSITION-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-035",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a king hunt?",
    level: "Intermediate",
    keywords: ["king hunt", "attack", "check"],
    questions: [
      "What is a king hunt?",
      "How does a king hunt happen?"
    ],
    short_answer: "A king hunt is a sustained attack that forces the enemy king away from safety.",
    answer: "The attacker uses repeated checks and threats while controlling escape squares.",
    example: "A sacrifice opens the king's shelter and forces it into the center.",
    related: ["ATTACK-020", "MATE-020", "TACTIC-003"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-036",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "Why can a king in the center be vulnerable?",
    level: "Beginner",
    keywords: ["king in center", "king safety", "attack"],
    questions: [
      "Why is a king in the center vulnerable?",
      "Can an uncastled king be attacked tactically?"
    ],
    short_answer: "A central king has fewer pawn shields and can be exposed to checks from several directions.",
    answer: "Open files and diagonals can become active before the king finds safety.",
    example: "Opening the center while the opponent's king is uncastled can produce forcing checks.",
    related: ["OPENING-022", "ATTACK-001", "MATE-035"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-037",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Attacks",
    title: "What is a king corridor?",
    level: "Advanced",
    keywords: ["king corridor", "king hunt", "attack"],
    questions: [
      "What is a king corridor?",
      "How can attackers use a king's limited path?"
    ],
    short_answer: "A king corridor is a sequence of restricted squares through which an attacked king is forced to move.",
    answer: "Attackers can anticipate the king's route and prepare further checks.",
    example: "A rook controls one rank while a bishop controls escape squares, forcing the king toward a corner.",
    related: ["MATE-035", "MATE-018", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-038",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Defensive Awareness",
    title: "How do you defend against a mating attack?",
    level: "Intermediate",
    keywords: ["defend mating attack", "king safety", "defense"],
    questions: [
      "How do I defend against a mating attack?",
      "What should I do when my king is under attack?"
    ],
    short_answer: "Look for forcing defensive moves, escape squares, exchanges of attackers, and counterchecks.",
    answer: "The priority is to eliminate the immediate mating threat rather than continue a separate plan.",
    example: "Trading the opponent's attacking queen may completely end the mating attack.",
    related: ["ATTACK-030", "TACTIC-065", "MATE-039"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-039",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Defensive Awareness",
    title: "What is the first defensive question during a king attack?",
    level: "Beginner",
    keywords: ["king attack", "defense", "threat"],
    questions: [
      "What should I check first when my king is attacked?",
      "What is the first question in king defense?"
    ],
    short_answer: "Ask what the opponent's immediate threat is and whether there is a forced mate.",
    answer: "Identifying the actual threat prevents unnecessary defensive moves.",
    example: "If the opponent threatens Qh7#, your first task is to stop that specific threat.",
    related: ["MATE-009", "MATE-038", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-040",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Defensive Awareness",
    title: "Should you trade queens to stop an attack?",
    level: "Beginner",
    keywords: ["queen exchange", "attack", "defense"],
    questions: [
      "Can exchanging queens stop a king attack?",
      "Should I trade queens when under attack?"
    ],
    short_answer: "Often yes, if the queen exchange safely removes the opponent's main attacking force.",
    answer: "But the exchange must be checked tactically; it is not automatically safe.",
    example: "Offering a queen trade can be an excellent defensive resource when facing a dangerous attack.",
    related: ["MATE-038", "ATTACK-030", "TACTIC-068"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-041",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Defensive Awareness",
    title: "What is a countercheck?",
    level: "Intermediate",
    keywords: ["countercheck", "check", "defense"],
    questions: [
      "What is a countercheck?",
      "Can giving check be a defensive move?"
    ],
    short_answer: "A countercheck gives check to the opponent's king while responding to an attack.",
    answer: "It can force the attacking side to defend instead of continuing its own attack.",
    example: "A rook check can interrupt an enemy mating attack and gain time.",
    related: ["TACTIC-067", "MATE-038", "TACTIC-003"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-042",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Defensive Awareness",
    title: "What is a flight square?",
    level: "Beginner",
    keywords: ["flight square", "escape square", "king"],
    questions: [
      "What is a flight square?",
      "Why does a king need flight squares?"
    ],
    short_answer: "A flight square is a safe square available for the king to escape an attack.",
    answer: "Having one or more flight squares can prevent certain mating patterns.",
    example: "A pawn move may create an escape square for a castled king.",
    related: ["MATE-015", "MATE-030", "ATTACK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-043",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "What is a corridor mate?",
    level: "Advanced",
    keywords: ["corridor mate", "rook", "queen"],
    questions: [
      "What is a corridor mate?",
      "How does a corridor mating pattern work?"
    ],
    short_answer: "A corridor mate occurs when the king is confined to a narrow line of squares and is checked with no escape.",
    answer: "Rooks and queens are particularly effective because they control ranks and files.",
    example: "A rook check along a rank can mate a king whose escape squares are blocked.",
    related: ["MATE-013", "MATE-037", "MATE-018"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-044",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "What is a bishop-and-knight mating pattern?",
    level: "Advanced",
    keywords: ["bishop knight mate", "bishop", "knight"],
    questions: [
      "Can bishop and knight checkmate a king?",
      "What is the bishop-and-knight mate?"
    ],
    short_answer: "Yes. A bishop and knight can force checkmate with accurate king coordination.",
    answer: "The bishop controls one color of squares while the knight controls key escape squares.",
    example: "The attacking king helps restrict the enemy king before the final bishop or knight check.",
    related: ["END-040", "MATE-018", "TACTIC-057"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "MATE-045",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "Can two bishops checkmate a king?",
    level: "Beginner",
    keywords: ["two bishops", "checkmate", "endgame"],
    questions: [
      "Can two bishops checkmate?",
      "What is needed for a two-bishop checkmate?"
    ],
    short_answer: "Yes. Two bishops and the king can force checkmate.",
    answer: "The bishops control both square colors while the king helps restrict the enemy king.",
    example: "The bishops gradually drive the king toward the edge before the final mate.",
    related: ["END-040", "MATE-044", "MATE-046"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "MATE-046",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "Can a king and rook checkmate?",
    level: "Beginner",
    keywords: ["rook mate", "king rook", "endgame"],
    questions: [
      "Can king and rook force checkmate?",
      "How does rook-and-king mate work?"
    ],
    short_answer: "Yes. A king and rook can force checkmate against a lone king.",
    answer: "The rook cuts off the enemy king while the attacking king approaches to support the final mate.",
    example: "The rook restricts the king to fewer files until it is driven to the edge.",
    related: ["END-030", "MATE-047", "MATE-048"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "MATE-047",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "Can a king and queen checkmate?",
    level: "Beginner",
    keywords: ["queen mate", "king queen", "endgame"],
    questions: [
      "Can king and queen checkmate?",
      "How does queen-and-king mate work?"
    ],
    short_answer: "Yes. A king and queen can force checkmate against a lone king.",
    answer: "The queen restricts the enemy king while the attacking king supports the final mating position.",
    example: "The queen creates a box and the king moves closer before the final check.",
    related: ["END-030", "MATE-048", "MATE-046"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "MATE-048",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "Why can a queen alone not checkmate?",
    level: "Beginner",
    keywords: ["queen mate", "king", "checkmate"],
    questions: [
      "Can a queen checkmate a king alone?",
      "Why is the attacking king necessary?"
    ],
    short_answer: "A queen needs the attacking king to control escape squares safely.",
    answer: "Without the king's support, the queen cannot always force the enemy king into a mating position.",
    example: "The attacking king controls nearby squares while the queen delivers the final check.",
    related: ["MATE-047", "END-030", "RULE-015"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "MATE-049",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "What is a staircase mate?",
    level: "Beginner",
    keywords: ["staircase mate", "two rooks", "checkmate"],
    questions: [
      "What is staircase mate?",
      "How do two rooks create a staircase mate?"
    ],
    short_answer: "Two rooks can restrict the enemy king by alternating checks along ranks or files.",
    answer: "The rooks gradually push the king toward the edge.",
    example: "One rook checks while the other controls the next rank, creating a shrinking box.",
    related: ["END-030", "MATE-046", "MATE-043"],
    source: "Established endgame technique",
    verified: true
  },

  {
    id: "MATE-050",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Mating Patterns",
    title: "What is a queen staircase technique?",
    level: "Beginner",
    keywords: ["queen", "staircase", "mate"],
    questions: [
      "Can the queen use a staircase technique?",
      "How does the queen restrict a king?"
    ],
    short_answer: "The queen can progressively reduce the enemy king's available area.",
    answer: "The attacking king must remain close enough to prevent stalemate and support the final mate.",
    example: "The queen cuts off one rank at a time while the king approaches.",
    related: ["MATE-047", "END-030", "RULE-020"],
    source: "Established endgame technique",
    verified: true
  },

  {
    id: "MATE-051",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Stalemate Awareness",
    title: "What is stalemate?",
    level: "Beginner",
    keywords: ["stalemate", "draw", "king"],
    questions: [
      "What is stalemate?",
      "Is stalemate checkmate?"
    ],
    short_answer: "Stalemate occurs when the player to move has no legal move and is not in check.",
    answer: "It is a draw, not a win.",
    example: "A queen can accidentally trap the enemy king with no legal moves without giving check.",
    related: ["RULE-020", "MATE-052", "END-030"],
    source: "FIDE Laws",
    verified: true
  },

  {
    id: "MATE-052",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Stalemate Awareness",
    title: "How do you avoid stalemate when mating?",
    level: "Beginner",
    keywords: ["stalemate", "queen", "endgame"],
    questions: [
      "How can I avoid stalemate?",
      "Why do players accidentally stalemate?"
    ],
    short_answer: "Keep at least one legal move available for the opponent until you are ready to deliver mate.",
    answer: "Be especially careful when the enemy king has very few pieces or pawns remaining.",
    example: "Do not place the queen too close to a cornered king if it removes every escape square without check.",
    related: ["MATE-051", "RULE-020", "END-030"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "MATE-053",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "What is the first rule of attacking?",
    level: "Beginner",
    keywords: ["attack", "king attack", "principles"],
    questions: [
      "What is the first rule of a king attack?",
      "How should I start an attack?"
    ],
    short_answer: "Bring enough pieces into the attack before opening the position.",
    answer: "A premature attack with only one or two pieces can often be defended or counterattacked.",
    example: "Develop the queen, bishop, and knight before sacrificing a pawn near the king.",
    related: ["ATTACK-001", "ATTACK-020", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-054",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "How many pieces should attack a king?",
    level: "Intermediate",
    keywords: ["attackers", "king attack", "pieces"],
    questions: [
      "How many pieces should I use in a king attack?",
      "Do I need several pieces to attack the king?"
    ],
    short_answer: "Usually, multiple coordinated pieces are needed for a reliable attack.",
    answer: "The exact number depends on the position, but one attacking piece rarely creates a forced mate against a well-defended king.",
    example: "A queen supported by a bishop and knight can create much stronger threats than the queen alone.",
    related: ["MATE-020", "TACTIC-060", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-055",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "What is the weakest square around a king?",
    level: "Intermediate",
    keywords: ["king weakness", "escape squares", "attack"],
    questions: [
      "How do I identify weak squares around a king?",
      "What makes a king square weak?"
    ],
    short_answer: "A square is weak when it cannot be adequately controlled by the defending pieces or pawns.",
    answer: "Attackers can use weak squares as entry points for checks or sacrifices.",
    example: "A weakened dark square near a castled king can become a powerful attacking outpost.",
    related: ["POSITION-020", "ATTACK-010", "MATE-018"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-056",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "Why remove defenders before attacking the king?",
    level: "Intermediate",
    keywords: ["remove defender", "king attack", "tactics"],
    questions: [
      "Why should I remove defenders around the king?",
      "How does removing a defender help a mating attack?"
    ],
    short_answer: "Removing defenders makes checks and sacrifices more effective.",
    answer: "A king with fewer supporting pieces has fewer ways to survive a tactical attack.",
    example: "Exchanging a knight that guards key escape squares can make a queen check decisive.",
    related: ["TACTIC-030", "MATE-020", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-057",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "Why open lines toward the king?",
    level: "Intermediate",
    keywords: ["open lines", "king attack", "files"],
    questions: [
      "Why are open lines useful in king attacks?",
      "How can opening a file help checkmate?"
    ],
    short_answer: "Open lines give attacking pieces direct routes toward the king.",
    answer: "Rooks, bishops, and queens become much more powerful when their lines are unobstructed.",
    example: "A pawn sacrifice can open a file for a rook against the king.",
    related: ["TACTIC-048", "MATE-034", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-058",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "What is an attacking pawn break?",
    level: "Intermediate",
    keywords: ["pawn break", "attack", "king"],
    questions: [
      "What is an attacking pawn break?",
      "How can a pawn break start a king attack?"
    ],
    short_answer: "It is a pawn advance or exchange designed to open lines toward the enemy king.",
    answer: "The break can expose the king or remove its pawn shelter.",
    example: "A g-pawn advance may open a file against a castled king.",
    related: ["POSITION-010", "TACTIC-049", "MATE-057"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-059",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "What is an attack by pawn sacrifice?",
    level: "Intermediate",
    keywords: ["pawn sacrifice", "attack", "king"],
    questions: [
      "Why sacrifice a pawn in a king attack?",
      "How can a pawn sacrifice weaken king shelter?"
    ],
    short_answer: "A pawn sacrifice can open a file, remove a defender, or destroy the king's shelter.",
    answer: "The material loss is justified only if the resulting activity provides sufficient compensation.",
    example: "A pawn sacrifice on the kingside may open a rook's file toward the king.",
    related: ["TACTIC-050", "MATE-057", "MATE-058"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-060",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Attacking Principles",
    title: "Why are checks often the final step?",
    level: "Beginner",
    keywords: ["checks", "mating attack", "checkmate"],
    questions: [
      "Why are checks important at the end of an attack?",
      "Why does the final move often give check?"
    ],
    short_answer: "Check forces the king to respond and can finish a mating sequence.",
    answer: "Once escape squares are controlled, a single forcing check can become checkmate.",
    example: "After removing the last defender, Qh7# may finish the attack.",
    related: ["TACTIC-003", "MATE-001", "MATE-018"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-061",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Calculation",
    title: "How do you calculate a mating attack?",
    level: "Intermediate",
    keywords: ["mating calculation", "attack", "calculation"],
    questions: [
      "How should I calculate a mating attack?",
      "What should I calculate before sacrificing near the king?"
    ],
    short_answer: "Start with forcing checks and calculate the king's possible escapes after each move.",
    answer: "Also check whether the opponent can capture your attacking pieces or create counterplay.",
    example: "Before Bxh7+, calculate the king's possible responses and your follow-up checks.",
    related: ["CALC-010", "TACTIC-054", "MATE-025"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-062",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Calculation",
    title: "What should you calculate after a sacrifice?",
    level: "Intermediate",
    keywords: ["sacrifice", "calculation", "king attack"],
    questions: [
      "What should I calculate after sacrificing a piece?",
      "How do I know the attack continues?"
    ],
    short_answer: "Calculate the opponent's king responses and your forcing follow-up moves.",
    answer: "If the attack ends after one sacrifice, the lost material may not be justified.",
    example: "After a bishop sacrifice, calculate every legal king response before committing.",
    related: ["TACTIC-050", "MATE-061", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-063",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "What is a mate in one?",
    level: "Beginner",
    keywords: ["mate in one", "checkmate", "puzzle"],
    questions: [
      "What is mate in one?",
      "How do I find a mate in one?"
    ],
    short_answer: "Mate in one means there is a single move that immediately checkmates the opponent.",
    answer: "Look for checks first and verify that the king has no legal defense.",
    example: "A queen move that checks the king while controlling every escape square is mate in one.",
    related: ["MATE-001", "TACTIC-003", "PUZZLE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-064",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "What is mate in two?",
    level: "Beginner",
    keywords: ["mate in two", "checkmate", "puzzle"],
    questions: [
      "What is mate in two?",
      "How do mate-in-two puzzles work?"
    ],
    short_answer: "Mate in two means you have a move that forces checkmate on your next move regardless of the defense.",
    answer: "The first move is usually a quiet key move that creates an unavoidable mating threat.",
    example: "A move may threaten mate while covering all the opponent's defensive resources.",
    related: ["MATE-009", "TACTIC-056", "PUZZLE-001"],
    source: "Chess puzzle principles",
    verified: true
  },

  {
    id: "MATE-065",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "Why are mating puzzles useful?",
    level: "Beginner",
    keywords: ["mating puzzles", "training", "checkmate"],
    questions: [
      "Why should I solve checkmate puzzles?",
      "How do mate puzzles improve attacking skills?"
    ],
    short_answer: "They improve pattern recognition, calculation, and awareness of escape squares.",
    answer: "Regular practice helps you recognize mating opportunities faster during real games.",
    example: "Solving mate-in-two and mate-in-three positions improves your ability to visualize mating nets.",
    related: ["TRAIN-010", "PUZZLE-001", "MATE-007"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-066",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "What is the most important thing to count in a mating attack?",
    level: "Intermediate",
    keywords: ["escape squares", "mating attack", "king"],
    questions: [
      "What should I count during a king attack?",
      "Why are escape squares important?"
    ],
    short_answer: "Count the king's escape squares and identify which attacking pieces control them.",
    answer: "A mating attack succeeds when the king's legal options disappear.",
    example: "If every escape square is covered, one accurate check may finish the game.",
    related: ["MATE-018", "MATE-055", "TACTIC-057"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-067",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "Why should you not rush a mating attack?",
    level: "Intermediate",
    keywords: ["mating attack", "patience", "calculation"],
    questions: [
      "Why shouldn't I rush a king attack?",
      "Can attacking too quickly backfire?"
    ],
    short_answer: "A premature attack can leave your pieces unsupported and your own king vulnerable.",
    answer: "Build the attack carefully and calculate whether the opponent has defensive resources.",
    example: "Do not sacrifice a piece merely because the king looks exposed; first verify the continuation.",
    related: ["MATE-053", "TACTIC-051", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-068",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Practical Mating",
    title: "What is the defender's best weapon against a mating attack?",
    level: "Intermediate",
    keywords: ["defense", "mating attack", "queen trade"],
    questions: [
      "What is the best defense against a mating attack?",
      "How can a defender survive a king attack?"
    ],
    short_answer: "Eliminate attacking pieces, create escape squares, trade queens, or generate counterplay.",
    answer: "The defender should seek forcing solutions rather than passive waiting.",
    example: "A queen trade can completely remove the opponent's main attacking force.",
    related: ["MATE-038", "MATE-040", "TACTIC-067"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-069",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Training",
    title: "How should beginners learn checkmates?",
    level: "Beginner",
    keywords: ["checkmate training", "beginner", "mating patterns"],
    questions: [
      "How should beginners study checkmate?",
      "Which checkmates should I learn first?"
    ],
    short_answer: "Start with basic mating patterns and simple king-and-piece checkmates.",
    answer: "Learn back-rank mate, basic queen mate, rook mate, smothered mate, and common mating nets.",
    example: "Practice queen-and-king mate until you can execute it confidently.",
    related: ["MATE-013", "MATE-016", "MATE-047"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "MATE-070",
    type: "CHECKMATE",
    category: "Checkmate",
    topic: "Checkmates & Attacking Patterns",
    subtopic: "Final Principles",
    title: "What is the golden rule of attacking?",
    level: "Beginner",
    keywords: ["attack", "checkmate", "king"],
    questions: [
      "What is the golden rule of king attacks?",
      "What should I remember when attacking the king?"
    ],
    short_answer: "Bring enough pieces, control escape squares, and calculate forcing moves before sacrificing.",
    answer: "A strong attack is based on coordination and concrete calculation, not simply moving pieces toward the king.",
    example: "Before sacrificing near the king, make sure your pieces control the escape squares and your follow-up checks work.",
    related: ["MATE-020", "MATE-061", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  }
];

export default checkmatesAttackingPatterns;