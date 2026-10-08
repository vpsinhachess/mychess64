const openingPrinciples = [
  {
    id: "OPENING-001",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Goals",
    title: "What is the main goal of the opening?",
    level: "Beginner",
    keywords: ["opening", "goal", "development"],
    questions: [
      "What should I try to achieve in the opening?",
      "What is the main purpose of the opening?"
    ],
    short_answer: "Develop your pieces, control the center, and get your king safe.",
    answer: "A good opening usually aims for development, central control, king safety, and harmonious piece placement.",
    example: "After 1.e4, develop a knight and bishop and prepare to castle.",
    related: ["OPENING-002", "OPENING-003", "OPENING-006"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-002",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Center",
    title: "Why is the center important in the opening?",
    level: "Beginner",
    keywords: ["center", "opening", "central control"],
    questions: [
      "Why should I control the center?",
      "Why is the center important in chess openings?"
    ],
    short_answer: "Central control gives your pieces more space and useful routes.",
    answer: "Pieces generally become more active when they can influence central squares.",
    example: "1.e4 controls d5 and f5 and supports central development.",
    related: ["OPENING-003", "OPENING-004"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-003",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Center",
    title: "Should I occupy or control the center?",
    level: "Intermediate",
    keywords: ["center", "occupy", "control"],
    questions: [
      "Must I put pawns in the center?",
      "Is controlling the center enough?"
    ],
    short_answer: "You can occupy the center, control it from a distance, or combine both approaches.",
    answer: "Openings use different methods of central control depending on the position.",
    example: "The King's Indian often allows White a large center before challenging it.",
    related: ["OPENING-002", "THEORY-073"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-004",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Center",
    title: "Which squares are the central four?",
    level: "Beginner",
    keywords: ["center", "d4", "e4", "d5", "e5"],
    questions: [
      "What are the four central squares?",
      "Which squares make up the chess center?"
    ],
    short_answer: "The central four squares are d4, e4, d5, and e5.",
    answer: "These squares are the core of the traditional chess center.",
    example: "1.d4 directly occupies one of the central squares.",
    related: ["BASIC-026", "OPENING-002"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-005",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Center",
    title: "Should I always play a central pawn move first?",
    level: "Intermediate",
    keywords: ["central pawn", "opening", "first move"],
    questions: [
      "Must my first move be a central pawn move?",
      "Is 1.e4 or 1.d4 always best?"
    ],
    short_answer: "No. Central pawn moves are common, but other opening moves can also be sound.",
    answer: "Moves such as 1.Nf3 and 1.c4 can also fight for the center.",
    example: "The English Opening begins with 1.c4 and still strongly influences the center.",
    related: ["OPENING-002", "THEORY-074"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-006",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "What does development mean?",
    level: "Beginner",
    keywords: ["development", "pieces", "opening"],
    questions: [
      "What is development in chess?",
      "What does developing a piece mean?"
    ],
    short_answer: "Development means bringing your pieces from their starting squares to useful active squares.",
    answer: "Knights and bishops are commonly developed early.",
    example: "Nf3 develops the g1 knight toward the center.",
    related: ["OPENING-007", "OPENING-008"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-007",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Why should I develop pieces quickly?",
    level: "Beginner",
    keywords: ["development", "tempo", "activity"],
    questions: [
      "Why is quick development important?",
      "Why should I develop my pieces early?"
    ],
    short_answer: "Development brings more pieces into the game and improves your ability to fight for the center.",
    answer: "An undeveloped army has fewer active defenders and attackers.",
    example: "Developing both knights and bishops usually gives you more options than moving the same piece repeatedly.",
    related: ["OPENING-006", "OPENING-009"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-008",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Which pieces should I develop first?",
    level: "Beginner",
    keywords: ["development", "knights", "bishops"],
    questions: [
      "Which pieces should I develop first?",
      "Should knights or bishops come out first?"
    ],
    short_answer: "Knights and bishops are usually developed before rooks and the queen.",
    answer: "Minor pieces can develop naturally while preparing castling and central control.",
    example: "Nf3 and Bc4 are typical early developing moves.",
    related: ["OPENING-006", "OPENING-012"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-009",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Should I move the same piece twice in the opening?",
    level: "Intermediate",
    keywords: ["same piece", "tempo", "development"],
    questions: [
      "Is moving the same piece twice bad?",
      "Should I avoid moving one piece twice?"
    ],
    short_answer: "Usually avoid it unless the second move has a clear purpose.",
    answer: "Repeated moves can lose time, but tactical or strategic reasons can justify them.",
    example: "A knight may move twice if the first move was challenged or the second move gains something important.",
    related: ["OPENING-010", "OPENING-017"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-010",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Tempo",
    title: "What is a tempo in the opening?",
    level: "Beginner",
    keywords: ["tempo", "time", "opening"],
    questions: [
      "What does tempo mean in chess?",
      "Why is a tempo important in the opening?"
    ],
    short_answer: "A tempo is effectively one move or unit of useful time.",
    answer: "Gaining a tempo means accomplishing something while forcing or encouraging the opponent to spend a move.",
    example: "Developing a piece while attacking the enemy queen can gain useful time.",
    related: ["OPENING-011", "OPENING-017"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "OPENING-011",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Tempo",
    title: "What does losing a tempo mean?",
    level: "Intermediate",
    keywords: ["tempo", "lost tempo", "opening"],
    questions: [
      "What does it mean to lose a tempo?",
      "Why is a wasted move called a lost tempo?"
    ],
    short_answer: "It means spending a move without achieving enough useful progress compared with the opponent.",
    answer: "In sharp openings, even one extra move can matter.",
    example: "Moving a developed piece back to its original square without purpose can lose time.",
    related: ["OPENING-009", "OPENING-010"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-012",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Queen",
    title: "Should I develop my queen early?",
    level: "Beginner",
    keywords: ["queen", "development", "opening"],
    questions: [
      "Should I bring my queen out early?",
      "Is early queen development bad?"
    ],
    short_answer: "Usually the queen should not come out too early unless there is a clear reason.",
    answer: "An early queen can become a target for developing enemy pieces.",
    example: "Qh5 can be strong in some openings but may allow Nc6 or other tempo-gaining moves.",
    related: ["OPENING-013", "OPENING-014"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-013",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Queen",
    title: "Why can an early queen move lose time?",
    level: "Intermediate",
    keywords: ["queen", "tempo", "development"],
    questions: [
      "Why is an early queen often attacked?",
      "How can early queen development waste time?"
    ],
    short_answer: "The opponent can often develop a piece while attacking the queen.",
    answer: "The queen may then need to move again instead of another piece being developed.",
    example: "A queen on d4 may be attacked by Nc6, forcing another queen move.",
    related: ["OPENING-010", "OPENING-012"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-014",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Queen",
    title: "Is an early queen move always bad?",
    level: "Intermediate",
    keywords: ["queen", "opening", "principles"],
    questions: [
      "Can an early queen move be good?",
      "Is bringing out the queen early always a mistake?"
    ],
    short_answer: "No. An early queen move can be justified by tactics, threats, or opening theory.",
    answer: "The principle is a guideline, not an absolute rule.",
    example: "The Scandinavian Defense begins with 1.e4 d5 and may lead to early queen development after 2.exd5 Qxd5.",
    related: ["OPENING-012", "THEORY-053"],
    source: "Opening theory and standard principles",
    verified: true
  },
  {
    id: "OPENING-015",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "King Safety",
    title: "Why is king safety important?",
    level: "Beginner",
    keywords: ["king safety", "opening", "king"],
    questions: [
      "Why should I protect my king early?",
      "Why is king safety a major opening goal?"
    ],
    short_answer: "A safe king is less vulnerable to early tactical attacks.",
    answer: "Castling is one of the main ways to improve king safety and connect the rooks.",
    example: "After developing the kingside pieces, White often castles O-O.",
    related: ["OPENING-016", "OPENING-018"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-016",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Castling",
    title: "Why should I castle?",
    level: "Beginner",
    keywords: ["castling", "king safety", "rook"],
    questions: [
      "Why is castling useful?",
      "What are the benefits of castling?"
    ],
    short_answer: "Castling usually improves king safety and activates a rook.",
    answer: "It moves the king toward a safer position and brings a rook closer to the center.",
    example: "O-O places the king on g1 and rook on f1.",
    related: ["MOVE-024", "OPENING-015"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-017",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Castling",
    title: "Should I castle as soon as possible?",
    level: "Intermediate",
    keywords: ["castling", "king safety", "opening"],
    questions: [
      "Should I always castle immediately?",
      "Is early castling always best?"
    ],
    short_answer: "Castle when it is safe and useful, but do not treat it as an automatic move.",
    answer: "Sometimes the position requires delaying castling or choosing the opposite side.",
    example: "If castling kingside walks into a strong attack, waiting may be better.",
    related: ["OPENING-015", "OPENING-018"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-018",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Castling",
    title: "Can castling be dangerous?",
    level: "Intermediate",
    keywords: ["castling", "king safety", "attack"],
    questions: [
      "Can castling make my king less safe?",
      "Can castling into an attack be bad?"
    ],
    short_answer: "Yes. Castling is not automatically safe if the chosen side is vulnerable.",
    answer: "Pawn storms, open files, or strong attacking pieces can make one side of the board dangerous.",
    example: "Castling opposite an enemy pawn storm may create a sharp attacking race.",
    related: ["OPENING-017", "OPENING-031"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-019",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Rooks",
    title: "When do rooks become active in the opening?",
    level: "Beginner",
    keywords: ["rook", "development", "opening"],
    questions: [
      "How do I activate my rooks?",
      "Why are rooks usually developed later?"
    ],
    short_answer: "Rooks become easier to activate after the king castles and the central pieces develop.",
    answer: "Castling often connects or brings a rook closer to useful files.",
    example: "After O-O, the rook on f1 can potentially use the f-file.",
    related: ["OPENING-016", "OPENING-020"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-020",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Rooks",
    title: "What does connecting the rooks mean?",
    level: "Beginner",
    keywords: ["rooks", "connected rooks", "opening"],
    questions: [
      "What does it mean to connect the rooks?",
      "Why are connected rooks useful?"
    ],
    short_answer: "The rooks are connected when no piece stands between them on their back rank.",
    answer: "This usually means the king has castled and the queen and minor pieces have moved away.",
    example: "After developing the queen and castling, White's rooks may have an open path between them.",
    related: ["OPENING-019", "OPENING-021"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-021",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Rooks",
    title: "Where should I place my rook in the opening?",
    level: "Intermediate",
    keywords: ["rook", "open file", "opening"],
    questions: [
      "Where should my rook go after development?",
      "Which file should I put my rook on?"
    ],
    short_answer: "Place the rook on a useful open, semi-open, or strategically important file.",
    answer: "The best rook square depends on pawn structure and the position's plans.",
    example: "A rook may move to an open d-file to pressure a weak pawn.",
    related: ["NOTATION-052", "OPENING-019"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-022",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Moves",
    title: "Should I move many pawns in the opening?",
    level: "Beginner",
    keywords: ["pawn moves", "opening", "development"],
    questions: [
      "Is moving too many pawns in the opening bad?",
      "Why should I avoid unnecessary pawn moves?"
    ],
    short_answer: "Avoid unnecessary pawn moves because they do not develop pieces and can create weaknesses.",
    answer: "Pawn moves can be useful, but each should have a clear purpose.",
    example: "Moving a3 and h3 without a reason may delay development.",
    related: ["OPENING-023", "OPENING-007"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-023",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Moves",
    title: "Are all pawn moves bad for development?",
    level: "Intermediate",
    keywords: ["pawn", "development", "opening"],
    questions: [
      "Can pawn moves be good in the opening?",
      "Why are some pawn moves necessary?"
    ],
    short_answer: "Yes. Pawn moves can control the center, open lines, support pieces, or create king safety.",
    answer: "The key is to avoid pawn moves that do not contribute to the position.",
    example: "h3 can prevent a pin or prepare a useful retreat square for a bishop.",
    related: ["OPENING-022", "OPENING-024"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-024",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Structure",
    title: "Why should I care about pawn structure in the opening?",
    level: "Intermediate",
    keywords: ["pawn structure", "opening", "weakness"],
    questions: [
      "Why is pawn structure important so early?",
      "Can an opening move create long-term weaknesses?"
    ],
    short_answer: "Opening pawn moves can determine long-term strengths and weaknesses.",
    answer: "Pawn structures influence open files, weak squares, piece activity, and endgames.",
    example: "An isolated pawn may remain a strategic feature long after the opening ends.",
    related: ["BASIC-038", "POSITION-001"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-025",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Activity",
    title: "What makes an opening piece active?",
    level: "Beginner",
    keywords: ["piece activity", "development", "opening"],
    questions: [
      "What is an active piece?",
      "How do I make my pieces active in the opening?"
    ],
    short_answer: "An active piece influences useful squares, lines, targets, or the center.",
    answer: "Good development places pieces where they can contribute immediately or soon.",
    example: "A knight on f3 controls central squares and supports king safety.",
    related: ["OPENING-006", "OPENING-026"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-026",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Activity",
    title: "Should I put every piece on the best possible square?",
    level: "Intermediate",
    keywords: ["piece placement", "opening", "development"],
    questions: [
      "How do I choose a good square for a piece?",
      "What makes a developing square good?"
    ],
    short_answer: "Choose a square that supports your current plan and remains useful after development.",
    answer: "The best square depends on the pawn structure, opponent's setup, and tactical details.",
    example: "A bishop may prefer e2 in one position and c4 in another.",
    related: ["OPENING-025", "OPENING-036"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-027",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Coordination",
    title: "What does coordination mean in the opening?",
    level: "Intermediate",
    keywords: ["coordination", "pieces", "opening"],
    questions: [
      "What is piece coordination?",
      "Why should my pieces work together?"
    ],
    short_answer: "Coordination means placing pieces so they support each other and work toward common goals.",
    answer: "Well-coordinated pieces create stronger threats and better defense.",
    example: "A queen and bishop can coordinate against a weak king position.",
    related: ["OPENING-028", "OPENING-035"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-028",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Coordination",
    title: "Why should I avoid isolated piece moves?",
    level: "Intermediate",
    keywords: ["coordination", "pieces", "opening"],
    questions: [
      "Why should my pieces support each other?",
      "What happens when pieces are poorly coordinated?"
    ],
    short_answer: "Poorly coordinated pieces can become targets and may struggle to defend each other.",
    answer: "Good coordination makes tactical and positional play easier.",
    example: "An unsupported queen deep in enemy territory can become vulnerable.",
    related: ["OPENING-027", "OPENING-013"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-029",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opponent Awareness",
    title: "Should I follow opening principles without watching my opponent?",
    level: "Beginner",
    keywords: ["opening", "opponent", "principles"],
    questions: [
      "Can I play opening principles automatically?",
      "Should I always follow the same opening plan?"
    ],
    short_answer: "No. Opening principles must be balanced with the opponent's threats and plans.",
    answer: "Chess is a two-player game, so every move should consider what the opponent is doing.",
    example: "If your opponent attacks your center, you may need to respond instead of continuing development automatically.",
    related: ["OPENING-030", "THINK-001"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-030",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opponent Awareness",
    title: "What should I ask after every opening move?",
    level: "Beginner",
    keywords: ["opening", "thinking", "opponent"],
    questions: [
      "What should I check before making my next opening move?",
      "What question should I ask after my opponent moves?"
    ],
    short_answer: "Ask: What changed, what is threatened, and what is my best response?",
    answer: "This prevents you from playing opening moves mechanically.",
    example: "After ...Bg4, check whether your queen, knight, or king has become tactically vulnerable.",
    related: ["OPENING-029", "THINK-002"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "OPENING-031",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "King Safety",
    title: "Should I castle on the same side as my opponent?",
    level: "Intermediate",
    keywords: ["castling", "same side", "king safety"],
    questions: [
      "Is same-side castling safer?",
      "Should both players castle on the same side?"
    ],
    short_answer: "It can be safe, but the answer depends on the position.",
    answer: "Same-side castling often gives similar king structures, while opposite-side castling can create sharper attacks.",
    example: "Both kings on the kingside can lead to attacks in the center or on the opposite wing.",
    related: ["OPENING-018", "OPENING-032"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-032",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "King Safety",
    title: "Why is opposite-side castling sharp?",
    level: "Intermediate",
    keywords: ["opposite castling", "attack", "king"],
    questions: [
      "Why is opposite-side castling dangerous?",
      "Why do opposite-side castling positions become tactical?"
    ],
    short_answer: "Each player can often attack the opponent's king with pawns without immediately exposing their own king.",
    answer: "Pawn storms and open lines can create fast attacking races.",
    example: "White may attack a queenside king with a-b-c pawns while Black attacks a kingside king with f-g-h pawns.",
    related: ["OPENING-031", "OPENING-033"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-033",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "King Safety",
    title: "What is a pawn storm?",
    level: "Intermediate",
    keywords: ["pawn storm", "attack", "king"],
    questions: [
      "What is a pawn storm?",
      "How are pawn storms used in chess?"
    ],
    short_answer: "A pawn storm is an aggressive advance of several pawns toward the opponent's king.",
    answer: "It can open files and create attacking routes for pieces.",
    example: "In opposite-side castling positions, advancing the g- and h-pawns can start a king attack.",
    related: ["OPENING-032", "ATTACK-001"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "OPENING-034",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Should I develop both knights?",
    level: "Beginner",
    keywords: ["knights", "development", "opening"],
    questions: [
      "Should both knights be developed early?",
      "Why are knights commonly developed first?"
    ],
    short_answer: "Usually yes, if their squares are useful and the position allows it.",
    answer: "Knights often develop naturally toward the center and help prepare castling.",
    example: "Nf3 and Nc3 are common developing moves for White.",
    related: ["OPENING-006", "OPENING-008"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-035",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Should I develop bishops before rooks?",
    level: "Beginner",
    keywords: ["bishops", "rooks", "development"],
    questions: [
      "Why are bishops developed before rooks?",
      "Should rooks wait until the minor pieces develop?"
    ],
    short_answer: "Usually, because bishops and knights can develop while rooks remain restricted by the starting position.",
    answer: "Rooks often become more active after castling and opening files.",
    example: "Bf4 and Nf3 are natural early moves, while Ra1 often waits.",
    related: ["OPENING-008", "OPENING-019"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-036",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "What is the best square for a developing piece?",
    level: "Intermediate",
    keywords: ["piece placement", "development", "opening"],
    questions: [
      "How do I choose a development square?",
      "What should I consider when developing a piece?"
    ],
    short_answer: "Choose a square that improves activity, supports your plan, and is tactically safe.",
    answer: "The best square is position-dependent rather than fixed.",
    example: "A bishop may develop to g2 in a fianchetto or c4 in an open center.",
    related: ["OPENING-026", "OPENING-037"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-037",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Should I develop toward the center?",
    level: "Beginner",
    keywords: ["development", "center", "pieces"],
    questions: [
      "Why should pieces move toward the center?",
      "Are central squares usually good for developing pieces?"
    ],
    short_answer: "Central squares often give pieces greater mobility and influence.",
    answer: "This is a useful guideline, but tactical and positional considerations can override it.",
    example: "Nf3 usually gives a knight more influence than a passive edge square.",
    related: ["OPENING-002", "OPENING-036"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-038",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Activity",
    title: "What is a passive piece?",
    level: "Intermediate",
    keywords: ["passive piece", "activity", "opening"],
    questions: [
      "What is a passive piece?",
      "Why is passive development bad?"
    ],
    short_answer: "A passive piece has limited activity or useful influence.",
    answer: "Passive pieces may struggle to contribute to attack, defense, or central control.",
    example: "A bishop blocked by its own pawns may be temporarily passive.",
    related: ["OPENING-025", "OPENING-039"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "OPENING-039",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Activity",
    title: "Can a temporarily passive piece be acceptable?",
    level: "Intermediate",
    keywords: ["passive piece", "opening", "strategy"],
    questions: [
      "Is a passive piece always bad?",
      "Can a piece be passive for a good reason?"
    ],
    short_answer: "Yes. A temporary passive position can be justified by a concrete plan.",
    answer: "Some openings deliberately accept limited activity to build a strong structure or prepare a later break.",
    example: "A bishop may remain behind a pawn chain until a pawn break opens its diagonal.",
    related: ["OPENING-038", "OPENING-044"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-040",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Breaks",
    title: "What is a pawn break?",
    level: "Intermediate",
    keywords: ["pawn break", "opening", "pawn"],
    questions: [
      "What is a pawn break?",
      "Why are pawn breaks important in openings?"
    ],
    short_answer: "A pawn break is a pawn advance or exchange intended to challenge the opponent's structure or open lines.",
    answer: "Pawn breaks often determine the strategic direction of an opening.",
    example: "The ...c5 break can challenge a white pawn center.",
    related: ["OPENING-041", "MIDDLE-001"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "OPENING-041",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Breaks",
    title: "When should I play a pawn break?",
    level: "Intermediate",
    keywords: ["pawn break", "timing", "opening"],
    questions: [
      "How do I know when to play a pawn break?",
      "Why is timing important for pawn breaks?"
    ],
    short_answer: "Play a pawn break when it improves your position or challenges an important enemy feature.",
    answer: "The right timing depends on development, king safety, tactics, and resulting pawn structure.",
    example: "Opening the center while your king is exposed can backfire.",
    related: ["OPENING-040", "OPENING-042"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-042",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Decisions",
    title: "Should I open the center when my king is uncastled?",
    level: "Intermediate",
    keywords: ["center", "king safety", "opening"],
    questions: [
      "Is opening the center dangerous when my king is uncastled?",
      "Should I avoid central exchanges before castling?"
    ],
    short_answer: "Often yes, because opening the center can expose an uncastled king.",
    answer: "But concrete tactics may make opening the center correct.",
    example: "If your opponent's king is also exposed, opening the center may create stronger threats for you.",
    related: ["OPENING-015", "OPENING-041"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-043",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Center",
    title: "When should I exchange central pawns?",
    level: "Intermediate",
    keywords: ["central exchange", "pawns", "opening"],
    questions: [
      "Should I exchange central pawns early?",
      "When is a central pawn exchange useful?"
    ],
    short_answer: "Exchange central pawns when it improves your development, structure, activity, or tactical position.",
    answer: "A central exchange can open lines or clarify the position.",
    example: "exd5 may open the e-file or change the pawn structure depending on the position.",
    related: ["OPENING-040", "OPENING-044"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-044",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Structure",
    title: "Should I avoid doubled pawns in the opening?",
    level: "Intermediate",
    keywords: ["doubled pawns", "opening", "pawn structure"],
    questions: [
      "Are doubled pawns always bad?",
      "Should I avoid creating doubled pawns?"
    ],
    short_answer: "No. Doubled pawns can be weaknesses, but they can also provide useful files, space, or dynamic advantages.",
    answer: "Evaluate the resulting position rather than rejecting doubled pawns automatically.",
    example: "Accepting doubled pawns may open a file for a rook.",
    related: ["NOTATION-057", "OPENING-024"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-045",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Structure",
    title: "Should I avoid isolated pawns?",
    level: "Intermediate",
    keywords: ["isolated pawn", "opening", "pawn structure"],
    questions: [
      "Is an isolated pawn always bad?",
      "Should I avoid an isolated queen's pawn?"
    ],
    short_answer: "No. An isolated pawn can provide space and activity as well as becoming a potential weakness.",
    answer: "The value depends on piece activity, pawn breaks, and the resulting middlegame.",
    example: "An isolated d-pawn can support active pieces and central control.",
    related: ["NOTATION-056", "OPENING-046"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-046",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Pawn Structure",
    title: "What is an isolated queen's pawn?",
    level: "Intermediate",
    keywords: ["IQP", "isolated queen pawn", "d-pawn"],
    questions: [
      "What is an isolated queen's pawn?",
      "What does IQP mean?"
    ],
    short_answer: "An isolated queen's pawn is an isolated pawn on the d-file.",
    answer: "It can provide dynamic piece activity but may become a long-term target.",
    example: "A white pawn on d4 with no c- or e-pawn is an isolated queen's pawn.",
    related: ["NOTATION-056", "OPENING-045"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "OPENING-047",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Exchanges",
    title: "Should I exchange pieces in the opening?",
    level: "Intermediate",
    keywords: ["exchange", "opening", "pieces"],
    questions: [
      "Should I trade pieces early?",
      "Are early exchanges good?"
    ],
    short_answer: "Exchange pieces when the trade improves your position or solves a problem.",
    answer: "Avoid exchanges simply because they are available.",
    example: "Trading an active enemy piece can be useful if it reduces pressure on your king.",
    related: ["OPENING-048", "OPENING-049"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-048",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Exchanges",
    title: "Should I exchange my developed piece for an undeveloped piece?",
    level: "Intermediate",
    keywords: ["exchange", "development", "pieces"],
    questions: [
      "Is it bad to trade a developed piece for an undeveloped piece?",
      "Should I avoid such exchanges?"
    ],
    short_answer: "Not necessarily. The position and resulting advantages matter more than development alone.",
    answer: "A trade can be correct if it wins material, damages structure, removes a key defender, or achieves another goal.",
    example: "Bxc6 may be useful even if the bishop was developed better than the knight.",
    related: ["OPENING-047", "OPENING-049"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-049",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Piece Exchanges",
    title: "When should I keep my bishop pair?",
    level: "Intermediate",
    keywords: ["bishop pair", "exchange", "opening"],
    questions: [
      "Should I keep both bishops?",
      "Why can the bishop pair be valuable?"
    ],
    short_answer: "The bishop pair can be valuable, especially in open positions.",
    answer: "Two bishops can control both colors and work effectively over long diagonals.",
    example: "Keeping both bishops can be useful when the center is likely to open.",
    related: ["OPENING-047", "POSITION-002"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-050",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Why should I avoid unnecessary knight-edge moves?",
    level: "Beginner",
    keywords: ["knight", "edge", "development"],
    questions: [
      "Why is moving a knight to the edge often bad?",
      "Why are edge knights sometimes passive?"
    ],
    short_answer: "Edge squares usually give knights fewer useful options.",
    answer: "Knights often need central squares to maximize their mobility.",
    example: "Na3 can be useful in some openings but may be less active than Nc3.",
    related: ["OPENING-037", "OPENING-038"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-051",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "Should I develop a piece just because I can?",
    level: "Intermediate",
    keywords: ["development", "piece placement", "opening"],
    questions: [
      "Is every developing move good?",
      "Can a developing move be a mistake?"
    ],
    short_answer: "No. A developing move can be bad if the square is unsafe or conflicts with the position.",
    answer: "Development should improve your position, not simply increase the number of developed pieces.",
    example: "Developing a bishop to a square where it can be attacked immediately may waste time.",
    related: ["OPENING-026", "OPENING-052"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-052",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opponent Awareness",
    title: "What should I do if my opponent attacks my developing piece?",
    level: "Intermediate",
    keywords: ["development", "attack", "opening"],
    questions: [
      "What if my opponent attacks a piece I just developed?",
      "Should I move the attacked piece immediately?"
    ],
    short_answer: "First check whether the attack is real, tactical, or can be ignored profitably.",
    answer: "Sometimes you can respond with a stronger threat or continue development.",
    example: "If an enemy pawn attacks your knight, you may have a better tactical move instead of retreating immediately.",
    related: ["OPENING-029", "THINK-003"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "OPENING-053",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Queen Development",
    title: "When is early queen development justified?",
    level: "Intermediate",
    keywords: ["queen", "development", "opening"],
    questions: [
      "When should I develop my queen early?",
      "When is an early queen move justified?"
    ],
    short_answer: "It is justified when the queen move creates a concrete benefit and cannot be easily exploited.",
    answer: "Tactics, pawn recovery, threats, or specific opening theory can justify early queen activity.",
    example: "The queen may recapture a pawn in the Scandinavian Defense.",
    related: ["OPENING-012", "OPENING-014"],
    source: "Opening theory and standard principles",
    verified: true
  },
  {
    id: "OPENING-054",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Tempo",
    title: "What is a developing tempo?",
    level: "Intermediate",
    keywords: ["tempo", "development", "attack"],
    questions: [
      "What is a developing tempo?",
      "How can one move do two jobs?"
    ],
    short_answer: "A developing tempo occurs when a developing move also creates a useful threat or gains time.",
    answer: "This is especially valuable because one move improves development while affecting the opponent.",
    example: "Nc6 develops a knight while attacking a central pawn.",
    related: ["OPENING-010", "OPENING-055"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-055",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Development",
    title: "What is a tempo-gaining move?",
    level: "Beginner",
    keywords: ["tempo", "attack", "development"],
    questions: [
      "What is a tempo-gaining move?",
      "How can I gain a tempo in the opening?"
    ],
    short_answer: "It is a move that forces or encourages the opponent to spend time responding.",
    answer: "Attacking an important piece while improving your own position is a common example.",
    example: "Developing a knight while attacking the enemy queen can gain a tempo.",
    related: ["OPENING-010", "OPENING-054"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-056",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Planning",
    title: "Should I memorize opening moves or understand them?",
    level: "Beginner",
    keywords: ["opening study", "memorization", "understanding"],
    questions: [
      "Should I memorize openings?",
      "Is opening understanding more important than memorization?"
    ],
    short_answer: "Understand the ideas first, then memorize critical lines when useful.",
    answer: "Understanding helps you handle positions when the opponent leaves known theory.",
    example: "Knowing why you place a knight on f3 is more useful than remembering Nf3 without understanding.",
    related: ["THEORY-092", "OPENING-057"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "OPENING-057",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Planning",
    title: "What should I learn from an opening line?",
    level: "Intermediate",
    keywords: ["opening preparation", "ideas", "plans"],
    questions: [
      "What should I understand when studying an opening?",
      "How should I study an opening variation?"
    ],
    short_answer: "Learn the typical plans, piece placement, pawn breaks, tactical ideas, and important alternatives.",
    answer: "Move sequences are easier to remember when you understand the position they create.",
    example: "Study where each piece belongs and which pawn break is usually important.",
    related: ["OPENING-056", "THEORY-093"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "OPENING-058",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Flexibility",
    title: "Should I follow opening principles rigidly?",
    level: "Intermediate",
    keywords: ["opening principles", "flexibility", "chess"],
    questions: [
      "Are opening principles absolute rules?",
      "Can I break opening principles?"
    ],
    short_answer: "No. Opening principles are guidelines, not absolute rules.",
    answer: "Concrete tactics, forced moves, and specific opening positions can justify breaking a general principle.",
    example: "An early queen move may be correct if it wins material or meets a concrete threat.",
    related: ["OPENING-014", "OPENING-059"],
    source: "Standard chess principles",
    verified: true
  },
  {
    id: "OPENING-059",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Opening Flexibility",
    title: "When should I break an opening principle?",
    level: "Intermediate",
    keywords: ["opening principle", "tactics", "exception"],
    questions: [
      "When is it correct to break an opening rule?",
      "What is more important than opening principles?"
    ],
    short_answer: "Break a principle when concrete calculation or the position gives a stronger reason.",
    answer: "Checks, captures, threats, tactical opportunities, and urgent defensive needs can override general guidelines.",
    example: "You may move the same piece twice to avoid losing material.",
    related: ["OPENING-058", "THINK-004"],
    source: "Practical chess coaching",
    verified: true
  },
  {
    id: "OPENING-060",
    type: "PRINCIPLE",
    category: "Opening",
    topic: "Opening Principles",
    subtopic: "Practical Opening Checklist",
    title: "What is a simple opening checklist?",
    level: "Beginner",
    keywords: ["opening checklist", "development", "king safety"],
    questions: [
      "What should I check during the opening?",
      "What is a simple opening checklist?"
    ],
    short_answer: "Control the center, develop pieces, protect your king, avoid unnecessary moves, and watch your opponent's threats.",
    answer: "Use these principles as a guide while adapting to the actual position.",
    example: "Before moving, ask: Is my king safe? Are my pieces developed? What is my opponent threatening?",
    related: ["OPENING-001", "OPENING-029", "OPENING-058"],
    source: "Standard chess principles",
    verified: true
  }
];

export default openingPrinciples;