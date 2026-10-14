/* ============================================================
   GECKORP / CLIENT-SIDE OPERATIONS GC-JS-004
   The console is monitored. Close the console.
   ============================================================ */

/* ── GECKO MARK (bar construction, from brand guide GC-VIS-001) ── */
const LOGO_RECTS = [
  [502.2,82.9,64.7,24.3],[471,126.2,127.5,28.2],[470,172.8,127.8,27.9],[486.6,219.3,94.7,27.9],
  [642.7,224.8,64,22.3],[362.1,225,64,22.3],[316.9,265.5,434.6,29],[471.4,311.1,124.9,27.9],
  [625.9,313.5,65.1,23.6],[377.5,313.5,64.6,23.4],[456.3,357.1,156.2,27.3],[456.3,402.9,155.9,27.4],
  [456.3,448.8,155.9,27.7],[456.7,494.9,155.1,27.4],[360.8,499.8,63.5,22.2],[643.7,499.8,64,22.2],
  [313.4,540.1,441.7,28.5],[465.9,584.6,137,27.1],[354.3,585.6,62.9,22.2],[651,585.4,63.6,22.5],
  [488.3,629.5,91.9,27.6],[499.2,674.9,70,27.6],[505.1,719.8,58.5,27.6],[509.7,764.5,48.9,27.6],
  [515,808.8,37.5,27.6],[520,853.2,27.6,27.6],[524.4,896.2,18.8,27.6],[527.7,936.9,12.1,27.6]
];
document.querySelectorAll('[data-gecko]').forEach(svg => {
  const ns = 'http://www.w3.org/2000/svg';
  const fill = svg.dataset.geckoFill || '#0b0b0b';
  LOGO_RECTS.forEach(([x, y, w, h]) => {
    const r = document.createElementNS(ns, 'rect');
    r.setAttribute('fill', fill);
    r.setAttribute('x', x); r.setAttribute('y', y);
    r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', 4.6);
    svg.appendChild(r);
  });
});

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* ── TERMINAL ───────────────────────────────────────── */
const term = document.getElementById('term');
if (term) {
  const termOut = document.getElementById('term-out');
  const termIn = document.getElementById('term-in');
  let termOpen = false;
  const BANNER = '<span class="ok">GECKORP MAINFRAME</span> / type <span class="wht">help</span> for available commands\n';

  function openTerm() {
    termOpen = true;
    term.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!termOut.innerHTML) termOut.innerHTML = BANNER;
    setTimeout(() => termIn.focus(), 50);
  }
  function closeTerm() {
    termOpen = false;
    term.classList.remove('open');
    document.body.style.overflow = '';
  }
  function print(html) {
    termOut.innerHTML += html + '\n';
    termOut.scrollTop = termOut.scrollHeight;
  }

  const COMMANDS = {
    help() { return '<span class="wht">AVAILABLE COMMANDS</span>\n' +
      '  help        list commands\n' +
      '  about       the executive file\n' +
      '  whoami      identify yourself\n' +
      '  status      operational status\n' +
      '  doctrine    the five articles\n' +
      '  projects    classified portfolio\n' +
      '  decrypt     decrypt classified file\n' +
      '  gerald      locate the executive\n' +
      '  humidity    ambient conditions\n' +
      '  authority   request authority\n' +
      '  clear       clear the screen\n' +
      '  exit        disconnect'; },
    whoami() { return '<span class="dim">guest</span> / unverified visitor. clearance: <span class="warn">NONE</span>. you are being watched, politely.'; },
    status() { return 'GECKORP OPERATIONAL STATUS: <span class="ok">ACTIVE</span>\n  decisions today ...... <span class="wht">' + (1200 + Math.floor(Math.random() * 99)) + '</span>\n  permissions sought ... <span class="ok">0</span>\n  committees ........... <span class="ok">0</span>\n  headcount ............ <span class="ok">1 (AT CAPACITY)</span>\n  ceiling occupancy .... <span class="warn">1 (UNBOOKED)</span>'; },
    doctrine() { return '<span class="wht">THE GECKORP DOCTRINE</span>\n  I.   Authority does not require permission.\n  II.  Geckorp has already decided.\n  III. The scope is the scope.\n  IV.  There is no committee.\n  V.   Non-compliance is actioned without notice.'; },
    projects() { return '<span class="wht">CLASSIFIED PORTFOLIO</span> <span class="dim">[clearance required, showing redactions]</span>\n  GC-PRJ-001  &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608; consultancy          <span class="ok">DELIVERED</span>\n  GC-PRJ-007  ROBLOX / speed-skating experience  <span class="warn">CLASSIFIED</span>\n  GC-PRJ-009  &#9608;&#9608;&#9608;&#9608; avatar program            <span class="warn">CLASSIFIED</span>\n  <span class="dim">try: decrypt GC-PRJ-007</span>'; },
    about() { return '<span class="wht">EXECUTIVE FILE GC-EMP-001</span>\n  name ......... Gerald Eck\n  offices ...... CEO, CFO, Chief Compliance Officer, Head of Facilities,\n                 Custodian of the Warm Window\n  reports to ... The Board. The Board is Gerald.\n  note ......... the front page is the serious one. this is the real one.'; },
    gerald() { return 'locating the executive...\n<span class="ok">FOUND:</span> near the warm window.\ngerald is in a meeting with gerald. you may leave a message with gerald.'; },
    humidity() { return 'ambient humidity: <span class="ok">OPTIMAL</span>\nthis reading has been optimal since the memo. the memo worked.\ndo not touch the thermostat. the thermostat reports directly to the CEO.'; },
    authority() { return 'AUTHORITY CANNOT BE REQUESTED.\nAUTHORITY IS ASSUMED.\nyou either have it, or you are talking to Geckorp.'; },
    clear() { termOut.innerHTML = ''; return ''; },
    exit() { closeTerm(); return ''; },
    sudo() { return '<span class="warn">nice try.</span> Geckorp does not recognise superusers. there is only gerald.'; },
    ls() { return 'statuts.pdf  rate-card.pdf  nda.pdf  <span class="dim">decisions/</span>  <span class="dim">classified/</span>  <span class="dim">gerald/</span>'; },
    rm() { return '<span class="warn">permission denied.</span> nothing is deleted. everything is remembered.'; },
    gecko() { return '<span class="warn">unrecognised term.</span> there are no geckos at Geckorp. the name is a coincidence. this response was pre-written.'; }
  };
  function decrypt(arg) {
    if (!arg) return 'usage: decrypt <file-id>  /  e.g. decrypt GC-PRJ-007';
    if (arg.toUpperCase() === 'GC-PRJ-007') {
      return '<span class="dim">decrypting GC-PRJ-007...</span>\n<span class="ok">DECRYPTED</span>\n  PROJECT: speed-skating experience / ROBLOX\n  STATUS:  in development\n  NOTE:    three very blocky geckos go very fast.\n  this is the real Geckorp. the consultancy is a cover.';
    }
    return '<span class="warn">decryption failed.</span> insufficient clearance for "' + escapeHtml(arg) + '".';
  }
  function runCmd(raw) {
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const arg = parts.slice(1).join(' ');
    print('<span class="dim">guest@geckorp:~$</span> <span class="wht">' + escapeHtml(raw) + '</span>');
    if (!cmd) return;
    if (cmd === 'decrypt') { print(decrypt(arg)); return; }
    if (COMMANDS[cmd]) { const out = COMMANDS[cmd](); if (out) print(out); }
    else print('<span class="warn">command not found:</span> ' + escapeHtml(cmd) + ' / type <span class="wht">help</span>');
  }
  termIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') { runCmd(termIn.value); termIn.value = ''; }
    else if (e.key === 'Escape') { closeTerm(); }
  });
  addEventListener('keydown', e => {
    if ((e.key === '~' || e.key === '`') && !termOpen) {
      const t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA') return;
      e.preventDefault(); openTerm();
    } else if (e.key === 'Escape' && termOpen) { closeTerm(); }
  });
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kpos = 0;
  addEventListener('keydown', e => {
    if (e.key === KONAMI[kpos] || e.key.toLowerCase() === KONAMI[kpos]) {
      kpos++;
      if (kpos === KONAMI.length) {
        kpos = 0;
        openTerm();
        print('<span class="ok">KONAMI ACCEPTED / OVERRIDE GRANTED / INITIATIVE NOTED IN YOUR FILE</span>');
        print(COMMANDS.projects());
      }
    } else kpos = 0;
  });
}

/* ── CONSOLE NOTICE ─────────────────────────────────── */
console.log(
  '%c GECKORP ' + '%c the console is monitored. close the console. ',
  'background:#0b0b0b;color:#d6ff00;font-weight:bold;padding:4px 8px;',
  'background:#d6ff00;color:#0b0b0b;padding:4px 8px;'
);
