"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

type Demande = {
  id: string
  created_at: string
  nom: string
  email: string
  telephone: string
  service: string
  budget: string
  description: string
  statut: string
}

const SERVICES = ["Tous", "Développement d'application", "Rédaction cahier des charges", "Conseil technique", "Audit de sécurité", "Déploiement Cloud", "Formation", "Support & Maintenance", "Autre"]
const STATUTS = ["Tous", "nouveau", "en cours", "traité"]

const statutColor: Record<string, { bg: string; color: string }> = {
  "nouveau": { bg: "rgba(0,201,167,0.1)", color: "#0F6E56" },
  "en cours": { bg: "rgba(55,138,221,0.1)", color: "#185FA5" },
  "traité": { bg: "rgba(13,27,42,0.07)", color: "#4A6070" },
}

export default function AdminPage() {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()

  const [demandes, setDemandes] = useState<Demande[]>([])
  const [loading, setLoading] = useState(true)
  const [filterService, setFilterService] = useState("Tous")
  const [filterStatut, setFilterStatut] = useState("Tous")
  const [selected, setSelected] = useState<Demande | null>(null)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    fetchDemandes()
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ""))
  }, [])

  async function fetchDemandes() {
    setLoading(true)
    const { data } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false })
    setDemandes((data as Demande[]) ?? [])
    setLoading(false)
  }

  async function updateStatut(id: string, statut: string) {
    await supabase.from("contact_requests").update({ statut }).eq("id", id)
    setDemandes(prev => prev.map(d => d.id === id ? { ...d, statut } : d))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, statut } : null)
  }

  async function deleteDemande(id: string) {
    if (!confirm("Supprimer cette demande ?")) return
    await supabase.from("contact_requests").delete().eq("id", id)
    setDemandes(prev => prev.filter(d => d.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function exportCSV() {
    const headers = ["Date", "Nom", "Email", "Téléphone", "Service", "Budget", "Statut", "Description"]
    const rows = filtered.map(d => [
      new Date(d.created_at).toLocaleDateString("fr-FR"),
      d.nom, d.email, d.telephone ?? "", d.service, d.budget ?? "", d.statut ?? "nouveau",
      `"${(d.description ?? "").replace(/"/g, '""')}"`,
    ])
    const csv = [headers, ...rows].map(r => r.join(";")).join("\n")
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = "demandes_soaxia.csv"; a.click()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const filtered = demandes.filter(d => {
    const okService = filterService === "Tous" || d.service === filterService
    const okStatut = filterStatut === "Tous" || (d.statut ?? "nouveau") === filterStatut
    return okService && okStatut
  })

  const stats = {
    total: demandes.length,
    nouveau: demandes.filter(d => !d.statut || d.statut === "nouveau").length,
    enCours: demandes.filter(d => d.statut === "en cours").length,
    traite: demandes.filter(d => d.statut === "traité").length,
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-soft)", fontFamily: "var(--fb)" }}>

      {/* Topbar */}
      <div style={{ background: "var(--card)", borderBottom: "0.5px solid var(--card-border)", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg viewBox="0 0 200 56" height={32} xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="34" height="34" rx="8" fill="#00C9A7" fillOpacity="0.12" />
            <line x1="22" y1="8" x2="16" y2="38" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="8" x2="24" y2="38" stroke="#00C9A7" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <text x="48" y="29" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="24" fill="#0D1B2A">SOA</text>
            <text x="107" y="29" fontFamily="Sora,sans-serif" fontWeight="200" fontSize="24" fill="#00C9A7">xia</text>
          </svg>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", borderLeft: "0.5px solid var(--card-border)", paddingLeft: 12 }}>Administration</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{userEmail}</span>
          <button onClick={handleLogout} style={{ background: "none", border: "0.5px solid var(--card-border)", borderRadius: 7, padding: "0.4rem 1rem", fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer" }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: stats.total, color: "var(--text)" },
            { label: "Nouveaux", value: stats.nouveau, color: "#0F6E56" },
            { label: "En cours", value: stats.enCours, color: "#185FA5" },
            { label: "Traités", value: stats.traite, color: "var(--text-muted)" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--card)", border: "0.5px solid var(--card-border)", borderRadius: 12, padding: "1.25rem 1.5rem", boxShadow: "0 1px 4px rgba(13,27,42,0.04)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--fh)", fontSize: "2rem", fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filtres + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <select value={filterService} onChange={e => setFilterService(e.target.value)} style={selectStyle}>
            {SERVICES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} style={selectStyle}>
            {STATUTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: "auto" }}>
            {filtered.length} demande{filtered.length > 1 ? "s" : ""}
          </span>
          <button onClick={exportCSV} style={{ background: "none", border: "0.5px solid var(--card-border)", borderRadius: 7, padding: "0.5rem 1rem", fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            ↓ Exporter CSV
          </button>
        </div>

        {/* Tableau + détail */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "1rem" }}>

          {/* Tableau */}
          <div style={{ background: "var(--card)", border: "0.5px solid var(--card-border)", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(13,27,42,0.04)" }}>
            {loading ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>Chargement…</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>Aucune demande trouvée.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid var(--card-border)", background: "var(--bg-soft)" }}>
                    {["Date", "Nom", "Email", "Service", "Budget", "Statut", "Actions"].map(h => (
                      <th key={h} style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d, i) => {
                    const st = d.statut ?? "nouveau"
                    const sc = statutColor[st] ?? statutColor["nouveau"]
                    return (
                      <tr key={d.id}
                        onClick={() => setSelected(selected?.id === d.id ? null : d)}
                        style={{ borderBottom: "0.5px solid var(--card-border)", background: selected?.id === d.id ? "rgba(0,201,167,0.04)" : i % 2 === 0 ? "var(--card)" : "var(--bg-soft)", cursor: "pointer", transition: "background 0.15s" }}
                        onMouseOver={e => { if (selected?.id !== d.id) (e.currentTarget as HTMLTableRowElement).style.background = "rgba(0,201,167,0.03)" }}
                        onMouseOut={e => { if (selected?.id !== d.id) (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "var(--card)" : "var(--bg-soft)" }}>
                        <td style={tdStyle}>{new Date(d.created_at).toLocaleDateString("fr-FR")}</td>
                        <td style={{ ...tdStyle, fontWeight: 500, color: "var(--text)" }}>{d.nom}</td>
                        <td style={tdStyle}>{d.email}</td>
                        <td style={tdStyle}>{d.service}</td>
                        <td style={tdStyle}>{d.budget ?? "—"}</td>
                        <td style={tdStyle}>
                          <select
                            value={st}
                            onClick={e => e.stopPropagation()}
                            onChange={e => { e.stopPropagation(); updateStatut(d.id, e.target.value) }}
                            style={{ ...selectStyle, background: sc.bg, color: sc.color, border: "none", fontWeight: 500, fontSize: "0.75rem", padding: "3px 8px" }}>
                            <option value="nouveau">nouveau</option>
                            <option value="en cours">en cours</option>
                            <option value="traité">traité</option>
                          </select>
                        </td>
                        <td style={tdStyle}>
                          <button onClick={e => { e.stopPropagation(); deleteDemande(d.id) }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#E24B4A", fontSize: "1rem", padding: "0 4px" }}
                            title="Supprimer">✕</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Panneau détail */}
          {selected && (
            <div style={{ background: "var(--card)", border: "0.5px solid var(--card-border)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 1px 4px rgba(13,27,42,0.04)", alignSelf: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontFamily: "var(--fh)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Détail</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "1.1rem" }}>✕</button>
              </div>

              {[
                { label: "Nom", value: selected.nom },
                { label: "Email", value: selected.email },
                { label: "Téléphone", value: selected.telephone ?? "—" },
                { label: "Service", value: selected.service },
                { label: "Budget", value: selected.budget ?? "—" },
                { label: "Date", value: new Date(selected.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) },
              ].map(item => (
                <div key={item.label} style={{ borderBottom: "0.5px solid var(--card-border)", paddingBottom: "0.75rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text)" }}>{item.value}</div>
                </div>
              ))}

              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Description</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65, background: "var(--bg-soft)", borderRadius: 8, padding: "0.75rem" }}>{selected.description}</p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                <a href={`mailto:${selected.email}`} style={{ flex: 1, background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem", textAlign: "center", fontSize: "0.83rem", fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>
                  Répondre par email
                </a>
                <button onClick={() => deleteDemande(selected.id)} style={{ background: "none", border: "0.5px solid rgba(226,75,74,0.3)", color: "#E24B4A", borderRadius: 8, padding: "0.65rem 0.9rem", fontSize: "0.83rem", cursor: "pointer" }}>
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const tdStyle: React.CSSProperties = {
  padding: "0.85rem 1rem", color: "var(--text-muted)", verticalAlign: "middle",
}

const selectStyle: React.CSSProperties = {
  background: "var(--bg-soft)", border: "0.5px solid var(--card-border)",
  borderRadius: 7, color: "var(--text)", fontFamily: "var(--fb)",
  fontSize: "0.83rem", padding: "0.5rem 0.75rem", outline: "none", cursor: "pointer",
}
