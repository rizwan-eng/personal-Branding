/* =====================================================================
   EDIT THIS SECTION ONLY
   - Your details
   - Photos: put images in an "images" folder (look1.jpg ... look6.jpg),
     or change the `src` of any look below. A placeholder shows until then.
   - Captions are kept to 1-2 sentences, as the assignment requires.
   ===================================================================== */
const PROFILE = {
  name: "Rizwan",
  role: "Software Engineer",
  field: "Software & Game Development"
};

const LOOKS = [
  {
    n: 1,
    src: "images/look1.png",
    name: "Business Formal",
    tag: "Required look",
    purpose: "Professional corporate look",
    a: ["OCEAN trait", "Conscientiousness"],
    b: ["Skill", "Professionalism & attention to detail"],
    caption:
      "A tailored light grey suit jacket, crisp black shirt, and a structured fit communicate reliability and attention to detail. This look represents Conscientiousness: being prepared, punctual and accountable in a formal setting.",
    outfit: [
      "Light grey tailored suit jacket",
      "Black button-down shirt",
      "Minimalist watch"
    ],
    setting: "Modern professional office interior with a dark feature wall and soft natural lighting from the window.",
    map: { message: "Reliable, detail-focused", skill: "Professionalism", trait: "Conscientiousness" }
  },
  {
    n: 2,
    src: "images/look2.png",
    name: "Skills in Action",
    tag: "Required look",
    purpose: "Business-casual + demonstrating a skill",
    a: ["OCEAN trait", "Agreeableness"],
    b: ["Skill", "Collaborative problem-solving"],
    caption:
      "A smart dark button-up shirt with a projector screen code background signals approachability and a readiness to work. While presenting code and explaining technical concepts in a university lab setting, I demonstrate collaborative problem-solving, which reflects Agreeableness and clear technical communication.",
    outfit: [
      "Dark button-up shirt with rolled sleeves",
      "Dark casual trousers",
      "Simple minimalist watch"
    ],
    setting: "University computer lab setting, standing at the front of the classroom next to a projector screen displaying code.",
    map: { message: "Approachable, hands-on", skill: "Collaborative problem-solving", trait: "Agreeableness" }
  },
  {
    n: 3,
    src: "images/look3.png",
    name: "Field-Specific Wear",
    tag: "Required look",
    purpose: "Attire related to my career field",
    a: ["Role", "Software / Game Developer"],
    b: ["Skill", "Technical expertise (C#, Unity)"],
    caption:
      "Comfortable dev-studio wear, such as a navy blue hoodie, dark jeans and an official developer ID lanyard, shows I fit tech-team culture and value function over formality. It represents the Software/Game Developer role and the technical skills behind it, like C# and Unity.",
    outfit: [
      "Navy blue hoodie",
      "Dark jeans",
      "Official badge lanyard and wristwatch"
    ],
    setting: "At a modern tech workspace workstation with code and game development editors visible on desktop screens.",
    map: { message: "Fits tech-team culture", skill: "Software / Game Developer", trait: "Role-focused" }
  },
  {
    n: 4,
    src: "images/look4.png",
    name: "Creative / Tech Professional",
    tag: "Required look",
    purpose: "Modern professional look",
    a: ["OCEAN trait", "Openness"],
    b: ["Skill", "Creative problem-solving & innovation"],
    caption:
      "A fitted dark blazer over a plain white tee, dark jeans and white sneakers communicate innovation, confidence and an eye for design. This look represents Openness to Experience: creative problem-solving and comfort with new ideas and technology in an open co-working space.",
    outfit: [
      "Dark navy blazer over plain white tee",
      "Dark blue denim jeans",
      "Clean white sneakers and watch"
    ],
    setting: "Bright open-plan creative workspace with large windows, agile workflow boards, and colleagues working in the background.",
    map: { message: "Innovative, design-aware", skill: "Creative problem-solving", trait: "Openness" }
  },
  {
    n: 5,
    src: "images/look5.png",
    name: "Remote Work",
    tag: "Chosen look",
    purpose: "Working professionally from home",
    a: ["OCEAN trait", "Emotional Stability"],
    b: ["Skill", "Self-management & virtual communication"],
    caption:
      "A clean white button-down shirt paired with a tidy, book-filled library backdrop shows I treat tasks and video collaboration as seriously as in-person meetings. It represents Emotional Stability and self-management: staying calm, organized and productive in an academic or study-from-home environment.",
    outfit: [
      "Crisp white button-down collared shirt",
      "Dark blue trousers",
      "Classic wristwatch"
    ],
    setting: "Seated at a desk with a laptop against a richly stocked wooden bookshelf filled with library books.",
    map: { message: "Polished and self-managed", skill: "Virtual communication", trait: "Emotional Stability" }
  },
  {
    n: 6,
    src: "images/look6.png",
    name: "Presentation / Interview",
    tag: "Chosen look",
    purpose: "Presenting ideas or interviewing",
    a: ["OCEAN trait", "Extraversion"],
    b: ["Skill", "Public speaking & communication"],
    caption:
      "A vibrant blue button-up shirt with rolled sleeves and a confident posture communicate preparedness and credibility. It represents Extraversion and communication skills: presenting ideas clearly, engaging an audience, and maintaining an active classroom or interview presence.",
    outfit: [
      "Vibrant blue long-sleeve shirt with rolled cuffs",
      "Metallic wristwatch",
      "Clean minimal accessories"
    ],
    setting: "Seated at a desk in a tiered university lecture hall or seminar room with peers seated behind.",
    map: { message: "Prepared and credible", skill: "Public speaking", trait: "Extraversion" }
  }
];

const OCEAN = [
  ["Openness", "Curious, creative, open to new ideas"],
  ["Conscientiousness", "Organized, dependable, detail-focused"],
  ["Extraversion", "Confident, expressive, energized by people"],
  ["Agreeableness", "Cooperative, respectful, team-minded"],
  ["Emotional Stability", "Calm, resilient, steady under pressure"]
];

const TAKEAWAYS = [
  ["Attire is communication", "Every outfit sends a message about reliability, creativity or confidence before I say a word."],
  ["Context shapes the choice", "Formal, business-casual, field-specific and remote settings each call for a different level of polish."],
  ["My core stays consistent", "Skills and character remain the same; what changes is how I present them to each audience."]
];

/* ============== Code below: no need to edit ============== */
const $ = (sel, root = document) => root.querySelector(sel);
const pad = n => String(n).padStart(2, "0");
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const N = LOOKS.length;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const gallery = $("#gallery");
const stage = $("#stage");
const detail = $("#detail");
const picker = $("#filePicker");

let mode = "orbit";
let active = null;

/* ---------- static text ---------- */
document.title = `${PROFILE.name} | Professional Image Portfolio`;
$("#brandName").textContent = PROFILE.name;
$("#heroLede").textContent = `${PROFILE.name}  |  ${PROFILE.role}  |  Career field: ${PROFILE.field}`;
$("#footName").textContent = `${PROFILE.name}  |  Professional Image Portfolio`;

/* ---------- placeholder (inline SVG, 4:5) ---------- */
function placeholder(look) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#E9E7F8"/>
    <rect x="28" y="28" width="744" height="944" rx="18" fill="none" stroke="#4F5BD9" stroke-width="4" stroke-dasharray="26 16"/>
    <circle cx="400" cy="300" r="110" fill="#B9C0FF"/>
    <path d="M170 700 A230 230 0 0 1 630 700 Z" fill="#B9C0FF"/>
    <text x="400" y="780" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#4F5BD9" text-anchor="middle" letter-spacing="4">LOOK ${pad(look.n)}</text>
    <text x="400" y="830" font-family="Arial,sans-serif" font-size="36" font-weight="700" fill="#2B2B85" text-anchor="middle">${look.name.replace("&", "&amp;")}</text>
    <text x="400" y="895" font-family="Arial,sans-serif" font-size="26" fill="#2B2B85" text-anchor="middle">Add your photo in the details panel</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- saved photos (best effort, this browser only) ---------- */
const keyFor = n => `portfolio-photo-${n}`;
const loadSaved = n => { try { return localStorage.getItem(keyFor(n)); } catch { return null; } };
const save = (n, data) => { try { localStorage.setItem(keyFor(n), data); } catch { /* storage full or blocked */ } };
const clearSaved = n => { try { localStorage.removeItem(keyFor(n)); } catch { /* ignore */ } };

/* ---------- build photo cards ---------- */
const cards = LOOKS.map((l, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card";
  btn.title = l.name;
  btn.setAttribute("aria-label", `Open look ${l.n}: ${l.name}`);
  btn.innerHTML = `
    <span class="float" style="animation-delay:${-i * 0.8}s">
      <span class="frame">
        <img alt="${l.name}" draggable="false" />
        <span class="shine"></span>
        <span class="num">${pad(l.n)}</span>
      </span>
    </span>
    <span class="tag">${l.name}</span>`;
  btn.addEventListener("click", () => (active === i ? closeCard() : openCard(i)));
  stage.appendChild(btn);
  return btn;
});
const imgs = cards.map(c => $("img", c));

function showPlaceholder(i) { imgs[i].onerror = null; imgs[i].src = placeholder(LOOKS[i]); }
function showReal(i, src) { imgs[i].onerror = () => showPlaceholder(i); imgs[i].src = src; }
LOOKS.forEach((l, i) => { const s = loadSaved(l.n); showReal(i, s || l.src); });

/* ---------- layouts ---------- */
const isNarrow = () => window.innerWidth < 860;

function positions(W, H, S) {
  const narrow = isNarrow();
  const rx = W / 2 - S * 0.62;
  const ry = H / 2 - S * 0.72;
  const tilts = [-6, 5, -3, 7, -5, 4];
  return LOOKS.map((_, i) => {
    const f = N > 1 ? i / (N - 1) : 0;
    let x, y;
    if (mode === "orbit") {
      const ang = -Math.PI / 2 + (i / N) * Math.PI * 2;
      x = rx * 0.9 * Math.cos(ang);
      y = ry * 0.95 * Math.sin(ang);
    } else if (narrow) {            // wave runs top to bottom on phones
      x = Math.sin(f * Math.PI * 2) * rx * 0.55;
      y = (f - 0.5) * 2 * ry * 0.92;
    } else {                        // wave runs left to right
      x = (f - 0.5) * 2 * rx * 0.95;
      y = Math.sin(f * Math.PI * 2) * ry * 0.5;
    }
    return { x, y, r: tilts[i % tilts.length], s: 1 };
  });
}

function layout(delayed = false) {
  const W = stage.clientWidth, H = stage.clientHeight;
  if (!W || !H) return;
  const narrow = isNarrow();
  const S = narrow ? clamp(Math.min(W * 0.27, H * 0.2), 84, 170) : clamp(Math.min(W * 0.17, H * 0.24), 90, 190);
  stage.style.setProperty("--size", S + "px");
  gallery.classList.toggle("has-active", active !== null);

  const pos = positions(W, H, S);
  const others = LOOKS.map((_, i) => i).filter(i => i !== active);

  cards.forEach((c, i) => {
    c.style.transitionDelay = delayed ? `${i * 0.12}s` : "0s";
    c.classList.add("ready");
    c.classList.toggle("is-active", active === i);
    c.classList.toggle("is-thumb", active !== null && active !== i);

    let p = pos[i];
    if (active !== null) {
      const ts = narrow ? 0.46 : 0.34;                       // thumbnail scale
      const thumbH = S * ts * 1.25;
      const stripH = thumbH + 26;
      const availH = H - stripH - 12;
      const cx = narrow ? 0 : -W * 0.245;                    // left half of the stage on desktop
      if (active === i) {
        const sc = Math.min((narrow ? W * 0.62 : W * 0.4) / S, availH / (S * 1.25), 2.6);
        p = { x: cx, y: -H / 2 + 8 + availH / 2, r: 0, s: sc };
      } else {
        const k = others.indexOf(i);
        const gap = S * ts * 1.3;
        p = { x: cx + (k - (others.length - 1) / 2) * gap, y: H / 2 - thumbH / 2 - 10, r: 0, s: ts };
      }
    }
    c.style.setProperty("--x", p.x + "px");
    c.style.setProperty("--y", p.y + "px");
    c.style.setProperty("--r", p.r + "deg");
    c.style.setProperty("--s", p.s);
  });
}

/* ---------- details panel ---------- */
function renderDetail(i) {
  const l = LOOKS[i];
  const saved = !!loadSaved(l.n);
  detail.innerHTML = `
    <div class="d-top">
      <span class="chip ${l.tag.startsWith("Req") ? "chip-req" : "chip-chosen"}">Look ${pad(l.n)} &middot; ${l.tag}</span>
      <span class="count">${i + 1} / ${N}</span>
      <button class="icon-btn" data-act="close" type="button" aria-label="Close details">&times;</button>
    </div>
    <h2>${l.name}</h2>
    <p class="purpose">${l.purpose}</p>

    <div class="info">
      <div class="info-card info-a"><span>${l.a[0]}</span><strong>${l.a[1]}</strong></div>
      <div class="info-card info-b"><span>${l.b[0]}</span><strong>${l.b[1]}</strong></div>
    </div>

    <blockquote class="caption">
      <span class="label">Caption</span>
      <p>${l.caption}</p>
    </blockquote>

    <div class="details">
      <div>
        <h3>Outfit &amp; styling</h3>
        <ul>${l.outfit.map(o => `<li>${o}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Photo setting</h3>
        <p>${l.setting}</p>
      </div>
    </div>

    <div class="d-actions">
      <button class="icon-btn" data-act="prev" type="button" aria-label="Previous look">&larr;</button>
      <button class="icon-btn" data-act="next" type="button" aria-label="Next look">&rarr;</button>
      <span class="spacer"></span>
      <button class="btn btn-small" data-act="add" type="button">Add / change photo</button>
      <button class="btn btn-small btn-ghost-light" data-act="reset" type="button" ${saved ? "" : "hidden"}>Remove</button>
    </div>`;
}

function openCard(i) {
  active = i;
  renderDetail(i);
  detail.classList.remove("is-open");
  void detail.offsetWidth;                  // restart the pop-in animation
  detail.classList.add("is-open");
  layout();
  // bring the photo stage fully into view so the photo and its details are seen together
  const r = stage.getBoundingClientRect();
  if (r.top > 90 || r.top < 40 || (!isNarrow() && r.bottom > window.innerHeight)) {
    gallery.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
}

function closeCard() {
  active = null;
  detail.classList.remove("is-open");
  layout();
}

detail.addEventListener("click", e => {
  const btn = e.target.closest("[data-act]");
  if (!btn || active === null) return;
  const act = btn.dataset.act;
  if (act === "close") closeCard();
  if (act === "next") openCard((active + 1) % N);
  if (act === "prev") openCard((active - 1 + N) % N);
  if (act === "add") { picker.value = ""; picker.click(); }
  if (act === "reset") {
    clearSaved(LOOKS[active].n);
    showReal(active, LOOKS[active].src);
    btn.hidden = true;
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCard();
  if (active !== null && e.key === "ArrowRight") openCard((active + 1) % N);
  if (active !== null && e.key === "ArrowLeft") openCard((active - 1 + N) % N);
});

/* click empty space on the stage to close */
stage.addEventListener("click", e => { if ((e.target === stage || e.target.closest(".core")) && active !== null) closeCard(); });

/* ---------- local photo picker (resizes before saving) ---------- */
picker.addEventListener("change", () => {
  const file = picker.files && picker.files[0];
  if (!file || active === null) return;
  const idx = active;
  const reader = new FileReader();
  reader.onload = () => {
    const tmp = new Image();
    tmp.onload = () => {
      const max = 1100, scale = Math.min(1, max / Math.max(tmp.width, tmp.height));
      const c = document.createElement("canvas");
      c.width = Math.round(tmp.width * scale);
      c.height = Math.round(tmp.height * scale);
      c.getContext("2d").drawImage(tmp, 0, 0, c.width, c.height);
      const data = c.toDataURL("image/jpeg", 0.86);
      save(LOOKS[idx].n, data);
      showReal(idx, data);
      const rb = $('[data-act="reset"]', detail);
      if (rb && active === idx) rb.hidden = false;
    };
    tmp.src = reader.result;
  };
  reader.readAsDataURL(file);
});

/* ---------- layout switcher ---------- */
document.querySelectorAll(".chip-btn").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("is-on"));
    chip.classList.add("is-on");
    mode = chip.dataset.layout;
    if (active !== null) closeCard(); else layout();
  });
});

/* relayout when the stage changes size (window resize, mobile panel) */
if ("ResizeObserver" in window) new ResizeObserver(() => layout()).observe(stage);
else window.addEventListener("resize", () => layout());

/* ---------- background fizz ---------- */
const fizz = $("#fizz");
for (let i = 0; i < 26; i++) {
  const b = document.createElement("span");
  const size = 6 + Math.random() * 24;
  b.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
                    `animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;`;
  fizz.appendChild(b);
}

/* ---------- summary table, OCEAN guide, takeaways ---------- */
$("#mapBody").innerHTML = LOOKS.map(l => `
  <tr>
    <td data-label="Look"><strong>${pad(l.n)} &nbsp;${l.name}</strong></td>
    <td data-label="Attire communicates">${l.map.message}</td>
    <td data-label="Skill / role">${l.map.skill}</td>
    <td data-label="OCEAN trait"><span class="trait">${l.map.trait}</span></td>
  </tr>`).join("");

$("#oceanGrid").innerHTML = OCEAN.map(o => `
  <div class="ocean-card reveal"><strong>${o[0]}</strong><span>${o[1]}</span></div>`).join("");

$("#takeGrid").innerHTML = TAKEAWAYS.map((t, i) => `
  <div class="take reveal" style="--d:${i * 90}ms">
    <span class="take-num">${i + 1}</span>
    <h3>${t[0]}</h3>
    <p>${t[1]}</p>
  </div>`).join("");

/* ---------- print sheet (all looks + details, used by "Save as PDF") ---------- */
$("#printSheet").innerHTML = `<h1>${PROFILE.name} | Professional Image Portfolio</h1>` + LOOKS.map(l => `
  <article class="print-look">
    <img alt="" data-n="${l.n}" />
    <div>
      <p class="p-tag">Look ${pad(l.n)} &middot; ${l.tag}</p>
      <h2>${l.name}</h2>
      <p class="p-purpose">${l.purpose}</p>
      <p><strong>${l.a[0]}:</strong> ${l.a[1]} &nbsp;|&nbsp; <strong>${l.b[0]}:</strong> ${l.b[1]}</p>
      <p class="p-cap"><em>${l.caption}</em></p>
      <p><strong>Outfit &amp; styling:</strong> ${l.outfit.join("; ")}.</p>
      <p><strong>Photo setting:</strong> ${l.setting}</p>
    </div>
  </article>`).join("");

function syncPrintImages() {
  document.querySelectorAll("#printSheet img").forEach(img => { img.src = imgs[Number(img.dataset.n) - 1].src; });
}
window.addEventListener("beforeprint", syncPrintImages);
$("#printBtn").addEventListener("click", () => { syncPrintImages(); window.print(); });

/* ---------- scroll reveal, progress bar, active nav ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

const bar = $("#progress");
function onScroll() {
  const h = document.documentElement;
  const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  bar.style.transform = `scaleX(${clamp(p, 0, 1)})`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const navLinks = [...document.querySelectorAll(".nav a")];
const targets = navLinks.map(a => $(a.getAttribute("href")));
if ("IntersectionObserver" in window) {
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(a => a.removeAttribute("aria-current"));
        const i = targets.indexOf(en.target);
        if (i > -1) navLinks[i].setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  targets.forEach(t => t && navIO.observe(t));
}

/* ---------- intro: photos fly out from the centre ---------- */
requestAnimationFrame(() => setTimeout(() => layout(true), 150));
setTimeout(() => cards.forEach(c => (c.style.transitionDelay = "0s")), 2400);


