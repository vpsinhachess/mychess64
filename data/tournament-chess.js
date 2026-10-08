const tournamentChessTimeManagement = [

  {
    id: "TOURNAMENT-001",
    type: "TOURNAMENT",
    category: "Tournament Basics",
    topic: "Tournament Chess",
    subtopic: "Tournament basics",
    title: "What is a chess tournament?",
    level: "Beginner",
    keywords: ["tournament", "competition", "chess event"],
    questions: [
      "What is a chess tournament?",
      "How does tournament chess work?"
    ],
    short_answer: "A chess tournament is an organized competition in which players play scheduled games under defined rules.",
    answer: "Players are paired for games, receive scores, and are ranked according to the tournament system and published regulations.",
    example: "In a seven-round Swiss tournament, a player normally plays one opponent in each round.",
    related: ["TOURNAMENT-002", "TOURNAMENT-003"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-002",
    type: "TOURNAMENT",
    category: "Tournament Basics",
    topic: "Tournament Chess",
    subtopic: "Tournament formats",
    title: "What are the main chess tournament formats?",
    level: "Beginner",
    keywords: ["Swiss", "round robin", "knockout"],
    questions: [
      "What are the main chess tournament formats?",
      "Which systems are commonly used in chess tournaments?"
    ],
    short_answer: "The main formats are Swiss, round robin, and knockout.",
    answer: "Swiss tournaments pair players with similar scores, round robins have players play each other according to the format, and knockout events eliminate players or teams through matches.",
    example: "A 100-player open event is commonly organized as a Swiss tournament.",
    related: ["TOURNAMENT-003", "TOURNAMENT-004"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-003",
    type: "TOURNAMENT",
    category: "Tournament Systems",
    topic: "Tournament Chess",
    subtopic: "Swiss system",
    title: "What is a Swiss tournament?",
    level: "Beginner",
    keywords: ["Swiss", "pairing", "score"],
    questions: [
      "What is a Swiss chess tournament?",
      "How does a Swiss system work?"
    ],
    short_answer: "A Swiss tournament pairs players with similar scores while normally avoiding repeat opponents.",
    answer: "Players do not usually play everyone. After each round, the pairing system uses standings and pairing rules to create the next round.",
    example: "After scoring 3/4, you will normally be paired with another player in a similar score group.",
    related: ["TOURNAMENT-005", "TOURNAMENT-010"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-004",
    type: "TOURNAMENT",
    category: "Tournament Systems",
    topic: "Tournament Chess",
    subtopic: "Round robin",
    title: "What is a round-robin tournament?",
    level: "Beginner",
    keywords: ["round robin", "Berger", "all play all"],
    questions: [
      "What is a round-robin chess tournament?",
      "How does an all-play-all tournament work?"
    ],
    short_answer: "A round robin is a tournament in which players are scheduled to play each other according to the event format.",
    answer: "In a single round robin, each player normally meets every other player once.",
    example: "With 8 players, a single round robin requires 7 rounds.",
    related: ["TOURNAMENT-002", "TOURNAMENT-005"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-005",
    type: "TOURNAMENT",
    category: "Tournament Systems",
    topic: "Tournament Chess",
    subtopic: "Knockout",
    title: "What is a knockout chess tournament?",
    level: "Beginner",
    keywords: ["knockout", "elimination", "match"],
    questions: [
      "What is a knockout chess tournament?",
      "How does elimination work in chess?"
    ],
    short_answer: "A knockout tournament eliminates players through successive matches until a winner remains.",
    answer: "The exact number of games and tie-break procedures depend on the event regulations.",
    example: "A player who wins the quarterfinal, semifinal, and final wins a four-player knockout.",
    related: ["TOURNAMENT-002", "TOURNAMENT-006"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-006",
    type: "TOURNAMENT",
    category: "Tournament Systems",
    topic: "Tournament Chess",
    subtopic: "Match play",
    title: "What is a chess match?",
    level: "Beginner",
    keywords: ["match", "games", "score"],
    questions: [
      "What is a chess match?",
      "How is a chess match different from a tournament?"
    ],
    short_answer: "A chess match is a competition between two players or teams over one or more games.",
    answer: "The winner is determined by the match regulations, which may include multiple games and tie-breaks.",
    example: "A championship match may consist of several classical games followed by tie-break games if required.",
    related: ["TOURNAMENT-005", "TOURNAMENT-007"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-007",
    type: "TOURNAMENT",
    category: "Rounds",
    topic: "Tournament Chess",
    subtopic: "Tournament rounds",
    title: "What is a tournament round?",
    level: "Beginner",
    keywords: ["round", "pairing", "game"],
    questions: [
      "What is a round in chess?",
      "What happens in one tournament round?"
    ],
    short_answer: "A round is a scheduled stage in which players play their assigned games.",
    answer: "After the round, results are recorded and used to determine standings and future pairings.",
    example: "In Round 4, a player receives a pairing and plays that game before the next round begins.",
    related: ["TOURNAMENT-003", "TOURNAMENT-008"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-008",
    type: "TOURNAMENT",
    category: "Pairings",
    topic: "Tournament Chess",
    subtopic: "Pairing",
    title: "What is a chess pairing?",
    level: "Beginner",
    keywords: ["pairing", "opponent", "round"],
    questions: [
      "What is a chess pairing?",
      "How do I know whom I play?"
    ],
    short_answer: "A pairing tells you which opponent you play and usually your board and color.",
    answer: "The tournament pairing system or pairing officer produces pairings according to the event's rules.",
    example: "The pairing sheet may show Board 12: Player A versus Player B.",
    related: ["TOURNAMENT-009", "TOURNAMENT-010"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-009",
    type: "TOURNAMENT",
    category: "Pairings",
    topic: "Tournament Chess",
    subtopic: "Pairing information",
    title: "What should I check in my pairing?",
    level: "Beginner",
    keywords: ["pairing", "board", "color"],
    questions: [
      "What should I check when pairings are published?",
      "How do I verify my tournament pairing?"
    ],
    short_answer: "Check your opponent, board number, color, and round.",
    answer: "If anything appears incorrect, report it to the arbiter or pairing official promptly.",
    example: "Before sitting down, confirm that your name and opponent are correct on the pairing list.",
    related: ["TOURNAMENT-008", "TOURNAMENT-012"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-010",
    type: "TOURNAMENT",
    category: "Pairings",
    topic: "Tournament Chess",
    subtopic: "Swiss pairing",
    title: "How are Swiss pairings generally made?",
    level: "Intermediate",
    keywords: ["Swiss", "pairing", "score group"],
    questions: [
      "How are players paired in a Swiss tournament?",
      "Why do players with similar scores often meet?"
    ],
    short_answer: "Swiss pairings generally group players by score and apply the tournament's pairing rules.",
    answer: "The exact pairing algorithm considers factors such as score groups, previous opponents, colors, and applicable pairing rules.",
    example: "Players on 4/5 are normally considered against other players in the relevant score group before wider pairings are needed.",
    related: ["TOURNAMENT-003", "TOURNAMENT-011"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-011",
    type: "TOURNAMENT",
    category: "Pairings",
    topic: "Tournament Chess",
    subtopic: "Pairing systems",
    title: "What is the FIDE Dutch System?",
    level: "Advanced",
    keywords: ["Dutch System", "Swiss", "FIDE"],
    questions: [
      "What is the FIDE Dutch System?",
      "Which Swiss pairing system does FIDE use?"
    ],
    short_answer: "The Dutch System is a FIDE-approved Swiss pairing system.",
    answer: "It uses defined pairing procedures for score groups, colors, opponents, and pairing constraints. Event regulations determine which system applies.",
    example: "A FIDE-rated Swiss event may use the Dutch System through approved pairing software.",
    related: ["TOURNAMENT-003", "TOURNAMENT-010"],
    source: "FIDE Swiss System Rules",
    verified: true
  },

  {
    id: "TOURNAMENT-012",
    type: "TOURNAMENT",
    category: "Pairings",
    topic: "Tournament Chess",
    subtopic: "Pairing disputes",
    title: "What should I do if my pairing looks wrong?",
    level: "Intermediate",
    keywords: ["pairing error", "arbiter", "dispute"],
    questions: [
      "What should I do if my tournament pairing is wrong?",
      "Who should I ask about a pairing problem?"
    ],
    short_answer: "Ask the pairing officer or arbiter immediately.",
    answer: "Do not simply change boards or opponents yourself. Let the tournament officials verify and correct the issue.",
    example: "If your opponent's name is different from the published pairing, ask the arbiter before starting.",
    related: ["TOURNAMENT-008", "TOURNAMENT-060"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-013",
    type: "TOURNAMENT",
    category: "Colors",
    topic: "Tournament Chess",
    subtopic: "Color allocation",
    title: "How are colors assigned in tournaments?",
    level: "Intermediate",
    keywords: ["White", "Black", "colors"],
    questions: [
      "How are White and Black colors assigned?",
      "Can I choose my color in a tournament?"
    ],
    short_answer: "Colors are assigned according to the tournament's pairing rules.",
    answer: "In many tournaments, color allocation aims to balance colors over the event while following pairing constraints.",
    example: "A player who has had several games with the same color may receive priority for the opposite color when the rules allow.",
    related: ["TOURNAMENT-010", "TOURNAMENT-014"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-014",
    type: "TOURNAMENT",
    category: "Colors",
    topic: "Tournament Chess",
    subtopic: "Color balance",
    title: "Why does color balance matter?",
    level: "Intermediate",
    keywords: ["color balance", "White", "Black"],
    questions: [
      "Why do tournament systems try to balance colors?",
      "Why is color balance important in Swiss chess?"
    ],
    short_answer: "Color balance helps keep the tournament fair.",
    answer: "White and Black can have different practical characteristics, so pairing rules attempt to distribute colors according to the applicable regulations.",
    example: "A tournament should not casually give one player White in every round.",
    related: ["TOURNAMENT-013", "TOURNAMENT-010"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-015",
    type: "TOURNAMENT",
    category: "Byes",
    topic: "Tournament Chess",
    subtopic: "Bye",
    title: "What is a bye in chess?",
    level: "Beginner",
    keywords: ["bye", "half point", "round"],
    questions: [
      "What is a bye in a chess tournament?",
      "Do I always get a point for a bye?"
    ],
    short_answer: "A bye means a player does not play a game in that round; the scoring depends on the tournament rules.",
    answer: "Some events award a specified score for an unpaired or requested bye, while other situations may result in no score.",
    example: "A tournament may allow one half-point bye if its regulations permit it.",
    related: ["TOURNAMENT-016", "TOURNAMENT-017"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-016",
    type: "TOURNAMENT",
    category: "Byes",
    topic: "Tournament Chess",
    subtopic: "Half-point bye",
    title: "Can I request a half-point bye?",
    level: "Intermediate",
    keywords: ["bye", "half point", "request"],
    questions: [
      "Can I ask for a half-point bye?",
      "How does a half-point bye work?"
    ],
    short_answer: "Only if the tournament regulations permit it.",
    answer: "In applicable FIDE competition regulations, a half-point bye may be permitted under specified conditions and normally requires adequate notice and arbiter approval.",
    example: "A player who cannot attend one round may request a bye before pairings are prepared.",
    related: ["TOURNAMENT-015", "TOURNAMENT-017"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-017",
    type: "TOURNAMENT",
    category: "Byes",
    topic: "Tournament Chess",
    subtopic: "Missing a round",
    title: "What if I cannot play a round?",
    level: "Intermediate",
    keywords: ["round", "absence", "bye"],
    questions: [
      "What should I do if I cannot play one round?",
      "Who should I tell if I will miss a round?"
    ],
    short_answer: "Inform the pairing officer and arbiter before the pairings are made.",
    answer: "Early notice gives the officials time to handle your absence according to the tournament regulations.",
    example: "If you must miss Round 5, tell the tournament officials before Round 5 pairings are published.",
    related: ["TOURNAMENT-016", "TOURNAMENT-018"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-018",
    type: "TOURNAMENT",
    category: "Withdrawal",
    topic: "Tournament Chess",
    subtopic: "Withdrawal",
    title: "What happens if a player withdraws?",
    level: "Intermediate",
    keywords: ["withdrawal", "Swiss", "cross table"],
    questions: [
      "What happens when a player leaves a Swiss tournament?",
      "Can a player withdraw after playing games?"
    ],
    short_answer: "A player may withdraw according to tournament procedures, but played results normally remain recorded.",
    answer: "FIDE competition regulations specify how withdrawn players and their results are handled for ranking and rating purposes.",
    example: "If a player withdraws after several rounds, the games already played are not simply erased.",
    related: ["TOURNAMENT-017", "TOURNAMENT-019"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-019",
    type: "TOURNAMENT",
    category: "Standings",
    topic: "Tournament Chess",
    subtopic: "Score",
    title: "How are chess tournament points normally scored?",
    level: "Beginner",
    keywords: ["score", "win", "draw"],
    questions: [
      "How are points scored in chess tournaments?",
      "How many points is a win worth?"
    ],
    short_answer: "The standard individual scoring is usually 1 for a win, ½ for a draw, and 0 for a loss.",
    answer: "However, some special events use different scoring systems, so always check the regulations.",
    example: "Three wins and two draws give 4/5 under the standard scoring system.",
    related: ["TOURNAMENT-020", "TOURNAMENT-021"],
    source: "FIDE Laws and Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-020",
    type: "TOURNAMENT",
    category: "Standings",
    topic: "Tournament Chess",
    subtopic: "Standings",
    title: "What are tournament standings?",
    level: "Beginner",
    keywords: ["standings", "ranking", "score"],
    questions: [
      "What are chess tournament standings?",
      "How is my tournament position determined?"
    ],
    short_answer: "Standings rank players according to their scores and the tournament's tie-break rules.",
    answer: "If players have equal scores, published tie-break criteria may determine their order.",
    example: "Two players on 5/7 may occupy different places because their tie-break scores differ.",
    related: ["TOURNAMENT-019", "TOURNAMENT-022"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-021",
    type: "TOURNAMENT",
    category: "Standings",
    topic: "Tournament Chess",
    subtopic: "Cross table",
    title: "What is a tournament cross table?",
    level: "Beginner",
    keywords: ["cross table", "results", "standings"],
    questions: [
      "What is a chess cross table?",
      "What information does a cross table show?"
    ],
    short_answer: "A cross table records players, opponents, results, scores, and standings.",
    answer: "It provides a compact view of how each player performed throughout the tournament.",
    example: "You can use a cross table to see who each player faced in every round.",
    related: ["TOURNAMENT-020", "TOURNAMENT-023"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-022",
    type: "TOURNAMENT",
    category: "Tie-Breaks",
    topic: "Tournament Chess",
    subtopic: "Tie-breaks",
    title: "What is a chess tie-break?",
    level: "Beginner",
    keywords: ["tie-break", "equal score", "ranking"],
    questions: [
      "What is a tie-break in chess?",
      "Why can two players with the same score have different ranks?"
    ],
    short_answer: "A tie-break is a published method used to separate players with equal scores.",
    answer: "Different tournaments may use different tie-break systems, and their order of application must be specified by the event regulations.",
    example: "Two players scoring 6/9 may be ranked differently by a published tie-break.",
    related: ["TOURNAMENT-020", "TOURNAMENT-023"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-023",
    type: "TOURNAMENT",
    category: "Tie-Breaks",
    topic: "Tournament Chess",
    subtopic: "Tie-break systems",
    title: "What are common chess tie-break methods?",
    level: "Intermediate",
    keywords: ["Buchholz", "Sonneborn-Berger", "tie-break"],
    questions: [
      "What are common chess tie-break systems?",
      "What is Buchholz or Sonneborn-Berger?"
    ],
    short_answer: "Common tie-break methods include Buchholz-type systems and Sonneborn-Berger, depending on the event.",
    answer: "Each method uses different information from opponents' results or the player's game results. The tournament regulations determine which method applies.",
    example: "A Swiss event may use an opponent-score-based tie-break to separate equal scores.",
    related: ["TOURNAMENT-022", "TOURNAMENT-024"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-024",
    type: "TOURNAMENT",
    category: "Tie-Breaks",
    topic: "Tournament Chess",
    subtopic: "Tie-break order",
    title: "Which tie-break comes first?",
    level: "Intermediate",
    keywords: ["tie-break", "ranking", "regulations"],
    questions: [
      "Which tie-break is used first?",
      "Is there one universal FIDE tie-break order?"
    ],
    short_answer: "There is no single tie-break order for every tournament.",
    answer: "The event regulations must specify the tie-break criteria and their order.",
    example: "One tournament may use Buchholz first, while another may use direct encounter or another published criterion.",
    related: ["TOURNAMENT-022", "TOURNAMENT-023"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-025",
    type: "TOURNAMENT",
    category: "Chess Clocks",
    topic: "Tournament Chess",
    subtopic: "Chess clock",
    title: "What is a chess clock?",
    level: "Beginner",
    keywords: ["clock", "time", "chess clock"],
    questions: [
      "What is a chess clock?",
      "Why is a clock used in tournament chess?"
    ],
    short_answer: "A chess clock records the remaining thinking time for both players.",
    answer: "Players normally press the clock after making their moves, transferring the running time to the opponent.",
    example: "After White moves and presses the clock, Black's clock starts running.",
    related: ["TOURNAMENT-026", "TOURNAMENT-027"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-026",
    type: "TOURNAMENT",
    category: "Chess Clocks",
    topic: "Tournament Chess",
    subtopic: "Clock operation",
    title: "When should I press the chess clock?",
    level: "Beginner",
    keywords: ["press clock", "move", "time"],
    questions: [
      "When should I press my chess clock?",
      "Do I press the clock after moving?"
    ],
    short_answer: "After making your move, press your clock so the opponent's time starts.",
    answer: "The move and clock press are part of the normal move sequence. Follow the tournament's clock procedure and use one hand where required by the Laws.",
    example: "Move the piece, then press your side of the clock with the same hand.",
    related: ["TOURNAMENT-025", "TOURNAMENT-028"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-027",
    type: "TOURNAMENT",
    category: "Time Controls",
    topic: "Tournament Chess",
    subtopic: "Time control",
    title: "What is a chess time control?",
    level: "Beginner",
    keywords: ["time control", "minutes", "increment"],
    questions: [
      "What is a time control in chess?",
      "What does 90+30 mean in chess?"
    ],
    short_answer: "A time control defines how much time players receive and whether additional time is added.",
    answer: "For example, 90+30 commonly means 90 minutes initially with 30 seconds added after each move.",
    example: "In a 90+30 game, each player receives 90 minutes and gains 30 seconds after every move.",
    related: ["TOURNAMENT-028", "TOURNAMENT-029"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-028",
    type: "TOURNAMENT",
    category: "Time Controls",
    topic: "Tournament Chess",
    subtopic: "Increment",
    title: "What is increment in chess?",
    level: "Beginner",
    keywords: ["increment", "delay", "time"],
    questions: [
      "What is increment in chess?",
      "How does a 30-second increment work?"
    ],
    short_answer: "Increment adds a fixed amount of time to a player's clock after each move.",
    answer: "The exact time control is defined by the tournament regulations.",
    example: "With a 30-second increment, a player receives 30 seconds after each completed move.",
    related: ["TOURNAMENT-027", "TOURNAMENT-030"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-029",
    type: "TOURNAMENT",
    category: "Time Controls",
    topic: "Tournament Chess",
    subtopic: "Delay",
    title: "What is delay in chess?",
    level: "Intermediate",
    keywords: ["delay", "time control", "clock"],
    questions: [
      "What is delay time in chess?",
      "How is delay different from increment?"
    ],
    short_answer: "With delay, a specified time passes before a player's main clock begins to decrease.",
    answer: "Unlike increment, delay does not add unused delay time to the player's main clock.",
    example: "With a five-second delay, the player's main time begins decreasing after the delay period.",
    related: ["TOURNAMENT-028", "TOURNAMENT-030"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-030",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Time management",
    title: "What is good chess time management?",
    level: "Intermediate",
    keywords: ["time management", "clock", "thinking"],
    questions: [
      "How should I manage my chess clock?",
      "What is good tournament time management?"
    ],
    short_answer: "Spend more time on critical positions and move efficiently in simple positions.",
    answer: "Avoid both rushing and overthinking. Reserve enough time for complex decisions and the later stages of the game.",
    example: "Do not spend ten minutes on a routine opening move and then play the critical middlegame in seconds.",
    related: ["TOURNAMENT-031", "THINK-001"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-031",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Time allocation",
    title: "Should I use the same amount of time on every move?",
    level: "Intermediate",
    keywords: ["time", "thinking", "move"],
    questions: [
      "Should I spend equal time on every chess move?",
      "When should I spend more time?"
    ],
    short_answer: "No. Critical positions deserve more thinking time.",
    answer: "Spend less time on familiar or forced positions and more time when the position changes significantly or the consequences are serious.",
    example: "Use extra time before a tactical sequence or an irreversible pawn move.",
    related: ["TOURNAMENT-030", "TOURNAMENT-032"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-032",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Critical positions",
    title: "When should I spend extra time?",
    level: "Intermediate",
    keywords: ["critical position", "calculation", "clock"],
    questions: [
      "When should I think longer in a tournament game?",
      "What positions deserve extra time?"
    ],
    short_answer: "Spend extra time when the position is critical, tactical, unclear, or difficult to reverse.",
    answer: "Typical critical moments include tactical opportunities, major exchanges, pawn breaks, king attacks, and transitions into endgames.",
    example: "Before accepting a queen trade that changes the entire character of the game, calculate carefully.",
    related: ["TOURNAMENT-031", "THINK-013"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-033",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Time trouble",
    title: "What is time trouble?",
    level: "Beginner",
    keywords: ["time trouble", "clock", "low time"],
    questions: [
      "What is time trouble in chess?",
      "What does being in time pressure mean?"
    ],
    short_answer: "Time trouble means having very little time left to make the remaining moves.",
    answer: "Time pressure increases the risk of blunders and makes accurate calculation harder.",
    example: "A player with one minute left against an opponent with twenty minutes is under severe time pressure.",
    related: ["TOURNAMENT-034", "TOURNAMENT-035"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-034",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Playing in time trouble",
    title: "How should I play during time trouble?",
    level: "Intermediate",
    keywords: ["time trouble", "blunders", "clock"],
    questions: [
      "How can I survive time trouble?",
      "What should I do when my clock is very low?"
    ],
    short_answer: "Stay calm, prioritize forcing moves, and avoid unnecessary complications when possible.",
    answer: "Use the increment efficiently if available and keep checking basic threats before moving.",
    example: "With 20 seconds plus increment, look first for checks, captures, threats, and immediate defensive needs.",
    related: ["TOURNAMENT-033", "TOURNAMENT-035"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-035",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Increment strategy",
    title: "How should I use increment?",
    level: "Intermediate",
    keywords: ["increment", "clock", "time trouble"],
    questions: [
      "How should I use increment effectively?",
      "Does increment mean I can always play quickly?"
    ],
    short_answer: "Use the increment to maintain control, but still think carefully when the position requires it.",
    answer: "Increment gives you additional time after moves, but it does not remove the need for sound time management.",
    example: "In a 30-second increment game, use the added seconds to verify tactical details instead of automatically moving.",
    related: ["TOURNAMENT-028", "TOURNAMENT-034"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-036",
    type: "TOURNAMENT",
    category: "Time Management",
    topic: "Tournament Chess",
    subtopic: "Clock awareness",
    title: "Should I regularly check my clock?",
    level: "Beginner",
    keywords: ["clock awareness", "time", "tournament"],
    questions: [
      "Should I look at the chess clock during the game?",
      "Why is clock awareness important?"
    ],
    short_answer: "Yes. Know your remaining time and adjust your thinking accordingly.",
    answer: "Clock awareness helps prevent sudden time trouble and improves practical decision-making.",
    example: "After a long calculation, check your clock before deciding whether to continue calculating.",
    related: ["TOURNAMENT-030", "TOURNAMENT-033"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-037",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Preparation",
    title: "How should I prepare before a tournament?",
    level: "Beginner",
    keywords: ["preparation", "training", "tournament"],
    questions: [
      "How should I prepare for a chess tournament?",
      "What should I do before tournament day?"
    ],
    short_answer: "Prepare your openings, tactics, endgames, equipment, schedule, and mindset.",
    answer: "Good preparation combines chess training with practical preparation such as sleep, travel, food, and knowing the tournament schedule.",
    example: "The night before, review your repertoire lightly instead of trying to learn hundreds of new variations.",
    related: ["TOURNAMENT-038", "TRAIN-001"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-038",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Pre-game routine",
    title: "What should I do before each game?",
    level: "Beginner",
    keywords: ["pre-game", "routine", "focus"],
    questions: [
      "What should I do before a tournament game?",
      "How can I get mentally ready before playing?"
    ],
    short_answer: "Arrive early, settle down, check your board and clock, and focus on the game.",
    answer: "Avoid unnecessary distractions. Enter the game with a calm and objective mindset.",
    example: "Take a few quiet minutes before the round instead of rushing to the board at the last moment.",
    related: ["TOURNAMENT-037", "TOURNAMENT-039"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-039",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Opponent preparation",
    title: "Should I prepare for my opponent?",
    level: "Intermediate",
    keywords: ["opponent", "preparation", "opening"],
    questions: [
      "Should I study my opponent before a tournament game?",
      "How should I prepare against a specific opponent?"
    ],
    short_answer: "If reliable information is available, study the opponent's common openings and playing tendencies.",
    answer: "Preparation should support your own repertoire rather than forcing you into unfamiliar positions.",
    example: "If an opponent regularly plays the Sicilian, prepare the line you already understand best against it.",
    related: ["THEORY-095", "TOURNAMENT-037"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-040",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Equipment",
    title: "What should I carry to an OTB tournament?",
    level: "Beginner",
    keywords: ["equipment", "tournament", "OTB"],
    questions: [
      "What should I bring to an over-the-board chess tournament?",
      "What tournament equipment is useful?"
    ],
    short_answer: "Bring identification if required, writing materials if needed, water, food, and any permitted personal items.",
    answer: "Check the event instructions because equipment and electronic-device rules can differ.",
    example: "Carry a pen, water bottle, and tournament information instead of relying entirely on your phone.",
    related: ["TOURNAMENT-041", "TOURNAMENT-052"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-041",
    type: "TOURNAMENT",
    category: "Tournament Etiquette",
    topic: "Tournament Chess",
    subtopic: "Playing hall",
    title: "How should I behave in the playing hall?",
    level: "Beginner",
    keywords: ["etiquette", "playing hall", "behavior"],
    questions: [
      "What is proper chess tournament behavior?",
      "How should I behave at the board?"
    ],
    short_answer: "Be quiet, respectful, focused, and follow the arbiter's instructions.",
    answer: "Avoid disturbing other players and do not interfere with games that are not yours.",
    example: "Do not discuss a position loudly while nearby players are still playing.",
    related: ["TOURNAMENT-042", "TOURNAMENT-052"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-042",
    type: "TOURNAMENT",
    category: "Tournament Etiquette",
    topic: "Tournament Chess",
    subtopic: "Sportsmanship",
    title: "What is good chess sportsmanship?",
    level: "Beginner",
    keywords: ["sportsmanship", "respect", "etiquette"],
    questions: [
      "What is good sportsmanship in chess?",
      "How should I treat my opponent?"
    ],
    short_answer: "Respect your opponent regardless of the result.",
    answer: "Play fairly, avoid distracting behavior, accept results professionally, and follow tournament rules.",
    example: "After losing, congratulate your opponent rather than blaming the board, clock, or luck.",
    related: ["TOURNAMENT-041", "PSYCH-001"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-043",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Recording moves",
    title: "Why do players record moves in tournaments?",
    level: "Beginner",
    keywords: ["scoresheet", "notation", "moves"],
    questions: [
      "Why must tournament players write their moves?",
      "What is a chess scoresheet?"
    ],
    short_answer: "The scoresheet records the moves of the game and supports official game records and claims.",
    answer: "In games governed by the FIDE Laws, players normally record moves as required by the Laws, subject to the applicable time-control provisions.",
    example: "A player records 1.e4 e5 2.Nf3 before continuing with the game.",
    related: ["NOTATION-001", "TOURNAMENT-044"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-044",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Writing moves",
    title: "When should I write my move?",
    level: "Intermediate",
    keywords: ["scoresheet", "move recording", "notation"],
    questions: [
      "When should I write my move on the scoresheet?",
      "Can I write my move before playing it?"
    ],
    short_answer: "Follow the FIDE Laws and event procedure for recording moves; normally moves are recorded after being played.",
    answer: "The exact requirements can depend on the stage of the game and time-control conditions.",
    example: "Do not use the scoresheet as a place to plan several future moves during play.",
    related: ["TOURNAMENT-043", "NOTATION-002"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-045",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Draw offer",
    title: "How do I offer a draw in a tournament?",
    level: "Intermediate",
    keywords: ["draw offer", "draw", "offer"],
    questions: [
      "How do I offer a draw in tournament chess?",
      "Can I offer a draw at any time?"
    ],
    short_answer: "A draw offer must follow the FIDE Laws and any event-specific restrictions.",
    answer: "Under the Laws, a player offers a draw after making a move and before pressing the clock, unless the event regulations impose additional restrictions.",
    example: "Make your move, offer the draw, then press your clock.",
    related: ["TOURNAMENT-046", "TOURNAMENT-047"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-046",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Draw restrictions",
    title: "Can a tournament restrict draw offers?",
    level: "Intermediate",
    keywords: ["draw", "draw offer", "tournament rules"],
    questions: [
      "Can tournament rules restrict draw offers?",
      "Can players agree to a draw whenever they want?"
    ],
    short_answer: "Yes. Some event regulations can restrict draw agreements.",
    answer: "For example, certain competitions prohibit or restrict draw agreements before a specified move.",
    example: "An event may require players to continue until a stated move before agreeing to a draw, subject to its regulations.",
    related: ["TOURNAMENT-045", "TOURNAMENT-047"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-047",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Resignation",
    title: "How do I resign a chess game?",
    level: "Beginner",
    keywords: ["resign", "resignation", "game result"],
    questions: [
      "How do I resign in tournament chess?",
      "What happens when I resign?"
    ],
    short_answer: "A player may resign according to the FIDE Laws, normally by clearly indicating resignation to the opponent.",
    answer: "The game ends immediately with the resigning player losing, unless the position is already impossible for the opponent to win under the applicable rule.",
    example: "A player may stop the game and clearly resign when facing a completely lost position.",
    related: ["TOURNAMENT-048", "RULE-019"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-048",
    type: "TOURNAMENT",
    category: "Game Procedures",
    topic: "Tournament Chess",
    subtopic: "Result confirmation",
    title: "What should I do after the game?",
    level: "Beginner",
    keywords: ["result", "scoresheet", "game"],
    questions: [
      "What should I do after finishing my tournament game?",
      "Should I report the result?"
    ],
    short_answer: "Follow the event's procedure for reporting or confirming the result.",
    answer: "Some tournaments use a result slip, digital system, arbiter desk, or electronic board system.",
    example: "After finishing, check that the result has been correctly recorded before leaving.",
    related: ["TOURNAMENT-049", "TOURNAMENT-021"],
    source: "FIDE Competition Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-049",
    type: "TOURNAMENT",
    category: "Post-Game",
    topic: "Tournament Chess",
    subtopic: "Post-game routine",
    title: "What should I do between tournament rounds?",
    level: "Beginner",
    keywords: ["between rounds", "recovery", "tournament"],
    questions: [
      "What should I do between chess rounds?",
      "How can I recover between games?"
    ],
    short_answer: "Recover physically and mentally, then prepare calmly for the next round.",
    answer: "Drink water, eat appropriately, rest, review only important points, and avoid excessive emotional analysis.",
    example: "After a difficult loss, take a short break before thinking about the next game.",
    related: ["TOURNAMENT-050", "PSYCH-030"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-050",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Food and rest",
    title: "What should I eat during a tournament?",
    level: "Beginner",
    keywords: ["food", "water", "energy"],
    questions: [
      "What should I eat during a chess tournament?",
      "Why are food and hydration important?"
    ],
    short_answer: "Choose familiar, moderate food and stay properly hydrated.",
    answer: "Avoid experimenting with heavy meals immediately before a long game. Your goal is stable energy and comfort.",
    example: "Water and a light familiar snack may be more practical between rounds than a very heavy meal.",
    related: ["TOURNAMENT-049", "TOURNAMENT-051"],
    source: "Practical tournament advice",
    verified: true
  },

  {
    id: "TOURNAMENT-051",
    type: "TOURNAMENT",
    category: "Tournament Preparation",
    topic: "Tournament Chess",
    subtopic: "Sleep",
    title: "How important is sleep before a tournament?",
    level: "Beginner",
    keywords: ["sleep", "focus", "preparation"],
    questions: [
      "Does sleep affect chess performance?",
      "How should I prepare physically for a tournament?"
    ],
    short_answer: "Good sleep supports concentration, calculation, and emotional control.",
    answer: "Chess requires sustained attention, so arriving rested is usually more useful than late-night cramming.",
    example: "Before an important tournament, prioritize sleep instead of studying opening lines until very late.",
    related: ["TOURNAMENT-037", "TOURNAMENT-050"],
    source: "Practical tournament advice",
    verified: true
  },

  {
    id: "TOURNAMENT-052",
    type: "TOURNAMENT",
    category: "Fair Play",
    topic: "Tournament Chess",
    subtopic: "Electronic devices",
    title: "Can I use my phone during a tournament game?",
    level: "Beginner",
    keywords: ["phone", "electronic device", "fair play"],
    questions: [
      "Can I use my mobile phone during a chess game?",
      "Are electronic devices allowed in the playing area?"
    ],
    short_answer: "Electronic-device rules are strict and are defined by the FIDE Laws and event regulations.",
    answer: "Do not use or carry electronic devices in prohibited circumstances. Follow the tournament's announced rules and arbiter instructions.",
    example: "Keep your phone switched off and stored as required by the event.",
    related: ["TOURNAMENT-041", "TOURNAMENT-053"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-053",
    type: "TOURNAMENT",
    category: "Fair Play",
    topic: "Tournament Chess",
    subtopic: "Anti-cheating",
    title: "What is fair play in chess?",
    level: "Beginner",
    keywords: ["fair play", "cheating", "integrity"],
    questions: [
      "What does fair play mean in chess?",
      "Why is anti-cheating important?"
    ],
    short_answer: "Fair play means competing honestly without outside assistance or prohibited behavior.",
    answer: "Tournament organizers and arbiters may use procedures and technology to protect the integrity of competitions.",
    example: "Using an engine during an OTB tournament game is cheating when outside assistance is prohibited.",
    related: ["TOURNAMENT-052", "TOURNAMENT-054"],
    source: "FIDE Fair Play Regulations",
    verified: true
  },

  {
    id: "TOURNAMENT-054",
    type: "TOURNAMENT",
    category: "Arbiters",
    topic: "Tournament Chess",
    subtopic: "Arbiter",
    title: "What does a chess arbiter do?",
    level: "Beginner",
    keywords: ["arbiter", "official", "rules"],
    questions: [
      "What does a chess arbiter do?",
      "Who enforces the rules during a tournament?"
    ],
    short_answer: "The arbiter supervises the competition and applies the Laws and tournament regulations.",
    answer: "Arbiters handle disputes, clock issues, illegal moves, player conduct, pairings, and other tournament matters within their authority.",
    example: "If players disagree about a clock problem, they should call the arbiter.",
    related: ["TOURNAMENT-055", "TOURNAMENT-060"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-055",
    type: "TOURNAMENT",
    category: "Arbiters",
    topic: "Tournament Chess",
    subtopic: "Chief Arbiter",
    title: "What is the Chief Arbiter?",
    level: "Intermediate",
    keywords: ["Chief Arbiter", "arbiter", "tournament"],
    questions: [
      "What is the role of the Chief Arbiter?",
      "Who has overall responsibility for arbitration?"
    ],
    short_answer: "The Chief Arbiter has overall responsibility for applying the Laws and competition regulations during the event.",
    answer: "The Chief Arbiter coordinates the arbiters and makes decisions within the authority provided by the tournament regulations.",
    example: "A serious tournament dispute may ultimately be referred to the Chief Arbiter.",
    related: ["TOURNAMENT-054", "TOURNAMENT-060"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-056",
    type: "TOURNAMENT",
    category: "Rules",
    topic: "Tournament Chess",
    subtopic: "Touch-move",
    title: "What is the touch-move rule?",
    level: "Beginner",
    keywords: ["touch move", "piece", "FIDE"],
    questions: [
      "What is touch-move in chess?",
      "What happens if I touch my piece during a tournament game?"
    ],
    short_answer: "In general, deliberately touching your own piece can create an obligation to move it if it has a legal move.",
    answer: "Touching an opponent's piece can create an obligation to capture it if legally possible. The exact application follows the FIDE Laws.",
    example: "Do not casually touch a piece while thinking if you do not intend to move it.",
    related: ["TOURNAMENT-057", "RULE-029"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-057",
    type: "TOURNAMENT",
    category: "Rules",
    topic: "Tournament Chess",
    subtopic: "Adjusting pieces",
    title: "Can I adjust a chess piece during a tournament game?",
    level: "Beginner",
    keywords: ["adjust", "j'adoube", "piece"],
    questions: [
      "Can I straighten a chess piece?",
      "What should I say before adjusting a piece?"
    ],
    short_answer: "You may adjust a piece under the FIDE Laws by clearly indicating your intention before touching it.",
    answer: "The traditional expression is 'j'adoube' or 'I adjust'. Do this before touching the piece when it is not your intention to move it.",
    example: "Say 'adjust' before straightening a rook that was knocked out of place.",
    related: ["TOURNAMENT-056", "RULE-030"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-058",
    type: "TOURNAMENT",
    category: "Rules",
    topic: "Tournament Chess",
    subtopic: "Illegal move",
    title: "What is an illegal move in tournament chess?",
    level: "Intermediate",
    keywords: ["illegal move", "arbiter", "penalty"],
    questions: [
      "What is an illegal move?",
      "What happens after an illegal move?"
    ],
    short_answer: "An illegal move is a move that does not comply with the Laws of Chess.",
    answer: "The FIDE Laws specify how an illegal move is handled, including the possibility of a time penalty in applicable circumstances.",
    example: "Moving a pinned king into check is illegal.",
    related: ["TOURNAMENT-059", "RULE-046"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-059",
    type: "TOURNAMENT",
    category: "Rules",
    topic: "Tournament Chess",
    subtopic: "Illegal move procedure",
    title: "Should I stop the clock after an illegal move?",
    level: "Intermediate",
    keywords: ["illegal move", "clock", "arbiter"],
    questions: [
      "What should I do if my opponent makes an illegal move?",
      "Should I call the arbiter after an illegal move?"
    ],
    short_answer: "Follow the tournament procedure and call the arbiter when required.",
    answer: "Do not invent your own penalty. The arbiter applies the relevant FIDE Laws and event regulations.",
    example: "If an illegal move occurs, alert the arbiter rather than arguing with the opponent about the penalty.",
    related: ["TOURNAMENT-058", "TOURNAMENT-060"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-060",
    type: "TOURNAMENT",
    category: "Arbiters",
    topic: "Tournament Chess",
    subtopic: "Calling the arbiter",
    title: "When should I call the arbiter?",
    level: "Beginner",
    keywords: ["arbiter", "dispute", "rules"],
    questions: [
      "When should I call the chess arbiter?",
      "Should I call the arbiter if there is a dispute?"
    ],
    short_answer: "Call the arbiter when a rule, clock, pairing, conduct, or other tournament issue needs an official decision.",
    answer: "Remain calm and explain the situation clearly. The arbiter is there to apply the rules.",
    example: "Call the arbiter if you and your opponent disagree about a clock malfunction.",
    related: ["TOURNAMENT-054", "TOURNAMENT-061"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-061",
    type: "TOURNAMENT",
    category: "Claims",
    topic: "Tournament Chess",
    subtopic: "Draw claim",
    title: "What is a draw claim?",
    level: "Intermediate",
    keywords: ["draw claim", "threefold repetition", "50 moves"],
    questions: [
      "What is a draw claim in chess?",
      "How do I claim a draw?"
    ],
    short_answer: "A draw claim is a formal request made under a draw provision of the Laws.",
    answer: "Examples include claims based on the relevant repetition or 50-move provisions. The correct procedure matters.",
    example: "A player who believes the position qualifies for a claim should follow the FIDE procedure and involve the arbiter when necessary.",
    related: ["TOURNAMENT-062", "TOURNAMENT-063"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-062",
    type: "TOURNAMENT",
    category: "Claims",
    topic: "Tournament Chess",
    subtopic: "Threefold repetition",
    title: "How is threefold repetition handled in tournament chess?",
    level: "Intermediate",
    keywords: ["threefold repetition", "draw", "claim"],
    questions: [
      "Can I claim a draw by threefold repetition?",
      "Does threefold repetition automatically end every game?"
    ],
    short_answer: "Threefold repetition can provide a basis for a draw claim under the FIDE Laws.",
    answer: "The player must follow the prescribed claim procedure unless the position reaches a state where the Laws provide for an automatic draw under a different rule.",
    example: "If the same position has occurred three times, the player may have grounds to claim a draw under the Laws.",
    related: ["TOURNAMENT-061", "RULE-023"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-063",
    type: "TOURNAMENT",
    category: "Claims",
    topic: "Tournament Chess",
    subtopic: "50-move rule",
    title: "What is the 50-move rule?",
    level: "Intermediate",
    keywords: ["50 move rule", "draw", "pawn move"],
    questions: [
      "What is the 50-move rule?",
      "When can a player claim a draw under the 50-move rule?"
    ],
    short_answer: "The 50-move rule provides a draw claim after the required sequence of moves without a pawn move or capture.",
    answer: "The FIDE Laws define the exact claim procedure and the separate 75-move automatic-draw provision.",
    example: "If the required number of moves has passed without a pawn move or capture, a player may have a draw claim.",
    related: ["TOURNAMENT-061", "RULE-024"],
    source: "FIDE Laws of Chess",
    verified: true
  },

  {
    id: "TOURNAMENT-064",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Playing for the result",
    title: "Should I play differently based on the tournament standings?",
    level: "Intermediate",
    keywords: ["standings", "strategy", "result"],
    questions: [
      "Should tournament standings affect my strategy?",
      "Can the tournament situation change how I should play?"
    ],
    short_answer: "Yes, the tournament situation can influence practical decisions, but sound chess remains essential.",
    answer: "The score, remaining rounds, opponent, and tie-break situation can affect how much risk is practical.",
    example: "A player who needs a win in the final round may need to take more risks than a player who only needs a draw.",
    related: ["TOURNAMENT-065", "THINK-050"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-065",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Risk management",
    title: "When should I take more risks?",
    level: "Intermediate",
    keywords: ["risk", "strategy", "score"],
    questions: [
      "When should I take risks in a tournament game?",
      "Should I always play aggressively when I need a win?"
    ],
    short_answer: "Take risks when the tournament situation requires them, but calculate the consequences first.",
    answer: "Desperation is not a strategy. Choose practical complications that give you realistic winning chances.",
    example: "If you need a win in the final round, a controlled imbalance may be better than a random sacrifice.",
    related: ["TOURNAMENT-064", "TOURNAMENT-066"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-066",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Playing for a draw",
    title: "How should I play when I need only a draw?",
    level: "Intermediate",
    keywords: ["draw", "strategy", "tournament"],
    questions: [
      "How should I play if I only need a draw?",
      "Should I avoid all risks when I need half a point?"
    ],
    short_answer: "Prefer sound positions and avoid unnecessary risks, but do not become completely passive.",
    answer: "A passive strategy can create its own dangers. Aim for a position you can defend confidently.",
    example: "If a solid simplification leads to a comfortable endgame, it may be a practical choice.",
    related: ["TOURNAMENT-064", "END-001"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-067",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Winning after a loss",
    title: "How should I recover after losing a round?",
    level: "Beginner",
    keywords: ["loss", "recovery", "tournament"],
    questions: [
      "How should I recover after losing a tournament game?",
      "How can I avoid carrying a loss into the next round?"
    ],
    short_answer: "Accept the result, identify one useful lesson, and reset mentally.",
    answer: "Do not spend the entire break replaying the loss emotionally. Focus on the next game.",
    example: "Write down one mistake to review later, then stop analyzing and prepare for the next round.",
    related: ["TOURNAMENT-049", "PSYCH-031"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-068",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Winning streak",
    title: "How should I handle a winning streak?",
    level: "Intermediate",
    keywords: ["winning", "confidence", "tournament"],
    questions: [
      "How should I behave after several tournament wins?",
      "Can winning make me careless?"
    ],
    short_answer: "Stay focused and treat the next game as a new game.",
    answer: "Winning can increase confidence, but overconfidence can lead to careless decisions and underestimating opponents.",
    example: "After three wins, continue checking your opponent's threats instead of assuming the next game will be easy.",
    related: ["TOURNAMENT-067", "PSYCH-002"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-069",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Tournament mindset",
    title: "What is the best mindset for a tournament?",
    level: "Beginner",
    keywords: ["mindset", "focus", "tournament"],
    questions: [
      "What mindset should I have during a chess tournament?",
      "What is the right tournament attitude?"
    ],
    short_answer: "Focus on making good decisions rather than predicting the result.",
    answer: "Stay objective, respect every opponent, use your time wisely, and treat each round as a separate challenge.",
    example: "Instead of thinking 'I must win', think 'I will find the best move in each critical position.'",
    related: ["TOURNAMENT-067", "THINK-001"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "TOURNAMENT-070",
    type: "TOURNAMENT",
    category: "Tournament Strategy",
    topic: "Tournament Chess",
    subtopic: "Tournament checklist",
    title: "What is a simple tournament checklist?",
    level: "Beginner",
    keywords: ["checklist", "tournament", "preparation"],
    questions: [
      "What should I remember during a chess tournament?",
      "What is a simple tournament checklist?"
    ],
    short_answer: "Arrive prepared, check your pairing, manage your clock, follow the rules, and stay focused.",
    answer: "Before each game: confirm board and color. During the game: calculate, check threats, and manage time. After the game: record the result and reset.",
    example: "Pairing → Board → Clock → Opponent's threat → Candidate moves → Time management → Result → Recovery.",
    related: ["TOURNAMENT-038", "TOURNAMENT-036", "TOURNAMENT-048"],
    source: "FIDE Laws and practical chess coaching",
    verified: true
  }

];

export default tournamentChessTimeManagement;