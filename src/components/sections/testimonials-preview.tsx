"use client"

const testimonials = [
  { initials: "AR", name: "Andry Rakoto", role: "CEO, StartupMada", text: "SOAxia a transformé notre idée en application fonctionnelle en moins de 2 mois. Le cahier des charges rédigé en amont nous a évité beaucoup d'allers-retours. Équipe très professionnelle." },
  { initials: "FM", name: "Fara Miora", role: "DSI, Groupe Horizon", text: "Grâce à leur conseil technique, nous avons évité de choisir une architecture inadaptée. Leur audit nous a permis d'économiser du temps et de l'argent sur le long terme." },
  { initials: "HN", name: "Hery Ndriana", role: "Fondateur, BuildLab", text: "Tarifs transparents, délais respectés et un vrai accompagnement humain. La formation fournie après livraison a permis à notre équipe d'être rapidement autonome." },
]

export function TestimonialsPreview() {
  return (
    <section id="avis" style={{ padding: "5.5rem 5%", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Témoignages</span>
        <h2 className="section-title">Ce que disent <em>nos clients</em></h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1rem", marginTop: "2.5rem" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: "var(--card)", border: "0.5px solid var(--card-border)",
              borderRadius: 14, padding: "1.75rem",
              boxShadow: "0 1px 4px rgba(13,27,42,0.04)",
              transition: "border-color 0.25s",
            }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-mid)"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"}>
              <div style={{ color: "var(--accent)", fontSize: "0.85rem", marginBottom: "0.9rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.25rem" }}>
                « {t.text} »
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "var(--accent-dim)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--fh)" }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
