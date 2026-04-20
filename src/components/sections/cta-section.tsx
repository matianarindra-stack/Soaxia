//src/components/sections/cta-section.tsx
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CtaSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /*async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    const { error: sbError } = await supabase
      .from("contact_requests")
      .insert([
        {
          nom: data.get("nom") as string,
          email: data.get("email") as string,
          telephone: data.get("telephone") as string,
          service: data.get("service") as string,
          budget: data.get("budget") as string,
          description: data.get("description") as string,
        },
     ]) */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    const payload = {
      nom: data.get("nom") as string,
      email: data.get("email") as string,
      telephone: data.get("telephone") as string,
      service: data.get("service") as string,
      budget: data.get("budget") as string,
      description: data.get("description") as string,
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (!res.ok) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      return
    }

    setSent(true)
    form.reset()
    setTimeout(() => setSent(false), 4000)
  }


  /*setLoading(false)

  if (sbError) {
    setError("Une erreur est survenue. Veuillez réessayer.")
    console.error("Supabase error:", sbError)
    return
  }

  setSent(true)
  form.reset()
  setTimeout(() => setSent(false), 4000)
}*/

  const contactItems = [
    { icon: "📧", label: "Email", value: "contact@soaxia.com" },
    { icon: "📞", label: "Téléphone/WhatsApp", value: "+261 32 69 182 32" },
    { icon: "📍", label: "Localisation", value: "Antananarivo, Madagascar" },
    { icon: "🕐", label: "Horaires", value: "Lun – Ven, 8h00 – 18h00" },
  ]

  return (
    <section id="contact" style={{ padding: "5.5rem 5%", background: "var(--bg)", borderTop: "0.5px solid var(--card-border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Parlons de votre projet</span>
        <h2 className="section-title">Demandez votre <em>devis gratuit</em></h2>
        <p className="section-sub" style={{ marginBottom: "2.5rem" }}>
          Décrivez votre projet et nous revenons vers vous sous 48h avec une proposition personnalisée.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Contact info — inchangé */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {contactItems.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: "var(--accent-dim)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  {c.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)", marginBottom: 2 }}>{c.label}</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text)" }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }} className="form-row">
              <FormField label="Prénom & Nom *">
                <input name="nom" type="text" placeholder="Jean Dupont" required style={inputStyle} />
              </FormField>
              <FormField label="Email *">
                <input name="email" type="email" placeholder="vous@email.com" required style={inputStyle} />
              </FormField>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }} className="form-row">
              <FormField label="Téléphone">
                <input name="telephone" type="tel" placeholder="+261 XX XX XXX XX" style={inputStyle} />
              </FormField>
              <FormField label="Service souhaité *">
                <select name="service" required style={inputStyle}>
                  <option value="" disabled>Choisir un service</option>
                  {[
                    "Développement d'application",
                    "Rédaction cahier des charges",
                    "Conseil technique",
                    "Audit de sécurité",
                    "Déploiement Cloud",
                    "Formation",
                    "Support & Maintenance",
                    "Autre",
                  ].map((o) => <option key={o}>{o}</option>)}
                </select>
              </FormField>
            </div>

            <FormField label="Budget estimé">
              <select name="budget" style={inputStyle}>
                <option value="" disabled>Votre budget approximatif</option>
                {[
                  "Moins de 500 000 MGA",
                  "500 000 – 2 000 000 MGA",
                  "2 000 000 – 10 000 000 MGA",
                  "Plus de 10 000 000 MGA",
                  "À définir ensemble",
                ].map((o) => <option key={o}>{o}</option>)}
              </select>
            </FormField>

            <FormField label="Décrivez votre projet *">
              <textarea
                name="description"
                placeholder="Présentez votre projet, vos objectifs, vos contraintes techniques ou toute information utile…"
                required
                style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              />
            </FormField>

            {/* Message d'erreur */}
            {error && (
              <p style={{ fontSize: "0.83rem", color: "#E24B4A", padding: "0.6rem 0.9rem", background: "rgba(226,75,74,0.08)", borderRadius: 8, border: "0.5px solid rgba(226,75,74,0.2)" }}>
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ fontSize: "0.95rem", padding: "0.85rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Envoi en cours…" : sent ? "✓ Message envoyé ! Nous revenons sous 48h." : "Envoyer ma demande →"}
            </button>

          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)" }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-soft)",
  border: "0.5px solid var(--card-border)",
  borderRadius: 8,
  color: "var(--text)",
  fontFamily: "var(--fb)",
  fontSize: "0.875rem",
  padding: "0.7rem 1rem",
  outline: "none",
  width: "100%",
  appearance: "none",
}
