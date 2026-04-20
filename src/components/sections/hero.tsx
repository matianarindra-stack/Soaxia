"use client"

const cards = [
  { icon: "💻", title: "Développement sur mesure", desc: "Web, mobile, API — nous codons votre vision" },
  { icon: "📋", title: "Cahier des charges", desc: "Documentation claire pour des projets réussis" },
  { icon: "🧭", title: "Conseil stratégique", desc: "Choix technologiques adaptés à vos besoins" },
  { icon: "🔒", title: "Audit & Sécurité", desc: "Protection et conformité de vos systèmes" },
]

const stats = [
  { value: "120+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "48h", label: "Délai de réponse" },
  { value: "8 ans", label: "D'expérience" },
]

export function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "80px 5% 60px",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background accents */}
      <div style={{
        position: "absolute",
        top: -180,
        right: -180,
        width: 560,
        height: 560,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: -120,
        left: -120,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,201,167,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
      }}
        className="hero-grid">

        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-mid)",
            color: "var(--accent)",
            fontSize: "0.72rem",
            fontWeight: 500,
            padding: "5px 13px",
            borderRadius: 20,
            marginBottom: "1.5rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            <span style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }} />
            Expertise IT à votre service
          </div>

          <h1 style={{
            fontFamily: "var(--fh)",
            fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            color: "var(--text)",
          }}>
            Vos projets tech,<br />
            notre <em style={{ fontStyle: "normal", color: "var(--accent)" }}>expertise</em>
          </h1>

          <p style={{
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            marginBottom: "2.25rem",
            maxWidth: 460,
          }}>
            SOAxia accompagne entreprises et porteurs de projets dans le développement d'applications, la rédaction de cahiers des charges et le conseil stratégique en informatique.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">Démarrer un projet</a>
            <a href="#services" className="btn-ghost">Découvrir nos services →</a>
          </div>
        </div>

        {/* Right — preview cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} className="hero-cards">
          {cards.map((c) => (
            <div key={c.title} style={{
              background: "var(--card)",
              border: "0.5px solid var(--card-border)",
              borderRadius: 14,
              padding: "1.1rem 1.4rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              transition: "border-color 0.25s, transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 1px 4px rgba(13,27,42,0.04)",
            }}
              onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--accent-mid)"; el.style.transform = "translateX(6px)"; el.style.boxShadow = "0 4px 16px rgba(0,201,167,0.08)" }}
              onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--card-border)"; el.style.transform = "none"; el.style.boxShadow = "0 1px 4px rgba(13,27,42,0.04)" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                flexShrink: 0,
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-mid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}>
                {c.icon}
              </div>
              <div>
                <h4 style={{ fontFamily: "var(--fh)", fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>{c.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--bg-soft)",
        borderTop: "0.5px solid var(--card-border)",
        padding: "1.5rem 5%",
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1rem",
          textAlign: "center",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "var(--fh)",
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "var(--accent)",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                marginTop: 3,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .hero-cards { display: none !important; }
  }
  @media (max-width: 600px) {
    .hero-grid > div:first-child > div:last-child { flex-direction: column; }
  }
`}</style>
    </section>
  )
}