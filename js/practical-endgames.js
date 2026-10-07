const practicalEndgames = [

  {
    id: "PRACTICAL-END-001",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "King and pawn versus king",
    level: "Beginner",
    keywords: ["king pawn", "pawn ending", "basic endgame"],
    questions: [
      "Can a king and pawn always beat a king?",
      "What decides king and pawn versus king?"
    ],
    short_answer: "No. The result depends mainly on king position, opposition and whose move it is.",
    answer: "The attacking king must usually reach key squares while preventing the defending king from blocking the pawn.",
    example: "A king supporting a pawn from the correct side can force promotion, while a badly placed king may only draw.",
    related: ["END-005", "END-015"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-002",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "The king must support the pawn",
    level: "Beginner",
    keywords: ["king", "pawn", "promotion"],
    questions: [
      "How does the king help a passed pawn?",
      "Why can't the pawn advance alone?"
    ],
    short_answer: "The king controls key squares and protects the pawn while it advances.",
    answer: "Without king support, the defending king may blockade or capture the pawn.",
    example: "A king in front of its pawn can force the defending king away from the promotion route.",
    related: ["END-016", "PRACTICAL-END-003"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-003",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "The sixth-rank rule",
    level: "Intermediate",
    keywords: ["sixth rank", "king pawn", "promotion"],
    questions: [
      "Why is the sixth rank important for a pawn?",
      "Does a king on the sixth rank usually help its pawn?"
    ],
    short_answer: "A king reaching the sixth rank in front of its pawn often provides strong winning chances.",
    answer: "The king can control important squares and restrict the defending king.",
    example: "A king on the sixth rank in front of a rook pawn is not automatically winning, so calculate the exact position.",
    related: ["END-015", "PRACTICAL-END-001"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-004",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Rook pawn drawing chances",
    level: "Beginner",
    keywords: ["rook pawn", "draw", "pawn ending"],
    questions: [
      "Why are rook pawns difficult to promote?",
      "Can a rook pawn be a draw even with king support?"
    ],
    short_answer: "Yes. Rook pawns have fewer promotion routes and the defending king can sometimes reach the corner.",
    answer: "The corner can become a fortress because the attacking king has limited space to drive the defender away.",
    example: "A king and rook pawn may fail to win when the defending king reaches the promotion corner.",
    related: ["PRACTICAL-END-001", "PRACTICAL-END-005"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-005",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Bishop pawn versus king",
    level: "Intermediate",
    keywords: ["bishop pawn", "pawn ending", "promotion"],
    questions: [
      "Is a bishop pawn usually easier to promote than a rook pawn?",
      "What makes bishop pawns different?"
    ],
    short_answer: "Bishop pawns generally have better promotion chances than rook pawns, but exact king positions matter.",
    answer: "The attacking king usually has more useful space than with a rook pawn.",
    example: "A bishop pawn supported by a well-placed king can often force the defending king away.",
    related: ["PRACTICAL-END-004", "PRACTICAL-END-006"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-006",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Knight pawn promotion",
    level: "Intermediate",
    keywords: ["knight pawn", "promotion", "pawn ending"],
    questions: [
      "What is special about a knight pawn?",
      "Can a knight pawn fail to promote despite king support?"
    ],
    short_answer: "Knight pawns can usually promote, but exact opposition and king placement are critical.",
    answer: "The defending king may use the promotion square and nearby key squares to create drawing chances.",
    example: "Calculate the king positions before assuming a knight pawn wins.",
    related: ["PRACTICAL-END-001", "PRACTICAL-END-007"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-007",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Central pawn promotion",
    level: "Beginner",
    keywords: ["central pawn", "promotion", "king"],
    questions: [
      "Why are central pawns useful in pawn endings?",
      "Are central passed pawns usually strong?"
    ],
    short_answer: "Central pawns often give the attacking king more useful promotion routes.",
    answer: "They are less restricted by the edge of the board and can receive support from either side.",
    example: "A king supporting a d-pawn can often use several routes to approach the promotion square.",
    related: ["PRACTICAL-END-001", "END-015"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-008",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Pawn race",
    level: "Intermediate",
    keywords: ["pawn race", "promotion", "calculation"],
    questions: [
      "How do I calculate a pawn race?",
      "Who wins when both players have passed pawns?"
    ],
    short_answer: "Count the exact moves to promotion and calculate checks, captures and the resulting position.",
    answer: "Do not judge a pawn race by distance alone. Promotion with check can completely change the result.",
    example: "A pawn that promotes one move later may still win if its promotion gives check.",
    related: ["END-017", "PRACTICAL-END-009"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-009",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Promotion with check",
    level: "Intermediate",
    keywords: ["promotion check", "pawn race", "queen"],
    questions: [
      "Why is promotion with check powerful?",
      "Can promotion with check win a pawn race?"
    ],
    short_answer: "Yes. The check gains a tempo and can stop the opponent from promoting immediately.",
    answer: "Always include the effect of check when calculating promotion races.",
    example: "A queen promotion that checks the enemy king may stop an otherwise immediate promotion.",
    related: ["PRACTICAL-END-008", "END-045"],
    source: "Standard endgame calculation",
    verified: true
  },

  {
    id: "PRACTICAL-END-010",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Triangulation",
    level: "Intermediate",
    keywords: ["triangulation", "tempo", "king"],
    questions: [
      "What is triangulation?",
      "Why is triangulation useful in pawn endings?"
    ],
    short_answer: "Triangulation is a king maneuver that loses a tempo and can transfer the move to the opponent.",
    answer: "It is often used to create zugzwang or gain opposition.",
    example: "A king takes a three-move route instead of a two-move route so the opponent is forced to move.",
    related: ["END-012", "END-013"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-011",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Reserve pawn moves",
    level: "Intermediate",
    keywords: ["reserve tempo", "pawn move", "zugzwang"],
    questions: [
      "How can a pawn move save a tempo?",
      "Why should I keep a pawn move in reserve?"
    ],
    short_answer: "A spare pawn move can force the opponent to move first at a critical moment.",
    answer: "Reserve tempi are particularly useful in opposition positions.",
    example: "Keeping a pawn on its original square may give you a useful waiting move later.",
    related: ["END-013", "PRACTICAL-END-010"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-012",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Blockading a passed pawn",
    level: "Intermediate",
    keywords: ["blockade", "passed pawn", "king"],
    questions: [
      "How should I stop a passed pawn?",
      "What is a blockade?"
    ],
    short_answer: "Place a piece or king in front of the pawn so it cannot advance.",
    answer: "A well-placed blockade can completely neutralize a dangerous passed pawn.",
    example: "A king standing directly in front of an enemy pawn may prevent it from advancing.",
    related: ["END-009", "POSITION-015"],
    source: "Chess endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-013",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Key squares in practice",
    level: "Intermediate",
    keywords: ["key square", "king", "pawn"],
    questions: [
      "How do I use key squares practically?",
      "Why should I know key squares?"
    ],
    short_answer: "Identify the squares your king must occupy to force the defending king away.",
    answer: "Key-square knowledge helps you decide whether a pawn ending is winning without calculating every possible move.",
    example: "If your king can reach the necessary key square safely, the pawn may become unstoppable.",
    related: ["END-015", "PRACTICAL-END-001"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-014",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Corresponding squares",
    level: "Advanced",
    keywords: ["corresponding squares", "pawn ending", "king"],
    questions: [
      "What are corresponding squares?",
      "Why are corresponding squares useful?"
    ],
    short_answer: "They are related squares where the kings must move in response to maintain the correct defensive relationship.",
    answer: "Corresponding-square concepts help solve complex king-and-pawn endings where direct opposition is not enough.",
    example: "A defending king may need to move to a specific square whenever the attacking king changes squares.",
    related: ["END-005", "END-012"],
    source: "Advanced endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-015",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King and Pawn",
    title: "Outside passed pawn",
    level: "Intermediate",
    keywords: ["outside passed pawn", "king", "passed pawn"],
    questions: [
      "How does an outside passed pawn win an endgame?",
      "Why is an outside passed pawn a strong weapon?"
    ],
    short_answer: "It can pull the enemy king away while your king attacks pawns on the other side.",
    answer: "The defender may be forced to choose between stopping the passed pawn and protecting the remaining pawns.",
    example: "A queenside passed pawn distracts the black king while the white king captures kingside pawns.",
    related: ["END-054", "END-039"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-016",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Pawn Structures",
    title: "Connected passed pawns",
    level: "Intermediate",
    keywords: ["connected passed pawns", "passed pawns", "promotion"],
    questions: [
      "Why are connected passed pawns strong?",
      "Can one piece stop two connected passed pawns?"
    ],
    short_answer: "Connected passed pawns support each other and can overwhelm a defending piece.",
    answer: "The exact result depends on king and piece placement, but connected passers are often a major advantage.",
    example: "Two connected pawns on the sixth rank can be extremely dangerous.",
    related: ["END-011", "PRACTICAL-END-017"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-017",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Pawn Structures",
    title: "Doubled passed pawns",
    level: "Intermediate",
    keywords: ["doubled pawns", "passed pawns", "endgame"],
    questions: [
      "Can doubled pawns become strong passed pawns?",
      "Are doubled pawns always weak in the endgame?"
    ],
    short_answer: "No. Doubled pawns can be powerful if they create promotion threats or control important squares.",
    answer: "Their value depends on mobility, king support and the opponent's ability to blockade them.",
    example: "Two advanced doubled passed pawns can tie down an enemy piece.",
    related: ["END-009", "POSITION-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-018",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Pawn Structures",
    title: "Pawn majority",
    level: "Intermediate",
    keywords: ["pawn majority", "passed pawn", "endgame"],
    questions: [
      "How can a pawn majority help in an endgame?",
      "Can a majority create a passed pawn?"
    ],
    short_answer: "A pawn majority can often create a passed pawn after a favorable pawn exchange.",
    answer: "The timing of the pawn break is important because premature exchanges may create weaknesses instead.",
    example: "Three pawns against two on one wing can sometimes produce a passed pawn.",
    related: ["END-020", "PRACTICAL-END-019"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-019",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Pawn Structures",
    title: "Fixing a pawn weakness",
    level: "Intermediate",
    keywords: ["pawn weakness", "fixed pawn", "endgame"],
    questions: [
      "What does it mean to fix a pawn weakness?",
      "Why are fixed pawns easier to attack?"
    ],
    short_answer: "A fixed pawn weakness is a pawn that cannot easily advance or escape attack.",
    answer: "Fixing a weakness allows your king or pieces to attack it repeatedly.",
    example: "A backward pawn fixed on a dark square can become a long-term target.",
    related: ["END-019", "PRACTICAL-END-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-020",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Pawn Structures",
    title: "Pawn breakthrough",
    level: "Intermediate",
    keywords: ["pawn breakthrough", "pawn ending", "promotion"],
    questions: [
      "What is a pawn breakthrough?",
      "How can a pawn breakthrough create a passed pawn?"
    ],
    short_answer: "A pawn breakthrough is a calculated pawn sacrifice or exchange that creates a passed pawn.",
    answer: "The breakthrough often works by forcing the opponent to capture one pawn while another advances.",
    example: "Two connected pawns can sometimes sacrifice one to create an unstoppable passer.",
    related: ["END-020", "PRACTICAL-END-016"],
    source: "Standard endgame concept",
    verified: true
  },

  {
    id: "PRACTICAL-END-021",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Basic rook versus pawn",
    level: "Intermediate",
    keywords: ["rook", "pawn", "rook versus pawn"],
    questions: [
      "Can a rook always stop one pawn?",
      "What matters in rook versus pawn?"
    ],
    short_answer: "Not always. The pawn's rank, king position, promotion square and rook position all matter.",
    answer: "Some advanced pawns can create tactical threats that prevent the rook from stopping promotion.",
    example: "A rook checking from behind may stop a distant pawn, but a supported pawn near promotion can be dangerous.",
    related: ["END-044", "PRACTICAL-END-022"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-022",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook behind the passed pawn",
    level: "Intermediate",
    keywords: ["rook", "passed pawn", "rook ending"],
    questions: [
      "Where should the rook stand behind a passed pawn?",
      "Why is the seventh or eighth rank useful?"
    ],
    short_answer: "A rook behind a passed pawn can support advancement or attack it, depending on which side owns the pawn.",
    answer: "The exact rank matters less than maintaining activity and control of promotion squares.",
    example: "A rook behind an enemy passed pawn can attack it from the rear.",
    related: ["END-028", "PRACTICAL-END-023"],
    source: "Standard rook-endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-023",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Checking from behind",
    level: "Intermediate",
    keywords: ["rook check", "checking from behind", "rook ending"],
    questions: [
      "Why can a rook check from behind be effective?",
      "How does a rook stop a king and pawn?"
    ],
    short_answer: "The rook can check the king while attacking or controlling the pawn from behind.",
    answer: "Distance and timing are critical because the defending rook must avoid allowing the pawn to escape.",
    example: "A rook behind an advancing pawn can repeatedly check the supporting king.",
    related: ["PRACTICAL-END-021", "END-029"],
    source: "Standard rook-endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-024",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Lucena position",
    level: "Advanced",
    keywords: ["Lucena", "rook ending", "bridge building"],
    questions: [
      "What is the Lucena position?",
      "Why is Lucena important?"
    ],
    short_answer: "The Lucena position is a fundamental winning rook-ending technique with a king and rook supporting promotion against a rook.",
    answer: "The winning side uses a bridge-building maneuver to shelter the king from checks and promote the pawn.",
    example: "Learning the Lucena technique is essential for converting many rook-and-pawn versus rook positions.",
    related: ["PRACTICAL-END-025", "PRACTICAL-END-026"],
    source: "Standard rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-025",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Philidor position",
    level: "Advanced",
    keywords: ["Philidor", "rook ending", "defense"],
    questions: [
      "What is the Philidor position?",
      "How does the Philidor position help defend rook endings?"
    ],
    short_answer: "The Philidor position is a fundamental defensive method in rook-and-pawn versus rook endings.",
    answer: "The defending rook uses the third-rank method and then checks from behind or the side at the correct moment.",
    example: "The defender keeps the enemy king from reaching a winning position before the pawn advances too far.",
    related: ["PRACTICAL-END-024", "PRACTICAL-END-027"],
    source: "Standard rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-026",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Bridge building",
    level: "Advanced",
    keywords: ["bridge building", "Lucena", "rook ending"],
    questions: [
      "What is bridge building in rook endings?",
      "How does bridge building help promote a pawn?"
    ],
    short_answer: "The rook creates a barrier that protects the king from checks while the pawn promotes.",
    answer: "It is the key practical technique associated with the Lucena position.",
    example: "The rook moves across a rank to shield the king before the pawn advances.",
    related: ["PRACTICAL-END-024", "END-027"],
    source: "Standard rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-027",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook checking distance",
    level: "Advanced",
    keywords: ["rook checks", "distance", "rook ending"],
    questions: [
      "Why must the rook keep checking distance?",
      "How far should a defending rook stay from the king?"
    ],
    short_answer: "The rook often needs enough distance to give safe checks without being attacked by the king.",
    answer: "Too close may allow the king to attack the rook; too far may allow the pawn to advance.",
    example: "A defending rook can check from the side while staying outside the enemy king's immediate reach.",
    related: ["PRACTICAL-END-023", "END-029"],
    source: "Standard rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-028",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook activity on the seventh rank",
    level: "Intermediate",
    keywords: ["seventh rank", "rook", "endgame"],
    questions: [
      "Why is the seventh rank powerful for a rook?",
      "Should I always put my rook on the seventh rank?"
    ],
    short_answer: "The seventh rank can allow a rook to attack pawns and restrict the enemy king.",
    answer: "It is a useful target, but activity elsewhere may be more important in a specific position.",
    example: "A rook on the seventh rank may attack several pawns from behind.",
    related: ["END-027", "END-030"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-029",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook and pawn versus rook",
    level: "Intermediate",
    keywords: ["rook pawn rook", "rook ending", "draw"],
    questions: [
      "Is rook and pawn versus rook always winning?",
      "What determines the result?"
    ],
    short_answer: "No. Many positions are drawn, while others are winning with precise technique.",
    answer: "King position, pawn location, rook activity and the side to move are critical.",
    example: "Lucena positions are winning while many Philidor-type positions are drawn.",
    related: ["PRACTICAL-END-024", "PRACTICAL-END-025"],
    source: "Standard rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-030",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook versus rook with extra pawn",
    level: "Intermediate",
    keywords: ["rook ending", "extra pawn", "conversion"],
    questions: [
      "How should I win a rook ending with an extra pawn?",
      "Is one extra pawn enough to win a rook ending?"
    ],
    short_answer: "One extra pawn often gives winning chances, but active rook defense can make the position difficult or drawn.",
    answer: "King activity and rook activity usually matter more than simply counting the extra pawn.",
    example: "An active defending rook can attack the stronger side's pawns and create perpetual checks.",
    related: ["PRACTICAL-END-031", "PRACTICAL-END-040"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-031",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook ending with connected pawns",
    level: "Intermediate",
    keywords: ["rook ending", "connected pawns", "passed pawns"],
    questions: [
      "How strong are connected passed pawns in rook endings?",
      "Can a rook stop connected passed pawns?"
    ],
    short_answer: "Connected passed pawns can be very dangerous, but an active rook may stop them with accurate play.",
    answer: "The king's position and the rook's ability to check or attack from behind determine the result.",
    example: "A rook may attack the rear pawn while the king blocks the front pawn.",
    related: ["PRACTICAL-END-016", "PRACTICAL-END-032"],
    source: "Rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-032",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook versus connected passed pawns",
    level: "Advanced",
    keywords: ["rook", "connected passed pawns", "defense"],
    questions: [
      "Can a rook beat two connected passed pawns?",
      "How should a rook stop connected passers?"
    ],
    short_answer: "Sometimes. The rook should seek checks, attack from behind and coordinate with its king.",
    answer: "The exact position must be calculated because advanced connected pawns can become tactically overwhelming.",
    example: "A rook checking the supporting king may stop the pawns from advancing together.",
    related: ["PRACTICAL-END-031", "PRACTICAL-END-023"],
    source: "Advanced rook endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-033",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Active rook defense",
    level: "Intermediate",
    keywords: ["rook defense", "counterplay", "rook ending"],
    questions: [
      "How should I defend a rook ending?",
      "Why should the defending rook stay active?"
    ],
    short_answer: "Attack pawns, give checks and create counterplay instead of remaining passive.",
    answer: "Active rook play can force the stronger side to spend tempi defending its own king and pawns.",
    example: "Attack an exposed pawn from the side while checking the enemy king.",
    related: ["END-041", "PRACTICAL-END-030"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-034",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Do not place the rook passively",
    level: "Beginner",
    keywords: ["passive rook", "rook ending", "activity"],
    questions: [
      "Why is a passive rook dangerous?",
      "How can I activate my rook?"
    ],
    short_answer: "A passive rook may become tied to one pawn and allow the enemy king to improve.",
    answer: "Look for checking distance, active files and targets instead of waiting without counterplay.",
    example: "Move from passive pawn defense to an active side-checking position when possible.",
    related: ["END-031", "PRACTICAL-END-033"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-035",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook behind an enemy passed pawn",
    level: "Intermediate",
    keywords: ["rook", "enemy passed pawn", "defense"],
    questions: [
      "Why should a defending rook attack a passed pawn from behind?",
      "Can the rook stop a pawn from behind?"
    ],
    short_answer: "The rook can attack the pawn along its file while remaining active.",
    answer: "This often forces the pawn to move into a position where it can be captured or blockaded.",
    example: "A rook behind a passed pawn can attack it repeatedly while the king approaches.",
    related: ["PRACTICAL-END-022", "PRACTICAL-END-023"],
    source: "Standard rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-036",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Cutting off the enemy king",
    level: "Intermediate",
    keywords: ["cut off king", "rook", "rook ending"],
    questions: [
      "How can a rook cut off a king?",
      "Why is king restriction so important?"
    ],
    short_answer: "Place the rook on a rank or file that prevents the enemy king from approaching.",
    answer: "Cutting off the king can gain the time needed to advance your own king and pawn.",
    example: "A rook on the fourth rank can prevent the enemy king from crossing it.",
    related: ["END-030", "PRACTICAL-END-024"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-037",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook checks from the side",
    level: "Intermediate",
    keywords: ["side checks", "rook", "defense"],
    questions: [
      "Why are side checks useful?",
      "When should a rook check from the side?"
    ],
    short_answer: "Side checks can delay the enemy king while keeping the rook at a safe distance.",
    answer: "They are especially useful when the attacking king is shielding a passed pawn.",
    example: "Check the king from a distant file rather than allowing it to approach your rook.",
    related: ["END-029", "PRACTICAL-END-027"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-038",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook checks from behind",
    level: "Intermediate",
    keywords: ["rear checks", "rook", "passed pawn"],
    questions: [
      "When are rear checks useful?",
      "Can a rook stop a king by checking from behind?"
    ],
    short_answer: "Yes. Rear checks can force the king away from its pawn or prevent progress.",
    answer: "The rook should maintain enough distance to avoid being attacked by the king.",
    example: "Check the king repeatedly from behind while attacking the pawn along the same file.",
    related: ["PRACTICAL-END-023", "PRACTICAL-END-027"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-039",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook on the side of a passed pawn",
    level: "Intermediate",
    keywords: ["rook", "passed pawn", "side checks"],
    questions: [
      "Why can a rook move to the side of a passed pawn?",
      "What is the advantage of side positioning?"
    ],
    short_answer: "A rook on the side can give checks and attack the king or pawn without blocking its own activity.",
    answer: "Side placement is often more flexible than staying directly behind the pawn.",
    example: "A rook on an adjacent file can check the king from a distance.",
    related: ["PRACTICAL-END-037", "PRACTICAL-END-033"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-040",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Rook Endgames",
    title: "Rook ending conversion checklist",
    level: "Intermediate",
    keywords: ["rook ending", "checklist", "conversion"],
    questions: [
      "What should I check in a rook ending?",
      "What is the rook-endgame checklist?"
    ],
    short_answer: "Check king activity, passed pawns, rook activity, checking distance and promotion threats.",
    answer: "Before every critical move, ask whether the opponent has checks, counterplay or a tactical pawn advance.",
    example: "Improve your king while keeping the rook active and controlling the promotion route.",
    related: ["PRACTICAL-END-030", "END-059"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "PRACTICAL-END-041",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Bishop versus pawns",
    level: "Intermediate",
    keywords: ["bishop", "pawns", "endgame"],
    questions: [
      "How does a bishop stop passed pawns?",
      "Can one bishop stop several pawns?"
    ],
    short_answer: "A bishop can often control multiple pawns from a distance because it moves across the board quickly.",
    answer: "Its effectiveness depends on pawn color, king position and whether the pawns can advance together.",
    example: "A bishop may blockade one pawn while attacking another from a diagonal.",
    related: ["END-032", "PRACTICAL-END-042"],
    source: "Minor-piece endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-042",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Opposite-colored bishops",
    level: "Intermediate",
    keywords: ["opposite bishops", "draw", "bishop ending"],
    questions: [
      "Why are opposite-colored bishop endings often drawish?",
      "Can opposite bishops still produce winning chances?"
    ],
    short_answer: "Each bishop controls different colored squares, making it difficult to attack pawns protected by the enemy king or bishop.",
    answer: "However, winning chances can arise when one side has a strong passed pawn, extra pawns or a powerful king.",
    example: "A passed pawn supported by the king may force the enemy bishop into passive defense.",
    related: ["PRACTICAL-END-043", "END-032"],
    source: "Standard bishop endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-043",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Same-colored bishops",
    level: "Intermediate",
    keywords: ["same bishops", "bishop ending", "pawn"],
    questions: [
      "What happens in same-colored bishop endings?",
      "Why can same-colored bishop endings be easier to win?"
    ],
    short_answer: "Both bishops control the same color complex, so weaknesses can be attacked and defended more directly.",
    answer: "King activity and pawn structure become especially important.",
    example: "A stronger king may attack a pawn that the defending bishop cannot adequately protect.",
    related: ["PRACTICAL-END-042", "PRACTICAL-END-044"],
    source: "Standard bishop endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-044",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Bishop and pawn versus bishop",
    level: "Intermediate",
    keywords: ["bishop pawn bishop", "bishop ending", "promotion"],
    questions: [
      "Can bishop and pawn beat a bishop?",
      "What should I calculate in bishop endings?"
    ],
    short_answer: "Sometimes, but the result depends heavily on bishop colors, king position and promotion square.",
    answer: "The defending bishop may be able to sacrifice itself for the pawn or control its promotion square.",
    example: "Calculate whether the defending bishop controls the promotion square before advancing the pawn.",
    related: ["PRACTICAL-END-042", "PRACTICAL-END-045"],
    source: "Standard bishop endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-045",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Wrong-colored bishop",
    level: "Intermediate",
    keywords: ["wrong bishop", "rook pawn", "draw"],
    questions: [
      "What is a wrong-colored bishop?",
      "Why can a wrong-colored bishop cause a draw?"
    ],
    short_answer: "A bishop may control the wrong color of squares to help a rook pawn promote.",
    answer: "When the defending king reaches the promotion corner, the attacking bishop may be unable to drive it away.",
    example: "A rook pawn and bishop can fail to win when the bishop does not control the promotion square's color.",
    related: ["PRACTICAL-END-004", "PRACTICAL-END-046"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-046",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Bishop Endgames",
    title: "Bishop and rook pawn",
    level: "Intermediate",
    keywords: ["bishop", "rook pawn", "draw"],
    questions: [
      "Why can bishop and rook pawn be a draw?",
      "How does the defending king stop the rook pawn?"
    ],
    short_answer: "The defending king may reach the corner while the bishop cannot control the necessary promotion square.",
    answer: "This is a classic practical drawing mechanism.",
    example: "Before pushing a rook pawn, check whether your bishop controls the promotion corner.",
    related: ["PRACTICAL-END-045", "PRACTICAL-END-004"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-047",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Knight Endgames",
    title: "Knight and pawn versus king",
    level: "Intermediate",
    keywords: ["knight", "pawn", "king"],
    questions: [
      "Can a knight help a pawn promote?",
      "How does a knight support a passed pawn?"
    ],
    short_answer: "A knight can control key squares and protect the pawn, but its slow movement requires precise calculation.",
    answer: "The knight's ability to control the promotion square or defend key squares is often decisive.",
    example: "A knight may protect a pawn while the king approaches the promotion square.",
    related: ["END-035", "PRACTICAL-END-048"],
    source: "Minor-piece endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-048",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Knight Endgames",
    title: "Knight versus pawns",
    level: "Intermediate",
    keywords: ["knight", "passed pawns", "endgame"],
    questions: [
      "Can a knight stop passed pawns?",
      "What is the knight's main defensive strength?"
    ],
    short_answer: "A knight can blockade or fork pawns and kings, but it may struggle against widely separated pawns.",
    answer: "Knights are strongest when the pawns are close enough for the knight to attack them with tempo.",
    example: "A knight can attack two connected pawns by using forks and blockades.",
    related: ["END-035", "PRACTICAL-END-049"],
    source: "Knight endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-049",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Knight Endgames",
    title: "Knight and king coordination",
    level: "Intermediate",
    keywords: ["knight", "king", "coordination"],
    questions: [
      "How should king and knight work together?",
      "Why is knight coordination important?"
    ],
    short_answer: "The king should control key squares while the knight attacks pawns or restricts the enemy king.",
    answer: "A knight becomes much stronger when the king takes care of squares the knight cannot control.",
    example: "The king blocks the enemy king while the knight attacks a pawn from a protected square.",
    related: ["END-036", "PRACTICAL-END-047"],
    source: "Knight endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-050",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Knight Endgames",
    title: "Knight on the rim",
    level: "Beginner",
    keywords: ["knight", "rim", "endgame"],
    questions: [
      "Is a knight on the rim always bad in the endgame?",
      "Why should knights avoid the edge?"
    ],
    short_answer: "A knight on the edge controls fewer squares, although it can still be useful in specific positions.",
    answer: "In endgames, mobility is important because the knight may need to switch between targets.",
    example: "A knight in the center can often attack both wings more effectively than one trapped on the edge.",
    related: ["END-035", "END-049"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-051",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Knight Endgames",
    title: "Knight outpost in an endgame",
    level: "Intermediate",
    keywords: ["knight outpost", "endgame", "weak square"],
    questions: [
      "Why is a knight outpost powerful in an endgame?",
      "Can a knight outpost become a winning advantage?"
    ],
    short_answer: "A secure outpost gives the knight stable activity and access to enemy weaknesses.",
    answer: "The knight can attack pawns, restrict the king and support a passed pawn.",
    example: "A protected knight on d5 may attack c7, e7 and f4 while controlling key squares.",
    related: ["END-035", "POSITION-007"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-052",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Queen versus pawn",
    level: "Intermediate",
    keywords: ["queen", "pawn", "promotion"],
    questions: [
      "Can a queen always stop a pawn?",
      "What should I check in queen versus pawn?"
    ],
    short_answer: "Usually the queen wins, but advanced pawns can create surprising tactical situations.",
    answer: "The king's position, promotion square and whether the pawn promotes with check are critical.",
    example: "A pawn on the seventh rank supported by its king can require accurate queen play.",
    related: ["END-044", "PRACTICAL-END-053"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-053",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Queen and pawn versus queen",
    level: "Advanced",
    keywords: ["queen ending", "queen pawn", "promotion"],
    questions: [
      "Is queen and pawn versus queen always winning?",
      "Why are queen endings difficult?"
    ],
    short_answer: "No. Perpetual checks, stalemate ideas and tactical counterplay can make them difficult to win.",
    answer: "King safety and checking distance are often more important than the extra pawn alone.",
    example: "The defending queen may force perpetual check against an exposed king.",
    related: ["END-046", "END-047"],
    source: "Standard queen endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-054",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Avoiding perpetual check",
    level: "Intermediate",
    keywords: ["perpetual check", "queen ending", "king safety"],
    questions: [
      "How can I avoid perpetual check?",
      "What should I do when my opponent keeps checking?"
    ],
    short_answer: "Seek shelter, exchange queens when safe, or move toward a position where checks become ineffective.",
    answer: "Avoid exposing the king unnecessarily when the opponent's queen has active checking routes.",
    example: "Use your own queen to block checking lines or force a queen exchange.",
    related: ["PRACTICAL-END-053", "END-047"],
    source: "Queen endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-055",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Queen checks and king shelter",
    level: "Intermediate",
    keywords: ["queen checks", "king shelter", "queen ending"],
    questions: [
      "Why is king shelter important in queen endings?",
      "How can pawns protect a king from queen checks?"
    ],
    short_answer: "Your own pawns can block checking lines and provide useful shelter.",
    answer: "However, weakened pawn shields can also give the enemy queen checking routes.",
    example: "Keep the king near pawns that restrict the enemy queen's checking angles.",
    related: ["PRACTICAL-END-054", "END-046"],
    source: "Queen endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-056",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Queen exchange in winning endings",
    level: "Intermediate",
    keywords: ["queen exchange", "winning ending", "simplification"],
    questions: [
      "When should I trade queens in a queen ending?",
      "Can a queen exchange remove counterplay?"
    ],
    short_answer: "Yes. A safe queen exchange can eliminate perpetual-check threats and lead to a technically winning ending.",
    answer: "Always calculate the resulting position before exchanging queens.",
    example: "Trade queens if the resulting king-and-pawn ending is clearly winning.",
    related: ["END-048", "END-023"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-057",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Queen Endgames",
    title: "Promotion to a knight",
    level: "Intermediate",
    keywords: ["underpromotion", "knight promotion", "queen ending"],
    questions: [
      "When should I promote to a knight?",
      "Can underpromotion be the best move?"
    ],
    short_answer: "Yes. A knight promotion can give check or avoid stalemate and may be tactically necessary.",
    answer: "Promotion is not always automatically a queen; calculate all promotion choices.",
    example: "A knight promotion can give a checking fork that a queen promotion would not.",
    related: ["MOVE-050", "END-045"],
    source: "FIDE Laws and chess tactics",
    verified: true
  },

  {
    id: "PRACTICAL-END-058",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "King and bishop versus king",
    level: "Beginner",
    keywords: ["bishop", "king", "draw"],
    questions: [
      "Can king and bishop checkmate a king?",
      "Can bishop and king versus king win?"
    ],
    short_answer: "No. King and bishop versus king is a theoretical draw.",
    answer: "A single bishop cannot control enough squares to force checkmate.",
    example: "Even with perfect play, king and bishop cannot checkmate a lone king.",
    related: ["PRACTICAL-END-059", "RULE-010"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-059",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "King and two bishops versus king",
    level: "Intermediate",
    keywords: ["two bishops", "checkmate", "endgame"],
    questions: [
      "Can two bishops checkmate a king?",
      "How do two bishops work together?"
    ],
    short_answer: "Yes. Two bishops can control both square colors and force the enemy king toward the edge.",
    answer: "The bishops work with their king to restrict the enemy king and deliver mate.",
    example: "The king approaches while the bishops form a diagonal barrier.",
    related: ["MATE-035", "PRACTICAL-END-060"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-060",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "King and bishop and knight versus king",
    level: "Advanced",
    keywords: ["bishop knight", "checkmate", "endgame"],
    questions: [
      "Can bishop and knight checkmate a king?",
      "Why is bishop and knight mate difficult?"
    ],
    short_answer: "Yes. It is a forced mate, but the technique requires precise king and piece coordination.",
    answer: "The enemy king must be driven toward a corner controlled by the bishop before the final mating net.",
    example: "The bishop and knight restrict escape squares while the king supports the final mate.",
    related: ["MATE-034", "PRACTICAL-END-061"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-061",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "Bishop and knight mating corner",
    level: "Advanced",
    keywords: ["bishop knight mate", "corner", "checkmate"],
    questions: [
      "Why does the bishop and knight need the correct corner?",
      "How do I force the king into the mating corner?"
    ],
    short_answer: "The bishop controls one color of corner while the knight controls the key escape squares.",
    answer: "The king must cooperate to drive the defending king toward the corner controlled by the bishop.",
    example: "If the enemy king reaches the wrong corner, the bishop and knight must first drive it across the board.",
    related: ["PRACTICAL-END-060", "MATE-034"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-062",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "King and rook versus king",
    level: "Beginner",
    keywords: ["rook", "checkmate", "basic ending"],
    questions: [
      "Can king and rook checkmate a king?",
      "What is the basic rook mate technique?"
    ],
    short_answer: "Yes. The rook cuts off the enemy king while the attacking king approaches.",
    answer: "The rook repeatedly reduces the enemy king's available area until the king reaches the edge.",
    example: "The rook creates a smaller box while the king moves closer.",
    related: ["MATE-035", "PRACTICAL-END-063"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-063",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Minor Piece Endgames",
    title: "King and queen versus king",
    level: "Beginner",
    keywords: ["queen", "checkmate", "basic ending"],
    questions: [
      "Can king and queen checkmate a king?",
      "How do I avoid stalemate with a queen?"
    ],
    short_answer: "Yes. The queen restricts the king while the attacking king approaches for the final mate.",
    answer: "The main practical danger is stalemate when the defending king has no legal move.",
    example: "Keep the queen at a safe distance and use the king to deliver the final support.",
    related: ["MATE-035", "PRACTICAL-END-064"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-064",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Checkmate Technique",
    title: "Avoid stalemate when mating",
    level: "Beginner",
    keywords: ["stalemate", "queen mate", "rook mate"],
    questions: [
      "How do I avoid stalemate with a large advantage?",
      "What should I check before giving the final move?"
    ],
    short_answer: "Make sure the enemy king is in check or has at least one legal move unless the move is checkmate.",
    answer: "Stalemate turns a winning position into a draw.",
    example: "Before restricting the king with a queen, leave a flight square until your king is ready.",
    related: ["END-043", "PRACTICAL-END-063"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "PRACTICAL-END-065",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King Activity",
    title: "King penetration",
    level: "Intermediate",
    keywords: ["king penetration", "king activity", "endgame"],
    questions: [
      "What is king penetration?",
      "Why is king penetration important?"
    ],
    short_answer: "King penetration means entering the opponent's position to attack pawns or important squares.",
    answer: "An active king can create weaknesses that enemy pieces cannot defend simultaneously.",
    example: "A king entering the sixth rank may attack several pawns and force the opponent into passivity.",
    related: ["END-003", "PRACTICAL-END-066"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-066",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King Activity",
    title: "King entry squares",
    level: "Intermediate",
    keywords: ["entry squares", "king", "endgame"],
    questions: [
      "What are king entry squares?",
      "How can I prevent enemy king entry?"
    ],
    short_answer: "They are squares through which a king can penetrate into your position.",
    answer: "Controlling these squares can prevent the opponent from improving the king.",
    example: "Use a rook or minor piece to control the file through which the enemy king wants to enter.",
    related: ["END-055", "PRACTICAL-END-065"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-067",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King Activity",
    title: "King opposition in practical play",
    level: "Beginner",
    keywords: ["opposition", "king", "pawn ending"],
    questions: [
      "How do I use opposition during a game?",
      "What should I calculate when kings face each other?"
    ],
    short_answer: "Determine whose move it is and which king must give way.",
    answer: "The key is not merely facing the enemy king but understanding which side benefits from the next move.",
    example: "Before stepping toward the pawn, calculate whether the move gives away the opposition.",
    related: ["END-005", "END-006"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-068",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King Activity",
    title: "Should the king capture pawns?",
    level: "Beginner",
    keywords: ["king capture", "pawn", "endgame"],
    questions: [
      "Should I use my king to capture pawns?",
      "Can capturing a pawn with the king be dangerous?"
    ],
    short_answer: "Yes, but calculate whether the capture allows counterplay or loses opposition.",
    answer: "A pawn capture can improve material while moving the king away from a critical square.",
    example: "Do not capture a pawn if it allows the opponent's king to enter your position.",
    related: ["END-004", "PRACTICAL-END-066"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-069",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "King Activity",
    title: "Central king versus wing king",
    level: "Intermediate",
    keywords: ["central king", "king activity", "endgame"],
    questions: [
      "Why is a central king usually stronger?",
      "Can a king on the wing be useful?"
    ],
    short_answer: "A central king can reach both wings faster, but a wing king can still be correct for a specific target.",
    answer: "King placement should match the position's immediate demands.",
    example: "A central king can switch from defending a kingside pawn to attacking a queenside pawn.",
    related: ["END-003", "END-038"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-070",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Endgame Transitions",
    title: "Transition into a pawn ending",
    level: "Intermediate",
    keywords: ["pawn ending", "transition", "simplification"],
    questions: [
      "When should I enter a pawn ending?",
      "Why must I calculate before exchanging pieces?"
    ],
    short_answer: "Enter a pawn ending only after calculating the resulting position accurately.",
    answer: "Pawn endings are often irreversible and a single tempo can decide the result.",
    example: "Before trading the final rook, calculate king positions, opposition and promotion races.",
    related: ["END-049", "END-022"],
    source: "Endgame calculation principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-071",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Endgame Transitions",
    title: "Transition into a rook ending",
    level: "Intermediate",
    keywords: ["rook ending", "transition", "exchange"],
    questions: [
      "Should I exchange into a rook ending?",
      "What should I check before entering a rook ending?"
    ],
    short_answer: "Check king activity, pawn structure, rook activity and the opponent's counterplay.",
    answer: "A rook ending with an extra pawn may still be difficult if the defending rook becomes active.",
    example: "Do not trade bishops for rooks automatically if the resulting rook ending is unclear.",
    related: ["PRACTICAL-END-030", "END-022"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-072",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Endgame Transitions",
    title: "Transition into a bishop ending",
    level: "Intermediate",
    keywords: ["bishop ending", "transition", "bishop"],
    questions: [
      "When should I exchange into a bishop ending?",
      "What should I compare before trading pieces?"
    ],
    short_answer: "Compare bishop colors, pawn structure, king activity and passed-pawn potential.",
    answer: "A bishop ending can be winning or drawn depending on these details.",
    example: "An extra pawn may not be enough if opposite-colored bishops create a fortress.",
    related: ["PRACTICAL-END-042", "PRACTICAL-END-043"],
    source: "Bishop endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-073",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Endgame Transitions",
    title: "Transition into a knight ending",
    level: "Intermediate",
    keywords: ["knight ending", "transition", "knight"],
    questions: [
      "When is a knight ending favorable?",
      "What should I check before exchanging bishops for knights?"
    ],
    short_answer: "Look at pawn structure, outposts, king activity and whether the position is open or closed.",
    answer: "Knights can be excellent against fixed pawns but may struggle when targets are widely separated.",
    example: "A protected knight outpost can make a knight ending highly favorable.",
    related: ["PRACTICAL-END-049", "END-034"],
    source: "Knight endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-074",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Endgame Transitions",
    title: "Trade into the right ending",
    level: "Intermediate",
    keywords: ["exchange", "endgame transition", "decision"],
    questions: [
      "How do I choose the right endgame?",
      "What makes one endgame better than another?"
    ],
    short_answer: "Choose the ending where your king, pieces, pawns and targets are more favorable.",
    answer: "Material count alone does not determine whether an exchange is good.",
    example: "A bishop ending may be favorable while a rook ending from the same position could be drawn.",
    related: ["END-022", "PRACTICAL-END-070"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-075",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Build a blockade",
    level: "Intermediate",
    keywords: ["blockade", "defense", "passed pawn"],
    questions: [
      "How can I defend against a passed pawn?",
      "Why is a blockade effective?"
    ],
    short_answer: "Place a king or piece directly in front of the passed pawn and prevent its advance.",
    answer: "A blockade gives the defender time to attack the pawn from another direction.",
    example: "A knight on the promotion path may completely stop an isolated passed pawn.",
    related: ["PRACTICAL-END-012", "END-042"],
    source: "Chess endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-076",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Keep checking in a difficult rook ending",
    level: "Intermediate",
    keywords: ["checking", "rook defense", "draw"],
    questions: [
      "Should I keep checking in a losing rook ending?",
      "Can checks save a rook ending?"
    ],
    short_answer: "Repeated checks can create counterplay and sometimes force a draw.",
    answer: "Do not check randomly; maintain enough distance and look for perpetual-check or pawn-winning opportunities.",
    example: "Check the attacking king from the side while attacking its passed pawn.",
    related: ["PRACTICAL-END-037", "END-041"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-077",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Sacrifice material for a draw",
    level: "Intermediate",
    keywords: ["sacrifice", "draw", "defense"],
    questions: [
      "Can I sacrifice a pawn to draw an endgame?",
      "When is giving material correct?"
    ],
    short_answer: "Yes. A material sacrifice can create a fortress, perpetual checks or a decisive blockade.",
    answer: "Material should be evaluated together with activity and drawing resources.",
    example: "Giving up a pawn may allow the rook to become active enough to check the enemy king forever.",
    related: ["END-040", "END-042"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-078",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Perpetual check as a defensive resource",
    level: "Intermediate",
    keywords: ["perpetual check", "defense", "queen ending"],
    questions: [
      "Can perpetual check save an endgame?",
      "When should I seek perpetual check?"
    ],
    short_answer: "Yes. If you cannot improve the position, perpetual checks may force a draw.",
    answer: "This is especially important in queen endings where the defending queen can check from a safe distance.",
    example: "An exposed king may be unable to escape repeated queen checks.",
    related: ["PRACTICAL-END-054", "END-047"],
    source: "Standard chess principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-079",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Find counterplay",
    level: "Beginner",
    keywords: ["counterplay", "defense", "endgame"],
    questions: [
      "What should I do when my endgame is worse?",
      "Why is counterplay important?"
    ],
    short_answer: "Create threats so the stronger side cannot improve freely.",
    answer: "Active counterplay is often the best practical defense.",
    example: "Attack a pawn on the opposite wing while the enemy king is busy advancing.",
    related: ["END-041", "PRACTICAL-END-033"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-080",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Defensive Endgames",
    title: "Do not abandon your blockade",
    level: "Intermediate",
    keywords: ["blockade", "defense", "passed pawn"],
    questions: [
      "Should I leave a blockade to attack elsewhere?",
      "When can a blockade be abandoned?"
    ],
    short_answer: "Only leave the blockade when you have calculated that the passed pawn cannot become dangerous.",
    answer: "A passed pawn can suddenly become decisive if the blockade disappears.",
    example: "Move the blocking knight only after confirming that another piece can stop promotion.",
    related: ["PRACTICAL-END-075", "END-044"],
    source: "Endgame defensive principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-081",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Fortresses",
    title: "Fortress with blocked pawns",
    level: "Intermediate",
    keywords: ["fortress", "blocked pawns", "draw"],
    questions: [
      "How can blocked pawns create a fortress?",
      "Can a material advantage be useless against a fortress?"
    ],
    short_answer: "Yes. If the stronger side cannot penetrate or create a breakthrough, the position may be drawn.",
    answer: "A fortress depends on the defender maintaining the correct structure and preventing entry.",
    example: "A closed pawn structure may prevent a stronger bishop from attacking the defending king.",
    related: ["END-042", "PRACTICAL-END-082"],
    source: "Standard endgame concept",
    verified: true
  },

  {
    id: "PRACTICAL-END-082",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Fortresses",
    title: "How to break a fortress",
    level: "Advanced",
    keywords: ["fortress", "breakthrough", "endgame"],
    questions: [
      "How can I try to break a fortress?",
      "What should I look for against a fortress?"
    ],
    short_answer: "Look for pawn breaks, king entry, zugzwang or a second weakness.",
    answer: "A fortress usually survives because the stronger side cannot make progress, so create a new source of play.",
    example: "A pawn break on the opposite wing may force the defender to abandon its ideal setup.",
    related: ["END-039", "PRACTICAL-END-020"],
    source: "Advanced endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-083",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Improve the worst piece",
    level: "Beginner",
    keywords: ["worst piece", "improvement", "endgame"],
    questions: [
      "What should I do when I have no clear plan?",
      "Why improve my worst piece?"
    ],
    short_answer: "Improving the least active piece is often the safest practical plan.",
    answer: "Endgames reward coordination, so even a small improvement can create a concrete threat.",
    example: "Move a passive rook to an open file before starting a pawn advance.",
    related: ["END-026", "PRACTICAL-END-084"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-084",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Create a target",
    level: "Beginner",
    keywords: ["target", "weakness", "endgame"],
    questions: [
      "How do I create a target in an endgame?",
      "What should I attack?"
    ],
    short_answer: "Attack weak pawns, restricted pieces or vulnerable king positions.",
    answer: "A clear target gives your pieces a purpose and often forces the opponent into passive defense.",
    example: "Use the king to attack an isolated pawn while the rook controls the open file.",
    related: ["END-019", "END-039"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-085",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Fix before attacking",
    level: "Intermediate",
    keywords: ["fix pawn", "target", "endgame"],
    questions: [
      "Why should I fix a pawn before attacking it?",
      "How does fixing a weakness help?"
    ],
    short_answer: "A fixed pawn cannot easily escape and becomes a stable target.",
    answer: "After fixing the weakness, bring your king or pieces closer to attack it.",
    example: "Prevent an isolated pawn from advancing before doubling your pieces against it.",
    related: ["PRACTICAL-END-019", "PRACTICAL-END-084"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-086",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Two weaknesses strategy",
    level: "Intermediate",
    keywords: ["two weaknesses", "endgame", "targets"],
    questions: [
      "How can I win by creating two weaknesses?",
      "Why is one target sometimes not enough?"
    ],
    short_answer: "A second weakness can overload the defender and create a breakthrough.",
    answer: "Move the king or pieces between targets until the defender cannot cover both.",
    example: "Attack a queenside pawn while forcing the defending rook to guard a kingside weakness.",
    related: ["END-039", "PRACTICAL-END-084"],
    source: "Chess endgame strategy",
    verified: true
  },

  {
    id: "PRACTICAL-END-087",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Do not rush pawn advances",
    level: "Beginner",
    keywords: ["pawn advance", "endgame", "patience"],
    questions: [
      "Why should I avoid rushing pawn moves?",
      "Can a pawn move make my position worse?"
    ],
    short_answer: "Yes. A pawn move is often irreversible and can create weaknesses or lose a useful tempo.",
    answer: "Improve your king or pieces first when there is no immediate need to advance.",
    example: "Keep a pawn on its current square so you retain a reserve tempo for a future zugzwang.",
    related: ["END-013", "END-051"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-088",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Calculate the opponent's plan",
    level: "Beginner",
    keywords: ["opponent plan", "calculation", "endgame"],
    questions: [
      "What should I ask before making an endgame move?",
      "How do I stop my opponent's plan?"
    ],
    short_answer: "Ask what the opponent would play if you made a waiting move.",
    answer: "This simple question often reveals threats such as king penetration, pawn promotion or a tactical exchange.",
    example: "If the opponent plans to activate the king, use a move that restricts its entry square.",
    related: ["CALC-006", "END-055"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-089",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Avoid unnecessary checks",
    level: "Intermediate",
    keywords: ["checks", "rook", "endgame"],
    questions: [
      "Are checks always good in endgames?",
      "Can unnecessary checks hurt my position?"
    ],
    short_answer: "No. A check is useful only if it improves your position or creates a concrete threat.",
    answer: "Unnecessary checks can lose tempi or drive the enemy king toward a better square.",
    example: "Do not check a king if the check helps it approach your weak pawn.",
    related: ["PRACTICAL-END-023", "PRACTICAL-END-088"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-090",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Technique",
    title: "Use zugzwang practically",
    level: "Advanced",
    keywords: ["zugzwang", "endgame", "tempo"],
    questions: [
      "How can I create zugzwang?",
      "When should I look for zugzwang?"
    ],
    short_answer: "Restrict the opponent until every legal move creates a weakness.",
    answer: "Zugzwang works best when the opponent has few useful moves and your position can wait.",
    example: "Keep your king on a key square while forcing the opponent to move a pawn.",
    related: ["END-012", "PRACTICAL-END-011"],
    source: "Standard endgame theory",
    verified: true
  },

  {
    id: "PRACTICAL-END-091",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Time Management",
    title: "Use your clock in endgames",
    level: "Beginner",
    keywords: ["time management", "endgame", "clock"],
    questions: [
      "How should I manage time in an endgame?",
      "Should I calculate every endgame move deeply?"
    ],
    short_answer: "Spend time on critical irreversible decisions and use known techniques quickly.",
    answer: "Do not waste time recalculating basic theoretical positions, but slow down before pawn exchanges and promotion races.",
    example: "Use extra time before entering a pawn ending but play a known Lucena technique efficiently.",
    related: ["TOURNAMENT-041", "END-049"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "PRACTICAL-END-092",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Time Management",
    title: "Endgame under time pressure",
    level: "Intermediate",
    keywords: ["time pressure", "endgame", "clock"],
    questions: [
      "What should I do in an endgame with little time?",
      "How can I reduce blunders under time pressure?"
    ],
    short_answer: "Use simple active moves, avoid unnecessary complications and check immediate threats before moving.",
    answer: "Known endgame principles can save time, but critical pawn races still require exact calculation.",
    example: "Centralize the king when safe instead of searching for a complicated plan.",
    related: ["PRACTICAL-END-091", "END-059"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "PRACTICAL-END-093",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Blunders",
    title: "Common endgame blunder: automatic pawn push",
    level: "Beginner",
    keywords: ["pawn push", "blunder", "endgame"],
    questions: [
      "What is a common endgame mistake?",
      "Why is automatic pawn pushing dangerous?"
    ],
    short_answer: "A pawn push can lose a critical tempo, square or promotion opportunity.",
    answer: "Because pawns cannot move backward, every pawn move should have a purpose.",
    example: "Pushing a pawn may remove the only reserve tempo needed to win opposition.",
    related: ["PRACTICAL-END-087", "END-013"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-094",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Blunders",
    title: "Common endgame blunder: passive rook",
    level: "Beginner",
    keywords: ["passive rook", "blunder", "rook ending"],
    questions: [
      "Why is a passive rook a common endgame mistake?",
      "How can I avoid passive rook play?"
    ],
    short_answer: "Keep the rook active whenever possible and look for checks, targets and counterplay.",
    answer: "A passive rook may allow the enemy king to penetrate and create a second weakness.",
    example: "Instead of defending one pawn forever, attack an enemy pawn from the side.",
    related: ["PRACTICAL-END-034", "PRACTICAL-END-033"],
    source: "Rook endgame principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-095",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Blunders",
    title: "Common endgame blunder: wrong exchange",
    level: "Intermediate",
    keywords: ["wrong exchange", "simplification", "endgame"],
    questions: [
      "Why can exchanging the wrong piece lose an endgame?",
      "Should I always simplify when ahead?"
    ],
    short_answer: "The wrong exchange may remove your strongest piece or create a drawn position.",
    answer: "Compare the resulting positions before exchanging.",
    example: "Trading an active rook for a passive rook may remove your winning advantage.",
    related: ["END-022", "PRACTICAL-END-074"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-096",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Blunders",
    title: "Common endgame blunder: ignoring stalemate",
    level: "Beginner",
    keywords: ["stalemate", "blunder", "endgame"],
    questions: [
      "Why do players stalemate winning positions?",
      "How can I prevent a stalemate blunder?"
    ],
    short_answer: "Always check the opponent's legal moves before a forcing move that restricts the king.",
    answer: "Stalemate is especially easy to miss when the opponent has only a king.",
    example: "Before removing the final escape square, make sure the king is actually in check.",
    related: ["END-043", "PRACTICAL-END-064"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "PRACTICAL-END-097",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Blunders",
    title: "Common endgame blunder: ignoring promotion",
    level: "Beginner",
    keywords: ["promotion", "blunder", "passed pawn"],
    questions: [
      "Why must I always watch promotion threats?",
      "What happens if I ignore an enemy passed pawn?"
    ],
    short_answer: "A passed pawn can become a queen very quickly if not controlled.",
    answer: "Before making a move elsewhere, check every enemy passed pawn and its promotion route.",
    example: "A quiet king move can lose instantly if an enemy pawn promotes with check.",
    related: ["END-044", "PRACTICAL-END-008"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-098",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Study",
    title: "How to study practical endgames",
    level: "Beginner",
    keywords: ["endgame training", "study", "practice"],
    questions: [
      "How should I practice endgames?",
      "What endgames should a beginner learn first?"
    ],
    short_answer: "Start with king-and-pawn endings, basic mates, basic rook endings and fundamental minor-piece endings.",
    answer: "Learn the idea, practice positions against an opponent or engine, and repeat until the technique becomes automatic.",
    example: "Practice opposition and Lucena positions from both sides of the board.",
    related: ["END-056", "TRAIN-001"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-099",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Practical Training",
    title: "Play endgames from positions",
    level: "Intermediate",
    keywords: ["endgame practice", "training", "positions"],
    questions: [
      "Is it useful to practice from endgame positions?",
      "How can I improve practical endgame skill?"
    ],
    short_answer: "Yes. Starting from realistic endgame positions gives focused practical experience.",
    answer: "Play both winning and defensive sides so you learn how to convert advantages and create resistance.",
    example: "Set up a rook-and-pawn versus rook position and practice the winning and drawing techniques.",
    related: ["PRACTICAL-END-098", "TRAIN-020"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "PRACTICAL-END-100",
    type: "ENDGAME",
    category: "Practical Endgames",
    topic: "Practical Endgames",
    subtopic: "Master Checklist",
    title: "Practical endgame checklist",
    level: "Beginner",
    keywords: ["endgame checklist", "king", "rook", "pawn", "technique"],
    questions: [
      "What should I remember in a practical endgame?",
      "What is the complete endgame checklist?"
    ],
    short_answer: "Check king activity, passed pawns, promotion threats, piece activity, weaknesses, exchanges and counterplay.",
    answer: "Before every critical move ask: What is my opponent threatening? Which king is more active? Can I create or stop a passed pawn? Is an exchange favorable? What happens after the pawn move?",
    example: "Improve your king, activate your piece, restrict the enemy king, create a target and calculate every irreversible move.",
    related: ["END-059", "PRACTICAL-END-040", "PRACTICAL-END-098"],
    source: "Chess coaching framework",
    verified: true
  }

];

export default practicalEndgames;