// dream.js <all|mayak|veter|forge|iskra|check> [dir] — komanda Mayaka (Dream Team Squad) v TUI.
// Mehkanika: workspace "Dream Team Squad" -> tab create -> agent start -> tab rename.
// dir (neobyazatelno): rabochaya papka agenta — koren agentstva ili papka proekta.
// Zhivost: herdr agent list (TUI). Dubley ne sozdaet. Author: K.ai (ZCode).
"use strict";
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const WS_LABEL = "Dream Team Squad";
const ROOT = process.env.DREAM_ROOT || process.cwd(); // ili zaday put v etoj stroke
const AGENTS = [
  { name: "mayak", kind: "claude", dir: "agents\\claude", tab: "Маяк · Claude — лид" },
  { name: "veter", kind: "hermes", dir: "agents\\hermes", tab: "Гермес · Hermes — зам" },
  { name: "forge", kind: "opencode", dir: "agents\\opencode", tab: "Forge · OpenCode" },
  { name: "iskra", kind: "grok", dir: "agents\\grok", tab: "Грок · Grok" },
];

function run(args) {
  try {
    return execFileSync("herdr", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 120000 });
  } catch (e) {
    return (e.stdout || "") + (e.stderr || "");
  }
}
function j(out) { try { return JSON.parse(out); } catch { return null; } }

function wsId() {
  const d = j(run(["workspace", "list"]));
  const list = d && d.result && d.result.workspaces || [];
  const hit = list.find((w) => w.label === WS_LABEL);
  if (hit) return hit.workspace_id;
  const c = j(run(["workspace", "create", "--label", WS_LABEL, "--cwd", ROOT]));
  return c && c.result && c.result.workspace ? c.result.workspace.workspace_id : null;
}

function agentsNow() {
  const d = j(run(["agent", "list"]));
  const list = d && d.result && d.result.agents || [];
  const map = {};
  for (const a of list) if (a.name) map[a.name] = a;
  return map;
}

function raise(a, ws, cwdOverride) {
  const cwd = cwdOverride || path.join(ROOT, a.dir);
  if (cwdOverride) {
    // Kartochka komandy edet s agentom: AGENTS.md (+CLAUDE.md) iz papki komandy v papku proekta.
    for (const f of ["AGENTS.md", "CLAUDE.md"]) {
      try { fs.copyFileSync(path.join(ROOT, a.dir, f), path.join(cwdOverride, f)); } catch {}
    }
  }
  const c = j(run(["tab", "create", "--workspace", ws, "--cwd", cwd]));
  const pane = c && c.result && c.result.root_pane ? c.result.root_pane.pane_id : null;
  if (!pane) { console.log("[dream] " + a.name + ": tab create NE udalsya"); return 1; }
  const s = j(run(["agent", "start", a.name, "--kind", a.kind, "--pane", pane, "--timeout", "90000"]));
  const ok = s && s.result && s.result.agent;
  if (!ok) { console.log("[dream] " + a.name + ": agent start NE udalsya (sm. tab v TUI)"); return 1; }
  run(["tab", "rename", ok.tab_id, a.tab]);
  console.log("[dream] " + a.name + ": zapuschen (" + ok.agent_status + ", tab " + ok.tab_id + ", cwd " + cwd + ")");
  return 0;
}

function check() {
  const now = agentsNow();
  for (const a of AGENTS) {
    const hit = now[a.name];
    console.log("[check] " + a.name + " (" + a.kind + "): " + (hit ? hit.agent_status + ", tab " + hit.tab_id : "NET v TUI"));
  }
  return 0;
}

const what = (process.argv[2] || "all").toLowerCase();
const dirArg = process.argv[3] || "";
if (what === "check") process.exit(check());
const ws = wsId();
if (!ws) { console.log("[dream] Workspace ne nayden/sozdan"); process.exit(1); }
const now = agentsNow();
let rc = 0;
for (const a of AGENTS) {
  if (what !== "all" && what !== a.name) continue;
  if (now[a.name]) { console.log("[dream] " + a.name + ": uzhe rabotaet (" + now[a.name].agent_status + ", tab " + now[a.name].tab_id + ")"); continue; }
  rc = raise(a, ws, dirArg ? path.resolve(dirArg) : null) || rc;
}
console.log("[dream] Gotovo. Workspace: " + WS_LABEL + (dirArg ? " · cwd: " + dirArg : ""));
process.exit(rc);
