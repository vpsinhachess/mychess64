const endgamePrinciples = [

  {
    id: "END-001",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Basics",
    title: "What is an endgame?",
    level: "Beginner",
    keywords: ["endgame", "definition", "chess phases"],
    questions: [
      "What is an endgame in chess?",
      "When does the endgame begin?"
    ],
    short_answer: "The endgame is the phase where fewer pieces remain and king and pawn activity become especially important.",
    answer: "There is no exact move when the endgame begins. It is usually recognized by reduced material and increased importance of kings and pawns.",
    example: "After most queens and minor pieces are exchanged, the game may enter an endgame.",
    related: ["END-002", "END-003"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-002",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Activity",
    title: "Why is the king important in the endgame?",
    level: "Beginner",
    keywords: ["king", "activity", "endgame"],
    questions: [
      "Why should the king become active in the endgame?",
      "Is the king a strong piece in the endgame?"
    ],
    short_answer: "With fewer pieces on the board, the king can safely become an active fighting piece.",
    answer: "The king can attack pawns, defend pieces, occupy important squares and support passed pawns.",
    example: "A centralized king can often win a pawn that a passive king cannot reach.",
    related: ["END-003", "END-004"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-003",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Centralization",
    title: "Centralize the king",
    level: "Beginner",
    keywords: ["king centralization", "king", "center"],
    questions: [
      "Why should I centralize my king in the endgame?",
      "Where should the king usually go in an endgame?"
    ],
    short_answer: "Bring the king toward the center when it is safe.",
    answer: "A centralized king can reach more important squares and influence both sides of the board.",
    example: "A king on e4 can often support play on both the kingside and queenside.",
    related: ["END-002", "END-005"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-004",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Safety",
    title: "Should the king always move forward?",
    level: "Beginner",
    keywords: ["king", "safety", "endgame"],
    questions: [
      "Should I always advance my king in the endgame?",
      "Can an active king become a weakness?"
    ],
    short_answer: "No. King activity is valuable only when the king remains safe from tactical threats.",
    answer: "Before moving the king forward, check whether it can be checked, trapped or exposed to a tactical attack.",
    example: "Do not centralize the king onto a square where an enemy queen can give repeated checks.",
    related: ["END-003", "END-050"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-005",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Opposition",
    title: "What is opposition?",
    level: "Intermediate",
    keywords: ["opposition", "king", "pawn ending"],
    questions: [
      "What does opposition mean in chess?",
      "Why is opposition important?"
    ],
    short_answer: "Opposition is a king-versus-king position where the kings face each other with an odd number of squares between them.",
    answer: "The side not having the move can often use opposition to force the enemy king away from important squares.",
    example: "Kings facing each other on e4 and e6 with e5 between them illustrate direct opposition.",
    related: ["END-006", "END-007"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-006",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Opposition",
    title: "Who benefits from opposition?",
    level: "Intermediate",
    keywords: ["opposition", "zugzwang", "king"],
    questions: [
      "Who has the advantage in opposition?",
      "Why can opposition force the enemy king back?"
    ],
    short_answer: "The player who can give the opponent the move at the right moment may gain the key position.",
    answer: "Opposition often works because moving the king can surrender important squares.",
    example: "In a king-and-pawn ending, opposition can force the defending king away from the promotion path.",
    related: ["END-005", "END-012"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-007",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Position",
    title: "What is distant opposition?",
    level: "Intermediate",
    keywords: ["distant opposition", "opposition", "king"],
    questions: [
      "What is distant opposition?",
      "Is opposition possible when kings are far apart?"
    ],
    short_answer: "Yes. Distant opposition occurs when kings are separated by more than one square but remain aligned appropriately.",
    answer: "The key idea is controlling the move and maintaining a useful relationship between the kings.",
    example: "Two kings several squares apart on the same file can still create an opposition battle.",
    related: ["END-005", "END-008"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-008",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Position",
    title: "What is diagonal opposition?",
    level: "Intermediate",
    keywords: ["diagonal opposition", "king", "endgame"],
    questions: [
      "What is diagonal opposition?",
      "Why can kings use diagonal opposition?"
    ],
    short_answer: "Diagonal opposition is a king relationship that can help control key squares when direct opposition is unavailable.",
    answer: "It is useful in practical king-and-pawn positions where the kings approach important squares from different directions.",
    example: "A king can step diagonally to maintain control of a critical entry square.",
    related: ["END-005", "END-007"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-009",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Passed Pawns",
    title: "What is a passed pawn?",
    level: "Beginner",
    keywords: ["passed pawn", "pawn", "promotion"],
    questions: [
      "What is a passed pawn?",
      "Why is a passed pawn important in the endgame?"
    ],
    short_answer: "A passed pawn has no enemy pawn in front of it or on adjacent files that can stop its advance.",
    answer: "A passed pawn is a major endgame asset because it can advance toward promotion.",
    example: "A white pawn on d5 with no black pawns on c-, d-, or e-files ahead of it can be a passed pawn.",
    related: ["END-010", "END-011"],
    source: "Standard chess terminology",
    verified: true
  },

  {
    id: "END-010",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Passed Pawns",
    title: "Why should you create a passed pawn?",
    level: "Intermediate",
    keywords: ["passed pawn", "pawn majority", "endgame"],
    questions: [
      "Why are passed pawns so powerful?",
      "Should I try to create a passed pawn?"
    ],
    short_answer: "A passed pawn creates a promotion threat and can force the opponent to defend it.",
    answer: "Even when it does not promote, a passed pawn can distract enemy pieces and create winning chances elsewhere.",
    example: "A protected passed pawn may tie an enemy rook to defensive duty.",
    related: ["END-009", "END-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-011",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Passed Pawns",
    title: "Protected passed pawn",
    level: "Intermediate",
    keywords: ["protected passed pawn", "passed pawn", "pawn"],
    questions: [
      "What is a protected passed pawn?",
      "Why is a protected passed pawn strong?"
    ],
    short_answer: "It is a passed pawn protected by another pawn.",
    answer: "The defender often cannot capture it safely, making it difficult to blockade or eliminate.",
    example: "Connected pawns on d5 and e5 can support each other while advancing.",
    related: ["END-009", "END-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-012",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Zugzwang",
    title: "What is zugzwang?",
    level: "Intermediate",
    keywords: ["zugzwang", "tempo", "endgame"],
    questions: [
      "What is zugzwang?",
      "Why is zugzwang important in endgames?"
    ],
    short_answer: "Zugzwang is a position where having to move makes a player's position worse.",
    answer: "Many endgames are decided by forcing the opponent to abandon a useful square or weaken the position.",
    example: "A king forced to move away from a key square may allow the opposing king to advance.",
    related: ["END-005", "END-013"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-013",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Tempo",
    title: "What is a reserve tempo?",
    level: "Intermediate",
    keywords: ["reserve tempo", "tempo", "pawn"],
    questions: [
      "What is a reserve tempo in an endgame?",
      "Why can a spare pawn move be useful?"
    ],
    short_answer: "A reserve tempo is a useful waiting move, often a pawn move kept for the right moment.",
    answer: "A reserve tempo can force the opponent to move first and create zugzwang.",
    example: "Keeping a pawn move available can decide who must give up opposition.",
    related: ["END-012", "END-014"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-014",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King and Pawn",
    title: "What is the rule of the square?",
    level: "Beginner",
    keywords: ["rule of the square", "passed pawn", "king"],
    questions: [
      "What is the rule of the square?",
      "How can the rule of the square help me?"
    ],
    short_answer: "The rule of the square helps determine whether a king can catch a passed pawn without calculating every move.",
    answer: "Imagine a square extending from the pawn toward the promotion rank. If the defending king can enter that square in time, it may catch the pawn.",
    example: "Before chasing a distant pawn, quickly test whether your king can enter its square.",
    related: ["END-009", "END-015"],
    source: "Standard endgame principle",
    verified: true
  },

  {
    id: "END-015",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Key Squares",
    title: "What is a key square?",
    level: "Intermediate",
    keywords: ["key square", "pawn", "king"],
    questions: [
      "What is a key square in a pawn ending?",
      "Why are key squares important?"
    ],
    short_answer: "A key square is a square whose occupation by the attacking king can make pawn promotion possible.",
    answer: "Reaching the right key square can prevent the defending king from stopping the pawn.",
    example: "A king may need to occupy a particular square in front of its pawn before advancing it.",
    related: ["END-003", "END-016"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-016",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Endings",
    title: "Why should the king go in front of the pawn?",
    level: "Intermediate",
    keywords: ["king", "pawn", "promotion"],
    questions: [
      "Should the king usually get in front of its pawn?",
      "Why is the king's position ahead of the pawn important?"
    ],
    short_answer: "In many pawn endings, the king must lead the pawn to control critical squares.",
    answer: "A pawn alone cannot force its way through an enemy king. The king often needs to clear and control the promotion route.",
    example: "A king on the sixth rank can often support a pawn much more effectively than a king behind it.",
    related: ["END-015", "END-017"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-017",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Promotion",
    title: "Always calculate promotion races",
    level: "Intermediate",
    keywords: ["promotion race", "pawn", "calculation"],
    questions: [
      "How should I handle a pawn race?",
      "What should I calculate before pushing a passed pawn?"
    ],
    short_answer: "Count promotion moves and check whether the resulting promotion gives check or creates tactical threats.",
    answer: "A pawn race is not simply about which pawn reaches the eighth rank first. Promotion checks and the resulting piece matter.",
    example: "A pawn that promotes with check can win a race even when it appears one tempo behind.",
    related: ["END-014", "END-050"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "END-018",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Structure",
    title: "Keep useful pawn structure",
    level: "Beginner",
    keywords: ["pawn structure", "pawns", "endgame"],
    questions: [
      "Why does pawn structure matter in the endgame?",
      "Should I avoid unnecessary pawn weaknesses?"
    ],
    short_answer: "Pawn weaknesses become more important when there are fewer pieces to defend them.",
    answer: "Weak pawns can become fixed targets, while healthy connected or passed pawns can become powerful assets.",
    example: "An isolated pawn may become a long-term target after most pieces are exchanged.",
    related: ["POSITION-006", "END-019"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-019",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Weaknesses",
    title: "Why are pawn weaknesses dangerous?",
    level: "Intermediate",
    keywords: ["pawn weakness", "isolated pawn", "endgame"],
    questions: [
      "Why are weak pawns more serious in the endgame?",
      "Can a weak pawn decide an endgame?"
    ],
    short_answer: "Yes. Weak pawns may become fixed targets that the opponent can attack repeatedly.",
    answer: "With fewer attacking resources, one weak pawn can become the main target of the position.",
    example: "A backward pawn may force a rook or king into passive defense.",
    related: ["END-018", "END-040"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-020",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Breaks",
    title: "Why are pawn breaks important in endgames?",
    level: "Intermediate",
    keywords: ["pawn break", "endgame", "pawn"],
    questions: [
      "When should I play a pawn break in the endgame?",
      "Can a pawn break create a passed pawn?"
    ],
    short_answer: "A well-timed pawn break can create a passed pawn or open a route for the king.",
    answer: "Before exchanging pawns, calculate how the resulting structure changes the position.",
    example: "A pawn exchange may create a distant passed pawn on another file.",
    related: ["END-010", "END-021"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-021",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Pawn Exchanges",
    title: "Should I exchange pawns in the endgame?",
    level: "Intermediate",
    keywords: ["pawn exchange", "simplification", "endgame"],
    questions: [
      "Is exchanging pawns always good when I am ahead?",
      "When should I trade pawns?"
    ],
    short_answer: "Exchange pawns when the resulting position improves your winning chances; do not trade automatically.",
    answer: "A pawn exchange can create a passed pawn, remove your weakness, or simplify into a winning ending—but it can also remove your winning chances.",
    example: "Before trading the last pair of pawns, check whether the resulting king-and-piece ending is favorable.",
    related: ["END-020", "END-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-022",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Piece Exchanges",
    title: "When should you exchange pieces?",
    level: "Intermediate",
    keywords: ["piece exchange", "simplification", "endgame"],
    questions: [
      "Should I exchange pieces when I am winning?",
      "When is simplification useful?"
    ],
    short_answer: "Exchange pieces when the resulting endgame is clearly favorable and easier to convert.",
    answer: "Simplification can reduce counterplay, but exchanging the wrong piece may remove your advantage.",
    example: "A winning pawn ending should be calculated before exchanging the last minor piece.",
    related: ["END-021", "END-023"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-023",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Simplification",
    title: "Why is simplification useful?",
    level: "Beginner",
    keywords: ["simplification", "winning advantage", "endgame"],
    questions: [
      "Why do strong players simplify when ahead?",
      "Is exchanging pieces a good winning technique?"
    ],
    short_answer: "Simplification can remove counterplay and make a material advantage easier to convert.",
    answer: "But simplification should be based on calculation, not an automatic rule.",
    example: "If trading queens leads to a technically winning rook ending, the exchange may be very useful.",
    related: ["END-022", "END-024"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-024",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Defensive Technique",
    title: "Should the defender exchange pieces?",
    level: "Intermediate",
    keywords: ["defense", "exchange", "endgame"],
    questions: [
      "Should a defender exchange pieces?",
      "Can exchanging pieces help the weaker side?"
    ],
    short_answer: "Sometimes. The defender should seek exchanges that reduce the opponent's winning resources or create drawing chances.",
    answer: "The correct exchange depends on the resulting position, especially king activity and pawn structure.",
    example: "Exchanging an active enemy piece may make a difficult position easier to defend.",
    related: ["END-022", "END-040"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-025",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Piece Activity",
    title: "Activity versus material",
    level: "Intermediate",
    keywords: ["activity", "material", "endgame"],
    questions: [
      "Is activity more important than material in an endgame?",
      "Can an active piece compensate for a pawn?"
    ],
    short_answer: "Activity can be extremely important, although material still matters.",
    answer: "An active king or rook may create threats while a materially superior but passive piece struggles to defend.",
    example: "An active rook attacking pawns from behind can sometimes compensate for a temporary material deficit.",
    related: ["END-026", "END-027"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-026",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Piece Activity",
    title: "Activate your pieces",
    level: "Beginner",
    keywords: ["piece activity", "endgame", "activity"],
    questions: [
      "What should I do with inactive pieces in an endgame?",
      "Why is activity so important?"
    ],
    short_answer: "Improve your least active piece and give it a useful target.",
    answer: "An active piece can attack weaknesses, support pawns, restrict the enemy king or create tactical threats.",
    example: "Move a passive rook behind a passed pawn instead of keeping it tied to one defensive square.",
    related: ["END-025", "END-027"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-027",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Rook Activity",
    title: "Why must rooks be active?",
    level: "Intermediate",
    keywords: ["rook", "activity", "endgame"],
    questions: [
      "Why is rook activity important in rook endings?",
      "Where should I place my rook?"
    ],
    short_answer: "A rook should seek active files, targets, checks and passed-pawn support.",
    answer: "A passive rook can be forced to defend continuously, while an active rook can attack from the side or behind.",
    example: "A rook behind a passed pawn can support its advance or attack the enemy pawn from behind.",
    related: ["END-028", "END-029"],
    source: "Standard rook-endgame principle",
    verified: true
  },

  {
    id: "END-028",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Rook Activity",
    title: "Rook behind a passed pawn",
    level: "Intermediate",
    keywords: ["rook", "passed pawn", "endgame"],
    questions: [
      "Why is a rook often placed behind a passed pawn?",
      "Should my rook go behind my passed pawn?"
    ],
    short_answer: "A rook behind a passed pawn can support its advance and attack from the rear.",
    answer: "The exact best rook square depends on the position, but the principle of active rook placement is fundamental.",
    example: "A rook behind a pawn can support promotion while remaining active against enemy pawns.",
    related: ["END-009", "END-027"],
    source: "Standard rook-endgame principle",
    verified: true
  },

  {
    id: "END-029",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Rook Activity",
    title: "Checking from the side",
    level: "Intermediate",
    keywords: ["rook checks", "side checks", "rook ending"],
    questions: [
      "Why does a rook check from the side work?",
      "How can side checks defend a rook ending?"
    ],
    short_answer: "Side checks can keep an enemy king away from a pawn without placing the rook directly in front of it.",
    answer: "The rook uses distance to give repeated checks while avoiding unnecessary exchanges.",
    example: "A defending rook may check a king from the side as it approaches a passed pawn.",
    related: ["END-027", "END-030"],
    source: "Standard rook-endgame principle",
    verified: true
  },

  {
    id: "END-030",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Rook Activity",
    title: "Cutting off the king",
    level: "Intermediate",
    keywords: ["cut off king", "rook", "endgame"],
    questions: [
      "How can a rook cut off the enemy king?",
      "Why is cutting off the king useful?"
    ],
    short_answer: "A rook can use a rank or file to restrict the enemy king's movement.",
    answer: "Cutting off the king can increase the distance it must travel and give your king or pawn time to advance.",
    example: "A rook controlling the fourth rank may prevent the enemy king from crossing toward a passed pawn.",
    related: ["END-027", "END-031"],
    source: "Standard rook-endgame principle",
    verified: true
  },

  {
    id: "END-031",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Rook Activity",
    title: "Active rook versus passive rook",
    level: "Intermediate",
    keywords: ["active rook", "passive rook", "rook ending"],
    questions: [
      "What is a passive rook?",
      "Why is a passive rook dangerous?"
    ],
    short_answer: "A passive rook is tied to defensive duties and has little freedom to create threats.",
    answer: "Keeping the rook passive may allow the opponent to improve the king and create zugzwang or another weakness.",
    example: "A rook forced to defend a pawn forever may lose because the enemy king can attack elsewhere.",
    related: ["END-026", "END-030"],
    source: "Standard rook-endgame principle",
    verified: true
  },

  {
    id: "END-032",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Minor Pieces",
    title: "Good bishop in the endgame",
    level: "Intermediate",
    keywords: ["bishop", "good bishop", "endgame"],
    questions: [
      "What makes a bishop good in an endgame?",
      "Why are open diagonals important for bishops?"
    ],
    short_answer: "A bishop is usually stronger when its own pawns do not restrict it and it has active diagonals.",
    answer: "An active bishop can attack pawns on both sides of the board and support passed pawns.",
    example: "A bishop with open diagonals can defend one wing while attacking the other.",
    related: ["END-033", "POSITION-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-033",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Minor Pieces",
    title: "Bad bishop in the endgame",
    level: "Intermediate",
    keywords: ["bad bishop", "bishop", "endgame"],
    questions: [
      "What is a bad bishop?",
      "Why can a bad bishop be a problem in the endgame?"
    ],
    short_answer: "A bad bishop is often restricted by its own pawns and has limited useful activity.",
    answer: "In an endgame, such a bishop may struggle to defend weaknesses or attack enemy pawns.",
    example: "A bishop blocked by several pawns on its own color can become a passive defender.",
    related: ["END-032", "POSITION-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-034",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Minor Pieces",
    title: "Bishop versus knight in the endgame",
    level: "Intermediate",
    keywords: ["bishop", "knight", "endgame"],
    questions: [
      "Which is better in the endgame, bishop or knight?",
      "When is a bishop better than a knight?"
    ],
    short_answer: "Neither is always better; the position determines which piece is superior.",
    answer: "Bishops often benefit from play on both wings and open positions, while knights can excel in closed positions and strong outposts.",
    example: "An open board with pawns on both sides may favor a bishop.",
    related: ["END-032", "END-035"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-035",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Minor Pieces",
    title: "Knight outposts in the endgame",
    level: "Intermediate",
    keywords: ["knight", "outpost", "endgame"],
    questions: [
      "Why are knight outposts powerful in endgames?",
      "What makes an outpost valuable?"
    ],
    short_answer: "A strong outpost gives the knight a stable active square that may be difficult for the enemy to challenge.",
    answer: "Knights can become very powerful when they occupy protected squares near enemy weaknesses.",
    example: "A knight on a protected central outpost can attack pawns on both wings.",
    related: ["END-034", "POSITION-007"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-036",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Piece Coordination",
    title: "Coordinate king and pieces",
    level: "Beginner",
    keywords: ["coordination", "king", "pieces"],
    questions: [
      "How should my king and pieces work together?",
      "Why is coordination important in endgames?"
    ],
    short_answer: "The king and pieces should support each other's activity and targets.",
    answer: "Good coordination prevents pieces from becoming overloaded and helps create concrete threats.",
    example: "The king attacks a pawn while the rook controls the promotion square.",
    related: ["END-002", "END-026"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-037",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King and Pieces",
    title: "King in front, piece behind",
    level: "Intermediate",
    keywords: ["king", "piece", "passed pawn"],
    questions: [
      "Why should the king often lead the attack?",
      "How can the king support a piece in an endgame?"
    ],
    short_answer: "The king can occupy key squares while another piece supports the resulting plan.",
    answer: "A well-placed king can shield a piece, attack weaknesses and create promotion threats.",
    example: "The king controls enemy king entry while the rook attacks a pawn from behind.",
    related: ["END-003", "END-036"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-038",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Two Wings",
    title: "Why are two wings important?",
    level: "Intermediate",
    keywords: ["two wings", "bishop", "king", "endgame"],
    questions: [
      "Why is play on both sides of the board important?",
      "Which pieces benefit from two-wing play?"
    ],
    short_answer: "Playing on both wings can favor faster and more mobile pieces, especially bishops and active kings.",
    answer: "A piece that can switch sides quickly may create a second weakness before the opponent can respond.",
    example: "A bishop can attack a queenside pawn while defending a kingside pawn.",
    related: ["END-032", "END-039"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-039",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Targets",
    title: "Create a second weakness",
    level: "Intermediate",
    keywords: ["second weakness", "targets", "endgame"],
    questions: [
      "What is a second weakness?",
      "Why is creating a second weakness useful?"
    ],
    short_answer: "A second weakness gives the opponent another target to defend.",
    answer: "A defender may be able to protect one weakness, but two distant weaknesses can overload defensive resources.",
    example: "Attack a kingside pawn while using the king to create pressure on the queenside.",
    related: ["END-019", "END-038"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-040",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Defense",
    title: "How should you defend an inferior endgame?",
    level: "Intermediate",
    keywords: ["defense", "inferior endgame", "drawing"],
    questions: [
      "What should I do in a worse endgame?",
      "How can I improve my defensive chances?"
    ],
    short_answer: "Stay active, create counterplay and avoid unnecessary weaknesses.",
    answer: "Passive defense often makes the position easier for the stronger side. Seek activity and practical resources.",
    example: "Use your rook to attack pawns from the side instead of defending passively from behind your king.",
    related: ["END-024", "END-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-041",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Defense",
    title: "Active defense",
    level: "Intermediate",
    keywords: ["active defense", "counterplay", "endgame"],
    questions: [
      "What is active defense?",
      "Why is active defense better than passive defense?"
    ],
    short_answer: "Active defense means creating threats while defending.",
    answer: "A defender who attacks enemy pawns or creates counterplay may force the stronger side to spend time defending.",
    example: "A defending rook attacks an exposed pawn instead of sitting beside its own pawn.",
    related: ["END-040", "END-029"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-042",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Fortress",
    title: "What is a fortress?",
    level: "Intermediate",
    keywords: ["fortress", "draw", "defense"],
    questions: [
      "What is a fortress in chess?",
      "Can a materially stronger player fail to win because of a fortress?"
    ],
    short_answer: "A fortress is a defensive setup that prevents the stronger side from making progress.",
    answer: "The stronger side may have more material but no practical way to break through.",
    example: "A blocked pawn structure may prevent a stronger piece from creating a winning breakthrough.",
    related: ["END-040", "END-043"],
    source: "Standard endgame concept",
    verified: true
  },

  {
    id: "END-043",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Stalemate",
    title: "Why must you watch for stalemate?",
    level: "Beginner",
    keywords: ["stalemate", "draw", "endgame"],
    questions: [
      "Why is stalemate dangerous when winning?",
      "How can I avoid stalemate?"
    ],
    short_answer: "A player with no legal move but not in check has a drawn position by stalemate.",
    answer: "When converting a large advantage, always check the opponent's legal moves before making forcing moves.",
    example: "Before taking the last pawn, make sure the enemy king will still have a legal move.",
    related: ["RULE-010", "END-050"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "END-044",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Promotion",
    title: "Always watch promotion squares",
    level: "Beginner",
    keywords: ["promotion", "promotion square", "pawn"],
    questions: [
      "Why should I control the promotion square?",
      "What is the importance of the eighth rank?"
    ],
    short_answer: "A pawn can become a powerful piece when it reaches the promotion rank.",
    answer: "Controlling the promotion square can stop an enemy pawn or support your own promotion.",
    example: "A rook may need to control the promotion square before attacking elsewhere.",
    related: ["END-017", "END-045"],
    source: "FIDE Laws and endgame principle",
    verified: true
  },

  {
    id: "END-045",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Promotion",
    title: "Do not assume every promotion wins",
    level: "Intermediate",
    keywords: ["promotion", "queen", "endgame"],
    questions: [
      "Does promoting a pawn always win?",
      "Why should promotion be calculated?"
    ],
    short_answer: "No. Promotion can fail because of checks, stalemate, immediate captures or other tactical resources.",
    answer: "Calculate the position after promotion before assuming the pawn has won.",
    example: "A promoted queen may be exposed to a forcing check or tactical exchange.",
    related: ["END-017", "END-043"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "END-046",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Queen Endgames",
    title: "Queen endgames require king safety",
    level: "Intermediate",
    keywords: ["queen endgame", "king safety", "checks"],
    questions: [
      "What is most important in queen endgames?",
      "Why are queen endgames dangerous?"
    ],
    short_answer: "King safety and checking possibilities are critical in queen endgames.",
    answer: "Queens can give repeated checks from great distances, so an active king can also become a tactical target.",
    example: "Before moving your king toward a pawn, check whether the enemy queen has forcing checks.",
    related: ["END-004", "END-050"],
    source: "Queen endgame principle",
    verified: true
  },

  {
    id: "END-047",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Queen Endgames",
    title: "Perpetual check in queen endings",
    level: "Intermediate",
    keywords: ["perpetual check", "queen", "draw"],
    questions: [
      "Can a queen endgame be drawn by perpetual check?",
      "How should I avoid perpetual check?"
    ],
    short_answer: "Yes. Repeated checks can force a draw if the checked king cannot escape.",
    answer: "Seek shelter, trade queens when appropriate, or move toward a position where checks are limited.",
    example: "A king hiding behind its own pawns may escape a series of queen checks.",
    related: ["END-046", "END-048"],
    source: "Standard endgame principle",
    verified: true
  },

  {
    id: "END-048",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Queen Exchanges",
    title: "When should queens be exchanged?",
    level: "Intermediate",
    keywords: ["queen exchange", "simplification", "endgame"],
    questions: [
      "Should I exchange queens in an endgame?",
      "When is a queen trade useful?"
    ],
    short_answer: "Exchange queens when the resulting ending is favorable and removes significant counterplay.",
    answer: "Do not exchange automatically. Calculate the resulting king, pawn and piece activity.",
    example: "If a queen trade leads to a clearly winning pawn ending, it may be the best move.",
    related: ["END-022", "END-047"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-049",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Calculation",
    title: "Calculate pawn endings carefully",
    level: "Beginner",
    keywords: ["pawn ending", "calculation", "accuracy"],
    questions: [
      "Why are pawn endings so precise?",
      "Why should I calculate pawn endings exactly?"
    ],
    short_answer: "Pawn endings are often decided by a single tempo or king move.",
    answer: "There are fewer pieces to create complications, so exact calculation becomes essential.",
    example: "One unnecessary pawn move can lose opposition and change a win into a draw.",
    related: ["END-005", "END-013"],
    source: "Standard endgame principle",
    verified: true
  },

  {
    id: "END-050",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Calculation",
    title: "Check forcing moves first",
    level: "Intermediate",
    keywords: ["calculation", "checks", "endgame"],
    questions: [
      "What should I calculate first in an endgame?",
      "Should I look for checks before quiet moves?"
    ],
    short_answer: "Start with forcing moves such as checks, captures and immediate threats.",
    answer: "Forcing moves can change the evaluation immediately and must be checked before committing to a strategic plan.",
    example: "Before advancing your king, check whether the opponent has a forcing rook check.",
    related: ["CALC-003", "END-046"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "END-051",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Winning Technique",
    title: "Convert advantages slowly",
    level: "Beginner",
    keywords: ["conversion", "winning technique", "endgame"],
    questions: [
      "How should I convert an advantage?",
      "Should I rush when I am winning?"
    ],
    short_answer: "Improve your position step by step and avoid unnecessary risks.",
    answer: "A winning endgame often requires patience: improve the king, activate pieces, restrict counterplay and only then create decisive threats.",
    example: "Instead of immediately pushing a passed pawn, first bring your king closer.",
    related: ["END-002", "END-052"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-052",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Winning Technique",
    title: "Improve before pushing",
    level: "Intermediate",
    keywords: ["improvement", "passed pawn", "endgame"],
    questions: [
      "Should I push my passed pawn immediately?",
      "Why improve my pieces before advancing a pawn?"
    ],
    short_answer: "Often improve your king or pieces first if the pawn is not in danger.",
    answer: "Premature pawn pushes can give the defender useful activity or allow the pawn to become blocked.",
    example: "Bring the king closer to support a passed pawn before advancing it.",
    related: ["END-051", "END-009"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-053",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "King Activity",
    title: "King opposition versus king distance",
    level: "Intermediate",
    keywords: ["king", "distance", "opposition"],
    questions: [
      "Why does king distance matter in endgames?",
      "How important is the number of king moves?"
    ],
    short_answer: "King distance often determines who reaches a critical square first.",
    answer: "One tempo can decide whether a king penetrates, captures a pawn or gains opposition.",
    example: "A king that reaches the center one move earlier may force the enemy king backward.",
    related: ["END-005", "END-014"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "END-054",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Outside Passed Pawn",
    title: "What is an outside passed pawn?",
    level: "Intermediate",
    keywords: ["outside passed pawn", "passed pawn", "endgame"],
    questions: [
      "What is an outside passed pawn?",
      "Why is an outside passed pawn powerful?"
    ],
    short_answer: "It is a passed pawn far from the main group of pawns, often on the opposite wing.",
    answer: "It can force the enemy king away, allowing your king to attack pawns elsewhere.",
    example: "A queenside passed pawn can distract the defending king while your king wins kingside pawns.",
    related: ["END-009", "END-038"],
    source: "Standard endgame concept",
    verified: true
  },

  {
    id: "END-055",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Restriction",
    title: "Restrict the enemy king",
    level: "Intermediate",
    keywords: ["king restriction", "endgame", "activity"],
    questions: [
      "Why should I restrict the enemy king?",
      "How can I limit king activity?"
    ],
    short_answer: "A restricted king cannot reach important squares or support its pawns effectively.",
    answer: "Use pieces and pawns to control key entry squares before improving your own position.",
    example: "A rook can cut off the enemy king while your king approaches a pawn.",
    related: ["END-030", "END-036"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-056",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Endgame Study",
    title: "Why study theoretical endgames?",
    level: "Beginner",
    keywords: ["endgame study", "theory", "training"],
    questions: [
      "Why should I learn basic endgames?",
      "How does endgame theory improve my chess?"
    ],
    short_answer: "Basic endgame knowledge helps you calculate accurately and convert advantages confidently.",
    answer: "Knowing fundamental positions reduces calculation time and prevents avoidable mistakes.",
    example: "Understanding opposition makes many king-and-pawn positions much easier to evaluate.",
    related: ["END-005", "TRAIN-001"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "END-057",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Practical Technique",
    title: "Use the king as a fighting piece",
    level: "Beginner",
    keywords: ["king", "fighting piece", "endgame"],
    questions: [
      "How should I use my king in practical endgames?",
      "Can the king attack enemy pawns?"
    ],
    short_answer: "Yes. The king can attack pawns, defend your own pieces and occupy critical squares.",
    answer: "In many simplified positions, the king is one of the most active pieces on the board.",
    example: "Use the king to attack an isolated pawn while your rook handles another task.",
    related: ["END-002", "END-036"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-058",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Practical Play",
    title: "Do not play endgames automatically",
    level: "Intermediate",
    keywords: ["endgame", "calculation", "decision making"],
    questions: [
      "Can I rely only on endgame rules?",
      "Are endgame principles always correct?"
    ],
    short_answer: "No. Principles guide decisions, but concrete calculation decides the position.",
    answer: "A general rule can be wrong in a tactical position or unusual structure.",
    example: "An active king may look good, but moving it can allow a tactical check or pawn breakthrough.",
    related: ["END-004", "END-050"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "END-059",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Practical Checklist",
    title: "Endgame checklist",
    level: "Beginner",
    keywords: ["endgame checklist", "king", "passed pawn"],
    questions: [
      "What should I check in an endgame?",
      "What is a simple endgame checklist?"
    ],
    short_answer: "Check king activity, passed pawns, weaknesses, piece activity, promotion threats and tactical resources.",
    answer: "A quick checklist prevents many practical mistakes before every move.",
    example: "Ask: Who has the more active king? Which pawns are weak? What is the opponent threatening?",
    related: ["END-002", "END-009", "END-050"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "END-060",
    type: "PRINCIPLE",
    category: "Endgame",
    topic: "Endgame Principles",
    subtopic: "Golden Rules",
    title: "Golden rules of the endgame",
    level: "Beginner",
    keywords: ["endgame rules", "king activity", "endgame checklist"],
    questions: [
      "What are the golden rules of endgames?",
      "What should I remember when entering an endgame?"
    ],
    short_answer: "Activate the king, create passed pawns, keep pieces active, calculate precisely and avoid unnecessary weaknesses.",
    answer: "Endgames reward activity, accuracy, patience and good pawn structure. Use principles as guides, then verify every critical move.",
    example: "Centralize the king, improve the worst piece, create a passed pawn and calculate the resulting position.",
    related: ["END-003", "END-009", "END-026", "END-059"],
    source: "Chess coaching framework",
    verified: true
  }

];

export default endgamePrinciples;