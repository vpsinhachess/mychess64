const famousGamesPositions = [

  {
    id: "GAME-001",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Immortal Game",
    title: "What is the Immortal Game?",
    level: "Beginner",
    keywords: ["Immortal Game", "Anderssen", "Kieseritzky"],
    questions: [
      "What is the Immortal Game?",
      "Why is Anderssen's Immortal Game famous?"
    ],
    short_answer: "It is the famous 1851 game Adolf Anderssen won against Lionel Kieseritzky.",
    answer: "The game is famous for spectacular attacking play and multiple sacrifices leading to checkmate.",
    example: "Anderssen sacrificed major material to open lines against the king.",
    related: ["GAME-002", "GAME-010", "TACTIC-001"],
    source: "Historical chess records",
    verified: true
  },

  {
    id: "GAME-002",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Evergreen Game",
    title: "What is the Evergreen Game?",
    level: "Beginner",
    keywords: ["Evergreen Game", "Anderssen", "Dufresne"],
    questions: [
      "What is the Evergreen Game?",
      "Why is it called the Evergreen Game?"
    ],
    short_answer: "It is a famous attacking game played by Adolf Anderssen against Jean Dufresne.",
    answer: "The game is remembered for brilliant tactical ideas and a spectacular mating finish.",
    example: "The attack builds through sacrifices, forcing moves, and a final mating combination.",
    related: ["GAME-001", "GAME-010", "MATE-001"],
    source: "Historical chess records",
    verified: true
  },

  {
    id: "GAME-003",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Opera Game",
    title: "What is the Opera Game?",
    level: "Beginner",
    keywords: ["Opera Game", "Morphy", "Duke", "Count"],
    questions: [
      "What is the Opera Game?",
      "Why is Morphy's Opera Game famous?"
    ],
    short_answer: "It is Paul Morphy's famous 1858 game played at the Paris Opera.",
    answer: "Morphy defeated the Duke of Brunswick and Count Isouard with rapid development, active pieces, and a decisive attack.",
    example: "Morphy showed how development and coordination can be more important than grabbing material.",
    related: ["GAME-004", "OPENING-001", "MIDDLE-001"],
    source: "Historical chess records",
    verified: true
  },

  {
    id: "GAME-004",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Opera Game Lessons",
    title: "What is the main lesson of the Opera Game?",
    level: "Beginner",
    keywords: ["Opera Game", "development", "initiative"],
    questions: [
      "What can beginners learn from the Opera Game?",
      "What makes the Opera Game educational?"
    ],
    short_answer: "Develop pieces quickly and use activity to create threats.",
    answer: "Morphy's play demonstrates development, open lines, coordination, and forcing moves.",
    example: "Instead of repeatedly moving the same piece, develop pieces and make every move useful.",
    related: ["GAME-003", "OPENING-001", "THINK-001"],
    source: "Chess coaching principle based on the Opera Game",
    verified: true
  },

  {
    id: "GAME-005",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Game of the Century",
    title: "What is the Game of the Century?",
    level: "Beginner",
    keywords: ["Game of the Century", "Fischer", "Byrne"],
    questions: [
      "What is the Game of the Century?",
      "Who played the Game of the Century?"
    ],
    short_answer: "It was Donald Byrne's 1956 game against 13-year-old Bobby Fischer.",
    answer: "Fischer produced a celebrated attacking victory featuring a remarkable queen sacrifice and tactical sequence.",
    example: "The game is often studied to understand initiative, development, and tactical calculation.",
    related: ["GAME-006", "TACTIC-001", "CALC-001"],
    source: "Historical chess records",
    verified: true
  },

  {
    id: "GAME-006",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Game of the Century Position",
    title: "Why is Fischer's queen sacrifice famous?",
    level: "Intermediate",
    keywords: ["Fischer", "queen sacrifice", "Byrne"],
    questions: [
      "Why is Fischer's queen sacrifice in the Game of the Century famous?",
      "Was the queen sacrifice simply a material sacrifice?"
    ],
    short_answer: "It enabled Fischer to obtain a powerful tactical attack and decisive material and positional advantages.",
    answer: "The sacrifice worked because Fischer had calculated the resulting forcing sequence and weaknesses around the king.",
    example: "A queen sacrifice is sound when the resulting position provides sufficient tactical or strategic compensation.",
    related: ["GAME-005", "TACTIC-020", "CALC-010"],
    source: "Historical game analysis",
    verified: true
  },

  {
    id: "GAME-007",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Fischer-Spassky",
    title: "Why is Fischer-Spassky 1972 important?",
    level: "Beginner",
    keywords: ["Fischer", "Spassky", "1972", "World Championship"],
    questions: [
      "Why is the Fischer-Spassky 1972 match famous?",
      "What was special about the 1972 World Championship?"
    ],
    short_answer: "It was the famous 1972 World Championship match in Reykjavik.",
    answer: "The match attracted worldwide attention and became one of the most famous events in chess history.",
    example: "Several games from the match are still studied for opening preparation, strategy, and fighting spirit.",
    related: ["GAME-008", "CHAMPION-011", "CHAMPION-010"],
    source: "World Chess Championship historical records",
    verified: true
  },

  {
    id: "GAME-008",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Game 6 Reykjavik 1972",
    title: "Why is Game 6 of Fischer-Spassky 1972 famous?",
    level: "Intermediate",
    keywords: ["Fischer-Spassky", "Game 6", "1972"],
    questions: [
      "Why is Game 6 of Fischer-Spassky famous?",
      "What can players learn from Fischer's sixth game against Spassky?"
    ],
    short_answer: "It is widely celebrated for Fischer's deep strategic and positional play.",
    answer: "Fischer produced a highly controlled game that demonstrated strong preparation, positional understanding, and precise conversion.",
    example: "The game is useful for studying how a player can improve pieces before creating decisive threats.",
    related: ["GAME-007", "MIDDLE-001", "POSITION-001"],
    source: "Historical game analysis",
    verified: true
  },

  {
    id: "GAME-009",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Kasparov Immortal",
    title: "What is Kasparov's Immortal Game?",
    level: "Intermediate",
    keywords: ["Kasparov", "Immortal", "Topalov", "1999"],
    questions: [
      "Which game is called Kasparov's Immortal Game?",
      "Why is Kasparov's 1999 game against Topalov famous?"
    ],
    short_answer: "Kasparov's 1999 game against Veselin Topalov is famous for a spectacular attacking combination.",
    answer: "The game featured deep calculation, sacrifices, tactical pressure, and a memorable king hunt.",
    example: "The game is an excellent study of coordinated attacking pieces and forcing moves.",
    related: ["GAME-010", "TACTIC-020", "MATE-010"],
    source: "Historical game records",
    verified: true
  },

  {
    id: "GAME-010",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Kasparov-Topalov Attack",
    title: "What makes Kasparov's attack against Topalov special?",
    level: "Intermediate",
    keywords: ["Kasparov", "Topalov", "king hunt", "attack"],
    questions: [
      "What is the main lesson from Kasparov-Topalov 1999?",
      "Why is the king hunt so famous?"
    ],
    short_answer: "Kasparov used forcing moves and sacrifices to drive the king into a tactical net.",
    answer: "The game demonstrates how initiative can compensate for material temporarily and how forcing moves can maintain an attack.",
    example: "Checks, captures, and threats repeatedly restricted the opposing king.",
    related: ["GAME-009", "TACTIC-001", "MATE-020"],
    source: "Historical game analysis",
    verified: true
  },

  {
    id: "GAME-011",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Deep Blue",
    title: "Why is Kasparov versus Deep Blue important?",
    level: "Beginner",
    keywords: ["Kasparov", "Deep Blue", "computer chess"],
    questions: [
      "Why is Kasparov versus Deep Blue famous?",
      "What did the Deep Blue matches represent?"
    ],
    short_answer: "They became a landmark in the history of computer chess.",
    answer: "The 1996 and 1997 matches highlighted the rapidly increasing strength of chess computers.",
    example: "The 1997 rematch ended with IBM's Deep Blue defeating Kasparov.",
    related: ["GAME-012", "TECH-001", "CHAMPION-014"],
    source: "Computer chess history",
    verified: true
  },

  {
    id: "GAME-012",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Deep Blue Game 6",
    title: "Why is Deep Blue's sixth game against Kasparov famous?",
    level: "Intermediate",
    keywords: ["Deep Blue", "Kasparov", "1997", "Game 6"],
    questions: [
      "What happened in Game 6 of Kasparov versus Deep Blue?",
      "Why is the final game of the 1997 match remembered?"
    ],
    short_answer: "Deep Blue won Game 6 quickly, securing the 1997 match victory.",
    answer: "The result was historically significant because it marked a major milestone for computer chess against a reigning world champion.",
    example: "The game remains an important reference when discussing the rise of chess engines.",
    related: ["GAME-011", "TECH-002", "CHAMPION-014"],
    source: "Computer chess history",
    verified: true
  },

  {
    id: "GAME-013",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Capablanca Endgame",
    title: "Why are Capablanca's games famous for endgames?",
    level: "Intermediate",
    keywords: ["Capablanca", "endgame", "technique"],
    questions: [
      "Why should Capablanca's games be studied for endgames?",
      "What was special about Capablanca's endgame technique?"
    ],
    short_answer: "Capablanca was renowned for clarity, precision, and exceptional endgame technique.",
    answer: "His games often demonstrate simple-looking moves that gradually create decisive positional advantages.",
    example: "Study how Capablanca improves the king and pieces before converting small advantages.",
    related: ["CHAMPION-003", "END-001", "GAME-014"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-014",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Capablanca Technique",
    title: "What can Capablanca teach about simplification?",
    level: "Intermediate",
    keywords: ["Capablanca", "simplification", "endgame"],
    questions: [
      "When should you simplify like Capablanca?",
      "Why was Capablanca comfortable exchanging pieces?"
    ],
    short_answer: "Simplification is powerful when it leads to a favorable and technically manageable position.",
    answer: "Capablanca often exchanged pieces when doing so made his positional or material advantage easier to convert.",
    example: "If you have a clearly better endgame, exchanging attacking pieces can remove counterplay.",
    related: ["GAME-013", "END-006", "MIDDLE-050"],
    source: "Chess coaching principle based on Capablanca's games",
    verified: true
  },

  {
    id: "GAME-015",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Tal Attacking Games",
    title: "Why are Mikhail Tal's games famous?",
    level: "Beginner",
    keywords: ["Tal", "attacking chess", "sacrifices"],
    questions: [
      "Why are Tal's games so famous?",
      "What should players study in Tal's games?"
    ],
    short_answer: "Tal was famous for imaginative attacks and spectacular sacrifices.",
    answer: "His games demonstrate initiative, tactical calculation, king attacks, and practical pressure.",
    example: "A Tal sacrifice often created several difficult defensive problems at once.",
    related: ["CHAMPION-008", "GAME-016", "TACTIC-020"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-016",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Tal Sacrifices",
    title: "Were all of Tal's sacrifices objectively correct?",
    level: "Advanced",
    keywords: ["Tal", "sacrifice", "calculation"],
    questions: [
      "Were all Tal's sacrifices objectively sound?",
      "What should we learn from Tal's sacrifices?"
    ],
    short_answer: "Not every famous sacrifice needs to be treated as universally best; the practical and tactical context matters.",
    answer: "Tal's games teach players to calculate attacking possibilities and understand compensation rather than sacrifice material blindly.",
    example: "Before sacrificing, calculate the opponent's strongest defensive resources.",
    related: ["GAME-015", "TACTIC-020", "CALC-010"],
    source: "Chess analysis principle",
    verified: true
  },

  {
    id: "GAME-017",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Fischer Endgames",
    title: "Why study Fischer's endgames?",
    level: "Intermediate",
    keywords: ["Fischer", "endgame", "technique"],
    questions: [
      "Was Fischer strong in endgames?",
      "What can Fischer's endgames teach?"
    ],
    short_answer: "Fischer combined precise calculation with strong technical play.",
    answer: "His games show that attacking players can also win technically through accurate endgame decisions.",
    example: "Study his rook endings to understand activity, passed pawns, and king placement.",
    related: ["CHAMPION-011", "END-001", "PRACTICAL-END-001"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-018",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Karpov Positional Games",
    title: "Why are Karpov's games useful for positional study?",
    level: "Intermediate",
    keywords: ["Karpov", "positional chess", "prophylaxis"],
    questions: [
      "Why study Karpov's games?",
      "What positional ideas appear in Karpov's games?"
    ],
    short_answer: "Karpov's games demonstrate restriction, prophylaxis, piece improvement, and gradual pressure.",
    answer: "He often created weaknesses first and then exploited them with precise piece placement.",
    example: "Instead of attacking immediately, improve the worst piece and restrict the opponent.",
    related: ["CHAMPION-012", "POSITION-001", "MIDDLE-001"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-019",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Kasparov Attacking Chess",
    title: "What can Kasparov's games teach about initiative?",
    level: "Intermediate",
    keywords: ["Kasparov", "initiative", "attack"],
    questions: [
      "Why study Kasparov's attacking games?",
      "How did Kasparov use initiative?"
    ],
    short_answer: "Kasparov often combined deep preparation with dynamic piece activity.",
    answer: "His games demonstrate how development, central control, open lines, and calculation can produce sustained initiative.",
    example: "Look for moments where Kasparov increases pressure before the opponent can reorganize.",
    related: ["CHAMPION-013", "GAME-009", "ATTACK-001"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-020",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "King Hunt",
    title: "What is a famous king-hunt position?",
    level: "Intermediate",
    keywords: ["king hunt", "attack", "forcing moves"],
    questions: [
      "What makes a king-hunt position memorable?",
      "How should a king hunt be studied?"
    ],
    short_answer: "A king hunt is memorable when coordinated pieces repeatedly restrict and attack an exposed king.",
    answer: "The key lesson is usually the coordination of attackers and the use of forcing moves.",
    example: "Study where each attacking piece enters the attack and how escape squares are removed.",
    related: ["GAME-009", "MATE-020", "ATTACK-030"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "GAME-021",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Greek Gift",
    title: "What is the famous Greek Gift attacking pattern?",
    level: "Intermediate",
    keywords: ["Greek Gift", "Bxh7", "king attack"],
    questions: [
      "What is the Greek Gift sacrifice?",
      "Why is the Greek Gift famous?"
    ],
    short_answer: "It is a common bishop sacrifice on h7 or h2 intended to expose the enemy king.",
    answer: "The sacrifice can work when the attacking pieces can follow quickly and the king has limited escape squares.",
    example: "The bishop sacrifice is only sound when the resulting attack provides sufficient compensation.",
    related: ["TACTIC-020", "MATE-025", "ATTACK-035"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "GAME-022",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Smothered Mate",
    title: "What is the famous smothered mate pattern?",
    level: "Beginner",
    keywords: ["smothered mate", "knight", "king"],
    questions: [
      "What is a smothered mate?",
      "Why is the smothered mate famous?"
    ],
    short_answer: "A smothered mate occurs when a knight checkmates a king surrounded by its own pieces.",
    answer: "The king cannot escape because its own pieces occupy the surrounding squares.",
    example: "Classic smothered-mate combinations often involve a queen sacrifice to force the king into the trap.",
    related: ["MATE-015", "TACTIC-025", "PUZZLE-030"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "GAME-023",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Back Rank",
    title: "Why are back-rank mates so common in famous games?",
    level: "Beginner",
    keywords: ["back rank", "checkmate", "rook"],
    questions: [
      "Why is the back rank a common mating weakness?",
      "How can a player prevent a back-rank mate?"
    ],
    short_answer: "A king trapped behind its own pawns can be vulnerable to a rook or queen.",
    answer: "Creating luft and controlling the attacking pieces can prevent many back-rank attacks.",
    example: "A simple pawn move can create an escape square for the king.",
    related: ["MATE-010", "ATTACK-050", "MISTAKE-001"],
    source: "Established chess pattern",
    verified: true
  },

  {
    id: "GAME-024",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Rook Seventh Rank",
    title: "Why is a rook on the seventh rank powerful?",
    level: "Intermediate",
    keywords: ["rook", "seventh rank", "passed pawns"],
    questions: [
      "Why are rooks strong on the seventh rank?",
      "What can a rook do on the seventh rank?"
    ],
    short_answer: "A rook on the seventh rank can attack pawns, restrict the king, and support threats.",
    answer: "Its power depends on the position, but penetrating the opponent's second rank can create multiple weaknesses.",
    example: "A rook attacking several pawns at once can force the opponent into passive defense.",
    related: ["END-020", "PRACTICAL-END-030", "POSITION-050"],
    source: "Established rook-endgame principle",
    verified: true
  },

  {
    id: "GAME-025",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Rook Behind Passed Pawn",
    title: "Why is a rook placed behind a passed pawn?",
    level: "Intermediate",
    keywords: ["rook", "passed pawn", "endgame"],
    questions: [
      "Why should a rook often stand behind a passed pawn?",
      "What is the idea behind the rook-behind-pawn rule?"
    ],
    short_answer: "A rook behind a passed pawn can support its advance or attack it from behind.",
    answer: "The correct rook placement depends on whether you own the passed pawn or are defending against it.",
    example: "The attacking rook can support promotion while the defending rook can often check or attack the pawn from behind.",
    related: ["END-015", "PRACTICAL-END-025", "GAME-024"],
    source: "Established endgame principle",
    verified: true
  },

  {
    id: "GAME-026",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Lucena Position",
    title: "What is the Lucena Position?",
    level: "Intermediate",
    keywords: ["Lucena", "rook ending", "bridge"],
    questions: [
      "What is the Lucena position?",
      "Why is Lucena important in rook endgames?"
    ],
    short_answer: "It is a fundamental winning position in rook-and-pawn versus rook endings.",
    answer: "The winning side uses the king and rook to build a bridge and force the defending king away.",
    example: "Learning the Lucena method gives a practical technique for converting an important rook ending.",
    related: ["PRACTICAL-END-030", "END-010", "GAME-027"],
    source: "Established rook-endgame theory",
    verified: true
  },

  {
    id: "GAME-027",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Philidor Position",
    title: "What is the Philidor Position?",
    level: "Intermediate",
    keywords: ["Philidor", "rook ending", "defense"],
    questions: [
      "What is the Philidor position?",
      "Why is the Philidor position important?"
    ],
    short_answer: "It is a fundamental defensive method in rook-and-pawn versus rook endings.",
    answer: "The defending rook uses the third-rank setup and later checks from behind or from the side to prevent promotion.",
    example: "Learning the Philidor method is essential for defending many basic rook endings.",
    related: ["PRACTICAL-END-031", "END-011", "GAME-026"],
    source: "Established rook-endgame theory",
    verified: true
  },

  {
    id: "GAME-028",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Opposition",
    title: "Why is the opposition a famous endgame concept?",
    level: "Beginner",
    keywords: ["opposition", "king", "pawn ending"],
    questions: [
      "What is opposition?",
      "Why is opposition important in famous endgame positions?"
    ],
    short_answer: "Opposition occurs when the kings face each other with an odd number of squares between them.",
    answer: "It can allow one king to force the other away from key squares.",
    example: "In king-and-pawn endings, gaining the opposition can decide whether the pawn promotes.",
    related: ["END-010", "PRACTICAL-END-010", "GAME-029"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "GAME-029",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Zugzwang",
    title: "What is a famous zugzwang position?",
    level: "Intermediate",
    keywords: ["zugzwang", "endgame", "forced move"],
    questions: [
      "What is zugzwang?",
      "Why are famous zugzwang positions important?"
    ],
    short_answer: "Zugzwang is a position where having to move worsens a player's position.",
    answer: "Zugzwang is especially important in pawn and king endings but can occur throughout chess.",
    example: "A player may deliberately improve the position until the opponent runs out of useful moves.",
    related: ["END-020", "PRACTICAL-END-015", "GAME-028"],
    source: "Established chess concept",
    verified: true
  },

  {
    id: "GAME-030",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Bishop and Knight Mate",
    title: "Why is bishop-and-knight checkmate famous?",
    level: "Intermediate",
    keywords: ["bishop", "knight", "checkmate"],
    questions: [
      "Why is bishop-and-knight versus king famous?",
      "Is this checkmate easy to perform?"
    ],
    short_answer: "It is a basic forced mate but requires accurate technique.",
    answer: "The bishop and knight must coordinate to drive the king toward a corner controlled by the correct bishop.",
    example: "The final mating position places the enemy king in the corner while the pieces control its escape squares.",
    related: ["END-050", "PRACTICAL-END-070", "MATE-050"],
    source: "Established endgame theory",
    verified: true
  },

  {
    id: "GAME-031",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "World Championship Classics",
    title: "Why are World Championship games useful to study?",
    level: "Beginner",
    keywords: ["World Championship", "model games", "study"],
    questions: [
      "Why study World Championship games?",
      "What makes championship games educational?"
    ],
    short_answer: "They show high-level preparation, decision-making, strategy, and practical technique.",
    answer: "Instead of memorizing moves, study the plans, critical decisions, and changes in evaluation.",
    example: "Pause before a critical move and try to find the move yourself.",
    related: ["TRAIN-040", "THINK-001", "GAME-032"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-032",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Critical Position",
    title: "What is a critical position in a famous game?",
    level: "Intermediate",
    keywords: ["critical position", "analysis", "decision"],
    questions: [
      "What makes a position critical?",
      "How should a critical position be studied?"
    ],
    short_answer: "A critical position is one where an important decision can significantly change the game.",
    answer: "Look for tactical opportunities, strategic changes, forcing moves, and irreversible decisions.",
    example: "Stop the game before a major sacrifice and calculate the position yourself.",
    related: ["CALC-001", "THINK-020", "TRAIN-050"],
    source: "Chess analysis principle",
    verified: true
  },

  {
    id: "GAME-033",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Model Game",
    title: "What is a model game?",
    level: "Beginner",
    keywords: ["model game", "opening", "study"],
    questions: [
      "What is a model game in chess?",
      "How should I study a model game?"
    ],
    short_answer: "A model game is a representative game that demonstrates typical ideas of an opening or position.",
    answer: "The goal is to understand plans, piece placement, pawn breaks, and typical tactical ideas.",
    example: "Study several model games from your opening rather than memorizing one line.",
    related: ["TRAIN-040", "THEORY-080", "GAME-031"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-034",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Minority Attack",
    title: "What is the famous minority-attack idea?",
    level: "Intermediate",
    keywords: ["minority attack", "pawn structure", "queenside"],
    questions: [
      "What is a minority attack?",
      "Why is it important in famous positional games?"
    ],
    short_answer: "A minority attack uses fewer pawns to attack a larger pawn group and create weaknesses.",
    answer: "It is especially associated with certain Queen's Gambit structures.",
    example: "A queenside pawn advance can create a backward pawn or weak square in the opponent's camp.",
    related: ["POSITION-040", "MIDDLE-030", "GAME-035"],
    source: "Established positional chess concept",
    verified: true
  },

  {
    id: "GAME-035",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Weak Pawn",
    title: "Why do famous positional games attack weak pawns?",
    level: "Intermediate",
    keywords: ["weak pawn", "target", "positional play"],
    questions: [
      "Why is a weak pawn a common target?",
      "How can a weak pawn decide a game?"
    ],
    short_answer: "A weak pawn can become a long-term target that restricts the defender.",
    answer: "When the opponent must defend a fixed weakness, the attacker can improve pieces and create additional pressure.",
    example: "A backward pawn on an open file can be attacked repeatedly.",
    related: ["POSITION-020", "MIDDLE-020", "GAME-034"],
    source: "Established positional chess principle",
    verified: true
  },

  {
    id: "GAME-036",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Outpost",
    title: "Why are famous knight outposts worth studying?",
    level: "Intermediate",
    keywords: ["outpost", "knight", "weak square"],
    questions: [
      "What is an outpost?",
      "Why can an outpost decide a famous game?"
    ],
    short_answer: "An outpost is a strong square, often for a knight, that cannot easily be attacked by enemy pawns.",
    answer: "A well-supported outpost can restrict pieces and create tactical or positional threats.",
    example: "A knight on an advanced protected square can dominate important central or enemy territory.",
    related: ["POSITION-015", "MIDDLE-025", "GAME-037"],
    source: "Established positional chess concept",
    verified: true
  },

  {
    id: "GAME-037",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Bad Bishop",
    title: "Why do famous games demonstrate the bad-bishop problem?",
    level: "Intermediate",
    keywords: ["bad bishop", "pawn structure", "positional"],
    questions: [
      "What is a bad bishop?",
      "How can a bad bishop affect a famous game?"
    ],
    short_answer: "A bad bishop is often restricted by its own pawns.",
    answer: "Its value may be reduced when its own pawn structure blocks its diagonals.",
    example: "Changing the pawn structure or exchanging the bishop can sometimes solve the problem.",
    related: ["POSITION-025", "MIDDLE-040", "GAME-036"],
    source: "Established positional chess concept",
    verified: true
  },

  {
    id: "GAME-038",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Bishop Pair",
    title: "Why is the bishop pair important in famous games?",
    level: "Intermediate",
    keywords: ["bishop pair", "open position", "diagonals"],
    questions: [
      "Why can two bishops be powerful?",
      "When is the bishop pair especially strong?"
    ],
    short_answer: "The bishop pair can become powerful in open positions because the bishops control long diagonals.",
    answer: "Its strength depends on pawn structure, space, and the activity of the bishops.",
    example: "Opening the center can increase the value of the bishop pair.",
    related: ["POSITION-030", "MIDDLE-045", "GAME-037"],
    source: "Established positional chess principle",
    verified: true
  },

  {
    id: "GAME-039",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Exchange Sacrifice",
    title: "What is a famous exchange sacrifice?",
    level: "Intermediate",
    keywords: ["exchange sacrifice", "rook", "compensation"],
    questions: [
      "What is an exchange sacrifice?",
      "Why are exchange sacrifices common in famous games?"
    ],
    short_answer: "An exchange sacrifice gives up a rook for a bishop or knight in return for compensation.",
    answer: "Compensation can include a strong attack, positional advantage, passed pawn, or lasting piece activity.",
    example: "The sacrifice is strongest when the resulting position gives clear and lasting compensation.",
    related: ["TACTIC-020", "ATTACK-035", "GAME-040"],
    source: "Established chess concept",
    verified: true
  },

  {
    id: "GAME-040",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Exchange Sacrifice Examples",
    title: "What should I look for in an exchange sacrifice?",
    level: "Advanced",
    keywords: ["exchange sacrifice", "compensation", "calculation"],
    questions: [
      "How do I judge an exchange sacrifice?",
      "What compensation should I look for?"
    ],
    short_answer: "Look for king safety, activity, pawn structure, passed pawns, and tactical threats.",
    answer: "Do not judge the sacrifice only by material; evaluate the resulting position.",
    example: "A rook sacrifice can be excellent if it removes a key defender and creates a decisive attack.",
    related: ["GAME-039", "CALC-020", "TACTIC-030"],
    source: "Chess evaluation principle",
    verified: true
  },

  {
    id: "GAME-041",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Steinitz",
    title: "Why study Wilhelm Steinitz's games?",
    level: "Intermediate",
    keywords: ["Steinitz", "positional chess", "strategy"],
    questions: [
      "Why is Steinitz important in chess history?",
      "What can be learned from Steinitz's games?"
    ],
    short_answer: "Steinitz helped establish systematic positional chess.",
    answer: "His games demonstrate ideas such as accumulating small advantages before launching an attack.",
    example: "Study how a player can improve a position before making tactical commitments.",
    related: ["CHAMPION-001", "MIDDLE-001", "POSITION-001"],
    source: "Chess history and historical game records",
    verified: true
  },

  {
    id: "GAME-042",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Positional Accumulation",
    title: "What does Steinitz's chess teach about attack?",
    level: "Intermediate",
    keywords: ["Steinitz", "attack", "positional advantage"],
    questions: [
      "Why should an attack be prepared?",
      "What does positional accumulation mean?"
    ],
    short_answer: "A strong attack is often easier after weaknesses and advantages have been created.",
    answer: "Improving pieces, controlling key squares, and restricting the opponent can prepare a decisive attack.",
    example: "Do not attack simply because you have pieces near the king; first check whether the position supports it.",
    related: ["GAME-041", "ATTACK-005", "MIDDLE-010"],
    source: "Classical positional chess principle",
    verified: true
  },

  {
    id: "GAME-043",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Morphy Development",
    title: "What does Morphy's chess teach about development?",
    level: "Beginner",
    keywords: ["Morphy", "development", "initiative"],
    questions: [
      "Why are Morphy's games useful for beginners?",
      "What opening lesson comes from Morphy?"
    ],
    short_answer: "Rapid development and open lines can create a powerful initiative.",
    answer: "Morphy's games clearly demonstrate the value of bringing pieces into play while the opponent loses time.",
    example: "Develop pieces toward useful squares instead of making unnecessary pawn moves.",
    related: ["GAME-003", "OPENING-010", "MIDDLE-005"],
    source: "Historical game analysis",
    verified: true
  },

  {
    id: "GAME-044",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Open Lines",
    title: "Why are open files and diagonals important in famous games?",
    level: "Beginner",
    keywords: ["open file", "diagonal", "rook", "bishop"],
    questions: [
      "Why do famous games often feature open lines?",
      "How should open files be used?"
    ],
    short_answer: "Open lines give long-range pieces routes toward targets and important squares.",
    answer: "Rooks benefit from open files while bishops and queens benefit from open diagonals.",
    example: "Place a rook on an open file where it can attack a target or penetrate the position.",
    related: ["GAME-043", "POSITION-050", "MIDDLE-015"],
    source: "Established chess principle",
    verified: true
  },

  {
    id: "GAME-045",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Kramnik",
    title: "Why study Kramnik's positional games?",
    level: "Intermediate",
    keywords: ["Kramnik", "positional", "opening preparation"],
    questions: [
      "What can Kramnik's games teach?",
      "Why are Kramnik's games important for opening study?"
    ],
    short_answer: "Kramnik combined deep opening preparation with precise positional play.",
    answer: "His games are useful for studying strategic plans that arise from well-prepared openings.",
    example: "Compare his opening choices with the middlegame plans that followed.",
    related: ["CHAMPION-015", "THEORY-080", "MIDDLE-001"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-046",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Anand",
    title: "Why are Viswanathan Anand's games important to study?",
    level: "Intermediate",
    keywords: ["Anand", "India", "speed", "calculation"],
    questions: [
      "What can Anand's games teach?",
      "Why is Anand important in modern chess?"
    ],
    short_answer: "Anand combined exceptional calculation speed, opening preparation, and universal chess ability.",
    answer: "His games show how tactical accuracy and strategic understanding can work together.",
    example: "Study how Anand quickly identifies critical tactical moments after opening preparation.",
    related: ["CHAMPION-016", "INDIA-001", "GAME-047"],
    source: "Historical chess records",
    verified: true
  },

  {
    id: "GAME-047",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Anand Calculation",
    title: "What can Anand's games teach about calculation?",
    level: "Intermediate",
    keywords: ["Anand", "calculation", "tactics"],
    questions: [
      "How can Anand's games improve calculation?",
      "What should I observe in Anand's tactical games?"
    ],
    short_answer: "Study how Anand identifies forcing moves and calculates concrete variations quickly.",
    answer: "Pause before tactical moments and calculate without looking at the engine.",
    example: "Write down your candidate move and main variation before checking the actual game.",
    related: ["GAME-046", "CALC-001", "TRAIN-020"],
    source: "Chess training method",
    verified: true
  },

  {
    id: "GAME-048",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Carlsen",
    title: "Why are Magnus Carlsen's games useful for practical chess?",
    level: "Intermediate",
    keywords: ["Carlsen", "endgame", "practical chess"],
    questions: [
      "What can Carlsen's games teach?",
      "Why is Carlsen famous for winning difficult positions?"
    ],
    short_answer: "Carlsen is renowned for finding practical chances and converting small advantages.",
    answer: "His games are useful for studying persistence, endgames, piece activity, and pressure.",
    example: "Study how Carlsen improves a position without forcing an immediate tactical attack.",
    related: ["CHAMPION-017", "GAME-049", "END-001"],
    source: "Historical chess scholarship",
    verified: true
  },

  {
    id: "GAME-049",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Grinding",
    title: "What does 'grinding' mean in practical chess?",
    level: "Intermediate",
    keywords: ["grinding", "Carlsen", "endgame", "pressure"],
    questions: [
      "What does grinding mean in chess?",
      "Why are some famous Carlsen wins called grinding games?"
    ],
    short_answer: "It means repeatedly improving the position and creating problems until the opponent makes a mistake.",
    answer: "It is especially effective in positions where the defender has a difficult but theoretically holdable task.",
    example: "Keep improving your worst piece instead of forcing a premature breakthrough.",
    related: ["GAME-048", "MIDDLE-010", "THINK-040"],
    source: "Practical chess terminology",
    verified: true
  },

  {
    id: "GAME-050",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Ding Liren",
    title: "Why study Ding Liren's World Championship games?",
    level: "Intermediate",
    keywords: ["Ding Liren", "World Championship", "endgame"],
    questions: [
      "What can Ding Liren's games teach?",
      "Why are Ding's difficult defensive games worth studying?"
    ],
    short_answer: "Ding's games provide examples of deep calculation, resilience, defense, and complex positions.",
    answer: "His World Championship games demonstrate how elite players handle highly complicated positions under pressure.",
    example: "Analyze the critical moments rather than only the final result.",
    related: ["CHAMPION-018", "GAME-051", "THINK-050"],
    source: "World Championship game records",
    verified: true
  },

  {
    id: "GAME-051",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Ding-Gukesh",
    title: "Why is the Ding-Gukesh World Championship match important?",
    level: "Beginner",
    keywords: ["Ding", "Gukesh", "World Championship", "2024"],
    questions: [
      "Why is Ding Liren versus Gukesh historically important?",
      "What happened in the 2024 World Championship?"
    ],
    short_answer: "Gukesh defeated Ding Liren in the 2024 World Championship match and became the youngest undisputed classical world champion.",
    answer: "The match in Singapore was decided in Game 14 when Gukesh won with Black.",
    example: "The final game is useful for studying pressure, endgame technique, and fighting spirit.",
    related: ["CHAMPION-018", "CHAMPION-019", "GAME-052"],
    source: "FIDE World Championship records",
    verified: true
  },

  {
    id: "GAME-052",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Gukesh Game 14",
    title: "Why is Gukesh's final game against Ding famous?",
    level: "Intermediate",
    keywords: ["Gukesh", "Ding", "Game 14", "2024"],
    questions: [
      "Why is Game 14 of Ding-Gukesh famous?",
      "How did Gukesh win the 2024 World Championship?"
    ],
    short_answer: "Gukesh won the decisive 14th game and secured the World Championship.",
    answer: "The game became famous because a late mistake changed the outcome and allowed Gukesh to convert the advantage.",
    example: "It is an excellent lesson in staying alert even in apparently controlled endgames.",
    related: ["GAME-051", "CHAMPION-019", "MISTAKE-050"],
    source: "FIDE World Championship records",
    verified: true
  },

  {
    id: "GAME-053",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Endgame Mistake",
    title: "Why are famous endgame mistakes educational?",
    level: "Intermediate",
    keywords: ["endgame", "mistake", "conversion"],
    questions: [
      "Why study mistakes made by strong players?",
      "Can grandmasters make endgame blunders?"
    ],
    short_answer: "Yes. Even elite players can make mistakes, especially under time and psychological pressure.",
    answer: "Studying such mistakes teaches practical warning signs and improves calculation discipline.",
    example: "After every important endgame move, check the opponent's strongest forcing reply.",
    related: ["GAME-052", "THINK-060", "MISTAKE-060"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-054",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Perpetual Check",
    title: "Why are famous perpetual-check positions important?",
    level: "Intermediate",
    keywords: ["perpetual check", "draw", "queen"],
    questions: [
      "What is perpetual check?",
      "Why is perpetual check an important practical weapon?"
    ],
    short_answer: "Perpetual check occurs when repeated checks force the position to repeat.",
    answer: "It can save a worse position or prevent the opponent from converting an advantage.",
    example: "A player with an exposed king may be unable to escape repeated queen checks.",
    related: ["END-040", "TACTIC-070", "ATTACK-055"],
    source: "Established chess concept",
    verified: true
  },

  {
    id: "GAME-055",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Fortress",
    title: "What is a famous chess fortress?",
    level: "Advanced",
    keywords: ["fortress", "draw", "defense"],
    questions: [
      "What is a fortress in chess?",
      "Why are fortress positions famous?"
    ],
    short_answer: "A fortress is a defensive setup that prevents the stronger side from making progress.",
    answer: "The defender may have less material but can stop breakthroughs indefinitely.",
    example: "A blocked pawn structure can sometimes make a material advantage useless.",
    related: ["END-045", "PRACTICAL-END-080", "GAME-056"],
    source: "Established chess concept",
    verified: true
  },

  {
    id: "GAME-056",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Defensive Resource",
    title: "What is a famous defensive resource?",
    level: "Intermediate",
    keywords: ["defense", "resource", "counterplay"],
    questions: [
      "What is a defensive resource?",
      "Why can one defensive move change a famous game?"
    ],
    short_answer: "A defensive resource is a move or idea that reduces or neutralizes the opponent's advantage.",
    answer: "It can be a tactical counterattack, exchange, blockade, perpetual check, or simplification.",
    example: "Before defending passively, search for an active move that creates a threat.",
    related: ["ATTACK-020", "THINK-030", "GAME-055"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "GAME-057",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Only Move",
    title: "Why are famous 'only move' positions useful?",
    level: "Intermediate",
    keywords: ["only move", "calculation", "defense"],
    questions: [
      "What is an only-move position?",
      "Why should chess players study only-move positions?"
    ],
    short_answer: "It is a position where only one move or a very small number of moves can preserve the evaluation.",
    answer: "Such positions develop calculation, defensive awareness, and precision.",
    example: "Pause before the solution and search for forcing moves before considering quiet options.",
    related: ["CALC-030", "PUZZLE-060", "THINK-025"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-058",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Brilliant Move",
    title: "What makes a chess move brilliant?",
    level: "Beginner",
    keywords: ["brilliant move", "sacrifice", "tactics"],
    questions: [
      "What makes a move brilliant?",
      "Is every brilliant-looking sacrifice actually good?"
    ],
    short_answer: "A brilliant move usually combines strong calculation with an unexpected tactical or strategic idea.",
    answer: "A sacrifice should be judged by the resulting position, not by how attractive it looks.",
    example: "A quiet move can be brilliant if it creates an unavoidable tactical threat.",
    related: ["TACTIC-020", "CALC-020", "GAME-059"],
    source: "Chess analysis principle",
    verified: true
  },

  {
    id: "GAME-059",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Quiet Move",
    title: "Can a quiet move be more brilliant than a sacrifice?",
    level: "Intermediate",
    keywords: ["quiet move", "strategy", "tactics"],
    questions: [
      "Why can quiet moves be brilliant?",
      "How should I find strong quiet moves?"
    ],
    short_answer: "A quiet move can create a threat that the opponent cannot meet.",
    answer: "Look for moves that improve a piece, remove a defender, restrict the king, or prepare an unavoidable threat.",
    example: "Instead of checking immediately, improve the queen's position so the next threat cannot be stopped.",
    related: ["GAME-058", "CALC-035", "MIDDLE-020"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "GAME-060",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Tactical Motif",
    title: "How should I study a famous tactical position?",
    level: "Beginner",
    keywords: ["tactics", "famous position", "calculation"],
    questions: [
      "How do I study famous tactical positions?",
      "Should I memorize the moves?"
    ],
    short_answer: "Try to solve the position first and identify the tactical idea.",
    answer: "Understanding the motif is more valuable than memorizing the move sequence.",
    example: "Ask whether the combination uses a pin, fork, deflection, clearance, or discovered attack.",
    related: ["PUZZLE-001", "TACTIC-001", "CALC-001"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-061",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Evergreen Lessons",
    title: "What tactical lessons can be learned from the Evergreen Game?",
    level: "Intermediate",
    keywords: ["Evergreen Game", "tactics", "attack"],
    questions: [
      "What should I study in the Evergreen Game?",
      "What tactical themes appear in Anderssen's famous game?"
    ],
    short_answer: "Study piece coordination, sacrifices, forcing moves, and mating threats.",
    answer: "The game demonstrates how an attack can become decisive when every attacking piece contributes.",
    example: "Count the attackers and defenders before sacrificing material.",
    related: ["GAME-002", "ATTACK-010", "TACTIC-030"],
    source: "Historical game analysis",
    verified: true
  },

  {
    id: "GAME-062",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Immortal Game Lessons",
    title: "What can the Immortal Game teach about sacrifices?",
    level: "Intermediate",
    keywords: ["Immortal Game", "sacrifice", "attack"],
    questions: [
      "What does the Immortal Game teach about sacrifices?",
      "Should beginners sacrifice pieces like Anderssen?"
    ],
    short_answer: "Study the attacking logic, not the sacrifice itself.",
    answer: "The important lesson is that sacrifices work when they create concrete threats, open lines, or force the king into danger.",
    example: "Never sacrifice simply because a famous player once did so.",
    related: ["GAME-001", "TACTIC-020", "CALC-010"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-063",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Piece Coordination",
    title: "Why is piece coordination visible in famous games?",
    level: "Beginner",
    keywords: ["coordination", "pieces", "attack"],
    questions: [
      "What is piece coordination?",
      "Why should I study coordination in famous games?"
    ],
    short_answer: "Coordination means your pieces work together toward common goals.",
    answer: "Strong coordination increases attacking power and defensive resilience.",
    example: "A queen, bishop, and rook attacking the same area are stronger together than separately.",
    related: ["BASIC-020", "MIDDLE-015", "GAME-064"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "GAME-064",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Worst Piece",
    title: "Why do strong players improve their worst piece?",
    level: "Intermediate",
    keywords: ["worst piece", "improvement", "strategy"],
    questions: [
      "What does improve your worst piece mean?",
      "Why is this idea common in famous games?"
    ],
    short_answer: "The least active piece often limits the strength of the whole position.",
    answer: "Improving it can increase coordination without requiring a tactical breakthrough.",
    example: "Move a poorly placed rook to an open file instead of making another pawn move.",
    related: ["MIDDLE-010", "THINK-030", "GAME-065"],
    source: "Established positional principle",
    verified: true
  },

  {
    id: "GAME-065",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Prophylaxis",
    title: "What is prophylaxis in famous games?",
    level: "Intermediate",
    keywords: ["prophylaxis", "prevention", "strategy"],
    questions: [
      "What is prophylaxis?",
      "Why is prophylaxis important in master games?"
    ],
    short_answer: "Prophylaxis means preventing the opponent's plan before improving your own position.",
    answer: "It can restrict pawn breaks, piece activity, tactical ideas, or king attacks.",
    example: "If your opponent wants a knight outpost, prevent the supporting pawn advance first.",
    related: ["MIDDLE-020", "THINK-035", "GAME-066"],
    source: "Established positional chess principle",
    verified: true
  },

  {
    id: "GAME-066",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Opponent Plan",
    title: "How can famous games teach us to identify the opponent's plan?",
    level: "Beginner",
    keywords: ["opponent plan", "prophylaxis", "strategy"],
    questions: [
      "How do I identify my opponent's plan?",
      "What question should I ask during a game?"
    ],
    short_answer: "Ask: What does my opponent want to do next?",
    answer: "Then check whether that plan creates a threat and whether you can prevent or exploit it.",
    example: "If your opponent wants to open a file against your king, consider controlling or closing that file.",
    related: ["THINK-005", "GAME-065", "ATTACK-020"],
    source: "Chess thinking principle",
    verified: true
  },

  {
    id: "GAME-067",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Passed Pawn",
    title: "Why are famous passed-pawn positions important?",
    level: "Intermediate",
    keywords: ["passed pawn", "endgame", "promotion"],
    questions: [
      "Why is a passed pawn powerful?",
      "How should I study famous passed-pawn positions?"
    ],
    short_answer: "A passed pawn has no enemy pawn blocking its path toward promotion.",
    answer: "It can tie down enemy pieces and create promotion threats.",
    example: "A distant passed pawn can force the opponent's king or rook away from the main battle.",
    related: ["POSITION-040", "END-015", "PRACTICAL-END-020"],
    source: "Established endgame principle",
    verified: true
  },

  {
    id: "GAME-068",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Outside Passed Pawn",
    title: "What is an outside passed pawn?",
    level: "Intermediate",
    keywords: ["outside passed pawn", "endgame", "king"],
    questions: [
      "What is an outside passed pawn?",
      "Why is it important in famous endgames?"
    ],
    short_answer: "It is a passed pawn located away from the main pawn group.",
    answer: "It can distract the enemy king and create winning chances elsewhere.",
    example: "One king may be forced to stop the outside pawn while the other king captures pawns on the opposite side.",
    related: ["GAME-067", "END-025", "PRACTICAL-END-020"],
    source: "Established endgame principle",
    verified: true
  },

  {
    id: "GAME-069",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Centralization",
    title: "Why is king centralization common in famous endgames?",
    level: "Beginner",
    keywords: ["king centralization", "endgame", "king"],
    questions: [
      "Why should the king become active in the endgame?",
      "Why do famous endgames feature centralized kings?"
    ],
    short_answer: "With fewer pieces on the board, the king can safely become an active fighting piece.",
    answer: "An active king can attack pawns, support passed pawns, and control key squares.",
    example: "In a pure pawn ending, king activity can be more important than having an extra tempo.",
    related: ["END-005", "PRACTICAL-END-005", "GAME-070"],
    source: "Established endgame principle",
    verified: true
  },

  {
    id: "GAME-070",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "King Activity",
    title: "Why can the king become the strongest piece in an endgame?",
    level: "Beginner",
    keywords: ["king", "endgame", "activity"],
    questions: [
      "Can the king really become a strong piece?",
      "Why is the king active in endgames?"
    ],
    short_answer: "Yes. With fewer attacking pieces, the king can safely control important squares.",
    answer: "King activity often decides pawn and rook endings.",
    example: "An active king can stop an enemy passed pawn while supporting its own.",
    related: ["GAME-069", "END-005", "PRACTICAL-END-005"],
    source: "Established endgame principle",
    verified: true
  },

  {
    id: "GAME-071",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Game Analysis",
    title: "Should I analyze famous games with an engine first?",
    level: "Beginner",
    keywords: ["engine", "analysis", "famous games"],
    questions: [
      "Should I use an engine when studying famous games?",
      "What is the best order for analyzing a famous game?"
    ],
    short_answer: "Try to understand the game yourself before checking the engine.",
    answer: "Human analysis helps develop calculation and strategic understanding; the engine can then verify your ideas.",
    example: "Pause before critical moves, choose your candidate move, and only then compare with the engine.",
    related: ["TRAIN-050", "TECH-020", "GAME-072"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-072",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Critical Move Training",
    title: "How can I turn a famous game into a training exercise?",
    level: "Beginner",
    keywords: ["training", "famous game", "critical move"],
    questions: [
      "How can I train using famous games?",
      "How do I make famous games interactive?"
    ],
    short_answer: "Stop at critical positions and try to find the next move yourself.",
    answer: "This converts passive game viewing into active calculation and decision-making practice.",
    example: "Hide the next move, calculate for several minutes, then compare your choice with the game.",
    related: ["GAME-031", "TRAIN-040", "PUZZLE-065"],
    source: "Chess training method",
    verified: true
  },

  {
    id: "GAME-073",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Move Without Context",
    title: "Can a famous move be bad in another position?",
    level: "Beginner",
    keywords: ["famous move", "context", "chess principles"],
    questions: [
      "Can I copy a famous move in my own game?",
      "Why should famous moves not be copied blindly?"
    ],
    short_answer: "Yes. A move is good because of the position, not because a famous player played it.",
    answer: "Chess decisions depend on concrete tactics, pawn structure, king safety, and piece placement.",
    example: "A sacrifice that works in one position may simply lose material in another.",
    related: ["GAME-062", "THINK-040", "MISTAKE-040"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "GAME-074",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Pattern Recognition",
    title: "How do famous positions improve pattern recognition?",
    level: "Beginner",
    keywords: ["pattern recognition", "training", "positions"],
    questions: [
      "Can famous positions improve pattern recognition?",
      "How often should I review famous positions?"
    ],
    short_answer: "Yes. Repeated exposure helps you recognize tactical and strategic patterns faster.",
    answer: "Focus on the underlying pattern rather than memorizing the exact position.",
    example: "Study several positions involving the same mating pattern or pawn structure.",
    related: ["TRAIN-030", "PUZZLE-050", "GAME-060"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-075",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Learning from Losses",
    title: "Can a famous loss be more educational than a win?",
    level: "Beginner",
    keywords: ["loss", "learning", "analysis"],
    questions: [
      "Why study famous losses?",
      "Can losing games teach more than winning games?"
    ],
    short_answer: "Yes. Losses often reveal mistakes, defensive problems, and missed opportunities clearly.",
    answer: "A famous loss can show how a strong player responded to pressure and where the position changed.",
    example: "Find the first moment where the losing side's evaluation changed significantly.",
    related: ["TRAIN-050", "MISTAKE-050", "GAME-076"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-076",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "First Mistake",
    title: "What is the first mistake in a famous game?",
    level: "Intermediate",
    keywords: ["first mistake", "analysis", "blunder"],
    questions: [
      "Why should I find the first mistake?",
      "What is the value of finding the first error?"
    ],
    short_answer: "The first significant mistake often explains why later problems occurred.",
    answer: "Finding the first error helps you understand the cause instead of only reacting to the final blunder.",
    example: "A later tactical loss may have started with an earlier weakening pawn move.",
    related: ["GAME-075", "TRAIN-055", "MISTAKE-050"],
    source: "Chess game-analysis principle",
    verified: true
  },

  {
    id: "GAME-077",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Position Rebuilding",
    title: "Why should players rebuild famous positions on a board?",
    level: "Beginner",
    keywords: ["board", "position", "visualization"],
    questions: [
      "Should I set up famous positions on a real board?",
      "Why is rebuilding a position useful?"
    ],
    short_answer: "Rebuilding positions improves visualization and makes the position easier to understand.",
    answer: "Moving the pieces yourself helps you see piece relationships, lines, and tactical patterns.",
    example: "Set up a famous position and try to explain the purpose of every important piece.",
    related: ["CALC-030", "TRAIN-060", "GAME-078"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-078",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Positions",
    subtopic: "Explain the Position",
    title: "What questions should I ask when studying a famous position?",
    level: "Beginner",
    keywords: ["position study", "questions", "analysis"],
    questions: [
      "How should I question a famous position?",
      "What should I look for first?"
    ],
    short_answer: "Check king safety, material, piece activity, pawn structure, threats, and plans.",
    answer: "Then identify the critical feature that makes the position special.",
    example: "Ask: What is each side trying to achieve, and which move changes the evaluation?",
    related: ["THINK-020", "GAME-032", "GAME-077"],
    source: "Chess analysis framework",
    verified: true
  },

  {
    id: "GAME-079",
    type: "Famous Game",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Best Games Collection",
    title: "How should I build my own collection of famous games?",
    level: "Beginner",
    keywords: ["game collection", "study", "model games"],
    questions: [
      "How many famous games should I study?",
      "How should I choose games for my collection?"
    ],
    short_answer: "Choose games that match your openings, weaknesses, and training goals.",
    answer: "A small collection studied deeply is more useful than hundreds of games viewed passively.",
    example: "Keep separate collections for attacking games, endgames, your opening repertoire, and positional games.",
    related: ["GAME-033", "TRAIN-040", "TRAIN-070"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "GAME-080",
    type: "Famous Position",
    category: "Famous Games & Positions",
    topic: "Famous Games",
    subtopic: "Golden Rule",
    title: "What is the best way to learn from famous chess games?",
    level: "Beginner",
    keywords: ["famous games", "study method", "chess improvement"],
    questions: [
      "What is the best way to study famous chess games?",
      "How can famous games improve my chess?"
    ],
    short_answer: "Solve critical positions, understand the plans, and learn the ideas rather than memorizing moves.",
    answer: "Use famous games as active training material: predict moves, explain plans, identify mistakes, and verify with analysis.",
    example: "Pause at every critical position and ask, 'What would I play here and why?'",
    related: ["GAME-031", "GAME-072", "TRAIN-080"],
    source: "Chess training principle",
    verified: true
  }

];

export default famousGamesPositions;