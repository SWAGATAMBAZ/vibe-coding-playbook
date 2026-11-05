"""Builds starter.html by inlining the real starter-kit files, so the page and the files never drift."""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
KIT = ROOT / "starter-kit"
src = (ROOT / "tools" / "starter.src.html").read_text()


def inline(m):
    rel, lang = m.group(1), m.group(2)
    body = (KIT / rel).read_text()
    assert "</script" not in body.lower(), rel
    return f'<script type="text/plain" class="snippet" data-lang="{lang}" data-title="{rel}">\n{body}</script>'


out = re.sub(r"\{\{FILE:([^|}]+)\|(\w+)\}\}", inline, src)
(ROOT / "starter.html").write_text(out)
print("starter.html built")
