"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError("Email ou mot de passe incorrect.")
      setLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "var(--bg-soft)", padding: "2rem",
    }}>
      <div style={{
        background: "var(--card)", border: "0.5px solid var(--card-border)",
        borderRadius: 16, padding: "2.5rem", width: "100%", maxWidth: 400,
        boxShadow: "0 4px 24px rgba(13,27,42,0.06)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg viewBox="0 0 200 56" height={40} xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="34" height="34" rx="8" fill="#00C9A7" fillOpacity="0.12"/>
            <line x1="22" y1="8" x2="16" y2="38" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="30" y1="8" x2="24" y2="38" stroke="#00C9A7" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <text x="48" y="29" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="24" fill="#0D1B2A">SOA</text>
            <text x="107" y="29" fontFamily="Sora,sans-serif" fontWeight="200" fontSize="24" fill="#00C9A7">xia</text>
            <line x1="48" y1="36" x2="148" y2="36" stroke="#00C9A7" strokeWidth="0.8" opacity="0.3"/>
            <text x="48" y="48" fontFamily="DM Sans,sans-serif" fontWeight="300" fontSize="9" fill="#8899A8" letterSpacing="2">CONSULTING IT</text>
          </svg>
        </div>

        <h1 style={{ fontFamily: "var(--fh)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", textAlign: "center", marginBottom: "0.4rem" }}>
          Administration
        </h1>
        <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", textAlign: "center", marginBottom: "2rem" }}>
          Connectez-vous pour accéder aux demandes
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)" }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@soaxia.com" required
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-muted)" }}>Mot de passe</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.83rem", color: "#E24B4A", padding: "0.6rem 0.9rem", background: "rgba(226,75,74,0.08)", borderRadius: 8, border: "0.5px solid rgba(226,75,74,0.2)" }}>
              ⚠ {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            background: "var(--accent)", color: "#fff", border: "none",
            padding: "0.85rem", borderRadius: 8, fontFamily: "var(--fb)",
            fontWeight: 500, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, marginTop: "0.5rem", transition: "opacity 0.2s",
          }}>
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-soft)",
  border: "0.5px solid var(--card-border)",
  borderRadius: 8, color: "var(--text)",
  fontFamily: "var(--fb)", fontSize: "0.875rem",
  padding: "0.7rem 1rem", outline: "none", width: "100%",
}
