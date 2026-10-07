const chessLogicConceptsWhy = [

  {
    id: "LOGIC-001",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Opening Logic",
    title: "Why control the center?",
    level: "Beginner",
    keywords: ["center", "central control", "opening"],
    questions: [
      "Why is controlling the center important?",
      "What is the purpose of central control?"
    ],
    short_answer: "The center gives pieces more space and mobility.",
    answer: "Pieces placed or influencing the center can usually reach more useful squares and support attacks on both wings.",
    example: "Moves such as 1.e4 or 1.d4 immediately influence central squares.",
    related: ["OPENING-002", "BASIC-020"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-002",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Opening Logic",
    title: "Why develop pieces early?",
    level: "Beginner",
    keywords: ["development", "pieces", "opening"],
    questions: [
      "Why should I develop my pieces quickly?",
      "What does development achieve?"
    ],
    short_answer: "Development brings more pieces into the game.",
    answer: "More active pieces give you better control, faster coordination, and more options for attack or defense.",
    example: "After 1.e4, developing Nf3 and Bc4 is usually more useful than making several pawn moves.",
    related: ["OPENING-010", "OPENING-022"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-003",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Opening Logic",
    title: "Why avoid moving the same piece repeatedly?",
    level: "Beginner",
    keywords: ["tempo", "development", "opening"],
    questions: [
      "Why is moving one piece repeatedly often bad?",
      "Why should I develop instead?"
    ],
    short_answer: "Repeated moves can lose valuable development time.",
    answer: "While one piece moves several times, the opponent may develop multiple pieces and gain an initiative.",
    example: "Moving the queen three times while the opponent develops three pieces can leave you behind.",
    related: ["OPENING-008", "THINK-022"],
    source: "Opening principle",
    verified: true
  },

  {
    id: "LOGIC-004",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Opening Logic",
    title: "Why is development connected to initiative?",
    level: "Intermediate",
    keywords: ["development", "initiative", "tempo"],
    questions: [
      "How does development create initiative?",
      "Why can faster development be an advantage?"
    ],
    short_answer: "Developed pieces can create threats before the opponent is ready.",
    answer: "A development lead often allows you to open the position while your pieces are active and the opponent's pieces are still undeveloped.",
    example: "Opening the center when your king and pieces are ready can make your development advantage meaningful.",
    related: ["OPENING-010", "ATTACK-003"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-005",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King Safety",
    title: "Why castle early?",
    level: "Beginner",
    keywords: ["castling", "king safety", "opening"],
    questions: [
      "Why is castling usually important?",
      "Why should I not leave my king in the center?"
    ],
    short_answer: "Castling usually improves king safety and activates a rook.",
    answer: "It moves the king away from the center and connects the rooks, provided the position is suitable for castling.",
    example: "After developing the necessary pieces, O-O often places the king in a safer position.",
    related: ["OPENING-021", "ATTACK-001"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-006",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King Safety",
    title: "Why can castling be bad sometimes?",
    level: "Intermediate",
    keywords: ["castling", "king safety", "pawn structure"],
    questions: [
      "Is castling always good?",
      "When can castling create weaknesses?"
    ],
    short_answer: "Castling is not automatically safe in every position.",
    answer: "The king may become vulnerable if the pawn shield is damaged, lines are already open, or the opponent has a strong attack on that side.",
    example: "If your kingside pawns are badly weakened, castling kingside may require careful calculation.",
    related: ["ATTACK-007", "ATTACK-008"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-007",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King Safety",
    title: "Why is an exposed king dangerous?",
    level: "Beginner",
    keywords: ["king", "king safety", "attack"],
    questions: [
      "Why is king exposure a serious weakness?",
      "Why do open lines matter around the king?"
    ],
    short_answer: "The king cannot be allowed to remain in check.",
    answer: "Open files, diagonals, and weak squares near the king can give the opponent forcing checks and mating threats.",
    example: "An open f-file can become dangerous when a king has little pawn cover.",
    related: ["ATTACK-001", "MATE-020"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-008",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King Safety",
    title: "Why is king safety more important than material sometimes?",
    level: "Intermediate",
    keywords: ["king safety", "material", "attack"],
    questions: [
      "Can king safety be more important than winning material?",
      "Why should I sometimes ignore a pawn gain?"
    ],
    short_answer: "A dangerous king can outweigh a small material advantage.",
    answer: "Extra material is useful only if your position can survive the opponent's threats.",
    example: "Winning a pawn while allowing a forced mating attack is usually a poor trade.",
    related: ["ATTACK-033", "THINK-012"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-009",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Piece Activity",
    title: "Why improve the worst piece?",
    level: "Intermediate",
    keywords: ["worst piece", "piece activity", "strategy"],
    questions: [
      "Why should I improve my worst piece?",
      "What is the logic behind improving the least active piece?"
    ],
    short_answer: "Your position becomes stronger when more pieces contribute.",
    answer: "An inactive piece can limit your entire position. Improving it often increases coordination without requiring a tactical breakthrough.",
    example: "If one rook has no useful file, move it to a file where it can influence the position.",
    related: ["MIDDLE-018", "POSITION-034"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-010",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Piece Activity",
    title: "Why is an active piece valuable?",
    level: "Beginner",
    keywords: ["piece activity", "mobility", "position"],
    questions: [
      "Why are active pieces important?",
      "What makes a piece active?"
    ],
    short_answer: "An active piece influences important squares and targets.",
    answer: "Activity gives a piece useful mobility, pressure, defensive ability, and tactical possibilities.",
    example: "A rook on an open file is generally more active than a rook trapped behind its own pawns.",
    related: ["BASIC-025", "POSITION-037"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-011",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Piece Activity",
    title: "Why do pieces need coordination?",
    level: "Beginner",
    keywords: ["coordination", "pieces", "attack"],
    questions: [
      "Why should chess pieces work together?",
      "Why is coordination stronger than individual activity?"
    ],
    short_answer: "Coordinated pieces support each other and create stronger threats.",
    answer: "Several pieces working toward the same target can overwhelm defenders and reduce tactical risks.",
    example: "A queen and bishop battery can become powerful when both attack the same king-side weakness.",
    related: ["BASIC-026", "ATTACK-012"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-012",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Piece Activity",
    title: "Why is mobility useful?",
    level: "Beginner",
    keywords: ["mobility", "pieces", "squares"],
    questions: [
      "Why does mobility matter?",
      "Why is a piece with many useful squares often better?"
    ],
    short_answer: "Mobility gives a piece more useful choices.",
    answer: "A mobile piece can attack, defend, reposition, and respond to changing threats more effectively.",
    example: "A knight with several safe central squares can adapt to different plans.",
    related: ["BASIC-025", "POSITION-041"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-013",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Material",
    title: "Why is material important?",
    level: "Beginner",
    keywords: ["material", "pieces", "advantage"],
    questions: [
      "Why does material matter in chess?",
      "Why is an extra piece usually important?"
    ],
    short_answer: "More material gives you greater resources.",
    answer: "Extra material normally provides additional attacking, defensive, and endgame resources.",
    example: "A clean extra rook is usually a major advantage if there is no immediate compensation.",
    related: ["BASIC-022", "THINK-011"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-014",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Material",
    title: "Why is material not everything?",
    level: "Intermediate",
    keywords: ["material", "compensation", "position"],
    questions: [
      "Why can a player sacrifice material?",
      "Why is material alone not enough to evaluate a position?"
    ],
    short_answer: "Activity, king safety, initiative, and pawn structure can compensate for material.",
    answer: "A temporary material deficit may be justified if it produces strong, concrete compensation.",
    example: "A sacrificed piece can be reasonable if it creates a forced attack or decisive passed pawn.",
    related: ["TACTIC-047", "THINK-012"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-015",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Material",
    title: "Why calculate before accepting a sacrifice?",
    level: "Intermediate",
    keywords: ["sacrifice", "calculation", "material"],
    questions: [
      "Why should I calculate before taking sacrificed material?",
      "Can accepting material be a mistake?"
    ],
    short_answer: "The sacrificed material may be bait for a tactical attack.",
    answer: "Before accepting, check the opponent's checks, captures, threats, king attack, and tactical follow-up.",
    example: "Taking a poisoned pawn can expose your queen or king to a forcing sequence.",
    related: ["CALC-003", "TACTIC-047"],
    source: "Calculation principle",
    verified: true
  },

  {
    id: "LOGIC-016",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Forcing Moves",
    title: "Why are checks forcing?",
    level: "Beginner",
    keywords: ["checks", "forcing moves", "calculation"],
    questions: [
      "Why are checks considered forcing moves?",
      "Why must the opponent respond to a check?"
    ],
    short_answer: "A player in check must make a legal move that removes the check.",
    answer: "This sharply limits the opponent's choices, making checks useful for calculation and attack.",
    example: "When searching for tactics, examine all legal checks first.",
    related: ["CALC-004", "MATE-003"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-017",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Forcing Moves",
    title: "Why examine captures?",
    level: "Beginner",
    keywords: ["captures", "calculation", "tactics"],
    questions: [
      "Why should I look at captures when calculating?",
      "Why can a capture change the position dramatically?"
    ],
    short_answer: "Captures immediately change material and often open lines.",
    answer: "A capture can remove a defender, expose a king, open a file, or create a tactical sequence.",
    example: "Capturing a pinned defender may suddenly make a mating attack possible.",
    related: ["CALC-004", "TACTIC-008"],
    source: "Calculation principle",
    verified: true
  },

  {
    id: "LOGIC-018",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Forcing Moves",
    title: "Why look for threats?",
    level: "Beginner",
    keywords: ["threats", "candidate moves", "calculation"],
    questions: [
      "Why are threats important?",
      "Why should I ask what my move threatens?"
    ],
    short_answer: "A useful threat forces the opponent to solve a problem.",
    answer: "A threat can gain time, improve your position, or force the opponent into passive defense.",
    example: "Attacking an undefended piece can force it to move and allow you to gain space elsewhere.",
    related: ["CALC-004", "THINK-006"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-019",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Forcing Moves",
    title: "Why use checks-captures-threats?",
    level: "Beginner",
    keywords: ["checks", "captures", "threats", "CCT"],
    questions: [
      "Why use checks captures and threats?",
      "What is the purpose of the CCT method?"
    ],
    short_answer: "It helps identify forcing possibilities quickly.",
    answer: "Checking these three move types gives you a disciplined first scan for tactical opportunities.",
    example: "Before choosing a quiet move, check whether you have a strong check, capture, or threat.",
    related: ["CALC-004", "THINK-005"],
    source: "Calculation method",
    verified: true
  },

  {
    id: "LOGIC-020",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Calculation",
    title: "Why calculate the opponent's best reply?",
    level: "Intermediate",
    keywords: ["calculation", "best defense", "opponent"],
    questions: [
      "Why should I calculate the opponent's strongest response?",
      "Why is calculating only my moves dangerous?"
    ],
    short_answer: "A move is only good if it survives strong opposition.",
    answer: "Assuming a weak reply can make an attractive combination completely unsound.",
    example: "If your attack works only because the opponent misses a defensive move, it is not a reliable combination.",
    related: ["CALC-014", "THINK-006"],
    source: "Calculation principle",
    verified: true
  },

  {
    id: "LOGIC-021",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Calculation",
    title: "Why calculate from the opponent's perspective?",
    level: "Intermediate",
    keywords: ["calculation", "opponent", "defense"],
    questions: [
      "Why should I think like my opponent?",
      "How does the opponent's perspective improve calculation?"
    ],
    short_answer: "It helps reveal their strongest resources.",
    answer: "Ask what you would play against your own move. This often exposes tactical refutations before you commit.",
    example: "After finding a candidate move, ask: 'What would I play against this?'",
    related: ["THINK-006", "CALC-018"],
    source: "Chess thinking method",
    verified: true
  },

  {
    id: "LOGIC-022",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Calculation",
    title: "Why do forcing lines help humans calculate?",
    level: "Intermediate",
    keywords: ["forcing lines", "calculation", "human chess"],
    questions: [
      "Why are forcing variations easier to calculate?",
      "Why should I calculate forcing moves first?"
    ],
    short_answer: "Forcing moves reduce the number of possible replies.",
    answer: "Fewer branches make calculation more manageable and reduce the chance of overlooking a critical response.",
    example: "A sequence of checks is usually easier to calculate than a position with ten quiet options.",
    related: ["CALC-009", "THINK-005"],
    source: "Calculation principle",
    verified: true
  },

  {
    id: "LOGIC-023",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Blunders",
    title: "Why check for opponent threats before moving?",
    level: "Beginner",
    keywords: ["threats", "blunders", "thinking"],
    questions: [
      "Why should I check what my opponent threatens?",
      "What happens if I ignore the opponent's threat?"
    ],
    short_answer: "You may make a move that simply loses material or the game.",
    answer: "Chess is a two-player problem. Your plan matters only if it survives the opponent's immediate threats.",
    example: "Before attacking a pawn, check whether your queen is already under attack.",
    related: ["THINK-003", "MISTAKE-001"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-024",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Blunders",
    title: "Why are loose pieces dangerous?",
    level: "Beginner",
    keywords: ["loose pieces", "tactics", "blunders"],
    questions: [
      "Why are undefended pieces dangerous?",
      "Why should I check loose pieces?"
    ],
    short_answer: "Loose pieces can become tactical targets.",
    answer: "An undefended piece may be attacked by a fork, discovered attack, double attack, or simple capture.",
    example: "Two undefended pieces on the same rank can be vulnerable to a knight fork.",
    related: ["TACTIC-010", "THINK-030"],
    source: "Tactical principle",
    verified: true
  },

  {
    id: "LOGIC-025",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Blunders",
    title: "Why is one-move thinking dangerous?",
    level: "Beginner",
    keywords: ["one-move thinking", "blunder", "calculation"],
    questions: [
      "Why is it bad to think only about my next move?",
      "Why should I look one move further?"
    ],
    short_answer: "The opponent always gets a reply.",
    answer: "A move that looks strong by itself may fail immediately to a tactical response.",
    example: "Before playing a queen attack, ask what the opponent can do immediately after it.",
    related: ["THINK-006", "MISTAKE-003"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-026",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pawn Logic",
    title: "Why are pawn moves permanent?",
    level: "Beginner",
    keywords: ["pawns", "pawn moves", "irreversible"],
    questions: [
      "Why are pawn moves important decisions?",
      "Why can a pawn move create permanent weaknesses?"
    ],
    short_answer: "Pawns cannot move backward.",
    answer: "Every pawn move changes the structure permanently and may create or remove important squares and lines.",
    example: "Moving a pawn from g2 to g3 may create a useful luft but also changes dark-square control.",
    related: ["POSITION-006", "THINK-041"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-027",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pawn Logic",
    title: "Why avoid unnecessary pawn moves?",
    level: "Intermediate",
    keywords: ["pawn moves", "weaknesses", "opening"],
    questions: [
      "Why can unnecessary pawn moves be bad?",
      "Why should I think before pushing a pawn?"
    ],
    short_answer: "A pawn push may create a permanent weakness or waste time.",
    answer: "Unlike pieces, pawns cannot retreat, so an unnecessary move can weaken squares or delay development.",
    example: "Repeated flank pawn moves in the opening may leave the king behind in development.",
    related: ["OPENING-013", "MISTAKE-020"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-028",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pawn Logic",
    title: "Why create a passed pawn?",
    level: "Intermediate",
    keywords: ["passed pawn", "pawn", "endgame"],
    questions: [
      "Why is a passed pawn powerful?",
      "Why should I create a passed pawn?"
    ],
    short_answer: "A passed pawn has a clear promotion potential.",
    answer: "Because no enemy pawn can directly stop it, it can force the opponent's pieces to become defensive.",
    example: "A protected passed pawn on the sixth rank can restrict the enemy king and pieces.",
    related: ["POSITION-018", "END-013"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-029",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pawn Logic",
    title: "Why can pawn weaknesses matter for a long time?",
    level: "Intermediate",
    keywords: ["pawn weakness", "weakness", "endgame"],
    questions: [
      "Why are weak pawns often permanent targets?",
      "Why can pawn weaknesses become worse in endgames?"
    ],
    short_answer: "Pawns often cannot move away from the weakness.",
    answer: "A fixed pawn can require permanent defense and become easier to attack after pieces are exchanged.",
    example: "An isolated pawn may become a long-term target in a simplified position.",
    related: ["POSITION-010", "END-019"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-030",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pawn Logic",
    title: "Why are pawn breaks important?",
    level: "Intermediate",
    keywords: ["pawn break", "strategy", "opening"],
    questions: [
      "Why are pawn breaks important in chess?",
      "What does a pawn break achieve?"
    ],
    short_answer: "A pawn break can open lines or change the structure.",
    answer: "It can challenge the opponent's center, create passed pawns, open files, or activate pieces.",
    example: "A timely c-pawn break can open a file for a rook.",
    related: ["MIDDLE-022", "POSITION-026"],
    source: "Strategic principle",
    verified: true
  },

  {
    id: "LOGIC-031",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Files",
    title: "Why are open files useful for rooks?",
    level: "Beginner",
    keywords: ["open file", "rook", "activity"],
    questions: [
      "Why do rooks like open files?",
      "What can a rook do on an open file?"
    ],
    short_answer: "An open file gives the rook a clear line of activity.",
    answer: "The rook can attack pawns, invade ranks, support pieces, or penetrate the opponent's position.",
    example: "A rook on an open d-file can pressure a weak pawn on d6.",
    related: ["POSITION-029", "MIDDLE-034"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-032",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Files",
    title: "Why is the seventh rank powerful?",
    level: "Intermediate",
    keywords: ["seventh rank", "rook", "invasion"],
    questions: [
      "Why is a rook on the seventh rank often strong?",
      "What does a seventh-rank rook attack?"
    ],
    short_answer: "It can attack pawns and restrict the enemy king.",
    answer: "A rook on the seventh rank can often attack several targets while supporting passed pawns or restricting pieces.",
    example: "A rook on the seventh rank may attack pawns on the second rank and cut off the king.",
    related: ["MIDDLE-035", "END-029"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-033",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Diagonals",
    title: "Why do bishops need open diagonals?",
    level: "Beginner",
    keywords: ["bishop", "diagonal", "activity"],
    questions: [
      "Why do bishops like open positions?",
      "Why can pawns block a bishop?"
    ],
    short_answer: "Bishops need diagonals to reach useful squares.",
    answer: "Blocked diagonals reduce a bishop's range and can make it passive.",
    example: "A bishop behind its own central pawns may struggle to influence the opponent's position.",
    related: ["POSITION-035", "POSITION-039"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-034",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Knights",
    title: "Why do knights prefer outposts?",
    level: "Intermediate",
    keywords: ["knight", "outpost", "weak square"],
    questions: [
      "Why is a knight on an outpost strong?",
      "Why are protected outposts valuable?"
    ],
    short_answer: "An outpost can provide a stable and active square.",
    answer: "If enemy pawns cannot chase the knight, it may control important squares and attack targets.",
    example: "A protected knight on d5 can attack several important squares while being difficult to challenge.",
    related: ["POSITION-004", "POSITION-036"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-035",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Bishops",
    title: "Why can the bishop pair be valuable?",
    level: "Intermediate",
    keywords: ["bishop pair", "bishops", "open position"],
    questions: [
      "Why is the bishop pair considered an advantage?",
      "When are two bishops especially strong?"
    ],
    short_answer: "Two bishops can control both color complexes.",
    answer: "In open positions, the bishops can work across long diagonals and complement each other.",
    example: "Two active bishops can pressure both wings of the board.",
    related: ["POSITION-043", "MIDDLE-041"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-036",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Knights",
    title: "Why are knights often strong in closed positions?",
    level: "Intermediate",
    keywords: ["knight", "closed position", "pawn structure"],
    questions: [
      "Why can knights be better in closed positions?",
      "Why do blocked pawns sometimes help knights?"
    ],
    short_answer: "Knights can jump over blocked pawn structures.",
    answer: "When long-range pieces are restricted by pawns, knights can maneuver through stable central squares.",
    example: "A knight can use an outpost in a closed center while a bishop struggles behind its own pawns.",
    related: ["POSITION-045", "POSITION-046"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-037",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Exchanges",
    title: "Why exchange pieces when ahead?",
    level: "Intermediate",
    keywords: ["exchange", "simplification", "advantage"],
    questions: [
      "Why can exchanging pieces help when I am winning?",
      "Should I always trade pieces when ahead?"
    ],
    short_answer: "Simplification can reduce the opponent's attacking resources.",
    answer: "With fewer pieces, tactical complications often decrease, making a material advantage easier to convert.",
    example: "Trading queens can be sensible when you have a clear extra piece and no tactical issue.",
    related: ["END-020", "THINK-033"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-038",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Exchanges",
    title: "Why can exchanging pieces be bad when behind?",
    level: "Intermediate",
    keywords: ["exchange", "deficit", "counterplay"],
    questions: [
      "Why should the losing side often avoid exchanges?",
      "Can exchanges reduce my chances of saving the game?"
    ],
    short_answer: "Simplification may reduce your opportunities for counterplay.",
    answer: "When behind, keeping active pieces can provide tactical chances, threats, and practical complications.",
    example: "A player down a pawn may keep queens on the board if an active attack is possible.",
    related: ["THINK-034", "END-020"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-039",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Exchanges",
    title: "Why exchange a defender?",
    level: "Intermediate",
    keywords: ["defender", "exchange", "tactics"],
    questions: [
      "Why would I trade an attacking defender?",
      "Why is removing a defender useful?"
    ],
    short_answer: "Removing a defender can make a target vulnerable.",
    answer: "Many combinations work because one important defender disappears.",
    example: "Trading the knight that protects a key pawn may allow your queen to capture it safely.",
    related: ["TACTIC-026", "ATTACK-027"],
    source: "Tactical principle",
    verified: true
  },

  {
    id: "LOGIC-040",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Queen",
    title: "Why should the queen usually not come out too early?",
    level: "Beginner",
    keywords: ["queen", "opening", "development"],
    questions: [
      "Why is early queen development risky?",
      "Why can the queen lose time in the opening?"
    ],
    short_answer: "The queen can be attacked by developing pieces and pawns.",
    answer: "If the queen must move repeatedly, the opponent may gain development and tempi.",
    example: "An early queen sortie that gets chased by Nc3 and other developing moves can waste several tempi.",
    related: ["OPENING-017", "OPENING-008"],
    source: "Opening principle",
    verified: true
  },

  {
    id: "LOGIC-041",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Queen",
    title: "Why is the queen powerful but vulnerable?",
    level: "Beginner",
    keywords: ["queen", "value", "tactics"],
    questions: [
      "Why is the queen both powerful and vulnerable?",
      "Why must queen moves be calculated carefully?"
    ],
    short_answer: "The queen is valuable and can be attacked by many pieces.",
    answer: "Its large range gives it power, but its high value means losing tempi or getting trapped can be costly.",
    example: "A queen entering the enemy camp must always have safe retreat squares.",
    related: ["BASIC-023", "CALC-025"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-042",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Rooks",
    title: "Why activate rooks after castling?",
    level: "Beginner",
    keywords: ["rook", "castling", "development"],
    questions: [
      "Why do rooks become easier to activate after castling?",
      "Why does castling connect the rooks?"
    ],
    short_answer: "Castling normally removes the king from between the rooks.",
    answer: "Once the king moves, the rooks can become connected if the intervening squares are clear.",
    example: "After O-O and development, a rook can often move toward an open or semi-open file.",
    related: ["OPENING-021", "MIDDLE-034"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-043",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Rooks",
    title: "Why do rooks belong behind passed pawns?",
    level: "Intermediate",
    keywords: ["rook", "passed pawn", "endgame"],
    questions: [
      "Why can a rook be strong behind a passed pawn?",
      "Why is the seventh rank of a passed pawn important?"
    ],
    short_answer: "The rook can support promotion while staying active.",
    answer: "A rook behind a passed pawn can push it forward while also controlling squares behind the pawn.",
    example: "A rook behind a pawn on the seventh rank can support its advance toward promotion.",
    related: ["END-013", "PRACTICAL-END-021"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-044",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King",
    title: "Why does the king become active in the endgame?",
    level: "Intermediate",
    keywords: ["king", "endgame", "activity"],
    questions: [
      "Why can the king become a fighting piece?",
      "Why should the king move toward the center in many endgames?"
    ],
    short_answer: "With fewer attacking pieces, the king can safely become active.",
    answer: "The king can capture pawns, support passed pawns, and control key squares.",
    example: "A centralized king can reach a passed pawn faster than a king trapped on the edge.",
    related: ["END-006", "PRACTICAL-END-089"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-045",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "King",
    title: "Why should the king stay safe in the middlegame?",
    level: "Beginner",
    keywords: ["king", "middlegame", "safety"],
    questions: [
      "Why should the king avoid unnecessary activity in the middlegame?",
      "Why is king exposure dangerous before the endgame?"
    ],
    short_answer: "Many pieces can attack an exposed king.",
    answer: "Queens, rooks, bishops, knights, and pawn breaks can create powerful threats while many pieces remain.",
    example: "Walking the king into the center while queens are active can allow forcing checks.",
    related: ["ATTACK-001", "ATTACK-039"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-046",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Space",
    title: "Why is space an advantage?",
    level: "Intermediate",
    keywords: ["space", "pieces", "position"],
    questions: [
      "Why is having more space useful?",
      "How does space help my pieces?"
    ],
    short_answer: "Space gives pieces more room to maneuver.",
    answer: "A space advantage can restrict the opponent and make it easier to improve your pieces behind the pawn front.",
    example: "A strong central pawn structure may restrict enemy pieces from reaching active squares.",
    related: ["POSITION-047", "MIDDLE-029"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-047",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Space",
    title: "Why can too much space become a weakness?",
    level: "Advanced",
    keywords: ["space", "overextension", "pawn structure"],
    questions: [
      "Can a space advantage become a weakness?",
      "Why can an advanced pawn structure be overextended?"
    ],
    short_answer: "Advanced pawns may become targets and create weak squares.",
    answer: "Space is useful only when it can be supported and maintained.",
    example: "An overextended pawn chain may leave holes behind it that enemy pieces can occupy.",
    related: ["POSITION-050", "ATTACK-035"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-048",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Weak Squares",
    title: "Why is a weak square important?",
    level: "Intermediate",
    keywords: ["weak square", "outpost", "positional"],
    questions: [
      "Why should I care about weak squares?",
      "How can a weak square become a strategic target?"
    ],
    short_answer: "A weak square can become a permanent entry point.",
    answer: "If enemy pawns cannot challenge the square, an opposing piece may occupy it safely.",
    example: "A knight established on a weak central square can become a powerful outpost.",
    related: ["POSITION-003", "POSITION-004"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-049",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Weak Squares",
    title: "Why are holes created by pawn moves?",
    level: "Intermediate",
    keywords: ["holes", "pawn moves", "weak squares"],
    questions: [
      "Why can a pawn move create a hole?",
      "What is the connection between pawn structure and weak squares?"
    ],
    short_answer: "Moving a pawn can remove its control over another square.",
    answer: "Because pawns control fixed diagonals, moving them can permanently reduce control of important squares.",
    example: "Moving a g-pawn can leave a weak f3 or h3-related complex depending on the structure.",
    related: ["POSITION-006", "LOGIC-026"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-050",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Prophylaxis",
    title: "Why prevent the opponent's plan?",
    level: "Intermediate",
    keywords: ["prophylaxis", "opponent plan", "strategy"],
    questions: [
      "Why should I stop my opponent's plan?",
      "What is the logic of prophylaxis?"
    ],
    short_answer: "Stopping a strong plan can be more valuable than making your own move immediately.",
    answer: "If the opponent's idea is dangerous, preventing it may improve your position while reducing their options.",
    example: "A pawn move that prevents an enemy knight from reaching an outpost can be highly useful.",
    related: ["MIDDLE-025", "THINK-034"],
    source: "Strategic principle",
    verified: true
  },

  {
    id: "LOGIC-051",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Prophylaxis",
    title: "Why is prophylaxis not always passive?",
    level: "Advanced",
    keywords: ["prophylaxis", "active defense", "strategy"],
    questions: [
      "Can prophylaxis be an active move?",
      "Does preventing a threat always mean defending?"
    ],
    short_answer: "A preventive move can also improve your position.",
    answer: "The best prophylactic moves often solve a defensive problem while preparing an active plan.",
    example: "A rook move can defend a pawn while preparing to occupy an open file.",
    related: ["MIDDLE-026", "ATTACK-025"],
    source: "Strategic principle",
    verified: true
  },

  {
    id: "LOGIC-052",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Threats",
    title: "Why must every threat be evaluated?",
    level: "Beginner",
    keywords: ["threat", "defense", "thinking"],
    questions: [
      "Why should I identify the opponent's threat?",
      "Why can an apparently harmless move be dangerous?"
    ],
    short_answer: "A hidden threat can become decisive on the next move.",
    answer: "Chess positions can change quickly, especially when a tactical threat is already prepared.",
    example: "A queen move that looks harmless may actually threaten mate on h2.",
    related: ["THINK-003", "MATE-020"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-053",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Tempo",
    title: "Why is a tempo valuable?",
    level: "Beginner",
    keywords: ["tempo", "time", "initiative"],
    questions: [
      "What is the value of one tempo?",
      "Why can one move make a big difference?"
    ],
    short_answer: "A tempo is one move that can be used to improve the position.",
    answer: "A single tempo may allow you to complete development, create a threat, win material, or reach a key square first.",
    example: "If two sides race to promote, one extra tempo can decide the result.",
    related: ["BASIC-033", "THINK-022"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-054",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Move Order",
    title: "Why does move order matter?",
    level: "Intermediate",
    keywords: ["move order", "tempo", "opening"],
    questions: [
      "Why can the same moves produce different results in a different order?",
      "Why is move order important?"
    ],
    short_answer: "The opponent gets a different opportunity after each move.",
    answer: "Changing the order can allow or prevent tactical responses, transpositions, or useful intermediate moves.",
    example: "A capture played before a developing move may give the opponent a tempo that disappears if the order is reversed.",
    related: ["THEORY-083", "CALC-020"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-055",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Move Order",
    title: "Why are intermediate moves powerful?",
    level: "Intermediate",
    keywords: ["zwischenzug", "intermediate move", "tactics"],
    questions: [
      "Why can an intermediate move change a combination?",
      "What makes a zwischenzug powerful?"
    ],
    short_answer: "It changes the order of events to gain something first.",
    answer: "Instead of immediately making the expected capture or recapture, a player inserts a stronger forcing move.",
    example: "A check before recapturing can win an extra piece or improve the final position.",
    related: ["TACTIC-032", "CALC-020"],
    source: "Tactical principle",
    verified: true
  },

  {
    id: "LOGIC-056",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Initiative",
    title: "Why is the initiative valuable?",
    level: "Intermediate",
    keywords: ["initiative", "tempo", "attack"],
    questions: [
      "Why is it useful to make threats first?",
      "What does having the initiative mean?"
    ],
    short_answer: "The initiative lets you force the opponent to respond to your ideas.",
    answer: "A player with the initiative can dictate the direction of the game and make the opponent spend moves on defense.",
    example: "Continuous threats against the king may keep the opponent from improving their pieces.",
    related: ["ATTACK-003", "MIDDLE-011"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-057",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Initiative",
    title: "Why can initiative compensate for material?",
    level: "Advanced",
    keywords: ["initiative", "material", "compensation"],
    questions: [
      "Can initiative compensate for a pawn or piece?",
      "Why can activity sometimes be worth material?"
    ],
    short_answer: "Strong threats can make the opponent unable to exploit their material advantage.",
    answer: "Material compensation is meaningful when the activity is concrete and creates lasting or forcing threats.",
    example: "A sacrificed pawn may provide rapid development and an attack against an uncastled king.",
    related: ["LOGIC-014", "ATTACK-034"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-058",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Attack",
    title: "Why attack the king with more pieces?",
    level: "Beginner",
    keywords: ["attack", "king", "coordination"],
    questions: [
      "Why should attackers outnumber defenders?",
      "Why is piece coordination important in a king attack?"
    ],
    short_answer: "More coordinated attackers can create stronger threats.",
    answer: "A king has limited escape squares, so adding attackers can overload the defensive pieces.",
    example: "Queen, bishop, and rook working together can create mating threats that one piece cannot create alone.",
    related: ["ATTACK-012", "MATE-025"],
    source: "Attacking principle",
    verified: true
  },

  {
    id: "LOGIC-059",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Attack",
    title: "Why open lines before attacking?",
    level: "Intermediate",
    keywords: ["open lines", "attack", "files"],
    questions: [
      "Why should I open lines for my pieces?",
      "Why are open files and diagonals useful in attacks?"
    ],
    short_answer: "Open lines allow long-range pieces to reach targets.",
    answer: "Rooks, bishops, and queens become much more powerful when their paths toward the enemy king or pieces are clear.",
    example: "A pawn sacrifice that opens a file for a rook can create a dangerous attack.",
    related: ["ATTACK-010", "MIDDLE-034"],
    source: "Attacking principle",
    verified: true
  },

  {
    id: "LOGIC-060",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Attack",
    title: "Why remove defenders before attacking?",
    level: "Intermediate",
    keywords: ["remove defender", "attack", "tactics"],
    questions: [
      "Why remove a defender before attacking a target?",
      "Why is a defended piece harder to attack?"
    ],
    short_answer: "Removing defenders makes tactical targets easier to win.",
    answer: "An attack becomes stronger when the opponent has fewer pieces available to protect the target.",
    example: "Exchanging a knight that guards a key pawn can make that pawn fall.",
    related: ["TACTIC-026", "ATTACK-027"],
    source: "Tactical principle",
    verified: true
  },

  {
    id: "LOGIC-061",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Defense",
    title: "Why is active defense usually better than passive defense?",
    level: "Intermediate",
    keywords: ["active defense", "defense", "counterplay"],
    questions: [
      "Why is active defense useful?",
      "Why should defenders look for counterplay?"
    ],
    short_answer: "Active defense can solve the threat while creating one of your own.",
    answer: "Forcing the attacker to respond can reduce pressure and give the defender time to reorganize.",
    example: "A counterattack against the opponent's queen can force it away from the king attack.",
    related: ["ATTACK-026", "THINK-053"],
    source: "Defensive principle",
    verified: true
  },

  {
    id: "LOGIC-062",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Defense",
    title: "Why add another defender?",
    level: "Beginner",
    keywords: ["defense", "defender", "coordination"],
    questions: [
      "Why put two defenders on one important piece?",
      "When is an extra defender useful?"
    ],
    short_answer: "Extra defenders reduce tactical vulnerability.",
    answer: "A protected piece is harder to win with a simple attack and can become a tactical resource itself.",
    example: "Adding a rook behind a passed pawn can prevent the opponent from capturing it safely.",
    related: ["ATTACK-024", "POSITION-018"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-063",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Defense",
    title: "Why can a defender be overloaded?",
    level: "Intermediate",
    keywords: ["overloaded defender", "defense", "tactics"],
    questions: [
      "Why is an overloaded defender vulnerable?",
      "How can one defender protect too many things?"
    ],
    short_answer: "A single piece may be unable to defend multiple threats simultaneously.",
    answer: "If one defender has two critical duties, a tactical move can force it to abandon one.",
    example: "A queen protecting both a mate square and a loose rook may become overloaded.",
    related: ["TACTIC-029", "ATTACK-027"],
    source: "Tactical principle",
    verified: true
  },

  {
    id: "LOGIC-064",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Defense",
    title: "Why trade attacking pieces?",
    level: "Intermediate",
    keywords: ["defense", "exchange", "attacker"],
    questions: [
      "Why should I sometimes exchange an attacking piece?",
      "Can trading one attacker improve king safety?"
    ],
    short_answer: "Removing a key attacker can reduce the opponent's threats.",
    answer: "Not all exchanges are equal; trading the opponent's most dangerous piece may be worth more than preserving material symmetry.",
    example: "Exchanging a powerful bishop near your king can eliminate a mating threat.",
    related: ["ATTACK-027", "LOGIC-039"],
    source: "Defensive principle",
    verified: true
  },

  {
    id: "LOGIC-065",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Simplification",
    title: "Why simplify when your advantage is stable?",
    level: "Intermediate",
    keywords: ["simplification", "advantage", "endgame"],
    questions: [
      "Why simplify a winning position?",
      "When is trading queens useful?"
    ],
    short_answer: "Simplification can make a stable advantage easier to convert.",
    answer: "Removing attacking pieces can reduce counterplay and make the opponent's defensive task harder.",
    example: "If you are a clean piece ahead, exchanging queens may remove most tactical danger.",
    related: ["LOGIC-037", "END-020"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-066",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Simplification",
    title: "Why not simplify automatically?",
    level: "Intermediate",
    keywords: ["simplification", "exchange", "position"],
    questions: [
      "Should I always exchange pieces when ahead?",
      "Why can simplification sometimes be bad?"
    ],
    short_answer: "A favorable-looking exchange can change the evaluation of the position.",
    answer: "The resulting endgame may be unclear, drawn, or even worse despite your current advantage.",
    example: "Exchanging into a pawn ending without calculating it can throw away a winning position.",
    related: ["END-020", "CALC-049"],
    source: "Chess principle",
    verified: true
  },

  {
    id: "LOGIC-067",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Endgame Logic",
    title: "Why are king and pawn endings so precise?",
    level: "Intermediate",
    keywords: ["pawn ending", "king", "precision"],
    questions: [
      "Why can one tempo decide a pawn ending?",
      "Why are pawn endings so calculation-heavy?"
    ],
    short_answer: "Kings and pawns have limited moves, so tempo and key squares matter greatly.",
    answer: "A single move can change opposition, the square of the king, or the promotion race.",
    example: "Winning opposition can determine whether a king reaches the promotion square first.",
    related: ["END-008", "END-019"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-068",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Endgame Logic",
    title: "Why is opposition important?",
    level: "Intermediate",
    keywords: ["opposition", "king", "pawn ending"],
    questions: [
      "Why does opposition matter in king and pawn endings?",
      "What does opposition allow?"
    ],
    short_answer: "Opposition can force the enemy king to give way.",
    answer: "When kings face each other with the correct distance, the side not having the move may gain the strategic advantage.",
    example: "King opposition can help your king penetrate toward a key pawn or square.",
    related: ["END-008", "PRACTICAL-END-013"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-069",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Endgame Logic",
    title: "Why exchange into a pawn ending only after calculation?",
    level: "Advanced",
    keywords: ["pawn ending", "exchange", "calculation"],
    questions: [
      "Why can a queen or rook exchange into a pawn ending be dangerous?",
      "Why calculate pawn endings before trading?"
    ],
    short_answer: "Pawn endings can be completely different from the position before the exchange.",
    answer: "Once the pieces disappear, king activity, opposition, passed pawns, and tempi become decisive.",
    example: "A seemingly favorable queen exchange may produce a lost pawn ending.",
    related: ["LOGIC-066", "CALC-049"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-070",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Endgame Logic",
    title: "Why activate the king before pushing pawns?",
    level: "Intermediate",
    keywords: ["king activity", "pawn push", "endgame"],
    questions: [
      "Why should the king often become active before pushing a pawn?",
      "Why can premature pawn pushes be harmful?"
    ],
    short_answer: "The king may need to occupy key squares before the pawn structure changes.",
    answer: "A pawn push can remove a useful tempo or create a weakness, while king activity often improves the position without changing the structure.",
    example: "Centralizing the king before advancing a passed pawn can make promotion easier.",
    related: ["END-006", "END-043"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-071",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Zugzwang",
    title: "Why can having the move be a disadvantage?",
    level: "Advanced",
    keywords: ["zugzwang", "tempo", "endgame"],
    questions: [
      "How can having to move be bad?",
      "Why is zugzwang possible?"
    ],
    short_answer: "Sometimes every available move worsens the position.",
    answer: "In zugzwang, a player would prefer to pass, but chess does not allow passing.",
    example: "A king forced to move away from opposition can lose access to a key square.",
    related: ["END-016", "PRACTICAL-END-015"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-072",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Tempo",
    title: "Why are reserve tempi useful?",
    level: "Advanced",
    keywords: ["reserve tempo", "pawn move", "zugzwang"],
    questions: [
      "Why keep a pawn move in reserve?",
      "How can a reserve tempo help?"
    ],
    short_answer: "A reserve pawn move can change who must move first.",
    answer: "In some endgames, keeping a legal pawn move allows you to avoid entering zugzwang before the opponent does.",
    example: "A waiting pawn move can force the opponent's king to abandon an important square.",
    related: ["END-017", "LOGIC-071"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-073",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Passed Pawns",
    title: "Why can an outside passed pawn be powerful?",
    level: "Intermediate",
    keywords: ["outside passed pawn", "endgame", "king"],
    questions: [
      "Why is an outside passed pawn useful?",
      "How can an outside passer distract the enemy king?"
    ],
    short_answer: "It can pull the opponent's king away from the main battle.",
    answer: "Once the defending king moves toward the outside pawn, your king or other pawn may penetrate elsewhere.",
    example: "A passed pawn on the opposite wing can create a second target and win time.",
    related: ["END-022", "PRACTICAL-END-025"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-074",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Passed Pawns",
    title: "Why must a passed pawn be supported?",
    level: "Intermediate",
    keywords: ["passed pawn", "support", "promotion"],
    questions: [
      "Why is supporting a passed pawn important?",
      "Can a passed pawn be weak?"
    ],
    short_answer: "A passed pawn can still be blockaded or captured.",
    answer: "Its promotion potential matters only if the pawn can advance safely or tie down enemy pieces.",
    example: "A rook placed behind a passed pawn can help it advance while protecting it.",
    related: ["END-013", "LOGIC-043"],
    source: "Endgame principle",
    verified: true
  },

  {
    id: "LOGIC-075",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Calculation",
    title: "Why evaluate the final position of a variation?",
    level: "Intermediate",
    keywords: ["calculation", "evaluation", "variation"],
    questions: [
      "Why is calculating moves not enough?",
      "Why must I evaluate the position at the end of a variation?"
    ],
    short_answer: "The best-looking sequence is useful only if the resulting position is good.",
    answer: "A forcing line may win material but leave your king exposed or produce a bad endgame.",
    example: "Do not stop after winning a pawn; evaluate king safety, activity, and the resulting structure.",
    related: ["CALC-028", "THINK-027"],
    source: "Calculation principle",
    verified: true
  },

  {
    id: "LOGIC-076",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Evaluation",
    title: "Why evaluate more than material?",
    level: "Intermediate",
    keywords: ["evaluation", "material", "position"],
    questions: [
      "What should I evaluate besides material?",
      "Why is material only one part of evaluation?"
    ],
    short_answer: "King safety, activity, pawn structure, space, and initiative also matter.",
    answer: "A position is the result of several interacting factors, not just the piece count.",
    example: "An equal-material position can be winning because one king is exposed and the other side has active pieces.",
    related: ["THINK-011", "POSITION-002"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "LOGIC-077",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Evaluation",
    title: "Why does activity sometimes outweigh a pawn?",
    level: "Advanced",
    keywords: ["activity", "pawn", "compensation"],
    questions: [
      "Can piece activity be worth a pawn?",
      "Why can active pieces compensate for material?"
    ],
    short_answer: "Activity can create immediate threats and improve coordination.",
    answer: "A pawn advantage has limited value if the opponent's pieces are much more active and create concrete threats.",
    example: "An active rook and bishop against a passive setup may compensate for a pawn deficit.",
    related: ["LOGIC-014", "MIDDLE-010"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "LOGIC-078",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Evaluation",
    title: "Why does king safety change evaluation quickly?",
    level: "Intermediate",
    keywords: ["king safety", "evaluation", "attack"],
    questions: [
      "Why can king safety suddenly change the evaluation?",
      "Why are king attacks often more important than material?"
    ],
    short_answer: "A forcing attack can produce immediate decisive consequences.",
    answer: "A small material advantage cannot compensate for a forced mating sequence.",
    example: "A player can be a pawn ahead but completely lost if the king is trapped in a mating net.",
    related: ["LOGIC-008", "MATE-025"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "LOGIC-079",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Plans",
    title: "Why should a plan be based on the position?",
    level: "Intermediate",
    keywords: ["plan", "strategy", "position"],
    questions: [
      "Why should I not follow the same plan every game?",
      "How should the position determine my plan?"
    ],
    short_answer: "Different positions require different solutions.",
    answer: "Pawn structure, piece placement, king safety, and weaknesses determine which plans are realistic.",
    example: "An open position may call for active pieces, while a closed position may require maneuvering and pawn breaks.",
    related: ["MIDDLE-007", "POSITION-045"],
    source: "Strategic principle",
    verified: true
  },

  {
    id: "LOGIC-080",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Plans",
    title: "Why start by asking what changed?",
    level: "Intermediate",
    keywords: ["planning", "position", "thinking"],
    questions: [
      "Why ask what changed after the opponent's move?",
      "How does this question help find a plan?"
    ],
    short_answer: "The opponent's move may create a new opportunity or threat.",
    answer: "Identifying what changed prevents you from following an outdated plan.",
    example: "If your opponent moves a defender away, a previously impossible tactical idea may become available.",
    related: ["THINK-003", "THINK-005"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-081",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Targets",
    title: "Why attack weaknesses instead of random pieces?",
    level: "Intermediate",
    keywords: ["target", "weakness", "strategy"],
    questions: [
      "Why should I attack a weakness?",
      "What makes a target worth attacking?"
    ],
    short_answer: "A real weakness may require the opponent to defend permanently.",
    answer: "Attacking a stable weakness can tie down enemy pieces and create opportunities elsewhere.",
    example: "A backward pawn that cannot advance may become a long-term target.",
    related: ["POSITION-010", "MIDDLE-024"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-082",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Targets",
    title: "Why create a second weakness?",
    level: "Advanced",
    keywords: ["second weakness", "strategy", "endgame"],
    questions: [
      "Why is a second weakness useful?",
      "Why can one defender struggle against two targets?"
    ],
    short_answer: "A defender may not be able to protect two weaknesses at once.",
    answer: "Creating a second target can stretch the opponent's defensive resources and create a breakthrough.",
    example: "While the opponent defends a queenside pawn, create pressure against a kingside weakness.",
    related: ["MIDDLE-055", "END-025"],
    source: "Strategic principle",
    verified: true
  },

  {
    id: "LOGIC-083",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Space",
    title: "Why restrict the opponent's pieces?",
    level: "Intermediate",
    keywords: ["restriction", "pieces", "space"],
    questions: [
      "Why is restricting pieces useful?",
      "Why can a passive opponent be easier to attack?"
    ],
    short_answer: "Restricted pieces have fewer useful options.",
    answer: "When enemy pieces lack active squares, your own pieces can improve while the opponent struggles to coordinate.",
    example: "A pawn chain that takes away knight squares can make the knight ineffective.",
    related: ["POSITION-041", "MIDDLE-030"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-084",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Space",
    title: "Why can a cramped position be difficult?",
    level: "Intermediate",
    keywords: ["cramped", "space", "mobility"],
    questions: [
      "Why is lack of space uncomfortable?",
      "Why are cramped pieces difficult to coordinate?"
    ],
    short_answer: "Cramped pieces have fewer useful squares.",
    answer: "Limited mobility can prevent development, make defense harder, and reduce tactical possibilities.",
    example: "A knight blocked by its own pawns may struggle to find a useful route.",
    related: ["POSITION-048", "MIDDLE-030"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-085",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Open vs Closed",
    title: "Why do open positions favor long-range pieces?",
    level: "Intermediate",
    keywords: ["open position", "bishops", "rooks"],
    questions: [
      "Why do bishops and rooks like open positions?",
      "Why does opening lines increase their power?"
    ],
    short_answer: "Open lines let long-range pieces use their full range.",
    answer: "Bishops, rooks, and queens can influence distant targets when pawns do not block their paths.",
    example: "An open center can make bishops and rooks much more active.",
    related: ["POSITION-045", "POSITION-029"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-086",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Open vs Closed",
    title: "Why do closed positions require maneuvering?",
    level: "Intermediate",
    keywords: ["closed position", "maneuvering", "strategy"],
    questions: [
      "Why are closed positions slower?",
      "Why is maneuvering important in closed positions?"
    ],
    short_answer: "Blocked lines reduce immediate tactical activity.",
    answer: "Players often need to improve pieces, prepare pawn breaks, and create weaknesses before opening the position.",
    example: "A knight may maneuver to an outpost while both sides prepare a pawn break.",
    related: ["POSITION-046", "MIDDLE-022"],
    source: "Positional principle",
    verified: true
  },

  {
    id: "LOGIC-087",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Risk",
    title: "Why choose a practical move instead of the engine's top move?",
    level: "Advanced",
    keywords: ["practical move", "engine", "decision"],
    questions: [
      "Why might a practical move be better for a human player?",
      "Should I always play the engine's first choice?"
    ],
    short_answer: "The best practical move depends on the position, time, and player.",
    answer: "A slightly less precise move may be easier to understand, calculate, and execute while preserving the advantage.",
    example: "In time trouble, a clear safe move may be preferable to a complicated computer line.",
    related: ["THINK-010", "THINK-050"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-088",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Risk",
    title: "Why avoid unnecessary complications when winning?",
    level: "Intermediate",
    keywords: ["complications", "winning", "risk"],
    questions: [
      "Why should I reduce risk when winning?",
      "Why can unnecessary complications hurt the stronger side?"
    ],
    short_answer: "Complications create more chances for mistakes.",
    answer: "When your advantage is already stable, unnecessary tactical risks may give the opponent practical counterplay.",
    example: "Instead of sacrificing material for a flashy attack, calmly improve your pieces if you are already winning.",
    related: ["LOGIC-065", "THINK-033"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-089",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Risk",
    title: "Why take risks when losing?",
    level: "Intermediate",
    keywords: ["risk", "losing", "counterplay"],
    questions: [
      "Why can a losing player need complications?",
      "Why is passive defense sometimes insufficient?"
    ],
    short_answer: "A losing position may require active counterplay.",
    answer: "If quiet defense only delays an inevitable loss, creating practical threats may be the best chance to change the result.",
    example: "A player down material may keep queens on the board and seek a perpetual or tactical attack.",
    related: ["LOGIC-038", "ATTACK-026"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-090",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Time",
    title: "Why is time on the clock a chess resource?",
    level: "Intermediate",
    keywords: ["time management", "clock", "resource"],
    questions: [
      "Why is thinking time a chess resource?",
      "How can time affect the quality of a move?"
    ],
    short_answer: "Time allows you to calculate and verify decisions.",
    answer: "Using time efficiently can improve accuracy without leaving you vulnerable to time trouble.",
    example: "Spend more time on a critical tactical position than on a routine recapture.",
    related: ["THINK-043", "TOURNAMENT-024"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "LOGIC-091",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Time",
    title: "Why should I spend more time on critical positions?",
    level: "Intermediate",
    keywords: ["critical position", "time", "calculation"],
    questions: [
      "Why not use the same amount of time on every move?",
      "When should I spend extra thinking time?"
    ],
    short_answer: "Critical positions can change the result of the game.",
    answer: "Use more time when several candidate moves exist, tactics are possible, or the position may simplify into a decisive ending.",
    example: "Before a major pawn break, calculate carefully because the resulting structure may be irreversible.",
    related: ["THINK-043", "CALC-041"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-092",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Human Thinking",
    title: "Why can intuition be useful?",
    level: "Intermediate",
    keywords: ["intuition", "pattern recognition", "thinking"],
    questions: [
      "Why can strong players find moves quickly?",
      "What role does chess intuition play?"
    ],
    short_answer: "Experience allows players to recognize familiar patterns quickly.",
    answer: "Intuition can generate promising candidate moves, but critical decisions still need calculation.",
    example: "A player may instinctively recognize that a knight belongs on an outpost from similar positions.",
    related: ["THINK-047", "TRAIN-034"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "LOGIC-093",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Human Thinking",
    title: "Why is intuition not enough?",
    level: "Intermediate",
    keywords: ["intuition", "calculation", "blunder"],
    questions: [
      "Why can intuition fail?",
      "Why should I calculate even when a move feels right?"
    ],
    short_answer: "Tactical details can contradict a good-looking idea.",
    answer: "Pattern recognition helps find moves, but concrete calculation is needed when the position contains forcing tactics.",
    example: "A natural-looking capture may fail to a zwischenzug or discovered attack.",
    related: ["CALC-003", "THINK-048"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-094",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Engines",
    title: "Why can an engine prefer a strange move?",
    level: "Advanced",
    keywords: ["engine", "Stockfish", "computer chess"],
    questions: [
      "Why does a chess engine sometimes choose a strange-looking move?",
      "Why do humans sometimes dislike engine moves?"
    ],
    short_answer: "Engines evaluate concrete consequences more deeply than humans usually can.",
    answer: "A move that looks strange may solve a tactical problem, improve long-term activity, or exploit a precise positional detail.",
    example: "An engine may retreat a piece temporarily because the square it leaves becomes strategically important later.",
    related: ["TECH-021", "THINK-050"],
    source: "Chess engine principle",
    verified: true
  },

  {
    id: "LOGIC-095",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Engines",
    title: "Why should I understand engine moves?",
    level: "Intermediate",
    keywords: ["engine", "learning", "analysis"],
    questions: [
      "Why is engine evaluation alone not enough?",
      "How should I learn from an engine move?"
    ],
    short_answer: "Understanding the reason makes the lesson reusable.",
    answer: "Instead of memorizing a computer move, identify the tactical or positional idea behind it.",
    example: "If the engine recommends a rook lift, ask what target or attacking route the rook is preparing.",
    related: ["TRAIN-026", "TECH-022"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "LOGIC-096",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Pattern Recognition",
    title: "Why do patterns make chess easier?",
    level: "Beginner",
    keywords: ["patterns", "tactics", "recognition"],
    questions: [
      "Why is pattern recognition important in chess?",
      "How do chess patterns save thinking time?"
    ],
    short_answer: "Recognized patterns reduce the need to calculate everything from zero.",
    answer: "Experienced players quickly identify familiar tactical, positional, and endgame structures.",
    example: "Recognizing a back-rank weakness can immediately suggest a tactical idea.",
    related: ["TRAIN-023", "PUZZLE-002"],
    source: "Chess learning principle",
    verified: true
  },

  {
    id: "LOGIC-097",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Learning",
    title: "Why learn from mistakes instead of only studying wins?",
    level: "Beginner",
    keywords: ["mistakes", "learning", "improvement"],
    questions: [
      "Why are mistakes useful for improvement?",
      "Why should I analyze my losses?"
    ],
    short_answer: "Mistakes reveal weaknesses in your decision process.",
    answer: "Studying where and why you went wrong helps prevent the same error from recurring.",
    example: "If you repeatedly miss opponent checks, make threat detection part of your training.",
    related: ["TRAIN-045", "MISTAKE-070"],
    source: "Chess improvement principle",
    verified: true
  },

  {
    id: "LOGIC-098",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Decision Making",
    title: "Why compare candidate moves?",
    level: "Intermediate",
    keywords: ["candidate moves", "comparison", "decision"],
    questions: [
      "Why should I compare candidate moves?",
      "Why is the first good move not always the best move?"
    ],
    short_answer: "Comparing candidates helps identify the strongest practical choice.",
    answer: "A move may look good until another candidate provides better activity, safety, or tactical benefits.",
    example: "Compare a forcing attack with a quiet improving move before committing.",
    related: ["CALC-007", "THINK-007"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-099",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Decision Making",
    title: "Why ask 'What is the opponent's best move?'",
    level: "Intermediate",
    keywords: ["best defense", "opponent", "calculation"],
    questions: [
      "Why should I ask what the opponent would play?",
      "How does this question improve my move selection?"
    ],
    short_answer: "It tests whether your idea works against the strongest resistance.",
    answer: "This question prevents optimistic calculation and helps identify defensive resources.",
    example: "Before launching an attack, find the opponent's most active defensive move.",
    related: ["CALC-014", "THINK-006"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "LOGIC-100",
    type: "CONCEPT",
    category: "Chess Logic",
    topic: "Chess Logic, Concepts & Why",
    subtopic: "Complete Chess Logic",
    title: "What is the basic logic of a strong chess move?",
    level: "Beginner",
    keywords: ["best move", "chess logic", "decision"],
    questions: [
      "What should I ask before making a move?",
      "What is the basic logic behind a good chess decision?"
    ],
    short_answer: "Find the opponent's threat, identify your best candidates, calculate, and evaluate the result.",
    answer: "A strong decision connects tactics, strategy, king safety, activity, and practical factors. First understand the position, then compare realistic candidate moves and verify the opponent's best response.",
    example: "Ask: What changed? What does my opponent threaten? What are my forcing moves? What is the best reply? What position remains after the sequence?",
    related: ["THINK-068", "CALC-060", "TRAIN-080"],
    source: "Chess thinking framework",
    verified: true
  }

];

export default chessLogicConceptsWhy;