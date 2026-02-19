/* =========================
   ARCA EMPIRE - APP
   - Lightbox
   - Roster (all players)
   - Teams (list team -> click -> list player per team)
   - Filter role (chips)
   ========================= */

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* ---------- Role Icons (inline SVG) ---------- */
function roleIcon(role){
  const common = 'class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    Roamer: `<svg ${common}><path d="M12 2l7 4v6c0 6-7 10-7 10S5 18 5 12V6l7-4z"/></svg>`,
    Midlaner: `<svg ${common}><path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z"/></svg>`,
    Goldlaner: `<svg ${common}><path d="M3 12h18"/><path d="M12 3v18"/><path d="M7 7l10 10"/><path d="M17 7L7 17"/></svg>`,
    Jungler: `<svg ${common}><path d="M12 2l4 8-4 12-4-12 4-8z"/></svg>`,
    Explaner: `<svg ${common}><path d="M7 21h10"/><path d="M9 21V8l3-3 3 3v13"/><path d="M6 9h12"/></svg>`,
    Support: `<svg ${common}><path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11z"/></svg>`,
    Roamer: `<svg ${common}><path d="M12 21s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z"/><path d="M9 12h6"/></svg>`
  };
  return icons[role] || icons.Support;
}

/* ---------- Lightbox ---------- */
function setupLightbox(){
  const lb = $('#lightbox');
  if(!lb) return;

  const lbImg = $('#lightboxImg');
  const open = (src) => {
    lbImg.src = src;
    lb.classList.add('open');
  };
  const close = () => lb.classList.remove('open');

  lb.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') close();
  });

  // bind elements
  $$('[data-lightbox-src]').forEach(el=>{
    el.addEventListener('click', ()=>{
      open(el.getAttribute('data-lightbox-src'));
    });
  });
}

/* =========================
   DATA
   ========================= */

/* --- All roster (untuk halaman roster.html) 6-10 fleksibel --- */
// ROSTER (sesuai template kamu: nick, role, img, badge)
// Semua member dari semua team dimasukin ke roster (tanpa dobel).
const roster = [
  // === ARCA FURY ===
  { nick:"Menthek",   role:"Explaner",  img:"assets/img/players/menthek.jpeg",   badge:"Fury" },
  { nick:"Fadla",     role:"Roamer",    img:"assets/img/players/fadla.jpeg",     badge:"Fury" },
  { nick:"Iyay",      role:"Jungler",   img:"assets/img/players/iyay.jpeg",      badge:"Fury" },
  { nick:"Tuanscot",  role:"Midlaner",  img:"assets/img/players/tuanscott.jpeg", badge:"Fury" },
  { nick:"Azsadel",   role:"Explaner",  img:"assets/img/players/azsadel.png",    badge:"Fury" },
  { nick:"Komamura",  role:"Explaner",  img:"assets/img/players/komamura.jpeg",  badge:"Fury" },
  { nick:"Morfry",    role:"Jungler",   img:"assets/img/players/morfry.jpeg",    badge:"Fury" },
  { nick:"Raygen",    role:"Jungler",   img:"assets/img/players/raygen.jpeg",    badge:"Fury" },
  { nick:"Enphap",    role:"Roamer",    img:"assets/img/players/enphap.png",     badge:"Fury" },
  { nick:"Elzarr",    role:"Goldlaner", img:"assets/img/players/elzhar.jpeg",    badge:"Fury" },
  { nick:"Pooseyy",   role:"Midlaner",  img:"assets/img/players/poosey.jpeg",    badge:"Fury" },

  // === ARCA VIPER ===
  { nick:"Morfeus",   role:"Roamer",    img:"assets/img/players/morfeus.jpeg",   badge:"Viper" },
  { nick:"Robsky",    role:"Goldlaner", img:"assets/img/players/robsky.png",     badge:"Viper" },
  { nick:"Kaelz",     role:"Jungler",   img:"assets/img/players/kaelz.jpeg",     badge:"Viper" },
  { nick:"Sarkipyn",  role:"Midlaner",  img:"assets/img/players/sarkypin.jpeg",  badge:"Viper" },
  { nick:"Maspiiww",  role:"Goldlaner", img:"assets/img/players/maspiiww.jpeg",  badge:"Viper" },
  { nick:"Ajiqt",     role:"Roamer",    img:"assets/img/players/ajiqt.jpeg",     badge:"Viper" },
  { nick:"Stompu",    role:"Explaner",  img:"assets/img/players/stompu.jpeg",    badge:"Viper" },
  { nick:"Gixios",    role:"Explaner",  img:"assets/img/players/gixios.png",     badge:"Viper" },

  // === ARCA ARES ===
  { nick:"Domkrak",   role:"Explaner",  img:"assets/img/players/domkrak.jpeg",   badge:"Ares" },
  { nick:"Aylein",    role:"Goldlaner", img:"assets/img/players/aylein.jpeg",    badge:"Ares" },
  { nick:"Gnome",     role:"Explaner",  img:"assets/img/players/gnome.jpeg",     badge:"Ares" },
  { nick:"Kenshiro",  role:"Jungler",   img:"assets/img/players/kenshiro.jpeg",  badge:"Ares" },
  { nick:"Oguri",     role:"Roamer",    img:"assets/img/players/sabo.jpeg",      badge:"Ares" },
  { nick:"Nexuss",    role:"Jungler",   img:"assets/img/players/dafskie.png",    badge:"Ares" },

  // === ARCA KIRA ===
  { nick:"Saxo",      role:"Midlaner",  img:"assets/img/players/saxo.png",       badge:"Kira" },
  { nick:"Virgo",     role:"Explaner",  img:"assets/img/players/virgo.jpeg",     badge:"Kira" },
  { nick:"Letz",      role:"Goldlaner", img:"assets/img/players/letz.jpeg",      badge:"Kira" },
  { nick:"Adnann",    role:"Goldlaner", img:"assets/img/players/adnan.jpeg",     badge:"Kira" },
  { nick:"Gomunouz",  role:"Explaner",  img:"assets/img/players/gomunoz.png",    badge:"Kira" },
  { nick:"Garsaa",    role:"Roamer",    img:"assets/img/players/garsa.png",      badge:"Kira" },
  { nick:"Arkyy",     role:"Midlaner",  img:"assets/img/players/arky.jpeg",      badge:"Kira" },
  { nick:"Faylyne",   role:"Jungler",   img:"assets/img/players/faylyne.jpeg",   badge:"Kira" },
  { nick:"Ushijima",  role:"Jungler",   img:"assets/img/players/ujishima.jpeg",  badge:"Kira" },

  // === ARCA LOGIC ===
  { nick:"Mondqt",    role:"Midlaner",  img:"assets/img/players/moses.jpeg",     badge:"Logic" },
  { nick:"Natsukii",  role:"Explaner",  img:"assets/img/players/natsukii.png",   badge:"Logic" },
  { nick:"Icey",      role:"Midlaner",  img:"assets/img/players/icey.jpeg",      badge:"Logic" },
  { nick:"Smiley",    role:"Midlaner",  img:"assets/img/players/smiley.jpeg",    badge:"Logic" },
  { nick:"Xynra",     role:"Goldlaner", img:"assets/img/players/xynra.jpeg",     badge:"Logic" },
  { nick:"Heather",   role:"Explaner",  img:"assets/img/players/heather.png",    badge:"Logic" },
  { nick:"Piee",      role:"Roamer",    img:"assets/img/players/piee.jpeg",      badge:"Logic" },

  // === ARCA ZINC ===
  { nick:"Fanz",      role:"Goldlaner", img:"assets/img/players/fanz.png",       badge:"Zinc" },
  { nick:"Babel",     role:"Midlane",   img:"assets/img/players/babel.jpeg",     badge:"Zinc" },
  { nick:"Alenski",   role:"Goldlaner", img:"assets/img/players/alenski.png",    badge:"Zinc" },
  { nick:"Hogwards",  role:"Midlaner",  img:"assets/img/players/hogwards.png",   badge:"Zinc" },
  { nick:"Luminanc",  role:"Roamer",    img:"assets/img/players/luminanc.jpeg",  badge:"Zinc" },
  { nick:"Mpuss",     role:"Jugnler",   img:"assets/img/players/mpuss.jpeg",     badge:"Zinc" },
  { nick:"Vaavian",   role:"Explaner",  img:"assets/img/players/vaavian.jpeg",   badge:"Zinc" },
  { nick:"Wraith",    role:"Jungler",   img:"assets/img/players/wraith.jpeg",    badge:"Zinc" },
  { nick:"Ares",      role:"Roamer",    img:"assets/img/players/ares.jpeg",      badge:"Zinc" },

  // === ARCA NOVA ===
  { nick:"Yuusha",    role:"Midlaner",  img:"assets/img/players/yuusha.png",     badge:"Nova" },
  { nick:"Kzzel",     role:"Midlaner",  img:"assets/img/players/kzzel.png",      badge:"Nova" },
  { nick:"Kaiga",     role:"Jungler",   img:"assets/img/players/kaiga.jpeg",     badge:"Nova" },
  { nick:"Longvish",  role:"Explaner",  img:"assets/img/players/longvish.png",   badge:"Nova" },
  { nick:"Rubyboys",  role:"Goldlaner", img:"assets/img/players/unknown.avif",   badge:"Nova" },
  { nick:"Syahh",     role:"Midlaner",  img:"assets/img/players/syahh.jpeg",     badge:"Nova" },
  { nick:"Liltank",   role:"Roamer",    img:"assets/img/players/liltank.jpeg",   badge:"Nova" },
  { nick:"Ignasius",  role:"Goldlaner", img:"assets/img/players/ignasius.png",   badge:"Nova" },

  // === ARCA ORION ===
  { nick:"Paradis",   role:"Midlaner",  img:"assets/img/players/paradis.png",    badge:"Orion" },
  { nick:"Hikaru",    role:"Roamer",    img:"assets/img/players/hikaru.jpeg",    badge:"Orion" },
  { nick:"Stranger",  role:"Goldlaner", img:"assets/img/players/stranger.png",   badge:"Orion" },
  { nick:"Ryoya",     role:"Midlaner",  img:"assets/img/players/ryoya.jpeg",     badge:"Orion" },
  { nick:"Nagtzy",    role:"Explaner",  img:"assets/img/players/naghtzy.jpeg",   badge:"Orion" },

  // === ARCA SOREN ===
  { nick:"Zynd",      role:"Goldlaner", img:"assets/img/players/zynd.jpeg",      badge:"Soren" },
  { nick:"Semprul",   role:"Roamer",    img:"assets/img/players/semprul.jpeg",   badge:"Soren" },
  { nick:"Briand",    role:"Goldlaner", img:"assets/img/players/briand.png",     badge:"Soren" },
  { nick:"Vintzy",    role:"Midlaner",  img:"assets/img/players/vintzy.jpeg",    badge:"Soren" },
  { nick:"Yseejun",   role:"Jungler",   img:"assets/img/players/yseejun.jpeg",   badge:"Soren" },

  // === ARCA GORE ===
  { nick:"Garo",      role:"Goldlaner", img:"assets/img/players/garo.png",       badge:"Gore" },
  { nick:"Fersa",     role:"Roamer",    img:"assets/img/players/fersa.png",      badge:"Gore" },
  { nick:"Maiki",     role:"Jungler",   img:"assets/img/players/maiki.png",      badge:"Gore" },
  { nick:"Kyzent",    role:"Roamer",    img:"assets/img/players/kyzent.jpeg",    badge:"Gore" },


  { nick:"Yaminur",    role:"Roamer",    img:"assets/img/players/yaminur.jpeg",    badge:"Daxia" },
];

/* --- Teams: list team + logo + players per team --- */
/* Anda bisa tambah team baru dan isi playernya sesuai kebutuhan */
const teams = [
  {
    id: "arca-fury",
    name: "Arca Fury",
    logo: "assets/img/teams/fury.jpeg",
    desc: "Sang Banteng Merah Penakluk APL Season 1!",
    tag: "Coach : Menthek",
    players: [
      { nick:"Menthek",  role:"Explaner",  img:"assets/img/players/menthek.jpeg", badge:"Coach" },
      { nick:"Fadla",  role:"Roamer",     img:"assets/img/players/fadla.jpeg", badge:"Roamer" },
      { nick:"Iyay",  role:"Jungler", img:"assets/img/players/iyay.jpeg", badge:"Goldlaner/Jungler" },
      { nick:"Tuanscot",  role:"Midlaner",     img:"assets/img/players/tuanscott.jpeg", badge:"Midlaner" },
      { nick:"Azsadel", role:"Explaner", img:"assets/img/players/azsadel.png", badge:"Explaner" },
      { nick:"Komamura",  role:"Explaner",  img:"assets/img/players/komamura.jpeg", badge:"Core" },
      { nick:"Morfry",  role:"Jungler",  img:"assets/img/players/morfry.jpeg", badge:"Jungler" },
      { nick:"Raygen",  role:"Jungler",  img:"assets/img/players/raygen.jpeg", badge:"Jungler" },
      { nick:"Enphap",  role:"Roamer",  img:"assets/img/players/enphap.png", badge:"Roamer" },
      { nick:"Elzarr",  role:"Goldlaner",  img:"assets/img/players/elzhar.jpeg", badge:"Goldlaner" },
      { nick:"Pooseyy",  role:"Midlaner",  img:"assets/img/players/poosey.jpeg", badge:"Midlaner" },
    ]
  },
  {
    id: "arca-viper",
    name: "Arca Viper",
    logo: "assets/img/teams/viper.jpeg",
    desc: "Sang Ular Mematikan Yang Siap Menelilit Lawannya!",
    tag: "Coach : Robsky",
    players: [
      { nick:"Morfeus",   role:"Roamer",   img:"assets/img/players/morfeus.jpeg", badge:"Tank/Support" },
      { nick:"Robsky", role:"Goldlaner",     img:"assets/img/players/robsky.png", badge:"Coach" },
      { nick:"Kaelz",   role:"Jungler", img:"assets/img/players/kaelz.jpeg", badge:"Jungler" },
      { nick:"Sarkipyn",  role:"Midlaner",  img:"assets/img/players/sarkypin.jpeg", badge:"Midlaner" },
      { nick:"Maspiiww",  role:"Goldlaner",  img:"assets/img/players/maspiiww.jpeg", badge:"Goldlaner" },
      { nick:"Ajiqt",  role:"Roamer",  img:"assets/img/players/ajiqt.jpeg", badge:"Roamer" },
      { nick:"Stompu",  role:"Explaner",  img:"assets/img/players/stompu.jpeg", badge:"Midlaner" },
      { nick:"Gixios",  role:"Explaner",  img:"assets/img/players/gixios.png", badge:"Explaner" },
    ]
  },
  {
    id: "arca-ares",
    name: "Arca Ares",
    logo: "assets/img/teams/ares.jpeg",
    desc: "G O A T !<br> Sang penakluk APL Season 2",
    tag: "Coach : Domz",
    players: [
      { nick:"Domkrak",   role:"Explaner",   img:"assets/img/players/domkrak.jpeg", badge:"Coach" },
      { nick:"Aylein", role:"Goldlaner",     img:"assets/img/players/aylein.jpeg", badge:"Goldlaner/Midlaner" },
      { nick:"Gnome",   role:"Explaner", img:"assets/img/players/gnome.jpeg", badge:"Explaner" },
      { nick:"Kenshiro",  role:"Jungler",  img:"assets/img/players/kenshiro.jpeg", badge:"Jungler" },
      { nick:"Oguri",   role:"Roamer", img:"assets/img/players/sabo.jpeg", badge:"Roamer" },
      { nick:"Nexuss",  role:"Jungler",  img:"assets/img/players/dafskie.png", badge:"Jungler" },
    ]
  },
  {
    id: "arca-kira",
    name: "Arca Kira",
    logo: "assets/img/teams/kira.jpeg",
    desc: "Sang Panda yang sangat haus akan kemenangan!",
    tag: "Coach : Saxo",
    players: [
      { nick:"Saxo",  role:"Midlaner",  img:"assets/img/players/saxo.png", badge:"Coach" },
      { nick:"Virgo",  role:"Explaner",     img:"assets/img/players/virgo.jpeg", badge:"Explner" },
      { nick:"Letz",  role:"Goldlaner", img:"assets/img/players/letz.jpeg", badge:"Goldlaner/Jungler" },
      { nick:"Adnann",  role:"Goldlaner",     img:"assets/img/players/adnan.jpeg", badge:"Goldlaner/Midlaner" },
      { nick:"Gomunouz", role:"Explaner", img:"assets/img/players/gomunoz.png", badge:"Explaner" },
      { nick:"Garsaa",  role:"Roamer",  img:"assets/img/players/garsa.png", badge:"Roamer" },
      { nick:"Arkyy",  role:"Midlaner",  img:"assets/img/players/arky.jpeg", badge:"Midlaner" },
      { nick:"Faylyne",  role:"Jungler",  img:"assets/img/players/faylyne.jpeg", badge:"Jungler" },
      { nick:"Ushijima",  role:"Jungler",  img:"assets/img/players/ujishima.jpeg", badge:"Jungler" },
    ]
  },
  {
    id: "arca-logic",
    name: "Arca Logic",
    logo: "assets/img/teams/logic.jpeg",
    desc: "Serigala ganas yang siap menerkam semua lawannya!",
    tag: "Coach : Mondqt",
    players: [
      { nick:"Mondqt",  role:"Midlaner",  img:"assets/img/players/moses.jpeg", badge:"Coach" },
      { nick:"Natsukii",  role:"Explaner", img:"assets/img/players/natsukii.png", badge:"Explaner" },
      { nick:"Icey",  role:"Midlaner",     img:"assets/img/players/icey.jpeg", badge:"Midlaner" },
      { nick:"Smiley", role:"Midlaner", img:"assets/img/players/smiley.jpeg", badge:"Midlaner" },
      { nick:"Xynra",  role:"Goldlaner",  img:"assets/img/players/xynra.jpeg", badge:"Goldlaner" },
      { nick:"Heather",  role:"Explaner",  img:"assets/img/players/heather.png", badge:"Explaner" },
      { nick:"Piee",  role:"Roamer",  img:"assets/img/players/piee.jpeg", badge:"Roamer" },
    ]
  },
  {
    id: "arca-zinc",
    name: "Arca Zinc",
    logo: "assets/img/teams/zinc.jpeg",
    desc: "Elang yang selalu mengincar titik kemenangan!",
    tag: "Coach : Fanz",
    players: [
      { nick:"Fanz",  role:"Goldlaner",  img:"assets/img/players/fanz.png", badge:"Coach" },
      { nick:"Babel",  role:"Midlane",     img:"assets/img/players/babel.jpeg", badge:"Midlaner" },
      { nick:"Alenski",  role:"Goldlaner", img:"assets/img/players/alenski.png", badge:"Goldlaner" },
      { nick:"Hogwards",  role:"Midlaner",     img:"assets/img/players/hogwards.png", badge:"Midlaner" },
      { nick:"Luminanc", role:"Roamer", img:"assets/img/players/luminanc.jpeg", badge:"Roamer" },
      { nick:"Mpuss",  role:"Jugnler",  img:"assets/img/players/mpuss.jpeg", badge:"Jungler" },
      { nick:"Vaavian",  role:"Explaner",  img:"assets/img/players/vaavian.jpeg", badge:"Explaner" },
      { nick:"Wraith",  role:"Jungler",  img:"assets/img/players/wraith.jpeg", badge:"Jungler" },
      { nick:"Ares",  role:"Roamer",  img:"assets/img/players/ares.jpeg", badge:"Roamer" },
    ]
  },
  {
    id: "arca-nova",
    name: "Arca Nova",
    logo: "assets/img/teams/nova.jpeg",
    desc: "Beruang yang cerdik dalam meyerang dan menerkam lawannya!",
    tag: "Coach : Yuusha",
    players: [
      { nick:"Yuusha",  role:"Midlaner",  img:"assets/img/players/yuusha.png", badge:"Coach" },
      { nick:"Kzzel",  role:"Midlaner",     img:"assets/img/players/kzzel.png", badge:"Midlaner" },
      { nick:"Kaiga",  role:"Jungler", img:"assets/img/players/kaiga.jpeg", badge:"Goldlaner/Jungler" },
      { nick:"Longvish",  role:"Explaner",     img:"assets/img/players/longvish.png", badge:"Explaner" },
      { nick:"Rubyboys", role:"Goldlaner", img:"assets/img/players/unknown.avif", badge:"Goldlaner" },
      { nick:"Syahh",  role:"Midlaner",  img:"assets/img/players/syahh.jpeg", badge:"Midlaner" },
      { nick:"Liltank",  role:"Roamer",  img:"assets/img/players/liltank.jpeg", badge:"Roamer" },
      { nick:"Ignasius",  role:"Goldlaner",  img:"assets/img/players/ignasius.png", badge:"Goldlaner" },
    ]
  },
  {
    id: "arca-orion",
    name: "Arca Orion",
    logo: "assets/img/teams/orion.jpeg",
    desc: "Sang Rubah yang selalu memberikan keajaiban disetiap pertandingan!",
    tag: "Coach : Paradis",
    players: [
      { nick:"Paradis",  role:"Midlaner",  img:"assets/img/players/paradis.png", badge:"Coach" },
      { nick:"Hikaru",  role:"Roamer",     img:"assets/img/players/hikaru.jpeg", badge:"Roamer" },
      { nick:"Stranger",  role:"Goldlaner", img:"assets/img/players/stranger.png", badge:"Goldlaner" },
      { nick:"Ryoya", role:"Midlaner", img:"assets/img/players/ryoya.jpeg", badge:"Midlaner" },
      { nick:"Nagtzy",  role:"Explaner",  img:"assets/img/players/naghtzy.jpeg", badge:"Explaner" },
    ]
  },
  {
    id: "arca-Soren",
    name: "Arca Soren",
    logo: "assets/img/teams/soren.jpeg",
    desc: "Sang Challenger yang siap berkompetisi dan menerjang!",
    tag: "Coach : Zynd",
    players: [
      { nick:"Zynd",  role:"Goldlaner",  img:"assets/img/players/zynd.jpeg", badge:"Coach" },
      { nick:"Semprul",  role:"Roamer",     img:"assets/img/players/semprul.jpeg", badge:"Roamer" },
      { nick:"Briand",  role:"Goldlaner", img:"assets/img/players/briand.png", badge:"Goldlaner" },
      { nick:"Vintzy",  role:"Midlaner",     img:"assets/img/players/vintzy.jpeg", badge:"Midlaner" },
      { nick:"Yseejun", role:"Jungler", img:"assets/img/players/yseejun.jpeg", badge:"Jungler" },
    ]
  },
  {
    id: "arca-gore",
    name: "Arca Gore",
    logo: "assets/img/teams/gore.jpeg",
    desc: "Challenger baru yang datang dengan kebrutalan mereka!",
    tag: "Coach : Garo",
    players: [
      { nick:"Garo",  role:"Goldlaner",  img:"assets/img/players/garo.png", badge:"Coach" },
      { nick:"Fersa",  role:"Roamer",     img:"assets/img/players/fersa.png", badge:"Roamer" },
      { nick:"Maiki",  role:"Jungler", img:"assets/img/players/maiki.png", badge:"Goldlaner/Jungler" },
      { nick:"Kyzent",  role:"Roamer",     img:"assets/img/players/kyzent.jpeg", badge:"Roamer" },
    ]
  }
];

/* =========================
   HELPERS RENDER
   ========================= */

function playerCardHTML(p){
  return `
    <article class="player" data-role="${p.role}">
      <div class="photo" data-lightbox-src="${p.img}">
        <img src="${p.img}" alt="${p.nick}">
      </div>
      <div class="meta">
        <div class="nick">
          <span>${p.nick}</span>
          <span class="pill ${p.badge === 'Core' ? 'yellow' : ''}">${p.badge || ''}</span>
        </div>
        <div class="role">
          ${roleIcon(p.role)}
          <span>${p.role}</span>
        </div>
      </div>
    </article>
  `;
}

/* ---------- Render Roster (roster.html) ---------- */
function renderRoster(){
  const wrap = $('#rosterGrid');
  if(!wrap) return;

  wrap.innerHTML = roster.map(playerCardHTML).join('');
  setupLightbox();
}

/* ---------- Filter Role chips on a given grid ---------- */
function setupRoleFilters(chipsRootSelector, gridSelector){
  const chipsRoot = $(chipsRootSelector);
  const grid = $(gridSelector);
  if(!chipsRoot || !grid) return;

  const chips = $$('.chip', chipsRoot);
  if(!chips.length) return;

  const apply = (role) => {
    $$('.player', grid).forEach(card=>{
      const ok = (role === 'All') || (card.getAttribute('data-role') === role);
      card.style.display = ok ? '' : 'none';
    });
  };

  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      apply(chip.getAttribute('data-role'));
    });
  });
}

/* =========================
   TEAMS PAGE (teams.html)
   ========================= */

function renderTeamsList(){
  const list = $('#teamList');
  const detail = $('#teamDetail');
  if(!list || !detail) return;

  list.innerHTML = teams.map(t => `
    <article class="team-card" data-team-id="${t.id}">
      <div class="top">
        <div class="team-logo">
          <img src="${t.logo}" alt="${t.name}" onerror="this.style.display='none'">
        </div>
        <div>
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
        </div>
      </div>
      <div class="bottom">
        <span class="team-tag">${t.tag || 'Team'}</span>
        <span class="team-count">${t.players.length} Player</span>
      </div>
    </article>
  `).join('');

  // click handler
  $$('.team-card', list).forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.getAttribute('data-team-id');
      openTeamDetail(id);
    });
  });

  // if URL has #teamId open directly
  if(location.hash && location.hash.length > 1){
    const hashId = location.hash.replace('#','');
    const exists = teams.some(t=>t.id === hashId);
    if(exists) openTeamDetail(hashId);
  }
}

function openTeamDetail(teamId){
  const list = $('#teamList');
  const detail = $('#teamDetail');
  const title = $('#teamTitle');
  const desc = $('#teamDesc');
  const grid = $('#teamPlayerGrid');
  const backBtn = $('#btnBackTeams');
  const chipsRoot = $('#teamChips');

  const team = teams.find(t => t.id === teamId);
  if(!team || !list || !detail || !grid) return;

  // set hash for shareable link
  history.replaceState(null, '', `teams.html#${team.id}`);

  // show/hide
  list.style.display = 'none';
  detail.style.display = '';

  // fill heading
  title.textContent = team.name;
  desc.textContent = team.desc;

  // render players
  grid.innerHTML = team.players.map(playerCardHTML).join('');

  // reset chips active to "All"
  if(chipsRoot){
    $$('.chip', chipsRoot).forEach((c,i)=>{
      c.classList.toggle('active', i === 0);
    });
  }

  // bind lightbox
  setupLightbox();

  // bind filters for this team grid
  setupRoleFilters('#teamChips', '#teamPlayerGrid');

  // back
  if(backBtn){
    backBtn.onclick = () => {
      history.replaceState(null, '', 'teams.html');
      detail.style.display = 'none';
      list.style.display = '';
    };
  }
}

/* =========================
   INIT
   ========================= */
document.addEventListener('DOMContentLoaded', ()=>{
  // roster.html
  renderRoster();
  setupRoleFilters('body', '#rosterGrid'); // chips on roster.html are in body scope

  // teams.html
  renderTeamsList();

  // lightbox for static iMidlaners (homepage spotlight, staff, etc.)
  setupLightbox();
});