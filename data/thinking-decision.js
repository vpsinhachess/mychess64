const chessThinkingDecisionMaking = [

  {
    id: "THINK-001",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Thinking Process",
    title: "What should I think about before every move?",
    level: "Beginner",
    keywords: ["thinking process", "candidate moves", "chess thinking"],
    questions: [
      "What should I check before making a move?",
      "What is a good thinking process in chess?"
    ],
    short_answer: "Check threats, identify candidate moves, calculate variations and compare the resulting positions.",
    answer: "A reliable process prevents impulsive moves and helps you make decisions based on the position rather than emotion.",
    example: "Before moving, ask: What is my opponent threatening? What are my forcing moves? What changes after my move?",
    related: ["THINK-002", "CALC-001"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-002",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Opponent Threats",
    title: "Look at the opponent's threat first",
    level: "Beginner",
    keywords: ["opponent threat", "threat assessment", "blunder prevention"],
    questions: [
      "Why should I check my opponent's threat first?",
      "What is my opponent threatening?"
    ],
    short_answer: "Because your plan is useless if the opponent has a stronger immediate threat.",
    answer: "Before looking for your own attack, identify checks, captures, tactical threats and direct plans available to your opponent.",
    example: "You may want to attack the queen, but first notice that your opponent threatens checkmate.",
    related: ["THINK-001", "MISTAKE-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-003",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Threat Assessment",
    title: "Ask what changed",
    level: "Beginner",
    keywords: ["what changed", "position", "last move"],
    questions: [
      "Why should I ask what changed after every move?",
      "How can the last move help me?"
    ],
    short_answer: "The last move may reveal a new threat, weakness, tactical opportunity or change in the position.",
    answer: "Compare the position before and after the opponent's move.",
    example: "A pawn move may open a diagonal and create a tactical attack on your queen.",
    related: ["THINK-002", "CALC-006"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-004",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Candidate Moves",
    title: "What is a candidate move?",
    level: "Beginner",
    keywords: ["candidate move", "calculation", "decision"],
    questions: [
      "What is a candidate move?",
      "How many candidate moves should I consider?"
    ],
    short_answer: "A candidate move is a serious move worth calculating before choosing your final move.",
    answer: "Usually consider a small number of strong candidates rather than calculating every legal move.",
    example: "Choose one forcing move, one improving move and one tactical alternative if they are relevant.",
    related: ["THINK-005", "CALC-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-005",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Candidate Moves",
    title: "How many candidate moves are enough?",
    level: "Intermediate",
    keywords: ["candidate moves", "calculation", "choice"],
    questions: [
      "Should I calculate many candidate moves?",
      "How many moves should I compare?"
    ],
    short_answer: "Usually a few serious candidates are enough.",
    answer: "Too many candidates waste time and can make calculation less accurate. Focus on moves that change the position significantly.",
    example: "Compare a tactical move, a direct threat and the best positional improvement.",
    related: ["THINK-004", "TOURNAMENT-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-006",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Forcing Moves",
    title: "Why calculate forcing moves first?",
    level: "Beginner",
    keywords: ["forcing moves", "checks", "captures", "threats"],
    questions: [
      "Why should I look for checks first?",
      "What are forcing moves?"
    ],
    short_answer: "Checks, captures and serious threats limit the opponent's choices and are easier to calculate first.",
    answer: "Forcing moves can immediately change the evaluation of the position.",
    example: "Before making a quiet move, check whether you have a winning capture or forcing check.",
    related: ["CALC-003", "THINK-007"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-007",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Forcing Moves",
    title: "Checks, captures and threats",
    level: "Beginner",
    keywords: ["checks captures threats", "CCT", "calculation"],
    questions: [
      "What is the checks-captures-threats method?",
      "How does CCT help me find tactics?"
    ],
    short_answer: "Scan checks, captures and direct threats for both sides before committing to a move.",
    answer: "This simple scan catches many tactical opportunities and blunders.",
    example: "After your opponent moves, check all legal checks, captures and major threats before planning.",
    related: ["THINK-006", "MISTAKE-002"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-008",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Calculation",
    title: "Calculate the opponent's best response",
    level: "Beginner",
    keywords: ["best response", "calculation", "opponent"],
    questions: [
      "Why must I calculate my opponent's best move?",
      "What if my opponent does not play the move I expect?"
    ],
    short_answer: "A move is only good if it survives the opponent's strongest reasonable response.",
    answer: "Do not calculate only the reply you hope the opponent will make.",
    example: "If you attack a queen, calculate whether the opponent can counterattack your king.",
    related: ["THINK-009", "CALC-006"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-009",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Calculation",
    title: "Do not calculate only your plan",
    level: "Beginner",
    keywords: ["opponent", "calculation", "planning"],
    questions: [
      "Why is focusing only on my plan dangerous?",
      "How do I avoid tunnel vision?"
    ],
    short_answer: "Your opponent is allowed to respond, counterattack and change the position.",
    answer: "Calculate the opponent's forcing resources before assuming your plan will work.",
    example: "You plan a kingside attack, but your opponent has a tactical central break that must be addressed first.",
    related: ["THINK-002", "THINK-008"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-010",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Blunder Check",
    title: "What is a blunder check?",
    level: "Beginner",
    keywords: ["blunder check", "mistakes", "safety"],
    questions: [
      "What should I check before playing a move?",
      "How can I reduce blunders?"
    ],
    short_answer: "Before playing, ask whether your move leaves your king, queen or pieces vulnerable.",
    answer: "A final safety check catches many simple tactical mistakes.",
    example: "After choosing a move, look once more for checks, captures and attacks against your moved piece.",
    related: ["THINK-011", "MISTAKE-003"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-011",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Blunder Check",
    title: "Use the final-move question",
    level: "Beginner",
    keywords: ["final check", "blunder prevention", "move safety"],
    questions: [
      "What final question should I ask before moving?",
      "How can I quickly check if my move blunders?"
    ],
    short_answer: "Ask: What is my opponent's strongest reply to this move?",
    answer: "This question forces you to look from the opponent's perspective before committing.",
    example: "If your move attacks a piece, check whether the opponent can give check or win something more valuable.",
    related: ["THINK-008", "THINK-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-012",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Evaluation",
    title: "How should I evaluate a position?",
    level: "Intermediate",
    keywords: ["evaluation", "position", "assessment"],
    questions: [
      "How do I evaluate a chess position?",
      "What factors should I compare?"
    ],
    short_answer: "Compare material, king safety, piece activity, pawn structure, space, initiative and tactical possibilities.",
    answer: "Evaluation should be based on several factors rather than one feature alone.",
    example: "Being up a pawn may not be enough if your king is exposed and your pieces are passive.",
    related: ["THINK-013", "POSITION-069"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-013",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Evaluation",
    title: "Material is not everything",
    level: "Beginner",
    keywords: ["material", "position", "evaluation"],
    questions: [
      "Is material the most important factor?",
      "Can I be better while down material?"
    ],
    short_answer: "Material is important, but activity, king safety and concrete threats can sometimes compensate.",
    answer: "A temporary material deficit may be justified by an attack, passed pawn or tactical opportunity.",
    example: "A sacrificed pawn may give rapid development and a strong attack.",
    related: ["THINK-012", "LOGIC-015"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-014",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Evaluation",
    title: "Compare king safety",
    level: "Beginner",
    keywords: ["king safety", "evaluation", "attack"],
    questions: [
      "How important is king safety when evaluating a position?",
      "Can king safety outweigh material?"
    ],
    short_answer: "Yes. A vulnerable king can create immediate tactical problems.",
    answer: "King safety often becomes the priority when open lines or attacking pieces point toward the king.",
    example: "A player may sacrifice a pawn to open lines against an exposed king.",
    related: ["ATTACK-001", "THINK-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-015",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Evaluation",
    title: "Compare piece activity",
    level: "Beginner",
    keywords: ["piece activity", "evaluation", "pieces"],
    questions: [
      "Why should I compare piece activity?",
      "What is an active piece?"
    ],
    short_answer: "Active pieces control useful squares, attack targets and support plans.",
    answer: "Improving the least active piece is often one of the strongest positional decisions.",
    example: "A rook on an open file may be much more useful than a rook trapped behind its own pawns.",
    related: ["END-026", "MIDDLE-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-016",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Evaluation",
    title: "Compare pawn structure",
    level: "Intermediate",
    keywords: ["pawn structure", "evaluation", "weaknesses"],
    questions: [
      "Why should I evaluate pawn structure?",
      "What should I look for in the pawns?"
    ],
    short_answer: "Look for passed pawns, weaknesses, pawn breaks, majorities and fixed targets.",
    answer: "Pawn structure often determines which plans and endgames are favorable.",
    example: "An isolated pawn may become a target after queens and minor pieces are exchanged.",
    related: ["POSITION-006", "THINK-012"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-017",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Plans",
    title: "How do I find a plan?",
    level: "Beginner",
    keywords: ["plan", "middlegame", "strategy"],
    questions: [
      "How do I find the right plan?",
      "What should I do when I have no obvious move?"
    ],
    short_answer: "Identify your strongest features, weaknesses and most active pieces, then choose a realistic improvement.",
    answer: "A good plan usually improves your position while restricting the opponent's counterplay.",
    example: "If the opponent has a weak pawn, improve your pieces and increase pressure against it.",
    related: ["MIDDLE-001", "THINK-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-018",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Plans",
    title: "Improve the worst piece",
    level: "Beginner",
    keywords: ["worst piece", "plan", "improvement"],
    questions: [
      "What is a good move when I have no plan?",
      "Why should I improve my worst piece?"
    ],
    short_answer: "Improving your least active piece is often a safe and useful plan.",
    answer: "A better piece gives you more options and can support future tactical or positional ideas.",
    example: "Move a passive knight toward a central outpost before starting a pawn attack.",
    related: ["THINK-017", "MIDDLE-020"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-019",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Plans",
    title: "Prophylactic thinking",
    level: "Intermediate",
    keywords: ["prophylaxis", "opponent plan", "strategy"],
    questions: [
      "What is prophylactic thinking?",
      "How do I stop my opponent's plan?"
    ],
    short_answer: "Prophylactic thinking means identifying and preventing the opponent's important idea before pursuing your own.",
    answer: "It is especially useful when the opponent has a clear strategic threat rather than an immediate tactic.",
    example: "Prevent an enemy pawn break before launching your own attack.",
    related: ["MIDDLE-025", "THINK-002"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-020",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Plans",
    title: "Attack the weakness or create one",
    level: "Intermediate",
    keywords: ["weakness", "target", "planning"],
    questions: [
      "What should I attack in a quiet position?",
      "How do I create a target?"
    ],
    short_answer: "Attack an existing weakness or create a new one through pressure and pawn breaks.",
    answer: "A clear target gives your pieces a purpose and can force the opponent into passive defense.",
    example: "Fix an isolated pawn and increase pressure until the defender must react.",
    related: ["POSITION-006", "MIDDLE-030"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-021",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Move Selection",
    title: "Good move versus best move",
    level: "Beginner",
    keywords: ["best move", "good move", "decision"],
    questions: [
      "Does every move need to be the engine's best move?",
      "What is a good practical move?"
    ],
    short_answer: "No. A practical move can be excellent if it is sound, understandable and creates useful problems.",
    answer: "Human chess involves time limits, uncertainty and practical decision-making.",
    example: "A simple move that keeps a clear advantage may be better practically than a risky computer line.",
    related: ["THINK-022", "PSYCH-020"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "THINK-022",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Practical Decisions",
    title: "What is a practical move?",
    level: "Intermediate",
    keywords: ["practical move", "decision making", "human chess"],
    questions: [
      "What makes a move practical?",
      "Should I choose a complicated move over a simple one?"
    ],
    short_answer: "A practical move is sound and creates problems that are difficult for the opponent to solve.",
    answer: "In tournament chess, clarity, time and opponent difficulty can matter alongside objective evaluation.",
    example: "Choose a forcing line that is easy for you to calculate and difficult for the opponent to meet.",
    related: ["THINK-021", "TOURNAMENT-041"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-023",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Risk",
    title: "When should I take risks?",
    level: "Intermediate",
    keywords: ["risk", "decision", "position"],
    questions: [
      "When should I play a risky move?",
      "Should I avoid risk when I am winning?"
    ],
    short_answer: "Take calculated risks when they are necessary or when the position justifies them.",
    answer: "If you are already clearly better, unnecessary risk may only give the opponent counterplay.",
    example: "Choose a safe simplification when it preserves a winning advantage instead of sacrificing material for extra attack.",
    related: ["THINK-024", "THINK-051"],
    source: "Practical chess principle",
    verified: true
  },

  {
    id: "THINK-024",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Risk",
    title: "When should I simplify?",
    level: "Beginner",
    keywords: ["simplification", "exchange", "decision"],
    questions: [
      "When is simplification a good idea?",
      "Should I exchange pieces when ahead?"
    ],
    short_answer: "Simplify when the resulting position keeps or increases your advantage and reduces counterplay.",
    answer: "Always calculate the resulting position before exchanging.",
    example: "Trade queens when the resulting endgame is clearly favorable and safe.",
    related: ["END-023", "THINK-025"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-025",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Risk",
    title: "Do not simplify automatically",
    level: "Intermediate",
    keywords: ["simplification", "exchange", "decision"],
    questions: [
      "Can simplifying lose my advantage?",
      "Why should I calculate before exchanging?"
    ],
    short_answer: "Yes. The resulting position may be drawn or less favorable than the current one.",
    answer: "An exchange can remove your most active piece or eliminate the weakness you were attacking.",
    example: "Trading an active bishop for a passive knight may reduce your pressure.",
    related: ["THINK-024", "THINK-026"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-026",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Exchanges",
    title: "Which piece should I exchange?",
    level: "Intermediate",
    keywords: ["piece exchange", "good piece", "bad piece"],
    questions: [
      "How do I decide which piece to exchange?",
      "Should I exchange my opponent's best piece?"
    ],
    short_answer: "Usually consider exchanging your opponent's strongest or most important piece while preserving your own useful pieces.",
    answer: "The correct exchange depends on the position and resulting activity.",
    example: "Exchange an active enemy knight if it controls your key squares.",
    related: ["THINK-025", "MIDDLE-035"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-027",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Move Quality",
    title: "Improve the position without forcing",
    level: "Beginner",
    keywords: ["quiet move", "improvement", "positional move"],
    questions: [
      "What should I do when there is no tactic?",
      "Can a quiet move be the best move?"
    ],
    short_answer: "Yes. Quiet improvements often create the conditions for future tactics.",
    answer: "Improve king safety, piece activity, pawn structure or control of important squares.",
    example: "Move a rook to an open file before starting a pawn break.",
    related: ["THINK-018", "MIDDLE-020"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-028",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Tempo",
    title: "What is a useful tempo?",
    level: "Beginner",
    keywords: ["tempo", "move", "initiative"],
    questions: [
      "What makes a tempo useful?",
      "Why do tempos matter?"
    ],
    short_answer: "A useful tempo improves your position while forcing or preventing something from the opponent.",
    answer: "A move that develops a piece while attacking another piece is often a useful tempo.",
    example: "Develop a knight with tempo by attacking the enemy queen.",
    related: ["OPENING-013", "THINK-029"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-029",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Tempo",
    title: "Do not chase tempi blindly",
    level: "Intermediate",
    keywords: ["tempo", "piece activity", "decision"],
    questions: [
      "Is gaining a tempo always good?",
      "Can a tempo move be a bad move?"
    ],
    short_answer: "Yes. A move that gains tempo but damages your position may not be useful.",
    answer: "Evaluate the whole position instead of counting tempi mechanically.",
    example: "Repeatedly attacking the queen may waste development moves and weaken your king.",
    related: ["THINK-028", "OPENING-013"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-030",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Time Management",
    title: "When should I spend more time?",
    level: "Beginner",
    keywords: ["time management", "critical position", "clock"],
    questions: [
      "When should I think longer?",
      "Which chess positions deserve more time?"
    ],
    short_answer: "Spend more time on critical positions, irreversible decisions and tactical opportunities.",
    answer: "Do not spend equal time on every move.",
    example: "Think longer before sacrificing material or entering a pawn ending.",
    related: ["TOURNAMENT-041", "THINK-031"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-031",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Time Management",
    title: "When should I move quickly?",
    level: "Beginner",
    keywords: ["move quickly", "time management", "clock"],
    questions: [
      "When is it okay to move quickly?",
      "Should I use less time in familiar positions?"
    ],
    short_answer: "Move quickly when the move is obvious, forced or already well understood.",
    answer: "Saving time in simple positions gives you more time for difficult decisions later.",
    example: "Do not spend several minutes on a forced recapture that has no tactical complication.",
    related: ["THINK-030", "TOURNAMENT-041"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-032",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Time Management",
    title: "Avoid time panic",
    level: "Intermediate",
    keywords: ["time pressure", "panic", "clock"],
    questions: [
      "How do I think when I have little time?",
      "How can I avoid panic in time trouble?"
    ],
    short_answer: "Stay focused on immediate threats, forcing moves and simple safe decisions.",
    answer: "Do not try to calculate every possible variation when the clock is low.",
    example: "Check checks, captures and threats, then choose a sound move rather than searching endlessly.",
    related: ["THINK-007", "THINK-033"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-033",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Time Management",
    title: "Use increment wisely",
    level: "Intermediate",
    keywords: ["increment", "time management", "clock"],
    questions: [
      "How should I use increment time?",
      "Does increment change my thinking process?"
    ],
    short_answer: "Use the increment to stay accurate without spending excessive time on routine moves.",
    answer: "Even with increment, critical decisions deserve more thought.",
    example: "Use a few seconds to perform a final blunder check after every move.",
    related: ["THINK-010", "TOURNAMENT-041"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-034",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Calculation",
    title: "How deep should I calculate?",
    level: "Intermediate",
    keywords: ["calculation depth", "variations", "calculation"],
    questions: [
      "How many moves should I calculate?",
      "Is deeper calculation always better?"
    ],
    short_answer: "Calculate until the position becomes clear enough to evaluate, not to reach an arbitrary number of moves.",
    answer: "The required depth depends on how forcing the position is.",
    example: "A forcing tactical sequence may require deep calculation, while a simple development move may need very little.",
    related: ["CALC-012", "THINK-035"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-035",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Calculation",
    title: "When should I stop calculating?",
    level: "Intermediate",
    keywords: ["calculation", "stop calculating", "evaluation"],
    questions: [
      "When is a variation finished?",
      "How do I know when to stop calculating?"
    ],
    short_answer: "Stop when the position reaches a stable point that you can evaluate reliably.",
    answer: "A stable point may be a clear material result, repeated position, forced endgame or position without immediate tactics.",
    example: "If a forced exchange leads to a clearly favorable endgame, you may stop calculating the branch.",
    related: ["CALC-020", "THINK-034"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-036",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Calculation",
    title: "Evaluate the final position",
    level: "Beginner",
    keywords: ["evaluation", "calculation", "variation"],
    questions: [
      "Why must I evaluate the position at the end of a variation?",
      "Is calculating moves enough?"
    ],
    short_answer: "No. You must understand whether the final position is better, equal or worse.",
    answer: "A long variation is useless if you do not know what the resulting position means.",
    example: "After calculating a queen trade, evaluate the resulting endgame rather than stopping at the exchange.",
    related: ["THINK-012", "CALC-020"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-037",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Visualization",
    title: "How can I improve visualization?",
    level: "Beginner",
    keywords: ["visualization", "board vision", "calculation"],
    questions: [
      "How can I visualize variations better?",
      "Why do I lose track of the board while calculating?"
    ],
    short_answer: "Practice calculating short variations without moving the pieces and keep track of every changed square.",
    answer: "Start with short sequences and gradually increase the difficulty.",
    example: "Calculate three moves ahead and mentally name the changed squares.",
    related: ["CALC-030", "THINK-038"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "THINK-038",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Visualization",
    title: "Do not visualize imaginary pieces",
    level: "Beginner",
    keywords: ["visualization", "calculation", "board"],
    questions: [
      "Why do I forget where pieces are during calculation?",
      "How can I avoid hallucinating a piece?"
    ],
    short_answer: "Track captures and piece movements carefully after every calculated move.",
    answer: "Many visualization errors happen because the player mentally moves a piece but forgets another piece has changed position.",
    example: "After calculating a capture, mentally remove the captured piece before continuing.",
    related: ["THINK-037", "CALC-033"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "THINK-039",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Board Awareness",
    title: "Scan the whole board",
    level: "Beginner",
    keywords: ["board awareness", "scan", "blunder prevention"],
    questions: [
      "Why should I scan the whole board?",
      "How can I stop missing moves on the other side?"
    ],
    short_answer: "Chess threats can appear anywhere, so do not focus only on the area where you are attacking.",
    answer: "Before moving, briefly check both kings, loose pieces, passed pawns and tactical lines across the board.",
    example: "While attacking the kingside, notice that an enemy passed pawn is advancing on the queenside.",
    related: ["THINK-002", "THINK-040"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-040",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Board Awareness",
    title: "Watch loose pieces",
    level: "Beginner",
    keywords: ["loose pieces", "tactics", "blunder"],
    questions: [
      "Why should I check loose pieces?",
      "What is a loose piece?"
    ],
    short_answer: "A loose piece is insufficiently defended and may become a tactical target.",
    answer: "Loose pieces are common targets for forks, pins, discovered attacks and simple captures.",
    example: "Before attacking, notice whether your queen or bishop is defended by enough pieces.",
    related: ["TACTIC-015", "THINK-010"],
    source: "Chess tactical principle",
    verified: true
  },

  {
    id: "THINK-041",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "King Safety",
    title: "Check king safety before attacking",
    level: "Intermediate",
    keywords: ["king safety", "attack", "decision"],
    questions: [
      "Why should I check my king before attacking?",
      "Can my attack fail because my king is unsafe?"
    ],
    short_answer: "Yes. An attack is dangerous if the opponent can create stronger threats against your king.",
    answer: "Compare both kings before committing attacking pieces forward.",
    example: "Do not sacrifice material on the kingside if your own king is exposed to a central counterattack.",
    related: ["ATTACK-001", "THINK-014"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-042",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Pawn Breaks",
    title: "Calculate pawn breaks",
    level: "Intermediate",
    keywords: ["pawn break", "calculation", "strategy"],
    questions: [
      "Why should pawn breaks be calculated carefully?",
      "When should I play a pawn break?"
    ],
    short_answer: "Because pawn breaks permanently change the structure and can open or close important lines.",
    answer: "Calculate the resulting exchanges, passed pawns, weaknesses and piece activity.",
    example: "Before pushing a central pawn, calculate which files and diagonals will open.",
    related: ["MIDDLE-030", "POSITION-018"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-043",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Irreversible Moves",
    title: "Think longer before irreversible moves",
    level: "Intermediate",
    keywords: ["irreversible move", "pawn move", "decision"],
    questions: [
      "Which moves deserve extra calculation?",
      "Why are pawn moves critical decisions?"
    ],
    short_answer: "Pawn moves, captures and major exchanges can permanently change the position.",
    answer: "Because they cannot easily be undone, compare the resulting position before committing.",
    example: "Think longer before exchanging the last pair of pawns.",
    related: ["THINK-044", "TOURNAMENT-041"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-044",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Irreversible Moves",
    title: "Why pawn moves need care",
    level: "Beginner",
    keywords: ["pawn moves", "weakness", "decision"],
    questions: [
      "Why are pawn moves difficult to undo?",
      "What should I consider before moving a pawn?"
    ],
    short_answer: "Pawn moves can create weaknesses, remove squares and change the structure permanently.",
    answer: "Check whether the move creates holes, weakens the king or changes your future pawn breaks.",
    example: "A pawn move that protects one piece may permanently weaken a dark square near your king.",
    related: ["THINK-043", "POSITION-018"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-045",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Move Order",
    title: "Why does move order matter?",
    level: "Intermediate",
    keywords: ["move order", "calculation", "strategy"],
    questions: [
      "Why can move order change the result?",
      "Should I play forcing moves first?"
    ],
    short_answer: "The order of moves can change the opponent's options and the resulting position.",
    answer: "A useful move may become stronger or weaker depending on what happens first.",
    example: "A pawn break may work before an exchange but fail after the opponent activates a piece.",
    related: ["THINK-046", "CALC-015"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-046",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Move Order",
    title: "Checks can change move order",
    level: "Intermediate",
    keywords: ["checks", "move order", "forcing moves"],
    questions: [
      "Why can a check be important before a normal move?",
      "How does a forcing move affect move order?"
    ],
    short_answer: "A check forces the opponent to respond and may prevent them from playing their planned move.",
    answer: "This can give you an important tempo or change the tactical sequence.",
    example: "Give a check before capturing a pawn if the check forces the king onto a worse square.",
    related: ["THINK-006", "THINK-045"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-047",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Defensive Thinking",
    title: "Think like the defender",
    level: "Intermediate",
    keywords: ["defense", "opponent", "calculation"],
    questions: [
      "How can I find the opponent's best defense?",
      "Why should I think like my opponent?"
    ],
    short_answer: "Ask which move would make your own plan most difficult if you were defending.",
    answer: "This perspective helps identify defensive resources you might otherwise overlook.",
    example: "Before sacrificing, ask what defensive move you would choose against the sacrifice.",
    related: ["THINK-008", "THINK-048"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-048",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Defensive Thinking",
    title: "Find the opponent's best defense",
    level: "Intermediate",
    keywords: ["best defense", "calculation", "tactics"],
    questions: [
      "What is the best way to test my move?",
      "How do I know if my attack really works?"
    ],
    short_answer: "Find the strongest defensive resource, not the most natural-looking reply.",
    answer: "If your idea survives the best defense, your calculation becomes much more reliable.",
    example: "When attacking a king, search for queen exchanges, counterchecks and escape squares.",
    related: ["THINK-047", "CALC-018"],
    source: "Chess calculation principle",
    verified: true
  },

  {
    id: "THINK-049",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Defensive Thinking",
    title: "Look for counterplay",
    level: "Intermediate",
    keywords: ["counterplay", "defense", "threat"],
    questions: [
      "What is counterplay?",
      "Why must I consider counterplay?"
    ],
    short_answer: "Counterplay is an active threat created by the opponent instead of simply defending.",
    answer: "Ignoring counterplay can turn a winning position into a difficult one.",
    example: "While you attack on the kingside, the opponent creates a passed pawn on the queenside.",
    related: ["THINK-002", "ATTACK-025"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-050",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Making",
    title: "Compare before choosing",
    level: "Beginner",
    keywords: ["compare moves", "candidate moves", "decision"],
    questions: [
      "Why should I compare candidate moves?",
      "How do I choose between two good moves?"
    ],
    short_answer: "Compare their tactical safety, strategic purpose, opponent's response and resulting position.",
    answer: "The best move is often the one that solves the most important problem while improving your position.",
    example: "Compare a direct attack with a quiet developing move and see which survives the opponent's best response.",
    related: ["THINK-004", "THINK-012"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-051",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Making",
    title: "Choose the move with the clearest purpose",
    level: "Beginner",
    keywords: ["purpose", "move selection", "planning"],
    questions: [
      "How do I know why I am making a move?",
      "Should every move have a purpose?"
    ],
    short_answer: "Yes. A move should ideally solve a problem, create a threat or improve your position.",
    answer: "Moves without a clear purpose can waste tempi and allow the opponent to take the initiative.",
    example: "Develop a piece because it controls key squares and prepares castling rather than moving it repeatedly.",
    related: ["THINK-017", "THINK-052"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-052",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Making",
    title: "Avoid aimless moves",
    level: "Beginner",
    keywords: ["aimless move", "tempo", "planning"],
    questions: [
      "What is an aimless move?",
      "Why are repeated moves dangerous?"
    ],
    short_answer: "An aimless move does not solve a problem, create a threat or improve your position.",
    answer: "Repeatedly moving the same piece without purpose can lose time and give the opponent freedom.",
    example: "Do not move a developed knight back and forth just because you have no immediate tactic.",
    related: ["THINK-051", "OPENING-013"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-053",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Practical Evaluation",
    title: "Identify the critical feature",
    level: "Intermediate",
    keywords: ["critical feature", "evaluation", "position"],
    questions: [
      "How do I simplify a complicated position mentally?",
      "What should I focus on first?"
    ],
    short_answer: "Find the most important feature: king safety, tactical threat, passed pawn, weak piece or critical square.",
    answer: "Once the critical feature is identified, many candidate moves become easier to compare.",
    example: "If an enemy passed pawn is about to promote, stopping it becomes more important than improving a piece.",
    related: ["THINK-012", "THINK-054"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-054",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Priorities",
    title: "Set priorities",
    level: "Beginner",
    keywords: ["priorities", "chess thinking", "decision"],
    questions: [
      "How do I decide what matters most?",
      "What should I solve first in a position?"
    ],
    short_answer: "Solve immediate tactical problems first, then king safety, then strategic improvements.",
    answer: "Urgent threats should not be ignored while you pursue a long-term plan.",
    example: "Defend a hanging queen before improving your worst-placed rook.",
    related: ["THINK-002", "THINK-053"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-055",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Move Discipline",
    title: "Do not move because you are bored",
    level: "Beginner",
    keywords: ["discipline", "waiting move", "chess thinking"],
    questions: [
      "What should I do when I cannot find a move?",
      "Is it okay to wait in chess?"
    ],
    short_answer: "Yes. Improve a piece, create a useful waiting move or maintain the position rather than forcing something.",
    answer: "Not every position requires immediate action.",
    example: "Improve your king or rook while keeping the opponent's weaknesses under pressure.",
    related: ["THINK-018", "THINK-056"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-056",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Waiting Moves",
    title: "What is a waiting move?",
    level: "Intermediate",
    keywords: ["waiting move", "zugzwang", "strategy"],
    questions: [
      "What is a waiting move?",
      "Why would I intentionally avoid changing the position?"
    ],
    short_answer: "A waiting move preserves your position while forcing the opponent to reveal or change their plan.",
    answer: "Waiting moves are especially powerful when the opponent has fewer useful options.",
    example: "A king move can maintain pressure while forcing the opponent to weaken a pawn.",
    related: ["END-012", "THINK-055"],
    source: "Chess strategy principle",
    verified: true
  },

  {
    id: "THINK-057",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Pattern Recognition",
    title: "How important is pattern recognition?",
    level: "Beginner",
    keywords: ["pattern recognition", "tactics", "experience"],
    questions: [
      "Why do strong players find moves quickly?",
      "Does pattern recognition help calculation?"
    ],
    short_answer: "Yes. Recognizing familiar tactical and strategic patterns reduces the amount of calculation needed.",
    answer: "Patterns do not replace calculation, but they help you identify promising moves quickly.",
    example: "Recognizing a back-rank weakness can immediately suggest a tactical idea.",
    related: ["TACTIC-001", "TRAIN-020"],
    source: "Chess training principle",
    verified: true
  },

  {
    id: "THINK-058",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Intuition",
    title: "Can chess intuition be trusted?",
    level: "Intermediate",
    keywords: ["intuition", "calculation", "decision"],
    questions: [
      "Should I trust my chess intuition?",
      "Is intuition enough to choose a move?"
    ],
    short_answer: "Use intuition to generate candidate moves, then verify important decisions with calculation.",
    answer: "Strong intuition comes from experience, but tactical positions still require concrete checking.",
    example: "You may feel that a sacrifice works, but calculate the opponent's best defense before playing it.",
    related: ["THINK-004", "THINK-059"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-059",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Intuition",
    title: "Intuition versus calculation",
    level: "Intermediate",
    keywords: ["intuition", "calculation", "chess thinking"],
    questions: [
      "Which is more important, intuition or calculation?",
      "When should I calculate instead of trusting intuition?"
    ],
    short_answer: "Use intuition to find ideas and calculation to verify critical moves.",
    answer: "The more tactical and forcing the position, the more important concrete calculation becomes.",
    example: "Use intuition to spot a sacrifice, then calculate checks, captures and defenses.",
    related: ["THINK-058", "CALC-001"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-060",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Emotional Decisions",
    title: "Do not play for revenge",
    level: "Beginner",
    keywords: ["emotion", "revenge", "decision making"],
    questions: [
      "Why is playing for revenge dangerous?",
      "Should I respond emotionally after losing material?"
    ],
    short_answer: "Chess decisions should be based on the position, not anger or frustration.",
    answer: "Trying to immediately win back material can lead to unnecessary sacrifices and blunders.",
    example: "If you lose a pawn, improve your position instead of making a desperate attack to recover it.",
    related: ["PSYCH-010", "THINK-061"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-061",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Emotional Decisions",
    title: "Do not force a win",
    level: "Beginner",
    keywords: ["forcing win", "patience", "decision"],
    questions: [
      "Why do players throw away winning positions?",
      "Should I force an attack when I am already winning?"
    ],
    short_answer: "Because impatience can turn a safe advantage into unnecessary complications.",
    answer: "When winning, improve your position and reduce counterplay rather than searching for spectacular moves.",
    example: "Choose a safe queen exchange instead of sacrificing material for a flashy attack.",
    related: ["THINK-023", "END-051"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-062",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Objectivity",
    title: "Be objective after a mistake",
    level: "Intermediate",
    keywords: ["mistake", "objectivity", "recovery"],
    questions: [
      "What should I do after making a mistake?",
      "How can I continue playing objectively?"
    ],
    short_answer: "Accept the mistake and evaluate the new position without trying to undo it immediately.",
    answer: "The position after the mistake is the position you must play.",
    example: "If you lose a pawn, look for activity and counterplay instead of making a desperate sacrifice.",
    related: ["MISTAKE-010", "PSYCH-015"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-063",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Practical Play",
    title: "Play the position, not the result",
    level: "Beginner",
    keywords: ["result", "objectivity", "decision"],
    questions: [
      "Should I think about winning or drawing during the game?",
      "Why should I focus on the position?"
    ],
    short_answer: "Focus on finding the best practical move in the current position.",
    answer: "Thinking about the result can create fear, impatience or unnecessary risk.",
    example: "Instead of thinking 'I must win,' ask 'What is the strongest move here?'",
    related: ["THINK-062", "PSYCH-020"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-064",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Opponent Perspective",
    title: "What would I play for the opponent?",
    level: "Intermediate",
    keywords: ["opponent perspective", "calculation", "defense"],
    questions: [
      "How can I understand my opponent's plan?",
      "What question should I ask from the opponent's side?"
    ],
    short_answer: "Ask yourself what move you would play if you were sitting on the other side.",
    answer: "This helps identify hidden threats, defensive resources and strong counterplay.",
    example: "If you are attacking a weak pawn, ask how you would defend it with the opponent's pieces.",
    related: ["THINK-047", "THINK-048"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "THINK-065",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Critical Positions",
    title: "Recognize a critical position",
    level: "Intermediate",
    keywords: ["critical position", "decision", "calculation"],
    questions: [
      "What is a critical position?",
      "How do I know when a position requires deep thought?"
    ],
    short_answer: "A critical position is one where the next decision can significantly change the evaluation.",
    answer: "Tactical opportunities, major exchanges, pawn breaks and king attacks often create critical positions.",
    example: "Before opening the center with a pawn break, stop and calculate carefully.",
    related: ["THINK-030", "THINK-043"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-066",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Framework",
    title: "The three-question method",
    level: "Beginner",
    keywords: ["three questions", "thinking process", "chess"],
    questions: [
      "What three questions should I ask before moving?",
      "Is there a simple chess thinking method?"
    ],
    short_answer: "Ask: What changed? What is threatened? What are my best forcing and improving moves?",
    answer: "These questions create a simple process that works in many positions.",
    example: "After the opponent moves, identify the change, check the threat, then search for checks, captures and improvements.",
    related: ["THINK-001", "THINK-002", "THINK-006"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-067",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Framework",
    title: "The final blunder test",
    level: "Beginner",
    keywords: ["blunder test", "move safety", "thinking"],
    questions: [
      "What should I do immediately before playing my move?",
      "What is the final blunder test?"
    ],
    short_answer: "Imagine your move has been played and find the opponent's strongest check, capture or threat.",
    answer: "This final test is quick and can prevent many one-move blunders.",
    example: "Before releasing the piece, ask: Can my opponent check me, capture something important or create a stronger threat?",
    related: ["THINK-010", "THINK-011", "THINK-007"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-068",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Framework",
    title: "Simple thinking algorithm",
    level: "Intermediate",
    keywords: ["thinking algorithm", "candidate moves", "calculation"],
    questions: [
      "What is a simple chess thinking algorithm?",
      "How can I make my thinking consistent?"
    ],
    short_answer: "Observe, assess, generate candidates, calculate, compare, blunder-check and play.",
    answer: "A consistent process is more reliable than depending on inspiration.",
    example: "Observe the last move, assess threats, calculate two candidates, compare the results and perform a final safety check.",
    related: ["THINK-001", "THINK-066"],
    source: "Chess coaching framework",
    verified: true
  },

  {
    id: "THINK-069",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Decision Quality",
    title: "Accuracy versus speed",
    level: "Intermediate",
    keywords: ["accuracy", "speed", "thinking"],
    questions: [
      "Should I think fast or accurately?",
      "What is more important, speed or accuracy?"
    ],
    short_answer: "Accuracy matters most in critical positions, while speed matters for simple moves and time management.",
    answer: "Strong players adjust their thinking time according to the importance of the decision.",
    example: "Spend seconds on a forced recapture but several minutes before a tactical sacrifice.",
    related: ["THINK-030", "THINK-031"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "THINK-070",
    type: "THINKING",
    category: "Chess Thinking",
    topic: "Chess Thinking & Decision Making",
    subtopic: "Master Checklist",
    title: "Complete chess thinking checklist",
    level: "Beginner",
    keywords: ["thinking checklist", "decision making", "chess"],
    questions: [
      "What is the complete chess thinking process?",
      "What should I remember before every move?"
    ],
    short_answer: "Observe, identify threats, find candidates, calculate the opponent's best response, evaluate and blunder-check.",
    answer: "A strong thinking process combines tactical awareness, positional evaluation, calculation and practical time management.",
    example: "What changed? What is threatened? What are my checks, captures and threats? What is the opponent's best reply? What is the final position? Is my move safe?",
    related: ["THINK-001", "THINK-007", "THINK-068"],
    source: "Chess coaching framework",
    verified: true
  }

];

export default chessThinkingDecisionMaking;