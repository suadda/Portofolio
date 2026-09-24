import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import profilePhoto from '/foto3.webp';

const DATA = {
  name: "Firdaus Rabby Mohamad Rafhael",
  role: "Fullstack Developer",
  about:
    "Fullstack Developer dengan fondasi kuat di UI/UX design, frontend engineering, dan backend integration. Berpengalaman membangun aplikasi web end-to-end — dari antarmuka yang intuitif dengan React dan Tailwind CSS hingga pengelolaan database relasional dengan PostgreSQL dan MySQL. Terbiasa menerjemahkan alur bisnis yang kompleks menjadi solusi digital yang efisien dan mudah digunakan.",
  email: "suadraff95@email.com",
  photos: ["/foto3.jpeg"],
  cvUrl: "https://drive.google.com/file/d/1KaxuyIqK5_p2ITpjZnB_gdJUngEVEfvl/view?usp=sharing",
  avatar: null,
  links: {
    github: "https://github.com/suadda",
    linkedin: "https://www.linkedin.com/in/firdaus-rabby-mohamad-rafhael-287979291/",
  },
  skillGroups: [
    {
      label: "Primary",
      skills: [
        { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "CSS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "HTML",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "SQL",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      ],
    },
    {
      label: "Also familiar with",
      skills: [
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "C++",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ],
    },
  ],
  projects: [
    {
      slug: "little-paws",
      title: "UI/UX Design — Little Paws",
      desc: "Desain UI/UX aplikasi mobile untuk layanan adopsi dan perawatan hewan peliharaan. Mencakup user flow lengkap dari onboarding hingga konfirmasi adopsi dengan prototype interaktif.",
      tags: ["Figma", "UI/UX"],
      link: "https://www.figma.com/design/dlPgBzgDZogkWLDYC1cB0x/Little-Paws?node-id=0-1&p=f",
      external: true,
      year: "2023",
      detail: {
        role: "UI/UX Designer",
        overview:
          "Little Paws adalah konsep aplikasi mobile untuk adopsi dan perawatan hewan peliharaan. Saya merancang alur pengguna dari pencarian hewan, detail profil, sampai proses adopsi — dengan fokus pada navigasi yang sederhana dan tampilan yang ramah untuk pengguna baru.",
        stack: [
          { name: "Figma", use: "Wireframe, high-fidelity mockup, dan prototype interaktif" },
        ],
        highlights: [
          "Menyusun user flow lengkap dari onboarding sampai konfirmasi adopsi",
          "Membuat komponen yang konsisten agar desain mudah dikembangkan",
          "Prototype interaktif untuk menguji alur sebelum masuk tahap development",
        ],
        linkLabel: "Lihat desain di Figma",
      },
    },
    {
      slug: "portofolio",
      title: "Personal Portfolio",
      desc: "Website portfolio ini — dibangun dengan React dan Vite. Menampilkan animasi berbasis IntersectionObserver, glow cursor effect, dan desain responsif tanpa dependensi UI eksternal.",
      tags: ["React", "Vite", "CSS"],
      link: "https://github.com/suadda/Portofolio",
      external: true,
      year: "2025",
      detail: {
        role: "Frontend Developer",
        overview:
          "Portfolio personal yang dibangun dari nol dengan React dan Vite, tanpa library UI eksternal. Fokus pada performa, animasi halus dengan IntersectionObserver, dan arsitektur kode yang bersih.",
        stack: [
          { name: "React 19", use: "UI components dan state management" },
          { name: "Vite 7",   use: "Build tool dan dev server" },
          { name: "CSS",      use: "Styling murni tanpa framework — class-based, responsif" },
        ],
        highlights: [
          "Glow cursor menggunakan ref langsung ke DOM — nol re-render saat mouse bergerak",
          "useInView hook custom berbasis IntersectionObserver untuk animasi masuk elemen",
          "Scroll-spy navbar yang menyorot section aktif secara otomatis",
          "Fully responsive tanpa dependensi CSS framework",
        ],
        linkLabel: "Lihat source di GitHub",
      },
    },
    {
      slug: "transaction-dev",
      title: "Sistem Pengajuan Transaksi",
      desc: "Aplikasi web manajemen pengajuan transaksi pengeluaran dengan workflow approval berjenjang dan Role Based Access Control (RBAC) untuk 5 peran pengguna.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      link: "https://github.com/suadda/transaction-dev",
      external: true,
      year: "2025",
      detail: {
        role: "Fullstack Developer",
        overview:
          "Sistem internal untuk mengelola pengajuan transaksi pengeluaran perusahaan. Alur approval ditentukan otomatis berdasarkan kategori dan nominal — SPV, Manager, Direktur, hingga Finance — dengan jejak audit lengkap di setiap tahap.",
        stack: [
          { name: "Laravel 13",      use: "Backend MVC, routing, Eloquent ORM, dan WorkflowService" },
          { name: "Laravel Breeze",  use: "Autentikasi siap pakai (login, session, middleware role)" },
          { name: "MySQL",           use: "Database relasional — submissions, approvals, payments, budgets" },
          { name: "Bootstrap 5",     use: "UI responsif via CDN" },
        ],
        highlights: [
          "RBAC 5 peran: Staff, SPV, Manager, Direktur, Finance — tiap peran punya tampilan dan aksi berbeda",
          "Workflow approval dinamis: rantai approver ditentukan otomatis di WorkflowService berdasarkan kategori & nominal",
          "Upload dokumen (PDF/JPG/PNG maks 5 MB) via Laravel Storage dengan symlink publik",
          "Pengecekan sisa budget kategori sebelum approval Finance; saldo dihitung dari Σ transaksi Paid — bukan mutasi kolom",
          "Dashboard statistik: jumlah per status, total dibayar, dan penggunaan budget per kategori",
          "Timeline approval per pengajuan — seluruh jejak approve/reject tersimpan di tabel approvals",
        ],
        linkLabel: "Lihat source di GitHub",
      },
    },
    {
      slug: "nexa-clinic",
      title: "Nexa Clinic — Sistem Informasi Klinik",
      desc: "Aplikasi klinik mini fullstack dengan React frontend, Express REST API, dan PostgreSQL. Fitur lengkap: manajemen pasien, antrean, dan pemeriksaan medis metode SOAP dengan autentikasi JWT.",
      tags: ["React", "Express", "PostgreSQL", "JWT", "Tailwind"],
      link: "https://github.com/suadda/mini-clinic-system",
      external: true,
      year: "2025",
      detail: {
        role: "Fullstack Developer",
        overview:
          "Sistem informasi klinik mini yang dibangun sebagai technical assignment. Terdiri dari REST API Node.js/Express dan frontend React terpisah, dengan tiga peran pengguna (Administrator, Dokter, Petugas) yang dikontrol via JWT dan middleware otorisasi di setiap endpoint.",
        stack: [
          { name: "React 18 + Vite",       use: "Frontend SPA — routing, AuthContext, Axios interceptor" },
          { name: "Tailwind CSS",          use: "Styling utility-first" },
          { name: "Node.js + Express",     use: "REST API — controllers, middleware auth, validator" },
          { name: "PostgreSQL",            use: "Database — 12 tabel dengan relasi lengkap" },
          { name: "JWT + bcryptjs",        use: "Autentikasi stateless dan hashing password" },
        ],
        highlights: [
          "Autentikasi JWT stateless — token disimpan di localStorage, disisipkan otomatis via Axios interceptor, response 401 redirect ke login",
          "CRUD pasien dengan nomor rekam medis otomatis (RM000001…) dan validasi NIK 16 digit unik",
          "Sistem antrean otomatis per poli per hari dengan format kode poli + nomor urut (contoh: A001)",
          "Pemeriksaan SOAP lengkap: Subjective, Objective (tanda vital), Assessment, Plan — ditambah tindakan medis dan resep obat",
          "RBAC 3 peran dengan kontrol akses di level route API (middleware) dan halaman frontend (ProtectedRoute)",
          "database.sql idempoten — satu file untuk migrasi sekaligus seed data awal, aman dijalankan ulang",
        ],
        linkLabel: "Lihat source di GitHub",
      },
    }
  ],
};

function useInView(threshold = 0.12) {
  const [inView, setInView] = useState(false);
  const observerRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observerRef.current.observe(ref.current);
    return () => observerRef.current?.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function GlowCursor() {
  const elRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (elRef.current) {
        elRef.current.style.top  = `${e.clientY - 250}px`;
        elRef.current.style.left = `${e.clientX - 250}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={elRef} className="glow-cursor" style={{ top: -300, left: -300 }} />;
}

function NavBar() {
  const location = useLocation();
  const getActive = (path) => {
    if (path === "/" || path === "") return "about";
    if (path.startsWith("/portfolio")) return "portfolio";
    if (path.startsWith("/contact")) return "contact";
    return "";
  };
  const active = getActive(location.pathname);

  const navItems = [
    { label: "About",     to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Contact",   to: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={`navbar-btn${active === label.toLowerCase() ? " active" : ""}`}
            aria-current={active === label.toLowerCase() ? "page" : undefined}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="navbar-spacer" />

      <div className="navbar-avatar">
        {DATA.avatar ? (
          <img src={DATA.avatar} alt="avatar" />
        ) : (
          <span className="navbar-avatar-initial">{DATA.name.charAt(0)}</span>
        )}
      </div>
    </nav>
  );
}

function SkillBadge({ name, icon, delay, inView }) {
  return (
    <div
      className="skill-badge"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transition: `border-color 0.2s ease, background 0.2s ease, opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
      }}
    >
      <img src={icon} alt={name} width={16} height={16} />
      <span className="skill-badge-name">{name}</span>
    </div>
  );
}

function ProfilePhoto() {
  const photo = DATA.photos && DATA.photos.length > 0 ? DATA.photos[0] : null;
  return (
    <div className="profile-photo-wrap">
      <div className="profile-photo-inner">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Foto Profil" />
        ) : (
          <div className="profile-photo-placeholder">
            <span style={{ fontSize: 28, opacity: 0.4 }}>📷</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3, color: "rgba(255,255,255,0.75)" }}>
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7M12 12C13.3261 12 14.5979 11.4732 15.5355 10.5355C16.4732 9.59785 17 8.32608 17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 21V19C20 17.9391 19.5259 16.9217 18.6569 16.1716C17.7878 15.4214 16.6087 15 15.375 15H8.625C7.39131 15 6.21217 15.4214 5.34315 16.1716C4.47412 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="profile-photo-placeholder-label">Foto Profil</span>
          </div>
        )}
      </div>
      <div className="profile-photo-gradient" />
      <div className="profile-photo-corner profile-photo-corner--tr" />
      <div className="profile-photo-corner profile-photo-corner--bl" />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="section-label-text">{children}</span>
      <div className="section-label-line" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {DATA.name}</span>
      <span></span>
    </footer>
  );
}

function AboutPage() {
  const [ref, inView] = useInView();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="about-section">
      <div className="about-grid">
        <div>
          <div className={`about-greeting fade-up${show ? " visible" : ""}`} style={{ transitionDelay: "0.08s" }}>
            <div className="about-greeting-label">Hello, I'm</div>
            <h1 className="about-name">{DATA.name}</h1>
            <h2 className="about-role">
              and I'm a <span className="about-role-highlight">{DATA.role}</span>
            </h2>
          </div>

          <p className={`about-bio fade-up${show ? " visible" : ""}`} style={{ transitionDelay: "0.22s" }}>
            {DATA.about}{" "}
            <a href={DATA.cvUrl} target="_blank" rel="noopener noreferrer">Lihat CV</a>.
          </p>

          <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.6s ease 0.32s" }}>
            {DATA.skillGroups.map((group, gi) => (
              <div key={group.label} style={{ marginBottom: gi < DATA.skillGroups.length - 1 ? 24 : 0 }}>
                <div className="skill-group-label">{group.label}</div>
                <div className="skill-group-list">
                  {group.skills.map((skill, si) => (
                    <SkillBadge
                      key={skill.name} name={skill.name} icon={skill.icon}
                      inView={inView} delay={0.04 + si * 0.035 + gi * 0.16}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`about-photo fade-right${show ? " visible" : ""}`}>
          <ProfilePhoto />
        </div>
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} className="portfolio-section">
      <SectionLabel>Portfolio</SectionLabel>
      <div className="project-list">
        {DATA.projects.map((p, i) => {
          const cardStyle = {
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: `border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, opacity 0.4s ease ${i * 0.1}s`,
          };
          const cardContent = (
            <>
              <div className="project-card-header">
                <h3 className="project-card-title">{p.title}</h3>
                <span className="project-card-year">{p.year}</span>
              </div>
              <p className="project-card-desc">{p.desc}</p>
              <div className="project-card-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </>
          );

          return p.external ? (
            <a
              key={p.slug}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={cardStyle}
            >
              {cardContent}
            </a>
          ) : (
            <Link
              key={p.slug}
              to={`/portfolio/${p.slug}`}
              className="project-card"
              style={cardStyle}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ContactPage() {
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} className="contact-section">
      <SectionLabel>Contact</SectionLabel>
      <div className={`fade-up${inView ? " visible" : ""}`} style={{ transitionDuration: "0.6s" }}>
        <h2 className="contact-heading">
          Let's build something<br />
          <span className="contact-heading-accent">together.</span>
        </h2>
        <p className="contact-body">
          Saya terbuka untuk peluang baru, kolaborasi, atau sekadar diskusi. Feel free to reach out!
        </p>
        <a href={`mailto:${DATA.email}`} className="contact-email-btn">
          ✉ {DATA.email}
        </a>
        <div className="contact-links">
          {Object.entries(DATA.links).map(([key, href]) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
              {key} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const project = DATA.projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setShow(true), 40);
    return () => clearTimeout(t);
  }, [slug]);

  if (!project) {
    useEffect(() => { navigate("/portfolio", { replace: true }); }, []);
    return null;
  }

  const d = project.detail || {};
  const stack = d.stack || project.tags.map(t => ({ name: t, use: null }));

  return (
    <div
      className={`project-detail fade-up${show ? " visible" : ""}`}
      style={{ transitionDuration: "0.45s" }}
    >
      <button className="project-detail-back" onClick={() => navigate(-1)}>
        ← Kembali ke portfolio
      </button>

      <div className="project-detail-header">
        <h1 className="project-detail-title">{project.title}</h1>
        <span className="project-detail-year">{project.year}</span>
      </div>

      {d.role && <p className="project-detail-role">{d.role}</p>}

      <p className="project-detail-overview">{d.overview || project.desc}</p>

      <h2 className="project-detail-section-label">Tools &amp; Teknologi</h2>
      <div className="project-detail-stack">
        {stack.map(s => (
          <div key={s.name} className="project-detail-stack-item">
            <span className="project-detail-stack-name">{s.name}</span>
            {s.use && <p className="project-detail-stack-use">{s.use}</p>}
          </div>
        ))}
      </div>

      {d.highlights && d.highlights.length > 0 && (
        <>
          <h2 className="project-detail-section-label">Yang Dikerjakan</h2>
          <ul className="project-detail-highlights">
            {d.highlights.map(h => (
              <li key={h} className="project-detail-highlight-item">
                <span className="project-detail-highlight-dash">—</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-detail-cta"
      >
        {d.linkLabel || "Buka project"} ↗
      </a>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="not-found-code">404</span>
      <p className="not-found-msg">Halaman tidak ditemukan.</p>
      <Link to="/" className="not-found-link">← Kembali ke beranda</Link>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="app-root">
      <GlowCursor />
      <NavBar />
      <main className="app-main">
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><AboutPage /></Layout>} />
      <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
      <Route path="/portfolio/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  );
}
