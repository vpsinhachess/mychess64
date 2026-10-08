const chessRecordsFactsCuriosities = [

  {
    id: "FACT-001",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Origins",
    title: "Where did chess originate?",
    level: "Beginner",
    keywords: ["chess origins", "India", "Chaturanga"],
    questions: [
      "Where did chess originate?",
      "Which country is associated with the origin of chess?"
    ],
    short_answer: "Chess is generally traced to ancient India and the game of Chaturanga.",
    answer: "Chaturanga is widely regarded as an important predecessor of modern chess.",
    example: "The game later spread through Persia and the Islamic world before reaching Europe.",
    related: ["HISTORY-001", "INDIA-001", "FACT-002"],
    source: "Established chess history",
    verified: true
  },

  {
    id: "FACT-002",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chaturanga",
    title: "Was Chaturanga exactly the same as chess?",
    level: "Beginner",
    keywords: ["Chaturanga", "ancient chess", "history"],
    questions: [
      "Was Chaturanga the same as modern chess?",
      "How was ancient Chaturanga different?"
    ],
    short_answer: "No. Chaturanga was an earlier game that evolved into modern chess.",
    answer: "Its rules and pieces were not identical to today's game.",
    example: "Modern castling, promotion rules, and many other features developed later.",
    related: ["FACT-001", "HISTORY-002", "INDIA-002"],
    source: "Established chess history",
    verified: true
  },

  {
    id: "FACT-003",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Board",
    title: "How many squares are on a chessboard?",
    level: "Beginner",
    keywords: ["chessboard", "64 squares", "board"],
    questions: [
      "How many squares does a chessboard have?",
      "Why does chess use 64 squares?"
    ],
    short_answer: "A standard chessboard has 64 squares.",
    answer: "It consists of eight files and eight ranks.",
    example: "8 × 8 = 64 squares.",
    related: ["BASIC-001", "BASIC-002", "FACT-004"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-004",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Board Geometry",
    title: "How many squares of each color are on a chessboard?",
    level: "Beginner",
    keywords: ["chessboard", "square colors", "64"],
    questions: [
      "How many light squares are there?",
      "How many dark squares are there?"
    ],
    short_answer: "There are 32 light squares and 32 dark squares.",
    answer: "The colors alternate across all eight files and eight ranks.",
    example: "Each bishop always remains on one square color.",
    related: ["BASIC-010", "MOVE-020", "FACT-003"],
    source: "Chessboard geometry",
    verified: true
  },

  {
    id: "FACT-005",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Pieces",
    title: "How many pieces start on the chessboard?",
    level: "Beginner",
    keywords: ["pieces", "starting position", "32"],
    questions: [
      "How many chess pieces are on the board at the start?",
      "How many pieces does each player have?"
    ],
    short_answer: "There are 32 pieces at the start, 16 for each player.",
    answer: "Each side begins with one king, one queen, two rooks, two bishops, two knights, and eight pawns.",
    example: "16 White pieces + 16 Black pieces = 32.",
    related: ["BASIC-020", "MOVE-001", "FACT-006"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-006",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Starting Position",
    title: "How many pawns start in a chess game?",
    level: "Beginner",
    keywords: ["pawns", "starting position", "16"],
    questions: [
      "How many pawns are there at the start?",
      "How many pawns does each side have?"
    ],
    short_answer: "There are 16 pawns in total, eight for each side.",
    answer: "Pawns occupy the second rank for White and seventh rank for Black.",
    example: "Eight White pawns plus eight Black pawns gives 16.",
    related: ["BASIC-025", "MOVE-030", "FACT-005"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-007",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Moves",
    title: "Which chess piece can jump over other pieces?",
    level: "Beginner",
    keywords: ["knight", "jumping", "piece"],
    questions: [
      "Which chess piece can jump over pieces?",
      "Can any other normal chess piece jump?"
    ],
    short_answer: "The knight is the only standard chess piece that can jump over other pieces.",
    answer: "Its L-shaped movement allows it to ignore intervening pieces.",
    example: "A knight can jump over friendly and enemy pieces to reach its destination square.",
    related: ["MOVE-020", "BASIC-015", "FACT-008"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-008",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Knight",
    title: "Why is the knight unusual?",
    level: "Beginner",
    keywords: ["knight", "L move", "chess pieces"],
    questions: [
      "Why is the knight different from other pieces?",
      "How does a knight move?"
    ],
    short_answer: "A knight moves in an L-shape and can jump over pieces.",
    answer: "It moves two squares in one direction and one square perpendicular to that direction.",
    example: "A knight on e4 can move to c3, c5, d2, d6, f2, f6, g3, or g5.",
    related: ["MOVE-020", "FACT-007", "BASIC-015"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-009",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Queen",
    title: "Why is the queen the strongest chess piece?",
    level: "Beginner",
    keywords: ["queen", "piece value", "movement"],
    questions: [
      "Why is the queen so powerful?",
      "Which is the strongest chess piece?"
    ],
    short_answer: "The queen combines the movement of a rook and bishop.",
    answer: "It can move along ranks, files, and diagonals over any unobstructed distance.",
    example: "A centralized queen can attack several parts of the board simultaneously.",
    related: ["MOVE-010", "BASIC-025", "FACT-010"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-010",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "King",
    title: "Why is the king not the strongest piece?",
    level: "Beginner",
    keywords: ["king", "queen", "chess objective"],
    questions: [
      "Why is the king more important than the queen?",
      "Why is the king considered priceless?"
    ],
    short_answer: "The king is the essential piece because checkmate ends the game.",
    answer: "The king cannot be captured; it must be protected from check.",
    example: "Losing the queen is usually material loss, but being checkmated ends the game.",
    related: ["RULE-010", "MOVE-010", "MATE-001"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-011",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Queen Value",
    title: "How many points is a queen usually worth?",
    level: "Beginner",
    keywords: ["queen", "piece values", "nine points"],
    questions: [
      "How much is a queen worth?",
      "Is the queen worth nine points?"
    ],
    short_answer: "The queen is commonly valued at about nine points.",
    answer: "Piece values are useful guidelines, not exact mathematical prices.",
    example: "A queen can sometimes be sacrificed for a decisive attack.",
    related: ["BASIC-030", "TACTIC-020", "FACT-012"],
    source: "Standard chess teaching convention",
    verified: true
  },

  {
    id: "FACT-012",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Piece Values",
    title: "What are the usual chess piece values?",
    level: "Beginner",
    keywords: ["piece values", "queen", "rook", "bishop", "knight"],
    questions: [
      "What are the standard chess piece values?",
      "How are chess pieces commonly valued?"
    ],
    short_answer: "A common guide is pawn 1, knight 3, bishop 3, rook 5, queen 9.",
    answer: "These numbers help compare material but do not fully evaluate a position.",
    example: "A three-point knight may be worth more than a rook in a particular tactical position.",
    related: ["BASIC-030", "LOGIC-020", "FACT-011"],
    source: "Standard chess teaching convention",
    verified: true
  },

  {
    id: "FACT-013",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Promotions",
    title: "Can a pawn become a queen?",
    level: "Beginner",
    keywords: ["promotion", "pawn", "queen"],
    questions: [
      "What happens when a pawn reaches the last rank?",
      "Can a pawn become a queen?"
    ],
    short_answer: "Yes. A pawn reaching the last rank must be promoted.",
    answer: "It can become a queen, rook, bishop, or knight.",
    example: "Most promotions are to a queen, but underpromotion can sometimes be best.",
    related: ["MOVE-050", "RULE-025", "FACT-014"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-014",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Underpromotion",
    title: "Can you have more than one queen?",
    level: "Beginner",
    keywords: ["promotion", "multiple queens", "underpromotion"],
    questions: [
      "Can a player have two queens?",
      "Can chess have multiple queens?"
    ],
    short_answer: "Yes. A promoted pawn can create an additional queen.",
    answer: "A player can theoretically have several queens if multiple pawns are promoted.",
    example: "Two queens can exist simultaneously after successful promotions.",
    related: ["FACT-013", "MOVE-055", "LOGIC-050"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-015",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Maximum Queens",
    title: "What is the theoretical maximum number of queens for one player?",
    level: "Advanced",
    keywords: ["multiple queens", "promotion", "maximum queens"],
    questions: [
      "How many queens can one player theoretically have?",
      "What is the maximum number of queens possible?"
    ],
    short_answer: "A player can theoretically have nine queens: the original queen plus eight promoted pawns.",
    answer: "This requires every pawn to promote to a queen while the original queen remains.",
    example: "It is a theoretical maximum, not a normal practical occurrence.",
    related: ["FACT-014", "LOGIC-050", "MOVE-055"],
    source: "Chess rules and combinatorial analysis",
    verified: true
  },

  {
    id: "FACT-016",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Possible Games",
    title: "How many possible chess games are there?",
    level: "Advanced",
    keywords: ["possible games", "Shannon number", "chess complexity"],
    questions: [
      "How many possible chess games exist?",
      "What is the Shannon number?"
    ],
    short_answer: "The number of possible chess games is astronomically large; a famous estimate is around 10^120.",
    answer: "Claude Shannon used this approximate figure to illustrate the enormous complexity of chess.",
    example: "The estimate is far larger than the number of atoms in many familiar physical comparisons.",
    related: ["LOGIC-080", "FACT-017", "CALC-001"],
    source: "Claude Shannon's chess complexity estimate",
    verified: true
  },

  {
    id: "FACT-017",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Game Complexity",
    title: "Why is chess considered a complex game?",
    level: "Beginner",
    keywords: ["complexity", "chess", "possible moves"],
    questions: [
      "Why is chess so difficult?",
      "Why can't chess be solved easily?"
    ],
    short_answer: "The enormous number of possible positions and variations makes exhaustive calculation impractical.",
    answer: "Players therefore rely on calculation, pattern recognition, evaluation, and experience.",
    example: "Even a single position can contain many legal candidate moves.",
    related: ["FACT-016", "CALC-001", "LOGIC-080"],
    source: "Chess complexity research",
    verified: true
  },

  {
    id: "FACT-018",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Checkmate",
    title: "What does checkmate literally mean in chess?",
    level: "Beginner",
    keywords: ["checkmate", "king", "game ending"],
    questions: [
      "What does checkmate mean?",
      "Why does checkmate end the game?"
    ],
    short_answer: "Checkmate means the king is in check and has no legal way to escape.",
    answer: "The game ends immediately when a legal checkmate occurs.",
    example: "If the king cannot move, capture the checking piece, or block the check, it is checkmate.",
    related: ["RULE-010", "MATE-001", "FACT-019"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-019",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Stalemate",
    title: "Can a player win by stalemating the opponent?",
    level: "Beginner",
    keywords: ["stalemate", "draw", "king"],
    questions: [
      "Is stalemate a win?",
      "What happens in stalemate?"
    ],
    short_answer: "No. Stalemate is a draw.",
    answer: "It occurs when the player to move has no legal move and their king is not in check.",
    example: "A player with a winning position can accidentally throw away the win by stalemating.",
    related: ["RULE-015", "MATE-060", "FACT-020"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-020",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Draws",
    title: "Why can a winning-looking chess position be a draw?",
    level: "Beginner",
    keywords: ["draw", "stalemate", "fortress"],
    questions: [
      "Why can a better position still be drawn?",
      "Can a player have more material and still draw?"
    ],
    short_answer: "Yes. Stalemate, perpetual check, repetition, insufficient winning chances, or fortress positions can produce draws.",
    answer: "Material advantage does not automatically guarantee a win.",
    example: "A queen-versus-king position is winning, but a queen position against a trapped king can sometimes be stalemate if played carelessly.",
    related: ["RULE-015", "END-045", "FACT-019"],
    source: "FIDE Laws and endgame theory",
    verified: true
  },

  {
    id: "FACT-021",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Longest Game",
    title: "What is the longest recorded master chess game by moves?",
    level: "Intermediate",
    keywords: ["longest game", "269 moves", "Nikolic Arsovic"],
    questions: [
      "What is the longest chess game on record?",
      "Which game lasted 269 moves?"
    ],
    short_answer: "Nikolic–Arsovic in Belgrade 1989 lasted 269 moves.",
    answer: "The game was a draw and is recognized by Guinness World Records as the most moves in a chess game.",
    example: "It lasted more than 20 hours.",
    related: ["FACT-022", "FACT-023", "TOURNAMENT-050"],
    source: "Guinness World Records and FIDE-sourced record",
    verified: true
  },

  {
    id: "FACT-022",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Longest Game Duration",
    title: "How long did the 269-move game last?",
    level: "Intermediate",
    keywords: ["Nikolic", "Arsovic", "20 hours", "269"],
    questions: [
      "How long did the longest 269-move game last?",
      "How many hours was Nikolic-Arsovic?"
    ],
    short_answer: "It lasted approximately 20 hours and 15 minutes.",
    answer: "Ivan Nikolic and Goran Arsovic played the game in Belgrade in 1989.",
    example: "The game ended in a draw after 269 moves.",
    related: ["FACT-021", "FACT-023", "TOURNAMENT-050"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-023",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Longest Game Rules",
    title: "Why is a 269-move chess game unusual today?",
    level: "Intermediate",
    keywords: ["269 moves", "50 move rule", "chess records"],
    questions: [
      "Could a 269-move game happen today?",
      "Why are extremely long chess games unusual?"
    ],
    short_answer: "Modern draw rules make extremely long games much less likely.",
    answer: "The 50-move and 75-move rules limit how long certain positions can continue without pawn moves or captures.",
    example: "A long game can still exceed 100 moves, but exceptional lengths are rare.",
    related: ["FACT-021", "RULE-020", "END-001"],
    source: "FIDE Laws and Guinness World Records",
    verified: true
  },

  {
    id: "FACT-024",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Unbeaten Streak",
    title: "What is Magnus Carlsen's famous unbeaten streak?",
    level: "Intermediate",
    keywords: ["Carlsen", "unbeaten streak", "125"],
    questions: [
      "What was Carlsen's longest unbeaten streak?",
      "How many games did Carlsen go unbeaten?"
    ],
    short_answer: "Carlsen had a recorded professional unbeaten streak of 125 games.",
    answer: "Guinness World Records lists the streak as 125 matches, including 42 wins and 83 draws.",
    example: "The streak became one of the best-known records of Carlsen's career.",
    related: ["CHAMPION-017", "FACT-025", "PSYCH-001"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-025",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Unbeaten Streak",
    title: "How many wins were in Carlsen's 125-game unbeaten streak?",
    level: "Intermediate",
    keywords: ["Carlsen", "125 games", "42 wins"],
    questions: [
      "How many wins did Carlsen have during his 125-game unbeaten streak?",
      "How many draws were in the streak?"
    ],
    short_answer: "The record consisted of 42 wins and 83 draws.",
    answer: "Together they made 125 consecutive games without a loss.",
    example: "The large number of draws shows that avoiding defeat at elite level is itself a major achievement.",
    related: ["FACT-024", "CHAMPION-017", "PSYCH-030"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-026",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest Grandmaster",
    title: "Who is the youngest chess grandmaster?",
    level: "Beginner",
    keywords: ["youngest grandmaster", "Abhimanyu Mishra", "record"],
    questions: [
      "Who is the youngest grandmaster in chess history?",
      "Who holds the youngest GM record?"
    ],
    short_answer: "Abhimanyu Mishra is the youngest grandmaster in chess history.",
    answer: "He achieved the title at 12 years, 4 months, and 25 days in 2021.",
    example: "He broke Sergey Karjakin's previous record.",
    related: ["FACT-027", "RATING-020", "CHAMPION-019"],
    source: "FIDE official record",
    verified: true
  },

  {
    id: "FACT-027",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest GM",
    title: "How old was Abhimanyu Mishra when he became a GM?",
    level: "Intermediate",
    keywords: ["Abhimanyu Mishra", "12 years", "GM"],
    questions: [
      "How old was Abhimanyu Mishra when he became GM?",
      "How young was the youngest grandmaster?"
    ],
    short_answer: "He was 12 years, 4 months, and 25 days old.",
    answer: "He earned his final GM norm in Budapest in June 2021.",
    example: "His record was approximately 66 days younger than Sergey Karjakin's previous record.",
    related: ["FACT-026", "RATING-025", "FACT-028"],
    source: "FIDE official record",
    verified: true
  },

  {
    id: "FACT-028",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest GM",
    title: "Who held the youngest GM record before Abhimanyu Mishra?",
    level: "Intermediate",
    keywords: ["Karjakin", "youngest GM", "record"],
    questions: [
      "Who was the youngest grandmaster before Mishra?",
      "Did Sergey Karjakin hold the youngest GM record?"
    ],
    short_answer: "Sergey Karjakin held the record before Abhimanyu Mishra broke it.",
    answer: "Karjakin became a grandmaster at 12 years and 7 months in 2002.",
    example: "Karjakin later became a World Championship challenger.",
    related: ["FACT-026", "CHAMPION-014", "FACT-029"],
    source: "FIDE historical records",
    verified: true
  },

  {
    id: "FACT-029",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest GM",
    title: "Who was one of the youngest GMs before Karjakin?",
    level: "Intermediate",
    keywords: ["youngest GM", "record", "Ponomariov"],
    questions: [
      "Who was a very young grandmaster before Karjakin?",
      "How young was Ruslan Ponomariov when he became GM?"
    ],
    short_answer: "Ruslan Ponomariov became a grandmaster at 14 years and 17 days.",
    answer: "He was among the leading young grandmasters before the record moved lower.",
    example: "Ponomariov later became FIDE World Champion in 2002.",
    related: ["FACT-028", "CHAMPION-012", "RATING-025"],
    source: "FIDE historical records",
    verified: true
  },

  {
    id: "FACT-030",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest 2600",
    title: "Who became the youngest player to reach 2600?",
    level: "Intermediate",
    keywords: ["2600", "Yağız Kaan Erdoğmuş", "record"],
    questions: [
      "Who was the youngest player to reach 2600?",
      "What rating record does Yağız Kaan Erdoğmuş hold?"
    ],
    short_answer: "Yağız Kaan Erdoğmuş became the youngest player to cross 2600 Elo.",
    answer: "FIDE reported that he achieved the milestone in 2024 at age 13.",
    example: "He also became the fourth-youngest grandmaster in history.",
    related: ["RATING-030", "FACT-031", "FACT-026"],
    source: "FIDE",
    verified: true
  },

  {
    id: "FACT-031",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest GM Ranking",
    title: "Who is the fourth-youngest grandmaster in history?",
    level: "Intermediate",
    keywords: ["Yağız Kaan Erdoğmuş", "youngest GM", "record"],
    questions: [
      "Who is the fourth-youngest GM?",
      "How old was Yağız Kaan Erdoğmuş when he became GM?"
    ],
    short_answer: "Yağız Kaan Erdoğmuş became a grandmaster at about 12 years and 10 months.",
    answer: "FIDE identifies him as the fourth-youngest grandmaster in history.",
    example: "His achievement came in 2024.",
    related: ["FACT-026", "FACT-030", "RATING-020"],
    source: "FIDE",
    verified: true
  },

  {
    id: "FACT-032",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Youngest Woman GM",
    title: "Who became the youngest Woman Grandmaster in history in 2026?",
    level: "Intermediate",
    keywords: ["Bodhana Sivanandan", "WGM", "record"],
    questions: [
      "Who is the youngest Woman Grandmaster?",
      "What record did Bodhana Sivanandan set?"
    ],
    short_answer: "Bodhana Sivanandan became the youngest Woman Grandmaster in history in 2026.",
    answer: "FIDE reported that she achieved the title at age 11 after her performance at the 46th Chess Olympiad.",
    example: "Her Olympiad performance also produced a major rating gain.",
    related: ["FACT-033", "RATING-030", "TOURNAMENT-020"],
    source: "FIDE October 2026 rating report",
    verified: true
  },

  {
    id: "FACT-033",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Women Records",
    title: "What did Bodhana Sivanandan achieve at the 2026 Olympiad?",
    level: "Intermediate",
    keywords: ["Bodhana", "Olympiad", "2026"],
    questions: [
      "What did Bodhana Sivanandan achieve in 2026?",
      "Why was Bodhana's Olympiad performance notable?"
    ],
    short_answer: "She became the youngest Woman Grandmaster in history after her strong 2026 Olympiad performance.",
    answer: "FIDE reported that she gained 28 rating points during the Olympiad.",
    example: "Her achievement is one of the latest major age records in chess.",
    related: ["FACT-032", "RATING-030", "INDIA-021"],
    source: "FIDE October 2026 rating report",
    verified: true
  },

  {
    id: "FACT-034",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Oldest Players",
    title: "Why are age records in chess difficult to compare?",
    level: "Intermediate",
    keywords: ["age records", "chess records", "grandmasters"],
    questions: [
      "Why should chess age records be verified carefully?",
      "Why do youngest-player records change frequently?"
    ],
    short_answer: "Young-player records can change rapidly as new prodigies achieve titles and rating milestones.",
    answer: "Official sources should be checked before publishing a current record.",
    example: "A record that was correct several years ago may no longer be current.",
    related: ["FACT-026", "FACT-032", "RATING-001"],
    source: "FIDE records",
    verified: true
  },

  {
    id: "FACT-035",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "World Champion",
    title: "Who was the first official World Chess Champion?",
    level: "Beginner",
    keywords: ["Steinitz", "World Champion", "history"],
    questions: [
      "Who was the first World Chess Champion?",
      "Who was the first official world champion?"
    ],
    short_answer: "Wilhelm Steinitz is generally recognized as the first official World Chess Champion.",
    answer: "He defeated Johannes Zukertort in 1886.",
    example: "Steinitz's era also helped establish systematic positional chess.",
    related: ["CHAMPION-001", "HISTORY-040", "FACT-036"],
    source: "FIDE historical records",
    verified: true
  },

  {
    id: "FACT-036",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "World Champions",
    title: "Who was the longest-reigning classical World Champion before Carlsen?",
    level: "Intermediate",
    keywords: ["Lasker", "World Champion", "reign"],
    questions: [
      "Who had a very long World Championship reign?",
      "How long was Emanuel Lasker's reign?"
    ],
    short_answer: "Emanuel Lasker held the classical World Championship from 1894 to 1921.",
    answer: "His reign lasted 27 years, one of the longest in the history of the title.",
    example: "Lasker successfully defended the title against several elite challengers.",
    related: ["CHAMPION-002", "HISTORY-045", "FACT-035"],
    source: "FIDE historical records",
    verified: true
  },

  {
    id: "FACT-037",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "World Champion",
    title: "Who was the youngest classical World Champion before Gukesh?",
    level: "Beginner",
    keywords: ["Gukesh", "youngest World Champion", "record"],
    questions: [
      "Who was the youngest World Champion before Gukesh?",
      "Did Gukesh break a World Champion age record?"
    ],
    short_answer: "Gukesh became the youngest undisputed classical World Champion in 2024.",
    answer: "His victory at age 18 surpassed the previous youngest undisputed champion record.",
    example: "He won the title by defeating Ding Liren.",
    related: ["INDIA-010", "CHAMPION-019", "FACT-038"],
    source: "FIDE official records",
    verified: true
  },

  {
    id: "FACT-038",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Gukesh Record",
    title: "Why is Gukesh's World Championship record special?",
    level: "Beginner",
    keywords: ["Gukesh", "18", "World Champion"],
    questions: [
      "Why was Gukesh's title win historic?",
      "What age record did Gukesh set?"
    ],
    short_answer: "He became the youngest undisputed classical World Champion at 18.",
    answer: "FIDE officially recognized him as the 18th World Champion.",
    example: "His title victory came in Singapore in December 2024.",
    related: ["FACT-037", "INDIA-009", "CHAMPION-019"],
    source: "FIDE official records",
    verified: true
  },

  {
    id: "FACT-039",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "FIDE",
    title: "What does FIDE stand for?",
    level: "Beginner",
    keywords: ["FIDE", "federation", "chess"],
    questions: [
      "What does FIDE mean?",
      "What is FIDE?"
    ],
    short_answer: "FIDE is the International Chess Federation.",
    answer: "Its French name is Fédération Internationale des Échecs.",
    example: "FIDE governs international chess titles, ratings, laws, and many major competitions.",
    related: ["RATING-001", "RULE-001", "FACT-040"],
    source: "FIDE",
    verified: true
  },

  {
    id: "FACT-040",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "FIDE Foundation",
    title: "When was FIDE founded?",
    level: "Beginner",
    keywords: ["FIDE", "1924", "foundation"],
    questions: [
      "When was FIDE founded?",
      "How old is FIDE?"
    ],
    short_answer: "FIDE was founded in 1924.",
    answer: "It was established in Paris during the period of the 1924 Olympic Games.",
    example: "FIDE celebrated its centenary in 2024.",
    related: ["HISTORY-060", "FACT-039", "FACT-041"],
    source: "FIDE history",
    verified: true
  },

  {
    id: "FACT-041",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Olympiad",
    title: "How often is the Chess Olympiad normally held?",
    level: "Beginner",
    keywords: ["Chess Olympiad", "biennial", "FIDE"],
    questions: [
      "How often is the Chess Olympiad held?",
      "Is the Chess Olympiad held every year?"
    ],
    short_answer: "The Chess Olympiad is normally held every two years.",
    answer: "It is one of the most important team events in international chess.",
    example: "The 2024 Olympiad was followed by the 2026 Olympiad.",
    related: ["TOURNAMENT-020", "INDIA-039", "FACT-042"],
    source: "FIDE",
    verified: true
  },

  {
    id: "FACT-042",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Olympiad",
    title: "Why is the Chess Olympiad called an Olympiad?",
    level: "Beginner",
    keywords: ["Olympiad", "team chess", "FIDE"],
    questions: [
      "Why is chess's team event called the Olympiad?",
      "Is chess part of the Olympic Games?"
    ],
    short_answer: "The Chess Olympiad is a FIDE international team event, not a medal event of the Summer Olympic Games.",
    answer: "The term reflects its international team format and historical connection with the Olympic movement.",
    example: "Countries compete against each other in team chess at the Olympiad.",
    related: ["TOURNAMENT-020", "FACT-041", "HISTORY-065"],
    source: "FIDE",
    verified: true
  },

  {
    id: "FACT-043",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Olympiad",
    title: "How many boards are normally used by a team in the Open Olympiad?",
    level: "Intermediate",
    keywords: ["Olympiad", "four boards", "team"],
    questions: [
      "How many players play for a team in an Olympiad round?",
      "How many boards are used in the Open section?"
    ],
    short_answer: "Four players normally play for each team in an Open Olympiad round.",
    answer: "Teams generally have a reserve player as well.",
    example: "A team can rotate players across rounds according to tournament rules.",
    related: ["TOURNAMENT-020", "INDIA-040", "FACT-044"],
    source: "FIDE Olympiad regulations",
    verified: true
  },

  {
    id: "FACT-044",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Team Chess",
    title: "Can a chess team have a reserve player?",
    level: "Beginner",
    keywords: ["reserve player", "team chess", "Olympiad"],
    questions: [
      "Can a chess team have reserves?",
      "Why do Olympiad teams use reserve players?"
    ],
    short_answer: "Yes. Olympiad teams can include reserve players.",
    answer: "A reserve provides flexibility when the team captain decides who plays each round.",
    example: "A reserve may enter the lineup depending on form, preparation, or team strategy.",
    related: ["FACT-043", "TOURNAMENT-020", "INDIA-040"],
    source: "FIDE Olympiad regulations",
    verified: true
  },

  {
    id: "FACT-045",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Queen Moves",
    title: "Which famous game had 72 consecutive queen moves?",
    level: "Advanced",
    keywords: ["72 queen moves", "Mason", "Mackenzie"],
    questions: [
      "Was there a game with 72 consecutive queen moves?",
      "Which game had 72 queen moves?"
    ],
    short_answer: "FIDE's Open Chess Museum records 72 consecutive queen moves in Mason versus Mackenzie, London 1882.",
    answer: "It is one of the unusual historical facts recorded by FIDE's chess museum.",
    example: "Such a sequence is extremely unusual in practical modern chess.",
    related: ["FACT-046", "GAME-001", "FACT-047"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-046",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "No Captures",
    title: "What is the record for most moves without a capture?",
    level: "Advanced",
    keywords: ["100 moves", "no capture", "Thornton Walker"],
    questions: [
      "What is the record for moves without a capture?",
      "Which game had 100 moves without a capture?"
    ],
    short_answer: "FIDE's Open Chess Museum records 100 moves without a capture in Thornton-Walker, 1992.",
    answer: "It is a remarkable example of how long a game can continue without material being exchanged.",
    example: "A position can remain materially unchanged while strategic plans evolve.",
    related: ["FACT-045", "RULE-020", "FACT-047"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-047",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Rookie",
    title: "Why is a beginner called a rookie?",
    level: "Beginner",
    keywords: ["rookie", "rook", "word origin"],
    questions: [
      "Is the word rookie related to the chess rook?",
      "Why are new players called rookies?"
    ],
    short_answer: "The word 'rookie' is commonly associated with the rook, although the exact linguistic history is more complicated.",
    answer: "FIDE's Open Chess Museum notes the playful connection between rookies and rooks.",
    example: "Chess terminology has influenced everyday language in several ways.",
    related: ["FACT-048", "NOTATION-020", "HISTORY-030"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-048",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Language",
    title: "Has chess influenced everyday language?",
    level: "Beginner",
    keywords: ["chess language", "checkmate", "rookie"],
    questions: [
      "Has chess influenced English language?",
      "Which common words come from chess?"
    ],
    short_answer: "Yes. Terms such as checkmate, stalemate, gambit, and check have entered wider language.",
    answer: "Chess vocabulary is often used metaphorically for strategy and competition.",
    example: "People may describe a decisive strategic victory as a 'checkmate'.",
    related: ["FACT-047", "NOTATION-001", "HISTORY-030"],
    source: "Chess terminology and language history",
    verified: true
  },

  {
    id: "FACT-049",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Deep Thought",
    title: "What was Deep Thought?",
    level: "Intermediate",
    keywords: ["Deep Thought", "computer chess", "AI"],
    questions: [
      "What was Deep Thought in chess?",
      "Why is Deep Thought important?"
    ],
    short_answer: "Deep Thought was an early powerful chess computer developed by a team that later produced Deep Blue.",
    answer: "FIDE's Open Chess Museum records it as the first computer to beat a grandmaster in a regular tournament game, defeating Bent Larsen in 1988.",
    example: "It was an important step toward modern chess engines.",
    related: ["TECH-001", "FACT-050", "HISTORY-080"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-050",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Computer Chess",
    title: "When did a computer first beat a grandmaster in a regular tournament game?",
    level: "Intermediate",
    keywords: ["computer", "grandmaster", "Bent Larsen", "1988"],
    questions: [
      "When did a computer first beat a grandmaster in a regular tournament game?",
      "Who did Deep Thought defeat?"
    ],
    short_answer: "Deep Thought defeated grandmaster Bent Larsen in 1988.",
    answer: "FIDE's Open Chess Museum identifies this as the first such victory in a regular tournament game.",
    example: "The result was an early milestone on the road toward modern chess engines.",
    related: ["FACT-049", "TECH-001", "TECH-010"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-051",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Deep Blue",
    title: "What was Deep Blue?",
    level: "Beginner",
    keywords: ["Deep Blue", "IBM", "computer chess"],
    questions: [
      "What was Deep Blue?",
      "Why is Deep Blue famous?"
    ],
    short_answer: "Deep Blue was IBM's chess-playing computer that famously defeated Garry Kasparov in 1997.",
    answer: "Its victory became a major milestone in the history of artificial intelligence and computer chess.",
    example: "The 1997 match attracted worldwide attention.",
    related: ["GAME-011", "GAME-012", "TECH-010"],
    source: "Computer chess history",
    verified: true
  },

  {
    id: "FACT-052",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Engines",
    title: "Are modern chess engines stronger than humans?",
    level: "Beginner",
    keywords: ["chess engines", "AI", "Stockfish"],
    questions: [
      "Are chess engines stronger than humans?",
      "Can a grandmaster beat a modern engine?"
    ],
    short_answer: "Top modern chess engines are far stronger than even the strongest human players in normal engine conditions.",
    answer: "Engines calculate enormous numbers of positions and evaluate them with highly optimized algorithms and neural techniques.",
    example: "Human players use engines primarily as analysis and training tools.",
    related: ["TECH-010", "TECH-020", "FACT-051"],
    source: "Modern computer chess research",
    verified: true
  },

  {
    id: "FACT-053",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Blindfold Chess",
    title: "What is blindfold chess?",
    level: "Beginner",
    keywords: ["blindfold chess", "visualization", "memory"],
    questions: [
      "What is blindfold chess?",
      "How do players play chess without seeing the board?"
    ],
    short_answer: "Blindfold chess is played without directly viewing the board or pieces.",
    answer: "Players visualize the position and communicate moves through notation or spoken coordinates.",
    example: "Strong blindfold players maintain a detailed mental model of the board.",
    related: ["CALC-040", "FACT-054", "TRAIN-060"],
    source: "Chess practice and FIDE records",
    verified: true
  },

  {
    id: "FACT-054",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Blindfold Record",
    title: "Who holds the Guinness record for most simultaneous blindfold games?",
    level: "Advanced",
    keywords: ["blindfold", "Timur Gareyev", "48 games"],
    questions: [
      "Who played 48 simultaneous blindfold games?",
      "What is Timur Gareyev's blindfold record?"
    ],
    short_answer: "Timur Gareyev played 48 simultaneous blindfold games in 2016.",
    answer: "FIDE's Open Chess Museum records that he won 35 of the 48 games.",
    example: "Blindfold chess requires exceptional visualization and memory.",
    related: ["FACT-053", "CALC-040", "FACT-055"],
    source: "FIDE Open Chess Museum",
    verified: true
  },

  {
    id: "FACT-055",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Blindfold Chess",
    title: "Why is simultaneous blindfold chess so difficult?",
    level: "Advanced",
    keywords: ["blindfold", "visualization", "simultaneous games"],
    questions: [
      "Why is blindfold simultaneous chess difficult?",
      "What skill is required for blindfold chess?"
    ],
    short_answer: "The player must maintain several changing board positions entirely in memory.",
    answer: "Every move changes the mental position, making visualization and memory essential.",
    example: "Playing dozens of blindfold games requires extraordinary concentration.",
    related: ["FACT-054", "CALC-040", "TRAIN-060"],
    source: "Chess visualization principle",
    verified: true
  },

  {
    id: "FACT-056",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Chess Marathon",
    title: "What is the longest chess marathon?",
    level: "Intermediate",
    keywords: ["chess marathon", "Tunde Onakoya", "64 hours"],
    questions: [
      "What is the longest chess marathon?",
      "Who holds the chess marathon record?"
    ],
    short_answer: "Tunde Onakoya and Shawn Martinez played a 64-hour chess marathon in 2025.",
    answer: "The marathon took place in Times Square, New York, and involved 473 games.",
    example: "The event ran from April 17 to April 20, 2025.",
    related: ["FACT-057", "TOURNAMENT-050", "FACT-058"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-057",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Chess Marathon",
    title: "How many games were played in the 2025 chess marathon?",
    level: "Intermediate",
    keywords: ["Tunde Onakoya", "473 games", "marathon"],
    questions: [
      "How many games were played in the 2025 chess marathon?",
      "How many games were in the 64-hour record?"
    ],
    short_answer: "The marathon included 473 chess games.",
    answer: "Tunde Onakoya and Shawn Martinez achieved the 64-hour record in New York.",
    example: "It was a continuous chess endurance event rather than one single game.",
    related: ["FACT-056", "FACT-058", "TOURNAMENT-050"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-058",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Endurance",
    title: "Why are chess marathons different from long chess games?",
    level: "Beginner",
    keywords: ["chess marathon", "endurance", "long game"],
    questions: [
      "Is a chess marathon one long game?",
      "How is a chess marathon different from a long game?"
    ],
    short_answer: "A chess marathon involves playing many games continuously rather than one extremely long game.",
    answer: "A marathon measures endurance across repeated games.",
    example: "The 2025 record involved 473 games over 64 hours.",
    related: ["FACT-056", "FACT-021", "TOURNAMENT-050"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-059",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Blindfold Set",
    title: "Who set the 2026 record for arranging a chess set blindfolded?",
    level: "Advanced",
    keywords: ["Jeyakirithik Jeyakumar", "blindfold", "30.63 seconds"],
    questions: [
      "Who arranged a chess set blindfolded in 30.63 seconds?",
      "What is the 2026 blindfold chess-set record?"
    ],
    short_answer: "Jeyakirithik Jeyakumar of India arranged a chess set blindfolded in 30.63 seconds.",
    answer: "Guinness World Records lists the achievement from Chennai on January 16, 2026.",
    example: "He improved the previous record of 31.16 seconds.",
    related: ["FACT-060", "FACT-053", "INDIA-096"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-060",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "India Record",
    title: "Where was the 2026 blindfold chess-set record achieved?",
    level: "Beginner",
    keywords: ["India", "Chennai", "blindfold record"],
    questions: [
      "Where was the 2026 blindfold chess-set record set?",
      "Was the blindfold set record achieved in India?"
    ],
    short_answer: "It was achieved in Chennai, Tamil Nadu, India.",
    answer: "Jeyakirithik Jeyakumar set the Guinness record on January 16, 2026.",
    example: "The recorded time was 30.63 seconds.",
    related: ["FACT-059", "INDIA-035", "FACT-061"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-061",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Largest Chess Set",
    title: "How large was the largest chess set recorded by Guinness?",
    level: "Intermediate",
    keywords: ["largest chess set", "Guinness", "5.89 square metres"],
    questions: [
      "What is the largest chess set?",
      "How big was the largest chessboard recorded?"
    ],
    short_answer: "The Guinness record board measured 5.89 metres by 5.89 metres.",
    answer: "The set was made by the Medicine Hat Chess Club in Canada and presented in 2009.",
    example: "The king was about 119 cm tall.",
    related: ["FACT-062", "FACT-063", "BASIC-001"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-062",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Giant Chess",
    title: "How tall was the king in the largest chess set?",
    level: "Intermediate",
    keywords: ["largest chess set", "king", "119 cm"],
    questions: [
      "How tall was the king in the largest chess set?",
      "How large were the pieces in the giant chess set?"
    ],
    short_answer: "The king was about 119 cm tall.",
    answer: "The Guinness-record set had a board measuring 5.89 by 5.89 metres.",
    example: "A giant chess set can turn a normal chess game into a large outdoor spectacle.",
    related: ["FACT-061", "FACT-063", "FACT-003"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-063",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Giant Chess",
    title: "Why do people play giant chess?",
    level: "Beginner",
    keywords: ["giant chess", "outdoor chess", "chess"],
    questions: [
      "Why are giant chess sets popular?",
      "What is the purpose of giant chess?"
    ],
    short_answer: "Giant chess makes the game visually engaging and suitable for public demonstrations.",
    answer: "It can attract spectators and introduce chess to people who may not normally play.",
    example: "Schools, parks, festivals, and chess events often use oversized boards.",
    related: ["FACT-061", "INDIA-044", "FACT-064"],
    source: "Chess event practice",
    verified: true
  },

  {
    id: "FACT-064",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess and Memory",
    title: "Do strong chess players have photographic memory?",
    level: "Beginner",
    keywords: ["memory", "grandmasters", "chess"],
    questions: [
      "Do grandmasters have photographic memory?",
      "Is chess strength just about memory?"
    ],
    short_answer: "No. Strong players rely heavily on patterns, understanding, calculation, and structured memory.",
    answer: "They remember meaningful chess structures much better than random information.",
    example: "A grandmaster may recognize a familiar pawn structure immediately.",
    related: ["CALC-040", "TRAIN-060", "FACT-065"],
    source: "Chess cognition research",
    verified: true
  },

  {
    id: "FACT-065",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Pattern Recognition",
    title: "Why can grandmasters remember positions so well?",
    level: "Intermediate",
    keywords: ["grandmasters", "pattern recognition", "memory"],
    questions: [
      "How do grandmasters remember chess positions?",
      "Why is chess memory different from ordinary memory?"
    ],
    short_answer: "They recognize meaningful patterns and relationships between pieces.",
    answer: "Expert knowledge organizes positions into familiar structures rather than isolated squares.",
    example: "A grandmaster recognizes a known tactical pattern without calculating every possibility from scratch.",
    related: ["FACT-064", "TRAIN-030", "CALC-040"],
    source: "Chess cognition research",
    verified: true
  },

  {
    id: "FACT-066",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Blunders",
    title: "Can grandmasters blunder pieces?",
    level: "Beginner",
    keywords: ["grandmasters", "blunders", "mistakes"],
    questions: [
      "Do grandmasters ever blunder?",
      "Can even world champions make simple mistakes?"
    ],
    short_answer: "Yes. Even elite players can make tactical or practical mistakes.",
    answer: "Time pressure, fatigue, complex positions, and psychological pressure can cause errors.",
    example: "A single missed tactic can change the evaluation of an otherwise excellent game.",
    related: ["MISTAKE-001", "PSYCH-040", "GAME-053"],
    source: "Practical chess reality",
    verified: true
  },

  {
    id: "FACT-067",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Draws",
    title: "Why are draws common at elite level?",
    level: "Intermediate",
    keywords: ["draws", "grandmasters", "elite chess"],
    questions: [
      "Why do grandmasters draw so many games?",
      "Why are elite chess games difficult to win?"
    ],
    short_answer: "Strong players defend accurately and often neutralize each other's advantages.",
    answer: "Modern opening preparation and defensive technique make many positions difficult to convert.",
    example: "An apparently small advantage may not be enough against perfect or near-perfect defense.",
    related: ["FACT-068", "THINK-030", "TOURNAMENT-060"],
    source: "Elite chess principle",
    verified: true
  },

  {
    id: "FACT-068",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Perfect Play",
    title: "Does a chess draw mean both players played perfectly?",
    level: "Beginner",
    keywords: ["draw", "perfect play", "chess"],
    questions: [
      "Does a draw mean perfect chess?",
      "Can both players make mistakes and still draw?"
    ],
    short_answer: "No. A drawn game can contain many mistakes.",
    answer: "The final result only tells you the game outcome, not the quality of every move.",
    example: "Two players can miss winning chances and eventually reach a drawn position.",
    related: ["FACT-067", "GAME-075", "TRAIN-050"],
    source: "Chess analysis principle",
    verified: true
  },

  {
    id: "FACT-069",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "First Move",
    title: "Why does White move first?",
    level: "Beginner",
    keywords: ["White", "first move", "chess rules"],
    questions: [
      "Why does White move first?",
      "Who gets the first move in chess?"
    ],
    short_answer: "By the modern rules of chess, White makes the first move.",
    answer: "The convention became standardized as modern chess developed.",
    example: "The first move gives White a small practical initiative, but it does not guarantee a win.",
    related: ["RULE-005", "OPENING-001", "FACT-070"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-070",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "First Move Advantage",
    title: "Does White always win because White moves first?",
    level: "Beginner",
    keywords: ["White advantage", "first move", "draw"],
    questions: [
      "Does moving first guarantee a win?",
      "Is White's first-move advantage decisive?"
    ],
    short_answer: "No. White has a small statistical advantage, but moving first does not guarantee victory.",
    answer: "At elite level, many games still end in draws.",
    example: "Good Black preparation can neutralize White's opening initiative.",
    related: ["FACT-069", "OPENING-001", "TOURNAMENT-060"],
    source: "Chess statistical principle",
    verified: true
  },

  {
    id: "FACT-071",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Castling",
    title: "Why is castling such a strange chess move?",
    level: "Beginner",
    keywords: ["castling", "king", "rook"],
    questions: [
      "Why does castling move two pieces at once?",
      "Is castling unique in chess?"
    ],
    short_answer: "Castling is a special move that moves both the king and a rook in one move.",
    answer: "It was developed as part of the historical evolution of modern chess.",
    example: "Kingside castling places the king on g1 and rook on f1 for White.",
    related: ["MOVE-040", "RULE-020", "HISTORY-025"],
    source: "FIDE Laws and chess history",
    verified: true
  },

  {
    id: "FACT-072",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "En Passant",
    title: "Why does en passant exist?",
    level: "Intermediate",
    keywords: ["en passant", "pawn", "history"],
    questions: [
      "Why was en passant created?",
      "Why can a pawn capture another pawn this unusual way?"
    ],
    short_answer: "En passant prevents a two-square pawn advance from unfairly bypassing a possible one-square capture.",
    answer: "The rule developed when the two-square initial pawn move became part of chess.",
    example: "A pawn may capture an adjacent pawn as if it had moved only one square, under the exact rule.",
    related: ["MOVE-045", "RULE-030", "HISTORY-025"],
    source: "FIDE Laws and chess history",
    verified: true
  },

  {
    id: "FACT-073",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Promotion",
    title: "Why can a pawn promote to a knight?",
    level: "Beginner",
    keywords: ["promotion", "knight", "underpromotion"],
    questions: [
      "Why can a pawn promote to a knight?",
      "Why is underpromotion allowed?"
    ],
    short_answer: "The rules allow promotion to a queen, rook, bishop, or knight.",
    answer: "This flexibility allows unusual tactical possibilities.",
    example: "A knight promotion can give a check or create a fork when a queen promotion would not.",
    related: ["MOVE-050", "FACT-014", "TACTIC-080"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-074",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Knight Promotion",
    title: "Is promoting to a knight ever the best move?",
    level: "Intermediate",
    keywords: ["underpromotion", "knight promotion", "tactics"],
    questions: [
      "Can knight promotion be better than queen promotion?",
      "Why would someone underpromote?"
    ],
    short_answer: "Yes. A knight can provide a unique move pattern unavailable to a queen.",
    answer: "Underpromotion is usually tactical and can be the only winning move in a specific position.",
    example: "A knight promotion can give a check while avoiding stalemate or another tactical problem.",
    related: ["FACT-073", "TACTIC-080", "PUZZLE-060"],
    source: "FIDE Laws and tactical chess theory",
    verified: true
  },

  {
    id: "FACT-075",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Knight Tour",
    title: "What is the knight's tour?",
    level: "Intermediate",
    keywords: ["knight's tour", "knight", "puzzle"],
    questions: [
      "What is a knight's tour?",
      "Can a knight visit every square exactly once?"
    ],
    short_answer: "A knight's tour is a sequence in which a knight visits every square exactly once.",
    answer: "The puzzle has been studied for centuries and has many mathematical solutions.",
    example: "A complete tour visits all 64 squares of a standard chessboard.",
    related: ["PUZZLE-070", "LOGIC-060", "MOVE-020"],
    source: "Mathematical chess literature",
    verified: true
  },

  {
    id: "FACT-076",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Knight Tour",
    title: "Can a knight's tour return to its starting square?",
    level: "Advanced",
    keywords: ["closed knight tour", "knight's tour", "mathematics"],
    questions: [
      "Can a knight return to its starting square after a full tour?",
      "What is a closed knight's tour?"
    ],
    short_answer: "Yes. A closed knight's tour ends on a square from which the knight can return to the starting square.",
    answer: "Such tours are also called re-entrant or closed knight's tours.",
    example: "The standard 8×8 board has closed knight's tours.",
    related: ["FACT-075", "LOGIC-060", "PUZZLE-070"],
    source: "Mathematical chess literature",
    verified: true
  },

  {
    id: "FACT-077",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Notation",
    title: "What is algebraic chess notation?",
    level: "Beginner",
    keywords: ["algebraic notation", "notation", "FIDE"],
    questions: [
      "What notation is used for recording chess moves?",
      "What is algebraic notation?"
    ],
    short_answer: "Algebraic notation identifies pieces, captures, destination squares, and special moves using standardized symbols.",
    answer: "It is the standard notation used in modern chess records.",
    example: "Nf3 means a knight moves to f3.",
    related: ["NOTATION-001", "RULE-040", "FACT-078"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-078",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Notation",
    title: "Why is the knight represented by N in notation?",
    level: "Beginner",
    keywords: ["knight", "notation", "N"],
    questions: [
      "Why is knight written as N?",
      "Why isn't the knight represented by K?"
    ],
    short_answer: "N is used because K is reserved for the king.",
    answer: "The word knight begins with K in English, but using K would conflict with the king's notation.",
    example: "Nf3 means a knight moves to f3.",
    related: ["NOTATION-010", "FACT-077", "BASIC-015"],
    source: "FIDE algebraic notation",
    verified: true
  },

  {
    id: "FACT-079",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Board Coordinates",
    title: "Why are chess squares named e4, d5, and so on?",
    level: "Beginner",
    keywords: ["coordinates", "e4", "algebraic notation"],
    questions: [
      "Why is a chess square called e4?",
      "How are chess squares named?"
    ],
    short_answer: "Each square is identified by a file letter and rank number.",
    answer: "Files run from a to h and ranks from 1 to 8.",
    example: "e4 means file e and rank 4.",
    related: ["BASIC-005", "NOTATION-005", "FACT-077"],
    source: "FIDE algebraic notation",
    verified: true
  },

  {
    id: "FACT-080",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Files and Ranks",
    title: "How many files and ranks are on a chessboard?",
    level: "Beginner",
    keywords: ["files", "ranks", "chessboard"],
    questions: [
      "How many files are there?",
      "How many ranks are there?"
    ],
    short_answer: "There are eight files and eight ranks.",
    answer: "Files are named a through h, while ranks are numbered 1 through 8.",
    example: "The intersection of file e and rank 4 is e4.",
    related: ["BASIC-005", "FACT-079", "FACT-003"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-081",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Bishops",
    title: "Why does a bishop always stay on the same color?",
    level: "Beginner",
    keywords: ["bishop", "square color", "diagonal"],
    questions: [
      "Can a bishop change square color?",
      "Why does a bishop remain on one color?"
    ],
    short_answer: "A bishop moves diagonally, so it always remains on the same color of square.",
    answer: "Every diagonal move changes both file and rank by one, preserving square color.",
    example: "A light-square bishop can never reach a dark square.",
    related: ["MOVE-015", "BASIC-010", "FACT-082"],
    source: "Chessboard geometry",
    verified: true
  },

  {
    id: "FACT-082",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Bishop Pair",
    title: "Why is the bishop pair special?",
    level: "Intermediate",
    keywords: ["bishop pair", "light bishop", "dark bishop"],
    questions: [
      "Why is having two bishops useful?",
      "What is the bishop pair?"
    ],
    short_answer: "The two bishops together control both square colors.",
    answer: "They can become particularly powerful when the position opens.",
    example: "One bishop can control light squares while the other controls dark squares.",
    related: ["POSITION-030", "FACT-081", "MIDDLE-045"],
    source: "Established chess principle",
    verified: true
  },

  {
    id: "FACT-083",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Material",
    title: "How many points is a rook usually worth?",
    level: "Beginner",
    keywords: ["rook", "piece value", "five"],
    questions: [
      "How much is a rook worth?",
      "Why is a rook usually worth five points?"
    ],
    short_answer: "A rook is commonly valued at about five points.",
    answer: "The value is a guideline and depends on activity and position.",
    example: "An active rook on an open file may be worth more practically than a passive rook.",
    related: ["FACT-012", "POSITION-050", "END-020"],
    source: "Standard chess teaching convention",
    verified: true
  },

  {
    id: "FACT-084",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Material",
    title: "Are bishop and knight always equal?",
    level: "Beginner",
    keywords: ["bishop", "knight", "piece value"],
    questions: [
      "Is a bishop always worth exactly the same as a knight?",
      "Which is stronger, bishop or knight?"
    ],
    short_answer: "Neither is always stronger; their value depends on the position.",
    answer: "Bishops often benefit from open positions while knights can excel in closed positions and strong outposts.",
    example: "A knight on a protected central outpost can be stronger than a poorly placed bishop.",
    related: ["FACT-012", "POSITION-030", "POSITION-035"],
    source: "Established positional chess principle",
    verified: true
  },

  {
    id: "FACT-085",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Queen History",
    title: "Was the modern queen always the strongest piece?",
    level: "Intermediate",
    keywords: ["queen history", "chess evolution", "history"],
    questions: [
      "Was the queen always as powerful as today?",
      "How did the queen become powerful?"
    ],
    short_answer: "No. The modern queen's powerful movement developed during the evolution of European chess.",
    answer: "Earlier versions of the piece had much more limited movement.",
    example: "The transformation helped create the dynamic character of modern chess.",
    related: ["HISTORY-015", "HISTORY-020", "FACT-009"],
    source: "Chess history",
    verified: true
  },

  {
    id: "FACT-086",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Castling History",
    title: "Was castling always part of chess?",
    level: "Intermediate",
    keywords: ["castling", "history", "chess evolution"],
    questions: [
      "Did ancient chess have castling?",
      "When did castling become part of chess?"
    ],
    short_answer: "Castling developed gradually as chess rules evolved.",
    answer: "Its modern form became standardized after earlier king-and-rook defensive moves.",
    example: "Modern castling combines king safety with rook development.",
    related: ["FACT-071", "HISTORY-025", "MOVE-040"],
    source: "Chess history",
    verified: true
  },

  {
    id: "FACT-087",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Draw Rules",
    title: "Why does chess have the 50-move rule?",
    level: "Intermediate",
    keywords: ["50 move rule", "draw", "FIDE"],
    questions: [
      "Why does the 50-move rule exist?",
      "What is the purpose of the 50-move rule?"
    ],
    short_answer: "It prevents players from continuing indefinitely without progress through pawn moves or captures.",
    answer: "Under FIDE rules, a player can claim a draw after the required sequence of 50 moves by each side without a pawn move or capture, subject to the exact claim procedure.",
    example: "A rook ending with no pawn moves or captures for 50 moves can become claimable.",
    related: ["RULE-020", "FACT-023", "END-010"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-088",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Threefold Repetition",
    title: "Why does chess have the threefold repetition rule?",
    level: "Intermediate",
    keywords: ["threefold repetition", "draw", "repetition"],
    questions: [
      "Why can repeated positions lead to a draw?",
      "What is threefold repetition?"
    ],
    short_answer: "Threefold repetition prevents endless repetition of the same position.",
    answer: "Under FIDE rules, a player can claim a draw when the same position has occurred at least three times, subject to the exact rule and claim procedure.",
    example: "Perpetual-check situations often involve repeated positions.",
    related: ["RULE-018", "FACT-054", "END-040"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-089",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Touch Move",
    title: "What is the touch-move rule?",
    level: "Beginner",
    keywords: ["touch move", "FIDE", "tournament"],
    questions: [
      "What is touch move in chess?",
      "What happens if I touch my piece in a tournament?"
    ],
    short_answer: "In formal chess, touching a piece can create an obligation to move it when the rules' conditions are met.",
    answer: "The exact obligations depend on whether the piece has a legal move and whether the player touched their own or opponent's piece.",
    example: "Tournament players should avoid touching pieces before deciding on their move.",
    related: ["RULE-040", "TOURNAMENT-030", "FACT-090"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-090",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Clocks",
    title: "Why does chess use a clock?",
    level: "Beginner",
    keywords: ["chess clock", "time control", "tournament"],
    questions: [
      "Why do chess players use clocks?",
      "Why is time part of tournament chess?"
    ],
    short_answer: "The clock limits thinking time and ensures games finish within a reasonable period.",
    answer: "Each player receives a defined amount of time under the tournament's time control.",
    example: "In an increment game, players may receive additional seconds after each move.",
    related: ["RULE-035", "TOURNAMENT-040", "FACT-091"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-091",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Increment",
    title: "What is a chess increment?",
    level: "Beginner",
    keywords: ["increment", "chess clock", "time control"],
    questions: [
      "What does increment mean in chess?",
      "Why do chess clocks add time after moves?"
    ],
    short_answer: "An increment adds a fixed amount of time to a player's clock after each move.",
    answer: "It reduces extreme time scrambles and gives players some time for every move.",
    example: "With a 3+2 time control, each player starts with three minutes and gains two seconds per move.",
    related: ["TOURNAMENT-040", "RULE-035", "FACT-090"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-092",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Slow Chess",
    title: "How long could players think before chess clocks?",
    level: "Intermediate",
    keywords: ["slow chess", "Paulsen", "chess clock"],
    questions: [
      "How long could chess players think before clocks?",
      "Why were chess clocks introduced?"
    ],
    short_answer: "Before standardized chess clocks and time controls, players could spend extremely long periods considering moves.",
    answer: "Guinness records a pre-clock game in which Louis Paulsen took very long periods to decide moves.",
    example: "The possibility of endless thinking contributed to the adoption of chess clocks.",
    related: ["FACT-093", "TOURNAMENT-040", "FACT-090"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-093",
    type: "Chess Record",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Records",
    subtopic: "Slowest Move",
    title: "What is the recorded slowest chess move before clocks?",
    level: "Advanced",
    keywords: ["slowest move", "Louis Paulsen", "15 hours"],
    questions: [
      "Who made the slowest recorded chess move?",
      "How long did Louis Paulsen take to move?"
    ],
    short_answer: "Guinness records Louis Paulsen as taking part in a game that lasted more than 15 hours before chess clocks were standard.",
    answer: "The game was the 1857 Paul Morphy–Louis Paulsen final of the First American Chess Congress.",
    example: "Paulsen reportedly spent up to 1 hour 15 minutes on individual moves.",
    related: ["FACT-092", "GAME-003", "TOURNAMENT-040"],
    source: "Guinness World Records",
    verified: true
  },

  {
    id: "FACT-094",
    type: "Chess Fact",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Check",
    title: "Can a king capture a protected checking piece?",
    level: "Beginner",
    keywords: ["king capture", "check", "protection"],
    questions: [
      "Can the king capture a checking piece?",
      "When can a king take an attacking piece?"
    ],
    short_answer: "Yes, but only if the destination square is not attacked by an enemy piece.",
    answer: "The king may never move into check.",
    example: "A king can capture an unprotected checking rook but cannot capture it if another enemy piece protects that square.",
    related: ["MOVE-010", "RULE-010", "MATE-005"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "FACT-095",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Checkmate Patterns",
    title: "Why are mating patterns useful?",
    level: "Beginner",
    keywords: ["checkmate", "patterns", "training"],
    questions: [
      "Why should players memorize checkmate patterns?",
      "Are checkmate patterns useful in real games?"
    ],
    short_answer: "Recognizing mating patterns helps players calculate attacks faster.",
    answer: "Patterns reduce the amount of calculation needed when familiar structures appear.",
    example: "Recognizing a back-rank pattern can immediately reveal a tactical opportunity.",
    related: ["MATE-001", "PUZZLE-030", "TRAIN-030"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "FACT-096",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess and Mathematics",
    title: "Why is chess connected to mathematics?",
    level: "Beginner",
    keywords: ["chess", "mathematics", "logic"],
    questions: [
      "Why do mathematicians study chess?",
      "What mathematical ideas appear in chess?"
    ],
    short_answer: "Chess involves combinatorics, graph theory, optimization, probability, and logical reasoning.",
    answer: "Problems such as the knight's tour and eight queens problem connect chessboards with mathematics.",
    example: "The knight's tour asks whether a knight can visit every square exactly once.",
    related: ["FACT-075", "LOGIC-001", "FACT-097"],
    source: "Mathematical chess literature",
    verified: true
  },

  {
    id: "FACT-097",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Eight Queens",
    title: "What is the eight queens puzzle?",
    level: "Intermediate",
    keywords: ["eight queens", "chess puzzle", "mathematics"],
    questions: [
      "What is the eight queens problem?",
      "Can eight queens be placed without attacking each other?"
    ],
    short_answer: "Yes. Eight queens can be placed on an 8×8 board so that no queen attacks another.",
    answer: "The problem is a famous mathematical puzzle inspired by chess.",
    example: "A valid arrangement has exactly one queen in each row and column with no shared diagonal.",
    related: ["FACT-096", "LOGIC-060", "PUZZLE-070"],
    source: "Mathematical chess literature",
    verified: true
  },

  {
    id: "FACT-098",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess and AI",
    title: "Why is chess important in artificial intelligence research?",
    level: "Intermediate",
    keywords: ["AI", "chess", "artificial intelligence"],
    questions: [
      "Why has chess been important for AI?",
      "Why do AI researchers study chess?"
    ],
    short_answer: "Chess provides a difficult, measurable environment for testing search, evaluation, planning, and learning.",
    answer: "Computer chess has been a major benchmark for artificial intelligence for decades.",
    example: "Deep Blue and modern neural engines represent different stages of AI development.",
    related: ["TECH-001", "TECH-010", "FACT-051"],
    source: "Computer chess history",
    verified: true
  },

  {
    id: "FACT-099",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Chess Evolution",
    title: "Why does chess keep changing even though the basic rules remain stable?",
    level: "Beginner",
    keywords: ["chess evolution", "strategy", "modern chess"],
    questions: [
      "Why does chess strategy keep changing?",
      "How can chess evolve without changing its rules?"
    ],
    short_answer: "Players discover new openings, strategies, techniques, and training methods.",
    answer: "Engines, databases, computers, and new generations continuously expand chess knowledge.",
    example: "An opening line that was considered unusual decades ago can become mainstream after new analysis.",
    related: ["HISTORY-080", "TECH-020", "THEORY-090"],
    source: "Chess theory development",
    verified: true
  },

  {
    id: "FACT-100",
    type: "Chess Curiosity",
    category: "Chess Records, Facts & Curiosities",
    topic: "Chess Facts",
    subtopic: "Golden Fact",
    title: "What makes chess one of the most fascinating games in the world?",
    level: "Beginner",
    keywords: ["chess", "facts", "complexity", "history"],
    questions: [
      "Why is chess so fascinating?",
      "What makes chess unique?"
    ],
    short_answer: "Chess combines simple rules with enormous strategic, tactical, mathematical, historical, and human complexity.",
    answer: "A beginner can learn the rules quickly, yet players can spend a lifetime discovering new ideas.",
    example: "The same 64-square board can produce completely different positions and stories in every game.",
    related: ["FACT-016", "FACT-096", "LOGIC-100"],
    source: "Chess history, mathematics, and established chess principles",
    verified: true
  }

];

export default chessRecordsFactsCuriosities;