# Opening Lab batch files

| File | What it is |
|---|---|
| `build_guides.py` | Builds one PDF study guide per opening family (summary, explained main line, key variations with Stockfish evals, coach view, visual tree, memory sheet). |
| `openings_data.json` | 3,865 named opening lines in 150 families (Lichess chess-openings, CC0) plus Stockfish-extended lines for the 25 detailed repertoire openings. |
| `opening_knowledge.json` | Family concepts, plan moves per side, and the expert/coach layer. Edit this to change what the app and PDFs say. |
| `knowledge_ext.py` | Source of the coach layer (merged into the JSON). |
| `openings_db.py` | The 25 detailed repertoire openings (lines, ideas, plans). |
| `pieces/` | Lichess "cburnett" piece SVGs used for diagrams. |

## Rebuild the guides
```
pip install chess reportlab svglib
python build_guides.py                      # 40 biggest families + repertoire families, into ../Opening_Guides
python build_guides.py --family "Sicilian Defense"
python build_guides.py --all                # all 150 families
python build_guides.py --no-engine          # skip Stockfish evaluations
```
Needs a Stockfish binary on PATH (or `--stockfish /path`) for evaluations; fonts: DejaVu (Linux path in the script).

## Sources and licences
Opening names and lines: lichess-org/chess-openings (CC0). Piece artwork: Colin M.L. Burnett "cburnett" set as shipped with Lichess (GPLv2+). In-app engine: stockfish.js 10 (GPLv3). Concept and coach notes were written for this project.
