"use client"

import { useState } from "react"

const faqs = [
  { q: "Comment se déroule la première prise de contact ?",     a: "Remplissez le formulaire de contact ou envoyez-nous un email. Nous vous recontactons sous 48h pour fixer un appel découverte gratuit de 30 minutes afin de comprendre votre projet et vos besoins." },
  { q: "Pouvez-vous reprendre un projet existant ?",            a: "Oui, absolument. Nous réalisons d'abord un audit technique de l'existant pour évaluer l'état du code, de l'architecture et des données, puis nous proposons un plan de reprise ou d'amélioration adapté." },
  { q: "Quelles technologies utilisez-vous ?",                  a: "Nous travaillons avec les technologies les plus adaptées à chaque projet : React, Vue.js, Node.js, Laravel, Python, Flutter pour le mobile, PostgreSQL, MongoDB pour les bases de données, et AWS / GCP pour le cloud." },
  { q: "Le cahier des charges est-il obligatoire ?",            a: "Nous le recommandons vivement. Il permet d'aligner les attentes, de réduire les risques d'incompréhension et de cadrer précisément le budget et les délais. Nous pouvons vous aider à le rédiger si vous n'en avez pas encore." },
  { q: "Travaillez-vous avec des clients hors de Madagascar ?", a: "Oui, nous travaillons avec des clients en France, en Afrique et ailleurs dans le monde. Nos échanges se font par visioconférence, et nous nous adaptons aux fuseaux horaires de nos partenaires." },
  { q: "Que se passe-t-il après la livraison du projet ?",      a: "Selon le plan choisi, vous bénéficiez de 1 à 3 mois de support inclus. Nous proposons également des contrats de maintenance et d'évolution pour accompagner votre croissance sur le long terme." },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: "5.5rem 5%", background: "var(--bg-soft)", borderTop: "0.5px solid var(--card-border)", borderBottom: "0.5px solid var(--card-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Questions fréquentes</span>
        <h2 className="section-title">Vous avez des <em>questions ?</em></h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2.5rem", maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "var(--card)", border: "0.5px solid var(--card-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(13,27,42,0.04)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", textAlign: "left", padding: "1.1rem 1.4rem",
                background: "none", border: "none", color: open === i ? "var(--accent)" : "var(--text)",
                fontFamily: "var(--fb)", fontSize: "0.9rem", fontWeight: 500,
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
                transition: "color 0.2s",
              }}>
                {faq.q}
                <span style={{ color: "var(--accent)", fontSize: "1.1rem", transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
              </button>

              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: "hidden",
                transition: "max-height 0.35s ease",
              }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, padding: "0 1.4rem 1.1rem" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
