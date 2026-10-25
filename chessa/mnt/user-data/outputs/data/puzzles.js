/* Mate-in-1 puzzles. fen = position, sol = answer, opts = choices for kids */
window.PUZZLES=[
{title:"Scholar's Mate",fen:"r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",sol:"Qxf7#",opts:["Qxf7#","Qxh7","Bxf7+"],hint:"Look at the f7 pawn. Only the king guards it, and your bishop backs you up.",why:"The queen takes f7, protected by the bishop, and the king has no escape."},
{title:"Fool's Mate",fen:"rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",sol:"Qh4#",opts:["Qh4#","Qf6","Bc5"],hint:"White's king diagonal is wide open. Use your queen!",why:"The queen reaches h4 and the white king cannot hide or block."},
{title:"Back-Rank Mate",fen:"6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",sol:"Rd8#",opts:["Rd8#","Rd7","Kf1"],hint:"The black king is trapped behind its own pawns. Use the rook on the last row.",why:"The black pawns block the king, so the rook check on the back rank is mate."},
{title:"Smothered Mate",fen:"6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",sol:"Nf7#",opts:["Nf7#","Ne6","Nxh7"],hint:"The black king is surrounded by its own pieces. Only a knight can jump in!",why:"The knight checks the king, and its own rook and pawns block every escape."}
];
