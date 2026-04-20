"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Services",   href: "#services"  },
    { label: "Processus",  href: "#processus" },
    { label: "Tarifs",     href: "#tarifs"    },
    { label: "Avis",       href: "#avis"      },
    { label: "FAQ",        href: "#faq"       },
  ]

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: 64,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(13,27,42,0.08)",
        transition: "background 0.3s",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <svg viewBox="0 0 200 56" height={40} xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="34" height="34" rx="8" fill="#00C9A7" fillOpacity="0.12"/>
            <line x1="22" y1="8" x2="16" y2="38" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="30" y1="8" x2="24" y2="38" stroke="#00C9A7" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <text x="48" y="29" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="24" fill="#0D1B2A">SOA</text>
            <text x="107" y="29" fontFamily="Sora,sans-serif" fontWeight="200" fontSize="24" fill="#00C9A7">xia</text>
            <line x1="48" y1="36" x2="148" y2="36" stroke="#00C9A7" strokeWidth="0.8" opacity="0.3"/>
            <text x="48" y="48" fontFamily="DM Sans,sans-serif" fontWeight="300" fontSize="9" fill="#8899A8" letterSpacing="2">CONSULTING IT</text>
          </svg>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none" }}
            className="desktop-nav">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontSize: "0.875rem", color: "var(--text-muted)",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={e  => (e.currentTarget.style.color = "var(--text-muted)")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="btn-primary"
           style={{ fontSize: "0.875rem", padding: "0.55rem 1.4rem" }}
           onClick={() => setMenuOpen(false)}>
          Demander un devis
        </a>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="hamburger" aria-label="Menu">
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-muted)", borderRadius: 2 }}/>
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-muted)", borderRadius: 2 }}/>
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-muted)", borderRadius: 2 }}/>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          background: "#fff", zIndex: 190,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: "2.5rem",
        }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
               onClick={() => setMenuOpen(false)}
               style={{ fontFamily: "var(--fh)", fontSize: "1.5rem", color: "var(--text)", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Demander un devis
          </a>
        </div>
      )}

    
    </>
  )
}
