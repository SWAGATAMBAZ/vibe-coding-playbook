/* Vibe Coding Playbook — shared behaviour: sidebar, progress, code blocks, tabs, filters */
(function () {
  const PAGES = [
    { id: "index", file: "index.html", title: "Start here & 4-week roadmap", group: "Start" },
    { id: "interview", file: "interview.html", title: "Ace the vibe coding interview", group: "Interview" },
    { id: "practice", file: "practice.html", title: "45-min drill & 40 mock prompts", group: "Interview" },
    { id: "prompts", file: "prompts.html", title: "Prompt library (copy-paste)", group: "Interview" },
    { id: "claude-code", file: "claude-code.html", title: "Claude Code essentials", group: "Claude Code" },
    { id: "skills", file: "skills.html", title: "The skill stack: one per task", group: "Claude Code" },
    { id: "mcp", file: "mcp.html", title: "MCP & connectors", group: "Claude Code" },
    { id: "sdd", file: "sdd.html", title: "Spec-driven development", group: "Claude Code" },
    { id: "starter", file: "starter.html", title: "Starter kit: commands, hooks, CLAUDE.md", group: "Claude Code" },
    { id: "stack", file: "stack.html", title: "Frontend, backend & deploy", group: "Build" },
    { id: "system-design", file: "system-design.html", title: "System design & API gateway", group: "Build" },
    { id: "databases", file: "databases.html", title: "Which database when?", group: "Build" },
    { id: "agents", file: "agents.html", title: "AI agents: n8n, LangGraph, Agent SDK", group: "Build" },
    { id: "security", file: "security.html", title: "Ship safely: review, test, secure", group: "Build" },
    { id: "personalization", file: "personalization.html", title: "Worked example: AI personalization tracker", group: "Solutions" },
    { id: "blueprints", file: "blueprints.html", title: "18 solution blueprints by industry", group: "Solutions" },
    { id: "cheatsheet", file: "cheatsheet.html", title: "One-page cheat sheet & sources", group: "Reference" },
  ];
  window.VCP_PAGES = PAGES;
  const SISTERS = [
    ["Deep Learning Playbook", "https://swagatambaz.github.io/deep-learning-playbook/"],
    ["ML Interview Playbook", "https://swagatambaz.github.io/ml-interview-playbook/"],
    ["DSA Playbook", "https://swagatambaz.github.io/dsa-playbook/"],
    ["SQL Interview Lab", "https://swagatambaz.github.io/sql-interview-lab/"],
  ];

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  window.VCP_STORE = store;

  const theme = store.get("vcp-theme", null) || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function buildSidebar(current) {
    const done = store.get("vcp-done", {});
    const aside = document.createElement("aside");
    aside.className = "sidebar";
    let html = `<a class="brand" href="index.html"><span class="logo">✦</span>Vibe Coding Playbook</a>
      <div class="brand-sub">Claude Code for AI PMs · interview → production</div>
      <div class="progress-bar"><span id="pbar"></span></div><div class="progress-label" id="plabel"></div><nav class="nav">`;
    let g = "";
    PAGES.forEach((p, i) => {
      if (p.group !== g) { g = p.group; html += `<div class="nav-group">${g}</div>`; }
      html += `<a href="${p.file}" class="${p.id === current ? "active" : ""} ${done[p.id] ? "done" : ""}" data-id="${p.id}"><span class="num"><span>${String(i).padStart(2, "0")}</span></span>${p.title}</a>`;
    });
    html += `</nav><div class="side-tools"><button class="btn small" id="themeBtn">◐ Theme</button><button class="btn small" id="resetBtn">Reset progress</button></div>
      <div class="sisters"><div class="nav-group" style="margin-left:0">Sister playbooks</div>${SISTERS.map(s => `<a href="${s[1]}">${s[0]} ↗</a>`).join("")}</div>`;
    aside.innerHTML = html;
    return aside;
  }

  function updateProgress() {
    const d = store.get("vcp-done", {});
    const n = PAGES.filter(p => d[p.id]).length;
    const pct = Math.round((n / PAGES.length) * 100);
    const bar = document.getElementById("pbar"); if (bar) bar.style.width = pct + "%";
    const lab = document.getElementById("plabel"); if (lab) lab.textContent = `${n} of ${PAGES.length} pages done · ${pct}%`;
    document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("done", !!d[a.dataset.id]));
    document.querySelectorAll("[data-step]").forEach(s => s.classList.toggle("done", !!d[s.dataset.step]));
  }

  // tiny multi-language highlighter (bash, python, js/ts, json, markdown-ish)
  const KW = new Set(("def class return if elif else for while in not and or import from as with try except finally raise lambda yield None True False pass async await " +
    "const let var function export default new typeof interface type extends implements null undefined true false then fi do done echo case esac public private").split(" "));
  function highlight(src, lang) {
    if (lang === "text" || lang === "md") return esc(src).replace(/^(#{1,4} .*)$/gm, '<span class="tok-k">$1</span>');
    const re = /("""[\s\S]*?"""|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\/\/[^\n]*|(?:^|\s)#[^\n]*|--[^\n]*|\$\{?[A-Za-z_][A-Za-z0-9_]*\}?|\b\d+\.?\d*\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/gm;
    let out = "", last = 0, m;
    while ((m = re.exec(src))) {
      let t = m[0], idx = m.index;
      if (/^\s#/.test(t)) { out += esc(src.slice(last, idx + 1)); t = t.slice(1); idx += 1; } else out += esc(src.slice(last, idx));
      let cls = null;
      if (t[0] === "#" || t.startsWith("//")) cls = "c";
      else if (t.startsWith("--") && lang === "sql") cls = "c";
      else if (t.startsWith("--")) cls = null;
      else if ("\"'`".includes(t[0])) cls = "s";
      else if (t[0] === "$") cls = "v";
      else if (/^\d/.test(t)) cls = "n";
      else if (KW.has(t) || (lang === "sql" && /^(SELECT|FROM|WHERE|CREATE|TABLE|INSERT|INTO|VALUES|PRIMARY|KEY|REFERENCES|NOT|NULL|DEFAULT|INDEX|ON|USING|ALTER|ENABLE|ROW|LEVEL|SECURITY|POLICY|FOR|TO|UNIQUE|JOIN|GROUP|BY|ORDER|LIMIT|AND|OR|AS|EXTENSION|IF|EXISTS|WITH|CHECK)$/.test(t))) cls = "k";
      else if (src[re.lastIndex] === "(") cls = "f";
      out += cls ? `<span class="tok-${cls}">${esc(t)}</span>` : esc(t);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  function dedent(s) {
    s = s.replace(/^\n+|\s+$/g, "");
    const lines = s.split("\n");
    const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
    return lines.map(l => l.slice(ind)).join("\n");
  }
  function buildCode(root) {
    (root || document).querySelectorAll('script[type="text/plain"].snippet').forEach(sc => {
      const src = dedent(sc.textContent);
      const wrap = document.createElement("div");
      wrap.className = "code";
      wrap.innerHTML = `<div class="code-head"><span>${esc(sc.dataset.title || sc.dataset.lang || "code")}</span><button class="copy">Copy</button></div><pre><code>${highlight(src, sc.dataset.lang)}</code></pre>`;
      wrap.querySelector(".copy").addEventListener("click", e => copyText(src, e.currentTarget));
      sc.replaceWith(wrap);
    });
  }
  function copyText(txt, b) {
    const ok = () => { const o = b.textContent; b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = o === "Copied ✓" ? "Copy" : o), 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, () => { fallback(txt); ok(); }); else { fallback(txt); ok(); }
  }
  function fallback(txt) { const t = document.createElement("textarea"); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); }
  window.VCP_copy = copyText; window.VCP_buildCode = buildCode; window.VCP_highlight = highlight; window.VCP_esc = esc;

  function buildTabs() {
    document.querySelectorAll("[data-tabs]").forEach(root => {
      const btns = root.querySelectorAll(":scope > .tabs button");
      const panels = root.querySelectorAll(":scope > .tab-panel");
      btns.forEach((b, i) => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("on")); panels.forEach(x => x.classList.remove("on"));
        b.classList.add("on"); panels[i].classList.add("on");
      }));
      if (btns[0]) { btns[0].classList.add("on"); panels[0].classList.add("on"); }
    });
  }
  function buildFilters() {
    document.querySelectorAll("[data-filter]").forEach(inp => {
      const target = document.querySelector(inp.dataset.filter);
      inp.addEventListener("input", () => {
        const q = inp.value.toLowerCase().trim();
        target.querySelectorAll("[data-row]").forEach(r => { r.style.display = !q || r.textContent.toLowerCase().includes(q) ? "" : "none"; });
      });
    });
  }
  function buildToc() {
    const toc = document.querySelector(".toc[data-auto]");
    if (!toc) return;
    const hs = document.querySelectorAll("main h2[id]");
    toc.innerHTML = "<b>On this page:</b> " + [...hs].map(h => `<a href="#${h.id}">${h.textContent}</a>`).join("");
  }
  function buildFoot(current) {
    const main = document.querySelector("main");
    const i = PAGES.findIndex(p => p.id === current);
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    const d = store.get("vcp-done", {});
    const foot = document.createElement("div");
    foot.className = "page-foot";
    foot.innerHTML = `${prev ? `<a class="btn" href="${prev.file}">← ${prev.title}</a>` : "<span></span>"}
      <button class="btn done-btn ${d[current] ? "on" : ""}" id="doneBtn">${d[current] ? "✓ Done" : "Mark this page done"}</button>
      ${next ? `<a class="btn primary" href="${next.file}">${next.title} →</a>` : "<span></span>"}`;
    main.appendChild(foot);
    foot.querySelector("#doneBtn").addEventListener("click", e => {
      const dd = store.get("vcp-done", {}); dd[current] = !dd[current]; store.set("vcp-done", dd);
      e.currentTarget.classList.toggle("on", dd[current]); e.currentTarget.textContent = dd[current] ? "✓ Done" : "Mark this page done";
      updateProgress();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const current = document.body.dataset.page || "index";
    const main = document.querySelector("main");
    const layout = document.createElement("div"); layout.className = "layout";
    const aside = buildSidebar(current);
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(aside); layout.appendChild(main);
    const mb = document.createElement("button"); mb.className = "btn menu-btn"; mb.textContent = "☰ Menu";
    mb.addEventListener("click", () => aside.classList.toggle("open")); document.body.appendChild(mb);
    document.getElementById("themeBtn").addEventListener("click", () => {
      const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", t); store.set("vcp-theme", t);
    });
    document.getElementById("resetBtn").addEventListener("click", () => { if (confirm("Reset all progress?")) { store.set("vcp-done", {}); location.reload(); } });
    buildCode(); buildTabs(); buildFilters(); buildToc(); buildFoot(current); updateProgress();
    document.dispatchEvent(new Event("vcp:ready"));
  });
})();
