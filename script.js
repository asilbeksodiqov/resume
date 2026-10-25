/* =====================================================================
   RESUME — video uslubidagi sahifa
   1) RESUME obyektini o‘zingizning ma’lumotlaringiz bilan to‘ldiring
   2) Qolgani (sahnalar, animatsiya, boshqaruv) avtomatik yig‘iladi
   ===================================================================== */

const RESUME = {
  name:     'Asilbek Sodiqov',
  role:     'Data Analyst',
  roleSub:  'Ehtirom Plus',
  kicker:   'Resume — 2026',
  location: '',                       // shahar (hozircha ko‘rsatilmagan)
  status:   'Ehtirom Plus mikromoliya tashkiloti',
  photo:    '1777783195777.png',                       // masalan: 'me.jpg' (bo‘sh qolsa — bosh harflar chiqadi)

  about: 'Tashkilotdagi qo‘lda bajariladigan hisobotlarni *avtomatlashtiraman*: Telegram botlar, desktop dasturlar va xatolarni avtomatik nazorat qiluvchi tizimlar yarataman.',
  stats: [
    { text: 'O‘nlab', label: 'Python bilan avtomatlashtirilgan hisobot' },
    { n: 17,         label: 'filial bo‘yicha ishlaydigan dastur' },
    { n: 4,          label: 'ichki loyiha' }
  ],

  // from / to — yil. to: 'now' — hozirgacha
  timeline: [
    { type: 'Ish',   role: 'Data Analyst',          company: 'Ehtirom Plus · mikromoliya tashkiloti', from: 2025, to: 'now', desc: 'Hisobotlarni avtomatlashtirish, ichki tizim va dasturlar yaratish.' },
    { type: 'Ta’lim', role: 'Huquq yo‘nalishi talabasi', company: 'Qo‘qon davlat universiteti',     from: 2021, to: 2025 }
  ],

  // kind: rings | bars | morph | dots
  projects: [
    { title: 'Ehtirom Plus Reports', desc: 'Buxgalteriya hujjatlarini filiallardan yig‘adi va tegishli xodim tekshiruviga yuboradi. Xatolar bo‘yicha avtomatik hisobot va reyting shakllantiradi.', tags: 'Hisobot · Reyting', badge: 'Maxfiy havola', kind: 'bars' },
    { title: 'Ehtirom Plus DA',      desc: 'Tashkilotdagi qo‘lda bajariladigan hisobotlarni avtomatlashtirib boruvchi Telegram bot. O‘nlab hisobot Python orqali avtomatlashtirilgan.', tags: 'Telegram bot · Python', badge: 'Maxfiy havola', kind: 'dots' },
    { title: 'Qo‘mita',              desc: 'Kelib tushgan kredit arizalari asosida avtomatik bayonnoma shakllantiradi, rad etilganlarni qora ro‘yxatga qo‘shadi. 17 ta filial bo‘yicha ishlaydi.', tags: 'Desktop dastur', badge: 'Desktop', kind: 'morph' },
    { title: 'UNID',                 desc: 'Yuz orqali tanib oladigan loyiha.', tags: 'Desktop dastur · Yuzni aniqlash', badge: 'Desktop', kind: 'rings' }
  ],

  tools: [],
  skills: [],

  extra: {
    courses:   [{ title: 'Kompyuter savodxonligi', place: 'Kurs' }],
    languages: [{ name: 'Ingliz tili', level: 'Yaxshi' }],
    other:     [{ title: 'Harbiy guvohnoma', place: 'Mavjud' }]
  },

  contact: {
    email: '',
    phone: '+998 94 703 08 06',
    links: []
  }
};

/* =====================================================================
   YORDAMCHILAR
   ===================================================================== */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad2 = (n) => String(n).padStart(2, '0');

// matn -> so‘zma-so‘z ochiladigan span'lar. *so‘z* — urg‘u (accent rang)
function words(text, base = 0) {
  return String(text).split(' ').map((raw, k) => {
    const m = raw.match(/^\*(.+?)\*(.*)$/);
    const w = m ? m[1] + m[2] : raw;
    return `<span class="w"><i${m ? ' class="hl"' : ''} style="--d:${base + k * 55}">${esc(w)}</i></span> `;
  }).join('');
}
// sarlavha: har bir harf alohida maska ortidan ko‘tariladi
function chars(text) {
  return text.trim().split(/\s+/).map((w, li) =>
    `<span class="line" aria-hidden="true">${[...w].map((c, k) =>
      `<span class="mask ch"><span style="--d:${li * 170 + k * 42}">${esc(c)}</span></span>`).join('')}</span>`
  ).join('');
}
const mask = (t, d = 0) => `<span class="mask"><span style="--d:${d}">${esc(t)}</span></span>`;
const head = (title, right) => `
  <div class="head">
    <h2>${mask(title)}</h2>
    <p class="mono rv" style="--d:150">${esc(right)}</p>
  </div>`;
const arrowSvg = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 15L15 5M7 5h8v8"/></svg>';

const NOW_Y = (() => { const d = new Date(); return d.getFullYear() + d.getMonth() / 12; })();

/* =====================================================================
   SAHNALAR
   ===================================================================== */
function sceneIntro(d) {
  const initials = d.name.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const orbInner = d.photo ? `<img src="${esc(d.photo)}" alt="${esc(d.name)}">` : `<b>${esc(initials)}</b>`;
  return {
    name: 'Kirish', dur: 7500, theme: 't-paper',
    html: `
    <div class="spot" id="spot"></div>
    <div class="art">
      <div class="orb-pos">
        <div class="px" data-depth="16"><div class="pop" style="--d:150"><div class="orb">${orbInner}</div></div></div>
        <div class="px" data-depth="34"><div class="pop" style="--d:520"><div class="ring"></div></div></div>
        <div class="px" data-depth="-28"><div class="pop" style="--d:720"><div class="half"></div></div></div>
        <div class="px" data-depth="46"><div class="pop" style="--d:880"><div class="dotc"></div><div class="cross"></div></div></div>
      </div>
      <div class="ground rv" style="--d:900"><div class="ball-wrap"><div class="shadow"></div><div class="ball"></div></div></div>
    </div>
    <div class="scroller"><div class="frame">
      <div class="kicker rv">${esc(d.kicker)}</div>
      <h1 class="name" aria-label="${esc(d.name)}">${chars(d.name)}</h1>
      <p class="role rv" style="--d:520">${esc(d.role)}${d.roleSub ? ` <em>/</em> ${esc(d.roleSub)}` : ''}</p>
      <div class="badges mono rv" style="--d:680">
        ${d.location ? `<span>${esc(d.location)}</span>` : ''}
        ${d.status ? `<span><i class="live"></i>${esc(d.status)}</span>` : ''}
      </div>
    </div></div>`
  };
}

function sceneAbout(d) {
  const stats = d.stats.map((s, i) => `
    <div class="stat draw" style="--d:${1000 + i * 120}">
      <div class="num">${s.text ? `<span>${esc(s.text)}</span>` : `<span data-count="${s.n}">0</span>`}${s.plus ? '<sup>+</sup>' : (s.suffix ? `<sup>${esc(s.suffix)}</sup>` : '')}</div>
      <span class="mono rv">${esc(s.label)}</span>
    </div>`).join('');
  return {
    name: 'Profil', dur: 9000, theme: 't-sun',
    html: `
    <div class="art"><div class="star rv" style="--d:900"><div class="px" data-depth="22">
      <svg viewBox="0 0 100 100"><path d="M50 5V95M5 50H95M18 18L82 82M82 18L18 82"/></svg>
    </div></div></div>
    <div class="scroller"><div class="frame">
      <div class="kicker rv">01 — Profil</div>
      <p class="statement">${words(d.about, 250)}</p>
      <div class="stats" style="--cols:${d.stats.length}">${stats}</div>
    </div></div>`
  };
}

function sceneExperience(d) {
  const ex = d.timeline;
  const toN = (v) => (v === 'now' || v == null ? NOW_Y : v);
  const minY = Math.floor(Math.min(...ex.map((e) => e.from)));
  const maxY = Math.ceil(Math.max(...ex.map((e) => toN(e.to))));
  const n = Math.max(1, maxY - minY);
  const step = n > 8 ? 2 : 1;
  const ticks = Array.from({ length: n + 1 }, (_, i) => i)
    .filter((i) => i % step === 0 || i === n)
    .map((i) => `<span style="left:${(i / n * 100).toFixed(2)}%">${minY + i}</span>`).join('');
  const colors = [['var(--orange)', ''], ['var(--cobalt)', 'dk'], ['var(--sun)', '']];
  const rows = ex.map((e, i) => {
    const from = e.from, to = toN(e.to);
    const l = ((from - minY) / n * 100).toFixed(2), w = (Math.max(.15, to - from) / n * 100).toFixed(2);
    const [c, dk] = colors[i % colors.length];
    const period = `${Math.floor(from)} — ${e.to === 'now' || e.to == null ? 'Hozir' : Math.floor(to)}`;
    return `
    <div class="row draw" style="--d:${300 + i * 140}">
      <span class="idx rv">${pad2(i + 1)}</span>
      <div class="title">${mask(e.role)}<span class="co rv">${esc(e.type)} · ${esc(e.company)}</span>${e.desc ? `<small class="rv">${esc(e.desc)}</small>` : ''}</div>
      <div class="lane" style="--n:${n}"><div class="lbar ${dk}" style="--l:${l}%;--w:${w}%;--c:${c}"><span>${esc(period)}</span></div></div>
    </div>`;
  }).join('');
  return {
    name: 'Tajriba', dur: 8500, theme: 't-paper',
    html: `<div class="scroller"><div class="frame">
      ${head('Tajriba va ta’lim', 'ish · o‘qish')}
      <div class="axis rv" style="--d:200"><div class="years mono">${ticks}</div></div>
      ${rows}
    </div></div>`
  };
}

function sceneProjects(d) {
  const art = (p) => {
    if (p.video) return `<video src="${esc(p.video)}" autoplay muted loop playsinline></video>`;
    if (p.image) return `<img src="${esc(p.image)}" alt="${esc(p.title)}">`;
    const make = (cnt) => Array.from({ length: cnt }, (_, i) => `<i style="--i:${i}"></i>`).join('');
    return { rings: make(4), bars: make(9), morph: make(2), dots: make(25) }[p.kind] || make(4);
  };
  const cards = d.projects.map((p, i) => {
    const real = p.link && p.link !== '#';
    return `
    <a class="card" href="${esc(p.link || '#')}" ${real ? 'target="_blank" rel="noopener"' : ''} style="--d:${350 + i * 150}">
      <div class="thumb k-${esc(p.kind || 'rings')}">
        <span class="tag-i">${pad2(i + 1)}</span>
        <div class="stage">${art(p)}</div>
        ${p.badge ? `<span class="dur">${esc(p.badge)}</span>` : ''}
      </div>
      <div class="meta">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <span class="mono">${esc(p.tags)}</span>
      </div>
    </a>`;
  }).join('');
  return {
    name: 'Loyihalar', dur: 11000, theme: 't-cream',
    html: `<div class="scroller"><div class="frame">
      ${head('Tanlangan loyihalar', `${pad2(d.projects.length)} loyiha`)}
      <div class="cards">${cards}</div>
    </div></div>`
  };
}

function sceneSkills(d) {
  if (!d.tools.length && !d.skills.length) return null;
  const tools = d.tools.map((t, i) => `
    <div class="tool draw" style="--d:${300 + i * 90}">
      <span class="nm">${mask(t.name)}</span>
      <div class="bar"><div class="fill" style="--v:${t.level / 100}"></div></div>
      <span class="pc rv"><b data-count="${t.level}" style="font-weight:400">0</b>%</span>
    </div>`).join('');
  const skills = d.skills.map((s, i) => `
    <div class="skill draw" style="--d:${350 + i * 100}">
      <span class="idx rv">${pad2(i + 1)}</span>
      <span class="sk">${mask(s)}</span>
    </div>`).join('');
  return {
    name: 'Ko‘nikmalar', dur: 8500, theme: 't-sky',
    html: `<div class="scroller"><div class="frame">
      ${head('Ko‘nikmalar', 'asboblar & mahorat')}
      <div class="cols2">
        <div><h3 class="rv">Dasturlar</h3>${tools}</div>
        <div><h3 class="rv">Mahorat</h3>${skills}</div>
      </div>
    </div></div>`
  };
}

function sceneEdu(d) {
  const x = d.extra || {};
  const item = (t, p, i) => `
    <div class="item draw" style="--d:${350 + i * 120}">
      <h4>${mask(t)}</h4>${p ? `<p class="rv">${esc(p)}</p>` : ''}
    </div>`;
  const cols = [
    ['Kurslar',   (x.courses || []).map((c, i) => item(c.title, c.place, i))],
    ['Tillar',    (x.languages || []).map((l, i) => item(l.name, l.level, i))],
    ['Qo‘shimcha', (x.other || []).map((o, i) => item(o.title, o.place, i))]
  ].filter(([, a]) => a.length);
  if (!cols.length) return null;
  return {
    name: 'Qo‘shimcha', dur: 6500, theme: 't-sky',
    html: `<div class="scroller"><div class="frame">
      ${head('Qo‘shimcha', 'kurs · til · guvohnoma')}
      <div class="cols3" style="--cols:${cols.length}">
        ${cols.map(([t, a]) => `<div><h3 class="rv">${t}</h3>${a.join('')}</div>`).join('')}
      </div>
    </div></div>`
  };
}

function sceneContact(d) {
  const c = d.contact;
  const tel = 'tel:' + String(c.phone).replace(/[^\d+]/g, '');
  const primary = c.email ? { href: 'mailto:' + c.email, text: c.email } : { href: tel, text: c.phone };
  const list = [...(c.email && c.phone ? [{ label: c.phone, url: tel }] : []), ...(c.links || [])];
  const links = list.map((l) => `<a class="mono" href="${esc(l.url)}" ${/^https?:/.test(l.url) ? 'target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>`).join('');
  return {
    name: 'Aloqa', dur: 8000, theme: 't-orange',
    html: `
    <div class="art"><div class="sunrise"></div></div>
    <div class="scroller"><div class="frame contact">
      <div class="contact-main">
        <h3>
          <span class="mask"><span style="--d:0">Keling, birga</span></span>
          <span class="mask"><span style="--d:130"><em>ishlaymiz.</em></span></span>
        </h3>
        <a class="mail rv" href="${esc(primary.href)}" style="--d:350"><span>${esc(primary.text)}</span>${arrowSvg}</a>
        ${links ? `<div class="links rv" style="--d:480">${links}</div>` : ''}
      </div>
      <footer class="foot mono rv" style="--d:600">
        <span>© ${new Date().getFullYear()} ${esc(d.name)}</span>
        <span>Ko‘rganingiz uchun rahmat</span>
      </footer>
    </div></div>`
  };
}

/* =====================================================================
   YIG‘ISH
   ===================================================================== */
const builders = [sceneIntro, sceneAbout, sceneExperience, sceneProjects, sceneSkills, sceneEdu, sceneContact];
const defs = builders.map((b) => b(RESUME)).filter(Boolean);
const N = defs.length;
const starts = defs.reduce((a, s, i) => (a.push(i ? a[i - 1] + defs[i - 1].dur : 0), a), []);
const TOTAL = starts[N - 1] + defs[N - 1].dur;

const stage = $('#stage');
stage.innerHTML = defs.map((s, i) =>
  `<section class="scene s${i} ${s.theme} ${i === 0 ? 'is-active' : 'is-after'}" id="s${i}" style="z-index:${10 + i}" aria-label="${esc(s.name)}">${s.html}</section>`
).join('');
const scenes = $$('.scene');

document.title = `${RESUME.name} — ${RESUME.role} · Resume`;
$('#hName').textContent = RESUME.name;
$('#hRole').textContent = RESUME.role + ' · Resume';

const track = $('#track');
track.innerHTML = defs.map((s, i) =>
  `<button class="seg" type="button" style="flex-grow:${s.dur}" aria-label="${pad2(i + 1)} ${esc(s.name)}"><b>${pad2(i + 1)} ${esc(s.name)}</b><i></i></button>`
).join('');
const segs = $$('.seg', track);
segs.forEach((b, i) => b.addEventListener('click', () => goTo(i)));

/* =====================================================================
   PLEYER
   ===================================================================== */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

let cur = 0, busy = false, started = false, playing = !reduce, ended = false;
let elapsed = 0, last = performance.now(), hold = 0;
const TRANSITION = 1300;

const pp = $('#pp'), sceneName = $('#sceneName'), cnum = $('#cnum'), tc = $('#tc');
const tcMain = tc.firstChild, tcFr = tc.lastElementChild;

function setPP() {
  const s = ended ? 'replay' : (playing ? 'pause' : 'play');
  pp.dataset.s = s;
  pp.setAttribute('aria-label', { play: 'Davom ettirish', pause: 'Pauza', replay: 'Boshidan ko‘rish' }[s]);
  document.body.classList.toggle('is-paused', !playing);
}

function update() {
  scenes.forEach((sc, i) => {
    sc.classList.toggle('is-active', i === cur);
    sc.classList.toggle('is-before', i < cur);
    sc.classList.toggle('is-after', i > cur);
    sc.toggleAttribute('inert', i !== cur);
  });
  segs.forEach((b, i) => b.classList.toggle('on', i === cur));
  sceneName.textContent = defs[cur].name;
  cnum.textContent = `${pad2(cur + 1)}/${pad2(N)}`;
}

function replayScene(sc) {
  sc.classList.add('reset');
  void sc.offsetWidth;
  requestAnimationFrame(() => requestAnimationFrame(() => sc.classList.remove('reset')));
}

function runCounters(sc) {
  $$('[data-count]', sc).forEach((el) => {
    const to = +el.dataset.count, tk = (el._tk = (el._tk || 0) + 1);
    el.textContent = '0';
    setTimeout(() => {
      const t0 = performance.now(), D = 1700;
      const step = (t) => {
        if (el._tk !== tk) return;
        const p = Math.min(1, (t - t0) / D);
        el.textContent = Math.round(to * (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 1000);
  });
}

function goTo(n, auto) {
  n = Math.max(0, Math.min(N - 1, n));
  if (busy) return false;
  const prev = cur;
  if (n === cur) {
    if (auto) return false;
    replayScene(scenes[cur]); runCounters(scenes[cur]);
  } else {
    cur = n; busy = true; update();
    if (n < prev) replayScene(scenes[n]);
    runCounters(scenes[n]);
    setTimeout(() => { busy = false; }, TRANSITION);
  }
  elapsed = 0;
  if (ended) { ended = false; playing = true; }
  setPP();
  return true;
}

function togglePlay() {
  if (ended) { goTo(0); return; }
  playing = !playing;
  setPP();
}

pp.addEventListener('click', togglePlay);
$('#printBtn').addEventListener('click', () => window.print());

/* ---------- boshqaruv: g‘ildirak, touch, klaviatura ---------- */
const scrollerOf = () => scenes[cur].querySelector('.scroller');
function canInnerScroll(dir) {
  const sc = scrollerOf();
  if (!sc) return false;
  const max = sc.scrollHeight - sc.clientHeight;
  if (max <= 2) return false;
  return dir > 0 ? sc.scrollTop < max - 2 : sc.scrollTop > 2;
}
stage.addEventListener('scroll', () => { hold = performance.now() + 4000; }, true);

let lastWheel = 0, handled = false;
addEventListener('wheel', (e) => {
  if (e.ctrlKey) return;
  const dir = Math.sign(e.deltaY);
  if (!dir || Math.abs(e.deltaY) < 6) return;
  if (canInnerScroll(dir)) return;
  e.preventDefault();
  const now = performance.now();
  if (now - lastWheel > 200) handled = false;
  lastWheel = now;
  if (handled) return;
  handled = true;
  if (busy) return;
  goTo(cur + dir);
}, { passive: false });

let ty0 = 0, top0 = 0;
addEventListener('touchstart', (e) => {
  ty0 = e.touches[0].clientY;
  const sc = scrollerOf(); top0 = sc ? sc.scrollTop : 0;
}, { passive: true });
addEventListener('touchend', (e) => {
  const dy = ty0 - e.changedTouches[0].clientY;
  if (Math.abs(dy) < 48) return;
  const sc = scrollerOf();
  if (sc && Math.abs(sc.scrollTop - top0) > 2) return;
  const dir = dy > 0 ? 1 : -1;
  if (canInnerScroll(dir)) return;
  goTo(cur + dir);
}, { passive: true });

addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === ' ' || k === 'k' || k === 'K') { e.preventDefault(); togglePlay(); }
  else if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); goTo(cur + 1); }
  else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); goTo(cur - 1); }
  else if (k === 'Home' || k === 'r' || k === 'R') { e.preventDefault(); goTo(0); }
  else if (k === 'End') { e.preventDefault(); goTo(N - 1); }
});
$$('.card').forEach((a) => a.addEventListener('click', (e) => { if (a.getAttribute('href') === '#') e.preventDefault(); }));
$$('.links a').forEach((a) => a.addEventListener('click', (e) => { if (a.getAttribute('href') === '#') e.preventDefault(); }));

/* ---------- chop etish / PDF ---------- */
addEventListener('beforeprint', () => {
  playing = false; setPP();
  $$('[data-count]').forEach((el) => { el._tk = (el._tk || 0) + 1; el.textContent = el.dataset.count; });
});

/* =====================================================================
   ASOSIY SIKL: taymer, HUD, parallaks, kursor
   ===================================================================== */
const pxEls = $$('.px').map((el) => ({ el, d: +el.dataset.depth || 0, x: 0, y: 0 }));
const spot = $('#spot');
const curDot = $('#curDot'), curRing = $('#curRing'), ring = $('#ring');
let W = innerWidth, H = innerHeight;
let mx = W / 2, my = H / 2, rx = mx, ry = my, seen = false, lastTc = '';
addEventListener('resize', () => { W = innerWidth; H = innerHeight; });

function frame(now) {
  const dt = Math.min(now - last, 100); last = now;

  if (started && playing) {
    if (now > hold) elapsed += dt;
    if (elapsed >= defs[cur].dur) {
      if (cur < N - 1) { goTo(cur + 1, true); }
      else { elapsed = defs[cur].dur; ended = true; playing = false; setPP(); }
    }
  }

  // taymkod (30 kadr/s)
  const total = Math.floor(starts[cur] + Math.min(elapsed, defs[cur].dur));
  const sec = Math.floor(total / 1000), ff = Math.floor((total % 1000) / 1000 * 30);
  const main = `${pad2(Math.floor(sec / 3600))}:${pad2(Math.floor(sec % 3600 / 60))}:${pad2(sec % 60)}`;
  const key = main + ff;
  if (key !== lastTc) { tcMain.nodeValue = main; tcFr.textContent = ':' + pad2(ff); lastTc = key; }

  // skrubber
  segs.forEach((b, i) => {
    const p = i < cur ? 1 : i > cur ? 0 : Math.min(1, elapsed / defs[i].dur);
    b.style.setProperty('--p', p.toFixed(4));
  });

  if (fine && !reduce) {
    const nx = mx / W - .5, ny = my / H - .5;
    for (const o of pxEls) {
      o.x += (nx * o.d - o.x) * .06; o.y += (ny * o.d * .7 - o.y) * .06;
      o.el.style.transform = `translate3d(${o.x.toFixed(2)}px,${o.y.toFixed(2)}px,0)`;
    }
    if (spot) { spot.style.setProperty('--mx', mx + 'px'); spot.style.setProperty('--my', my + 'px'); }
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    curDot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    curRing.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
  }
  requestAnimationFrame(frame);
}

if (fine && !reduce) {
  root.classList.add('has-cursor');
  curDot.classList.add('hide'); curRing.classList.add('hide');
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mx = e.clientX; my = e.clientY;
    if (!seen) { seen = true; rx = mx; ry = my; curDot.classList.remove('hide'); curRing.classList.remove('hide'); }
    ring.classList.toggle('hover', !!e.target.closest('a, button'));
  }, { passive: true });
  root.addEventListener('mouseleave', () => { curDot.classList.add('hide'); curRing.classList.add('hide'); });
  root.addEventListener('mouseenter', () => { if (seen) { curDot.classList.remove('hide'); curRing.classList.remove('hide'); } });
  addEventListener('pointerdown', () => ring.classList.add('down'));
  addEventListener('pointerup', () => ring.classList.remove('down'));
}
if (!reduce) {
  addEventListener('pointerdown', (e) => {
    ['ripple', 'mark'].forEach((cls) => {
      const el = document.createElement('div');
      el.className = cls; el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4400);
    });
  });
}

/* ---------- ishga tushirish ---------- */
update(); setPP();
requestAnimationFrame(frame);

const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve();
Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(() => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.remove('boot');
    started = true; last = performance.now(); elapsed = 0;
    runCounters(scenes[0]);
    const toast = $('#toast');
    setTimeout(() => toast.classList.add('show'), 1400);
    setTimeout(() => toast.classList.remove('show'), 7500);
  }));
});
