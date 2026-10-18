/* =====================================================
   EDIT THIS PART: your 5 photos + captions
   - put your images in an "images" folder next to index.html
   - until a real file is found, a colourful placeholder shows
   ===================================================== */
const photos = [
  { src: "images/pic1.jpg", title: "First Moment",  caption: "Write one or two lines about this photo here. Where was it taken, what does it mean to you?" },
  { src: "images/pic2.jpg", title: "Second Moment", caption: "Another short caption goes here. Keep it to a line or two so it reads nicely." },
  { src: "images/pic3.jpg", title: "Third Moment",  caption: "Tell the story behind this one. A memory, a project, a place you love." },
  { src: "images/pic4.jpg", title: "Fourth Moment", caption: "Captions appear with a typewriter effect when you click a photo." },
  { src: "images/pic5.jpg", title: "Fifth Moment",  caption: "Swap these titles and captions for your own and you're done." }
];

/* ================= Code below: no need to edit ================= */
const stage   = document.getElementById("stage");
const panel   = document.getElementById("panel");
const capTitle = document.getElementById("capTitle");
const capText  = document.getElementById("capText");
const countEl  = document.getElementById("count");
const n = photos.length;

let mode = "orbit";
let active = null;
let typer = null;

/* ---------- placeholder image (inline SVG) ---------- */
function placeholder(i) {
  const pairs = [["#4f5bd9", "#f2c883"], ["#2b2b85", "#fff4dc"], ["#98a4ff", "#d08f43"], ["#17144a", "#f2c883"], ["#4f5bd9", "#fff4dc"]];
  const [a, b] = pairs[i % pairs.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#g)"/>
    <circle cx="300" cy="120" r="70" fill="#fff4dc" opacity=".25"/>
    <circle cx="110" cy="380" r="110" fill="#0f0d2e" opacity=".18"/>
    <text x="200" y="270" font-family="Georgia,serif" font-size="64" fill="#fff4dc" text-anchor="middle">${i + 1}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- build cards ---------- */
const cards = photos.map((p, i) => {
  const btn = document.createElement("button");
  btn.className = "card";
  btn.setAttribute("aria-label", `Open photo ${i + 1}: ${p.title}`);
  btn.innerHTML = `
    <span class="float" style="animation-delay:${-i * 0.9}s">
      <span class="frame">
        <img src="${p.src}" alt="${p.title}" draggable="false" />
        <span class="shine"></span>
      </span>
    </span>`;
  btn.querySelector("img").addEventListener("error", e => {
    e.target.onerror = null;
    e.target.src = placeholder(i);
  });
  btn.addEventListener("click", () => (active === i ? closeCard() : openCard(i)));
  stage.appendChild(btn);
  return btn;
});

/* ---------- layouts ---------- */
function positions(W, H, S) {
  const rx = W / 2 - S * 0.62;
  const ry = H / 2 - S * 0.72;
  const tilts = [-6, 5, -3, 7, -5];
  const out = [];

  for (let i = 0; i < n; i++) {
    const f = n > 1 ? i / (n - 1) : 0;
    let x, y;

    if (mode === "orbit") {
      const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
      x = rx * 0.9 * Math.cos(ang);
      y = ry * 0.82 * Math.sin(ang);
    } else { // wave
      x = (f - 0.5) * 2 * rx * 0.95;
      y = Math.sin(f * Math.PI * 2) * ry * 0.5;
    }
    out.push({ x, y, r: tilts[i % tilts.length], s: 1 });
  }
  return out;
}

function layout(delayed = false) {
  const W = stage.clientWidth, H = stage.clientHeight;
  const S = Math.max(96, Math.min(220, Math.min(W * 0.26, H * 0.3)));
  stage.style.setProperty("--size", S + "px");
  stage.classList.toggle("has-active", active !== null);

  const pos = positions(W, H, S);

  cards.forEach((c, i) => {
    c.style.transitionDelay = delayed ? `${i * 0.12}s` : "0s";
    c.classList.add("ready");
    c.classList.toggle("is-active", active === i);
    c.classList.toggle("is-dim", active !== null && active !== i);

    let p = pos[i];
    if (active === i) {
      const availH = H - 190;                           // room left above the caption
      const sc = Math.min((W * 0.86) / S, availH / (S * 1.25), 3.1);
      p = { x: 0, y: (availH - H) / 2 + 6, r: 0, s: sc };
    } else if (active !== null) {
      p = { ...p, s: 0.6 };
    }
    c.style.setProperty("--x", p.x + "px");
    c.style.setProperty("--y", p.y + "px");
    c.style.setProperty("--r", p.r + "deg");
    c.style.setProperty("--s", p.s);
  });
}

/* ---------- open / close caption ---------- */
function typeWrite(text) {
  clearInterval(typer);
  capText.textContent = "";
  capText.classList.remove("done");
  let k = 0;
  typer = setInterval(() => {
    capText.textContent = text.slice(0, ++k);
    if (k >= text.length) { clearInterval(typer); capText.classList.add("done"); }
  }, 22);
}

function openCard(i) {
  active = i;
  capTitle.textContent = photos[i].title;
  countEl.textContent = `${i + 1} / ${n}`;
  panel.classList.add("is-open");
  typeWrite(photos[i].caption);
  layout();
}

function closeCard() {
  active = null;
  clearInterval(typer);
  panel.classList.remove("is-open");
  layout();
}

document.getElementById("close").addEventListener("click", closeCard);
document.getElementById("next").addEventListener("click", () => openCard(((active ?? -1) + 1) % n));
document.getElementById("prev").addEventListener("click", () => openCard(((active ?? 0) - 1 + n) % n));

window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCard();
  if (active !== null && e.key === "ArrowRight") openCard((active + 1) % n);
  if (active !== null && e.key === "ArrowLeft")  openCard((active - 1 + n) % n);
});

/* click empty space to close */
stage.addEventListener("click", e => {
  if (e.target === stage && active !== null) closeCard();
});

/* ---------- layout switcher ---------- */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("is-on"));
    chip.classList.add("is-on");
    mode = chip.dataset.layout;
    if (active !== null) closeCard(); else layout();
  });
});

window.addEventListener("resize", () => layout());

/* ---------- background fizz bubbles ---------- */
const fizz = document.getElementById("fizz");
for (let i = 0; i < 34; i++) {
  const b = document.createElement("span");
  const size = 6 + Math.random() * 26;
  b.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
                    `animation-duration:${9 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;`;
  fizz.appendChild(b);
}

/* ---------- cursor glow ---------- */
const glow = document.querySelector(".glow");
window.addEventListener("pointermove", e => {
  glow.style.setProperty("--gx", e.clientX + "px");
  glow.style.setProperty("--gy", e.clientY + "px");
});

/* ---------- intro: photos fly out from the centre ---------- */
requestAnimationFrame(() => setTimeout(() => layout(true), 150));
setTimeout(() => cards.forEach(c => (c.style.transitionDelay = "0s")), 2200);
