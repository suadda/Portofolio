import { useState, useEffect, useRef } from "react";
import './App.css'

const DATA = {
  name: "Firdaus Rabby Mohamad Rafhael",
  role: "Frontend Developer",
  about:
    "Saya seorang Frontend Developer dengan passion mendalam pada UI yang detail dan performa web yang optimal. Saya suka mengubah desain kompleks menjadi pengalaman yang intuitif dan menyenangkan.",
  email: "suadraff95@email.com", // TODO: replace with your REAL email — the "Contact" button uses this as a mailto link
  photos: ["/foto3.jpeg"],
  linkedinUrl: "https://www.linkedin.com/in/firdaus-rabby-mohamad-rafhael-287979291/",
  cvUrl: "https://drive.google.com/file/d/1lSwvPX3vnj6cYiJ8aE2mkCpMDIrU65iO/view?usp=sharing",
  avatar: null,
  links: {
    github: "https://github.com/suadda", // TODO: confirm this is your correct GitHub profile URL
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
        { name: "Laravel",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "C++",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Node.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ],
    },
  ],
  projects: [
    {
      title: "UI/UX Design",
      desc: "Desain UI/UX aplikasi mobile 'Little Paws' untuk layanan adopsi dan perawatan hewan peliharaan (Pet Care).",
      tags: ["Figma"],
      link: "https://www.figma.com/design/dlPgBzgDZogkWLDYC1cB0x/Little-Paws?node-id=0-1&p=f",
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
    // Add more REAL projects using the shape below (avoid placeholder/"#" links —
    // recruiters spot filler immediately, and dead links hurt the impression):
    // {
    //   title: "Nama Project",
    //   desc: "Deskripsi singkat tentang apa yang kamu bangun dan hasilnya.",
    //   tags: ["React", "Tailwind"],
    //   link: "https://link-ke-project-atau-repo",
    //   year: "2024",
    //   detail: {
    //     role: "Frontend Developer",
    //     overview: "Cerita lengkap project: masalah, solusi, dan hasilnya.",
    //     stack: [
    //       { name: "React", use: "Untuk apa kamu pakai ini di project tersebut" },
    //     ],
    //     highlights: ["Hal penting 1", "Hal penting 2"],
    //     linkLabel: "Buka project",
    //   },
    // },
  ],
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function GlowCursor() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div style={{
      position: "fixed",
      top: pos.y - 250, left: pos.x - 250,
      width: 500, height: 500,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,255,200,0.055) 0%, transparent 70%)",
      pointerEvents: "none", zIndex: 0,
      transition: "top 0.1s ease, left 0.1s ease",
    }} />
  );
}

function NavBar({ active, onNavigate }) {
  const navItems = ["about", "portfolio", "contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center",
      padding: "0 5%", height: 60,
      background: "rgba(10,13,20,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map(item => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            aria-current={active === item ? "true" : undefined}
            style={{
              padding: "6px 18px",
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
              fontSize: 14, border: "none", borderRadius: 8,
              cursor: "pointer",
              color: active === item ? "#63ffc8" : "rgba(255,255,255,0.45)",
              background: active === item ? "rgba(99,255,200,0.08)" : "transparent",
              boxShadow: active === item ? "0 0 16px rgba(99,255,200,0.35)" : "none",
              textShadow: active === item ? "0 0 12px rgba(99,255,200,0.55)" : "none",
              transition: "color 0.25s, background 0.25s, box-shadow 0.25s, text-shadow 0.25s",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid rgba(99,255,200,0.2)",
        background: "rgba(99,255,200,0.06)",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {DATA.avatar ? (
          <img src={DATA.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(99,255,200,0.4)" }}>
            {DATA.name.charAt(0)}
          </span>
        )}
      </div>
    </nav>
  );
}

function SkillBadge({ name, icon, delay, inView }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "7px 14px", borderRadius: 20,
        border: `1px solid ${hover ? "rgba(99,255,200,0.4)" : "rgba(255,255,255,0.14)"}`,
        background: hover ? "rgba(99,255,200,0.07)" : "rgba(255,255,255,0.04)",
        cursor: "default", transition: "all 0.2s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transitionDelay: `${delay}s`,
        userSelect: "none",
      }}
    >
      <img src={icon} alt={name} width={16} height={16} style={{ objectFit: "cover" }} />
      <span style={{
        fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
        color: hover ? "#fff" : "rgba(255,255,255,0.75)",
        transition: "color 0.2s",
      }}>
        {name}
      </span>
    </div>
  );
}

function ProfilePhoto() {
  const photo = DATA.photos && DATA.photos.length > 0 ? DATA.photos[0] : null;

  return (
    <div style={{
      position: "relative", width: "100%",
      aspectRatio: "3/4", borderRadius: 12, overflow: "hidden",
      border: "1px solid rgba(99,255,200,0.1)",
    }}>
      <div style={{ position: "absolute", inset: 0 }}>
        {photo ? (
          <img
            src={photo}
            alt="Foto Profil"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center", display: "block"
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(155deg, #0d2018 0%, #071510 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 28, opacity: 0.4 }}>📷</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3, color: 'rgba(255,255,255,0.75)' }}>
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7M12 12C13.3261 12 14.5979 11.4732 15.5355 10.5355C16.4732 9.59785 17 8.32608 17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 21V19C20 17.9391 19.5259 16.9217 18.6569 16.1716C17.7878 15.4214 16.6087 15 15.375 15H8.625C7.39131 15 6.21217 15.4214 5.34315 16.1716C4.47412 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: "rgba(255,255,255,0.18)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              Foto Profil
            </span>
          </div>
        )}
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(to top, rgba(10,13,20,0.65) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: 10, right: 10, width: 22, height: 22,
        borderTop: "2px solid rgba(99,255,200,0.3)",
        borderRight: "2px solid rgba(99,255,200,0.3)",
        borderRadius: "0 4px 0 0", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 10, left: 10, width: 22, height: 22,
        borderBottom: "2px solid rgba(99,255,200,0.3)",
        borderLeft: "2px solid rgba(99,255,200,0.3)",
        borderRadius: "0 0 0 4px", pointerEvents: "none",
      }} />
    </div>
  );
}

function AboutPage() {
  const [ref, inView] = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  return (
    <div ref={ref} style={{ padding: "80px 5% 60px" }}>

      <div className="about-grid">

        <div>
          <div style={{
            marginBottom: 32,
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.08s",
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: "clamp(20px, 2.8vw, 36px)",
              color: "#63ffc8", marginBottom: 4, lineHeight: 1.2,
            }}>
              Hello, i'm
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 42px)", lineHeight: 1.15,
              margin: "0 0 4px", color: "#fff",
            }}>
              {DATA.name}
            </h1>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 600,
              fontSize: "clamp(16px, 2.2vw, 30px)",
              color: "rgba(255,255,255,0.28)", margin: 0,
            }}>
              and i'm a <span style={{ color: "rgba(255,255,255,0.5)" }}>{DATA.role}</span>
            </h2>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85,
            color: "rgba(255,255,255,0.6)", margin: "0 0 40px",
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(14px)",
            transition: "all 0.6s ease 0.22s",
          }}>
            {DATA.about}{" "}
            <a href={DATA.cvUrl} target="_blank" rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "underline" }}>
              Lihat CV
            </a>.
          </p>

          <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.6s ease 0.32s" }}>
            {DATA.skillGroups.map((group, gi) => (
              <div key={group.label} style={{ marginBottom: gi < DATA.skillGroups.length - 1 ? 24 : 0 }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.22)", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: 10,
                }}>
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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

        <div className="about-photo" style={{
          opacity: show ? 1 : 0, transform: show ? "none" : "translateX(20px)",
          transition: "all 0.7s ease 0.3s",
        }}>
          <ProfilePhoto />
          {!DATA.photos && (
            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: "rgba(255,255,255,0.15)", textAlign: "center",
              marginTop: 10, lineHeight: 1.7, letterSpacing: "0.04em",
            }}>
              Tambahkan DATA.photos<br />untuk foto asli
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

function PortfolioPage({ onSelect }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} style={{ padding: "80px 5% 60px", maxWidth: 900, margin: "0 auto" }}>
      <SectionLabel>Portfolio</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {DATA.projects.map((p, i) => (
          <button key={p.title} onClick={() => onSelect(p)} style={{
            display: "block", textDecoration: "none",
            width: "100%", textAlign: "left", font: "inherit", cursor: "pointer",
            padding: "28px 32px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            transition: "all 0.25s ease",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transitionDelay: `${i * 0.1}s`,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(99,255,200,0.3)";
              e.currentTarget.style.background = "rgba(99,255,200,0.04)";
              e.currentTarget.style.transform = "translateX(6px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", margin: 0 }}>{p.title}</h3>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{p.year}</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: "0 0 16px" }}>
              {p.desc}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
                  color: "#63ffc8", padding: "3px 10px", borderRadius: 3,
                  background: "rgba(99,255,200,0.08)",
                }}>
                  {t}
                </span>
              ))}
              <span style={{
                marginLeft: "auto",
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(99,255,200,0.75)",
              }}>
                Lihat detail →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ project, onBack }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Falls back gracefully when a project has no `detail` block yet.
  const d = project.detail || {};
  const stack = d.stack || project.tags.map(t => ({ name: t, use: null }));

  return (
    <div style={{
      padding: "80px 5% 60px", maxWidth: 900, margin: "0 auto",
      minHeight: "calc(100vh - 60px)",
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(16px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
    }}>
      <button
        onClick={onBack}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          color: "rgba(255,255,255,0.4)", marginBottom: 36,
          transition: "color 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#63ffc8"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
      >
        ← Kembali ke portfolio
      </button>

      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px, 4.5vw, 46px)", color: "#fff",
          margin: 0, lineHeight: 1.1,
        }}>
          {project.title}
        </h1>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          {project.year}
        </span>
      </div>

      {d.role && (
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          letterSpacing: "0.08em", color: "#63ffc8", margin: "0 0 28px",
        }}>
          {d.role}
        </p>
      )}

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.85,
        color: "rgba(255,255,255,0.62)", margin: "0 0 44px", maxWidth: 680,
      }}>
        {d.overview || project.desc}
      </p>

      <h2 style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 18px",
      }}>
        Tools &amp; Teknologi
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 44 }}>
        {stack.map(s => (
          <div key={s.name} style={{
            padding: "16px 20px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: "#63ffc8", letterSpacing: "0.06em",
            }}>
              {s.name}
            </span>
            {s.use && (
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)", margin: "6px 0 0",
              }}>
                {s.use}
              </p>
            )}
          </div>
        ))}
      </div>

      {d.highlights && d.highlights.length > 0 && (
        <>
          <h2 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 18px",
          }}>
            Yang Dikerjakan
          </h2>
          <ul style={{ margin: "0 0 48px", padding: 0, listStyle: "none", maxWidth: 680 }}>
            {d.highlights.map(h => (
              <li key={h} style={{
                display: "flex", gap: 12, marginBottom: 12,
                fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
              }}>
                <span style={{ color: "#63ffc8", flexShrink: 0 }}>—</span>
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
        style={{
          display: "inline-block", textDecoration: "none",
          padding: "14px 30px", borderRadius: 8,
          fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15,
          color: "#0a0d14", background: "#63ffc8",
          transition: "box-shadow 0.25s, transform 0.25s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 0 24px rgba(99,255,200,0.4)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        {d.linkLabel || "Buka project"} ↗
      </a>
    </div>
  );
}

function ContactPage() {
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} style={{ padding: "80px 5% 60px", maxWidth: 900, margin: "0 auto" }}>
      <SectionLabel>Contact</SectionLabel>
      <div style={{
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px, 4.5vw, 52px)", color: "#fff",
          margin: "0 0 20px", lineHeight: 1.1,
        }}>
          Let's build something<br />
          <span style={{ color: "#63ffc8" }}>together.</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 16,
          color: "rgba(255,255,255,0.45)", marginBottom: 40, maxWidth: 480,
        }}>
          Saya terbuka untuk peluang baru, kolaborasi, atau sekadar diskusi. Feel free to reach out!
        </p>
        <a href={`mailto:${DATA.email}`} style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "14px 32px", background: "#63ffc8",
          color: "#080a0e", borderRadius: 4, textDecoration: "none",
          fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
          letterSpacing: "0.04em", transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ✉ {DATA.email}
        </a>

        <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
          {Object.entries(DATA.links).map(([key, href]) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: "rgba(255,255,255,0.3)", textDecoration: "none",
              letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#63ffc8"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              {key} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        color: "#63ffc8", letterSpacing: "0.28em", textTransform: "uppercase",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(99,255,200,0.12)" }} />
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "20px 5%",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      display: "flex", justifyContent: "space-between",
      fontFamily: "'Space Mono', monospace", fontSize: 11,
      color: "rgba(255,255,255,0.18)",
    }}>
      <span>© {new Date().getFullYear()} {DATA.name}</span>
      <span>Built with React + Vite</span>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [selected, setSelected] = useState(null); // null = main scroll page

  // Scroll-spy: highlight the nav item for whichever section is centered in the
  // viewport. Skipped in detail view, where the sections aren't mounted.
  useEffect(() => {
    if (selected) return;
    const ids = ["about", "portfolio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Thin band across the vertical middle of the screen; whichever section
      // crosses it becomes "active".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [selected]);

  const openProject = (project) => {
    setSelected(project);
    setActive("portfolio");
    window.scrollTo({ top: 0 });
  };

  // Return to the main page and land back on the portfolio section.
  const closeProject = () => {
    setSelected(null);
    requestAnimationFrame(() => {
      document.getElementById("portfolio")?.scrollIntoView({ block: "start" });
    });
  };

  // Nav clicks work from either view: leave the detail page first if needed.
  const goToSection = (id) => {
    setActive(id);
    if (selected) {
      setSelected(null);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // scrollMarginTop offsets the fixed 60px navbar when scrolling to a section.
  const sectionStyle = { scrollMarginTop: 60 };

  return (
    <div style={{
      background: "#0a0d14", minHeight: "100vh",
      width: "100%", color: "#fff",
      overflowX: "hidden", position: "relative",
    }}>
      <GlowCursor />
      <NavBar active={active} onNavigate={goToSection} />

      <main style={{ paddingTop: 60 }}>
        {selected ? (
          <ProjectDetailPage project={selected} onBack={closeProject} />
        ) : (
          <>
            <section id="about" style={sectionStyle}><AboutPage /></section>
            <section id="portfolio" style={sectionStyle}><PortfolioPage onSelect={openProject} /></section>
            <section id="contact" style={sectionStyle}><ContactPage /></section>
          </>
        )}
        <Footer />
      </main>
    </div>
  );
}