(() => {
const NS = 'http://www.w3.org/2000/svg';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
let lang = 'pt';
const T = o => o[lang];

/* ---------- LOGO (geometria do arquivo oficial) ---------- */
const LG = [[737,346,0],[771,352,0],[806,382,0],[872,756,0],[905,789,0],[938,809,0],[971,821,0],[1003,816,0],[1041,858,515],[1075,887,532],[1108,901,551],[1142,544,0],[1175,525,0],[1209,505,0],[1242,493,0],[1276,477,0]];
function drawLines(g, w, h, anim) {
  const k = h / 901, cx = 1006;
  LG.forEach(([x, t, b], i) => {
    const l = document.createElementNS(NS, 'line'), X = w / 2 + (x - cx) * k;
    l.setAttribute('x1', X); l.setAttribute('x2', X); l.setAttribute('y1', h - b * k); l.setAttribute('y2', h - t * k);
    if (anim) { l.classList.add('draw'); l.style.setProperty('--l', (t - b) * k); l.style.animationDelay = (i * .022) + 's'; }
    g.appendChild(l);
  });
  const base = document.createElementNS(NS, 'line');
  base.setAttribute('x1', w / 2 - 694 * k); base.setAttribute('x2', w / 2 + 694 * k); base.setAttribute('y1', h - .5); base.setAttribute('y2', h - .5);
  base.setAttribute('class', 'base'); if (anim) { base.classList.add('draw'); base.style.setProperty('--l', 1388 * k); }
  g.appendChild(base);
}
$('.lock-lines').insertAdjacentHTML('afterbegin', '<defs><linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="0" y1="905" x2="0" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#d2b05a"/><stop offset="1" stop-color="#957522"/></linearGradient></defs>');
drawLines($('#introLines'), 1388, 903, true);
drawLines($('.mini-lines g'), 60, 40, false);
drawLines($('.ct-mark g'), 60, 40, false);
drawLines($('.ex-logo g'), 60, 40, false);

/* ---------- SÓCIAS ---------- */
const PEOPLE = [
  { img: 'socia-c.jpg', name: 'Cristina<br>Reis Marques', alt: 'Cristina Reis Marques',
    role: { pt: 'Relacionamento e implantação', en: 'Client relations & onboarding' },
    bio: { pt: 'Formada em Turismo, com pós-graduação em Administração e MBA em Marketing. Foi gerente nacional de relacionamento com o cliente da Alphaville Urbanismo, onde conduziu o relacionamento diário e a implantação de empreendimentos residenciais de altíssimo padrão.',
           en: 'Degree in Tourism, postgraduate in Business Administration and MBA in Marketing. As national client relations manager at Alphaville Urbanismo, she led day-to-day client relations and the onboarding of ultra-high-end residential communities.' },
    hi: { pt: ['<strong>Alphaville Urbanismo:</strong> gerência nacional de relacionamento com o cliente e implantação de residenciais de altíssimo padrão', 'Implantação de associações de moradores e formação de comunidade', '+20 anos em hotelaria, construção civil e gestão de propriedades', 'Ex-diretora de operações de gerenciadora com 80 contratos e +200 colaboradores', 'Assembleias de instalação com mais de 500 participantes'],
          en: ['<strong>Alphaville Urbanismo:</strong> national client relations management and onboarding of ultra-high-end residential communities', 'Set-up of residents\' associations and community building', '20+ years in hospitality, construction and property management', 'Former operations director at a firm with 80 contracts and 200+ staff', 'Handover meetings with over 500 attendees'] } },
  { img: 'socia-a.jpg', name: 'Helena<br>Ferraz de Carvalho', alt: 'Helena Ferraz de Carvalho',
    role: { pt: 'Facilities e hospitalidade corporativa', en: 'Facilities & corporate hospitality' },
    bio: { pt: 'Bacharel em Comunicação Social, com MBA em Gestão Empresarial e Gestão Estratégica de Pessoas. Especialista em facilities, hospitalidade corporativa e experiência do ocupante, com uma gestão inspirada na hotelaria de luxo: conforto, conveniência, sofisticação e atendimento personalizado.',
           en: 'Degree in Communications, MBA in Business Management and Strategic People Management. A specialist in facilities, corporate hospitality and occupant experience, with an approach inspired by luxury hospitality: comfort, convenience, sophistication and personalised service.' },
    hi: { pt: ['+23 anos em facilities e gestão de propriedades', 'Implantação e retrofit de lojas em shoppings de luxo de São Paulo', 'Gerente regional: +1 milhão de m², budget mensal de R$ 10 milhões e equipes de até 250 pessoas', 'Hospitalidade corporativa e experiência do ocupante inspiradas na hotelaria de luxo', 'Contratos, SLAs, KPIs e procurement para o mercado de alto padrão'],
          en: ['23+ years in facilities and property management', 'Openings and retrofits of stores in São Paulo luxury malls', 'Regional manager: 1M+ m², R$ 10M monthly budget and teams of up to 250', 'Corporate hospitality and occupant experience inspired by luxury hotels', 'Contracts, SLAs, KPIs and procurement for the high-end market'] } },
  { img: 'socia-b.jpg', name: 'Mary Lorena<br>Gurevich', alt: 'Mary Lorena Gurevich',
    role: { pt: 'Governança e alto padrão', en: 'Governance & high-end assets' },
    bio: { pt: 'Formada em Direito, atua há mais de duas décadas na administração predial. Pioneira da sindicatura profissional, é especialista em empreendimentos de alto padrão, retrofit, certificações e assessoria a proprietários.',
           en: 'Law graduate with more than two decades in building administration. A pioneer of professional property management, she specialises in high-end properties, retrofits, certifications and owner advisory.' },
    hi: { pt: ['Pioneira da sindicatura profissional, à frente do Cetenco Plaza desde a autogestão', 'Gestão de edifícios AAA com mais de 110.000 m² de área construída', 'Retrofit, certificações e implantação de condomínios', 'Assessoria jurídica e estratégica a proprietários'],
          en: ['A pioneer of professional management, at Cetenco Plaza since its self-managed era', 'Management of AAA buildings with over 110,000 m² of built area', 'Retrofits, certifications and condominium set-up', 'Legal and strategic advisory to owners'] } },
];
function renderPeople() {
  const open = $$('.person.open').map(p => +p.dataset.i);
  $('#people').innerHTML = PEOPLE.map((p, i) => `<article class="person reveal in ${open.includes(i) ? 'open' : ''}" data-i="${i}">
    <figure class="ph"><img src="${p.img}" alt="${p.alt}" loading="lazy"></figure>
    <p class="role">${T(p.role)}</p><h3>${p.name}</h3><p class="pbio">${T(p.bio)}</p>
    <button class="more"><span>${lang === 'pt' ? 'Trajetória' : 'Career'}</span><i></i></button>
    <div class="bio"><div><ul>${T(p.hi).map(h => `<li>${h}</li>`).join('')}</ul></div></div></article>`).join('');
}
document.addEventListener('click', e => { const m = e.target.closest('.more'); if (m) m.closest('.person').classList.toggle('open'); });

/* ---------- ESCOPO ---------- */
const SC = [
  { t: { pt: 'A implantação', en: 'Onboarding' }, l: { pt: 'Para um edifício que nasce pronto.', en: 'For a building that is ready from day one.' },
    i: { pt: ['Planejamento operacional', 'Previsão orçamentária', 'Concorrências e contratações', 'Estruturação da gestão', 'Governança e acompanhamento'],
         en: ['Operational planning', 'Budget forecast', 'Tenders and contracting', 'Management structure', 'Governance and follow-up'] } },
  { t: { pt: 'O cotidiano', en: 'Every day' }, l: { pt: 'Para uma rotina que funciona sem ser notada.', en: 'For a routine that runs without being noticed.' },
    i: { pt: ['Agenda recorrente no empreendimento', 'Prestadores, níveis de serviço e manutenção', 'Gestão administrativa e financeira', 'Relacionamento com moradores e eventos', 'Emergências 24/7'],
         en: ['A recurring on-site agenda', 'Providers, service levels and maintenance', 'Administrative and financial management', 'Resident relations and events', '24/7 emergencies'] } },
  { t: { pt: 'O patrimônio', en: 'The asset' }, l: { pt: 'Para um endereço que se valoriza com o tempo.', en: 'For an address that gains value over time.' },
    i: { pt: ['Valorização das áreas comuns', 'Sustentabilidade e certificações LEED', 'Contratos, documentação e assembleias', 'Prestação de contas clara e periódica', 'Seguro de responsabilidade profissional de R$ 1 milhão'],
         en: ['Enhancement of common areas', 'Sustainability and LEED certifications', 'Contracts, documentation and meetings', 'Clear, regular reporting', 'R$ 1 million professional liability insurance'] } },
];
function renderScope() {
  $('#scGrid').innerHTML = SC.map((s, k) => `<article class="sc reveal in"><span class="rn">${['I', 'II', 'III'][k]}</span><h3>${T(s.t)}</h3><p class="sc-lead">${T(s.l)}</p><ul>${T(s.i).map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('');
}

/* ---------- PORTFÓLIO ---------- */
const PF = { corp: ['Corporativo', 'Corporate'], res: ['Residencial', 'Residential'], hot: ['Hotelaria', 'Hospitality'], mis: ['Misto', 'Mixed'], mul: ['Multiuso', 'Mixed-use'], com: ['Comercial', 'Commercial'], log: ['Logístico', 'Logistics'] };
const P = [
  ['2001', 'cetenco', 'Edifício Cetenco Plaza · Torre Norte', 'corp', { pt: '54.997,95 m² de área construída · Av. Paulista', en: '54,997.95 m² built area · Av. Paulista' }, 'Mary Lorena'],
  ['2018', 'malzoni', 'Pátio Victor Malzoni', 'corp', { pt: '69.893,06 m² de área útil', en: '69,893.06 m² usable area' }, 'Mary Lorena'],
  ['2022', 'guarulhos', 'Urban Hub Guarulhos', 'log', { pt: '21.233 m² de área construída', en: '21,233 m² built area' }, 'Cristina Reis Marques'],
  ['', 'bravo', 'Bravo!', 'com', { pt: '6.206,54 m² de área privativa', en: '6,206.54 m² private area' }, 'Mary Lorena'],
  ['2023', 'altodasnacoes', 'Alto das Nações · Condomínio Geral', 'mul', { pt: 'Sindicatura do condomínio geral', en: 'General condominium management' }, 'Cristina Reis Marques'],
  ['2025', 'avnu', 'Alto das Nações · Setor 3', 'corp', { pt: 'Sindicatura do subcondomínio', en: 'Sub-condominium management' }, 'Cristina Reis Marques'],
  ['', 'clari', 'Clari Pinheiros', 'mis', { pt: 'Condomínio geral e setor residencial · 88 unidades', en: 'General condominium and residential sector · 88 units' }, 'Helena Ferraz'],
  ['', 'bauman', 'Bauman Corporate', 'corp', { pt: '6.656 m² de área locável', en: '6,656 m² leasable area' }, 'Cristina Reis Marques'],
  ['', 'spression', 'Spression Congonhas', 'res', { pt: '120 unidades', en: '120 units' }, 'Cristina Reis Marques'],
  ['', 'vistafl', 'Vista Faria Lima', 'corp', { pt: '16.475 m² de ABL', en: '16,475 m² GLA' }, 'Mary Lorena'],
  ['', 'share', 'Share Pinheiros', 'res', { pt: '244 unidades', en: '244 units' }, 'Cristina Reis Marques'],
  ['2026', 'atrium', 'Atrium Century Plaza · Hotéis', 'hot', { pt: '354 unidades', en: '354 units' }, 'Helena Ferraz'],
  ['', 'flsquare', 'Faria Lima Square', 'corp', { pt: '19.890 m² de ABL', en: '19,890 m² GLA' }, 'Helena Ferraz'],
  ['', 'misssilvia', 'Miss Silvia Morizono', 'corp', { pt: '18.125 m² de ABL', en: '18,125 m² GLA' }, 'Helena Ferraz'],
  ['', 'jk1455', 'Edifício JK1455', 'corp', { pt: '24.257,99 m² de ABL', en: '24,257.99 m² GLA' }, 'Helena Ferraz'],
  ['', 'petrah', 'Petrah', 'res', { pt: '76 unidades e 4 lojas', en: '76 units and 4 shops' }, 'Helena Ferraz'],
];
const pgrid = $('#pgrid'), chips = $('#chips');
let pfSel = 'all';
function renderPort() {
  const L = lang === 'pt' ? 0 : 1; let yr = '';
  pgrid.innerHTML = P.map(([y, img, name, pf, d, tit]) => { if (y) yr = y;
    return `<article class="pt" data-pf="${pf}"><figure><span class="yr">${yr}</span>${img ? `<img src="sq/${img}.jpg" alt="${name}" loading="lazy">` : '<svg viewBox="0 0 60 40" class="circ-ph"><g></g></svg>'}</figure>
    <p class="pf">${PF[pf][L]}</p><h4>${name}</h4><p>${d[lang]}</p><span class="fn">${L ? 'Lead' : 'Titular'} · ${tit}</span></article>`; }).join('');
  $$('.circ-ph g', pgrid).forEach(g => drawLines(g, 60, 40, false));
  const cnt = {}; P.forEach(p => cnt[p[3]] = (cnt[p[3]] || 0) + 1);
  chips.innerHTML = `<button class="chip ${pfSel === 'all' ? 'on' : ''}" data-pf="all">${L ? 'All' : 'Todos'}<sup>${P.length}</sup></button>` +
    Object.keys(PF).filter(k => cnt[k]).map(k => `<button class="chip ${pfSel === k ? 'on' : ''}" data-pf="${k}">${PF[k][L]}<sup>${cnt[k]}</sup></button>`).join('');
  filterPort();
}
function filterPort() {
  let n = 0;
  $$('.pt', pgrid).forEach(t => { const show = pfSel === 'all' || t.dataset.pf === pfSel; t.classList.toggle('hide', !show);
    t.classList.remove('anim'); if (show) { void t.offsetWidth; t.style.animationDelay = (n++ % 8) * .05 + 's'; t.classList.add('anim'); } });
}
chips.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; pfSel = c.dataset.pf; $$('.chip', chips).forEach(x => x.classList.toggle('on', x === c)); filterPort(); });

/* ---------- IDIOMA ---------- */
const EN = {
  tag: 'High-performance management',
  nav1: 'Atena', nav2: 'Partners', nav3: 'Scope', nav4: 'Portfolio', nav5: 'Contact',
  h_eye: 'Professional property management · São Paulo',
  h_title: 'Management worthy<br>of your address.',
  h_sub: 'High-end residences and corporate buildings managed with technical rigour, discretion and the personal attention of each partner.',
  cta1: 'Book a conversation', cta2: 'Discover Atena',
  a_eye: 'Atena',
  a_text: 'Three partners, more than two decades devoted to buildings that demand excellence. We treat every property as an asset, and every resident as someone who deserves to be welcomed home, every day.',
  n1: 'years of combined experience', n2: 'properties under management', n3: 'partners leading every operation', n4: 'availability for emergencies',
  p_eye: 'The Atena standard', p_title: 'What an exclusive address deserves.',
  p1t: 'Exclusivity', p1: 'Every property is led in person by a partner. No proxies, no intermediaries: decisions are made by someone who knows your building.',
  p2t: 'Hospitality', p2: 'A standard of service drawn from luxury hospitality and high-end corporate headquarters: anticipating needs, welcoming warmly and resolving with discretion.',
  p3t: 'Community', p3: 'Togetherness, belonging and lively common areas. A building where neighbours know one another and feel part of something greater.',
  s_eye: 'The partners', s_title: 'Three careers.<br>One signature.',
  s_lead: 'Law, facilities and client relations: complementary backgrounds serving properties that leave no room for improvisation.',
  x_eye: 'Presence', x_title: 'Close to those who live in the building.',
  x_lead: 'Residents, owners and the board speak directly with a partner. Always.',
  x1t: 'Regular presence', x1: 'A fixed agenda on site and continuous oversight of operations.',
  x2t: 'Active listening', x2: 'Every request is heard, recorded and answered by the person who decides.',
  x3t: '24/7 readiness', x3: 'A defined emergency plan and a partner available at any hour.',
  x4t: 'Clear governance', x4: 'Defined responsibilities between manager, administrator and board.',
  sc_eye: 'Scope', sc_title: 'From day one to the years ahead.',
  sc_legal: 'Professional property management under art. 1,347 et seq. of the Brazilian Civil Code, Law 4,591/64 and the Condominium Bylaws.',
  pf_eye: 'Portfolio', pf_title: 'Addresses under our care.',
  ct_eye: 'Client service', ct_title: 'It would be a pleasure to get to know your building.',
  ct_text: 'Book a private conversation with one of our partners. We will reply personally.',
  ct_or: 'or write to', mail_tip: 'Write to Atena', scroll: 'Scroll',
  f1: 'Governance, condominium law and legal certainty.', f2t: 'Hospitality & client relations', f2: 'The resident experience, from onboarding to community life.', f3t: 'Facilities & services', f3: 'Flawless operations and services to luxury standards.',
  e_eye: 'Exclusivity', e_title: 'Every address<br>with its own signature.',
  e_lead: 'No two buildings are alike, and no two should be managed alike. Every property has a lead partner who knows it in detail and answers for it personally.',
  e1t: 'A dedicated lead partner', e1: 'Decisions are made by someone who knows your building, not by an intermediary.',
  e2t: 'Curated services', e2: 'Wellness, dining and convenience designed for the common areas, to hotel standards.',
  e3t: 'Community life', e3: 'Gatherings, events and integration so that neighbours become a community.',
  e4t: 'Absolute discretion', e4: 'Residents\' privacy and a reserved handling of every request.',
  e_card: 'Signature management', e_cardsub: 'Your building', e_tit: 'Lead partner', e_line: 'Direct line', e_hint: 'One lead partner for every building.'
};
const PT = {};
$$('[data-i18n]').forEach(e => { PT[e.dataset.i18n] ??= e.innerHTML; });
function setLang(l) {
  lang = l; document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
  const D = l === 'pt' ? PT : EN;
  $$('[data-i18n]').forEach(e => { const v = D[e.dataset.i18n]; if (v != null) e.innerHTML = v; });
  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
  $('#ctBtn').href = 'mailto:contato@atenagestao.net.br?subject=' + encodeURIComponent(l === 'pt' ? 'Agendar uma conversa — Atena' : 'Book a conversation — Atena');
  renderPeople(); renderScope(); renderPort(); onScroll();
  try { localStorage.setItem('atena-lang', l); } catch (e) {}
}
$$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

/* ---------- MENU MOBILE ---------- */
const hdr = $('#hdr');
$('.burger').addEventListener('click', () => hdr.classList.toggle('menu'));
$$('.hdr-nav a').forEach(a => a.addEventListener('click', () => hdr.classList.remove('menu')));

/* ---------- SCROLL ---------- */
const mailF = $('.mail-float');
const darks = [$('.hero'), $('.pillars'), $('.excl'), $('.presence'), $('.foot')], pres = $('.presence'), presImg = $('.pres-img');
const hero = $('.hero'), heroIn = $('.hero-in');
const prog = $('#prog');
function onScroll() {
  prog.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(4)})`;
  const hr = hero.getBoundingClientRect(), p = Math.min(1, Math.max(0, -hr.top / (hr.height - innerHeight)));
  hero.style.setProperty('--p', p.toFixed(4)); hero.style.setProperty('--io', Math.min(1, Math.max(0, (p - .05) * 2.4)).toFixed(3));
  heroIn.style.pointerEvents = p > .55 ? 'auto' : 'none';
  const y = 50, dark = darks.some(s => { const b = s.getBoundingClientRect(); return b.top <= y && b.bottom > y; });
  hdr.classList.toggle('solid', !dark);
  hdr.classList.toggle('dark', dark && scrollY > hero.offsetHeight - innerHeight * .2);
  const my = innerHeight - 50, mDark = darks.some(s => { const b = s.getBoundingClientRect(); return b.top <= my && b.bottom > my; });
  mailF.classList.toggle('on-dark', mDark);
  const r = pres.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) presImg.style.setProperty('--py', ((r.top / innerHeight) * 60).toFixed(1) + 'px');
  $$('.hdr-nav a').forEach(a => { const s = $(a.getAttribute('href')); if (!s) return; const b = s.getBoundingClientRect(); a.classList.toggle('act', b.top <= innerHeight * .4 && b.bottom > innerHeight * .4); });
}
let tick = false;
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { onScroll(); tick = false; }); } }, { passive: true });
addEventListener('resize', onScroll);

/* ---------- CARTÃO ---------- */

const card = $('#exCard'), names = ['Cristina Reis Marques', 'Helena Ferraz de Carvalho', 'Mary Lorena Gurevich'], exName = $('#exName'); let ni = 0;
setInterval(() => { exName.style.opacity = 0; setTimeout(() => { ni = (ni + 1) % 3; exName.textContent = names[ni]; exName.style.opacity = 1; }, 500); }, 3200);
card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  card.style.setProperty('--ry', ((x - .5) * 22).toFixed(1) + 'deg'); card.style.setProperty('--rx', ((.5 - y) * 16).toFixed(1) + 'deg');
  card.style.setProperty('--mx', (x * 100).toFixed(0) + '%'); card.style.setProperty('--my', (y * 100).toFixed(0) + '%'); });
card.addEventListener('touchmove', e => { const t = e.touches[0], r = card.getBoundingClientRect(), x = (t.clientX - r.left) / r.width, y = (t.clientY - r.top) / r.height;
  card.style.setProperty('--ry', ((x - .5) * 22).toFixed(1) + 'deg'); card.style.setProperty('--rx', ((.5 - y) * 16).toFixed(1) + 'deg');
  card.style.setProperty('--mx', (x * 100).toFixed(0) + '%'); card.style.setProperty('--my', (y * 100).toFixed(0) + '%'); }, { passive: true });
card.addEventListener('touchend', () => { card.style.setProperty('--rx', '6deg'); card.style.setProperty('--ry', '-10deg'); });
card.addEventListener('mouseleave', () => { card.style.setProperty('--rx', '6deg'); card.style.setProperty('--ry', '-10deg'); });

/* ---------- REVEAL ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(e => io.observe(e));

/* ---------- START ---------- */
let saved = 'pt'; try { saved = localStorage.getItem('atena-lang') || 'pt'; } catch (e) {}
setLang(saved);
})();
