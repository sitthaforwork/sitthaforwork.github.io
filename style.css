/* =====================================================================
   lang.js : ข้อความทั้งหมดของเว็บ 2 ภาษา (th = ไทย, en = English)

   วิธีทำงาน
   - ใน index.html แต่ละข้อความจะมี data-i18n="ชื่อคีย์"
   - เมื่อเปลี่ยนภาษา script.js จะหาคีย์นั้นในไฟล์นี้ แล้วแทนข้อความให้อัตโนมัติ

   วิธีแก้ข้อความ: หาคีย์ที่ต้องการ แล้วแก้ค่าทั้งฝั่ง th และ en ให้ตรงกัน
   วิธีเพิ่มข้อความใหม่: ตั้งคีย์ใหม่ใส่ทั้งสองภาษา แล้วใส่ data-i18n ใน HTML
   ===================================================================== */

// ตัวช่วยจัดแถวคำสั่งใน terminal ให้คอลัมน์ตรงกัน (ชื่อคำสั่ง 14 ตัวอักษร แล้วตามด้วยคำอธิบาย)
// ตั้งความกว้างไม่เกินนี้เพื่อให้บนมือถือบรรทัดไม่ล้นและไม่ถูกตัดขึ้นบรรทัดใหม่
const pad = (cmd, desc) => "  " + cmd.padEnd(14) + desc;

const I18N = {
  /* ------------------------- ภาษาไทย ------------------------- */
  th: {
    "meta.title": "สิทธา สัจจหทยาศรม | Developer Portfolio",
    "lang.title": "Switch to English",

    // เมนูด้านบน
    "nav.about": "เกี่ยวกับผม",
    "nav.skills": "ทักษะ",
    "nav.projects": "ผลงาน",
    "nav.certs": "เกียรติบัตร",
    "nav.contact": "ติดต่อ",

    // ปุ่มสลับธีม
    "theme.auto": "อัตโนมัติ",
    "theme.light": "สว่าง",
    "theme.dark": "มืด",

    // หน้าแรก
    // คำทักทายตามเวลาไทย (เช้า 05-11, บ่าย 12-16, เย็น 17-20, นอกนั้นดึก)
    "greet.morning": "☀️ สวัสดีตอนเช้าครับ ผมคือ",
    "greet.afternoon": "🌤️ สวัสดีตอนบ่ายครับ ผมคือ",
    "greet.evening": "🌆 สวัสดีตอนเย็นครับ ผมคือ",
    "greet.night": "🌙 ดึกแล้วนะครับ สวัสดีครับ ผมคือ",
    "hero.name": "สิทธา",
    "hero.fullname": "สิทธา สัจจหทยาศรม",
    "hero.desc": "นักศึกษาวิศวกรรมคอมพิวเตอร์ที่ชอบสร้างสิ่งต่างๆ ด้วยโค้ด ตั้งแต่หน้าเว็บไปจนถึงเครื่องมือที่ใช้ AI",
    "hero.btnProjects": "ดูผลงาน",
    "hero.btnContact": "ติดต่อผม",
    "hero.btnResume": "ดาวน์โหลดเรซูเม่",
    "contact.resume": "เรซูเม่ (PDF)",
    "contact.resumeBtn": "ดาวน์โหลด",
    "form.title": "ส่งข้อความถึงผม",
    "form.name": "ชื่อของคุณ",
    "form.email": "อีเมลของคุณ",
    "form.message": "ข้อความ",
    "form.send": "ส่งข้อความ",
    "form.sending": "กำลังส่ง...",
    "form.ok": "ส่งข้อความแล้ว ขอบคุณครับ ผมจะตอบกลับโดยเร็วที่สุด",
    "form.invalid": "กรุณากรอกชื่อ อีเมลที่ถูกต้อง และข้อความ",
    "form.fail": "ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรืออีเมลถึงผมโดยตรง",
    "form.mailto": "กำลังเปิดแอปอีเมลของคุณ...",
    // ข้อความที่พิมพ์วนที่หัวเว็บ
    roles: [
      "Developer",
      "นักศึกษาวิศวกรรมคอมพิวเตอร์",
      "Python & C/C++ Coder",
      "AI API Explorer",
    ],

    // เกี่ยวกับผม
    "about.title": "เกี่ยวกับผม",
    "about.p1": "ผมเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ ชั้นปีที่ 4 มหาวิทยาลัยราชภัฏพิบูลสงคราม ชอบเปลี่ยนไอเดียให้เป็นซอฟต์แวร์ที่ใช้งานได้จริง ใช้ภาษาโปรแกรมได้หลายภาษา ออกแบบหน้าจอด้วย Figma และเชื่อมต่อ AI API เพื่อเพิ่มความสามารถอัจฉริยะให้โปรเจ็กต์",
    "about.p2": "ผมชอบหน้าตาที่สะอาดเรียบง่าย ชอบแก้ปัญหาทีละขั้น และเรียนรู้เครื่องมือใหม่ๆ ได้เร็ว",
    "stat.langs": "ภาษาโปรแกรม",
    "stat.apis": "AI / Data API ที่เคยใช้",
    "stat.projects": "โปรเจ็กต์",
    "stat.projectsSoon": "โปรเจ็กต์ (เร็วๆ นี้)",

    // การศึกษา
    "edu.label": "การศึกษา",
    "edu.uni": "มหาวิทยาลัยราชภัฏพิบูลสงคราม",
    "edu.faculty": "คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม",
    "edu.major": "สาขาวิศวกรรมคอมพิวเตอร์ · นักศึกษาชั้นปีที่ 4",

    // ทักษะ
    "skills.title": "ทักษะ",
    "skills.prog": "💻 การเขียนโปรแกรม",
    "skills.web": "🌐 เว็บ",
    "skills.ai": "🤖 AI และ API",
    "skills.tools": "🛠️ เครื่องมือและการออกแบบ",

    // ผลงาน
    "projects.title": "ผลงาน",
    "song.desc": "เว็บแอปสำหรับค้นหาเพลง ค้นจากชาร์ตและแนวเพลง หรือพิมพ์บรรยายเพลงด้วยคำพูดของตัวเอง (ไทยหรืออังกฤษ) แล้วให้โมเดล AI หลายตัวช่วยเสนอเพลง โดยแต่ละเพลงถูกตรวจกับแคตตาล็อก iTunes และนำผลมาเทียบกันแบบเคียงข้างกัน",
    "ph.projTitle": "ชื่อโปรเจ็กต์",
    "ph.projDesc": "คำอธิบายโปรเจ็กต์สั้นๆ ว่าทำอะไร แก้ปัญหาอะไร",

    // เกียรติบัตร
    "certs.title": "เกียรติบัตร",
    "cert.verify": "ตรวจสอบออนไลน์ ↗",
    "cert.phName": "ชื่อเกียรติบัตร",
    "cert.phIssuer": "ผู้ออก · หน่วยงาน",
    "cert.phDate": "เดือน ปี",
    "uxui.title": "การออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อผู้ใช้ (User Experience and User Interface Design)",
    "uxui.issuer": "กรมพัฒนาฝีมือแรงงาน กระทรวงแรงงาน ร่วมกับ มูลนิธิเพื่อการพัฒนาดิจิทัล และสมาคมอุตสาหกรรมซอฟต์แวร์ไทย",
    "uxui.date": "25 มีนาคม พ.ศ. 2568",
    "uxui.desc": "ผ่านการฝึกทักษะออนไลน์ · จำนวนชั่วโมงการฝึกอบรม 8 ชั่วโมง 30 นาที",
    "py.title": "Python Essentials 1",
    "py.issuer": "Cisco Networking Academy · ร่วมกับ OpenEDG Python Institute",
    "py.date": "ออกเมื่อ 10 ธันวาคม ค.ศ. 2025",
    "py.desc": "Statement of Achievement · ระดับนักเรียน (student level credential)",
    "py.details": "หัวข้อที่ผู้สำเร็จการศึกษาได้เรียน (ตามข้อความในเกียรติบัตร)",
    "sk.title": "ช่างซ่อมไมโครคอมพิวเตอร์ ระดับ 1",
    "sk.issuer": "ศูนย์ทดสอบมาตรฐานฝีมือแรงงาน มหาวิทยาลัยราชภัฏพิบูลสงคราม · ได้รับอนุญาตจากกรมพัฒนาฝีมือแรงงาน กระทรวงแรงงาน",
    "sk.date": "ให้ไว้ ณ วันที่ 26 ตุลาคม พ.ศ. 2569",
    "sk.desc": "หนังสือรับรองผู้ผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ เลขที่ มรพส.0083/2569 · สาขาช่างไฟฟ้าและอิเล็กทรอนิกส์",
    "sk.details": "สมรรถนะและคะแนน (ตามข้อความในหนังสือรับรอง)",

    // ติดต่อ
    "contact.title": "ติดต่อ",
    "contact.lead": "สนใจร่วมงานหรืออยากทักทายกัน ติดต่อมาได้ตลอดครับ",
    "contact.email": "อีเมล",
    "contact.phone": "โทรศัพท์",
    "contact.github": "GitHub",

    // ท้ายเว็บ
    "footer.text": "สิทธา สัจจหทยาศรม · สร้างด้วย HTML, CSS และ JavaScript",

    // ปุ่มคัดลอกอีเมล + ข้อความแจ้งเตือน (toast)
    "copy.title": "คัดลอกอีเมล",
    "toast.copied": "คัดลอกอีเมลแล้ว ✓",
    "toast.failed": "คัดลอกไม่สำเร็จ ลองคัดลอกเองนะครับ",

    // นักพัฒนานั่งโต๊ะ: คำพูดตอนกด (กดสลับไปมาระหว่าง say1 กับ say2) / คำใบ้ / คำอ่านสำหรับโปรแกรมช่วยอ่านหน้าจอ
    "dev.say1": "หากสนใจผมติดต่อได้เลยนะครับ",
    "dev.say2": "ผมอยากทำงานร่วมกับคุณนะครับ",
    "dev.hint": "👆 ลองกดที่ผมดูสิ",
    "dev.aria": "นักพัฒนากำลังเขียนโค้ดที่โต๊ะ กดเพื่อฟังข้อความ",

    // Terminal ซ่อน (กดปุ่ม ` หรือปุ่ม >_ มุมขวาล่าง)
    "term.fab": "เปิด Terminal (กดปุ่ม ` ก็ได้)",
    "term.close": "ปิด",
    "term.welcome": "ยินดีต้อนรับสู่ terminal ของสิทธา 👋\nพิมพ์ help เพื่อดูคำสั่งทั้งหมด · กด Esc เพื่อปิด",
    "term.help": [
      "คำสั่งที่ใช้ได้:",
      pad("about", "แนะนำตัว"),
      pad("edu", "การศึกษา"),
      pad("skills", "ทักษะ"),
      pad("projects", "ผลงาน"),
      pad("certs", "เกียรติบัตร"),
      pad("contact", "ช่องทางติดต่อ"),
      pad("github", "เปิด GitHub"),
      pad("demo", "เปิดเดโม Song Finder"),
      pad("theme <mode>", "auto | light | dark"),
      pad("lang <th|en>", "เปลี่ยนภาษา"),
      pad("clear", "ล้างหน้าจอ"),
      pad("exit", "ปิด terminal"),
      "",
      "เคล็ดลับ: กด Tab เพื่อเติมคำสั่ง และ ↑ ↓ เพื่อย้อนดูคำสั่งเก่า",
    ].join("\n"),
    "term.unknown": "ไม่รู้จักคำสั่ง: {cmd} · พิมพ์ help เพื่อดูคำสั่งที่ใช้ได้",
    "term.none": "(ยังไม่มีรายการ)",
    "term.opening": "กำลังเปิด {v} ...",
    "term.themeSet": "เปลี่ยนธีมเป็น {v} แล้ว",
    "term.usageTheme": "วิธีใช้: theme auto | light | dark",
    "term.langSet": "เปลี่ยนภาษาเป็น {v} แล้ว",
    "term.usageLang": "วิธีใช้: lang th | en",
    "term.hire": "[sudo] ได้รับอนุมัติ ✓\nส่งคำเชิญสัมภาษณ์มาที่ sittha.forwork@gmail.com ได้เลยครับ 😄",
    "term.sudoDenied": "guest ไม่ได้อยู่ในไฟล์ sudoers · เหตุการณ์นี้จะถูกรายงาน 😄",
  },

  /* ------------------------- English ------------------------- */
  en: {
    "meta.title": "Sittha Sajjahathayasom | Developer Portfolio",
    "lang.title": "เปลี่ยนเป็นภาษาไทย",

    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certs": "Certificates",
    "nav.contact": "Contact",

    "theme.auto": "Auto",
    "theme.light": "Light",
    "theme.dark": "Dark",

    // Greeting by Thai time (morning 05-11, afternoon 12-16, evening 17-20, otherwise night)
    "greet.morning": "☀️ Good morning, I'm",
    "greet.afternoon": "🌤️ Good afternoon, I'm",
    "greet.evening": "🌆 Good evening, I'm",
    "greet.night": "🌙 Hey, night owl! I'm",
    "hero.name": "Sittha",
    "hero.fullname": "Sittha Sajjahathayasom",
    "hero.desc": "Computer Engineering student who loves building things with code, from web interfaces to AI-powered tools.",
    "hero.btnProjects": "View Projects",
    "hero.btnContact": "Contact Me",
    "hero.btnResume": "Download Résumé",
    "contact.resume": "Résumé (PDF)",
    "contact.resumeBtn": "Download",
    "form.title": "Send me a message",
    "form.name": "Your name",
    "form.email": "Your email",
    "form.message": "Message",
    "form.send": "Send message",
    "form.sending": "Sending...",
    "form.ok": "Message sent, thank you! I'll reply as soon as I can.",
    "form.invalid": "Please enter your name, a valid email and a message.",
    "form.fail": "Couldn't send. Please try again or email me directly.",
    "form.mailto": "Opening your email app...",
    roles: [
      "Developer",
      "Computer Engineering Student",
      "Python & C/C++ Coder",
      "AI API Explorer",
    ],

    "about.title": "About Me",
    "about.p1": "I'm a 4th-year Computer Engineering student at Rajabhat Phibulsongkram University who enjoys turning ideas into working software. I work with several programming languages, design interfaces in Figma, and connect to modern AI APIs to build smart features into my projects.",
    "about.p2": "I like clean interfaces, solving problems step by step, and learning new tools quickly.",
    "stat.langs": "Programming languages",
    "stat.apis": "AI / Data APIs used",
    "stat.projects": "Projects",
    "stat.projectsSoon": "Projects (coming soon)",

    "edu.label": "Education",
    "edu.uni": "Rajabhat Phibulsongkram University",
    "edu.faculty": "Faculty of Engineering and Industrial Technology",
    "edu.major": "Computer Engineering · 4th-year student",

    "skills.title": "Skills",
    "skills.prog": "💻 Programming",
    "skills.web": "🌐 Web",
    "skills.ai": "🤖 AI & APIs",
    "skills.tools": "🛠️ Tools & Design",

    "projects.title": "Projects",
    "song.desc": "Web app for discovering songs. Search charts and genres, or describe a song in your own words (Thai or English) and let several AI models suggest matches, each verified against the iTunes catalog and compared side by side.",
    "ph.projTitle": "Project Title",
    "ph.projDesc": "A short description of what the project does and the problem it solves.",

    "certs.title": "Certificates",
    "cert.verify": "Verify Online ↗",
    "cert.phName": "Certificate Name",
    "cert.phIssuer": "Issued by · Organization",
    "cert.phDate": "Month Year",
    "uxui.title": "User Experience and User Interface Design",
    "uxui.issuer": "Department of Skill Development, Ministry of Labour, in collaboration with The Digital Development Foundation and The Association of Thai Software Industry",
    "uxui.date": "25 March 2025 (B.E. 2568)",
    "uxui.desc": "Completed an online skills training course · 8 hours 30 minutes of training",
    "py.title": "Python Essentials 1",
    "py.issuer": "Cisco Networking Academy · in collaboration with OpenEDG Python Institute",
    "py.date": "Issued on 10 December 2025",
    "py.desc": "Statement of Achievement · student level credential",
    "py.details": "What the graduate has studied (as stated on the certificate)",
    "sk.title": "Microcomputer Repair Technician, Level 1",
    "sk.issuer": "Pibulsongkram Rajabhat University Skill Standard Testing Center · authorised by the Department of Skill Development, Ministry of Labour",
    "sk.date": "Given on 26 October 2026 (B.E. 2569)",
    "sk.desc": "National Skill Standard Assessment Certificate No. มรพส.0083/2569 · Electrical and Electronics Sector",
    "sk.details": "Competency and score (as stated on the certificate)",

    "contact.title": "Contact",
    "contact.lead": "Interested in working together or just want to say hi? My inbox is always open.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.github": "GitHub",

    "footer.text": "Sittha Sajjahathayasom · Built with HTML, CSS & JavaScript",

    // Copy-email button + toast message
    "copy.title": "Copy email",
    "toast.copied": "Email copied ✓",
    "toast.failed": "Copy failed, please copy it manually",

    // Developer at the desk: speech bubble messages (click alternates say1 / say2), hint, screen-reader label
    "dev.say1": "If you're interested, feel free to contact me!",
    "dev.say2": "I'd love to work with you!",
    "dev.hint": "👆 Try clicking me",
    "dev.aria": "A developer coding at a desk, click to hear a message",

    // Hidden terminal (press ` or the >_ button at the bottom right)
    "term.fab": "Open Terminal (or press `)",
    "term.close": "Close",
    "term.welcome": "Welcome to Sittha's terminal 👋\nType help to see all commands · press Esc to close",
    "term.help": [
      "Available commands:",
      pad("about", "who I am"),
      pad("edu", "education"),
      pad("skills", "skills"),
      pad("projects", "projects"),
      pad("certs", "certificates"),
      pad("contact", "contact info"),
      pad("github", "open GitHub"),
      pad("demo", "open the Song Finder demo"),
      pad("theme <mode>", "auto | light | dark"),
      pad("lang <th|en>", "change language"),
      pad("clear", "clear the screen"),
      pad("exit", "close the terminal"),
      "",
      "Tip: press Tab to autocomplete and ↑ ↓ to browse history",
    ].join("\n"),
    "term.unknown": "Command not found: {cmd} · type help for available commands",
    "term.none": "(nothing here yet)",
    "term.opening": "Opening {v} ...",
    "term.themeSet": "Theme set to {v}",
    "term.usageTheme": "Usage: theme auto | light | dark",
    "term.langSet": "Language set to {v}",
    "term.usageLang": "Usage: lang th | en",
    "term.hire": "[sudo] access granted ✓\nSend the interview invite to sittha.forwork@gmail.com 😄",
    "term.sudoDenied": "guest is not in the sudoers file. This incident will be reported. 😄",
  },
};
