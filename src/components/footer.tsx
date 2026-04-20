"use client"

export function Footer() {
  const services = [
    "Développement d'applications",
    "Cahier des charges",
    "Conseil technique",
    "Audit de sécurité",
    "Déploiement Cloud",
  ]
  const company = [
    { label: "Notre processus", href: "#processus" },
    { label: "Témoignages", href: "#avis" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "FAQ", href: "#faq" },
  ]
  const contact = [
    { label: "contact@soaxia.com", href: "mailto:contact@soaxia.com" },
    { label: "Demander un devis", href: "#contact" },
    { label: "WhatsApp", href: "#contact" },
    { label: "Antananarivo, MG", href: "#contact" },
  ]

  return (
    <footer style={{ padding: "3.5rem 5% 2rem", borderTop: "0.5px solid rgba(13,27,42,0.08)", background: "var(--bg-soft)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}
          className="footer-grid">

          {/* Brand */}
          <div>
            <svg viewBox="0 0 200 56" width={140} xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="34" height="34" rx="8" fill="#00C9A7" fillOpacity="0.12" />
              <line x1="22" y1="8" x2="16" y2="38" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="8" x2="24" y2="38" stroke="#00C9A7" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              <text x="48" y="29" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="24" fill="#0D1B2A">SOA</text>
              <text x="107" y="29" fontFamily="Sora,sans-serif" fontWeight="200" fontSize="24" fill="#00C9A7">xia</text>
              <line x1="48" y1="36" x2="148" y2="36" stroke="#00C9A7" strokeWidth="0.8" opacity="0.3" />
              <text x="48" y="48" fontFamily="DM Sans,sans-serif" fontWeight="300" fontSize="9" fill="#8899A8" letterSpacing="2">CONSULTING IT</text>
            </svg>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.9rem", lineHeight: 1.7, maxWidth: 260 }}>
              Votre partenaire de confiance pour tous vos projets informatiques — du conseil à la livraison.
            </p>
          </div>

          {/* Services */}
          <FooterCol title="Services" items={services.map(s => ({ label: s, href: "#services" }))} />
          <FooterCol title="Entreprise" items={company} />
          <FooterCol title="Contact" items={contact} />
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "0.5px solid rgba(13,27,42,0.08)", paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>© 2026 SOAxia. Tous droits réservés.</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Conseil IT · Développement · Madagascar</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 style={{ fontFamily: "var(--fh)", fontSize: "0.8rem", fontWeight: 600, color: "var(--text)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
        {title}
      </h5>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} style={{ fontSize: "0.83rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={e => (e.currentTarget.style.color = "var(--text-muted)")}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
