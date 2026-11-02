<!DOCTYPE html>
<html lang="th" data-theme="light">
<head>
  <!-- ========== ส่วน HEAD: ข้อมูลของหน้าเว็บ (ไม่แสดงบนหน้าจอ) ========== -->
  <meta charset="UTF-8" />
  <!-- ทำให้เว็บแสดงผลพอดีหน้าจอมือถือ -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- คำอธิบายเว็บที่จะโชว์ใน Google -->
  <meta name="description" content="Portfolio ของ Sittha Sajjahathayasom (สิทธา สัจจหทยาศรม) - Computer Engineering student & Developer" />
  <!-- ชื่อบนแท็บเบราว์เซอร์ (script.js จะเปลี่ยนตามภาษาให้เอง ค่านี้เป็นค่าสำรอง) -->
  <!-- ตั้งธีมตั้งแต่ก่อนหน้าเว็บแสดงผล (กันภาพสว่างวาบแล้วค่อยมืด และกันไม่ให้เปิดเว็บมาแล้วเห็นการไล่สีโดยไม่ตั้งใจ)
       ใช้ตรรกะเดียวกับ script.js ส่วนที่ 1: เคยเลือกธีมไว้ใช้ตามนั้น ไม่งั้นดูเวลาไทย 06:00-18:00 = สว่าง -->
  <script>
    (function () {
      var mode = "auto";
      try { mode = localStorage.getItem("theme-mode") || "auto"; } catch (e) {}
      var theme = mode;
      if (mode !== "light" && mode !== "dark") {
        var h = parseInt(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Bangkok" }).format(new Date()), 10);
        theme = h >= 6 && h < 18 ? "light" : "dark";
      }
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>
  <title>Sittha Sajjahathayasom | Developer Portfolio</title>

  <!-- ฟอนต์จาก Google Fonts: Space Grotesk (หัวข้อ), Inter (เนื้อหา), Prompt (รองรับภาษาไทย) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Prompt:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />

  <!-- เชื่อมไฟล์สไตล์ -->
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <!--
    📌 ระบบสองภาษา: ข้อความที่มี data-i18n="คีย์" จะถูกแทนด้วยข้อความจากไฟล์ lang.js
    ตามภาษาที่เลือก (ข้อความในแท็กนี้เป็นค่าสำรองเผื่อ JavaScript ไม่ทำงาน)
    ถ้าจะแก้ข้อความ ให้แก้ใน lang.js ไม่ใช่ที่นี่
  -->

  <!-- ========== เอฟเฟกต์พื้นหลัง ========== -->
  <!-- แถบเล็กด้านบนที่วิ่งตามการเลื่อนหน้า (ควบคุมด้วย script.js) -->
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- ก้อนสีฟุ้งๆ ที่ลอยอยู่ด้านหลังเว็บ (แอนิเมชันใน style.css) -->
  <div class="bg-blobs" aria-hidden="true">
    <span class="blob blob-1"></span>
    <span class="blob blob-2"></span>
    <span class="blob blob-3"></span>
  </div>

  <!-- วงแสงที่ตามเมาส์ (แสดงเฉพาะบนคอมพิวเตอร์) -->
  <div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>

  <!-- ========== แถบเมนูด้านบน (NAVBAR) ========== -->
  <header class="navbar" id="navbar">
    <a href="#home" class="logo">sittha<span>.dev</span></a>

    <!-- ลิงก์เมนู: กดแล้วเลื่อนไปยังส่วนต่างๆ ตาม id -->
    <nav class="nav-links" id="navLinks">
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="#skills" data-i18n="nav.skills">Skills</a>
      <a href="#projects" data-i18n="nav.projects">Projects</a>
      <a href="#certificates" data-i18n="nav.certs">Certificates</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>
    </nav>

    <div class="nav-actions">
      <!-- ปุ่มสลับภาษา: โชว์ภาษาที่จะเปลี่ยนไป (ตอนนี้ไทย -> ปุ่มเขียน EN) -->
      <button class="theme-toggle lang-toggle" id="langToggle" aria-label="Change language" title="Switch language">
        <span>🌐</span>
        <span id="langLabel">EN</span>
      </button>
      <!-- ปุ่มสลับธีม: Auto -> Light -> Dark (วนไปเรื่อยๆ) -->
      <button class="theme-toggle" id="themeToggle" aria-label="Change theme" title="Change theme">
        <span id="themeIcon">🌓</span>
        <span id="themeLabel">Auto</span>
      </button>
      <!-- ปุ่มเมนูแฮมเบอร์เกอร์ (แสดงเฉพาะมือถือ) -->
      <button class="menu-btn" id="menuBtn" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>
    <!-- ========== ส่วน HERO: หน้าแรกที่คนเห็นก่อน ========== -->
    <section id="home" class="hero">
      <!-- ฉากหลังท้องฟ้า + เมือง (ตกแต่งอย่างเดียว ไม่กินพื้นที่ ไม่ขวางการคลิก)
           เปลี่ยนเช้า/ค่ำตามธีมอัตโนมัติ: กลางวันมีดวงอาทิตย์+เมฆ กลางคืนมีพระจันทร์+ดาว+ไฟในตึก
           ตึกและดาวถูกสร้างโดย script.js ส่วนที่ 14 -->
      <div class="sky" id="sky" aria-hidden="true">
        <div class="stars" id="stars"></div>
        <div class="shoot-wrap"><span class="shooting-star"></span></div>
        <div class="sun"></div>
        <div class="moon"></div>
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        <div class="city" id="city"></div>
      </div>
      <div class="hero-content reveal">
        <!-- คำทักทายเปลี่ยนตามเวลาไทยและภาษา (ควบคุมด้วย script.js ส่วนที่ 10, ข้อความอยู่ใน lang.js คีย์ greet.*) -->
        <p class="eyebrow" id="greeting">👋 Hello, I'm</p>
        <!-- ชื่อเล่นตัวใหญ่ + ชื่อเต็มด้านล่าง (แก้ได้ใน lang.js: hero.name / hero.fullname) -->
        <h1 class="hero-title"><span data-i18n="hero.name">Sittha</span><span class="dot">.</span></h1>
        <p class="hero-fullname" data-i18n="hero.fullname">Sittha Sajjahathayasom</p>
        <!-- ข้อความที่พิมพ์ทีละตัวอักษร (ข้อความอยู่ใน lang.js ตัวแปร roles) -->
        <h2 class="hero-role">
          <span id="typing"></span><span class="caret">|</span>
        </h2>
        <p class="hero-desc" data-i18n="hero.desc">
          Computer Engineering student who loves building things with code,
          from web interfaces to AI-powered tools.
        </p>
        <div class="hero-buttons">
          <a href="#projects" class="btn btn-primary" data-i18n="hero.btnProjects">View Projects</a>
          <a href="#contact" class="btn btn-ghost" data-i18n="hero.btnContact">Contact Me</a>
          <!-- ปุ่มดาวน์โหลดเรซูเม่ (ไฟล์อยู่ที่ files/ ถ้าเปลี่ยนไฟล์ ให้ใช้ชื่อเดิมวางทับ) -->
          <a href="files/Sittha_Sajjahatayasom_Resume.pdf" class="btn btn-ghost" download="Sittha_Sajjahatayasom_Resume.pdf" data-i18n="hero.btnResume">Download Résumé</a>
        </div>
      </div>

      <!-- ฉากนักพัฒนานั่งเขียนโค้ดที่โต๊ะ (วาดเป็น SVG ด้วยโค้ด)
           กดที่ตัวนักพัฒนาแล้วจะมีคำพูดเด้งขึ้นมา (script.js ส่วนที่ 14, ข้อความอยู่ใน lang.js คีย์ dev.*)
           ตัวละครเป็นพิกเซลอาร์ต: สีเสื้อตามสีหลักของเว็บ (--accent) ส่วนแอนิเมชันอยู่ใน style.css หัวข้อ นักพัฒนาพิกเซลอาร์ต -->
      <div class="hero-card reveal">
        <div class="dev-wrap">
          <!-- กล่องคำพูด: ข้อความถูกใส่โดย script.js ตอนกด -->
          <div class="dev-bubble" id="devBubble" role="status" aria-live="polite"></div>

          <button class="dev-scene" id="devScene" type="button" data-i18n-title="dev.aria" title="Click me" aria-label="Click me">
            <div class="dev-stack">
              <!-- สไปรต์พิกเซลอาร์ต (สร้างจากตาราง 96x86 พิกเซล) แบ่งสองชั้น: ชั้นล่าง = ตัวละคร/โต๊ะ (หรี่ลงตอนกลางคืน), ชั้นบน = แสงจากจอ/ควัน/โคมไฟ/Zzz
                   กลางวัน: นั่งพิมพ์ + หยุดจิบกาแฟเป็นระยะ | กลางคืน: นอนฟุบโต๊ะ (สลับท่าตาม --night ใน style.css) -->
              <svg class="px px-base" viewBox="0 0 96 86" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
<g class="floor" data-part="floor">
<path class="floor" d="M5 84h87v1h-87zM9 85h79v1h-79z"/>
</g>
<g data-part="chair">
<path fill="#31296a" d="M8 35h2v28h-2zM9 34h1v1h-1zM10 33h1v1h-1zM11 57h6v1h-6z"/>
<path fill="#6a5cc0" d="M11 41h1v14h-1zM11 33h4v1h-4zM11 39h6v2h-6zM11 55h6v2h-6zM16 41h1v14h-1z"/>
<path fill="#4b3f8f" d="M10 39h1v19h-1zM10 34h7v1h-7zM10 35h8v4h-8zM10 58h8v5h-8zM12 41h4v14h-4zM15 33h1v1h-1zM17 39h1v19h-1z"/>
</g>
<g class="pd">
<g data-part="far-up">
<path class="hoodD" d="M25 43h4v2h-4zM25 45h5v3h-5zM26 48h5v3h-5zM27 51h5v3h-5zM28 54h4v2h-4z"/>
</g>
<g data-part="torso">
<path class="hood" d="M19 43h7v5h-7zM19 48h9v2h-9zM19 50h11v2h-11zM19 42h12v1h-12zM19 52h12v4h-12zM19 56h13v7h-13zM21 41h8v1h-8zM27 43h1v5h-1zM29 43h1v1h-1zM29 46h1v4h-1z"/>
<path class="hoodD" d="M17 40h2v1h-2zM17 43h2v20h-2zM17 41h4v1h-4zM19 38h4v2h-4z"/>
<path fill="#e9e6fb" d="M26 43h1v4h-1zM28 43h1v6h-1z"/>
<path class="hoodL" d="M29 44h2v2h-2zM30 43h1v1h-1zM30 46h1v6h-1zM32 56h1v7h-1z"/>
<path fill="#bdb7e0" d="M26 47h1v1h-1zM28 49h1v1h-1z"/>
<path fill="#d99a74" d="M23 37h1v1h-1zM23 36h2v1h-2zM23 38h2v3h-2z"/>
<path class="hoodDD" d="M18 39h1v1h-1zM19 40h4v1h-4z"/>
<path fill="#f2c29b" d="M25 36h3v1h-3zM25 38h3v3h-3z"/>
<path fill="#b97a5a" d="M24 37h5v1h-5z"/>
</g>
<g class="head-g">
<g data-part="head">
<path fill="#14b8a6" d="M21 29h1v2h-1zM21 31h2v3h-2zM21 34h6v1h-6zM22 28h5v1h-5zM24 24h1v4h-1zM24 29h3v1h-3zM26 30h1v4h-1zM28 20h2v1h-2z"/>
<path fill="#0c7f73" d="M22 35h5v1h-5zM23 30h3v4h-3zM24 21h8v1h-8zM25 20h1v1h-1zM25 22h1v6h-1zM27 30h1v5h-1zM30 20h1v1h-1z"/>
<path fill="#2a2e57" d="M20 24h4v4h-4zM21 23h2v1h-2zM22 22h2v1h-2zM26 24h2v1h-2zM26 27h2v1h-2zM26 25h3v1h-3zM26 23h4v1h-4zM26 26h4v1h-4zM30 22h3v1h-3zM30 24h4v1h-4zM32 23h2v1h-2z"/>
<path fill="#4a5190" d="M23 23h1v1h-1zM26 22h4v1h-4zM28 24h2v1h-2zM30 23h2v1h-2z"/>
<path fill="#1c1f3d" d="M20 29h1v6h-1zM20 28h2v1h-2zM20 35h2v1h-2zM29 25h4v1h-4z"/>
<path fill="#f2c29b" d="M27 28h1v1h-1zM28 33h1v1h-1zM28 34h3v1h-3zM28 27h4v1h-4zM30 26h4v1h-4zM31 33h2v1h-2zM34 31h1v1h-1z"/>
<path fill="#ffdcbc" d="M32 27h2v1h-2zM34 30h1v1h-1z"/>
<path fill="#1b1d36" d="M27 29h2v1h-2zM28 30h1v2h-1zM28 28h6v1h-6zM28 32h6v1h-6zM33 29h1v3h-1z"/>
<path fill="#6ff0dc" d="M22 30h1v1h-1zM22 29h2v1h-2zM24 22h1v2h-1zM26 20h2v1h-2z"/>
<path fill="#ffffff" d="M29 29h2v1h-2zM32 29h1v1h-1z"/>
<path fill="#cfeaff" d="M29 30h4v2h-4zM31 29h1v1h-1z"/>
<path fill="#f0a393" d="M29 33h2v1h-2z"/>
<path fill="#b4614a" d="M31 34h2v1h-2z"/>
<path fill="#d99a74" d="M24 36h6v1h-6zM27 35h5v1h-5zM33 33h1v2h-1zM34 32h1v1h-1z"/>
</g>
<g class="eye-open" data-part="eye-open">
<path fill="#1b1d36" d="M31 30h1v2h-1z"/>
</g>
<g class="eye-closed" data-part="eye-closed">
<path fill="#f2c29b" d="M29 29h4v2h-4z"/>
<path fill="#1b1d36" d="M29 31h4v1h-4z"/>
</g>
</g>
<g data-part="near-up">
<path class="hoodD" d="M22 43h1v2h-1zM23 45h1v2h-1zM24 47h1v2h-1zM25 49h1v2h-1zM26 51h1v2h-1zM27 53h1v3h-1z"/>
<path class="hood" d="M23 43h3v2h-3zM24 45h3v2h-3zM25 47h3v2h-3zM26 49h3v2h-3zM27 51h3v2h-3zM28 53h3v3h-3z"/>
<path class="hoodL" d="M26 43h1v2h-1zM27 45h1v2h-1zM28 47h1v2h-1zM29 49h1v2h-1zM30 51h1v2h-1zM31 53h1v3h-1z"/>
</g>
</g>
<g data-part="desk">
<path fill="#efcf9f" d="M2 63h93v1h-93z"/>
<path fill="#d8a977" d="M2 64h93v1h-93z"/>
<path fill="#7d5632" d="M3 65h91v1h-91z"/>
<path fill="#6f4a2a" d="M3 66h1v16h-1zM3 82h91v2h-91zM8 70h1v10h-1zM8 69h38v1h-38zM8 80h38v1h-38zM24 74h1v2h-1zM24 76h6v1h-6zM29 74h1v2h-1zM45 70h1v10h-1zM51 70h1v10h-1zM51 69h38v1h-38zM51 80h38v1h-38zM67 74h1v2h-1zM67 76h6v1h-6zM72 74h1v2h-1zM88 70h1v10h-1zM93 66h1v16h-1z"/>
<path fill="#a9794b" d="M4 69h4v12h-4zM4 66h89v3h-89zM4 81h89v1h-89zM46 69h5v12h-5zM89 69h4v12h-4z"/>
<path fill="#c59463" d="M9 70h36v1h-36zM52 70h36v1h-36z"/>
<path fill="#b6845a" d="M9 74h15v3h-15zM9 71h36v3h-36zM9 77h36v3h-36zM30 74h15v3h-15zM52 74h15v3h-15zM52 71h36v3h-36zM52 77h36v3h-36zM73 74h15v3h-15z"/>
<path fill="#f3dfae" d="M25 74h4v2h-4zM68 74h4v2h-4z"/>
</g>
<g data-part="books">
<path fill="#ffffff" d="M3 59h1v1h-1zM5 55h1v1h-1z"/>
<path fill="#14b8a6" d="M3 60h1v1h-1zM3 61h11v1h-11zM4 59h10v1h-10zM13 60h1v1h-1z"/>
<path fill="#f3eee2" d="M4 60h9v1h-9zM6 56h6v1h-6z"/>
<path fill="#0e8a7d" d="M3 62h11v1h-11z"/>
<path fill="#f472b6" d="M5 56h1v1h-1zM5 57h8v1h-8zM6 55h7v1h-7zM12 56h1v1h-1z"/>
<path fill="#c4508b" d="M5 58h8v1h-8z"/>
</g>
<g data-part="keyboard">
<path fill="#363b63" d="M33 61h1v1h-1zM33 60h2v1h-2zM33 62h18v1h-18zM49 60h2v1h-2zM50 61h1v1h-1z"/>
<path fill="#7b83b0" d="M35 60h1v2h-1zM37 61h1v1h-1zM37 60h2v1h-2zM39 61h1v1h-1zM40 60h2v1h-2zM41 61h1v1h-1zM43 61h1v1h-1zM43 60h2v1h-2zM45 61h1v1h-1zM46 60h2v1h-2zM47 61h1v1h-1zM49 61h1v1h-1z"/>
<path fill="#aab1d8" d="M34 61h1v1h-1zM36 60h1v2h-1zM38 61h1v1h-1zM39 60h1v1h-1zM40 61h1v1h-1zM42 60h1v2h-1zM44 61h1v1h-1zM45 60h1v1h-1zM46 61h1v1h-1zM48 60h1v2h-1z"/>
</g>
<g data-part="monitor">
<path fill="#262b4a" d="M44 32h1v1h-1zM44 55h1v1h-1zM45 34h1v19h-1zM45 54h14v1h-14zM45 33h29v1h-29zM45 53h29v1h-29zM60 54h14v1h-14zM73 34h1v19h-1zM74 32h1v1h-1z"/>
<path fill="#3d4472" d="M44 33h1v22h-1zM45 32h29v1h-29z"/>
<path fill="#181b34" d="M45 55h30v1h-30zM74 33h1v22h-1z"/>
<path fill="#0b0e1d" d="M46 34h27v19h-27z"/>
<path fill="#2dd4bf" d="M59 54h1v1h-1z"/>
<path fill="#515a8c" d="M53 61h13v1h-13zM57 56h1v5h-1z"/>
<path fill="#3b4068" d="M52 61h1v1h-1zM58 56h3v5h-3zM66 61h1v1h-1z"/>
<path fill="#2c3054" d="M52 62h15v1h-15zM61 56h1v5h-1z"/>
</g>
<g class="pd"><g class="seq-mug"><g data-part="mug">
<path fill="#f6f1ea" d="M76 57h1v2h-1zM76 61h6v1h-6zM78 57h4v2h-4zM83 60h1v1h-1zM83 58h2v1h-2z"/>
<path fill="#ffffff" d="M77 57h1v2h-1z"/>
<path fill="#cdc4b8" d="M76 56h1v1h-1zM76 62h7v1h-7zM82 56h1v3h-1zM82 61h1v1h-1zM84 59h1v2h-1z"/>
<path fill="#8b8bff" d="M76 59h7v2h-7z"/>
<path fill="#6b4226" d="M77 56h5v1h-5z"/>
</g></g></g>
<g class="pn"><g data-part="mug-night">
<path fill="#f6f1ea" d="M76 57h1v2h-1zM76 61h6v1h-6zM78 57h4v2h-4zM83 60h1v1h-1zM83 58h2v1h-2z"/>
<path fill="#ffffff" d="M77 57h1v2h-1z"/>
<path fill="#cdc4b8" d="M76 56h1v1h-1zM76 62h7v1h-7zM82 56h1v3h-1zM82 61h1v1h-1zM84 59h1v2h-1z"/>
<path fill="#8b8bff" d="M76 59h7v2h-7z"/>
<path fill="#6b4226" d="M77 56h5v1h-5z"/>
</g></g>
<g class="pn">
<g data-part="s-torso">
<path class="hoodD" d="M17 45h2v18h-2zM17 44h5v1h-5zM18 43h5v1h-5zM19 42h3v1h-3z"/>
<path class="hood" d="M19 45h10v1h-10zM19 46h12v1h-12zM19 47h14v1h-14zM19 50h14v4h-14zM19 48h15v1h-15zM19 49h17v1h-17zM19 54h17v9h-17zM22 42h3v1h-3zM22 44h6v1h-6zM23 43h2v1h-2zM27 43h1v1h-1zM29 44h1v1h-1zM34 50h2v4h-2z"/>
<path class="hoodL" d="M25 43h2v1h-2zM28 44h1v1h-1zM29 45h1v1h-1zM31 46h1v1h-1zM33 47h1v1h-1zM34 48h1v1h-1z"/>
<path fill="#e9e6fb" d="M33 50h1v4h-1z"/>
</g>
<g data-part="s-arms">
<path class="hoodD" d="M31 59h22v3h-22z"/>
<path class="hoodDD" d="M31 62h22v1h-22z"/>
<path class="hood" d="M30 55h1v1h-1zM30 56h20v3h-20zM52 56h2v3h-2z"/>
<path class="hoodL" d="M31 55h23v1h-23zM50 56h2v3h-2z"/>
</g>
<g data-part="s-hand">
<path fill="#f2c29b" d="M54 55h1v1h-1zM54 56h4v2h-4zM57 55h1v1h-1z"/>
<path fill="#ffdcbc" d="M55 55h2v1h-2z"/>
<path fill="#d99a74" d="M53 59h4v2h-4zM54 58h4v1h-4z"/>
</g>
<g class="s-head"><g data-part="s-head">
<path fill="#2a2e57" d="M33 45h2v1h-2zM33 48h3v2h-3zM33 47h13v1h-13zM33 46h15v1h-15zM34 50h2v4h-2zM34 44h3v1h-3zM34 54h3v2h-3zM36 43h1v1h-1zM37 45h7v1h-7zM43 44h4v1h-4zM44 43h1v1h-1zM46 45h2v1h-2z"/>
<path fill="#0c7f73" d="M36 53h5v1h-5zM37 43h1v1h-1zM40 48h1v5h-1zM43 43h1v1h-1z"/>
<path fill="#14b8a6" d="M36 50h4v3h-4zM37 49h3v1h-3zM38 48h2v1h-2zM38 43h5v1h-5z"/>
<path fill="#4a5190" d="M35 45h2v1h-2zM37 44h6v1h-6zM44 45h2v1h-2z"/>
<path fill="#ffdcbc" d="M46 47h1v2h-1z"/>
<path fill="#f2c29b" d="M37 55h10v1h-10zM37 54h11v1h-11zM41 50h1v1h-1zM41 53h3v1h-3zM41 49h4v1h-4zM41 48h5v1h-5zM41 51h6v1h-6zM43 52h4v1h-4zM45 50h3v1h-3zM46 49h2v1h-2zM46 53h2v1h-2zM47 47h1v2h-1z"/>
<path fill="#6ff0dc" d="M36 49h1v1h-1zM36 48h2v1h-2z"/>
<path fill="#1b1d36" d="M42 50h3v1h-3zM45 49h1v1h-1z"/>
<path fill="#1c1f3d" d="M33 50h1v5h-1z"/>
<path fill="#d99a74" d="M33 55h1v1h-1zM36 56h9v1h-9zM47 51h1v2h-1z"/>
<path fill="#f0a393" d="M41 52h2v1h-2z"/>
<path fill="#b4614a" d="M44 53h2v1h-2z"/>
</g></g>
</g>
<g data-part="lamp">
<path fill="#2e325c" d="M79 41h10v1h-10zM86 38h1v1h-1zM86 61h9v1h-9zM87 39h1v1h-1zM88 40h1v1h-1z"/>
<path fill="#454c8a" d="M80 40h8v1h-8zM81 39h6v1h-6zM86 62h9v1h-9zM87 42h2v1h-2zM87 43h3v1h-3zM88 44h2v1h-2zM88 45h3v1h-3zM89 46h3v1h-3zM91 47h1v14h-1z"/>
<path fill="#6970b8" d="M78 41h1v1h-1zM79 40h1v1h-1zM80 39h1v1h-1zM82 38h4v1h-4zM90 47h1v14h-1z"/>
</g>
<g class="pd">
<g class="fore-far" data-part="fore-far">
<path class="hoodD" d="M29 53h4v1h-4zM29 54h6v1h-6zM29 55h8v1h-8zM31 56h8v1h-8zM33 57h7v1h-7zM35 58h5v1h-5zM37 59h3v1h-3z"/>
<path fill="#d99a74" d="M40 57h4v2h-4z"/>
<path fill="#b97a5a" d="M40 59h4v1h-4z"/>
</g>
<g class="seq-type"><g class="fore-near" data-part="fore-near">
<path class="hood" d="M27 53h5v1h-5zM27 54h7v1h-7zM27 56h7v1h-7zM27 55h9v1h-9zM29 57h5v1h-5zM31 58h3v1h-3zM33 59h1v1h-1zM36 56h1v1h-1z"/>
<path class="hoodL" d="M34 56h2v5h-2z"/>
<path fill="#f2c29b" d="M36 57h1v1h-1zM36 58h4v2h-4zM39 57h1v1h-1z"/>
<path fill="#ffdcbc" d="M37 57h2v1h-2z"/>
<path fill="#d99a74" d="M36 60h4v1h-4zM40 58h1v2h-1z"/>
</g></g>
<g class="seq-reach"><g data-part="reach">
<path class="hood" d="M27 53h11v1h-11zM27 54h25v1h-25zM27 55h39v1h-39zM27 56h40v1h-40zM35 57h32v1h-32zM49 58h18v1h-18zM63 59h4v1h-4zM69 57h3v3h-3zM69 56h4v1h-4z"/>
<path class="hoodL" d="M67 56h2v5h-2z"/>
<path fill="#f2c29b" d="M72 57h1v1h-1zM72 58h4v2h-4zM75 57h1v1h-1z"/>
<path fill="#ffdcbc" d="M73 57h2v1h-2z"/>
<path fill="#d99a74" d="M72 60h4v1h-4z"/>
</g></g>
<g class="seq-carry"><g data-part="carry">
<path class="hood" d="M27 55h5v1h-5zM27 54h7v1h-7zM27 53h10v1h-10zM27 52h12v1h-12zM29 51h13v1h-13zM31 50h13v1h-13zM34 49h12v1h-12zM36 48h11v1h-11zM39 47h8v1h-8zM41 46h6v1h-6zM43 45h4v1h-4zM46 44h1v1h-1zM48 43h4v1h-4zM49 47h2v1h-2zM49 44h3v2h-3zM49 46h4v1h-4z"/>
<path class="hoodL" d="M47 44h2v5h-2z"/>
<path fill="#f2c29b" d="M52 42h1v1h-1zM52 43h4v2h-4zM55 42h1v1h-1z"/>
<path fill="#d99a74" d="M52 45h4v1h-4z"/>
<path fill="#cdc4b8" d="M55 40h1v1h-1zM56 45h6v1h-6zM61 40h1v3h-1zM63 43h1v2h-1z"/>
<path fill="#6b4226" d="M56 40h5v1h-5z"/>
<path fill="#f6f1ea" d="M55 41h1v1h-1zM57 41h4v2h-4zM62 44h1v1h-1zM62 42h2v1h-2z"/>
<path fill="#ffffff" d="M56 41h1v2h-1z"/>
<path fill="#8b8bff" d="M56 43h6v2h-6z"/>
<path fill="#ffdcbc" d="M53 42h2v1h-2z"/>
</g></g>
<g class="seq-sip"><g class="sip-tilt"><g data-part="sip">
<path class="hood" d="M27 55h4v2h-4zM27 53h5v2h-5zM27 52h6v1h-6zM28 50h5v2h-5zM29 47h5v3h-5zM30 45h5v2h-5zM30 44h6v1h-6zM31 42h5v2h-5zM32 40h1v1h-1zM32 41h4v1h-4z"/>
<path fill="#d99a74" d="M33 40h4v1h-4z"/>
<path fill="#cdc4b8" d="M35 31h1v1h-1zM35 36h7v1h-7zM41 31h1v3h-1zM43 34h1v2h-1z"/>
<path fill="#6b4226" d="M36 31h5v1h-5z"/>
<path fill="#f6f1ea" d="M35 32h1v2h-1zM37 32h4v2h-4zM42 35h1v1h-1zM42 33h2v1h-2z"/>
<path fill="#ffffff" d="M36 32h1v2h-1z"/>
<path fill="#8b8bff" d="M35 34h7v2h-7z"/>
<path fill="#f2c29b" d="M33 37h1v1h-1zM33 38h4v2h-4zM36 37h1v1h-1z"/>
<path fill="#ffdcbc" d="M34 37h2v1h-2z"/>
</g></g></g>
</g>
              </svg>
              <svg class="px px-glow" viewBox="0 0 96 86" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
<g class="halo2" data-part="halo-2">
<path fill="#8b8bff" d="M42 31h1v12h-1zM42 30h35v1h-35zM58 57h19v2h-19zM76 31h1v26h-1z"/>
</g>
<g class="halo1" data-part="halo-1">
<path fill="#8b8bff" d="M43 32h1v11h-1zM43 31h33v1h-33zM58 56h18v1h-18zM75 32h1v24h-1z"/>
</g>
<g class="screen-code pd">
<rect class="cl" x="48" y="36" width="7" height="1" fill="#8b8bff" style="--w:7;--d:0.0"/>
<rect class="cl" x="56" y="36" width="9" height="1" fill="#2dd4bf" style="--w:9;--d:0.24"/>
<rect class="cl" x="51" y="38" width="6" height="1" fill="#f9a8d4" style="--w:6;--d:0.79"/>
<rect class="cl" x="58" y="38" width="8" height="1" fill="#ffd77a" style="--w:8;--d:1.0"/>
<rect class="cl" x="51" y="40" width="12" height="1" fill="#9aa3d4" style="--w:12;--d:1.49"/>
<rect class="cl" x="54" y="42" width="5" height="1" fill="#2dd4bf" style="--w:5;--d:2.28"/>
<rect class="cl" x="60" y="42" width="7" height="1" fill="#8b8bff" style="--w:7;--d:2.46"/>
<rect class="cl" x="54" y="44" width="10" height="1" fill="#9aa3d4" style="--w:10;--d:2.98"/>
<rect class="cl" x="65" y="44" width="4" height="1" fill="#f9a8d4" style="--w:4;--d:3.31"/>
<rect class="cl" x="51" y="46" width="8" height="1" fill="#ffd77a" style="--w:8;--d:3.59"/>
<rect class="cl" x="60" y="46" width="6" height="1" fill="#2dd4bf" style="--w:6;--d:3.86"/>
<rect class="cl" x="48" y="48" width="5" height="1" fill="#8b8bff" style="--w:5;--d:4.2"/>
<rect class="cl" x="54" y="48" width="11" height="1" fill="#9aa3d4" style="--w:11;--d:4.38"/>
<rect class="cl" x="48" y="50" width="4" height="1" fill="#f9a8d4" style="--w:4;--d:4.9"/>
</g>
<g class="pd"><g class="seq-mug">
<g class="steam w1" style="--sd:0s"><g class="sway" style="--sd:0s"><path class="steamc" d="M78 54h1v1h-1zM79 53h1v1h-1zM79 52h1v1h-1zM78 51h1v1h-1zM78 50h1v1h-1z"/></g></g>
<g class="steam w2" style="--sd:1.2s"><g class="sway" style="--sd:1.2s"><path class="steamc" d="M82 54h1v1h-1zM81 53h1v1h-1zM81 52h1v1h-1zM82 51h1v1h-1zM82 50h1v1h-1zM81 49h1v1h-1z"/></g></g>
</g></g>
<g class="pn">
<g class="zz z1" style="--zd:0s"><path fill="#dfe4ff" d="M49 39h1v1h-1zM50 39h1v1h-1zM51 39h1v1h-1zM49 41h1v1h-1zM50 41h1v1h-1zM51 41h1v1h-1zM50 40h1v1h-1z"/></g>
<g class="zz z2" style="--zd:1.4s"><path fill="#dfe4ff" d="M53 32h1v1h-1zM54 32h1v1h-1zM55 32h1v1h-1zM56 32h1v1h-1zM53 35h1v1h-1zM54 35h1v1h-1zM55 35h1v1h-1zM56 35h1v1h-1zM55 33h1v1h-1zM54 34h1v1h-1z"/></g>
<g class="zz z3" style="--zd:2.8s"><path fill="#dfe4ff" d="M58 23h1v1h-1zM59 23h1v1h-1zM60 23h1v1h-1zM61 23h1v1h-1zM62 23h1v1h-1zM58 27h1v1h-1zM59 27h1v1h-1zM60 27h1v1h-1zM61 27h1v1h-1zM62 27h1v1h-1zM61 24h1v1h-1zM60 25h1v1h-1zM59 26h1v1h-1z"/></g>
<rect class="cur" x="48" y="36" width="2" height="1" fill="#2dd4bf"/>
</g>
<g class="lg lg0" data-part="lamp-glow-0">
<path fill="#ffa94d" d="M80 43h7v1h-7zM81 41h5v2h-5zM81 44h5v2h-5z"/>
</g>
<g class="lg lg1" data-part="lamp-glow-1">
<path fill="#ffa94d" d="M78 43h2v1h-2zM78 41h3v2h-3zM78 44h3v2h-3zM79 40h9v1h-9zM79 46h9v1h-9zM80 39h7v1h-7zM80 47h7v1h-7zM86 41h3v2h-3zM86 44h3v2h-3zM87 43h2v1h-2z"/>
</g>
<g class="lg lg2" data-part="lamp-glow-2">
<path fill="#ffa94d" d="M75 42h3v3h-3zM76 41h2v1h-2zM76 45h2v1h-2zM76 40h3v1h-3zM76 46h3v1h-3zM77 39h3v1h-3zM77 47h3v1h-3zM78 38h11v1h-11zM78 48h11v1h-11zM79 37h9v1h-9zM79 49h9v1h-9zM82 36h3v1h-3zM82 50h3v1h-3zM87 39h3v1h-3zM87 47h3v1h-3zM88 40h3v1h-3zM88 46h3v1h-3zM89 41h2v1h-2zM89 45h2v1h-2zM89 42h3v3h-3z"/>
</g>
<g class="lg lg3" data-part="lamp-glow-3">
<path fill="#ffa94d" d="M72 43h3v1h-3zM73 42h2v1h-2zM73 44h2v1h-2zM73 40h3v2h-3zM73 45h3v2h-3zM74 39h3v1h-3zM74 47h3v1h-3zM74 38h4v1h-4zM74 48h4v1h-4zM75 37h4v1h-4zM75 49h4v1h-4zM76 36h6v1h-6zM76 50h6v1h-6zM77 35h13v1h-13zM77 51h13v1h-13zM80 34h7v1h-7zM80 52h7v1h-7zM85 36h6v1h-6zM85 50h6v1h-6zM88 37h4v1h-4zM88 49h4v1h-4zM89 38h4v1h-4zM89 48h4v1h-4zM90 39h3v1h-3zM90 47h3v1h-3zM91 40h3v2h-3zM91 45h3v2h-3zM92 42h2v1h-2zM92 44h2v1h-2zM92 43h3v1h-3z"/>
</g>
<g class="lg pool2" data-part="pool-2">
<path fill="#ffa94d" d="M66 63h28v1h-28zM69 64h24v1h-24z"/>
</g>
<g class="lg pool1" data-part="pool-1">
<path fill="#ffa94d" d="M74 63h18v1h-18zM76 64h14v1h-14z"/>
</g>
<g class="bulb" data-part="bulb">
<path fill="#fff4c8" d="M81 42h5v1h-5zM82 43h3v1h-3z"/>
</g>
              </svg>
            </div>
          </button>

          <!-- คำใบ้เล็กๆ ว่ากดได้ (หายไปหลังกดครั้งแรก) -->
          <p class="dev-hint" id="devHint" data-i18n="dev.hint">👆 Try clicking me</p>
        </div>
      </div>
    </section>

    <!-- ========== ส่วน ABOUT: แนะนำตัว + การศึกษา ========== -->
    <section id="about" class="section">
      <h2 class="section-title reveal"><span class="num">01.</span> <span data-i18n="about.title">About Me</span></h2>
      <div class="about-grid">
        <div class="about-text reveal">
          <!-- ✏️ แก้ข้อความแนะนำตัวได้ใน lang.js (about.p1, about.p2) -->
          <p data-i18n="about.p1">
            I'm a 4th-year Computer Engineering student at Rajabhat Phibulsongkram University.
          </p>
          <p data-i18n="about.p2">
            I like clean interfaces, solving problems step by step, and learning new tools quickly.
          </p>
        </div>

        <!-- ตัวเลขสถิติ: วิ่งนับขึ้นตอนเลื่อนมาถึง (data-count คือเลขปลายทาง) -->
        <div class="stats reveal">
          <div class="stat tilt">
            <strong data-count="5">0</strong>
            <span data-i18n="stat.langs">Programming languages</span>
          </div>
          <div class="stat tilt">
            <strong data-count="4">0</strong>
            <span data-i18n="stat.apis">AI / Data APIs used</span>
          </div>
          <div class="stat tilt">
            <strong data-count="0" id="projectCount">0</strong>
            <!-- ข้อความนี้ script.js จะเลือกคีย์ให้เองตามจำนวนโปรเจ็กต์จริง -->
            <span data-i18n="stat.projectsSoon">Projects (coming soon)</span>
          </div>
        </div>
      </div>

      <!-- การ์ดการศึกษา (แก้ข้อความใน lang.js คีย์ edu.*) -->
      <div class="edu-card tilt reveal">
        <div class="edu-icon" aria-hidden="true">🎓</div>
        <div>
          <small class="edu-label" data-i18n="edu.label">Education</small>
          <h3 data-i18n="edu.uni">Rajabhat Phibulsongkram University</h3>
          <p data-i18n="edu.faculty">Faculty of Engineering and Industrial Technology</p>
          <p class="edu-major" data-i18n="edu.major">Computer Engineering · 4th-year student</p>
        </div>
      </div>
    </section>

    <!-- ========== ส่วน SKILLS: ทักษะ ========== -->
    <section id="skills" class="section">
      <h2 class="section-title reveal"><span class="num">02.</span> <span data-i18n="skills.title">Skills</span></h2>

      <div class="skills-grid">
        <!-- แต่ละกล่อง = ทักษะ 1 หมวด (เพิ่ม/ลดชิปได้ตามต้องการ ชื่อเทคโนโลยีไม่ต้องแปล) -->
        <div class="skill-card tilt reveal">
          <h3 data-i18n="skills.prog">💻 Programming</h3>
          <div class="chips">
            <span>Python</span><span>C / C++</span><span>Java</span>
            <span>JavaScript</span><span>SQL</span>
          </div>
        </div>

        <div class="skill-card tilt reveal">
          <h3 data-i18n="skills.web">🌐 Web</h3>
          <div class="chips">
            <span>HTML</span><span>CSS</span><span>JavaScript</span>
          </div>
        </div>

        <div class="skill-card tilt reveal">
          <h3 data-i18n="skills.ai">🤖 AI &amp; APIs</h3>
          <div class="chips">
            <span>Groq API</span><span>Gemini API</span>
            <span>OpenRouter</span><span>Tavily</span>
            <span>Claude</span><span>ChatGPT</span><span>Gemini</span>
          </div>
        </div>

        <div class="skill-card tilt reveal">
          <h3 data-i18n="skills.tools">🛠️ Tools &amp; Design</h3>
          <div class="chips">
            <!-- UX/UI Design มีเกียรติบัตรรองรับ (ดูส่วน Certificates) -->
            <span>UX/UI Design</span><span>Figma</span><span>VS Code</span>
            <span>Word</span><span>Excel</span><span>GitHub</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ส่วน PROJECTS: ผลงาน ========== -->
    <section id="projects" class="section">
      <h2 class="section-title reveal"><span class="num">03.</span> <span data-i18n="projects.title">Projects</span></h2>

      <div class="projects-grid">
        <!--
          📌 วิธีเพิ่มโปรเจ็กต์จริง:
          1) คัดลอกการ์ดด้านล่าง 1 อัน
          2) ลบคลาส "placeholder" ออก
          3) แก้ชื่อ, คำอธิบาย, แท็กเทคโนโลยี และลิงก์ GitHub / Demo
             (ถ้าต้องการให้แปลสองภาษา ให้เพิ่มคีย์ใน lang.js แล้วใส่ data-i18n)
          4) (ถ้ามีรูป) ใส่ <img src="images/ชื่อไฟล์.png" alt="..."> แทนกล่อง .project-thumb
        -->

        <!-- โปรเจ็กต์จริง: Song Finder -->
        <article class="project-card tilt reveal">
          <!-- รูปโลโก้โปรเจ็กต์ (ไฟล์ images/song-finder-logo.png) คลาส has-img = กรอบแบบพื้นสว่างสำหรับรูป -->
          <div class="project-thumb has-img">
            <img src="images/song-finder-logo.png" alt="Song Finder logo" width="250" height="75" />
          </div>
          <h3>Song Finder</h3>
          <p data-i18n="song.desc">
            Web app for discovering songs with AI models verified against the iTunes catalog.
          </p>
          <div class="chips small">
            <span>JavaScript</span><span>Node.js</span><span>Express</span>
            <span>HTML/CSS</span><span>Gemini</span><span>Groq</span>
            <span>OpenRouter</span><span>Tavily</span><span>iTunes API</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/sitthaforwork/song-finder" target="_blank" rel="noopener">GitHub ↗</a>
            <!-- Live Demo ที่ deploy บน Render -->
            <a href="https://song-finder-j6qm.onrender.com/" target="_blank" rel="noopener">Live Demo ↗</a>
          </div>
        </article>

        <article class="project-card placeholder tilt reveal">
          <div class="project-thumb">🚧</div>
          <h3 data-i18n="ph.projTitle">Project Title</h3>
          <p data-i18n="ph.projDesc">A short description of what the project does.</p>
          <div class="chips small"><span>Tech 1</span><span>Tech 2</span></div>
          <div class="project-links">
            <a href="https://github.com/sitthaforwork" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="#" aria-disabled="true">Live Demo ↗</a>
          </div>
        </article>

        <article class="project-card placeholder tilt reveal">
          <div class="project-thumb">🚧</div>
          <h3 data-i18n="ph.projTitle">Project Title</h3>
          <p data-i18n="ph.projDesc">A short description of what the project does.</p>
          <div class="chips small"><span>Tech 1</span><span>Tech 2</span></div>
          <div class="project-links">
            <a href="https://github.com/sitthaforwork" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="#" aria-disabled="true">Live Demo ↗</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ========== ส่วน CERTIFICATES: เกียรติบัตร / ใบประกาศ ========== -->
    <section id="certificates" class="section">
      <h2 class="section-title reveal"><span class="num">04.</span> <span data-i18n="certs.title">Certificates</span></h2>

      <div class="certs-grid">
        <!--
          📌 วิธีเพิ่มเกียรติบัตร:
          1) ใส่รูปในโฟลเดอร์ images/ (.jpg / .png)
          2) คัดลอกการ์ดด้านล่าง 1 อัน (ใช้การ์ดที่มีรูป หรือการ์ด placeholder ก็ได้)
          3) แก้รูป ชื่อ ผู้ออก วันที่ และลิงก์ตรวจสอบ
          4) เพิ่มข้อความสองภาษาใน lang.js ถ้าต้องการให้แปล
          (กดที่รูปแล้วจะขยายเต็มจอให้เอง)
        -->

        <!-- เกียรติบัตร 1: UX/UI Design (ข้อมูลตามที่ระบุในเกียรติบัตร) -->
        <article class="cert-card tilt reveal">
          <div class="cert-thumb">
            <img src="images/cert-uxui.jpg" alt="Certificate: User Experience and User Interface Design" />
          </div>
          <h3 data-i18n="uxui.title">User Experience and User Interface Design</h3>
          <p class="cert-issuer" data-i18n="uxui.issuer">Department of Skill Development, Ministry of Labour</p>
          <p class="cert-date" data-i18n="uxui.date">25 March 2025</p>
          <p class="cert-desc" data-i18n="uxui.desc">Completed an online skills training course · 8 hours 30 minutes</p>
          <!-- ลิงก์นี้ถอดจาก QR code บนเกียรติบัตร (เว็บของกรมพัฒนาฝีมือแรงงาน) -->
          <a class="cert-link" href="http://onlinetraining.dsd.go.th/documents/b8fccc17d97a5904bc152f1aaa8df073.pdf"
             target="_blank" rel="noopener" data-i18n="cert.verify">Verify Online ↗</a>
        </article>

        <!-- เกียรติบัตร 2: Python Essentials 1 (ข้อมูลตามที่ระบุในเกียรติบัตร) -->
        <article class="cert-card tilt reveal">
          <div class="cert-thumb">
            <img src="images/cert-python.jpg" alt="Certificate: Python Essentials 1, Cisco Networking Academy" />
          </div>
          <h3 data-i18n="py.title">Python Essentials 1</h3>
          <p class="cert-issuer" data-i18n="py.issuer">Cisco Networking Academy · OpenEDG Python Institute</p>
          <p class="cert-date" data-i18n="py.date">Issued on 10 December 2025</p>
          <p class="cert-desc" data-i18n="py.desc">Statement of Achievement · student level credential</p>
          <!-- ลิงก์นี้ถอดจาก QR code บนเกียรติบัตร (หน้า badge บน Credly) -->
          <a class="cert-link" href="https://www.credly.com/badges/73eb56c4-ef20-4866-8dae-19cd2c3c2c66"
             target="_blank" rel="noopener" data-i18n="cert.verify">Verify Online ↗</a>
          <!-- รายการหัวข้อที่เรียน พับเก็บไว้ ไม่ให้การ์ดยาวเกินไป (คงเป็นภาษาอังกฤษตามต้นฉบับเกียรติบัตร) -->
          <details class="cert-details">
            <summary data-i18n="py.details">What the graduate has studied</summary>
            <ul>
              <li>Design, develop, debug, execute, and refactor simple computer programs written in Python 3.</li>
              <li>Think algorithmically to analyze problems and implement them as computer processes.</li>
              <li>Use the syntax, semantics, and the most important elements of the Python Standard Library to write Python scripts and resolve typical implementation challenges.</li>
              <li>Understand the role of a programmer in the software development process.</li>
              <li>Attempt the qualification PCEP – Certified Entry-Level Python Programmer from OpenEDG Python Institute and continue their professional development at an intermediate level with Python Essentials 2.</li>
            </ul>
          </details>
        </article>

        <!-- เกียรติบัตร 3: หนังสือรับรองผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ (ข้อมูลตามที่ระบุในหนังสือรับรอง) -->
        <article class="cert-card tilt reveal">
          <div class="cert-thumb">
            <img src="images/cert-skill.jpg" alt="National Skill Standard Assessment Certificate: Microcomputer Repair Technician Level 1" />
          </div>
          <h3 data-i18n="sk.title">Microcomputer Repair Technician, Level 1</h3>
          <p class="cert-issuer" data-i18n="sk.issuer">Pibulsongkram Rajabhat University Skill Standard Testing Center · authorised by the Department of Skill Development, Ministry of Labour</p>
          <p class="cert-date" data-i18n="sk.date">Given on 26 October 2026 (B.E. 2569)</p>
          <p class="cert-desc" data-i18n="sk.desc">National Skill Standard Assessment Certificate No. มรพส.0083/2569 · Electrical and Electronics Sector</p>
          <!-- รายการสมรรถนะและคะแนน พับเก็บไว้ (คงเป็นภาษาไทยตามต้นฉบับ) ไม่ต้องการแสดงคะแนนก็ลบ <li> แรกออกได้ -->
          <details class="cert-details">
            <summary data-i18n="sk.details">Competency and score (as stated on the certificate)</summary>
            <ul>
              <li>คะแนนรวม 78.87% (ภาคความรู้ 18.67% · ภาคความสามารถ 60.2%)</li>
              <li>สามารถปฏิบัติงานติดตั้งเครื่องไมโครคอมพิวเตอร์และทำการ Upgrade Hardware สาธิตวิธีการ Setup BIOS วิธีการติดตั้งระบบปฏิบัติการ ติดตั้งโปรแกรมประยุกต์ใช้งาน</li>
              <li>ติดตั้ง Network Interface Card กำหนดค่าหมายเลข IP Address ติดตั้งและปรับแต่งโปรแกรมป้องกันไวรัส สำรอง กู้คืนระบบและข้อมูล</li>
            </ul>
          </details>
        </article>

        <!-- การ์ดว่างไว้เพิ่มเกียรติบัตรใบต่อไป -->
        <article class="cert-card placeholder tilt reveal">
          <div class="cert-thumb">🏆</div>
          <h3 data-i18n="cert.phName">Certificate Name</h3>
          <p class="cert-issuer" data-i18n="cert.phIssuer">Issued by · Organization</p>
          <p class="cert-date" data-i18n="cert.phDate">Month Year</p>
          <a class="cert-link" href="#" aria-disabled="true" data-i18n="cert.verify">Verify Online ↗</a>
        </article>
      </div>
    </section>

    <!-- ========== ส่วน CONTACT: ช่องทางติดต่อ ========== -->
    <section id="contact" class="section">
      <h2 class="section-title reveal"><span class="num">05.</span> <span data-i18n="contact.title">Contact</span></h2>

      <div class="contact-box reveal">
        <p class="contact-lead" data-i18n="contact.lead">
          Interested in working together or just want to say hi? My inbox is always open.
        </p>

        <div class="contact-list">
          <!-- mailto: กดแล้วเปิดแอปอีเมล -->
          <!-- การ์ดอีเมล: ตัวอีเมลกดเปิดแอปเมลได้ และมีปุ่ม 📋 ข้างๆ สำหรับคัดลอก (data-copy คือข้อความที่จะคัดลอก) -->
          <div class="contact-item contact-email tilt">
            <span class="ci-icon">✉️</span>
            <a class="ci-text" href="mailto:sittha.forwork@gmail.com"><small data-i18n="contact.email">Email</small>sittha.forwork@gmail.com</a>
            <button class="copy-btn" type="button" data-copy="sittha.forwork@gmail.com" data-i18n-title="copy.title" title="Copy email" aria-label="Copy email">📋</button>
          </div>
          <!-- tel: กดแล้วโทรออกได้บนมือถือ (+66 คือรหัสประเทศไทย) -->
          <a class="contact-item tilt" href="tel:+66993739421">
            <span class="ci-icon">📞</span>
            <span class="ci-text"><small data-i18n="contact.phone">Phone</small>099-373-9421</span>
          </a>
          <a class="contact-item tilt" href="files/Sittha_Sajjahatayasom_Resume.pdf" download="Sittha_Sajjahatayasom_Resume.pdf">
            <span class="ci-icon">📄</span>
            <span class="ci-text"><small data-i18n="contact.resume">Résumé (PDF)</small><span data-i18n="contact.resumeBtn">Download</span></span>
          </a>
          <a class="contact-item tilt" href="https://github.com/sitthaforwork" target="_blank" rel="noopener">
            <span class="ci-icon">🐙</span>
            <span class="ci-text"><small data-i18n="contact.github">GitHub</small>github.com/sitthaforwork</span>
          </a>
        </div>

        <!-- ฟอร์มส่งข้อความ: ส่งผ่าน Formspree ไปที่อีเมลของคุณ (ตั้งค่า FORM_ENDPOINT ใน script.js ส่วนที่ 15)
             ถ้ายังไม่ตั้งค่า จะเปิดแอปอีเมลพร้อมข้อความที่กรอกไว้แทน (ไม่พัง) -->
        <form class="contact-form" id="contactForm" novalidate>
          <h3 data-i18n="form.title">Send me a message</h3>
          <div class="cf-row">
            <label><span data-i18n="form.name">Your name</span>
              <input type="text" name="name" id="cfName" required maxlength="80" autocomplete="name" /></label>
            <label><span data-i18n="form.email">Your email</span>
              <input type="email" name="email" id="cfEmail" required maxlength="120" autocomplete="email" /></label>
          </div>
          <label><span data-i18n="form.message">Message</span>
            <textarea name="message" id="cfMessage" rows="5" required maxlength="2000"></textarea></label>
          <!-- ช่องดักบอท: คนจริงมองไม่เห็นและไม่กรอก ถ้ามีข้อมูลแปลว่าเป็นบอท -->
          <input type="text" name="_gotcha" id="cfTrap" class="cf-trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button class="btn btn-primary" type="submit" id="cfSubmit" data-i18n="form.send">Send message</button>
          <p class="cf-status" id="cfStatus" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>

  <!-- ========== FOOTER ========== -->
  <footer class="footer">
    <!-- ปีอัปเดตอัตโนมัติด้วย JavaScript -->
    <p>© <span id="year"></span> <span data-i18n="footer.text">Sittha Sajjahathayasom</span></p>
  </footer>

  <!-- เคอร์เซอร์แบบกำหนดเอง: จุดเล็ก + วงแหวนที่ไล่ตามเมาส์ (เปิดเฉพาะอุปกรณ์ที่มีเมาส์ ดู script.js ส่วนที่ 13) -->
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>

  <!-- ข้อความแจ้งเตือนเล็กๆ ด้านล่างจอ (เช่น "คัดลอกอีเมลแล้ว") -->
  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <!-- ปุ่มเปิด Terminal มุมขวาล่าง (บนคอมกดปุ่ม ` แทนได้) -->
  <button class="terminal-fab" id="terminalFab" type="button" data-i18n-title="term.fab" title="Open Terminal" aria-label="Open terminal">&gt;_</button>

  <!-- หน้าต่าง Terminal ซ่อน (easter egg): พิมพ์คำสั่งอย่าง help, about, skills, projects ได้ ควบคุมด้วย script.js ส่วนที่ 12 -->
  <div class="terminal" id="terminal" role="dialog" aria-modal="true" aria-label="Terminal" aria-hidden="true">
    <div class="terminal-window">
      <div class="terminal-bar">
        <i></i><i></i><i></i>
        <span>guest@sittha: ~</span>
        <button id="terminalClose" type="button" data-i18n-title="term.close" title="Close" aria-label="Close">✕</button>
      </div>
      <div class="terminal-output" id="termOut" aria-live="polite"></div>
      <label class="terminal-line">
        <span class="prompt">guest@sittha:~$</span>
        <input id="termInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Terminal command" />
      </label>
    </div>
  </div>

  <!-- หน้าต่างขยายรูปเกียรติบัตร (เปิดตอนกดที่รูป ควบคุมด้วย script.js) -->
  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" aria-label="Close">✕</button>
    <img id="lightboxImg" src="" alt="" />
  </div>

  <!-- เชื่อมไฟล์ JavaScript (วางไว้ท้ายสุดเพื่อให้หน้าเว็บโหลดก่อน) -->
  <!-- lang.js ต้องมาก่อน script.js เพราะ script.js ใช้ข้อความจากไฟล์นี้ -->
  <script src="lang.js"></script>
  <script src="script.js"></script>
</body>
</html>
