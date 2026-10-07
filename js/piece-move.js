const piecesMovesSpecialMoves = [
  {
    id: "MOVE-001",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Chess Pieces",
    title: "How many types of pieces are there in chess?",
    level: "Beginner",
    keywords: ["chess pieces", "six pieces", "pieces"],
    questions: [
      "How many types of chess pieces are there?",
      "What are the six chess pieces?"
    ],
    short_answer: "There are six types: king, queen, rook, bishop, knight, and pawn.",
    answer: "Each type has its own movement and role.",
    example: "A knight jumps in an L-shape, while a rook moves along ranks and files.",
    related: ["BASIC-011", "MOVE-002"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-002",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King",
    title: "How does the king move?",
    level: "Beginner",
    keywords: ["king", "king move", "one square"],
    questions: [
      "How does the king move in chess?",
      "Can the king move more than one square?"
    ],
    short_answer: "The king normally moves one square in any direction.",
    answer: "It can move one square horizontally, vertically, or diagonally, provided the destination is not under attack.",
    example: "A king on e4 can move to d3, e3, f3, d4, f4, d5, e5, or f5 if legal.",
    related: ["MOVE-003", "RULE-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-003",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King",
    title: "Can the king move into check?",
    level: "Beginner",
    keywords: ["king", "check", "legal move"],
    questions: [
      "Can a king move onto an attacked square?",
      "Why can't the king move into check?"
    ],
    short_answer: "No. The king may never move onto a square attacked by an enemy piece.",
    answer: "A king move that leaves or places the king in check is illegal.",
    example: "If a rook controls e8, the opposing king cannot move to e8.",
    related: ["RULE-008", "RULE-009", "MOVE-002"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-004",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Queen",
    title: "How does the queen move?",
    level: "Beginner",
    keywords: ["queen", "queen movement", "sliding piece"],
    questions: [
      "How can the queen move?",
      "What directions can the queen move?"
    ],
    short_answer: "The queen moves any number of squares along a rank, file, or diagonal.",
    answer: "The queen combines the movement of a rook and bishop.",
    example: "From d4, a queen can move along the d-file, fourth rank, and both diagonals.",
    related: ["MOVE-005", "MOVE-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-005",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Rook",
    title: "How does the rook move?",
    level: "Beginner",
    keywords: ["rook", "rook movement", "rank", "file"],
    questions: [
      "How does a rook move?",
      "Can a rook move diagonally?"
    ],
    short_answer: "A rook moves any number of squares horizontally or vertically.",
    answer: "It moves along ranks and files but never diagonally.",
    example: "A rook on d4 can move along the fourth rank or d-file.",
    related: ["MOVE-004", "BASIC-040"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-006",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Bishop",
    title: "How does the bishop move?",
    level: "Beginner",
    keywords: ["bishop", "bishop movement", "diagonal"],
    questions: [
      "How does a bishop move?",
      "Can a bishop move straight?"
    ],
    short_answer: "A bishop moves any number of squares diagonally.",
    answer: "A bishop stays on the same square color throughout the game.",
    example: "A bishop starting on a1 can only move on dark squares.",
    related: ["MOVE-007", "BASIC-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-007",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Bishop",
    title: "Why does a bishop stay on one color?",
    level: "Beginner",
    keywords: ["bishop", "square color", "diagonal"],
    questions: [
      "Can a bishop change square color?",
      "Why is a bishop called a light-squared or dark-squared bishop?"
    ],
    short_answer: "A bishop always remains on the same color square.",
    answer: "Every diagonal connects squares of the same color, so the bishop cannot change colors.",
    example: "A bishop on a1 remains on dark squares for the entire game.",
    related: ["MOVE-006", "BASIC-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-008",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight",
    title: "How does the knight move?",
    level: "Beginner",
    keywords: ["knight", "knight movement", "L shape"],
    questions: [
      "How does a knight move?",
      "What is the knight's movement pattern?"
    ],
    short_answer: "The knight moves in an L-shape: two squares in one direction and one square sideways.",
    answer: "It can move to any of up to eight destination squares from a central position.",
    example: "A knight on e4 can move to c3, c5, d2, d6, f2, f6, g3, or g5.",
    related: ["MOVE-009", "MOVE-010"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-009",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight",
    title: "Can a knight jump over pieces?",
    level: "Beginner",
    keywords: ["knight", "jump", "pieces"],
    questions: [
      "Can a knight jump over other pieces?",
      "Does a knight need a clear path?"
    ],
    short_answer: "Yes. The knight can jump over pieces.",
    answer: "Unlike sliding pieces, a knight's path does not need to be clear.",
    example: "A knight can jump over pawns surrounding it at the beginning of the game.",
    related: ["MOVE-008", "MOVE-011"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-010",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight",
    title: "How many squares can a knight attack?",
    level: "Intermediate",
    keywords: ["knight", "attacks", "mobility"],
    questions: [
      "How many squares can a knight attack?",
      "What is the maximum number of knight moves from the center?"
    ],
    short_answer: "A centrally placed knight can attack up to eight squares.",
    answer: "The actual number depends on its location and the board edge.",
    example: "A knight on e4 has eight possible destinations on an empty board.",
    related: ["MOVE-008", "BASIC-037"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-011",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Sliding Pieces",
    title: "Which chess pieces are sliding pieces?",
    level: "Beginner",
    keywords: ["sliding pieces", "queen", "rook", "bishop"],
    questions: [
      "Which pieces are called sliding pieces?",
      "What are sliding chess pieces?"
    ],
    short_answer: "Queens, rooks, and bishops are sliding pieces.",
    answer: "They can move multiple squares along their lines when the path is clear.",
    example: "A rook can travel several squares along an open file.",
    related: ["MOVE-004", "MOVE-005", "MOVE-006"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "MOVE-012",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Blocking",
    title: "Can a piece move through another piece?",
    level: "Beginner",
    keywords: ["blocking", "piece movement", "path"],
    questions: [
      "Can a rook move through another piece?",
      "What happens if a piece blocks a sliding piece?"
    ],
    short_answer: "No. Sliding pieces cannot move through another piece.",
    answer: "A rook, bishop, or queen needs a clear path to its destination.",
    example: "A rook blocked by a pawn cannot move to squares beyond that pawn.",
    related: ["MOVE-011", "MOVE-013"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-013",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Captures",
    title: "How does a piece capture another piece?",
    level: "Beginner",
    keywords: ["capture", "taking", "chess pieces"],
    questions: [
      "What does it mean to capture a piece?",
      "How does capturing work in chess?"
    ],
    short_answer: "A piece captures by moving to a square occupied by an enemy piece.",
    answer: "The captured piece is removed from the board.",
    example: "If a rook legally moves to a square occupied by an enemy bishop, the bishop is captured.",
    related: ["MOVE-014", "NOTATION-012"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-014",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Captures",
    title: "Can a piece capture its own piece?",
    level: "Beginner",
    keywords: ["capture", "own piece", "illegal move"],
    questions: [
      "Can you capture your own piece?",
      "Can a chess piece move onto a square occupied by your own piece?"
    ],
    short_answer: "No. A player cannot capture or occupy a square with their own piece.",
    answer: "Your own pieces block movement and remain on the board.",
    example: "A rook cannot move onto a square occupied by its own knight.",
    related: ["MOVE-013", "RULE-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-015",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "How does a pawn move?",
    level: "Beginner",
    keywords: ["pawn", "pawn movement", "forward"],
    questions: [
      "How does a pawn move?",
      "Can a pawn move backward?"
    ],
    short_answer: "A pawn normally moves one square forward and cannot move backward.",
    answer: "White pawns move toward the eighth rank; Black pawns move toward the first rank.",
    example: "A white pawn on e4 normally moves to e5 if that square is empty.",
    related: ["MOVE-016", "MOVE-017"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-016",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "Can a pawn move two squares?",
    level: "Beginner",
    keywords: ["pawn", "two squares", "starting position"],
    questions: [
      "When can a pawn move two squares?",
      "Can every pawn move two squares?"
    ],
    short_answer: "A pawn may move two squares from its original position if both squares are clear.",
    answer: "The two-square move is available only from the pawn's starting rank.",
    example: "A white pawn on e2 can move to e4 if e3 and e4 are empty.",
    related: ["MOVE-015", "MOVE-018"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-017",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "How does a pawn capture?",
    level: "Beginner",
    keywords: ["pawn capture", "diagonal", "pawn"],
    questions: [
      "How does a pawn capture?",
      "Does a pawn capture straight ahead?"
    ],
    short_answer: "A pawn captures one square diagonally forward.",
    answer: "A pawn moves straight forward but captures diagonally.",
    example: "A white pawn on e4 can capture a black piece on d5 or f5.",
    related: ["MOVE-015", "MOVE-018"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-018",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "Can a pawn capture forward?",
    level: "Beginner",
    keywords: ["pawn", "capture", "forward"],
    questions: [
      "Can a pawn capture a piece directly in front of it?",
      "Why can't a pawn capture forward?"
    ],
    short_answer: "No. A normal pawn captures diagonally, not straight ahead.",
    answer: "A piece directly in front of a pawn blocks its normal forward move.",
    example: "If a black piece is directly in front of a white pawn, the pawn cannot capture it.",
    related: ["MOVE-017", "MOVE-019"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-019",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "Can a pawn move forward if occupied?",
    level: "Beginner",
    keywords: ["pawn", "blocked pawn", "movement"],
    questions: [
      "What happens if a piece is directly in front of a pawn?",
      "Can a pawn move into an occupied square?"
    ],
    short_answer: "No. A pawn cannot move forward onto an occupied square.",
    answer: "The square immediately ahead must be empty for a normal pawn move.",
    example: "A white pawn on e4 cannot move to e5 if e5 is occupied.",
    related: ["MOVE-015", "MOVE-018"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-020",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn",
    title: "What is pawn promotion?",
    level: "Beginner",
    keywords: ["pawn promotion", "promotion", "eighth rank"],
    questions: [
      "What happens when a pawn reaches the last rank?",
      "What is pawn promotion?"
    ],
    short_answer: "A pawn reaching the opposite last rank must be promoted.",
    answer: "It is replaced by a queen, rook, bishop, or knight of the same color.",
    example: "A white pawn reaching the eighth rank can become a queen.",
    related: ["MOVE-021", "RULE-019"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-021",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Promotion",
    title: "Can a pawn promote to a knight?",
    level: "Beginner",
    keywords: ["promotion", "knight promotion", "underpromotion"],
    questions: [
      "Can you promote a pawn to a knight?",
      "What pieces can a pawn become?"
    ],
    short_answer: "Yes. A pawn can promote to a queen, rook, bishop, or knight.",
    answer: "Promotion does not have to be to a queen.",
    example: "A knight promotion can be useful when it gives an immediate fork.",
    related: ["MOVE-020", "MOVE-022"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-022",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Underpromotion",
    title: "What is underpromotion?",
    level: "Intermediate",
    keywords: ["underpromotion", "promotion", "knight"],
    questions: [
      "What does underpromotion mean?",
      "Why would a player underpromote?"
    ],
    short_answer: "Underpromotion means promoting a pawn to a rook, bishop, or knight instead of a queen.",
    answer: "It is usually chosen for a specific tactical or endgame reason.",
    example: "A knight promotion may give check or create a fork when a queen would not.",
    related: ["MOVE-021", "TACTIC-018"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-023",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Promotion",
    title: "Can you have two queens in chess?",
    level: "Beginner",
    keywords: ["two queens", "promotion", "queen"],
    questions: [
      "Can one player have two queens?",
      "Can a promoted pawn create another queen?"
    ],
    short_answer: "Yes. A player can have multiple queens through pawn promotion.",
    answer: "The original queen does not limit the number of promoted queens.",
    example: "If two pawns promote to queens, the player can have three queens in total.",
    related: ["MOVE-020", "MOVE-021"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-024",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "What is castling?",
    level: "Beginner",
    keywords: ["castling", "king", "rook"],
    questions: [
      "What is castling in chess?",
      "How does castling work?"
    ],
    short_answer: "Castling is a special move involving the king and a rook.",
    answer: "The king moves two squares toward the rook, and the rook moves to the square the king crossed.",
    example: "Kingside castling moves White's king from e1 to g1 and rook from h1 to f1.",
    related: ["MOVE-025", "MOVE-026"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-025",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "What are the two types of castling?",
    level: "Beginner",
    keywords: ["castling", "kingside", "queenside"],
    questions: [
      "What are kingside and queenside castling?",
      "How many types of castling are there?"
    ],
    short_answer: "There are kingside and queenside castling.",
    answer: "Kingside castling is written O-O; queenside castling is written O-O-O.",
    example: "White castles kingside from e1 to g1 or queenside from e1 to c1.",
    related: ["MOVE-024", "NOTATION-018"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-026",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "What are the basic conditions for castling?",
    level: "Intermediate",
    keywords: ["castling rules", "king", "rook"],
    questions: [
      "When is castling legal?",
      "What conditions must be satisfied before castling?"
    ],
    short_answer: "The king and involved rook must meet the castling conditions, and the king cannot be in check or cross an attacked square.",
    answer: "The relevant squares between king and rook must also be empty.",
    example: "A king on e1 cannot castle through an attacked square.",
    related: ["MOVE-027", "RULE-016"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-027",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Can you castle out of check?",
    level: "Beginner",
    keywords: ["castling", "check", "king"],
    questions: [
      "Can a king castle while in check?",
      "Is castling allowed when the king is currently in check?"
    ],
    short_answer: "No. A player cannot castle while the king is in check.",
    answer: "Castling cannot be used as a way to escape an existing check.",
    example: "If White's king on e1 is checked, White must resolve the check normally.",
    related: ["MOVE-026", "RULE-009"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-028",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Can you castle through check?",
    level: "Beginner",
    keywords: ["castling", "attacked square", "king"],
    questions: [
      "Can the king cross an attacked square while castling?",
      "Can you castle through check?"
    ],
    short_answer: "No. The king may not pass through an attacked square.",
    answer: "The king's starting, crossing, and destination squares must satisfy the attack restrictions.",
    example: "If f1 is attacked, White cannot castle kingside.",
    related: ["MOVE-026", "MOVE-027"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-029",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Can you castle if the rook has moved before?",
    level: "Beginner",
    keywords: ["castling", "rook moved", "castling rights"],
    questions: [
      "Can you castle with a rook that already moved?",
      "Does a rook lose castling rights after moving?"
    ],
    short_answer: "No. Once that rook has moved, that castling right is permanently lost.",
    answer: "Returning the rook to its original square does not restore the right.",
    example: "A rook that moved from h1 to h2 and back to h1 cannot castle with the king.",
    related: ["MOVE-030", "RULE-016"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-030",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Can you castle if the king has moved?",
    level: "Beginner",
    keywords: ["castling", "king moved", "castling rights"],
    questions: [
      "Does moving the king lose castling rights?",
      "Can the king return and castle later?"
    ],
    short_answer: "No. Once the king has moved, castling rights are permanently lost.",
    answer: "Returning the king to its original square does not restore castling rights.",
    example: "Ke1-e2-Ke1 means White can no longer castle.",
    related: ["MOVE-026", "MOVE-029"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-031",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "En Passant",
    title: "What is en passant?",
    level: "Intermediate",
    keywords: ["en passant", "pawn", "special capture"],
    questions: [
      "What is en passant?",
      "How does an en passant capture work?"
    ],
    short_answer: "En passant is a special pawn capture available after a specific two-square pawn move.",
    answer: "The capturing pawn moves diagonally to the square passed over by the enemy pawn, which is then removed.",
    example: "A white pawn on e5 can capture a black pawn that moves d7-d5 by playing exd6 en passant.",
    related: ["MOVE-032", "MOVE-033"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-032",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "En Passant",
    title: "When is en passant possible?",
    level: "Intermediate",
    keywords: ["en passant", "timing", "pawn"],
    questions: [
      "When can en passant be played?",
      "How long does the en passant opportunity last?"
    ],
    short_answer: "It is available only immediately after the qualifying two-square pawn move.",
    answer: "If the opportunity is not used immediately, it is lost.",
    example: "After ...d7-d5 beside a white pawn on e5, White must capture en passant immediately or lose the opportunity.",
    related: ["MOVE-031", "MOVE-033"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-033",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "En Passant",
    title: "Why does en passant exist?",
    level: "Intermediate",
    keywords: ["en passant", "pawn", "two-square move"],
    questions: [
      "Why was en passant introduced?",
      "Why can a pawn capture another pawn that is not on the destination square?"
    ],
    short_answer: "It prevents a pawn from avoiding a normal pawn confrontation by advancing two squares.",
    answer: "The rule treats the two-square advance as if the pawn had advanced one square for this capture.",
    example: "A pawn on e5 can capture a pawn passing from d7 to d5 on d6.",
    related: ["MOVE-031", "MOVE-032"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-034",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King",
    title: "Can the king capture an enemy piece?",
    level: "Beginner",
    keywords: ["king", "capture", "enemy piece"],
    questions: [
      "Can the king capture?",
      "Is the king allowed to take an enemy piece?"
    ],
    short_answer: "Yes, if the destination square is not attacked by an enemy piece.",
    answer: "The king can capture like a one-square piece, but it may never move into check.",
    example: "A king can capture an undefended enemy pawn next to it.",
    related: ["MOVE-003", "MOVE-035"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-035",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King",
    title: "Can a king capture a protected piece?",
    level: "Beginner",
    keywords: ["king capture", "protected piece", "check"],
    questions: [
      "Can the king capture a protected enemy piece?",
      "Why can't a king take a defended piece?"
    ],
    short_answer: "Not if the protecting piece attacks the destination square.",
    answer: "The king cannot capture a piece if doing so would place the king in check.",
    example: "If a bishop protects an enemy pawn, the king cannot capture that pawn on the protected square.",
    related: ["MOVE-034", "MOVE-003"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-036",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Queen",
    title: "Can the queen jump over pieces?",
    level: "Beginner",
    keywords: ["queen", "jump", "blocking"],
    questions: [
      "Can a queen jump over a piece?",
      "Does the queen need a clear path?"
    ],
    short_answer: "No. The queen cannot jump over pieces.",
    answer: "The entire path between the queen and its destination must be clear.",
    example: "A queen on d1 cannot move to d5 if a piece blocks d3.",
    related: ["MOVE-004", "MOVE-012"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-037",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Rook",
    title: "Can the rook jump over pieces?",
    level: "Beginner",
    keywords: ["rook", "jump", "blocking"],
    questions: [
      "Can a rook jump over another piece?",
      "Does a rook need an open path?"
    ],
    short_answer: "No. A rook cannot jump over pieces.",
    answer: "Every square between the rook and its destination must be empty.",
    example: "A rook cannot pass through a pawn on the same file.",
    related: ["MOVE-005", "MOVE-012"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-038",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Bishop",
    title: "Can a bishop jump over pieces?",
    level: "Beginner",
    keywords: ["bishop", "jump", "blocking"],
    questions: [
      "Can a bishop jump over pieces?",
      "Does a bishop need a clear diagonal?"
    ],
    short_answer: "No. A bishop needs a clear diagonal.",
    answer: "Any piece between the bishop and its destination blocks the bishop.",
    example: "A bishop cannot move beyond a pawn standing on its diagonal.",
    related: ["MOVE-006", "MOVE-012"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-039",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight",
    title: "Can a knight capture a piece after jumping?",
    level: "Beginner",
    keywords: ["knight", "capture", "jump"],
    questions: [
      "Can a knight capture after jumping over pieces?",
      "Can a knight capture an enemy piece on its destination square?"
    ],
    short_answer: "Yes. The knight can jump over pieces and capture an enemy piece on its destination square.",
    answer: "Only the destination square matters for the knight's movement.",
    example: "A knight can jump over several pieces and capture a rook on its destination square.",
    related: ["MOVE-009", "MOVE-013"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-040",
    type: "PIECE",
    category: "Pieces",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight",
    title: "Can a knight move to a square occupied by its own piece?",
    level: "Beginner",
    keywords: ["knight", "own piece", "legal move"],
    questions: [
      "Can a knight land on its own piece?",
      "Does the knight block itself?"
    ],
    short_answer: "No. A knight cannot move to a square occupied by its own piece.",
    answer: "The knight can jump over its own pieces, but cannot finish on one.",
    example: "A knight cannot move to a square occupied by its own bishop.",
    related: ["MOVE-009", "MOVE-014"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-041",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Legal Move",
    title: "What makes a chess move legal?",
    level: "Beginner",
    keywords: ["legal move", "chess move", "rules"],
    questions: [
      "What is a legal chess move?",
      "How do I know whether a move is legal?"
    ],
    short_answer: "A legal move follows the piece's movement rules and does not leave your king in check.",
    answer: "Special moves must also satisfy their specific conditions.",
    example: "Moving a pinned piece may be illegal if it exposes your king to check.",
    related: ["RULE-006", "RULE-008", "MOVE-042"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-042",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King Safety",
    title: "Can you make a move that leaves your king in check?",
    level: "Beginner",
    keywords: ["king safety", "illegal move", "check"],
    questions: [
      "Can I leave my king in check?",
      "What happens if my move exposes my king?"
    ],
    short_answer: "No. A move that leaves your own king in check is illegal.",
    answer: "King safety is a fundamental requirement for every legal move.",
    example: "If a pinned rook moves away and exposes the king to a bishop, the move is illegal.",
    related: ["MOVE-041", "RULE-009"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-043",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pinned Piece",
    title: "Can a pinned piece move?",
    level: "Intermediate",
    keywords: ["pin", "pinned piece", "legal move"],
    questions: [
      "Can a pinned piece move?",
      "Is every move by a pinned piece illegal?"
    ],
    short_answer: "A pinned piece can move if the move is legal and does not expose the king.",
    answer: "A pin does not automatically make every movement illegal.",
    example: "A pinned knight may sometimes capture the pinning piece or otherwise resolve the pin.",
    related: ["MOVE-042", "TACTIC-025"],
    source: "Chess principles and FIDE Laws",
    verified: true
  },
  {
    id: "MOVE-044",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Check",
    title: "What must you do when your king is in check?",
    level: "Beginner",
    keywords: ["check", "king", "legal response"],
    questions: [
      "What can I do when my king is in check?",
      "How do I get out of check?"
    ],
    short_answer: "You must make a legal move that removes the check.",
    answer: "You can move the king, capture the checking piece, or block the line when blocking is possible.",
    example: "Against a rook check along a file, you may move the king or interpose a piece if legal.",
    related: ["RULE-009", "MOVE-045"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-045",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Check",
    title: "Can every check be blocked?",
    level: "Intermediate",
    keywords: ["check", "block", "knight check"],
    questions: [
      "Can you always block a check?",
      "Which checks cannot be blocked?"
    ],
    short_answer: "No. Knight checks and some other direct checks cannot be blocked.",
    answer: "Blocking works only against line attacks where a piece can be inserted between attacker and king.",
    example: "A knight checking a king cannot be stopped by placing a piece between them.",
    related: ["MOVE-044", "MATE-004"],
    source: "Chess principles",
    verified: true
  },
  {
    id: "MOVE-046",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Capture the Checker",
    title: "Can you capture the checking piece?",
    level: "Beginner",
    keywords: ["check", "capture", "checker"],
    questions: [
      "Can I capture the piece giving check?",
      "Is capturing the checker a legal way to escape check?"
    ],
    short_answer: "Yes, if the capture is legal and removes the check.",
    answer: "The capturing piece must not leave the king in check.",
    example: "A king may capture a checking piece only if the destination square is safe.",
    related: ["MOVE-044", "MOVE-035"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-047",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Double Check",
    title: "How do you respond to double check?",
    level: "Intermediate",
    keywords: ["double check", "king", "check"],
    questions: [
      "What can you do in double check?",
      "Can you block a double check?"
    ],
    short_answer: "In double check, the king must move.",
    answer: "A non-king move cannot remove both checks simultaneously in the normal double-check situation.",
    example: "If a discovered attack creates a second check, the king must move to a safe square.",
    related: ["TACTIC-041", "MOVE-044"],
    source: "Chess principles",
    verified: true
  },
  {
    id: "MOVE-048",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King Capture",
    title: "Can kings stand next to each other?",
    level: "Beginner",
    keywords: ["kings", "king distance", "illegal position"],
    questions: [
      "Can two kings be adjacent?",
      "Can kings stand next to each other?"
    ],
    short_answer: "No. Kings cannot occupy adjacent squares because each would attack the other.",
    answer: "A legal chess position cannot have the two kings attacking each other.",
    example: "White's king cannot move next to Black's king.",
    related: ["MOVE-003", "RULE-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-049",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "King Movement",
    title: "Can the king move one square diagonally?",
    level: "Beginner",
    keywords: ["king", "diagonal", "movement"],
    questions: [
      "Can a king move diagonally?",
      "How far can a king move diagonally?"
    ],
    short_answer: "Yes. The king can move one square diagonally.",
    answer: "Diagonal movement is one of the king's normal movement options.",
    example: "A king on e4 can move to d5 or f5 if those squares are safe.",
    related: ["MOVE-002", "MOVE-003"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-050",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Queen Movement",
    title: "Can the queen move like a knight?",
    level: "Beginner",
    keywords: ["queen", "knight", "movement"],
    questions: [
      "Can a queen move like a knight?",
      "Does the queen have knight movement?"
    ],
    short_answer: "No. The queen does not move like a knight.",
    answer: "The queen moves along ranks, files, and diagonals.",
    example: "A queen cannot make an L-shaped knight move.",
    related: ["MOVE-004", "MOVE-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-051",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Rook Movement",
    title: "Can a rook move diagonally?",
    level: "Beginner",
    keywords: ["rook", "diagonal", "movement"],
    questions: [
      "Can a rook move diagonally?",
      "What directions can a rook move?"
    ],
    short_answer: "No. A rook moves only horizontally or vertically.",
    answer: "Its movement follows ranks and files.",
    example: "A rook on e4 can move along the e-file or fourth rank, not to d5.",
    related: ["MOVE-005", "MOVE-052"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-052",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Bishop Movement",
    title: "Can a bishop move straight?",
    level: "Beginner",
    keywords: ["bishop", "straight", "movement"],
    questions: [
      "Can a bishop move vertically?",
      "Can a bishop move horizontally?"
    ],
    short_answer: "No. A bishop moves only diagonally.",
    answer: "The bishop's movement is restricted to diagonal lines.",
    example: "A bishop on c4 cannot move to c5 or d4.",
    related: ["MOVE-006", "MOVE-051"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-053",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Knight Movement",
    title: "Can a knight move like a bishop?",
    level: "Beginner",
    keywords: ["knight", "bishop", "movement"],
    questions: [
      "Can a knight move diagonally like a bishop?",
      "Does a knight move in straight lines?"
    ],
    short_answer: "No. The knight has its unique L-shaped movement.",
    answer: "It does not follow ranks, files, or diagonals like sliding pieces.",
    example: "A knight from e4 can go to f6 but not to e6 or g6.",
    related: ["MOVE-008", "MOVE-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-054",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn Direction",
    title: "Do White and Black pawns move in the same direction?",
    level: "Beginner",
    keywords: ["pawn direction", "white pawn", "black pawn"],
    questions: [
      "Which direction do White pawns move?",
      "Which direction do Black pawns move?"
    ],
    short_answer: "White pawns move toward the eighth rank; Black pawns move toward the first rank.",
    answer: "The two colors move pawns in opposite directions.",
    example: "White's e-pawn moves from e2 toward e8, while Black's e-pawn moves from e7 toward e1.",
    related: ["MOVE-015", "MOVE-055"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-055",
    type: "MOVE_RULE",
    category: "Legal Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Pawn Promotion",
    title: "Can a pawn move backward after promotion?",
    level: "Beginner",
    keywords: ["pawn", "promotion", "piece movement"],
    questions: [
      "Can a promoted pawn move backward?",
      "Does promotion change how the piece moves?"
    ],
    short_answer: "A promoted pawn becomes another piece and moves according to that piece's rules.",
    answer: "After promotion, it is no longer a pawn.",
    example: "A pawn promoted to a rook can then move like a rook.",
    related: ["MOVE-020", "MOVE-021"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-056",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Which rook is used for kingside castling?",
    level: "Beginner",
    keywords: ["kingside castling", "rook", "castling"],
    questions: [
      "Which rook is used for kingside castling?",
      "Where does the rook go in O-O?"
    ],
    short_answer: "The rook on the h-file is used for kingside castling.",
    answer: "The king moves two squares toward that rook and the rook moves next to the king.",
    example: "White's O-O moves the king e1-g1 and rook h1-f1.",
    related: ["MOVE-024", "MOVE-025"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-057",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Castling",
    title: "Which rook is used for queenside castling?",
    level: "Beginner",
    keywords: ["queenside castling", "rook", "castling"],
    questions: [
      "Which rook is used for queenside castling?",
      "Where does the rook go in O-O-O?"
    ],
    short_answer: "The rook on the a-file is used for queenside castling.",
    answer: "The king moves two squares toward that rook and the rook moves next to the king.",
    example: "White's O-O-O moves the king e1-c1 and rook a1-d1.",
    related: ["MOVE-024", "MOVE-025"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-058",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Promotion",
    title: "Can you promote to a piece already on the board?",
    level: "Intermediate",
    keywords: ["promotion", "same piece", "queen"],
    questions: [
      "Can a pawn promote to a queen when you already have a queen?",
      "Can promotion create a second rook or knight?"
    ],
    short_answer: "Yes. Promotion can create a piece of a type you already have.",
    answer: "The number of pieces of a type is not limited to the original starting number.",
    example: "A player with one queen can promote a pawn to another queen.",
    related: ["MOVE-020", "MOVE-023"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-059",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Promotion",
    title: "Does a pawn have to promote to a queen?",
    level: "Beginner",
    keywords: ["promotion", "queen", "underpromotion"],
    questions: [
      "Must every pawn promote to a queen?",
      "Can I choose another piece instead of a queen?"
    ],
    short_answer: "No. The player chooses a queen, rook, bishop, or knight.",
    answer: "Choosing a non-queen piece is called underpromotion.",
    example: "A player may choose a knight if that gives a tactical advantage.",
    related: ["MOVE-021", "MOVE-022"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "MOVE-060",
    type: "SPECIAL_MOVE",
    category: "Special Moves",
    topic: "Pieces, Moves & Special Moves",
    subtopic: "Special Moves",
    title: "What are the three special chess moves?",
    level: "Beginner",
    keywords: ["special moves", "castling", "en passant", "promotion"],
    questions: [
      "What are the special moves in chess?",
      "Which chess moves have special rules?"
    ],
    short_answer: "The main special moves are castling, en passant, and pawn promotion.",
    answer: "Each has conditions that differ from normal piece movement.",
    example: "O-O is castling, exd6 e.p. can represent en passant, and a pawn reaching the last rank promotes.",
    related: ["MOVE-024", "MOVE-031", "MOVE-020"],
    source: "FIDE Laws of Chess",
    verified: true
  }
];

export default piecesMovesSpecialMoves;