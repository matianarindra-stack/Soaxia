import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SOAxia — Conseil IT & Développement",
  description:
    "SOAxia accompagne entreprises et porteurs de projets dans le développement d'applications, la rédaction de cahiers des charges et le conseil stratégique en informatique.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
