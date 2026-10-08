const ratingsTitlesChessCareers = [

  {
    id: "RATING-001",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating basics",
    title: "What is a chess rating?",
    level: "Beginner",
    keywords: ["rating", "FIDE", "strength"],
    questions: [
      "What is a chess rating?",
      "What does my chess rating mean?"
    ],
    short_answer: "A chess rating is a numerical measure used to estimate a player's playing strength.",
    answer: "Ratings change according to competitive results against rated opponents and the applicable rating regulations.",
    example: "A player's rating may rise after scoring better than expected against stronger opponents.",
    related: ["RATING-002", "RATING-003"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-002",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "FIDE rating",
    title: "What is a FIDE rating?",
    level: "Beginner",
    keywords: ["FIDE rating", "international rating", "rating"],
    questions: [
      "What is a FIDE rating?",
      "What does FIDE rating mean?"
    ],
    short_answer: "A FIDE rating is an internationally recognized chess rating maintained under FIDE regulations.",
    answer: "FIDE ratings are calculated from eligible rated games using the official rating system.",
    example: "A player competing in FIDE-rated tournaments can develop an international rating.",
    related: ["RATING-001", "RATING-004"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-003",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating interpretation",
    title: "Does a higher rating mean a stronger player?",
    level: "Beginner",
    keywords: ["rating", "strength", "comparison"],
    questions: [
      "Does higher rating mean stronger chess?",
      "How should I compare two ratings?"
    ],
    short_answer: "Generally, a higher rating indicates greater expected playing strength.",
    answer: "Rating is a statistical estimate, not a guarantee that the higher-rated player will win a particular game.",
    example: "A 2000-rated player can lose to a 1700-rated player in an individual game.",
    related: ["RATING-001", "RATING-010"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-004",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "FIDE rating list",
    title: "What is the FIDE rating list?",
    level: "Beginner",
    keywords: ["rating list", "FIDE", "players"],
    questions: [
      "What is the FIDE rating list?",
      "Where are FIDE ratings published?"
    ],
    short_answer: "The FIDE rating list publishes official player ratings and related information.",
    answer: "FIDE publishes rating lists according to its rating regulations and publication schedule.",
    example: "A player's official FIDE rating can be checked on the FIDE player database.",
    related: ["RATING-002", "RATING-005"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-005",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "FIDE ID",
    title: "What is a FIDE ID?",
    level: "Beginner",
    keywords: ["FIDE ID", "player ID", "FIDE"],
    questions: [
      "What is a FIDE ID?",
      "Why does a chess player have a FIDE ID?"
    ],
    short_answer: "A FIDE ID is a unique identification number associated with a player in the FIDE system.",
    answer: "It helps identify players consistently across FIDE-rated events and official records.",
    example: "A tournament organizer can use a player's FIDE ID to identify the correct player.",
    related: ["RATING-004", "RATING-006"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-006",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Player profile",
    title: "What information can a FIDE player profile show?",
    level: "Beginner",
    keywords: ["FIDE profile", "rating", "player"],
    questions: [
      "What can I find in a FIDE player profile?",
      "What information is available about a FIDE player?"
    ],
    short_answer: "A FIDE profile can show official identification, ratings, title information, federation, and rating history.",
    answer: "The exact information displayed depends on the player's official FIDE record.",
    example: "You can use a FIDE profile to check a player's current rating and title.",
    related: ["RATING-004", "RATING-005"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-007",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating change",
    title: "Why does a chess rating change?",
    level: "Beginner",
    keywords: ["rating change", "win", "loss"],
    questions: [
      "Why does my chess rating go up or down?",
      "What causes a FIDE rating change?"
    ],
    short_answer: "Your rating changes according to your results compared with the expected results under the rating system.",
    answer: "Results against stronger or weaker opponents can have different rating effects.",
    example: "Beating a much stronger opponent can produce a larger rating gain than beating a much weaker opponent.",
    related: ["RATING-008", "RATING-009"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-008",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Expected result",
    title: "What is expected score in chess rating?",
    level: "Intermediate",
    keywords: ["expected score", "rating", "probability"],
    questions: [
      "What is expected score in chess ratings?",
      "Why does opponent strength matter?"
    ],
    short_answer: "Expected score estimates how well a player is expected to perform based on rating differences.",
    answer: "A result significantly better or worse than the expected score can influence the rating more strongly.",
    example: "A lower-rated player scoring well against higher-rated opponents may gain rating points.",
    related: ["RATING-007", "RATING-009"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-009",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating gain",
    title: "Do I gain more rating points by beating a stronger player?",
    level: "Beginner",
    keywords: ["rating gain", "strong opponent", "win"],
    questions: [
      "Do stronger opponents give more rating points?",
      "Can beating a strong player improve my rating more?"
    ],
    short_answer: "The rating effect depends on the rating difference and the applicable rating rules.",
    answer: "A result that is better than expected generally has a greater positive rating effect.",
    example: "A major upset can have a larger rating impact than an expected win.",
    related: ["RATING-008", "RATING-010"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-010",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating prediction",
    title: "Does rating guarantee who will win?",
    level: "Beginner",
    keywords: ["rating", "prediction", "upset"],
    questions: [
      "Does the higher-rated player always win?",
      "Can a lower-rated player beat a higher-rated player?"
    ],
    short_answer: "No. Rating predicts expected performance, not the result of every individual game.",
    answer: "Upsets are normal in chess because a single game depends on preparation, form, decisions, and many practical factors.",
    example: "A 1500-rated player can defeat a 1900-rated player in one game.",
    related: ["RATING-003", "RATING-011"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-011",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating improvement",
    title: "How can I increase my chess rating?",
    level: "Beginner",
    keywords: ["rating improvement", "training", "progress"],
    questions: [
      "How can I improve my chess rating?",
      "What is the best way to gain rating points?"
    ],
    short_answer: "Improve your chess strength through consistent training, serious games, and analysis.",
    answer: "Focus on tactics, calculation, strategy, endgames, opening understanding, and correcting recurring mistakes.",
    example: "Analyzing your own losses may reveal a recurring tactical weakness that is costing rating points.",
    related: ["TRAIN-001", "RATING-012"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "RATING-012",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating plateau",
    title: "Why has my chess rating stopped improving?",
    level: "Intermediate",
    keywords: ["rating plateau", "improvement", "training"],
    questions: [
      "Why is my chess rating stuck?",
      "How can I break a rating plateau?"
    ],
    short_answer: "A rating plateau often means your current training is no longer addressing your biggest weaknesses.",
    answer: "Review your recent games, identify recurring errors, and adjust training toward those weaknesses.",
    example: "If most losses come from time trouble, adding more opening theory may not solve the main problem.",
    related: ["RATING-011", "TRAIN-060"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "RATING-013",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Peak rating",
    title: "What is a peak chess rating?",
    level: "Beginner",
    keywords: ["peak rating", "highest rating", "career"],
    questions: [
      "What is peak rating?",
      "What does a player's highest rating mean?"
    ],
    short_answer: "Peak rating is the highest official rating a player has reached.",
    answer: "It can be useful when discussing a player's career, but current rating and recent performance provide different information.",
    example: "A player may have a peak rating of 2200 but currently be rated 2100.",
    related: ["RATING-014", "RATING-015"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-014",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Current rating",
    title: "What is current rating?",
    level: "Beginner",
    keywords: ["current rating", "rating list", "FIDE"],
    questions: [
      "What is a player's current chess rating?",
      "Is current rating different from peak rating?"
    ],
    short_answer: "Current rating is the player's rating on the relevant current official rating list.",
    answer: "It can change over time as rated results are processed.",
    example: "A player's current rating may be lower than their career peak after a period of poor results.",
    related: ["RATING-013", "RATING-015"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-015",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating history",
    title: "What is chess rating history?",
    level: "Intermediate",
    keywords: ["rating history", "progress", "FIDE"],
    questions: [
      "What is a player's rating history?",
      "How can rating history show chess progress?"
    ],
    short_answer: "Rating history shows how a player's official rating has changed over time.",
    answer: "It can help identify periods of improvement, decline, stability, or major tournament performance.",
    example: "A player's rating graph may show a steady rise from 1600 to 1900 over several years.",
    related: ["RATING-013", "RATING-016"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-016",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating performance",
    title: "What is performance rating?",
    level: "Intermediate",
    keywords: ["performance rating", "tournament", "performance"],
    questions: [
      "What is performance rating in chess?",
      "What does tournament performance rating mean?"
    ],
    short_answer: "Performance rating is an estimate of the playing strength represented by a player's results in a particular event or group of games.",
    answer: "Different systems and reports may calculate performance in different ways, so it should not be confused with an official rating change.",
    example: "A player may perform at a much higher level in one tournament than their current rating suggests.",
    related: ["RATING-014", "RATING-017"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-017",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Tournament performance",
    title: "Can one great tournament prove my true rating?",
    level: "Intermediate",
    keywords: ["performance", "rating", "tournament"],
    questions: [
      "Does one great tournament mean my rating should be much higher?",
      "Can a single event show my true playing strength?"
    ],
    short_answer: "One tournament can show strong performance, but long-term results are more reliable for estimating playing strength.",
    answer: "Chess performance naturally fluctuates, so rating is designed to reflect results over many games.",
    example: "A 1700-rated player may score like a 2000 player in one event without immediately becoming a 2000-rated player.",
    related: ["RATING-016", "RATING-018"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-018",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating confidence",
    title: "Why can new players have unstable ratings?",
    level: "Intermediate",
    keywords: ["rating stability", "new player", "rating"],
    questions: [
      "Why does a new player's rating change quickly?",
      "Why can an unrated player's first ratings be unstable?"
    ],
    short_answer: "A new rating is based on a relatively limited competitive history.",
    answer: "As more rated games are played, the rating generally becomes a more informative measure of established playing strength.",
    example: "A newly rated player may move substantially in rating after several strong or weak results.",
    related: ["RATING-017", "RATING-019"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-019",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Unrated players",
    title: "What does unrated mean?",
    level: "Beginner",
    keywords: ["unrated", "FIDE", "rating"],
    questions: [
      "What does unrated mean in chess?",
      "Does unrated mean the player is weak?"
    ],
    short_answer: "Unrated means the player does not currently have the relevant published rating in that rating system.",
    answer: "An unrated player can be very strong; they may simply have limited rated-game history or not yet meet the conditions for publication.",
    example: "A strong junior playing their first FIDE-rated tournament may be unrated before the event.",
    related: ["RATING-018", "RATING-020"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-020",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating systems",
    title: "Are all chess ratings the same?",
    level: "Beginner",
    keywords: ["rating systems", "FIDE", "online rating"],
    questions: [
      "Are FIDE and online chess ratings the same?",
      "Why are ratings different on different websites?"
    ],
    short_answer: "No. Different rating systems use different pools, formulas, and populations.",
    answer: "A FIDE rating should not be directly treated as equivalent to a rating on Chess.com, Lichess, or another platform.",
    example: "A player's online blitz rating and FIDE classical rating can be very different numbers.",
    related: ["RATING-021", "RATING-022"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-021",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Online rating",
    title: "Why is my online rating different from my FIDE rating?",
    level: "Beginner",
    keywords: ["online rating", "FIDE", "rating"],
    questions: [
      "Why is my online rating different from FIDE?",
      "Can I compare online and FIDE ratings directly?"
    ],
    short_answer: "Online and FIDE ratings belong to different rating pools and systems.",
    answer: "They measure performance within different populations and formats, so the numbers are not directly interchangeable.",
    example: "A player may have a 2000 online rapid rating and a significantly different FIDE rating.",
    related: ["RATING-020", "RATING-022"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-022",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating formats",
    title: "Are classical, rapid, and blitz ratings separate?",
    level: "Beginner",
    keywords: ["classical", "rapid", "blitz", "rating"],
    questions: [
      "Does FIDE have separate ratings for rapid and blitz?",
      "Are classical and blitz ratings different?"
    ],
    short_answer: "Yes. FIDE maintains separate rating categories for standard, rapid, and blitz chess.",
    answer: "A player's performance can differ significantly between time controls.",
    example: "A player can be stronger in rapid than in classical chess without having the same rating in both categories.",
    related: ["RATING-020", "RATING-023"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-023",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating categories",
    title: "What is a standard chess rating?",
    level: "Beginner",
    keywords: ["standard rating", "classical", "FIDE"],
    questions: [
      "What is standard chess rating?",
      "What does classical rating mean?"
    ],
    short_answer: "Standard rating generally refers to the FIDE rating category for standard or classical chess.",
    answer: "It is distinct from FIDE rapid and blitz ratings.",
    example: "A tournament advertised as FIDE-rated standard chess affects the standard rating category.",
    related: ["RATING-022", "RATING-024"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-024",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rapid rating",
    title: "What is a FIDE rapid rating?",
    level: "Beginner",
    keywords: ["rapid rating", "FIDE", "rapid"],
    questions: [
      "What is a FIDE rapid rating?",
      "How is rapid rating different from standard rating?"
    ],
    short_answer: "A FIDE rapid rating measures performance in eligible rapid games under FIDE regulations.",
    answer: "Rapid chess has a shorter time control than standard chess and has its own rating category.",
    example: "A FIDE-rated rapid tournament can affect a player's rapid rating rather than standard rating.",
    related: ["RATING-022", "RATING-025"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-025",
    type: "RATING",
    category: "Chess Ratings",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Blitz rating",
    title: "What is a FIDE blitz rating?",
    level: "Beginner",
    keywords: ["blitz rating", "FIDE", "blitz"],
    questions: [
      "What is a FIDE blitz rating?",
      "How is blitz rating different from classical rating?"
    ],
    short_answer: "A FIDE blitz rating measures performance in eligible blitz games under FIDE regulations.",
    answer: "Blitz involves shorter thinking time, so performance can differ substantially from standard chess.",
    example: "A player may have a strong blitz rating while having a different standard rating.",
    related: ["RATING-022", "RATING-024"],
    source: "FIDE Rating Regulations",
    verified: true
  },

  {
    id: "RATING-026",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Titles",
    title: "What is a FIDE chess title?",
    level: "Beginner",
    keywords: ["FIDE title", "title", "chess"],
    questions: [
      "What is a FIDE chess title?",
      "Why do chess players have titles?"
    ],
    short_answer: "A FIDE title is an official chess title awarded under FIDE regulations.",
    answer: "Titles recognize established levels of chess achievement and, depending on the title, may require rating thresholds, norms, or other conditions.",
    example: "Grandmaster and International Master are internationally recognized FIDE titles.",
    related: ["RATING-027", "RATING-028"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-027",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Open titles",
    title: "What are the main open FIDE titles?",
    level: "Beginner",
    keywords: ["GM", "IM", "FM", "CM"],
    questions: [
      "What are the main FIDE chess titles?",
      "What do GM, IM, FM, and CM mean?"
    ],
    short_answer: "The main open titles are Grandmaster (GM), International Master (IM), FIDE Master (FM), and Candidate Master (CM).",
    answer: "Each title has its own regulations and achievement requirements.",
    example: "GM is the highest standard open title awarded by FIDE.",
    related: ["RATING-028", "RATING-029"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-028",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Grandmaster",
    title: "What is a Grandmaster?",
    level: "Beginner",
    keywords: ["Grandmaster", "GM", "title"],
    questions: [
      "What does GM mean in chess?",
      "What is a chess Grandmaster?"
    ],
    short_answer: "Grandmaster (GM) is the highest regular open FIDE chess title.",
    answer: "The title is awarded under FIDE regulations after the player satisfies the applicable requirements.",
    example: "A player who earns the GM title may use GM as their official chess title.",
    related: ["RATING-027", "RATING-030"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-029",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "International Master",
    title: "What is an International Master?",
    level: "Beginner",
    keywords: ["International Master", "IM", "title"],
    questions: [
      "What does IM mean in chess?",
      "What is an International Master?"
    ],
    short_answer: "International Master (IM) is an official FIDE title below Grandmaster.",
    answer: "The title has specific FIDE requirements involving rating and title norms or other applicable criteria.",
    example: "An IM is a highly accomplished international-level chess player.",
    related: ["RATING-027", "RATING-028"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-030",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "FIDE Master",
    title: "What is a FIDE Master?",
    level: "Beginner",
    keywords: ["FIDE Master", "FM", "title"],
    questions: [
      "What does FM mean in chess?",
      "What is a FIDE Master?"
    ],
    short_answer: "FIDE Master (FM) is an official FIDE title below IM.",
    answer: "The title is awarded when the player meets the applicable FIDE title requirements.",
    example: "A strong tournament player may earn the FM title after reaching the required standard under FIDE regulations.",
    related: ["RATING-027", "RATING-031"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-031",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Candidate Master",
    title: "What is a Candidate Master?",
    level: "Beginner",
    keywords: ["Candidate Master", "CM", "title"],
    questions: [
      "What does CM mean in chess?",
      "What is a Candidate Master?"
    ],
    short_answer: "Candidate Master (CM) is an official FIDE title below FM.",
    answer: "It recognizes a strong competitive level and is awarded under the applicable FIDE title regulations.",
    example: "A player who satisfies the CM requirements can receive the Candidate Master title.",
    related: ["RATING-027", "RATING-030"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-032",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Women's titles",
    title: "What are the women's FIDE titles?",
    level: "Beginner",
    keywords: ["WGM", "WIM", "WFM", "WCM"],
    questions: [
      "What are the women's FIDE chess titles?",
      "What do WGM, WIM, WFM, and WCM mean?"
    ],
    short_answer: "The women's titles are WGM, WIM, WFM, and WCM.",
    answer: "They are official FIDE titles with their own regulations and achievement requirements.",
    example: "WGM stands for Woman Grandmaster.",
    related: ["RATING-033", "RATING-034"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-033",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Woman Grandmaster",
    title: "What is a Woman Grandmaster?",
    level: "Beginner",
    keywords: ["WGM", "Woman Grandmaster", "title"],
    questions: [
      "What does WGM mean in chess?",
      "What is a Woman Grandmaster?"
    ],
    short_answer: "WGM means Woman Grandmaster, an official FIDE title.",
    answer: "The title has requirements defined by FIDE and is distinct from the open GM title.",
    example: "A player holding the WGM title may use the WGM abbreviation officially.",
    related: ["RATING-032", "RATING-034"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-034",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "WIM and WFM",
    title: "What do WIM and WFM mean?",
    level: "Beginner",
    keywords: ["WIM", "WFM", "women titles"],
    questions: [
      "What do WIM and WFM mean?",
      "What are WIM and WFM chess titles?"
    ],
    short_answer: "WIM means Woman International Master and WFM means Woman FIDE Master.",
    answer: "Both are official FIDE titles with requirements established in the title regulations.",
    example: "WIM is a higher title than WFM in the women's title hierarchy.",
    related: ["RATING-032", "RATING-033"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-035",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title norms",
    title: "What is a chess title norm?",
    level: "Intermediate",
    keywords: ["norm", "GM norm", "IM norm"],
    questions: [
      "What is a chess title norm?",
      "What does earning a GM norm mean?"
    ],
    short_answer: "A title norm is a performance achievement that satisfies specified FIDE criteria toward a title.",
    answer: "Norm requirements include factors such as performance level, opponent qualifications, title mix, federation requirements, and event conditions.",
    example: "A player can earn a GM norm in a qualifying tournament without immediately becoming a Grandmaster.",
    related: ["RATING-036", "RATING-037"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-036",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "GM norm",
    title: "What is a GM norm?",
    level: "Intermediate",
    keywords: ["GM norm", "Grandmaster", "norm"],
    questions: [
      "What is a Grandmaster norm?",
      "How does a GM norm help a player?"
    ],
    short_answer: "A GM norm is a qualifying performance toward the Grandmaster title.",
    answer: "A player normally needs the required number and type of norms plus the other applicable FIDE title conditions.",
    example: "A player can collect a GM norm during a strong international tournament.",
    related: ["RATING-035", "RATING-038"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-037",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "IM norm",
    title: "What is an IM norm?",
    level: "Intermediate",
    keywords: ["IM norm", "International Master", "norm"],
    questions: [
      "What is an International Master norm?",
      "How does an IM norm work?"
    ],
    short_answer: "An IM norm is a qualifying performance toward the International Master title.",
    answer: "The player must satisfy the applicable FIDE norm and overall title requirements.",
    example: "A player can earn an IM norm by achieving the required performance in a qualifying event.",
    related: ["RATING-035", "RATING-036"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-038",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title requirements",
    title: "Is one GM norm enough to become a Grandmaster?",
    level: "Intermediate",
    keywords: ["GM", "norm", "title requirements"],
    questions: [
      "Can one GM norm make me a Grandmaster?",
      "How many requirements are needed for the GM title?"
    ],
    short_answer: "No. A GM title requires satisfying all applicable FIDE requirements, not simply one norm.",
    answer: "The exact requirements include the required norms, rating conditions, and other regulations in force.",
    example: "Winning one qualifying event does not automatically make a player a Grandmaster.",
    related: ["RATING-035", "RATING-036"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-039",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating thresholds",
    title: "Is reaching a rating threshold alone always enough for a title?",
    level: "Intermediate",
    keywords: ["rating threshold", "title", "FIDE"],
    questions: [
      "Can rating alone give me every chess title?",
      "Is a rating threshold enough for a GM title?"
    ],
    short_answer: "Not for every title.",
    answer: "Some titles can be earned through rating-based routes, while others require norms and additional conditions.",
    example: "The GM title has requirements beyond simply reaching a high rating.",
    related: ["RATING-035", "RATING-038"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-040",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title application",
    title: "How does a player receive a FIDE title?",
    level: "Intermediate",
    keywords: ["title application", "FIDE", "norm"],
    questions: [
      "How is a FIDE title awarded?",
      "Who approves chess titles?"
    ],
    short_answer: "Titles are awarded through FIDE's official title procedures after the applicable requirements are verified.",
    answer: "Applications and supporting records are processed through the appropriate FIDE and federation procedures.",
    example: "A federation may submit a player's title application after the required achievements are documented.",
    related: ["RATING-038", "RATING-041"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-041",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title permanence",
    title: "Can a FIDE title be lost?",
    level: "Intermediate",
    keywords: ["title", "GM", "FIDE"],
    questions: [
      "Can a Grandmaster lose the GM title?",
      "Are FIDE chess titles permanent?"
    ],
    short_answer: "FIDE titles are generally permanent once awarded, subject to FIDE's regulations and exceptional disciplinary provisions.",
    answer: "A player does not normally lose a title simply because their rating later falls.",
    example: "A Grandmaster whose rating drops below 2500 remains a Grandmaster.",
    related: ["RATING-028", "RATING-042"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-042",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title and rating",
    title: "Can a Grandmaster have a low rating?",
    level: "Beginner",
    keywords: ["Grandmaster", "rating", "title"],
    questions: [
      "Can a GM's rating fall?",
      "Can a Grandmaster have a rating below the GM threshold?"
    ],
    short_answer: "Yes. A title and a current rating are different things.",
    answer: "Once awarded, a FIDE title does not normally disappear because the player's current rating falls.",
    example: "A GM can temporarily have a rating substantially below the rating associated with earning the title.",
    related: ["RATING-041", "RATING-014"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-043",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Title hierarchy",
    title: "What is the order of the main chess titles?",
    level: "Beginner",
    keywords: ["GM", "IM", "FM", "CM", "titles"],
    questions: [
      "What is the order of chess titles?",
      "Which is higher, FM, IM, or GM?"
    ],
    short_answer: "Among the main open titles, the hierarchy is CM, FM, IM, then GM.",
    answer: "The titles represent different levels of recognized achievement under FIDE regulations.",
    example: "GM is higher than IM, and IM is higher than FM.",
    related: ["RATING-027", "RATING-028"],
    source: "FIDE Title Regulations",
    verified: true
  },

  {
    id: "RATING-044",
    type: "RATING",
    category: "Chess Titles",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess title vs rating",
    title: "Is a title the same as a rating?",
    level: "Beginner",
    keywords: ["title", "rating", "difference"],
    questions: [
      "What is the difference between a chess title and rating?",
      "Is GM a rating?"
    ],
    short_answer: "No. A rating is a numerical measure, while a title is an official achievement recognized by FIDE.",
    answer: "A player's rating can change frequently, while a title is normally retained after it is awarded.",
    example: "A GM may have a 2500 rating today and 2400 later while still being a GM.",
    related: ["RATING-001", "RATING-041"],
    source: "FIDE",
    verified: true
  },

  {
    id: "RATING-045",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Professional chess",
    title: "What does it mean to be a professional chess player?",
    level: "Beginner",
    keywords: ["professional chess", "career", "player"],
    questions: [
      "What is a professional chess player?",
      "Can chess be a career?"
    ],
    short_answer: "A professional chess player earns some or most of their income through chess-related activities.",
    answer: "Income can come from playing, coaching, sponsorships, content creation, commentary, events, or other chess work.",
    example: "A player may combine tournament earnings with coaching and online chess content.",
    related: ["RATING-046", "RATING-047"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-046",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess career paths",
    title: "What chess careers are available besides playing?",
    level: "Beginner",
    keywords: ["chess career", "coach", "arbiter", "content"],
    questions: [
      "What careers can I build in chess?",
      "Can I work in chess without being a professional player?"
    ],
    short_answer: "Chess careers include coaching, organizing, arbitration, content creation, commentary, publishing, and technology.",
    answer: "A strong chess career can combine several roles instead of depending only on tournament prizes.",
    example: "A titled player may coach students while creating chess courses and organizing tournaments.",
    related: ["RATING-045", "RATING-047"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-047",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess coaching",
    title: "Can chess coaching be a career?",
    level: "Beginner",
    keywords: ["chess coach", "coaching", "career"],
    questions: [
      "Can I make a career as a chess coach?",
      "Is chess coaching a professional opportunity?"
    ],
    short_answer: "Yes. Coaching can become a professional chess career.",
    answer: "Successful coaches combine chess knowledge with communication, lesson planning, student management, and business skills.",
    example: "A coach can teach private lessons, group classes, online courses, and tournament preparation.",
    related: ["RATING-046", "RATING-048"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-048",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess coaching qualifications",
    title: "Does a coach need a GM title?",
    level: "Intermediate",
    keywords: ["coach", "GM", "qualification"],
    questions: [
      "Do I need to be a Grandmaster to become a chess coach?",
      "Can a non-GM be a good chess coach?"
    ],
    short_answer: "No. A GM title is not a universal requirement for being an effective chess coach.",
    answer: "Coaching quality depends on chess understanding, communication, teaching ability, experience, and the ability to identify student needs.",
    example: "A strong experienced coach can successfully teach beginners and developing players without being a GM.",
    related: ["RATING-047", "TRAIN-067"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "RATING-049",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess content creation",
    title: "Can chess content creation become a career?",
    level: "Beginner",
    keywords: ["chess content", "YouTube", "career"],
    questions: [
      "Can I earn from chess content?",
      "Can chess videos become a career?"
    ],
    short_answer: "Yes. Chess content can become part of a professional career.",
    answer: "Possible models include advertising, memberships, sponsorships, courses, subscriptions, products, and coaching.",
    example: "A chess creator might combine instructional videos with paid courses and coaching.",
    related: ["RATING-046", "RATING-050"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-050",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess technology",
    title: "Can chess technology create career opportunities?",
    level: "Beginner",
    keywords: ["chess technology", "software", "career"],
    questions: [
      "Can I build a career in chess technology?",
      "What opportunities exist in chess software?"
    ],
    short_answer: "Yes. Chess technology creates opportunities in software, platforms, databases, AI, education, and digital tools.",
    answer: "Technical skills combined with chess knowledge can create specialized products and services.",
    example: "A developer can build chess analysis, training, tournament, or educational software.",
    related: ["RATING-046", "TECH-001"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-051",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Tournament organizer",
    title: "Can tournament organizing be a chess career?",
    level: "Beginner",
    keywords: ["organizer", "tournament", "career"],
    questions: [
      "Can I work as a chess tournament organizer?",
      "Is tournament organization a chess career?"
    ],
    short_answer: "Yes. Tournament organization is an important professional role in chess.",
    answer: "Organizers manage registrations, schedules, venues, equipment, officials, communication, and event logistics.",
    example: "A professional organizer can run school, club, state, national, or online chess events.",
    related: ["RATING-046", "TOURNAMENT-001"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-052",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess arbiter",
    title: "Can I become a chess arbiter?",
    level: "Beginner",
    keywords: ["arbiter", "FA", "IA", "career"],
    questions: [
      "How can I become a chess arbiter?",
      "Can arbitration be a chess career?"
    ],
    short_answer: "Yes. FIDE has an official pathway for chess arbiters.",
    answer: "Arbiters can work at tournaments after meeting the relevant qualification and experience requirements.",
    example: "An experienced tournament official may progress through FIDE's arbiter qualification system.",
    related: ["RATING-051", "TOURNAMENT-054"],
    source: "FIDE Arbiters Regulations",
    verified: true
  },

  {
    id: "RATING-053",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess journalism",
    title: "Can chess journalism be a career?",
    level: "Beginner",
    keywords: ["chess journalism", "news", "career"],
    questions: [
      "Can I work as a chess journalist?",
      "What does a chess journalist do?"
    ],
    short_answer: "Yes. Chess journalism covers news, tournaments, interviews, analysis, and chess stories.",
    answer: "Strong writing, chess understanding, research, and accuracy are valuable skills.",
    example: "A chess journalist may report on major tournaments and interview players.",
    related: ["RATING-046", "RATING-049"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-054",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess commentary",
    title: "Can chess commentary be a career?",
    level: "Beginner",
    keywords: ["commentary", "broadcast", "chess"],
    questions: [
      "Can chess commentary become a profession?",
      "What skills does a chess commentator need?"
    ],
    short_answer: "Yes. Commentators combine chess analysis with clear communication and entertainment.",
    answer: "Strong commentators explain ideas, calculate variations, follow the event, and communicate under time pressure.",
    example: "A commentator may explain a grandmaster game live while the audience follows the board.",
    related: ["RATING-046", "RATING-053"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-055",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Sponsorship",
    title: "How can chess players get sponsors?",
    level: "Intermediate",
    keywords: ["sponsorship", "player", "career"],
    questions: [
      "How can a chess player attract sponsors?",
      "What do chess sponsors look for?"
    ],
    short_answer: "Sponsors usually look for value through performance, visibility, audience, reputation, or community impact.",
    answer: "A clear personal brand, professional presentation, strong results, and useful audience reach can improve sponsorship opportunities.",
    example: "A junior player with strong results and an active educational community may attract local sponsors.",
    related: ["RATING-056", "RATING-049"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-056",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Chess brand",
    title: "Why is personal branding useful for a chess player?",
    level: "Intermediate",
    keywords: ["personal brand", "chess career", "visibility"],
    questions: [
      "Why should a chess player build a personal brand?",
      "How can branding help a chess career?"
    ],
    short_answer: "A clear personal brand helps people understand who you are and what you offer.",
    answer: "It can support coaching, sponsorships, content, speaking opportunities, and community building.",
    example: "A player known for instructional endgame content can build an audience around that specialty.",
    related: ["RATING-055", "RATING-057"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-057",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Multiple income streams",
    title: "Should a chess professional have multiple income sources?",
    level: "Intermediate",
    keywords: ["income", "career", "chess professional"],
    questions: [
      "Can a chess professional have multiple income sources?",
      "Why combine different chess careers?"
    ],
    short_answer: "Yes. Combining several chess-related activities can make a career more sustainable.",
    answer: "Playing, coaching, content, events, sponsorships, and digital products can complement each other.",
    example: "A player may earn from tournaments while also coaching and producing educational content.",
    related: ["RATING-045", "RATING-056"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-058",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Career planning",
    title: "How should a young chess player plan a chess career?",
    level: "Intermediate",
    keywords: ["career planning", "junior", "chess"],
    questions: [
      "How should a young player plan a chess career?",
      "What should a junior chess player focus on?"
    ],
    short_answer: "Develop chess strength while building education, communication, discipline, and practical career skills.",
    answer: "Chess success and long-term career planning should support each other rather than forcing an all-or-nothing decision too early.",
    example: "A junior can train seriously while continuing education and gradually exploring coaching or content creation.",
    related: ["RATING-059", "TRAIN-001"],
    source: "Practical chess career guidance",
    verified: true
  },

  {
    id: "RATING-059",
    type: "CAREER",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating goals",
    title: "Should I set a rating goal?",
    level: "Beginner",
    keywords: ["rating goal", "improvement", "training"],
    questions: [
      "Should I set a chess rating target?",
      "Is a rating goal useful?"
    ],
    short_answer: "Yes, if you use it as a long-term direction rather than your only measure of progress.",
    answer: "Combine rating goals with skill goals such as reducing blunders, improving calculation, and strengthening endgames.",
    example: "Instead of only targeting 1800, aim to reach 1800 while improving tactical accuracy and time management.",
    related: ["RATING-011", "TRAIN-008"],
    source: "Practical chess coaching",
    verified: true
  },

  {
    id: "RATING-060",
    type: "RATING",
    category: "Chess Careers",
    topic: "Ratings, Titles & Chess Careers",
    subtopic: "Rating mindset",
    title: "What is the healthiest attitude toward chess rating?",
    level: "Beginner",
    keywords: ["rating mindset", "confidence", "improvement"],
    questions: [
      "How should I think about my chess rating?",
      "Should I worry about every rating point?"
    ],
    short_answer: "Treat rating as feedback, not as your identity.",
    answer: "Use rating trends to measure progress, but focus mainly on improving your decisions and understanding.",
    example: "After losing 30 points, study why the games went wrong instead of defining yourself by the number.",
    related: ["RATING-012", "PSYCH-021"],
    source: "Practical chess coaching",
    verified: true
  }

];

export default ratingsTitlesChessCareers;