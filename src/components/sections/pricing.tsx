"use client"

const plans = [
  {
    name: "Starter", price: "Sur devis", unit: "/ projet", featured: false,
    desc: "Idéal pour les porteurs de projets et les petites structures avec un besoin ponctuel.",
    features: ["Cahier des charges", "Conseil & recommandations", "Développement d'une fonctionnalité", "1 mois de support inclus", "Documentation livrée"],
    cta: "Demander un devis",
  },
  {
    name: "Professionnel", price: "Sur devis", unit: "/ projet", featured: true,
    desc: "Pour les entreprises qui souhaitent un accompagnement complet de A à Z.",
    features: ["Tout le plan Starter", "Développement complet de l'application", "Architecture & base de données", "Intégration API tierce", "Formation équipe incluse", "3 mois de support inclus"],
    cta: "Démarrer maintenant",
  },
  {
    name: "Entreprise", price: "Sur mesure", unit: "", featured: false,
    desc: "Pour les projets complexes nécessitant une expertise approfondie et un suivi long terme.",
    features: ["Tout le plan Professionnel", "Audit de sécurité complet", "Déploiement Cloud inclus", "Support prioritaire 24/7", "Accompagnement illimité"],
    cta: "Nous contacter",
  },
]

export function Pricing() {
  return (
    <section id="tarifs" style={{ padding: "5.5rem 5%", background: "var(--bg-soft)", borderTop: "0.5px solid var(--card-border)", borderBottom: "0.5px solid var(--card-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Nos offres</span>
        <h2 className="section-title">Des tarifs <em>transparents</em></h2>
        <p className="section-sub">Choisissez la formule adaptée à vos besoins.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px,1fr))", gap: "1rem", marginTop: "2.5rem" }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: plan.featured ? "var(--card)" : "var(--card)",
              border: plan.featured ? "1.5px solid var(--accent)" : "0.5px solid var(--card-border)",
              borderRadius: 16, padding: "2rem",
              display: "flex", flexDirection: "column", gap: "1.25rem",
              position: "relative",
              boxShadow: plan.featured ? "0 8px 32px rgba(0,201,167,0.1)" : "0 1px 4px rgba(13,27,42,0.04)",
              transition: "transform 0.2s",
            }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>

              {plan.featured && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: "var(--accent)", color: "#fff",
                  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "4px 14px", borderRadius: 20,
                }}>Le plus choisi</div>
              )}

              <div style={{ fontFamily: "var(--fh)", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{plan.name}</div>
              <div style={{ fontFamily: "var(--fh)", fontSize: "2.2rem", fontWeight: 700, color: "var(--text)" }}>
                {plan.price} <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-muted)" }}>{plan.unit}</span>
              </div>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", borderTop: "0.5px solid var(--card-border)", paddingTop: "1rem" }}>{plan.desc}</p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.7rem", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact" style={{
                marginTop: "auto", padding: "0.75rem", borderRadius: 8, textAlign: "center",
                fontFamily: "var(--fb)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
                textDecoration: "none", display: "block",
                background: plan.featured ? "var(--accent)" : "transparent",
                border: plan.featured ? "1.5px solid var(--accent)" : "1px solid var(--card-border)",
                color: plan.featured ? "#fff" : "var(--text)",
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
              }}
                onMouseOver={e => { if (!plan.featured) { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)" } }}
                onMouseOut={e => { if (!plan.featured) { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--card-border)"; el.style.color = "var(--text)" } }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
