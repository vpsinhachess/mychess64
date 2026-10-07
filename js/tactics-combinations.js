const tacticsCombinations = [
  {
    id: "TACTIC-001",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is a chess tactic?",
    level: "Beginner",
    keywords: ["tactics", "chess tactic", "calculation"],
    questions: [
      "What is a chess tactic?",
      "Why are tactics important in chess?"
    ],
    short_answer: "A tactic is a short sequence that gains a concrete advantage through calculation.",
    answer: "Tactics often win material, deliver checkmate, or create another immediate advantage.",
    example: "A knight fork can attack the king and queen at the same time.",
    related: ["CALC-001", "MATE-001", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-002",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is a chess combination?",
    level: "Intermediate",
    keywords: ["combination", "tactics", "sacrifice"],
    questions: [
      "What is a chess combination?",
      "How is a combination different from a tactic?"
    ],
    short_answer: "A combination is a calculated sequence of moves, often involving several tactical ideas.",
    answer: "Combinations may include sacrifices, forcing moves, and multiple tactical motifs working together.",
    example: "A sacrifice may open a file, force the king away, and then allow a decisive fork.",
    related: ["TACTIC-001", "CALC-010", "ATTACK-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-003",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What are forcing moves?",
    level: "Beginner",
    keywords: ["forcing moves", "checks", "captures", "threats"],
    questions: [
      "What are forcing moves in chess?",
      "Which moves are usually most forcing?"
    ],
    short_answer: "Checks, captures, and direct threats are the main forcing moves.",
    answer: "They restrict the opponent's choices and therefore deserve priority during calculation.",
    example: "After giving check, the opponent must respond to the check before pursuing another plan.",
    related: ["CALC-010", "THINK-010", "TACTIC-062"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-004",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "Why are checks important in tactics?",
    level: "Beginner",
    keywords: ["checks", "forcing moves", "calculation"],
    questions: [
      "Why should I look for checks first?",
      "Why are checks powerful tactical moves?"
    ],
    short_answer: "A check forces the opponent to respond immediately.",
    answer: "Because the defender has limited choices, checks can reveal tactical sequences quickly.",
    example: "A checking move may force the king onto a square where a fork becomes possible.",
    related: ["TACTIC-003", "CALC-010", "MATE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-005",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "Why are captures important in tactics?",
    level: "Beginner",
    keywords: ["captures", "forcing moves", "tactics"],
    questions: [
      "Why should I check captures during calculation?",
      "Why are captures tactical?"
    ],
    short_answer: "Captures can remove defenders, win material, or open lines.",
    answer: "A capture may also create a discovered attack or force the opponent into an unfavorable recapture.",
    example: "Capturing a defender can make a previously protected piece fall.",
    related: ["TACTIC-003", "TACTIC-020", "TACTIC-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-006",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is a tactical motif?",
    level: "Beginner",
    keywords: ["motif", "tactical pattern", "tactics"],
    questions: [
      "What is a tactical motif?",
      "What does tactical pattern mean?"
    ],
    short_answer: "A tactical motif is a recurring pattern used to create a concrete advantage.",
    answer: "Forks, pins, skewers, discovered attacks, and double attacks are common tactical motifs.",
    example: "Recognizing a loose queen and rook on the same knight's attack may suggest a fork.",
    related: ["TACTIC-010", "TACTIC-020", "TACTIC-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-007",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is tactical vision?",
    level: "Beginner",
    keywords: ["tactical vision", "patterns", "calculation"],
    questions: [
      "What is tactical vision?",
      "How do players improve tactical vision?"
    ],
    short_answer: "Tactical vision is the ability to quickly recognize tactical possibilities in a position.",
    answer: "It improves through solving puzzles, calculating variations, and studying recurring patterns.",
    example: "After seeing many forks, you begin noticing possible fork squares automatically.",
    related: ["TRAIN-010", "PUZZLE-001", "TACTIC-006"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-008",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is a tactical opportunity?",
    level: "Beginner",
    keywords: ["tactical opportunity", "tactics", "weakness"],
    questions: [
      "What is a tactical opportunity?",
      "When does a tactical chance appear?"
    ],
    short_answer: "It appears when the position contains a concrete weakness that can be exploited immediately.",
    answer: "Loose pieces, exposed kings, overloaded defenders, and weak back ranks often create opportunities.",
    example: "An undefended rook may become the target of a tactical sequence.",
    related: ["TACTIC-006", "TACTIC-030", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-009",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fundamentals",
    title: "What is a tactical mistake?",
    level: "Beginner",
    keywords: ["tactical mistake", "blunder", "tactics"],
    questions: [
      "What is a tactical mistake?",
      "How does a tactical blunder happen?"
    ],
    short_answer: "A tactical mistake overlooks a concrete move or sequence that changes the position significantly.",
    answer: "The mistake may lose material, allow checkmate, or give the opponent a decisive advantage.",
    example: "Moving a pinned defender can allow a rook to capture the queen behind it.",
    related: ["MISTAKE-001", "TACTIC-020", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-010",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "What is a fork?",
    level: "Beginner",
    keywords: ["fork", "double attack", "knight fork"],
    questions: [
      "What is a fork in chess?",
      "How does a fork win material?"
    ],
    short_answer: "A fork attacks two or more targets with one piece.",
    answer: "The opponent often cannot save all attacked pieces at once.",
    example: "A knight can fork the king and queen.",
    related: ["TACTIC-011", "TACTIC-012", "CALC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-011",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "Why is a knight fork dangerous?",
    level: "Beginner",
    keywords: ["knight fork", "fork", "knight"],
    questions: [
      "Why are knight forks so powerful?",
      "Why is the knight good at forking pieces?"
    ],
    short_answer: "Knights can attack pieces from unusual angles and cannot be blocked.",
    answer: "A knight fork often attacks the king together with a queen or rook.",
    example: "A knight on d6 can attack the king and queen depending on the position.",
    related: ["TACTIC-010", "MOVE-025", "CALC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-012",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "What is a double attack?",
    level: "Beginner",
    keywords: ["double attack", "fork", "tactics"],
    questions: [
      "What is a double attack?",
      "Is every double attack a fork?"
    ],
    short_answer: "A double attack creates two threats with one move.",
    answer: "A fork is one type of double attack, but double attacks can also be created by queens, rooks, bishops, or pawns.",
    example: "A queen can give check while attacking a rook.",
    related: ["TACTIC-010", "TACTIC-013", "TACTIC-014"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-013",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "Can a pawn make a fork?",
    level: "Beginner",
    keywords: ["pawn fork", "fork", "pawn"],
    questions: [
      "Can pawns create forks?",
      "What is a pawn fork?"
    ],
    short_answer: "Yes. A pawn can attack two pieces simultaneously.",
    answer: "Pawn forks are especially powerful because the attacked pieces may have limited escape squares.",
    example: "A pawn advancing to attack two enemy pieces can win material.",
    related: ["MOVE-030", "TACTIC-010", "TACTIC-012"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-014",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "Can a king create a double attack?",
    level: "Intermediate",
    keywords: ["king", "double attack", "endgame"],
    questions: [
      "Can the king attack two pieces at once?",
      "Can king moves create tactics?"
    ],
    short_answer: "Yes. In endgames, the king can sometimes attack or support multiple targets.",
    answer: "King tactics are more common when fewer pieces remain and the king becomes an active piece.",
    example: "A king move may attack a pawn while supporting the capture of another pawn.",
    related: ["END-001", "TACTIC-012", "POSITION-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-015",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Double Attack",
    title: "What is a discovered double attack?",
    level: "Intermediate",
    keywords: ["discovered attack", "double attack", "tactics"],
    questions: [
      "What is a discovered double attack?",
      "How can one move create two attacks?"
    ],
    short_answer: "A discovered double attack occurs when moving one piece reveals another attack while the moved piece creates a second threat.",
    answer: "The two attacks may be directed at the king, queen, rook, or another valuable target.",
    example: "A knight moves with check while uncovering a rook attack on the queen.",
    related: ["TACTIC-030", "TACTIC-012", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-016",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pins",
    title: "What is a pin?",
    level: "Beginner",
    keywords: ["pin", "tactics", "king"],
    questions: [
      "What is a pin in chess?",
      "How does a pin work?"
    ],
    short_answer: "A pin occurs when moving a piece would expose a more valuable piece or the king to attack.",
    answer: "A piece pinned to the king cannot legally move if that would expose the king to check.",
    example: "A knight between a rook and king can be pinned to the king.",
    related: ["TACTIC-017", "TACTIC-018", "RULE-015"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-017",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pins",
    title: "What is an absolute pin?",
    level: "Beginner",
    keywords: ["absolute pin", "pin", "king"],
    questions: [
      "What is an absolute pin?",
      "Can an absolutely pinned piece move?"
    ],
    short_answer: "An absolute pin occurs when moving the pinned piece would expose the king to check.",
    answer: "Such a move is illegal under chess rules.",
    example: "A knight shielding its king from a rook cannot move away if the rook would then check the king.",
    related: ["TACTIC-016", "RULE-015", "MOVE-010"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "TACTIC-018",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pins",
    title: "What is a relative pin?",
    level: "Intermediate",
    keywords: ["relative pin", "pin", "piece"],
    questions: [
      "What is a relative pin?",
      "How is a relative pin different from an absolute pin?"
    ],
    short_answer: "A relative pin occurs when moving a piece exposes a valuable piece rather than the king.",
    answer: "The pinned piece is legally allowed to move, but doing so may lose material.",
    example: "A knight protecting a queen can be relatively pinned to that queen.",
    related: ["TACTIC-016", "TACTIC-017", "TACTIC-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-019",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pins",
    title: "How do you exploit a pin?",
    level: "Intermediate",
    keywords: ["pin", "exploitation", "tactics"],
    questions: [
      "How can I use a pin to win material?",
      "What should I do after creating a pin?"
    ],
    short_answer: "Attack the pinned piece or increase pressure against the valuable piece behind it.",
    answer: "A pin becomes powerful when additional attackers make the pinned piece impossible to defend.",
    example: "A pinned knight may be attacked by a pawn or bishop until it can no longer hold the position.",
    related: ["TACTIC-016", "TACTIC-020", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-020",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Skewers",
    title: "What is a skewer?",
    level: "Beginner",
    keywords: ["skewer", "tactics", "line attack"],
    questions: [
      "What is a skewer in chess?",
      "How does a skewer win material?"
    ],
    short_answer: "A skewer attacks a valuable piece first, forcing it to move and exposing a less valuable piece behind it.",
    answer: "Skewers commonly use bishops, rooks, or queens on open lines.",
    example: "A bishop checks the king and then captures a rook behind it.",
    related: ["TACTIC-021", "TACTIC-016", "TACTIC-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-021",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Skewers",
    title: "What is the difference between a pin and a skewer?",
    level: "Intermediate",
    keywords: ["pin", "skewer", "comparison"],
    questions: [
      "How is a pin different from a skewer?",
      "What is the key difference between pins and skewers?"
    ],
    short_answer: "A pin attacks the less valuable piece first, while a skewer attacks the more valuable piece first.",
    answer: "In a skewer, the valuable front piece moves and exposes the target behind it.",
    example: "King in front and rook behind is a classic skewer arrangement.",
    related: ["TACTIC-016", "TACTIC-020", "TACTIC-022"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-022",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Skewers",
    title: "Which pieces are best for skewers?",
    level: "Beginner",
    keywords: ["skewer", "rook", "bishop", "queen"],
    questions: [
      "Which pieces create skewers?",
      "Are skewers usually made by sliding pieces?"
    ],
    short_answer: "Queens, rooks, and bishops are the main skewer pieces.",
    answer: "Their long-range movement allows them to attack two pieces along the same line.",
    example: "A rook can skewer a king and rook on the same file.",
    related: ["TACTIC-020", "MOVE-015", "MOVE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-023",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Discovered Attacks",
    title: "What is a discovered attack?",
    level: "Beginner",
    keywords: ["discovered attack", "tactics", "line"],
    questions: [
      "What is a discovered attack?",
      "How does a discovered attack work?"
    ],
    short_answer: "A discovered attack happens when moving one piece reveals an attack from another piece behind it.",
    answer: "The revealed attack may target a queen, rook, king, or another valuable piece.",
    example: "A knight moves away and reveals a bishop attack on the enemy queen.",
    related: ["TACTIC-024", "TACTIC-025", "TACTIC-015"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-024",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Discovered Attacks",
    title: "What is a discovered check?",
    level: "Beginner",
    keywords: ["discovered check", "check", "tactics"],
    questions: [
      "What is a discovered check?",
      "Why is discovered check powerful?"
    ],
    short_answer: "A discovered check occurs when moving one piece reveals a check from another piece.",
    answer: "The moved piece can then create another threat while the opponent is forced to answer the check.",
    example: "A knight moves with an attack on the queen while uncovering a rook check.",
    related: ["TACTIC-023", "TACTIC-025", "MATE-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-025",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Discovered Attacks",
    title: "What is a double check?",
    level: "Beginner",
    keywords: ["double check", "check", "tactics"],
    questions: [
      "What is double check?",
      "Why is double check so powerful?"
    ],
    short_answer: "Double check means the king is simultaneously checked by two pieces.",
    answer: "The king normally must move because capturing or blocking one attacker does not remove the other check.",
    example: "A discovered check can become double check when the moving piece also gives check.",
    related: ["TACTIC-024", "RULE-015", "MATE-010"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "TACTIC-026",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Discovered Attacks",
    title: "What is a discovered attack on the queen?",
    level: "Beginner",
    keywords: ["discovered attack", "queen", "tactics"],
    questions: [
      "Can a discovered attack win a queen?",
      "How can I use a discovered attack against the queen?"
    ],
    short_answer: "Yes. Move the blocking piece to reveal an attack on the queen while creating another threat.",
    answer: "The opponent may not be able to save the queen and deal with the second threat.",
    example: "A knight moves with check and reveals a rook attacking the queen.",
    related: ["TACTIC-023", "TACTIC-024", "TACTIC-015"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-027",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Deflection",
    title: "What is deflection?",
    level: "Intermediate",
    keywords: ["deflection", "tactics", "defender"],
    questions: [
      "What is deflection in chess?",
      "How does a deflection tactic work?"
    ],
    short_answer: "Deflection forces a defending piece away from an important square or target.",
    answer: "Once the defender is removed, another tactical idea becomes possible.",
    example: "A sacrifice can force a queen away from defending a rook.",
    related: ["TACTIC-028", "TACTIC-040", "TACTIC-050"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-028",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Deflection",
    title: "What is a deflection sacrifice?",
    level: "Intermediate",
    keywords: ["deflection", "sacrifice", "tactics"],
    questions: [
      "What is a deflection sacrifice?",
      "Why sacrifice a piece to deflect a defender?"
    ],
    short_answer: "The sacrifice forces a defending piece to move so that another target becomes vulnerable.",
    answer: "The sacrificed material is justified by the resulting tactical gain.",
    example: "A rook sacrifice can force the queen away from defending a back-rank mate.",
    related: ["TACTIC-027", "TACTIC-050", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-029",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Attraction",
    title: "What is attraction in chess tactics?",
    level: "Intermediate",
    keywords: ["attraction", "tactics", "king"],
    questions: [
      "What is attraction in chess?",
      "How does an attraction tactic work?"
    ],
    short_answer: "Attraction deliberately lures a piece or king onto a vulnerable square.",
    answer: "The opponent is forced or tempted onto the square where another tactical idea becomes possible.",
    example: "A sacrifice may attract the king onto a square where a fork or discovered attack follows.",
    related: ["TACTIC-030", "TACTIC-050", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-030",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Removal of Defender",
    title: "What is removal of the defender?",
    level: "Beginner",
    keywords: ["removal of defender", "defender", "tactics"],
    questions: [
      "What is removal of the defender?",
      "How does removing a defender create a tactic?"
    ],
    short_answer: "It means eliminating a piece that protects an important target.",
    answer: "The defender can be captured, exchanged, distracted, or forced away.",
    example: "Capture the only defender of a queen before taking the queen.",
    related: ["TACTIC-031", "TACTIC-027", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-031",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Removal of Defender",
    title: "How do you remove a defender?",
    level: "Intermediate",
    keywords: ["remove defender", "capture", "tactics"],
    questions: [
      "How can I remove a defender?",
      "What methods remove a defending piece?"
    ],
    short_answer: "You can capture it, exchange it, deflect it, or force it to another square.",
    answer: "The best method depends on the position and the value of the target.",
    example: "Exchange the defending bishop before attacking the rook it protects.",
    related: ["TACTIC-030", "TACTIC-027", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-032",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Overloading",
    title: "What is an overloaded piece?",
    level: "Beginner",
    keywords: ["overloaded piece", "overloading", "defense"],
    questions: [
      "What is an overloaded piece?",
      "How can an overloaded defender be exploited?"
    ],
    short_answer: "An overloaded piece has too many defensive responsibilities.",
    answer: "If one responsibility is challenged, the piece may not be able to maintain all its duties.",
    example: "A queen defending both a rook and a mating square may be overloaded.",
    related: ["TACTIC-033", "TACTIC-030", "LOGIC-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-033",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Overloading",
    title: "How do you exploit an overloaded piece?",
    level: "Intermediate",
    keywords: ["overloaded defender", "tactics", "defense"],
    questions: [
      "How can I exploit an overloaded defender?",
      "What should I look for when a piece defends two things?"
    ],
    short_answer: "Create a threat that forces the defender to abandon one of its duties.",
    answer: "Once one target becomes undefended, you can capture it or create another decisive threat.",
    example: "Attack one target while threatening the other at the same time.",
    related: ["TACTIC-032", "TACTIC-012", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-034",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Interference",
    title: "What is interference?",
    level: "Intermediate",
    keywords: ["interference", "line", "tactics"],
    questions: [
      "What is interference in chess?",
      "How does an interference tactic work?"
    ],
    short_answer: "Interference blocks a line between a defending piece and the piece or square it protects.",
    answer: "The blocking move interrupts communication between two enemy pieces.",
    example: "A piece moves onto a square between a rook and its defending queen.",
    related: ["TACTIC-035", "TACTIC-040", "TACTIC-023"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-035",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Interference",
    title: "Why is interference useful?",
    level: "Intermediate",
    keywords: ["interference", "defense", "tactics"],
    questions: [
      "Why is interference a useful tactic?",
      "What does interference attack?"
    ],
    short_answer: "It breaks the connection between an attacker and its defender.",
    answer: "This can make a protected piece suddenly vulnerable.",
    example: "Blocking a rook's line to its queen can allow the queen to be attacked or captured.",
    related: ["TACTIC-034", "TACTIC-030", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-036",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "X-Ray",
    title: "What is an x-ray attack?",
    level: "Intermediate",
    keywords: ["x-ray", "attack", "line"],
    questions: [
      "What is an x-ray attack?",
      "How does an x-ray work in chess?"
    ],
    short_answer: "An x-ray attack occurs when a piece attacks through another piece along a line.",
    answer: "The front piece may be pinned, attacked, or removed to reveal the attack behind it.",
    example: "A rook attacks an enemy rook through a pawn that may eventually move.",
    related: ["TACTIC-016", "TACTIC-023", "TACTIC-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-037",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Zwischenzug",
    title: "What is an zwischenzug?",
    level: "Intermediate",
    keywords: ["zwischenzug", "intermediate move", "tactics"],
    questions: [
      "What is a zwischenzug?",
      "What is an intermediate move in chess?"
    ],
    short_answer: "A zwischenzug is a strong intermediate move played before an expected recapture.",
    answer: "The intermediate move changes the tactical situation before the obvious capture is made.",
    example: "Instead of immediately recapturing a piece, give a check first and win additional material.",
    related: ["TACTIC-038", "CALC-010", "TACTIC-003"],
    source: "Established chess terminology",
    verified: true
  },

  {
    id: "TACTIC-038",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Zwischenzug",
    title: "Why is zwischenzug difficult to see?",
    level: "Intermediate",
    keywords: ["zwischenzug", "calculation", "tactics"],
    questions: [
      "Why do players miss zwischenzug?",
      "How can I find intermediate moves?"
    ],
    short_answer: "Players often assume the obvious recapture must be played immediately.",
    answer: "After every tactical exchange, ask whether you have a stronger check, capture, or threat first.",
    example: "Before recapturing a queen, check whether an intermediate check wins another piece.",
    related: ["TACTIC-037", "THINK-010", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-039",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Desperado",
    title: "What is a desperado tactic?",
    level: "Intermediate",
    keywords: ["desperado", "tactics", "exchange"],
    questions: [
      "What is a desperado in chess?",
      "What does a desperado tactic mean?"
    ],
    short_answer: "A desperado is a piece that is about to be lost but creates as much damage as possible first.",
    answer: "The piece may capture material or give checks before being taken.",
    example: "A trapped bishop captures a pawn with check before the opponent can take it.",
    related: ["TACTIC-040", "TACTIC-037", "THINK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-040",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Loose Pieces",
    title: "What is a loose piece?",
    level: "Beginner",
    keywords: ["loose piece", "undefended piece", "tactics"],
    questions: [
      "What is a loose piece?",
      "Why are loose pieces dangerous?"
    ],
    short_answer: "A loose piece is undefended or insufficiently defended and can often become a tactical target.",
    answer: "Loose pieces are common targets for forks, discovered attacks, and double attacks.",
    example: "An undefended rook may be attacked by a knight fork.",
    related: ["TACTIC-041", "TACTIC-010", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-041",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Loose Pieces",
    title: "What does loose pieces drop off mean?",
    level: "Beginner",
    keywords: ["loose pieces", "undefended", "tactics"],
    questions: [
      "What does loose pieces drop off mean?",
      "Why should I check undefended pieces?"
    ],
    short_answer: "It means undefended pieces are likely to become tactical targets.",
    answer: "A common tactical rule is to look for loose pieces before calculating complicated combinations.",
    example: "If your opponent leaves a bishop undefended, check whether you can attack it immediately.",
    related: ["TACTIC-040", "THINK-010", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-042",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Back Rank",
    title: "What is a back-rank tactic?",
    level: "Beginner",
    keywords: ["back rank", "rook", "checkmate"],
    questions: [
      "What is a back-rank tactic?",
      "Why is the back rank weak?"
    ],
    short_answer: "A back-rank tactic exploits a king restricted by its own pieces and pawns.",
    answer: "A rook or queen can often deliver checkmate when the king has no escape square.",
    example: "A rook entering the back rank can mate a king trapped behind its own pawns.",
    related: ["MATE-030", "ATTACK-010", "TACTIC-050"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-043",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Back Rank",
    title: "How do you defend against back-rank tactics?",
    level: "Beginner",
    keywords: ["back rank", "defense", "king safety"],
    questions: [
      "How can I avoid back-rank problems?",
      "How do I defend my back rank?"
    ],
    short_answer: "Create an escape square or keep enough defensive control around the king.",
    answer: "A luft square can prevent some back-rank mating ideas, but it must be created carefully.",
    example: "A pawn move such as h3 may give the king an escape square when appropriate.",
    related: ["TACTIC-042", "ATTACK-010", "MATE-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-044",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Trapped Pieces",
    title: "What is a trapped piece?",
    level: "Beginner",
    keywords: ["trapped piece", "piece trap", "tactics"],
    questions: [
      "What is a trapped piece?",
      "How can a piece become trapped?"
    ],
    short_answer: "A piece is trapped when it has no safe escape from attack.",
    answer: "Trapped pieces are often caught by pawns or restricted by the edge of the board.",
    example: "A bishop surrounded by enemy pawns may have no safe square.",
    related: ["TACTIC-045", "TRAP-038", "MOVE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-045",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Trapped Pieces",
    title: "How do you trap a piece?",
    level: "Intermediate",
    keywords: ["trap piece", "pawns", "tactics"],
    questions: [
      "How can I trap an enemy piece?",
      "What is the best way to trap a bishop or queen?"
    ],
    short_answer: "Restrict its escape squares while attacking it repeatedly.",
    answer: "Pawn chains are especially effective at taking away squares from bishops and knights.",
    example: "Advancing pawns can gradually remove all safe squares from an enemy bishop.",
    related: ["TACTIC-044", "TRAP-038", "TACTIC-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-046",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Clearance",
    title: "What is a clearance tactic?",
    level: "Intermediate",
    keywords: ["clearance", "tactics", "line"],
    questions: [
      "What is a clearance tactic?",
      "How does clearance work?"
    ],
    short_answer: "Clearance moves a piece away to free a line, square, or piece for another tactical purpose.",
    answer: "The moving piece may itself create a threat while opening the required line.",
    example: "A bishop moves away so a rook can use an open file to attack the king.",
    related: ["TACTIC-023", "TACTIC-047", "TACTIC-050"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-047",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Clearance",
    title: "What is a clearance sacrifice?",
    level: "Advanced",
    keywords: ["clearance sacrifice", "sacrifice", "tactics"],
    questions: [
      "What is a clearance sacrifice?",
      "Why sacrifice a piece to clear a line?"
    ],
    short_answer: "It sacrifices a piece to remove an obstruction and activate another piece.",
    answer: "The sacrifice is justified when the opened line creates a decisive attack or material gain.",
    example: "A piece sacrifices itself on a square so a rook can enter the seventh rank.",
    related: ["TACTIC-046", "TACTIC-050", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-048",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Line Opening",
    title: "What is an opening of a line tactic?",
    level: "Beginner",
    keywords: ["open line", "diagonal", "file", "tactics"],
    questions: [
      "How can opening a line create a tactic?",
      "Why are open files and diagonals important tactically?"
    ],
    short_answer: "Removing a pawn or piece can activate a rook, bishop, or queen against a target.",
    answer: "Many combinations begin by opening a file, rank, or diagonal.",
    example: "A pawn capture opens a bishop's diagonal toward the enemy king.",
    related: ["TACTIC-023", "TACTIC-046", "ATTACK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-049",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pawn Tactics",
    title: "What is a pawn break tactic?",
    level: "Intermediate",
    keywords: ["pawn break", "tactics", "pawn"],
    questions: [
      "Can a pawn break be tactical?",
      "How can pawn moves create combinations?"
    ],
    short_answer: "A pawn break can open lines, attack pieces, or expose the king.",
    answer: "Pawn moves are especially powerful because they cannot move backward and can permanently change the structure.",
    example: "A central pawn break can open a diagonal for a bishop and a file for a rook.",
    related: ["OPENING-035", "POSITION-010", "TACTIC-048"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-050",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a tactical sacrifice?",
    level: "Intermediate",
    keywords: ["sacrifice", "tactics", "combination"],
    questions: [
      "What is a tactical sacrifice?",
      "Why would a player give up material?"
    ],
    short_answer: "A tactical sacrifice gives material in return for a concrete tactical advantage.",
    answer: "The compensation may be checkmate, material recovery, a winning attack, or a decisive positional result.",
    example: "A rook may be sacrificed to remove the king's defender before delivering mate.",
    related: ["TACTIC-051", "TACTIC-028", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-051",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a sound sacrifice?",
    level: "Intermediate",
    keywords: ["sound sacrifice", "sacrifice", "calculation"],
    questions: [
      "What makes a sacrifice sound?",
      "How do I know if a sacrifice works?"
    ],
    short_answer: "A sacrifice is sound when accurate calculation shows sufficient concrete compensation.",
    answer: "The compensation should be based on something real, such as forced mate, material recovery, or a strong tactical sequence.",
    example: "A queen sacrifice is sound if it forces checkmate.",
    related: ["TACTIC-050", "CALC-010", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-052",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a speculative sacrifice?",
    level: "Advanced",
    keywords: ["speculative sacrifice", "sacrifice", "attack"],
    questions: [
      "What is a speculative sacrifice?",
      "How is a speculative sacrifice different from a tactical sacrifice?"
    ],
    short_answer: "A speculative sacrifice gives material for compensation that may be difficult to calculate exactly.",
    answer: "The compensation may include initiative, attacking chances, or long-term positional benefits.",
    example: "A player may sacrifice a pawn for rapid development without a forced tactical win.",
    related: ["TACTIC-050", "ATTACK-001", "THEORY-070"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-053",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a queen sacrifice?",
    level: "Intermediate",
    keywords: ["queen sacrifice", "sacrifice", "checkmate"],
    questions: [
      "What is a queen sacrifice?",
      "Why would anyone sacrifice the queen?"
    ],
    short_answer: "A queen sacrifice gives up the queen to obtain a decisive tactical result.",
    answer: "The usual compensation is checkmate, major material gain, or a forced winning sequence.",
    example: "The queen may be sacrificed to remove the king's defender before a mating attack.",
    related: ["TACTIC-050", "MATE-020", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-054",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a Greek Gift sacrifice?",
    level: "Advanced",
    keywords: ["Greek Gift", "Bxh7", "king attack"],
    questions: [
      "What is the Greek Gift sacrifice?",
      "What does Bxh7 mean in the Greek Gift attack?"
    ],
    short_answer: "The Greek Gift is a classic bishop sacrifice on h7 or h2 intended to expose the king.",
    answer: "It commonly appears in certain closed center structures and requires accurate calculation.",
    example: "Bxh7+ may be followed by Ng5, Qh5, or other attacking moves depending on the position.",
    related: ["ATTACK-020", "MATE-020", "TACTIC-050"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "TACTIC-055",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Sacrifices",
    title: "What is a clearance sacrifice in an attack?",
    level: "Advanced",
    keywords: ["clearance", "sacrifice", "attack"],
    questions: [
      "How does a clearance sacrifice help an attack?",
      "Why sacrifice a piece to open a file?"
    ],
    short_answer: "It removes an obstruction so another attacking piece can use the opened line.",
    answer: "The sacrifice is often tactical because the newly opened line creates an immediate threat.",
    example: "A rook sacrifice may clear a file for the queen to deliver mate.",
    related: ["TACTIC-046", "TACTIC-047", "ATTACK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-056",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Mate Tactics",
    title: "What is a mating combination?",
    level: "Intermediate",
    keywords: ["mating combination", "checkmate", "attack"],
    questions: [
      "What is a mating combination?",
      "How do tactics create checkmate?"
    ],
    short_answer: "A mating combination uses forcing moves to remove the king's escape options and deliver checkmate.",
    answer: "It may involve sacrifices, deflection, discovered attacks, or removal of defenders.",
    example: "A sacrifice attracts the king and a follow-up queen check delivers mate.",
    related: ["MATE-001", "MATE-020", "TACTIC-050"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-057",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Mating Nets",
    title: "What is a mating net?",
    level: "Intermediate",
    keywords: ["mating net", "king", "checkmate"],
    questions: [
      "What is a mating net?",
      "How does a mating net work?"
    ],
    short_answer: "A mating net is a group of threats that restrict the king until checkmate becomes unavoidable.",
    answer: "The king may have few escape squares because of enemy pieces and its own pieces.",
    example: "A queen and bishop can coordinate to cover all escape squares around the king.",
    related: ["MATE-020", "ATTACK-010", "TACTIC-056"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-058",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "King Safety",
    title: "Why is an exposed king a tactical weakness?",
    level: "Beginner",
    keywords: ["king safety", "exposed king", "tactics"],
    questions: [
      "Why is an exposed king vulnerable to tactics?",
      "How does king exposure create combinations?"
    ],
    short_answer: "An exposed king gives the attacker forcing checks and fewer safe squares.",
    answer: "Checks become stronger when the king has limited shelter or defenders.",
    example: "Opening the center while the opponent's king is uncastled can create immediate tactical chances.",
    related: ["ATTACK-001", "MATE-001", "TACTIC-056"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-059",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "King Safety",
    title: "What is a mating attack?",
    level: "Intermediate",
    keywords: ["mating attack", "king attack", "checkmate"],
    questions: [
      "What is a mating attack?",
      "How is a mating attack different from a normal attack?"
    ],
    short_answer: "A mating attack is an attack focused on creating checkmate or a decisive threat against the king.",
    answer: "The attacker usually brings several pieces toward the king and controls escape squares.",
    example: "Queen, bishop, and knight can combine around a weakened king.",
    related: ["MATE-020", "ATTACK-020", "TACTIC-057"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-060",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Piece Coordination",
    title: "Why is piece coordination important for tactics?",
    level: "Beginner",
    keywords: ["coordination", "pieces", "tactics"],
    questions: [
      "Why do tactics often require several pieces?",
      "How does coordination create combinations?"
    ],
    short_answer: "Coordinated pieces can attack the same weakness and support tactical sequences.",
    answer: "One piece may give check while another controls the escape square or captures a defender.",
    example: "A rook checks while a bishop controls the king's escape route.",
    related: ["ATTACK-010", "TACTIC-056", "MIDDLE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-061",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "What should you calculate first?",
    level: "Beginner",
    keywords: ["calculation", "checks", "captures"],
    questions: [
      "What should I calculate first in a tactical position?",
      "What is the best tactical calculation order?"
    ],
    short_answer: "Start with forcing checks, captures, and threats.",
    answer: "These moves restrict the opponent's choices and make calculation more efficient.",
    example: "Before making a quiet move, check whether you have a forcing check or winning capture.",
    related: ["CALC-010", "TACTIC-003", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-062",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "What is the checks-captures-threats method?",
    level: "Beginner",
    keywords: ["checks captures threats", "calculation", "tactics"],
    questions: [
      "What is the checks-captures-threats method?",
      "How can this method help me find tactics?"
    ],
    short_answer: "It is a practical method for searching forcing moves before considering quieter moves.",
    answer: "First examine checks, then captures, then direct threats for both sides.",
    example: "After your opponent moves, quickly check whether they created a check, capture, or threat.",
    related: ["TACTIC-003", "CALC-010", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-063",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "What is a forcing sequence?",
    level: "Intermediate",
    keywords: ["forcing sequence", "calculation", "tactics"],
    questions: [
      "What is a forcing sequence?",
      "Why are forcing sequences easier to calculate?"
    ],
    short_answer: "A forcing sequence consists of moves that sharply restrict the opponent's responses.",
    answer: "Checks and tactical captures often create forcing sequences.",
    example: "Check, forced king move, and another check can form a forcing sequence.",
    related: ["TACTIC-003", "CALC-010", "MATE-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-064",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "Why do players miss simple tactics?",
    level: "Beginner",
    keywords: ["missed tactics", "blunder", "calculation"],
    questions: [
      "Why do I miss easy tactics?",
      "Why can simple tactics be difficult during games?"
    ],
    short_answer: "Players often calculate their own plan without checking the opponent's forcing resources.",
    answer: "Time pressure, distraction, automatic moves, and poor board scanning can cause missed tactics.",
    example: "You may attack the queen while overlooking that your own queen is hanging.",
    related: ["THINK-001", "MISTAKE-001", "TACTIC-009"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-065",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Defensive Tactics",
    title: "Can tactics be defensive?",
    level: "Beginner",
    keywords: ["defensive tactics", "defense", "tactics"],
    questions: [
      "Can tactics be used for defense?",
      "What are defensive tactical moves?"
    ],
    short_answer: "Yes. Tactics can save material, force exchanges, or eliminate an attack.",
    answer: "A defensive tactic may use a counterattack, check, pin, or tactical exchange.",
    example: "A checking move can force the attacking king away and give your king time to escape.",
    related: ["ATTACK-030", "TACTIC-003", "TACTIC-066"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-066",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Defensive Tactics",
    title: "What is a defensive zwischenzug?",
    level: "Advanced",
    keywords: ["defensive zwischenzug", "intermediate move", "defense"],
    questions: [
      "Can an intermediate move save a position?",
      "How can zwischenzug be defensive?"
    ],
    short_answer: "A defensive intermediate move can create a threat before the opponent completes their combination.",
    answer: "Checks or counterattacks can change the tactical sequence in your favor.",
    example: "Instead of recapturing, give check and force the opponent's king into a less active square.",
    related: ["TACTIC-037", "TACTIC-065", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-067",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Counterplay",
    title: "What is a counterattack tactic?",
    level: "Intermediate",
    keywords: ["counterattack", "tactics", "defense"],
    questions: [
      "What is a tactical counterattack?",
      "Can attacking create defense?"
    ],
    short_answer: "A counterattack creates an immediate threat against the opponent while defending against their threat.",
    answer: "A strong counter-threat can force the opponent to abandon their original attack.",
    example: "When attacked on the kingside, a check against the opponent's king may reverse the initiative.",
    related: ["TACTIC-065", "ATTACK-030", "TACTIC-003"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-068",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Exchange Tactics",
    title: "What is a tactical exchange?",
    level: "Intermediate",
    keywords: ["exchange", "tactics", "trade"],
    questions: [
      "What is a tactical exchange?",
      "When is exchanging a piece a tactical move?"
    ],
    short_answer: "An exchange is tactical when the trade creates a concrete advantage.",
    answer: "The resulting position may win material, eliminate a defender, or create checkmate.",
    example: "Trading your bishop for a knight may remove the only defender of a queen.",
    related: ["TACTIC-030", "TACTIC-040", "TACTIC-069"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-069",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Exchange Tactics",
    title: "What is a tactical exchange sacrifice?",
    level: "Intermediate",
    keywords: ["exchange sacrifice", "rook", "tactics"],
    questions: [
      "What is an exchange sacrifice?",
      "Why would I sacrifice a rook for a minor piece?"
    ],
    short_answer: "An exchange sacrifice gives up a rook for a bishop or knight to obtain concrete compensation.",
    answer: "The compensation may be an attack, pawn structure, initiative, or tactical advantage.",
    example: "A rook may sacrifice on a key square to destroy the king's shelter.",
    related: ["TACTIC-050", "ATTACK-020", "TACTIC-051"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-070",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pawn Tactics",
    title: "What is an en passant tactic?",
    level: "Intermediate",
    keywords: ["en passant", "pawn", "tactics"],
    questions: [
      "Can en passant be a tactical move?",
      "Why can en passant open a line?"
    ],
    short_answer: "Yes. En passant can remove a pawn and unexpectedly open a file or diagonal.",
    answer: "This can expose a rook, bishop, or queen attack.",
    example: "An en passant capture can open a rook's file against the opponent's king.",
    related: ["MOVE-050", "TACTIC-048", "RULE-030"],
    source: "FIDE Laws and chess principles",
    verified: true
  },

  {
    id: "TACTIC-071",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Promotion Tactics",
    title: "Can promotion create a tactic?",
    level: "Beginner",
    keywords: ["promotion", "pawn", "tactics"],
    questions: [
      "Can a pawn promotion be tactical?",
      "How can promotion change a combination?"
    ],
    short_answer: "Yes. Promotion can create a new queen or another piece at a critical moment.",
    answer: "Promotion threats can force the opponent to sacrifice material or give up an attack.",
    example: "A pawn one square from promotion may be more dangerous than a rook because promotion is imminent.",
    related: ["MOVE-040", "END-010", "TACTIC-072"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-072",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Promotion Tactics",
    title: "What is a promotion tactic?",
    level: "Intermediate",
    keywords: ["promotion tactic", "promotion", "pawn"],
    questions: [
      "What is a promotion tactic?",
      "How can promotion threats win material?"
    ],
    short_answer: "A promotion tactic uses the threat of becoming a new piece to force a decisive response.",
    answer: "The opponent may have to sacrifice a piece or give up another tactical objective to stop the pawn.",
    example: "A rook may have to sacrifice itself to stop a protected pawn from queening.",
    related: ["TACTIC-071", "END-010", "MOVE-040"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-073",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fork Patterns",
    title: "What targets make a fork valuable?",
    level: "Beginner",
    keywords: ["fork", "targets", "material"],
    questions: [
      "What makes a fork powerful?",
      "Which pieces are best fork targets?"
    ],
    short_answer: "Forks are most valuable when they attack the king together with a queen or rook.",
    answer: "A fork can also win two minor pieces or important pawns.",
    example: "A knight fork on king and rook often wins the exchange or more.",
    related: ["TACTIC-010", "TACTIC-011", "BASIC-015"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-074",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Fork Patterns",
    title: "How can you prevent a knight fork?",
    level: "Intermediate",
    keywords: ["knight fork", "defense", "tactics"],
    questions: [
      "How do I prevent knight forks?",
      "How can I recognize a fork threat?"
    ],
    short_answer: "Watch for squares from which a knight can attack multiple valuable pieces.",
    answer: "Keep valuable pieces coordinated and avoid placing them on vulnerable fork squares.",
    example: "Do not place your king and queen where a knight can attack both with one move.",
    related: ["TACTIC-010", "TACTIC-073", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-075",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pawn Forks",
    title: "Why are pawn forks powerful?",
    level: "Beginner",
    keywords: ["pawn fork", "fork", "tactics"],
    questions: [
      "Why can pawn forks win pieces?",
      "How should I look for pawn forks?"
    ],
    short_answer: "A pawn can attack two pieces while also advancing toward promotion.",
    answer: "Pawn forks are often easy to miss because players focus more on knight forks.",
    example: "A pawn advance can attack both a bishop and knight simultaneously.",
    related: ["TACTIC-013", "TACTIC-010", "MOVE-030"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-076",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Defensive Patterns",
    title: "What is a zwischenzug defense against a fork?",
    level: "Advanced",
    keywords: ["fork defense", "zwischenzug", "tactics"],
    questions: [
      "Can a zwischenzug stop a fork?",
      "How can I respond tactically to a fork?"
    ],
    short_answer: "An intermediate check or capture may change the position before the fork is completed.",
    answer: "The defender can sometimes create a stronger forcing threat instead of accepting the fork.",
    example: "A checking move may force the king away before the attacking knight can fork.",
    related: ["TACTIC-037", "TACTIC-066", "TACTIC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-077",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pattern Recognition",
    title: "What are the most important tactical motifs?",
    level: "Beginner",
    keywords: ["tactical motifs", "fork", "pin", "skewer"],
    questions: [
      "Which tactical patterns should beginners learn first?",
      "What are the essential chess tactics?"
    ],
    short_answer: "Start with forks, pins, skewers, discovered attacks, double attacks, and removal of defenders.",
    answer: "These patterns occur frequently and form the foundation for more advanced combinations.",
    example: "Learn to recognize a knight fork before studying complicated sacrificial combinations.",
    related: ["TACTIC-010", "TACTIC-016", "TACTIC-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-078",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pattern Recognition",
    title: "Why do tactical patterns repeat?",
    level: "Beginner",
    keywords: ["patterns", "tactics", "recognition"],
    questions: [
      "Why do the same tactical ideas appear in different games?",
      "Why should I study tactical patterns?"
    ],
    short_answer: "Chess positions repeatedly create similar relationships between pieces.",
    answer: "Learning patterns lets you recognize opportunities faster without calculating every possibility from zero.",
    example: "Once you know a back-rank pattern, you can spot it in many different positions.",
    related: ["TACTIC-006", "TACTIC-007", "TRAIN-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-079",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Pattern Recognition",
    title: "What is a tactical pattern library?",
    level: "Intermediate",
    keywords: ["tactical patterns", "training", "puzzles"],
    questions: [
      "What is a tactical pattern library?",
      "How can I build one?"
    ],
    short_answer: "It is a collection of tactical positions organized by recurring motifs.",
    answer: "A pattern library can include forks, pins, mating nets, sacrifices, and other themes.",
    example: "Save ten positions involving removal of defenders and review them regularly.",
    related: ["TRAIN-010", "PUZZLE-001", "TACTIC-077"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-080",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Visualization",
    title: "Why is visualization important for tactics?",
    level: "Intermediate",
    keywords: ["visualization", "calculation", "tactics"],
    questions: [
      "Why do I need visualization for tactics?",
      "How does visualization help calculation?"
    ],
    short_answer: "Visualization lets you calculate future positions without physically moving the pieces.",
    answer: "Strong tactical calculation requires seeing the position after several forcing moves.",
    example: "Calculate a sacrifice and imagine the resulting board before deciding whether it works.",
    related: ["CALC-001", "CALC-010", "TACTIC-050"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-081",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Candidate Moves",
    title: "What is a tactical candidate move?",
    level: "Intermediate",
    keywords: ["candidate move", "calculation", "tactics"],
    questions: [
      "What is a candidate move in tactics?",
      "How many tactical moves should I calculate?"
    ],
    short_answer: "A candidate move is a promising move selected for deeper calculation.",
    answer: "In tactical positions, forcing moves usually deserve priority as candidates.",
    example: "Choose two or three forcing checks or captures and compare their consequences.",
    related: ["CALC-010", "TACTIC-003", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-082",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "How far should I calculate?",
    level: "Intermediate",
    keywords: ["calculation depth", "tactics", "variation"],
    questions: [
      "How many moves should I calculate in a tactic?",
      "How far should tactical calculation go?"
    ],
    short_answer: "Calculate until the tactical consequences become clear and the position stabilizes.",
    answer: "There is no fixed number of moves; forcing positions may require deep calculation while simple tactics may need only a few moves.",
    example: "Calculate a sacrifice until you know whether the king can escape and what material remains.",
    related: ["CALC-010", "CALC-020", "TACTIC-051"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-083",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Calculation",
    title: "What is the stopping point in calculation?",
    level: "Intermediate",
    keywords: ["calculation", "stopping point", "tactics"],
    questions: [
      "When should I stop calculating?",
      "How do I know a tactical variation is finished?"
    ],
    short_answer: "Stop when the forcing sequence ends and you can evaluate the resulting position confidently.",
    answer: "Continuing to calculate meaningless branches wastes time.",
    example: "After winning a queen and reaching a safe position, there may be no need to calculate ten more moves.",
    related: ["CALC-020", "TACTIC-082", "THINK-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-084",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Awareness",
    title: "What is a loose king?",
    level: "Intermediate",
    keywords: ["king", "king safety", "tactics"],
    questions: [
      "What does a loose king mean?",
      "Why is a loose king a tactical target?"
    ],
    short_answer: "A loose king has limited protection or exposed escape squares.",
    answer: "Such a king is more vulnerable to checks, sacrifices, and mating combinations.",
    example: "An uncastled king with weak surrounding pawns can become a tactical target.",
    related: ["ATTACK-001", "TACTIC-058", "MATE-020"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-085",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Targets",
    title: "What are the main tactical targets?",
    level: "Beginner",
    keywords: ["tactical targets", "loose pieces", "king"],
    questions: [
      "What should I look for when searching for tactics?",
      "Which weaknesses create tactical opportunities?"
    ],
    short_answer: "Look for exposed kings, loose pieces, pinned pieces, overloaded defenders, and weak back ranks.",
    answer: "These features often provide the concrete foundation for tactical combinations.",
    example: "A loose queen next to a pinned knight may create an immediate tactical opportunity.",
    related: ["TACTIC-040", "TACTIC-016", "TACTIC-032"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-086",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Targets",
    title: "Why are undefended pieces tactical targets?",
    level: "Beginner",
    keywords: ["undefended piece", "tactical target", "loose piece"],
    questions: [
      "Why are undefended pieces dangerous?",
      "Should I always attack an undefended piece?"
    ],
    short_answer: "Undefended pieces can often be attacked or combined with another tactical threat.",
    answer: "However, attacking them is useful only when the move is safe and improves your position.",
    example: "A queen may be undefended but protected tactically by a check or counterattack.",
    related: ["TACTIC-040", "TACTIC-041", "TACTIC-067"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-087",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Targets",
    title: "What is a tactical weakness?",
    level: "Beginner",
    keywords: ["tactical weakness", "weakness", "tactics"],
    questions: [
      "What is a tactical weakness?",
      "How is a tactical weakness different from a positional weakness?"
    ],
    short_answer: "A tactical weakness can be exploited immediately through a concrete sequence.",
    answer: "A positional weakness may require longer-term pressure instead.",
    example: "An undefended rook is a tactical weakness because it may be attacked immediately.",
    related: ["TACTIC-008", "POSITION-001", "MISTAKE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-088",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Defense",
    title: "What is the best response to a tactical threat?",
    level: "Beginner",
    keywords: ["tactical defense", "threat", "defense"],
    questions: [
      "How should I respond to a tactical threat?",
      "What should I do when I see an opponent's tactic?"
    ],
    short_answer: "Identify the exact threat and find a move that neutralizes it while improving your position if possible.",
    answer: "Do not automatically make a defensive move without checking whether a counterattack exists.",
    example: "Instead of defending a hanging rook passively, a check may force the opponent to abandon the attack.",
    related: ["TACTIC-065", "TACTIC-067", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-089",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Tactical Exchanges",
    title: "When should you exchange pieces tactically?",
    level: "Intermediate",
    keywords: ["exchange", "tactics", "defender"],
    questions: [
      "When is a tactical exchange useful?",
      "Why exchange an attacking piece?"
    ],
    short_answer: "Exchange a piece when doing so removes a defender or eliminates an important threat.",
    answer: "The tactical value of the exchange matters more than the usual material value of the pieces.",
    example: "Trading a bishop for a knight may remove the only defender of a key square.",
    related: ["TACTIC-030", "TACTIC-068", "POSITION-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-090",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Tactics",
    title: "Why do tactics become stronger with tempo?",
    level: "Intermediate",
    keywords: ["tempo", "tactics", "forcing"],
    questions: [
      "Why is a tactical move with tempo powerful?",
      "How does tempo help a combination?"
    ],
    short_answer: "A move with tempo forces the opponent to respond while you improve your position.",
    answer: "Checks and attacks on valuable pieces are especially effective because they combine progress with forcing play.",
    example: "Developing a bishop while attacking the queen gains development and time simultaneously.",
    related: ["OPENING-010", "TACTIC-003", "TACTIC-023"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-091",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Tactics",
    title: "What is a tactical tempo?",
    level: "Intermediate",
    keywords: ["tactical tempo", "tempo", "tactics"],
    questions: [
      "What is a tactical tempo?",
      "How can a tempo create a tactic?"
    ],
    short_answer: "A tactical tempo is a move that forces the opponent to respond while advancing your tactical objective.",
    answer: "Attacking the queen, giving check, or creating a direct threat can gain such a tempo.",
    example: "A bishop develops with an attack on the queen.",
    related: ["TACTIC-090", "OPENING-010", "TACTIC-003"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-092",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Tactics",
    title: "What is a tactical refutation?",
    level: "Intermediate",
    keywords: ["refutation", "tactics", "mistake"],
    questions: [
      "What is a tactical refutation?",
      "How can tactics refute an opponent's move?"
    ],
    short_answer: "A tactical refutation is a concrete sequence showing that a move or plan fails.",
    answer: "The refutation usually wins material, creates mate, or produces another decisive advantage.",
    example: "An apparently strong pawn sacrifice fails because the opponent has a forcing queen check.",
    related: ["MISTAKE-001", "TACTIC-009", "CALC-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-093",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Tactics",
    title: "Can tactics appear in quiet positions?",
    level: "Intermediate",
    keywords: ["quiet position", "tactics", "combination"],
    questions: [
      "Can a quiet chess position contain tactics?",
      "Do tactics only occur in attacking positions?"
    ],
    short_answer: "Yes. Tactical opportunities can appear in completely quiet-looking positions.",
    answer: "A loose piece, pin, overloaded defender, or tactical move may exist even without an active attack.",
    example: "A simple knight fork may win material in an otherwise quiet middlegame.",
    related: ["TACTIC-006", "TACTIC-040", "MIDDLE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-094",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Tactics",
    title: "Can tactics decide a game instantly?",
    level: "Beginner",
    keywords: ["tactics", "checkmate", "blunder"],
    questions: [
      "Can one tactic decide an entire game?",
      "How powerful can a single tactical mistake be?"
    ],
    short_answer: "Yes. A single tactic can lead to checkmate or decisive material loss.",
    answer: "This is why tactical awareness is essential even in strategically good positions.",
    example: "A one-move blunder can lose the queen immediately.",
    related: ["TACTIC-009", "MISTAKE-001", "MATE-001"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-095",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Training",
    title: "How should I train tactics?",
    level: "Beginner",
    keywords: ["tactical training", "puzzles", "practice"],
    questions: [
      "How should I practice chess tactics?",
      "What is the best tactical training method?"
    ],
    short_answer: "Solve tactical positions regularly and calculate before looking at the answer.",
    answer: "Focus on understanding the tactical idea, not merely getting the puzzle correct.",
    example: "Solve ten fork and pin positions without moving the pieces, then review your mistakes.",
    related: ["TRAIN-010", "PUZZLE-001", "TACTIC-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-096",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Training",
    title: "Should tactical puzzles be solved quickly?",
    level: "Intermediate",
    keywords: ["tactical puzzles", "speed", "training"],
    questions: [
      "Should I solve tactics quickly?",
      "Is speed important in tactical training?"
    ],
    short_answer: "Accuracy and understanding should come before speed.",
    answer: "Once patterns become familiar, speed naturally improves.",
    example: "First calculate a fork correctly; later try recognizing the same pattern faster.",
    related: ["TRAIN-010", "TACTIC-007", "TACTIC-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-097",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Training",
    title: "Should I calculate tactics without moving pieces?",
    level: "Intermediate",
    keywords: ["calculation", "visualization", "training"],
    questions: [
      "Should I solve tactics without moving pieces?",
      "Why practice visualization during tactical puzzles?"
    ],
    short_answer: "Yes. Solving without moving pieces improves calculation and visualization.",
    answer: "It trains you to calculate future positions rather than relying on physical trial and error.",
    example: "Look at a puzzle, calculate the complete line mentally, and only then move the pieces.",
    related: ["TACTIC-080", "CALC-001", "TRAIN-010"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-098",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Training",
    title: "Why should I review missed tactics?",
    level: "Beginner",
    keywords: ["review", "missed tactics", "training"],
    questions: [
      "Why should I review tactical mistakes?",
      "How can missed tactics improve my chess?"
    ],
    short_answer: "Reviewing mistakes helps identify recurring calculation and pattern-recognition weaknesses.",
    answer: "The goal is to understand why you missed the tactic and recognize it next time.",
    example: "If you repeatedly miss pins, spend extra training time on pin positions.",
    related: ["TRAIN-020", "MISTAKE-010", "TACTIC-078"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-099",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Practical Play",
    title: "What should I do before making a tactical move?",
    level: "Beginner",
    keywords: ["tactical move", "blunder check", "calculation"],
    questions: [
      "What should I check before playing a tactic?",
      "How do I avoid blundering while attacking?"
    ],
    short_answer: "Verify the opponent's checks, captures, counterattacks, and the safety of your own pieces.",
    answer: "A beautiful combination fails if you overlook a simple defensive resource.",
    example: "Before sacrificing your queen, check whether the opponent can simply capture it without consequences.",
    related: ["THINK-010", "CALC-010", "TACTIC-051"],
    source: "Chess coaching principles",
    verified: true
  },

  {
    id: "TACTIC-100",
    type: "TACTIC",
    category: "Tactics",
    topic: "Tactics & Combinations",
    subtopic: "Final Principles",
    title: "What is the golden rule of chess tactics?",
    level: "Beginner",
    keywords: ["tactics", "golden rule", "calculation"],
    questions: [
      "What is the golden rule of tactics?",
      "What should I remember when looking for tactics?"
    ],
    short_answer: "Look for forcing moves, identify tactical targets, and calculate the opponent's best reply.",
    answer: "Pattern recognition finds the opportunity, but accurate calculation proves whether the tactic works.",
    example: "Spot a possible fork, calculate the opponent's best response, and only then play it.",
    related: ["TACTIC-003", "CALC-010", "THINK-010"],
    source: "Chess coaching principles",
    verified: true
  }
];

export default tacticsCombinations;