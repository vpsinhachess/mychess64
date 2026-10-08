const positionalChessPawnStructures = [
  {
    id: "POSITION-001",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Definition",
    title: "What is positional chess?",
    level: "Beginner",
    keywords: ["positional chess", "strategy", "position"],
    questions: [
      "What is positional chess?",
      "What does positional play mean?"
    ],
    short_answer: "Positional chess focuses on improving the long-term features of a position.",
    answer: "It involves piece activity, pawn structure, weak squares, space, king safety, and long-term plans.",
    example: "Improving your worst piece instead of making an immediate tactical move is positional play.",
    related: ["POSITION-002", "MIDDLE-003", "MIDDLE-078"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "POSITION-002",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Evaluation",
    title: "What is positional advantage?",
    level: "Beginner",
    keywords: ["positional advantage", "strategy", "evaluation"],
    questions: [
      "What is a positional advantage?",
      "How can I have an advantage without winning material?"
    ],
    short_answer: "A positional advantage is a favorable long-term feature of your position.",
    answer: "It can come from better piece activity, pawn structure, space, king safety, or control of important squares.",
    example: "Better-developed pieces and a strong outpost can give a positional advantage even with equal material.",
    related: ["POSITION-003", "POSITION-004", "MIDDLE-007"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-003",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Weaknesses",
    title: "What is a positional weakness?",
    level: "Beginner",
    keywords: ["weakness", "pawn", "square", "position"],
    questions: [
      "What is a positional weakness?",
      "What can be considered a weakness in chess?"
    ],
    short_answer: "A positional weakness is a feature that can be targeted or exploited.",
    answer: "Weak pawns, weak squares, poor piece placement, exposed kings, and restricted pieces can all become weaknesses.",
    example: "An isolated pawn that cannot advance may become a long-term target.",
    related: ["POSITION-004", "POSITION-005", "MIDDLE-039"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-004",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Weaknesses",
    title: "How do I identify weaknesses?",
    level: "Beginner",
    keywords: ["weakness", "position", "evaluation"],
    questions: [
      "How can I find weaknesses in a position?",
      "What should I look for when evaluating weaknesses?"
    ],
    short_answer: "Look for poorly defended pawns, weak squares, passive pieces, exposed kings, and difficult-to-correct structural problems.",
    answer: "A weakness matters most when the opponent can actually attack or exploit it.",
    example: "A backward pawn becomes more important if enemy rooks can pressure it.",
    related: ["POSITION-003", "POSITION-006", "POSITION-010"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "POSITION-005",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Strengths",
    title: "What is a positional strength?",
    level: "Beginner",
    keywords: ["strength", "position", "advantage"],
    questions: [
      "What is a positional strength?",
      "What features can make my position strong?"
    ],
    short_answer: "A positional strength is a useful feature that improves your long-term prospects.",
    answer: "Examples include a strong outpost, better pawn structure, space advantage, active pieces, or a safer king.",
    example: "A protected passed pawn can be a major positional strength.",
    related: ["POSITION-002", "POSITION-006", "POSITION-019"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-006",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Weak Squares",
    title: "What is a weak square?",
    level: "Beginner",
    keywords: ["weak square", "outpost", "pawn structure"],
    questions: [
      "What is a weak square?",
      "How does a square become weak?"
    ],
    short_answer: "A weak square is a square that is difficult to control or challenge with pawns.",
    answer: "Weak squares can become valuable entry points for enemy pieces, especially knights.",
    example: "A central square that cannot be attacked by an enemy pawn may become a strong outpost.",
    related: ["POSITION-007", "POSITION-008", "MIDDLE-023"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-007",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Outposts",
    title: "What is an outpost?",
    level: "Beginner",
    keywords: ["outpost", "knight", "weak square"],
    questions: [
      "What is a chess outpost?",
      "Why is an outpost important?"
    ],
    short_answer: "An outpost is a strong square, usually protected by a pawn, that cannot easily be challenged by enemy pawns.",
    answer: "An outpost is especially valuable when it provides a stable and active home for a piece.",
    example: "A knight on a protected central outpost can attack several important squares.",
    related: ["POSITION-006", "POSITION-008", "MIDDLE-023"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-008",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Knight Outpost",
    title: "Why are knights good on outposts?",
    level: "Beginner",
    keywords: ["knight", "outpost", "strong square"],
    questions: [
      "Why are knight outposts powerful?",
      "Why can a knight dominate from an outpost?"
    ],
    short_answer: "A knight on an outpost can be difficult to remove and can control many important squares.",
    answer: "The knight's value increases when the opponent cannot chase it away with a pawn.",
    example: "A knight on an advanced protected square can attack pawns, forks, and key defensive squares.",
    related: ["POSITION-007", "POSITION-009", "MIDDLE-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-009",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Outposts",
    title: "How can I create an outpost?",
    level: "Intermediate",
    keywords: ["outpost", "pawn break", "weak square"],
    questions: [
      "How do I create an outpost?",
      "How can I make a square permanent for my knight?"
    ],
    short_answer: "Create a square that enemy pawns cannot effectively attack and support it with your pieces or pawns.",
    answer: "Exchanging or advancing enemy pawns can sometimes create a permanent weak square.",
    example: "After an enemy pawn moves away, a central square may become available for your knight.",
    related: ["POSITION-006", "POSITION-007", "POSITION-010"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-010",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Importance",
    title: "Why is pawn structure important?",
    level: "Beginner",
    keywords: ["pawn structure", "strategy", "weakness"],
    questions: [
      "Why is pawn structure important in chess?",
      "How does pawn structure affect the position?"
    ],
    short_answer: "Pawn structure determines weaknesses, strong squares, open lines, and possible pawn breaks.",
    answer: "Because pawns cannot move backward, their structure often creates long-term features that influence the whole game.",
    example: "An isolated pawn may become a permanent target.",
    related: ["POSITION-011", "POSITION-012", "MIDDLE-035"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-011",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Connected Pawns",
    title: "What are connected pawns?",
    level: "Beginner",
    keywords: ["connected pawns", "pawn structure", "pawns"],
    questions: [
      "What are connected pawns?",
      "Why are connected pawns useful?"
    ],
    short_answer: "Connected pawns are pawns on adjacent files that can support each other.",
    answer: "They can provide mutual protection and advance together, although their value depends on the position.",
    example: "Two connected passed pawns can become a serious endgame threat.",
    related: ["POSITION-012", "POSITION-019", "END-021"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "POSITION-012",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Chains",
    title: "What is a pawn chain?",
    level: "Beginner",
    keywords: ["pawn chain", "pawn structure", "strategy"],
    questions: [
      "What is a pawn chain?",
      "How does a pawn chain work?"
    ],
    short_answer: "A pawn chain is a connected sequence of pawns where one pawn supports another.",
    answer: "The direction and base of the chain can influence where each side should attack.",
    example: "A pawn chain may point toward the kingside, suggesting play on that side of the board.",
    related: ["POSITION-013", "POSITION-014", "MIDDLE-035"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-013",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Chains",
    title: "What is the base of a pawn chain?",
    level: "Intermediate",
    keywords: ["pawn chain", "base", "pawn structure"],
    questions: [
      "What is the base of a pawn chain?",
      "Why is the base of a pawn chain important?"
    ],
    short_answer: "The base is the rear pawn supporting the other pawns in the chain.",
    answer: "The base can sometimes become a target because attacking it may weaken or disrupt the rest of the chain.",
    example: "If several pawns depend on one rear pawn, pressure against that pawn may be effective.",
    related: ["POSITION-012", "POSITION-014", "POSITION-036"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-014",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Chains",
    title: "Where should I attack a pawn chain?",
    level: "Intermediate",
    keywords: ["pawn chain", "attack", "pawn structure"],
    questions: [
      "How do I attack a pawn chain?",
      "Should I attack the front or base of a pawn chain?"
    ],
    short_answer: "The base is often a useful target, but the correct point depends on the specific position.",
    answer: "Sometimes the head of the chain can be challenged directly, especially when tactical opportunities exist.",
    example: "Pressure against the base may force the opponent to defend several connected pawns.",
    related: ["POSITION-013", "POSITION-015", "MIDDLE-038"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-015",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Doubled Pawns",
    title: "What are doubled pawns?",
    level: "Beginner",
    keywords: ["doubled pawns", "pawn structure", "weakness"],
    questions: [
      "What are doubled pawns?",
      "Why are doubled pawns sometimes considered weak?"
    ],
    short_answer: "Doubled pawns are two pawns of the same color on the same file.",
    answer: "They may be weak because they cannot protect each other in the same way as connected pawns, but they can also provide useful files or control.",
    example: "Doubled pawns on an open file may give rooks useful activity.",
    related: ["POSITION-016", "POSITION-017", "MIDDLE-035"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-016",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Doubled Pawns",
    title: "Are doubled pawns always bad?",
    level: "Beginner",
    keywords: ["doubled pawns", "pawn weakness", "strategy"],
    questions: [
      "Are doubled pawns always weak?",
      "Can doubled pawns be useful?"
    ],
    short_answer: "No. Their value depends on activity, open files, mobility, and the resulting position.",
    answer: "Doubled pawns can control important squares, open files, or support a strong center.",
    example: "Doubled pawns may be acceptable if they give a rook an open or semi-open file.",
    related: ["POSITION-015", "POSITION-017", "POSITION-018"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-017",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Doubled Pawns",
    title: "When can doubled pawns be a strength?",
    level: "Intermediate",
    keywords: ["doubled pawns", "activity", "open file"],
    questions: [
      "When are doubled pawns useful?",
      "How can doubled pawns give compensation?"
    ],
    short_answer: "They can be useful when they provide space, control key squares, open lines, or create attacking chances.",
    answer: "Pawn structure should be evaluated together with piece activity and concrete opportunities.",
    example: "Doubled pawns may open a file for a rook and give strong control of central squares.",
    related: ["POSITION-016", "POSITION-018", "MIDDLE-021"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-018",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Isolated Pawns",
    title: "What is an isolated pawn?",
    level: "Beginner",
    keywords: ["isolated pawn", "isolani", "pawn structure"],
    questions: [
      "What is an isolated pawn?",
      "What does isolated pawn mean?"
    ],
    short_answer: "An isolated pawn has no friendly pawn on the adjacent files.",
    answer: "An isolated pawn may become a target because it cannot be supported by a neighboring pawn.",
    example: "An isolated d-pawn can become a long-term target if it cannot advance or gain activity.",
    related: ["POSITION-019", "POSITION-020", "MIDDLE-036"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "POSITION-019",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Isolated Pawns",
    title: "Is an isolated pawn always bad?",
    level: "Intermediate",
    keywords: ["isolated pawn", "activity", "compensation"],
    questions: [
      "Is an isolated pawn always a weakness?",
      "Can an isolated pawn be strong?"
    ],
    short_answer: "No. An isolated pawn can provide space, open lines, and active piece play.",
    answer: "The pawn is a weakness only if the opponent can effectively attack or blockade it.",
    example: "An isolated central pawn may support active pieces and control important squares.",
    related: ["POSITION-018", "POSITION-020", "MIDDLE-016"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-020",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Isolated Pawns",
    title: "How should I play against an isolated pawn?",
    level: "Intermediate",
    keywords: ["isolated pawn", "target", "blockade"],
    questions: [
      "How do I attack an isolated pawn?",
      "What is the best strategy against an isolated pawn?"
    ],
    short_answer: "Blockade it, pressure it, and reduce the opponent's active counterplay.",
    answer: "A piece placed in front of the pawn can restrict its advance while other pieces attack it.",
    example: "A knight on the square directly in front of an isolated pawn can act as a blockade.",
    related: ["POSITION-018", "POSITION-021", "MIDDLE-038"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-021",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Backward Pawns",
    title: "What is a backward pawn?",
    level: "Beginner",
    keywords: ["backward pawn", "pawn structure", "weakness"],
    questions: [
      "What is a backward pawn?",
      "Why can a backward pawn be weak?"
    ],
    short_answer: "A backward pawn is a pawn that lags behind neighboring pawns and may be difficult to defend or advance.",
    answer: "It becomes especially vulnerable when it stands on an open or semi-open file.",
    example: "A backward pawn on a semi-open file may become a target for enemy rooks.",
    related: ["POSITION-022", "POSITION-023", "MIDDLE-036"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "POSITION-022",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Backward Pawns",
    title: "How should I attack a backward pawn?",
    level: "Intermediate",
    keywords: ["backward pawn", "pressure", "rook"],
    questions: [
      "How do I attack a backward pawn?",
      "What pieces are useful against a backward pawn?"
    ],
    short_answer: "Place active pieces on files and squares that increase pressure against the pawn.",
    answer: "Rooks and queens are often useful when the pawn stands on a semi-open or open file.",
    example: "Double rooks on the file in front of a backward pawn.",
    related: ["POSITION-021", "POSITION-023", "MIDDLE-047"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-023",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "What is a passed pawn?",
    level: "Beginner",
    keywords: ["passed pawn", "pawn structure", "endgame"],
    questions: [
      "What is a passed pawn?",
      "How do I recognize a passed pawn?"
    ],
    short_answer: "A passed pawn has no opposing pawn on its file or adjacent files that can stop its advance.",
    answer: "Passed pawns can become powerful because they can advance toward promotion without being blocked by enemy pawns.",
    example: "A pawn advancing with no enemy pawns on neighboring files is a passed pawn.",
    related: ["POSITION-024", "POSITION-025", "END-021"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "POSITION-024",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "Why is a passed pawn dangerous?",
    level: "Beginner",
    keywords: ["passed pawn", "promotion", "threat"],
    questions: [
      "Why are passed pawns strong?",
      "Why must a passed pawn be stopped?"
    ],
    short_answer: "A passed pawn can advance toward promotion and force enemy pieces into passive defense.",
    answer: "Its value increases when it is protected, advanced, or supported by active pieces.",
    example: "A protected passed pawn on the sixth rank can tie down enemy pieces.",
    related: ["POSITION-023", "POSITION-025", "END-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-025",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "How should I create a passed pawn?",
    level: "Intermediate",
    keywords: ["passed pawn", "pawn majority", "pawn structure"],
    questions: [
      "How can I create a passed pawn?",
      "What is the easiest way to create a passed pawn?"
    ],
    short_answer: "Use pawn exchanges or a pawn majority to remove opposing pawns from the relevant files.",
    answer: "A pawn break can sometimes create a passed pawn by forcing exchanges.",
    example: "A queenside pawn majority can advance and exchange pawns until one becomes passed.",
    related: ["POSITION-023", "POSITION-026", "MIDDLE-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-026",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Majority",
    title: "What is a pawn majority?",
    level: "Beginner",
    keywords: ["pawn majority", "pawns", "passed pawn"],
    questions: [
      "What is a pawn majority?",
      "Why is a pawn majority useful?"
    ],
    short_answer: "A pawn majority means having more pawns than the opponent on one side of the board.",
    answer: "A majority can sometimes be used to create a passed pawn.",
    example: "Three pawns against two on the queenside may create a passed pawn after exchanges.",
    related: ["POSITION-025", "POSITION-027", "MIDDLE-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-027",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Majority",
    title: "How do I use a pawn majority?",
    level: "Intermediate",
    keywords: ["pawn majority", "passed pawn", "strategy"],
    questions: [
      "How should I use a pawn majority?",
      "Can a pawn majority create a passed pawn?"
    ],
    short_answer: "Advance carefully and use exchanges to create a passed pawn.",
    answer: "The majority is valuable when your pieces can support the advance and the opponent cannot create dangerous counterplay.",
    example: "Advance the majority to force an exchange that leaves one pawn passed.",
    related: ["POSITION-026", "POSITION-025", "MIDDLE-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-028",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Hanging Pawns",
    title: "What are hanging pawns?",
    level: "Intermediate",
    keywords: ["hanging pawns", "pawn structure", "center"],
    questions: [
      "What are hanging pawns?",
      "Why are hanging pawns important?"
    ],
    short_answer: "Hanging pawns are two adjacent pawns without friendly pawns on the neighboring files supporting them.",
    answer: "They can provide space and dynamic potential but may become targets if they are forced to advance or become isolated.",
    example: "Central hanging pawns can support active piece play but may later become weak.",
    related: ["POSITION-029", "POSITION-030", "MIDDLE-035"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-029",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Hanging Pawns",
    title: "Are hanging pawns weak?",
    level: "Intermediate",
    keywords: ["hanging pawns", "weakness", "activity"],
    questions: [
      "Are hanging pawns always weak?",
      "What are the strengths of hanging pawns?"
    ],
    short_answer: "No. They can provide space, central control, and useful pawn breaks.",
    answer: "Their strength depends on whether they can remain active and avoid becoming fixed targets.",
    example: "Hanging central pawns may restrict enemy pieces and support an active attack.",
    related: ["POSITION-028", "POSITION-030", "MIDDLE-051"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-030",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Hanging Pawns",
    title: "How should I play against hanging pawns?",
    level: "Intermediate",
    keywords: ["hanging pawns", "blockade", "attack"],
    questions: [
      "How do I attack hanging pawns?",
      "What is the best strategy against hanging pawns?"
    ],
    short_answer: "Restrict them, attack their supporting pieces, and encourage them to become fixed weaknesses.",
    answer: "Blockading the pawns and forcing them to advance can sometimes create weak squares or isolated pawns.",
    example: "Place a piece in front of the pawns and pressure them with rooks.",
    related: ["POSITION-028", "POSITION-031", "MIDDLE-038"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-031",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Backward Pawns",
    title: "What is a pawn island?",
    level: "Beginner",
    keywords: ["pawn island", "pawn groups", "structure"],
    questions: [
      "What is a pawn island?",
      "How are pawn islands counted?"
    ],
    short_answer: "A pawn island is a group of connected pawns separated from another group by an empty file.",
    answer: "More pawn islands can sometimes create more separate defensive responsibilities.",
    example: "Two connected pawns on the queenside form one pawn island.",
    related: ["POSITION-032", "POSITION-033", "MIDDLE-037"],
    source: "Chess terminology",
    verified: true
  },

  {
    id: "POSITION-032",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Islands",
    title: "Why can fewer pawn islands be better?",
    level: "Intermediate",
    keywords: ["pawn islands", "weakness", "endgame"],
    questions: [
      "Why are fewer pawn islands sometimes better?",
      "How do pawn islands create weaknesses?"
    ],
    short_answer: "Fewer pawn islands can mean fewer separate targets that need protection.",
    answer: "In many endgames, separated pawn groups can become easier for the opponent to attack.",
    example: "Two pawn islands may be easier to defend than four isolated groups.",
    related: ["POSITION-031", "POSITION-033", "END-010"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-033",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Islands",
    title: "Are pawn islands always a weakness?",
    level: "Intermediate",
    keywords: ["pawn islands", "structure", "strategy"],
    questions: [
      "Are more pawn islands always bad?",
      "Can extra pawn islands have advantages?"
    ],
    short_answer: "No. Pawn islands must be evaluated together with activity, space, and concrete targets.",
    answer: "A side may accept more islands in exchange for open files, active pieces, or other benefits.",
    example: "An exchange may create an extra pawn island but also open a file for a rook.",
    related: ["POSITION-031", "POSITION-032", "POSITION-034"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-034",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Exchanges",
    title: "How do pawn exchanges change a position?",
    level: "Beginner",
    keywords: ["pawn exchange", "structure", "open files"],
    questions: [
      "Why are pawn exchanges important?",
      "How can exchanging pawns change the game?"
    ],
    short_answer: "Pawn exchanges can open files, change weaknesses, create passed pawns, and alter piece activity.",
    answer: "Before exchanging pawns, consider which pieces benefit from the resulting structure.",
    example: "Exchanging a central pawn may open a diagonal for a bishop.",
    related: ["POSITION-035", "POSITION-036", "CALC-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-035",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Weakness",
    title: "Can pawn weaknesses disappear?",
    level: "Intermediate",
    keywords: ["pawn weakness", "pawn structure", "strategy"],
    questions: [
      "Can a pawn weakness be fixed?",
      "Can a weak pawn become strong?"
    ],
    short_answer: "Yes. Exchanges, pawn advances, or changes in piece activity can remove or reduce a weakness.",
    answer: "A weakness is not always permanent; its importance depends on whether the opponent can exploit it.",
    example: "A backward pawn may advance and become a passed pawn after a favorable exchange.",
    related: ["POSITION-003", "POSITION-034", "POSITION-036"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-036",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Blockade",
    title: "What is a pawn blockade?",
    level: "Intermediate",
    keywords: ["blockade", "pawn", "knight"],
    questions: [
      "What is a pawn blockade?",
      "Why block a passed pawn?"
    ],
    short_answer: "A blockade places a piece in front of a pawn to stop or restrict its advance.",
    answer: "A blockade can turn a dangerous pawn into a fixed target while the blocking piece remains active.",
    example: "A knight placed directly in front of a passed pawn can prevent it from advancing.",
    related: ["POSITION-037", "POSITION-023", "POSITION-020"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-037",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Blockade",
    title: "Which piece is good for blockading a pawn?",
    level: "Intermediate",
    keywords: ["blockade", "knight", "rook", "pawn"],
    questions: [
      "Which piece is best for a blockade?",
      "Why are knights often good blockaders?"
    ],
    short_answer: "The best blockading piece depends on the position; knights can be excellent because they can occupy central blockade squares.",
    answer: "Rooks and bishops can also blockade when their activity remains useful.",
    example: "A knight in front of a passed pawn may stop it while attacking other targets.",
    related: ["POSITION-036", "POSITION-038", "MIDDLE-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-038",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "What is a protected passed pawn?",
    level: "Intermediate",
    keywords: ["protected passed pawn", "passed pawn", "endgame"],
    questions: [
      "What is a protected passed pawn?",
      "Why is a protected passed pawn strong?"
    ],
    short_answer: "A protected passed pawn is a passed pawn defended by another pawn or piece.",
    answer: "Its defender makes it harder for the opponent to attack or blockade the pawn.",
    example: "Two connected passed pawns can protect each other while advancing.",
    related: ["POSITION-023", "POSITION-039", "END-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-039",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "What is a connected passed pawn?",
    level: "Intermediate",
    keywords: ["connected passed pawns", "passed pawns", "endgame"],
    questions: [
      "What are connected passed pawns?",
      "Why are connected passed pawns dangerous?"
    ],
    short_answer: "They are passed pawns on adjacent files that can support each other.",
    answer: "Connected passed pawns can force enemy pieces into passive defensive roles.",
    example: "Two connected passed pawns advancing together may be difficult for a rook to stop.",
    related: ["POSITION-038", "POSITION-040", "END-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-040",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Passed Pawns",
    title: "What is a protected passed pawn worth strategically?",
    level: "Intermediate",
    keywords: ["passed pawn", "protected pawn", "strategy"],
    questions: [
      "Why can a protected passed pawn dominate a position?",
      "How does a passed pawn restrict pieces?"
    ],
    short_answer: "It can tie enemy pieces to defense while giving your own pieces freedom to operate elsewhere.",
    answer: "The opponent may need to block or attack the pawn, reducing their active options.",
    example: "A protected passed pawn can force a rook to remain behind it instead of attacking elsewhere.",
    related: ["POSITION-038", "POSITION-041", "MIDDLE-068"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-041",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Space",
    title: "How does pawn structure affect space?",
    level: "Beginner",
    keywords: ["space", "pawn structure", "center"],
    questions: [
      "How do pawns control space?",
      "Why can advanced pawns restrict pieces?"
    ],
    short_answer: "Advanced pawns control squares and can reduce the opponent's available piece activity.",
    answer: "A space advantage can restrict enemy pieces, although advanced pawns can also become targets.",
    example: "A central pawn advance may take away important squares from an enemy knight.",
    related: ["POSITION-042", "POSITION-043", "MIDDLE-040"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-042",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Space",
    subtopic: "Restriction",
    title: "What is a space advantage in positional chess?",
    level: "Beginner",
    keywords: ["space advantage", "restriction", "strategy"],
    questions: [
      "What is space advantage?",
      "How can I use more space?"
    ],
    short_answer: "A space advantage gives your pieces more room while restricting the opponent.",
    answer: "The extra room allows easier maneuvering and can make the opponent's position cramped.",
    example: "A strong central pawn formation may restrict enemy knights.",
    related: ["POSITION-041", "POSITION-043", "MIDDLE-040"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-043",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Space",
    subtopic: "Cramped Positions",
    title: "What is a cramped position?",
    level: "Beginner",
    keywords: ["cramped position", "space", "restriction"],
    questions: [
      "What is a cramped position?",
      "Why is lack of space a problem?"
    ],
    short_answer: "A cramped position gives pieces fewer useful squares and makes coordination harder.",
    answer: "The cramped side often seeks exchanges or pawn breaks to gain room.",
    example: "A knight with no active squares may be a symptom of a cramped position.",
    related: ["POSITION-042", "POSITION-044", "MIDDLE-042"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-044",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Space",
    subtopic: "Counterplay",
    title: "How should I play with less space?",
    level: "Intermediate",
    keywords: ["less space", "counterplay", "pawn break"],
    questions: [
      "How do I play when I have less space?",
      "How can I escape a cramped position?"
    ],
    short_answer: "Look for pawn breaks, active exchanges, piece activity, and tactical counterplay.",
    answer: "The cramped side should avoid passivity and seek ways to open the position.",
    example: "A timely pawn break can open a file and give a restricted bishop new activity.",
    related: ["POSITION-043", "POSITION-045", "MIDDLE-042"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-045",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Breaks",
    title: "Why are pawn breaks central to positional play?",
    level: "Beginner",
    keywords: ["pawn break", "strategy", "pawn structure"],
    questions: [
      "Why are pawn breaks important in positional chess?",
      "How can a pawn break change the position?"
    ],
    short_answer: "Pawn breaks can open lines, challenge structures, create weaknesses, and activate pieces.",
    answer: "They are often the main way to change a static position into a dynamic one.",
    example: "A central pawn break can open a file for a rook and a diagonal for a bishop.",
    related: ["POSITION-046", "MIDDLE-048", "CALC-048"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-046",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Breaks",
    title: "How do I find the right pawn break?",
    level: "Intermediate",
    keywords: ["pawn break", "candidate break", "strategy"],
    questions: [
      "How do I find a good pawn break?",
      "Which pawn should I advance?"
    ],
    short_answer: "Look for a pawn move that improves your pieces, challenges the opponent, or creates a favorable structural change.",
    answer: "Calculate the resulting exchanges and lines before committing to the break.",
    example: "A break is attractive when your pieces are ready to use the opened file or diagonal.",
    related: ["POSITION-045", "POSITION-047", "CALC-048"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-047",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Breaks",
    title: "Why can a pawn break be dangerous?",
    level: "Intermediate",
    keywords: ["pawn break", "weakness", "calculation"],
    questions: [
      "Can a pawn break weaken my position?",
      "Why should I calculate pawn breaks?"
    ],
    short_answer: "A pawn break can create permanent weaknesses or open lines for the opponent.",
    answer: "Every pawn move changes the structure, so consider which squares and files become weak.",
    example: "A pawn push may open a diagonal toward your own king.",
    related: ["POSITION-046", "POSITION-048", "CALC-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-048",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Pawn Moves",
    title: "Why are pawn moves strategically important?",
    level: "Beginner",
    keywords: ["pawn moves", "structure", "strategy"],
    questions: [
      "Why are pawn moves so important?",
      "Why should I think carefully before pushing a pawn?"
    ],
    short_answer: "Pawn moves permanently change the structure and control of squares.",
    answer: "Unlike pieces, pawns cannot move backward, so their moves can create permanent strengths or weaknesses.",
    example: "A pawn advance may gain space but leave a weak square behind.",
    related: ["POSITION-047", "POSITION-049", "CALC-054"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-049",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Pawn Structure",
    subtopic: "Weak Squares",
    title: "How does a pawn move create a weak square?",
    level: "Intermediate",
    keywords: ["weak square", "pawn move", "structure"],
    questions: [
      "How can pawn moves create weak squares?",
      "Why can a pawn advance leave a hole?"
    ],
    short_answer: "A pawn move can stop controlling the square it previously controlled.",
    answer: "If no other pawn can challenge that square, an enemy piece may use it as a stable outpost.",
    example: "Moving a pawn can leave the square behind it unavailable for future pawn attacks.",
    related: ["POSITION-006", "POSITION-048", "POSITION-007"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-050",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Good Piece",
    title: "What makes one piece better than another?",
    level: "Intermediate",
    keywords: ["piece quality", "good piece", "activity"],
    questions: [
      "What makes a piece good?",
      "How do I compare two pieces?"
    ],
    short_answer: "Compare their activity, targets, mobility, safety, and contribution to the position.",
    answer: "A nominally equal piece can be much stronger when it has better squares and more useful tasks.",
    example: "An active knight on an outpost may be stronger than a bishop blocked by its own pawns.",
    related: ["POSITION-051", "POSITION-052", "MIDDLE-015"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-051",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Good Piece",
    title: "What is a bad piece?",
    level: "Beginner",
    keywords: ["bad piece", "passive piece", "activity"],
    questions: [
      "What is a bad piece?",
      "How can a piece become bad?"
    ],
    short_answer: "A bad piece is one with poor activity, limited mobility, or little useful influence.",
    answer: "A piece may be bad because of pawn structure, lack of squares, or poor coordination.",
    example: "A bishop trapped behind its own pawns may have very little useful activity.",
    related: ["POSITION-050", "POSITION-052", "MIDDLE-014"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-052",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Worst Piece",
    title: "How do I find my worst piece?",
    level: "Beginner",
    keywords: ["worst piece", "piece improvement", "strategy"],
    questions: [
      "How do I identify my worst piece?",
      "Which piece should I improve first?"
    ],
    short_answer: "Find the piece contributing least to your position and look for a better square or role.",
    answer: "Consider mobility, activity, safety, targets, and coordination.",
    example: "If one rook is trapped behind pawns while the other controls an open file, the trapped rook may be your worst piece.",
    related: ["POSITION-050", "POSITION-051", "MIDDLE-014"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "POSITION-053",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Bishop vs Knight",
    title: "When is a bishop better than a knight?",
    level: "Intermediate",
    keywords: ["bishop", "knight", "minor pieces"],
    questions: [
      "When is a bishop stronger than a knight?",
      "What positions favor bishops?"
    ],
    short_answer: "Bishops often become stronger in open positions with activity on both sides of the board.",
    answer: "Their long-range movement can be especially valuable when pawn chains do not restrict their diagonals.",
    example: "An open position with targets on both wings often favors a strong bishop.",
    related: ["POSITION-054", "POSITION-055", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-054",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Bishop vs Knight",
    title: "When is a knight better than a bishop?",
    level: "Intermediate",
    keywords: ["knight", "bishop", "minor pieces"],
    questions: [
      "When is a knight stronger than a bishop?",
      "What positions favor knights?"
    ],
    short_answer: "Knights often excel in closed positions and when strong outposts are available.",
    answer: "A knight can be powerful when the opponent cannot challenge it with pawns.",
    example: "A knight on a protected central outpost can dominate a closed position.",
    related: ["POSITION-053", "POSITION-055", "MIDDLE-023"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-055",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Bishop Pair",
    title: "What is the bishop pair?",
    level: "Beginner",
    keywords: ["bishop pair", "bishops", "minor pieces"],
    questions: [
      "What is the bishop pair?",
      "Why can two bishops be an advantage?"
    ],
    short_answer: "The bishop pair means having both bishops while the opponent does not have two bishops.",
    answer: "The bishops can complement each other by controlling both color complexes and may become strong in open positions.",
    example: "Opening the center can increase the activity of the bishop pair.",
    related: ["POSITION-056", "POSITION-053", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-056",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Bishop Pair",
    title: "When is the bishop pair especially valuable?",
    level: "Intermediate",
    keywords: ["bishop pair", "open position", "bishops"],
    questions: [
      "When is the bishop pair strongest?",
      "How can I use the bishop pair?"
    ],
    short_answer: "The bishop pair is often especially valuable in open positions with activity on both sides.",
    answer: "Use open lines, diagonals, and targets to let both bishops influence the board.",
    example: "A central pawn exchange can open diagonals for both bishops.",
    related: ["POSITION-055", "POSITION-057", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-057",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Minor Piece Exchanges",
    title: "When should I exchange a bishop for a knight?",
    level: "Intermediate",
    keywords: ["bishop knight exchange", "minor pieces", "strategy"],
    questions: [
      "When should I trade my bishop for a knight?",
      "How do I decide whether to exchange minor pieces?"
    ],
    short_answer: "Exchange when the resulting position improves your structure, removes a strong piece, or supports a concrete plan.",
    answer: "Do not use a fixed rule such as always keeping bishops or always exchanging knights.",
    example: "Trade an enemy knight if it occupies a powerful outpost and is difficult to challenge.",
    related: ["POSITION-053", "POSITION-054", "POSITION-058"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-058",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Minor Piece Exchanges",
    title: "Why should I exchange the opponent's best piece?",
    level: "Beginner",
    keywords: ["best piece", "exchange", "strategy"],
    questions: [
      "Why is exchanging the opponent's best piece useful?",
      "Should I always trade their strongest piece?"
    ],
    short_answer: "Removing a strong enemy piece can reduce the opponent's activity and improve your position.",
    answer: "The exchange is useful when the resulting position does not damage your own coordination or create new problems.",
    example: "Trading an enemy knight that controls a key outpost can be strategically valuable.",
    related: ["POSITION-057", "MIDDLE-059", "MIDDLE-061"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-059",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Piece Quality",
    subtopic: "Color Complex",
    title: "What is a color complex?",
    level: "Intermediate",
    keywords: ["color complex", "squares", "bishop"],
    questions: [
      "What is a color complex in chess?",
      "Why are color complexes important?"
    ],
    short_answer: "A color complex is a group of squares of the same color that can become strategically important.",
    answer: "Weaknesses on one color complex can be especially important when the opponent has a bishop controlling that color.",
    example: "Weak dark squares around a king can become targets for a dark-squared bishop.",
    related: ["POSITION-060", "POSITION-061", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-060",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Color Complex",
    title: "How can I weaken a color complex?",
    level: "Intermediate",
    keywords: ["color complex", "weak squares", "pawn moves"],
    questions: [
      "How do pawn moves weaken a color complex?",
      "How can a king become weak on one color?"
    ],
    short_answer: "Moving pawns away from a group of squares can leave those squares without pawn control.",
    answer: "If the opponent has a bishop or knight that can occupy those squares, the weakness may become important.",
    example: "Moving dark-square pawns can leave dark squares around the king vulnerable.",
    related: ["POSITION-059", "POSITION-061", "MIDDLE-033"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-061",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Squares",
    subtopic: "Color Complex",
    title: "Why is a bishop powerful against weak squares of its color?",
    level: "Intermediate",
    keywords: ["bishop", "weak squares", "color complex"],
    questions: [
      "Why can a bishop dominate weak squares?",
      "How does a bishop exploit a color weakness?"
    ],
    short_answer: "A bishop can repeatedly attack and occupy squares of its own color complex from long range.",
    answer: "This makes color weaknesses especially important when the defending side lacks a bishop controlling those squares.",
    example: "A dark-squared bishop can target weak dark squares around the enemy king.",
    related: ["POSITION-059", "POSITION-060", "ATTACK-005"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-062",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Open Position",
    title: "What is an open position?",
    level: "Beginner",
    keywords: ["open position", "pieces", "bishops"],
    questions: [
      "What is an open chess position?",
      "What makes a position open?"
    ],
    short_answer: "An open position has relatively few central pawns blocking lines and allowing pieces greater mobility.",
    answer: "Open positions often increase the value of long-range pieces such as bishops, rooks, and queens.",
    example: "After central pawn exchanges, bishops may gain long diagonals.",
    related: ["POSITION-063", "POSITION-053", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-063",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Closed Position",
    title: "What is a closed position?",
    level: "Beginner",
    keywords: ["closed position", "pawn chains", "knights"],
    questions: [
      "What is a closed chess position?",
      "What makes a position closed?"
    ],
    short_answer: "A closed position has pawn structures that block many central lines and restrict piece mobility.",
    answer: "Knights can become especially useful because they can jump over blocked structures.",
    example: "A locked central pawn chain can create a closed position with fewer open lines.",
    related: ["POSITION-064", "POSITION-054", "MIDDLE-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-064",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Open vs Closed",
    title: "Why do bishops prefer open positions?",
    level: "Beginner",
    keywords: ["bishops", "open position", "diagonals"],
    questions: [
      "Why are bishops often stronger in open positions?",
      "How does an open board help bishops?"
    ],
    short_answer: "Open lines allow bishops to use their long-range movement.",
    answer: "With fewer pawn blockers, bishops can influence both sides of the board.",
    example: "An open center can give a bishop a long diagonal toward the opponent's king.",
    related: ["POSITION-062", "POSITION-065", "MIDDLE-024"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-065",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Open vs Closed",
    title: "Why do knights often prefer closed positions?",
    level: "Beginner",
    keywords: ["knights", "closed position", "outposts"],
    questions: [
      "Why can knights be strong in closed positions?",
      "How does a closed position help knights?"
    ],
    short_answer: "Knights can jump over blocked pawn structures and use stable outposts.",
    answer: "When long-range pieces are restricted by pawns, knights may gain relative value.",
    example: "A knight on a protected central square can dominate a closed pawn structure.",
    related: ["POSITION-063", "POSITION-066", "MIDDLE-022"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-066",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Piece Mobility",
    title: "What is mobility in positional chess?",
    level: "Beginner",
    keywords: ["mobility", "piece activity", "position"],
    questions: [
      "What does mobility mean in chess?",
      "Why is piece mobility important?"
    ],
    short_answer: "Mobility is the number and quality of useful squares available to a piece or group of pieces.",
    answer: "More mobility can make pieces more flexible and increase tactical and strategic possibilities.",
    example: "A bishop with open diagonals has greater mobility than one blocked by its own pawns.",
    related: ["POSITION-050", "POSITION-067", "MIDDLE-015"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-067",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Piece Restriction",
    title: "What is a restricted piece?",
    level: "Beginner",
    keywords: ["restricted piece", "mobility", "strategy"],
    questions: [
      "What is a restricted piece?",
      "How can I restrict an opponent's piece?"
    ],
    short_answer: "A restricted piece has few useful squares or limited ability to influence the position.",
    answer: "Pawn control, lack of open lines, and strong enemy pieces can restrict mobility.",
    example: "A knight with no safe central squares may be strategically restricted.",
    related: ["POSITION-066", "POSITION-068", "MIDDLE-068"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-068",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Domination",
    title: "What is piece domination?",
    level: "Intermediate",
    keywords: ["domination", "piece restriction", "strategy"],
    questions: [
      "What is domination in chess?",
      "How can one piece dominate another?"
    ],
    short_answer: "Domination occurs when a piece has very few useful squares and is effectively controlled by the opponent.",
    answer: "Strong pawn control, tactical threats, and superior piece placement can create domination.",
    example: "A knight may be dominated when all its useful squares are controlled by enemy pawns or pieces.",
    related: ["POSITION-067", "POSITION-069", "MIDDLE-068"],
    source: "Chess strategic principle",
    verified: true
  },

  {
    id: "POSITION-069",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Strategic Evaluation",
    title: "How should I evaluate a position positionally?",
    level: "Beginner",
    keywords: ["positional evaluation", "strategy", "evaluation"],
    questions: [
      "How do I evaluate a position without an engine?",
      "What positional factors should I compare?"
    ],
    short_answer: "Compare material, king safety, piece activity, pawn structure, space, weak squares, and plans.",
    answer: "Then ask which side has the more useful long-term advantages and whether those advantages can be exploited.",
    example: "Equal material does not mean equal positions if one side has active pieces and a protected passed pawn.",
    related: ["POSITION-002", "POSITION-003", "POSITION-070"],
    source: "Chess coaching principle",
    verified: true
  },

  {
    id: "POSITION-070",
    type: "POSITIONAL",
    category: "Positional Chess & Pawn Structures",
    topic: "Positional Chess",
    subtopic: "Practical Checklist",
    title: "What is a simple positional checklist?",
    level: "Beginner",
    keywords: ["positional checklist", "strategy", "evaluation"],
    questions: [
      "What should I check in a positional position?",
      "What is a simple positional thinking routine?"
    ],
    short_answer: "Check weaknesses, strong squares, piece activity, pawn structure, space, king safety, and pawn breaks.",
    answer: "After identifying these features, decide which side has the better plan and which piece or weakness should be improved first.",
    example: "Ask: What is weak? What is strong? What is my worst piece? What pawn break is available?",
    related: ["POSITION-069", "MIDDLE-005", "MIDDLE-080"],
    source: "Chess coaching principle",
    verified: true
  }
];

export default positionalChessPawnStructures;