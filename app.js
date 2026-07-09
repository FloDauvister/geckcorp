/* ============================================================
   GECKCORP / CLIENT-SIDE OPERATIONS GC-JS-002
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

/* ── TICKER ─────────────────────────────────────────── */
const tickerEl = document.getElementById('ticker');
if (tickerEl) {
  const items = [
    'GECK <span class="up">&#9650; 4,882.11</span>',
    'DECISIONS RENDERED TODAY: <span class="up">1,204</span>',
    'PERMISSION REQUESTS FILED: 0',
    'MANDATORY MORALE: <span class="up">100%</span>',
    'AMBIENT HUMIDITY: OPTIMAL',
    'COMMITTEES: <span class="dn">0 (BY DESIGN)</span>',
    'RUMOURS DENIED: ALL',
    'THE CEILING: AVAILABLE (BOOK VIA RECEPTION)'
  ];
  const half = items.join(' &nbsp;///&nbsp; ') + ' &nbsp;///&nbsp; ';
  tickerEl.innerHTML = half + half;
}

/* ── TAPES ──────────────────────────────────────────── */
function fillTape(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  const half = (text + ' /// ').repeat(3);
  el.innerHTML = half + half;
}
fillTape('tape1', 'AUTHORITY DOES NOT REQUIRE PERMISSION <b>///</b> GECKCORP HAS ALREADY DECIDED <b>///</b> THE SCOPE IS THE SCOPE <b>///</b> THERE IS NO COMMITTEE');
fillTape('tape2', 'THANK YOU FOR VISITING GECKCORP <b>///</b> YOUR VISIT HAS BEEN LOGGED FAVOURABLY');
fillTape('tape3', 'GECKCORP IS ALWAYS HIRING <b>///</b> WHETHER YOU APPLIED IS A SEPARATE MATTER');

/* ── LIVE DECISION COUNTER ──────────────────────────── */
const decEl = document.getElementById('decCount');
if (decEl) {
  let dec = 14820;
  setInterval(() => {
    dec += Math.floor(Math.random() * 3);
    decEl.textContent = dec.toLocaleString('en-US');
  }, 2400);
}

/* ── PRESS EXPAND ───────────────────────────────────── */
document.querySelectorAll('.press-head').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('.press-row');
    const open = row.classList.toggle('open');
    btn.querySelector('.press-toggle').textContent = open ? '−' : '+';
  });
});

/* ── COOKIE BANNER ──────────────────────────────────── */
const cookiebar = document.getElementById('cookiebar');
if (cookiebar && !localStorage.getItem('gc-cookies-acknowledged')) {
  setTimeout(() => cookiebar.classList.add('show'), 1800);
  document.getElementById('cookieBtn').addEventListener('click', () => {
    localStorage.setItem('gc-cookies-acknowledged', 'yes');
    cookiebar.querySelector('p').textContent = 'Acknowledgement received. It changes nothing. Thank you.';
    setTimeout(() => cookiebar.classList.remove('show'), 1600);
  });
}

/* ── MODALS ─────────────────────────────────────────── */
function openModal(el) { el.classList.add('show'); }
function closeModal(el) { el.classList.remove('show'); }
document.querySelectorAll('.modal-veil').forEach(veil => {
  veil.addEventListener('click', e => { if (e.target === veil) closeModal(veil); });
  veil.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(veil)));
});
const shBtn = document.getElementById('shareholderBtn');
const shModal = document.getElementById('shareholderModal');
if (shBtn && shModal) shBtn.addEventListener('click', () => openModal(shModal));

/* ── REQUEST AUDIENCE ───────────────────────────────── */
const audForm = document.getElementById('audForm');
if (audForm) {
  const audInput = document.getElementById('audInput');
  const audOut = document.getElementById('audOut');
  const audStatus = document.getElementById('audStatus');
  const REJECTIONS = [
    'Your request has been noted and declined.',
    'GeckCorp has reviewed your submission. The answer is no.',
    'Request acknowledged. Request denied. The two events were simultaneous.',
    'Insufficient authority detected. Submission archived without action.',
    'Your request conflicts with current operational priorities. It has been withdrawn on your behalf.',
    'This matter was decided some time ago. Your input has been filed under Input.',
    'Determination rendered: no. Your understanding is appreciated and not required.',
    'Forwarded to committee. There is no committee. Request closed.'
  ];
  let reqN = 1;
  audForm.addEventListener('submit', e => {
    e.preventDefault();
    const v = audInput.value.trim();
    if (!v) return;
    if (reqN > 3) {
      audOut.innerHTML =
        '<div class="stamp">Limit Reached</div><br>' +
        '<span class="msg">You have exhausted your audience allocation for this fiscal era. The next era has not been scheduled.</span>';
      audInput.value = '';
      return;
    }
    audStatus.textContent = 'PROCESSING';
    audOut.innerHTML = '<span class="ref">&gt; transmitting to the appropriate desk...</span>';
    const ref = 'GC-REQ-' + String(reqN++).padStart(4, '0');
    const msg = REJECTIONS[Math.floor(Math.random() * REJECTIONS.length)];
    setTimeout(() => {
      audOut.innerHTML =
        '<span class="ref">[ ' + ref + ' / DETERMINATION RENDERED IN 0.3s ]</span><br>' +
        '<div class="stamp">Declined</div><br>' +
        '<span class="msg">' + escapeHtml(msg) + '</span>';
      audStatus.textContent = 'CHANNEL OPEN';
      audInput.value = '';
    }, 850);
  });
}

/* ── CAREERS: PRE-DECLINE ENGINE ────────────────────── */
const applyModal = document.getElementById('applyModal');
if (applyModal) {
  let appN = Math.floor(Math.random() * 900) + 100;
  document.querySelectorAll('[data-apply]').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.apply;
      applyModal.querySelector('#applyRole').textContent = role;
      applyModal.querySelector('#applyRef').textContent =
        'REF GC-HR-DECLINE-' + String(appN++).padStart(4, '0') + ' / DETERMINATION FINAL';
      openModal(applyModal);
    });
  });
}

/* ── TERMINAL ───────────────────────────────────────── */
const term = document.getElementById('term');
if (term) {
  const termOut = document.getElementById('term-out');
  const termIn = document.getElementById('term-in');
  let termOpen = false;
  const BANNER = '<span class="ok">GECKCORP MAINFRAME</span> / type <span class="wht">help</span> for available commands\n';

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
      '  whoami      identify yourself\n' +
      '  status      operational status\n' +
      '  doctrine    the five articles\n' +
      '  projects    classified portfolio\n' +
      '  decrypt     decrypt classified file\n' +
      '  humidity    ambient conditions\n' +
      '  authority   request authority\n' +
      '  clear       clear the screen\n' +
      '  exit        disconnect'; },
    whoami() { return '<span class="dim">guest</span> / unverified visitor. clearance: <span class="warn">NONE</span>. you are being watched, politely.'; },
    status() { return 'GECKCORP OPERATIONAL STATUS: <span class="ok">ACTIVE</span>\n  decisions today ...... <span class="wht">' + (1200 + Math.floor(Math.random() * 99)) + '</span>\n  permissions sought ... <span class="ok">0</span>\n  committees ........... <span class="ok">0</span>\n  doubt ................ <span class="ok">0%</span>\n  ceiling occupancy .... <span class="warn">1 (UNBOOKED)</span>'; },
    doctrine() { return '<span class="wht">THE GECKCORP DOCTRINE</span>\n  I.   Authority does not require permission.\n  II.  GeckCorp has already decided.\n  III. The scope is the scope.\n  IV.  There is no committee.\n  V.   Non-compliance is actioned without notice.'; },
    projects() { return '<span class="wht">CLASSIFIED PORTFOLIO</span> <span class="dim">[clearance required, showing redactions]</span>\n  GC-PRJ-001  &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608; consultancy          <span class="ok">DELIVERED</span>\n  GC-PRJ-007  ROBLOX / speed-skating experience  <span class="warn">CLASSIFIED</span>\n  GC-PRJ-009  &#9608;&#9608;&#9608;&#9608; avatar program            <span class="warn">CLASSIFIED</span>\n  <span class="dim">try: decrypt GC-PRJ-007</span>'; },
    humidity() { return 'ambient humidity: <span class="ok">OPTIMAL</span>\nthis reading has been optimal since the memo. the memo worked.\ndo not touch the thermostat. the thermostat reports directly to the CEO.'; },
    authority() { return 'AUTHORITY CANNOT BE REQUESTED.\nAUTHORITY IS ASSUMED.\nyou either have it, or you are talking to GeckCorp.'; },
    clear() { termOut.innerHTML = ''; return ''; },
    exit() { closeTerm(); return ''; },
    sudo() { return '<span class="warn">nice try.</span> GeckCorp does not recognise superusers. there is only GeckCorp.'; },
    ls() { return 'statuts.pdf  rate-card.pdf  nda.pdf  <span class="dim">decisions/</span>  <span class="dim">classified/</span>  <span class="dim">ceiling-bookings/</span>'; },
    rm() { return '<span class="warn">permission denied.</span> nothing is deleted. everything is remembered.'; },
    gecko() { return '<span class="warn">unrecognised term.</span> there are no geckos at GeckCorp. the name is a coincidence. this response was pre-written.'; }
  };
  function decrypt(arg) {
    if (!arg) return 'usage: decrypt <file-id>  /  e.g. decrypt GC-PRJ-007';
    if (arg.toUpperCase() === 'GC-PRJ-007') {
      return '<span class="dim">decrypting GC-PRJ-007...</span>\n<span class="ok">DECRYPTED</span>\n  PROJECT: speed-skating experience / ROBLOX\n  STATUS:  in development\n  NOTE:    three very blocky geckos go very fast.\n  this is the real GeckCorp. the consultancy is a cover.';
    }
    return '<span class="warn">decryption failed.</span> insufficient clearance for "' + escapeHtml(arg) + '".';
  }
  function runCmd(raw) {
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const arg = parts.slice(1).join(' ');
    print('<span class="dim">guest@geckcorp:~$</span> <span class="wht">' + escapeHtml(raw) + '</span>');
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
  '%c GECKCORP ' + '%c the console is monitored. close the console. ',
  'background:#0b0b0b;color:#d6ff00;font-weight:bold;padding:4px 8px;',
  'background:#d6ff00;color:#0b0b0b;padding:4px 8px;'
);
