/* =====================================================================
   script.js : ส่วนที่ทำให้เว็บ "ขยับได้"
   สารบัญ
   1. ธีมอัตโนมัติตามเวลาไทย + ปุ่มสลับธีม
   2. เอฟเฟกต์พิมพ์ข้อความ (Typing)
   3. เมนูมือถือ + ไฮไลต์เมนูตามหัวข้อที่กำลังดู
   4. แถบ progress ตอนเลื่อนหน้า
   5. Scroll Reveal (ค่อยๆ โผล่ตอนเลื่อนถึง)
   6. ตัวเลขวิ่งนับขึ้น (Counter)
   7. การ์ดเอียงตามเมาส์ (Tilt)
   8. วงแสงตามเมาส์ + ปีใน footer
   ===================================================================== */


/* ---------- 1. ธีมอัตโนมัติ + ปุ่มสลับธีม ---------- */

// ภาษาปัจจุบัน: "th" หรือ "en" (ข้อความทั้งหมดอยู่ในไฟล์ lang.js)
// ลำดับการเลือก: ภาษาที่เคยกดเลือกไว้ -> ถ้าไม่มี ดูภาษาของเบราว์เซอร์ (ไทย = th นอกนั้น = en)
let lang = (navigator.language || "").toLowerCase().startsWith("th") ? "th" : "en";
try {
  const savedLang = localStorage.getItem("lang");
  if (savedLang === "th" || savedLang === "en") lang = savedLang;
} catch (e) {}

const html = document.documentElement;                // แท็ก <html> (เราเปลี่ยนธีมผ่าน attribute data-theme)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

// โหมดที่มี: auto (ตามเวลาไทย) -> light -> dark แล้ววนกลับ
const MODES = ["auto", "light", "dark"];
const MODE_INFO = {
  auto:  { icon: "🌓", label: "Auto"  },
  light: { icon: "☀️", label: "Light" },
  dark:  { icon: "🌙", label: "Dark"  },
};

// กำหนดช่วงเวลากลางวัน (เวลาไทย) แก้ตัวเลขได้ตามชอบ
const DAY_START = 6;    // 06:00 เริ่มกลางวัน
const DAY_END = 18;     // 18:00 เริ่มกลางคืน

// อ่านโหมดที่เคยเลือกไว้ (เก็บในเบราว์เซอร์) ถ้าไม่มีให้ใช้ auto
let mode = "auto";
try { mode = localStorage.getItem("theme-mode") || "auto"; } catch (e) {}
if (!MODES.includes(mode)) mode = "auto";

/** คืนค่าชั่วโมงปัจจุบัน (0-23) ตามเวลาไทย ไม่ว่าเครื่องจะตั้ง timezone อะไร */
function getThaiHour() {
  const h = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone: "Asia/Bangkok",
  }).format(new Date());
  return parseInt(h, 10);
}

/** ตัดสินว่าตอนนี้ควรเป็นธีมอะไร */
function resolveTheme() {
  if (mode === "light" || mode === "dark") return mode;   // ผู้ใช้เลือกเอง
  const hour = getThaiHour();                             // โหมด auto: ดูเวลาไทย
  return hour >= DAY_START && hour < DAY_END ? "light" : "dark";
}

/** ใส่ธีมลงหน้าเว็บ + อัปเดตปุ่ม */
function applyTheme() {
  html.setAttribute("data-theme", resolveTheme());
  themeIcon.textContent = MODE_INFO[mode].icon;
  themeLabel.textContent = I18N[lang]["theme." + mode];   // ชื่อโหมดตามภาษาที่เลือก (lang.js)
}

// กดปุ่ม = สลับโหมดถัดไป
themeToggle.addEventListener("click", () => {
  mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
  try { localStorage.setItem("theme-mode", mode); } catch (e) {}
  applyTheme();
});

applyTheme();
// ถ้าเปิดเว็บค้างไว้ข้ามช่วงเวลา (เช่น 18:00) ให้ธีมเปลี่ยนเองทุก 1 นาที (เฉพาะโหมด auto)
setInterval(() => {
  if (mode === "auto") applyTheme();
  updateGreeting();   // คำทักทายก็เปลี่ยนตามเวลาด้วย (ฟังก์ชันอยู่ส่วนที่ 10)
}, 60 * 1000);


/* ---------- 2. เอฟเฟกต์พิมพ์ข้อความ ---------- */

// ✏️ ข้อความที่จะพิมพ์วนไปมา อยู่ใน lang.js ตัวแปร roles (แยกตามภาษา)
let roles = I18N[lang].roles;

const typingEl = document.getElementById("typing");
let roleIndex = 0;     // กำลังพิมพ์ข้อความลำดับที่เท่าไร
let charIndex = 0;     // พิมพ์ไปกี่ตัวอักษรแล้ว
let deleting = false;  // กำลังลบอยู่หรือเปล่า

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;                                    // พิมพ์เพิ่มทีละตัว
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {             // พิมพ์ครบ -> หยุดค้างไว้แป๊บ แล้วเริ่มลบ
      deleting = true;
      return setTimeout(type, 1600);
    }
  } else {
    charIndex--;                                    // ลบทีละตัว
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {                          // ลบหมด -> ไปข้อความถัดไป
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 40 : 85);             // ความเร็ว: ลบเร็วกว่าพิมพ์
}
type();


/* ---------- 3. เมนูมือถือ + ไฮไลต์เมนู ---------- */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// กดปุ่มแฮมเบอร์เกอร์ = เปิด/ปิดเมนู
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
// กดลิงก์ในเมนูแล้วให้เมนูปิดเอง
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ไฮไลต์ลิงก์เมนูตามหัวข้อที่กำลังอยู่บนหน้าจอ
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }   // นับว่า "กำลังดู" เมื่อหัวข้ออยู่กลางจอ
);
sections.forEach((s) => sectionObserver.observe(s));


/* ---------- 4. แถบ progress ---------- */

const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
}, { passive: true });


/* ---------- 5. Scroll Reveal ---------- */

// เมื่อ element ที่มีคลาส .reveal เลื่อนเข้ามาในจอ ให้เติมคลาส .visible (CSS จะทำแอนิเมชันให้)
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);               // แสดงแล้วไม่ต้องดูต่อ
      }
    });
  },
  { threshold: 0.15 }                              // โผล่เมื่อเห็น 15% ของ element
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  // หน่วงเวลาเล็กน้อยให้การ์ดที่อยู่ข้างกันโผล่ไล่กัน
  el.style.transitionDelay = (i % 3) * 0.08 + "s";
  revealObserver.observe(el);
});


/* ---------- 6. ตัวเลขวิ่งนับขึ้น ---------- */

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);   // เลขปลายทางจาก data-count ใน HTML
  if (!target) { el.textContent = target; return; }
  const duration = 1200;                           // ระยะเวลา (มิลลิวินาที)
  const start = performance.now();

  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// 💡 พอเพิ่มโปรเจ็กต์จริง ตัวเลข Projects จะนับให้อัตโนมัติ (ไม่นับการ์ด placeholder)
const realProjects = document.querySelectorAll(".project-card:not(.placeholder)").length;
const projectCountEl = document.getElementById("projectCount");
projectCountEl.dataset.count = realProjects;
// เลือกคีย์ข้อความ (ใน lang.js) ให้ป้ายใต้ตัวเลข ตามว่ามีโปรเจ็กต์จริงหรือยัง
projectCountEl.closest(".stat").querySelector("span").dataset.i18n =
  realProjects > 0 ? "stat.projects" : "stat.projectsSoon";


/* ---------- 7. การ์ดเอียงตามเมาส์ (Tilt) ---------- */

// ใช้เฉพาะอุปกรณ์ที่มีเมาส์จริง (มือถือข้ามไป)
if (window.matchMedia("(hover: hover)").matches) {
  const MAX_TILT = 8;   // เอียงสูงสุดกี่องศา (เพิ่มเลขเพื่อให้เอียงแรงขึ้น)

  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      // ตำแหน่งเมาส์ในการ์ด แปลงเป็นช่วง -0.5 ถึง 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", x * MAX_TILT * 2 + "deg");
      card.style.setProperty("--rx", -y * MAX_TILT * 2 + "deg");
    });
    // เมาส์ออก = กลับมาตรงเหมือนเดิม
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}


/* ---------- 7.5 กดรูปเกียรติบัตรเพื่อขยาย (Lightbox) ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
// กดรูปในการ์ดเกียรติบัตร -> เปิดรูปใหญ่
document.querySelectorAll(".cert-thumb img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
// ปิดได้ 3 วิธี: กดปุ่ม ✕, กดพื้นที่ว่างรอบรูป, หรือกดปุ่ม Esc
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });


/* ---------- 8. วงแสงตามเมาส์ + ปีใน footer ---------- */

const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
}, { passive: true });

// ใส่ปีปัจจุบันใน footer อัตโนมัติ
document.getElementById("year").textContent = new Date().getFullYear();


/* ---------- 9. สลับภาษา ไทย / English ---------- */

const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");

/** เริ่มพิมพ์ข้อความหัวเว็บใหม่ตั้งแต่ต้น (ใช้ตอนเปลี่ยนภาษา) */
function resetTyping() {
  roleIndex = 0;
  charIndex = 0;
  deleting = false;
  typingEl.textContent = "";
}

/** แทนข้อความทุกจุดที่มี data-i18n ด้วยข้อความของภาษาปัจจุบัน */
function applyLanguage() {
  const dict = I18N[lang];
  html.setAttribute("lang", lang);            // บอกเบราว์เซอร์/Google ว่าตอนนี้เป็นภาษาอะไร
  document.title = dict["meta.title"];        // ชื่อบนแท็บ
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });
  langLabel.textContent = lang === "th" ? "EN" : "TH";   // ปุ่มโชว์ภาษาที่จะเปลี่ยนไป
  langToggle.title = dict["lang.title"];
  // ข้อความที่ใช้ data-i18n-title จะเปลี่ยน tooltip (title) และ aria-label ตามภาษา (เช่น ปุ่มคัดลอก, ปุ่ม terminal)
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const text = dict[el.dataset.i18nTitle];
    if (text !== undefined) {
      el.title = text;
      el.setAttribute("aria-label", text);
    }
  });
  roles = dict.roles;                         // ข้อความพิมพ์วนที่หัวเว็บ
  resetTyping();
  applyTheme();                               // อัปเดตชื่อโหมดธีม (Auto/อัตโนมัติ ฯลฯ)
  updateGreeting();                           // อัปเดตคำทักทายตามภาษา
  hideBubble();                               // ซ่อนคำพูดของนักพัฒนา (ข้อความเก่าเป็นคนละภาษา)
}

/** ตั้งภาษา ("th" หรือ "en") แล้วจำไว้ในเบราว์เซอร์ (ใช้ทั้งจากปุ่มและจากคำสั่งใน terminal) */
function setLanguage(newLang) {
  lang = newLang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLanguage();
}

// กดปุ่ม = สลับภาษา
langToggle.addEventListener("click", () => setLanguage(lang === "th" ? "en" : "th"));

/* ---------- 10. คำทักทายตามเวลาไทย ---------- */

const greetingEl = document.getElementById("greeting");

/** เลือกคำทักทายตามชั่วโมงเวลาไทย แล้วแสดงเป็นภาษาที่เลือกอยู่ */
function updateGreeting() {
  const h = getThaiHour();
  let key = "greet.night";                                  // ค่าเริ่มต้น = ดึก (21:00 - 04:59)
  if (h >= 5 && h < 12) key = "greet.morning";              // เช้า
  else if (h >= 12 && h < 17) key = "greet.afternoon";      // บ่าย
  else if (h >= 17 && h < 21) key = "greet.evening";        // เย็น
  greetingEl.textContent = I18N[lang][key];
}


/* ---------- 11. ปุ่มคัดลอก + ข้อความแจ้งเตือน (Toast) ---------- */

const toast = document.getElementById("toast");
let toastTimer;

/** แสดงข้อความแจ้งเตือนด้านล่างจอ 2.2 วินาทีแล้วหายเอง */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/** คัดลอกข้อความลงคลิปบอร์ด คืนค่า true ถ้าสำเร็จ (มีวิธีสำรองสำหรับเบราว์เซอร์/หน้าเว็บที่ไม่ใช่ https) */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

// ปุ่มไหนมี data-copy="ข้อความ" กดแล้วจะคัดลอกข้อความนั้น
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const ok = await copyText(btn.dataset.copy);
    showToast(I18N[lang][ok ? "toast.copied" : "toast.failed"]);
  });
});


/* ---------- 12. Terminal ซ่อน (Easter egg) ---------- */

// ✏️ ลิงก์ที่คำสั่ง github / demo จะเปิด (แก้ที่นี่ถ้าเปลี่ยนลิงก์)
const URLS = {
  github: "https://github.com/sitthaforwork",
  demo: "https://song-finder-j6qm.onrender.com/",
};

const termEl = document.getElementById("terminal");
const termOut = document.getElementById("termOut");
const termInput = document.getElementById("termInput");
let termHistory = [];      // คำสั่งที่เคยพิมพ์ (กด ↑ ↓ เพื่อย้อนดู)
let termHistIdx = 0;       // ตำแหน่งปัจจุบันในประวัติ
let termWelcomed = false;  // แสดงข้อความต้อนรับไปแล้วหรือยัง
let termLastFocus = null;  // ปิด terminal แล้วจะคืนโฟกัสให้ element เดิม

/** ดึงข้อความจาก lang.js ตามภาษาปัจจุบัน และแทนที่ {ตัวแปร} เช่น {cmd} */
function T(key, vars = {}) {
  let s = I18N[lang][key] || "";
  for (const k in vars) s = s.replaceAll("{" + k + "}", vars[k]);
  return s;
}

/** พิมพ์ข้อความลง terminal ทีละบรรทัด (ใช้ textContent เพื่อความปลอดภัย ไม่แปลงเป็น HTML) */
function termPrint(text, cls) {
  text.split("\n").forEach((line) => {
    const div = document.createElement("div");
    div.textContent = line === "" ? " " : line;
    if (cls) div.className = cls;
    termOut.appendChild(div);
  });
  termOut.scrollTop = termOut.scrollHeight;   // เลื่อนลงล่างสุดเสมอ
}

function openTerminal() {
  termLastFocus = document.activeElement;
  termEl.classList.add("open");
  termEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  if (!termWelcomed) {
    termPrint(T("term.welcome"));
    termWelcomed = true;
  }
  termInput.focus();
}

function closeTerminal() {
  termEl.classList.remove("open");
  termEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  if (termLastFocus && termLastFocus.focus) termLastFocus.focus();
}

/* รายการคำสั่งทั้งหมด: ชื่อคำสั่ง -> ฟังก์ชัน (เพิ่มคำสั่งใหม่ได้ที่นี่)
   skills / projects / certs / contact อ่านข้อมูลจากหน้าเว็บโดยตรง
   พอเพิ่มโปรเจ็กต์หรือเกียรติบัตรในหน้าเว็บ terminal จะแสดงให้เองอัตโนมัติ */
const termCommands = {
  help: () => termPrint(T("term.help")),
  about: () => termPrint(T("about.p1") + "\n\n" + T("about.p2")),
  whoami: () => termPrint(T("hero.fullname")),
  edu: () => termPrint(T("edu.uni") + "\n" + T("edu.faculty") + "\n" + T("edu.major")),

  skills: () => {
    document.querySelectorAll(".skill-card").forEach((card) => {
      const chips = [...card.querySelectorAll(".chips span")].map((s) => s.textContent).join(", ");
      termPrint(card.querySelector("h3").textContent + "\n  " + chips + "\n");
    });
  },

  projects: () => {
    const cards = document.querySelectorAll(".project-card:not(.placeholder)");
    if (!cards.length) return termPrint(T("term.none"));
    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent;
      const desc = card.querySelector("p").textContent.replace(/\s+/g, " ").trim();
      const links = [...card.querySelectorAll(".project-links a")]
        .map((a) => "  → " + a.textContent.replace(" ↗", "") + ": " + a.href)
        .join("\n");
      termPrint("▸ " + title + "\n  " + desc + "\n" + links + "\n");
    });
  },

  certs: () => {
    const cards = document.querySelectorAll(".cert-card:not(.placeholder)");
    if (!cards.length) return termPrint(T("term.none"));
    cards.forEach((card) => {
      termPrint("▸ " + card.querySelector("h3").textContent + "\n  " + card.querySelector(".cert-date").textContent + "\n");
    });
  },

  contact: () => {
    document.querySelectorAll(".contact-item").forEach((item) => {
      const label = item.querySelector("small").textContent;
      const value = item.querySelector(".ci-text").lastChild.textContent.trim();   // ข้อความท้ายสุดในการ์ด (ต่อจาก <small>)
      termPrint(label + ": " + value);
    });
  },

  github: () => {
    termPrint(T("term.opening", { v: "GitHub" }));
    window.open(URLS.github, "_blank", "noopener");
  },
  demo: () => {
    termPrint(T("term.opening", { v: "Song Finder" }));
    window.open(URLS.demo, "_blank", "noopener");
  },

  theme: (args) => {
    const v = (args[0] || "").toLowerCase();
    if (!MODES.includes(v)) return termPrint(T("term.usageTheme"));
    mode = v;
    try { localStorage.setItem("theme-mode", mode); } catch (e) {}
    applyTheme();
    termPrint(T("term.themeSet", { v }));
  },

  lang: (args) => {
    const v = (args[0] || "").toLowerCase();
    if (v !== "th" && v !== "en") return termPrint(T("term.usageLang"));
    setLanguage(v);
    termPrint(T("term.langSet", { v }));   // พิมพ์หลังเปลี่ยนภาษา จึงออกเป็นภาษาใหม่
  },

  clear: () => termOut.replaceChildren(),
  exit: () => closeTerminal(),

  // 🥚 ของเล่น: ลองพิมพ์ sudo hire sittha
  sudo: (args) => termPrint(args.join(" ").toLowerCase() === "hire sittha" ? T("term.hire") : T("term.sudoDenied")),
};
termCommands.quit = termCommands.exit;

/** รันคำสั่งที่พิมพ์ */
function runCommand(raw) {
  termPrint("guest@sittha:~$ " + raw, "term-cmd");   // แสดงสิ่งที่พิมพ์ซ้ำ เหมือน terminal จริง
  const value = raw.trim();
  if (!value) return;
  termHistory.push(value);
  termHistIdx = termHistory.length;
  const [name, ...args] = value.split(/\s+/);
  const key = name.toLowerCase();
  if (Object.hasOwn(termCommands, key)) termCommands[key](args);
  else termPrint(T("term.unknown", { cmd: name }));
}

termInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runCommand(termInput.value);
    termInput.value = "";
  } else if (e.key === "ArrowUp") {                 // ย้อนไปคำสั่งก่อนหน้า
    e.preventDefault();
    if (termHistIdx > 0) termInput.value = termHistory[--termHistIdx];
  } else if (e.key === "ArrowDown") {               // ไปคำสั่งถัดไป
    e.preventDefault();
    termHistIdx = Math.min(termHistIdx + 1, termHistory.length);
    termInput.value = termHistory[termHistIdx] || "";
  } else if (e.key === "Tab") {                     // เติมคำสั่งอัตโนมัติ (ถ้าตรงกับคำสั่งเดียว)
    e.preventDefault();
    const typed = termInput.value.toLowerCase();
    const matches = Object.keys(termCommands).filter((c) => typed && c.startsWith(typed));
    if (matches.length === 1) termInput.value = matches[0];
  } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {   // Ctrl+L = ล้างหน้าจอ
    e.preventDefault();
    termCommands.clear();
  }
});

// เปิด/ปิด terminal: ปุ่ม >_ , ปุ่ม ✕ , กดพื้นที่มืดรอบหน้าต่าง , ปุ่ม Esc และปุ่ม ` (ใช้ได้ทุกเลย์เอาต์คีย์บอร์ด รวมคีย์บอร์ดไทย)
document.getElementById("terminalFab").addEventListener("click", openTerminal);
document.getElementById("terminalClose").addEventListener("click", closeTerminal);
termEl.addEventListener("click", (e) => { if (e.target === termEl) closeTerminal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && termEl.classList.contains("open")) closeTerminal();
  if (e.code === "Backquote" && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;   // กำลังพิมพ์อยู่ ไม่ต้องเปิด
    e.preventDefault();
    termEl.classList.contains("open") ? closeTerminal() : openTerminal();
  }
});


/* ---------- 13. เคอร์เซอร์แบบกำหนดเอง (จุด + วงแหวน) ---------- */

// เปิดเฉพาะอุปกรณ์ที่มีเมาส์จริง และผู้ใช้ไม่ได้ตั้งค่า "ลดการเคลื่อนไหว"
const useCustomCursor =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (useCustomCursor) {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  document.body.classList.add("custom-cursor");   // CSS จะซ่อนเคอร์เซอร์เดิมและแสดงจุด/วงแหวน

  let mx = -100, my = -100;   // ตำแหน่งเมาส์จริง
  let rx = -100, ry = -100;   // ตำแหน่งวงแหวน (ไล่ตามเมาส์แบบนุ่มๆ)
  dot.style.transform = ring.style.transform = "translate(-100px, -100px)";

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;   // จุดตามเมาส์ทันที
  }, { passive: true });

  // วงแหวนวิ่งเข้าหาเมาส์ทีละนิดทุกเฟรม (0.18 = ความหน่วง ยิ่งน้อยยิ่งหน่วงมาก)
  (function followLoop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(followLoop);
  })();

  // ชี้ลิงก์/ปุ่ม/รูปที่กดได้ = วงแหวนขยาย  (แก้รายการ selector ได้ตามต้องการ)
  const HOVER_SELECTOR = "a, button, summary, input, label, .cert-thumb img";
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("hover", !!e.target.closest(HOVER_SELECTOR));
  });
  document.addEventListener("mousedown", () => ring.classList.add("down"));
  document.addEventListener("mouseup", () => ring.classList.remove("down"));

  // เมาส์ออกนอกหน้าต่างเบราว์เซอร์ = ซ่อน เข้ามาใหม่ = แสดง
  document.documentElement.addEventListener("mouseleave", () => { dot.style.opacity = ring.style.opacity = 0; });
  document.documentElement.addEventListener("mouseenter", () => { dot.style.opacity = ring.style.opacity = 1; });
}


/* ---------- 14. ฉากหลังเมือง + ดาว + นักพัฒนานั่งโต๊ะ ---------- */

const SVG_NS = "http://www.w3.org/2000/svg";

/** ตัวสุ่มที่ใส่ seed ได้ (ได้เลขชุดเดิมทุกครั้ง ฉากเมืองจึงหน้าตาเหมือนเดิมทุกครั้งที่เปิดเว็บ) */
function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** สร้างแท็ก SVG พร้อมกำหนด attribute */
function svgEl(name, attrs = {}) {
  const el = document.createElementNS(SVG_NS, name);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

/* --- ดาวบนท้องฟ้า (เห็นเฉพาะกลางคืน: CSS เป็นคนควบคุม) --- */
const STAR_COUNT = 55;   // ✏️ จำนวนดาว
const starsEl = document.getElementById("stars");
{
  const rand = mulberry32(7);
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");
    star.className = "star";
    const size = 1 + rand() * 2;
    star.style.cssText =
      `left:${rand() * 100}%;top:${rand() * 100}%;width:${size}px;height:${size}px;` +
      `--o:${0.4 + rand() * 0.6};--dur:${2 + rand() * 4}s;--delay:${-rand() * 6}s;` +
      `--sth:${(0.35 + rand() * 0.45).toFixed(2)}`;   // --sth = ระดับความมืดที่ดาวดวงนี้เริ่มโผล่ (ต่างกัน จึงขึ้นทีละดวง)
    starsEl.appendChild(star);
  }
}

/* --- เมือง: ตึกแถวหลัง (เป็นเงา) + ตึกแถวหน้า (มีหน้าต่าง) สร้างตามความกว้างจอจริง ---
   ตอนกลางคืน หน้าต่างบางบานติดไฟสีเหลือง ตอนเปลี่ยนธีมไฟจะทยอยติดทีละบาน */
const cityEl = document.getElementById("city");
let cityW = 0, cityH = 0;

function buildCity() {
  const w = Math.round(cityEl.clientWidth);
  const h = Math.round(cityEl.clientHeight);
  if (!w || !h) return;
  cityW = w; cityH = h;
  const rand = mulberry32(20241031);                    // seed คงที่ = ฉากเดิมทุกครั้ง
  const svg = svgEl("svg", { viewBox: `0 0 ${w} ${h}`, "aria-hidden": "true" });

  // ตึกแถวหลัง: เงาเรียบๆ เตี้ยกว่า
  const far = svgEl("g", { class: "city-far" });
  for (let x = -20; x < w; ) {
    const bw = 40 + rand() * 60;
    const bh = h * (0.3 + rand() * 0.38);
    far.appendChild(svgEl("rect", { x, y: h - bh, width: bw, height: bh }));
    x += bw * (0.55 + rand() * 0.5);                    // ตึกซ้อนทับกันนิดหน่อยให้ดูหนาแน่น
  }
  svg.appendChild(far);

  // ตึกแถวหน้า: มีหน้าต่าง บางตึกมีชั้นบนซ้อนและเสาอากาศ
  const near = svgEl("g", { class: "city-near" });
  const WIN_W = 4, WIN_H = 6, GAP_X = 6, GAP_Y = 8;     // ✏️ ขนาด/ระยะห่างหน้าต่าง
  for (let x = -6; x < w; ) {
    const bw = 34 + rand() * 34;
    const bh = h * (0.28 + Math.pow(rand(), 1.4) * 0.6);
    const y = h - bh;
    near.appendChild(svgEl("rect", { class: "b", x, y, width: bw, height: bh, rx: 1 }));

    if (rand() < 0.3) {                                 // ชั้นบนที่เล็กกว่า
      const tw = bw * (0.4 + rand() * 0.3), th = 10 + rand() * 12;
      near.appendChild(svgEl("rect", { class: "b", x: x + (bw - tw) / 2, y: y - th, width: tw, height: th, rx: 1 }));
    }
    if (rand() < 0.22 && bh > h * 0.5) {                // เสาอากาศ + ไฟแดงกะพริบ
      const ax = x + bw / 2;
      near.appendChild(svgEl("rect", { class: "b", x: ax - 0.8, y: y - 16, width: 1.6, height: 16 }));
      near.appendChild(svgEl("circle", { class: "beacon", cx: ax, cy: y - 17, r: 2 }));
    }

    // หน้าต่างเรียงเป็นตาราง
    const cols = Math.floor((bw - 10 + GAP_X) / (WIN_W + GAP_X));
    const rows = Math.floor((bh - 14) / (WIN_H + GAP_Y));
    const offX = (bw - (cols * (WIN_W + GAP_X) - GAP_X)) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rand() < 0.2) continue;                     // เว้นบางช่องไม่ให้ดูเป็นระเบียบเกินไป
        const lit = rand() < 0.45;                      // 45% ของหน้าต่างติดไฟตอนกลางคืน
        const flicker = lit && rand() < 0.12;           // บางบานกะพริบ
        const tone = rand();                            // สุ่มโทนสีไฟ (ส่วนใหญ่เหลืองอุ่น บางบานส้ม/ขาวนวล)
        const win = svgEl("rect", {
          class: "win" + (flicker ? " tw" : "") + (tone < 0.18 ? " c2" : tone > 0.85 ? " c3" : ""),
          x: x + offX + c * (WIN_W + GAP_X),
          y: y + 8 + r * (WIN_H + GAP_Y),
          width: WIN_W, height: WIN_H, rx: 0.8,
        });
        if (lit) {
          // --wl = บานนี้เปิดไฟตอนกลางคืน, --wt = ระดับความมืดที่ไฟเริ่มติด (0.5-0.87 แต่ละบานต่างกัน ไฟจึงติด/ดับทยอยกัน)
          let css = `--wl:1;--wt:${(0.5 + rand() * 0.37).toFixed(2)}`;
          if (flicker) css += `;--dur:${5 + rand() * 8}s;--delay:${-rand() * 10}s`;
          win.style.cssText = css;
        }
        near.appendChild(win);
      }
    }
    x += bw + 2 + rand() * 8;
  }
  svg.appendChild(near);
  cityEl.replaceChildren(svg);
}
buildCity();

// ปรับขนาดหน้าต่าง/จอ -> สร้างเมืองใหม่ให้พอดี (รอให้หยุดปรับก่อน และสร้างเฉพาะเมื่อขนาดเปลี่ยนมากพอ)
let cityTimer;
window.addEventListener("resize", () => {
  clearTimeout(cityTimer);
  cityTimer = setTimeout(() => {
    if (Math.abs(cityEl.clientWidth - cityW) > 40 || Math.abs(cityEl.clientHeight - cityH) > 40) buildCity();
  }, 250);
});

/* --- นักพัฒนานั่งโต๊ะ: กดแล้วมีคำพูด (กดซ้ำสลับข้อความ) --- */
const devBtn = document.getElementById("devScene");
const devBubble = document.getElementById("devBubble");
const devHint = document.getElementById("devHint");
const DEV_MESSAGES = ["dev.say1", "dev.say2"];   // ✏️ เพิ่มข้อความได้: ใส่คีย์ใหม่ในนี้ แล้วเพิ่มข้อความใน lang.js
let devMsgIdx = 0;
let devBubbleTimer;

function hideBubble() {
  devBubble.classList.remove("show");
}

devBtn.addEventListener("click", () => {
  devBubble.textContent = I18N[lang][DEV_MESSAGES[devMsgIdx]];
  devMsgIdx = (devMsgIdx + 1) % DEV_MESSAGES.length;
  devBubble.classList.add("show");
  devBtn.classList.remove("hop");        // รีสตาร์ทแอนิเมชันกระโดด (เผื่อกดรัวๆ)
  void devBtn.offsetWidth;
  devBtn.classList.add("hop");
  devHint.classList.add("gone");         // กดแล้วคำใบ้หายไป
  clearTimeout(devBubbleTimer);
  devBubbleTimer = setTimeout(hideBubble, 4500);
});


/* ---------- เริ่มทำงาน: ใส่ภาษาตอนเปิดเว็บครั้งแรก ----------
   วางไว้ท้ายสุดเพื่อให้ทุกส่วนด้านบนพร้อมก่อน (applyLanguage เรียกใช้ฟังก์ชันจากหลายส่วน) */
applyLanguage();

/* =====================================================
   15. ฟอร์มติดต่อ (ส่งข้อความเข้าอีเมลผ่าน Formspree)
   วิธีตั้งค่า (ฟรี): สมัคร formspree.io → New Form → ใส่อีเมล sittha.forwork@gmail.com
   → คัดลอก Form endpoint (หน้าตา https://formspree.io/f/xxxxxxxx) มาวางที่ FORM_ENDPOINT ด้านล่าง
   ถ้ายังเป็นค่าว่าง ฟอร์มจะเปิดแอปอีเมลพร้อมข้อความที่กรอกแทน
   ===================================================== */
const FORM_ENDPOINT = "";   // ✏️ วาง endpoint ของ Formspree ที่นี่
const MAIL_TO = "sittha.forwork@gmail.com";

const cForm = document.getElementById("contactForm");
const cStatus = document.getElementById("cfStatus");
const cSubmit = document.getElementById("cfSubmit");
let cLastSent = 0;

function cfSay(key, ok) {
  cStatus.textContent = I18N[lang][key];
  cStatus.className = "cf-status " + (ok ? "ok" : "err");
}

cForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const message = document.getElementById("cfMessage").value.trim();
  if (document.getElementById("cfTrap").value) return;           // บอทกรอกช่องดักไว้: เงียบๆ ไม่ทำอะไร
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { cfSay("form.invalid", false); return; }
  if (Date.now() - cLastSent < 15000) return;                    // กันกดรัว: ส่งซ้ำได้หลังผ่าน 15 วินาที

  if (!FORM_ENDPOINT) {                                          // ยังไม่ตั้งค่า: เปิดแอปอีเมลแทน
    cfSay("form.mailto", true);
    location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent("Portfolio: " + name)}&body=${encodeURIComponent(message + "\n\n— " + name + " (" + email + ")")}`;
    return;
  }
  cSubmit.disabled = true;
  cStatus.textContent = I18N[lang]["form.sending"];
  cStatus.className = "cf-status";
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) throw new Error(res.status);
    cLastSent = Date.now();
    cForm.reset();
    cfSay("form.ok", true);
  } catch (err) {
    cfSay("form.fail", false);
  } finally {
    cSubmit.disabled = false;
  }
});
