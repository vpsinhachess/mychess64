# Bundles index.html + all js/data files into ONE html file (for phones / content:// / offline use).
import re
h=open("index.html",encoding="utf8").read()
rd=lambda p:open(p,encoding="utf8").read()
def f(m):
    out="<script>\n"+rd(m.group(1))+"\n</script>"
    if m.group(1)=="data/manifest.js":  # inline your knowledge files too
        for p in re.findall(r'\["([^"]+\.js)"',rd(m.group(1))):
            try: out+="\n<script>\n"+rd(p)+"\n</script>"
            except FileNotFoundError: print("skipped (not found):",p)
    return out
open("ask-chessa-bundle.html","w",encoding="utf8").write(re.sub(r'<script src="([^"]+)"></script>',f,h))
print("Created ask-chessa-bundle.html")
