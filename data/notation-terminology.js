const notationTerminology = [
  {
    id: "NOTATION-001",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Basics",
    title: "Algebraic notation",
    level: "Beginner",
    keywords: ["algebraic", "notation", "chess"],
    questions: [
      "What is algebraic notation?",
      "How do chess players record moves?"
    ],
    short_answer: "Algebraic notation is the standard system used to record chess moves.",
    answer: "It identifies destination squares with file letters and rank numbers, with piece symbols added when needed.",
    example: "e4 and Nf3 are algebraic chess moves.",
    related: ["RULE-043", "MOVE-041"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-002",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Basics",
    title: "Square names",
    level: "Beginner",
    keywords: ["square", "names", "chess"],
    questions: [
      "How is a chess square named?",
      "How do I identify a chess square?"
    ],
    short_answer: "A square is named by a file letter followed by a rank number.",
    answer: "The file comes first and the rank comes second.",
    example: "e4 means file e, rank 4.",
    related: ["BASIC-003", "NOTATION-001"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-003",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Basics",
    title: "Files in notation",
    level: "Beginner",
    keywords: ["files", "notation", "chess"],
    questions: [
      "How are files written?",
      "What letters identify the files?"
    ],
    short_answer: "Files are identified by the letters a through h.",
    answer: "The letters are lowercase in standard algebraic notation.",
    example: "The first file is the a-file.",
    related: ["BASIC-003", "NOTATION-002"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-004",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Basics",
    title: "Ranks in notation",
    level: "Beginner",
    keywords: ["ranks", "notation", "chess"],
    questions: [
      "How are ranks written?",
      "What numbers identify the ranks?"
    ],
    short_answer: "Ranks are identified by the numbers 1 through 8.",
    answer: "The rank number follows the file letter.",
    example: "g7 is file g and rank 7.",
    related: ["BASIC-004", "NOTATION-003"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-005",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "King symbol",
    level: "Beginner",
    keywords: ["king", "symbol", "notation"],
    questions: [
      "What letter represents the king?",
      "What is the notation for a king move?"
    ],
    short_answer: "The king is represented by K.",
    answer: "The piece letter is followed by the destination square.",
    example: "Ke2 means the king moves to e2.",
    related: ["MOVE-002", "NOTATION-004"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-006",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "Queen symbol",
    level: "Beginner",
    keywords: ["queen", "symbol", "notation"],
    questions: [
      "What letter represents the queen?",
      "What is the notation for a queen move?"
    ],
    short_answer: "The queen is represented by Q.",
    answer: "Q comes before the destination square.",
    example: "Qd4 means the queen moves to d4.",
    related: ["MOVE-004", "NOTATION-005"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-007",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "Rook symbol",
    level: "Beginner",
    keywords: ["rook", "symbol", "notation"],
    questions: [
      "What letter represents the rook?",
      "What is the notation for a rook move?"
    ],
    short_answer: "The rook is represented by R.",
    answer: "R comes before the destination square.",
    example: "Ra1 means a rook moves to a1.",
    related: ["MOVE-005", "NOTATION-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-008",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "Bishop symbol",
    level: "Beginner",
    keywords: ["bishop", "symbol", "notation"],
    questions: [
      "What letter represents the bishop?",
      "What is the notation for a bishop move?"
    ],
    short_answer: "The bishop is represented by B.",
    answer: "B comes before the destination square.",
    example: "Bg5 means a bishop moves to g5.",
    related: ["MOVE-006", "NOTATION-007"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-009",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "Knight symbol",
    level: "Beginner",
    keywords: ["knight", "symbol", "notation"],
    questions: [
      "What letter represents the knight?",
      "Why is a knight written as N?"
    ],
    short_answer: "The knight is represented by N.",
    answer: "N is used because K is already used for the king.",
    example: "Nf3 means a knight moves to f3.",
    related: ["MOVE-008", "NOTATION-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-010",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Piece Symbols",
    title: "Pawn notation",
    level: "Beginner",
    keywords: ["pawn", "notation", "chess"],
    questions: [
      "How is a pawn move written?",
      "Why is there no P in a pawn move?"
    ],
    short_answer: "A normal pawn move is written using only its destination square.",
    answer: "P is not normally written for a pawn move.",
    example: "e4 means a pawn moves to e4.",
    related: ["MOVE-015", "NOTATION-011"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-011",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Simple piece move",
    level: "Beginner",
    keywords: ["piece", "move", "notation"],
    questions: [
      "How do I write a simple piece move?",
      "What does a move like Bf4 mean?"
    ],
    short_answer: "Write the piece letter followed by the destination square.",
    answer: "No capture symbol is needed when no piece is captured.",
    example: "Bf4 means a bishop moves to f4.",
    related: ["MOVE-006", "NOTATION-010"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-012",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Simple pawn move",
    level: "Beginner",
    keywords: ["pawn", "move", "notation"],
    questions: [
      "How do I write a simple pawn move?",
      "What does e5 mean?"
    ],
    short_answer: "Write the destination square only.",
    answer: "The starting square is normally omitted.",
    example: "e5 means a pawn moves to e5.",
    related: ["MOVE-015", "NOTATION-011"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-013",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Capture symbol",
    level: "Beginner",
    keywords: ["capture", "symbol", "notation"],
    questions: [
      "What symbol shows a capture?",
      "How do I show a capture in notation?"
    ],
    short_answer: "The letter x indicates a capture.",
    answer: "For pieces, the piece letter comes before x; for pawns, the origin file comes before x.",
    example: "Nxe5 means a knight captures on e5.",
    related: ["MOVE-013", "NOTATION-014"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-014",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Pawn capture notation",
    level: "Beginner",
    keywords: ["pawn", "capture", "notation"],
    questions: [
      "How is a pawn capture written?",
      "How do I write a pawn capture?"
    ],
    short_answer: "A pawn capture uses its starting file, x, and the destination square.",
    answer: "The pawn's starting rank is not included.",
    example: "exd5 means the e-pawn captures on d5.",
    related: ["MOVE-017", "NOTATION-013"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-015",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Check notation",
    level: "Beginner",
    keywords: ["check", "plus", "notation"],
    questions: [
      "How is check shown in chess notation?",
      "What does the plus sign mean?"
    ],
    short_answer: "A plus sign (+) indicates check.",
    answer: "It is placed after the move that gives check.",
    example: "Qh5+ means the queen moves to h5 and gives check.",
    related: ["RULE-009", "NOTATION-016"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-016",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Moves",
    title: "Checkmate notation",
    level: "Beginner",
    keywords: ["checkmate", "mate", "notation"],
    questions: [
      "How is checkmate shown in notation?",
      "What does # mean in chess notation?"
    ],
    short_answer: "The symbol # is commonly used to indicate checkmate.",
    answer: "Some systems may also use ++, but # is the standard modern symbol.",
    example: "Qh7# means the move checkmates the king.",
    related: ["RULE-010", "NOTATION-015"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-017",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Castling",
    title: "Kingside castling notation",
    level: "Beginner",
    keywords: ["O-O", "castling", "kingside"],
    questions: [
      "How is kingside castling written?",
      "What does O-O mean?"
    ],
    short_answer: "Kingside castling is written O-O.",
    answer: "It is the special move where the king castles toward the h-file rook.",
    example: "1.O-O means White castles kingside.",
    related: ["MOVE-024", "MOVE-056"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-018",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Castling",
    title: "Queenside castling notation",
    level: "Beginner",
    keywords: ["O-O-O", "castling", "queenside"],
    questions: [
      "How is queenside castling written?",
      "What does O-O-O mean?"
    ],
    short_answer: "Queenside castling is written O-O-O.",
    answer: "It is the special move where the king castles toward the a-file rook.",
    example: "1.O-O-O means White castles queenside.",
    related: ["MOVE-025", "MOVE-057"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-019",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Promotion",
    title: "Promotion notation",
    level: "Beginner",
    keywords: ["promotion", "pawn", "notation"],
    questions: [
      "How is pawn promotion written?",
      "How do I record a promotion?"
    ],
    short_answer: "Promotion is shown by the destination square followed by = and the new piece.",
    answer: "A promotion may be to a queen, rook, bishop, or knight.",
    example: "e8=Q means the pawn promotes to a queen.",
    related: ["MOVE-020", "MOVE-021"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-020",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "En Passant",
    title: "En passant notation",
    level: "Intermediate",
    keywords: ["en passant", "notation", "pawn"],
    questions: [
      "How is en passant written?",
      "Does en passant have a special notation symbol?"
    ],
    short_answer: "En passant is recorded like a normal pawn capture.",
    answer: "The notation identifies the pawn's starting file, x, and destination square; e.p. may be added for clarity.",
    example: "exd6 e.p. can describe an en passant capture.",
    related: ["MOVE-031", "MOVE-032"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-021",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Disambiguation",
    title: "Disambiguation in notation",
    level: "Intermediate",
    keywords: ["disambiguation", "same piece", "notation"],
    questions: [
      "Why does chess notation sometimes include an extra letter?",
      "What is disambiguation in chess notation?"
    ],
    short_answer: "Disambiguation identifies which piece made a move when two identical pieces can legally move to the same square.",
    answer: "The file or rank, or both, may be included to distinguish the pieces.",
    example: "Nbd2 means the knight from the b-file moves to d2.",
    related: ["NOTATION-022", "NOTATION-023"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-022",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Disambiguation",
    title: "File disambiguation",
    level: "Intermediate",
    keywords: ["file", "disambiguation", "knight"],
    questions: [
      "When is a file used for disambiguation?",
      "What does Nbd2 mean?"
    ],
    short_answer: "The originating file is used when it is sufficient to identify the moving piece.",
    answer: "This occurs when two identical pieces can reach the same destination and their files distinguish them.",
    example: "Nbd2 means the knight from the b-file goes to d2.",
    related: ["NOTATION-021", "NOTATION-023"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-023",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Disambiguation",
    title: "Rank disambiguation",
    level: "Intermediate",
    keywords: ["rank", "disambiguation", "rook"],
    questions: [
      "When is a rank used for disambiguation?",
      "Why might a rook move include its starting rank?"
    ],
    short_answer: "The starting rank is used when it is sufficient to distinguish the two pieces.",
    answer: "It is used instead of the file when the file alone cannot distinguish the pieces.",
    example: "R1e2 can indicate that the rook from the first rank moves to e2.",
    related: ["NOTATION-021", "NOTATION-024"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-024",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Disambiguation",
    title: "Full disambiguation",
    level: "Intermediate",
    keywords: ["disambiguation", "file", "rank"],
    questions: [
      "Can both file and rank be needed in notation?",
      "When is full disambiguation required?"
    ],
    short_answer: "Yes. Both file and rank may be needed if neither alone identifies the moving piece.",
    answer: "The notation then specifies the complete origin square.",
    example: "A move may be recorded as R1e1 when the rank is needed to distinguish rooks.",
    related: ["NOTATION-021", "NOTATION-022", "NOTATION-023"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-025",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Move Numbers",
    title: "Move numbers",
    level: "Beginner",
    keywords: ["move number", "notation", "game score"],
    questions: [
      "What do move numbers mean?",
      "Why are chess moves numbered?"
    ],
    short_answer: "Move numbers identify each full move of White and Black.",
    answer: "White's move is normally written after the move number, followed by Black's move.",
    example: "1.e4 e5 means White and Black have completed move one.",
    related: ["NOTATION-026", "NOTATION-027"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-026",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Move Numbers",
    title: "Full move",
    level: "Intermediate",
    keywords: ["full move", "move number", "chess"],
    questions: [
      "What is a full move in chess?",
      "What does one full move include?"
    ],
    short_answer: "A full move consists of one White move and one Black move.",
    answer: "Move numbers count full moves rather than individual turns.",
    example: "1.e4 e5 is one full move.",
    related: ["NOTATION-025", "NOTATION-027"],
    source: "Chess notation terminology",
    verified: true
  },
  {
    id: "NOTATION-027",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Move Numbers",
    title: "Ply",
    level: "Intermediate",
    keywords: ["ply", "half move", "chess"],
    questions: [
      "What is a ply in chess?",
      "Is one move the same as one ply?"
    ],
    short_answer: "One ply is one move by one player.",
    answer: "Therefore, one White move and one Black move equal two plies.",
    example: "1.e4 is one ply; 1.e4 e5 is two plies.",
    related: ["NOTATION-026", "NOTATION-028"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "NOTATION-028",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Move Numbers",
    title: "Half-move",
    level: "Intermediate",
    keywords: ["half move", "ply", "notation"],
    questions: [
      "What is a half-move in chess?",
      "Is a half-move the same as a ply?"
    ],
    short_answer: "In chess programming and notation contexts, a half-move generally means one ply.",
    answer: "It means one move by either White or Black.",
    example: "White playing e4 is one half-move or ply.",
    related: ["NOTATION-027", "TECH-001"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "NOTATION-029",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Results",
    title: "Game result 1-0",
    level: "Beginner",
    keywords: ["1-0", "result", "White wins"],
    questions: [
      "What does 1-0 mean in chess?",
      "Which player wins when the result is 1-0?"
    ],
    short_answer: "1-0 means White won the game.",
    answer: "It is the standard game-result notation for a White victory.",
    example: "A checkmate of Black is normally recorded with a final result of 1-0.",
    related: ["NOTATION-030", "NOTATION-031"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-030",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Results",
    title: "Game result 0-1",
    level: "Beginner",
    keywords: ["0-1", "result", "Black wins"],
    questions: [
      "What does 0-1 mean in chess?",
      "Which player wins when the result is 0-1?"
    ],
    short_answer: "0-1 means Black won the game.",
    answer: "It is the standard game-result notation for a Black victory.",
    example: "If White resigns, the result is normally 0-1.",
    related: ["NOTATION-029", "NOTATION-031"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-031",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Results",
    title: "Draw result",
    level: "Beginner",
    keywords: ["draw", "1/2-1/2", "result"],
    questions: [
      "How is a draw recorded?",
      "What does 1/2-1/2 mean?"
    ],
    short_answer: "1/2-1/2 means the game was drawn.",
    answer: "Both players receive half a point in a standard scoring system.",
    example: "A mutually agreed draw can be recorded as 1/2-1/2.",
    related: ["RULE-011", "NOTATION-029"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-032",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Symbols",
    title: "Check symbol",
    level: "Beginner",
    keywords: ["plus", "check", "symbol"],
    questions: [
      "What does + mean in chess?",
      "What does the plus sign after a move mean?"
    ],
    short_answer: "The plus sign means the move gives check.",
    answer: "The opponent's king is under direct attack after the move.",
    example: "Bb5+ gives check to the black king.",
    related: ["NOTATION-015", "RULE-009"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-033",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Symbols",
    title: "Checkmate symbol",
    level: "Beginner",
    keywords: ["mate", "checkmate", "#"],
    questions: [
      "What does # mean in chess?",
      "What does a hash symbol after a move mean?"
    ],
    short_answer: "# indicates checkmate.",
    answer: "It means the king is in check and has no legal way to escape.",
    example: "Qh7# means the move checkmates the king.",
    related: ["NOTATION-016", "RULE-010"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-034",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Symbols",
    title: "Capture notation",
    level: "Beginner",
    keywords: ["x", "capture", "notation"],
    questions: [
      "What does x mean in chess notation?",
      "Why is x used in moves?"
    ],
    short_answer: "x indicates that a piece was captured.",
    answer: "It is placed between the piece or pawn-origin information and the destination square.",
    example: "Bxe5 means a bishop captures on e5.",
    related: ["NOTATION-013", "MOVE-013"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-035",
    type: "concept",
    category: "Notation",
    topic: "Chess Notation & Terminology",
    subtopic: "Symbols",
    title: "Promotion equals sign",
    level: "Beginner",
    keywords: ["promotion", "=", "notation"],
    questions: [
      "What does = mean in promotion notation?",
      "What does e8=Q mean?"
    ],
    short_answer: "= identifies the piece selected during promotion.",
    answer: "The symbol is followed by Q, R, B, or N.",
    example: "e8=Q means the pawn promotes to a queen.",
    related: ["NOTATION-019", "MOVE-020"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-036",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Check",
    level: "Beginner",
    keywords: ["check", "king", "attack"],
    questions: [
      "What does check mean?",
      "When is a king in check?"
    ],
    short_answer: "A king is in check when it is under attack by an enemy piece.",
    answer: "The player must make a legal move that removes the check.",
    example: "A rook attacking a king along an open file can give check.",
    related: ["RULE-009", "NOTATION-032"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-037",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Checkmate",
    level: "Beginner",
    keywords: ["checkmate", "mate", "king"],
    questions: [
      "What is checkmate?",
      "How do you know a position is checkmate?"
    ],
    short_answer: "Checkmate occurs when the king is in check and there is no legal move to escape.",
    answer: "Checkmate ends the game immediately.",
    example: "A king attacked by a queen with no safe escape square is checkmated.",
    related: ["RULE-010", "NOTATION-033"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-038",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Stalemate",
    level: "Beginner",
    keywords: ["stalemate", "draw", "king"],
    questions: [
      "What is stalemate?",
      "Why is stalemate a draw?"
    ],
    short_answer: "Stalemate occurs when the player to move has no legal move and is not in check.",
    answer: "Under the FIDE Laws, stalemate ends the game as a draw.",
    example: "A king trapped on the edge with no legal move but not in check is stalemated.",
    related: ["RULE-012", "NOTATION-039"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-039",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Dead position",
    level: "Intermediate",
    keywords: ["dead position", "draw", "legal moves"],
    questions: [
      "What is a dead position?",
      "When is a chess position dead?"
    ],
    short_answer: "A dead position is one where neither player can checkmate the opponent by any possible legal sequence.",
    answer: "The game is drawn when the position becomes dead.",
    example: "A position with only two kings is a simple example of a dead position.",
    related: ["RULE-013", "NOTATION-038"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-040",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Legal move",
    level: "Beginner",
    keywords: ["legal move", "move", "rules"],
    questions: [
      "What is a legal move?",
      "How is a legal move defined?"
    ],
    short_answer: "A legal move follows the movement rules and does not leave the player's own king in check.",
    answer: "Special moves must also satisfy their specific conditions.",
    example: "A rook moving along an empty rank can be legal if it does not expose its king.",
    related: ["MOVE-041", "RULE-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-041",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Illegal move",
    level: "Beginner",
    keywords: ["illegal move", "rules", "chess"],
    questions: [
      "What is an illegal move?",
      "What makes a chess move illegal?"
    ],
    short_answer: "An illegal move violates the movement rules or leaves the player's own king in check.",
    answer: "An illegal move is not a valid move under the Laws of Chess.",
    example: "Moving a king onto an attacked square is illegal.",
    related: ["MOVE-041", "RULE-046"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-042",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Initial position",
    level: "Beginner",
    keywords: ["initial position", "starting position", "chess"],
    questions: [
      "What is the initial position?",
      "What does starting position mean?"
    ],
    short_answer: "The initial position is the official starting arrangement of all chess pieces.",
    answer: "White starts at the first and second ranks, while Black starts at the eighth and seventh ranks.",
    example: "The game begins from the standard initial position unless a valid starting position is specified.",
    related: ["BASIC-009", "RULE-001"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-043",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Position",
    level: "Beginner",
    keywords: ["position", "board", "chess"],
    questions: [
      "What is a chess position?",
      "What does position mean in chess?"
    ],
    short_answer: "A chess position is the complete arrangement of pieces, side to move, and relevant game-state information.",
    answer: "The position determines which moves are legal and how the game can continue.",
    example: "Two games can reach the same position through different move orders.",
    related: ["NOTATION-042", "TECH-005"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "NOTATION-044",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Side to move",
    level: "Beginner",
    keywords: ["side to move", "White", "Black"],
    questions: [
      "What does side to move mean?",
      "Why is the side to move important?"
    ],
    short_answer: "The side to move is the player whose turn it is.",
    answer: "Changing the side to move can completely change the evaluation of a position.",
    example: "The same board can be winning for White if White moves first but losing if Black moves first.",
    related: ["NOTATION-043", "RULE-004"],
    source: "Chess terminology",
    verified: true
  },
  {
    id: "NOTATION-045",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Material",
    level: "Beginner",
    keywords: ["material", "pieces", "value"],
    questions: [
      "What does material mean in chess?",
      "What is a material advantage?"
    ],
    short_answer: "Material refers to the pieces and pawns each player has.",
    answer: "A material advantage means having greater or more valuable remaining forces.",
    example: "Being a rook ahead means having a significant material advantage.",
    related: ["BASIC-030", "NOTATION-046"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-046",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position",
    title: "Piece activity",
    level: "Intermediate",
    keywords: ["piece activity", "activity", "chess"],
    questions: [
      "What does piece activity mean?",
      "What is an active piece?"
    ],
    short_answer: "Piece activity describes how effectively a piece influences useful squares and lines.",
    answer: "Active pieces often have greater mobility, targets, or influence.",
    example: "A rook on an open file is often more active than a rook trapped behind pawns.",
    related: ["BASIC-037", "NOTATION-045"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-047",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Board",
    title: "File",
    level: "Beginner",
    keywords: ["file", "chessboard", "a-file"],
    questions: [
      "What is a file in chess?",
      "How are files arranged?"
    ],
    short_answer: "A file is a vertical column of eight squares.",
    answer: "Files are named a through h.",
    example: "The e-file contains e1 through e8.",
    related: ["BASIC-003", "NOTATION-048"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-048",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Board",
    title: "Rank",
    level: "Beginner",
    keywords: ["rank", "chessboard", "row"],
    questions: [
      "What is a rank in chess?",
      "How are ranks defined?"
    ],
    short_answer: "A rank is a horizontal row of eight squares.",
    answer: "Ranks are numbered 1 through 8.",
    example: "The fourth rank contains a4 through h4.",
    related: ["BASIC-004", "NOTATION-047"],
    source: "FIDE Laws of Chess",
    verified: true
  },
  {
    id: "NOTATION-049",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Board",
    title: "Diagonal",
    level: "Beginner",
    keywords: ["diagonal", "chess", "bishop"],
    questions: [
      "What is a diagonal in chess?",
      "What is a chess diagonal?"
    ],
    short_answer: "A diagonal is a straight line of squares of the same color.",
    answer: "Bishops move along diagonals, and queens can also use them.",
    example: "The a1-h8 line is one of the longest diagonals.",
    related: ["BASIC-007", "NOTATION-050"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-050",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Board",
    title: "Long diagonal",
    level: "Beginner",
    keywords: ["long diagonal", "diagonal", "chess"],
    questions: [
      "What is a long diagonal?",
      "Which diagonals are the longest?"
    ],
    short_answer: "The two longest diagonals each contain eight squares.",
    answer: "They run from a1 to h8 and from a8 to h1.",
    example: "A bishop or queen can potentially control the a1-h8 diagonal.",
    related: ["NOTATION-049", "BASIC-007"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-051",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Board",
    title: "Center",
    level: "Beginner",
    keywords: ["center", "d4", "e4", "d5", "e5"],
    questions: [
      "What is the center of the chessboard?",
      "Which squares are the central squares?"
    ],
    short_answer: "The central four squares are d4, d5, e4, and e5.",
    answer: "These four squares are commonly called the center.",
    example: "1.e4 places a pawn directly on a central square.",
    related: ["BASIC-026", "NOTATION-050"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-052",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position Terms",
    title: "Open file",
    level: "Beginner",
    keywords: ["open file", "rook", "file"],
    questions: [
      "What is an open file?",
      "When is a file open?"
    ],
    short_answer: "An open file has no pawns of either color.",
    answer: "Open files often provide useful routes for rooks and queens.",
    example: "The d-file is open when neither side has a pawn on it.",
    related: ["BASIC-046", "NOTATION-053"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-053",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position Terms",
    title: "Semi-open file",
    level: "Beginner",
    keywords: ["semi-open", "file", "rook"],
    questions: [
      "What is a semi-open file?",
      "When is a file semi-open?"
    ],
    short_answer: "A semi-open file has no pawn of one color but still has a pawn of the other color.",
    answer: "The term is often used from the perspective of the side whose pawn is missing.",
    example: "If White has no pawn on the d-file but Black has one, the d-file is semi-open for White.",
    related: ["BASIC-047", "NOTATION-052"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-054",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position Terms",
    title: "Outpost",
    level: "Intermediate",
    keywords: ["outpost", "knight", "strong square"],
    questions: [
      "What is an outpost?",
      "What makes a square an outpost?"
    ],
    short_answer: "An outpost is a strong square, usually in enemy territory, that cannot easily be challenged by an enemy pawn.",
    answer: "Knights especially benefit from strong outposts.",
    example: "A knight on d5 that cannot be driven away by a pawn may occupy an outpost.",
    related: ["BASIC-044", "NOTATION-055"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-055",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Pawn Structure",
    title: "Passed pawn",
    level: "Beginner",
    keywords: ["passed pawn", "pawn", "endgame"],
    questions: [
      "What is a passed pawn?",
      "What makes a pawn passed?"
    ],
    short_answer: "A passed pawn has no opposing pawn on its file or adjacent files that can stop it by normal pawn confrontation.",
    answer: "Passed pawns can become very powerful, especially in endgames.",
    example: "A white pawn on d6 with no black pawns on the c-, d-, or e-files ahead of it may be passed.",
    related: ["BASIC-039", "NOTATION-056"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-056",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Pawn Structure",
    title: "Isolated pawn",
    level: "Intermediate",
    keywords: ["isolated pawn", "pawn structure", "weakness"],
    questions: [
      "What is an isolated pawn?",
      "What makes a pawn isolated?"
    ],
    short_answer: "An isolated pawn has no friendly pawn on either adjacent file.",
    answer: "It can become a target because it cannot be defended by another pawn.",
    example: "A lone pawn on d4 with no friendly c- or e-pawn is isolated.",
    related: ["BASIC-038", "NOTATION-057"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-057",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Pawn Structure",
    title: "Doubled pawns",
    level: "Intermediate",
    keywords: ["doubled pawns", "pawn structure", "same file"],
    questions: [
      "What are doubled pawns?",
      "What does doubled pawns mean?"
    ],
    short_answer: "Doubled pawns are two friendly pawns on the same file.",
    answer: "They may be weak or useful depending on the position.",
    example: "White can have pawns on c2 and c3 after a recapture.",
    related: ["BASIC-037", "NOTATION-056"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-058",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Pawn Structure",
    title: "Connected pawns",
    level: "Intermediate",
    keywords: ["connected pawns", "pawn structure", "adjacent"],
    questions: [
      "What are connected pawns?",
      "What does connected pawns mean?"
    ],
    short_answer: "Connected pawns are friendly pawns on adjacent files.",
    answer: "They can support one another and form a strong pawn structure.",
    example: "Pawns on e4 and f4 are connected pawns.",
    related: ["BASIC-036", "NOTATION-057"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-059",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Pawn Structure",
    title: "Backward pawn",
    level: "Intermediate",
    keywords: ["backward pawn", "pawn structure", "weakness"],
    questions: [
      "What is a backward pawn?",
      "What does backward pawn mean?"
    ],
    short_answer: "A backward pawn is a pawn that is behind neighboring friendly pawns and may be difficult to advance safely.",
    answer: "Backward pawns can become targets, but their evaluation depends on the position.",
    example: "A pawn on d6 behind pawns on c5 and e5 may be backward.",
    related: ["BASIC-039", "NOTATION-058"],
    source: "Standard chess terminology",
    verified: true
  },
  {
    id: "NOTATION-060",
    type: "concept",
    category: "Terminology",
    topic: "Chess Notation & Terminology",
    subtopic: "Position Terms",
    title: "Weak square",
    level: "Intermediate",
    keywords: ["weak square", "outpost", "positional"],
    questions: [
      "What is a weak square?",
      "What makes a square weak?"
    ],
    short_answer: "A weak square is a square that is difficult to control with a pawn and can become a useful target for the opponent.",
    answer: "Weak squares can become entry points for enemy pieces.",
    example: "A permanently weak d5 square may become an excellent knight outpost.",
    related: ["BASIC-043", "NOTATION-054"],
    source: "Standard chess terminology",
    verified: true
  }
];

export default notationTerminology;