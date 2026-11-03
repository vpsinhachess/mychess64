# Bundles index.html + css/js/data + brand images into ONE html file (phones / content:// / offline use).
# Usage: python build.py   ->  ask-chessa-bundle.html
import re,base64,mimetypes,os
rd=lambda p:open(p,encoding="utf8").read()
h=rd("index.html")
h=re.sub(r"<!--SW-->.*?<!--/SW-->","",h,flags=re.S)           # manifest + service worker need http(s), not a single file
def f(m):
    out="<script>\n"+rd(m.group(1))+"\n</script>"
    if m.group(1)=="data/manifest.js":                       # inline your knowledge files too
        for p in re.findall(r'\["([^"]+\.js)"',rd(m.group(1))):
            try: out+="\n<script>\n"+rd(p)+"\n</script>"
            except FileNotFoundError: print("skipped (not found):",p)
    return out
h=re.sub(r'<script src="([^"]+)"></script>',f,h)
def img(m):                                                  # every assets/*.png -> data URI
    p=m.group(0)
    if not os.path.exists(p): return p
    return "data:"+(mimetypes.guess_type(p)[0] or "image/png")+";base64,"+base64.b64encode(open(p,"rb").read()).decode()
h=re.sub(r"assets/[\w.-]+\.png",img,h)
open("ask-chessa-bundle.html","w",encoding="utf8").write(h)
print("Created ask-chessa-bundle.html (%d KB)"%(len(h.encode())//1024))
