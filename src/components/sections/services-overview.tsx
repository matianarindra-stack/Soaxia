"use client"

const services = [
  { icon: "💻", title: "Développement d'applications", tag: "Essentiel", desc: "Conception et développement d'applications web et mobiles sur mesure, en utilisant les technologies les plus adaptées à votre contexte et à vos objectifs." },
  { icon: "📋", title: "Rédaction de cahier des charges", tag: "Essentiel", desc: "Formalisation précise de vos besoins fonctionnels et techniques : spécifications, maquettes, flux utilisateurs et critères de réussite clairement définis." },
  { icon: "🧭", title: "Conseil technique & Architecture", tag: "Stratégie", desc: "Audit de l'existant, choix des technologies, conception de l'architecture logicielle et accompagnement dans vos décisions stratégiques IT." },
  { icon: "🗄️", title: "Conception de base de données", tag: "Technique", desc: "Modélisation, optimisation et migration de vos bases de données relationnelles et NoSQL pour des performances maximales et une structure évolutive." },
  { icon: "🔗", title: "Intégration & APIs", tag: "Technique", desc: "Connexion de vos outils métiers, développement d'APIs REST ou GraphQL et automatisation de vos flux de données entre systèmes hétérogènes." },
  { icon: "🛡️", title: "Audit de sécurité", tag: "Sécurité", desc: "Évaluation des vulnérabilités, recommandations de bonnes pratiques et mise en conformité de vos applications et infrastructures informatiques." },
  { icon: "🎓", title: "Formation & Transfert", tag: "Accompagnement", desc: "Formation de vos équipes aux outils, aux technologies et aux bonnes pratiques pour assurer l'autonomie et la montée en compétence de vos collaborateurs." },
  { icon: "🤝", title: "Support & Maintenance", tag: "Suivi", desc: "Assistance technique réactive, correctifs, mises à jour et maintenance évolutive de vos applications pour assurer leur pérennité et disponibilité." },
]

export function ServicesOverview() {
  return (
    <section id="services" style={{ padding: "5.5rem 5%", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Ce que nous faisons</span>
        <h2 className="section-title">Nos <em>services</em></h2>
        <p className="section-sub">Des solutions adaptées à chaque étape de votre projet, de l'idée au déploiement.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          marginTop: "2.5rem",
        }}
          className="services-grid">
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--card)",
                border: "0.5px solid var(--card-border)",
                borderRadius: 14,
                padding: "1.75rem",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 1px 4px rgba(13,27,42,0.04)",
              }}
              onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--accent-mid)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 8px 24px rgba(0,201,167,0.08)" }}
              onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--card-border)"; el.style.transform = "none"; el.style.boxShadow = "0 1px 4px rgba(13,27,42,0.04)" }}
            >
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 11,
                marginBottom: "1.1rem",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-mid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--fh)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: 1.65,
              }}>
                {s.desc}
              </p>
              <span style={{
                display: "inline-block",
                marginTop: "1rem",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-mid)",
                padding: "3px 10px",
                borderRadius: 20,
              }}>
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}