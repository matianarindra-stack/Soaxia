"use client"

const reasons = [
  { title: "Réponse sous 48h", desc: "Chaque demande est traitée rapidement, sans délais inutiles ni intermédiaires." },
  { title: "Équipe certifiée", desc: "Nos experts sont certifiés sur les principales technologies cloud et logicielles." },
  { title: "Tarifs transparents", desc: "Pas de frais cachés — des devis détaillés et clairs avant tout engagement." },
  { title: "Code source livré", desc: "Vous repartez avec le code source complet, documenté et bien structuré." },
  { title: "Suivi hebdomadaire", desc: "Points réguliers et accès à un tableau de bord pour suivre l'avancement." },
  { title: "Garantie 30 jours", desc: "Satisfaction garantie : nous corrigeons tout problème pendant 30 jours après livraison." },
]

export function WhyChooseUs() {
  return (
    <section id="pourquoi" style={{ padding: "5.5rem 5%", background: "var(--bg-soft)", borderTop: "0.5px solid var(--card-border)", borderBottom: "0.5px solid var(--card-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Pourquoi nous choisir</span>
        <h2 className="section-title">Une approche <em>concrète</em></h2>
        <p className="section-sub">Nous croyons que la technologie doit simplifier, pas complexifier.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1rem", marginTop: "2.5rem" }}>
          {reasons.map((r) => (
            <div key={r.title} style={{
              background: "var(--card)", border: "0.5px solid var(--card-border)",
              borderRadius: 12, padding: "1.25rem 1.5rem",
              display: "flex", alignItems: "flex-start", gap: "1rem",
              boxShadow: "0 1px 4px rgba(13,27,42,0.04)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--accent-mid)"; el.style.transform = "translateY(-2px)" }}
              onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--card-border)"; el.style.transform = "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "var(--accent-dim)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem" }}>
                ✓
              </div>
              <div>
                <h4 style={{ fontFamily: "var(--fh)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{r.title}</h4>
                <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
