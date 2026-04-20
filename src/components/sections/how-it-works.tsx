"use client"

const steps = [
  { num: "1", title: "Prise de contact & écoute", desc: "Nous analysons vos besoins lors d'un appel découverte gratuit pour comprendre votre contexte, vos contraintes et vos objectifs." },
  { num: "2", title: "Proposition & devis détaillé", desc: "Nous vous soumettons une proposition technique claire avec les délais, le budget estimé et les livrables attendus." },
  { num: "3", title: "Rédaction du cahier des charges", desc: "Formalisation complète des spécifications fonctionnelles et techniques, validée ensemble avant tout développement." },
  { num: "4", title: "Développement & validation", desc: "Développement itératif avec des points réguliers et des démonstrations pour valider chaque étape en temps réel." },
  { num: "5", title: "Livraison, formation & support", desc: "Déploiement, formation de vos équipes et accompagnement post-livraison pour garantir une prise en main optimale." },
]

const promises = [
  "Réponse sous 48h à toute demande",
  "Tarifs transparents, sans frais cachés",
  "Code source livré et documenté",
  "Suivi hebdomadaire de l'avancement",
  "Garantie satisfaction 30 jours",
]

export function HowItWorks() {
  return (
    <section id="processus" style={{ padding: "5.5rem 5%", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Comment ça marche</span>
        <h2 className="section-title">Notre <em>processus</em></h2>
        <p className="section-sub">Une méthode éprouvée pour transformer vos idées en solutions opérationnelles.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "2.5rem", alignItems: "start" }}
          className="hiw-grid">

          {/* Steps */}
          <div>
            {steps.map((s, i) => (
              <div key={s.num} style={{
                display: "flex", gap: "1.25rem", alignItems: "flex-start",
                padding: "1.25rem 0",
                borderBottom: i < steps.length - 1 ? "0.5px solid var(--card-border)" : "none",
              }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fh)", fontWeight: 700, fontSize: "0.8rem" }}>
                  {s.num}
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--fh)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-mid)", borderRadius: 14, padding: "1.75rem" }}>
              <h4 style={{ fontFamily: "var(--fh)", fontSize: "0.95rem", fontWeight: 600, color: "var(--accent)", marginBottom: "0.5rem" }}>
                Appel découverte gratuit
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                Avant tout engagement, nous vous proposons un échange de 30 minutes pour évaluer votre projet, répondre à vos questions et vous orienter vers la meilleure approche — sans frais, sans obligation.
              </p>
              <a href="#contact" className="btn-primary" style={{ marginTop: "1rem", display: "block", textAlign: "center", fontSize: "0.875rem" }}>
                Réserver mon appel →
              </a>
            </div>

            <div style={{ background: "var(--card)", border: "0.5px solid var(--card-border)", borderRadius: 14, padding: "1.5rem", boxShadow: "0 1px 4px rgba(13,27,42,0.04)" }}>
              <h4 style={{ fontFamily: "var(--fh)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem" }}>
                Nos engagements
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {promises.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hiw-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </section>
  )
}
