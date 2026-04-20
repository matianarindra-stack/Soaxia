//src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nom, email, telephone, service, budget, description } = body
  console.log(email);
  // 1. Enregistrer dans Supabase
  const { error: sbError } = await supabase
    .from("contact_requests")
    .insert([{ nom, email, telephone, service, budget, description }])

  if (sbError) {
    console.error("Supabase error:", sbError)
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 })
  }

  // 2. Email à l'équipe
  /*await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `📥 Nouvelle demande de devis — ${nom}`,
    html: `
      <h2>Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${nom}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${telephone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Budget</td><td style="padding:8px">${budget || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${description}</td></tr>
      </table>
    `,
  })

  // 3. Email de confirmation au client
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "✅ Nous avons bien reçu votre demande — Soaxia",
    html: `
      <h2>Bonjour ${nom},</h2>
      <p>Merci pour votre demande concernant <strong>${service}</strong>.</p>
      <p>Nous avons bien enregistré votre projet et reviendrons vers vous <strong>sous 48h</strong> avec une proposition personnalisée.</p>
      <br/>
      <p>À très bientôt,</p>
      <p><strong>L'équipe Soaxia</strong></p>
    `,
  })

  return NextResponse.json({ success: true })
}*/
  // 2. Email à l'équipe  ← "to" corrigé : était "email" (le client), doit être votre adresse
  const { error: teamMailError } = await resend.emails.send({
    from: "onboarding@resend.dev",   // ← votre domaine vérifié dans Resend
    to: "matianarindra@gmail.com",              // ← était "email" (bug)
    subject: `📥 Nouvelle demande de devis — ${nom}`,
    html: `...`,
  })

  if (teamMailError) {
    console.error("Resend team error:", teamMailError)
    // Ne pas bloquer — continuer quand même vers la confirmation client
  }

  // 3. Email de confirmation au client
  const { error: clientMailError } = await resend.emails.send({
    from: "onboarding@resend.dev",   // ← votre domaine vérifié
    to: email,
    subject: "✅ Nous avons bien reçu votre demande — Soaxia",
    html: ` <h2>Bonjour ${nom},</h2>
      <p>Merci pour votre demande concernant <strong>${service}</strong>.</p>
      <p>Nous avons bien enregistré votre projet et reviendrons vers vous <strong>sous 48h</strong> avec une proposition personnalisée.</p>
      <br/>
      <p>À très bientôt,</p>
      <p><strong>L'équipe Soaxia</strong></p>`,
  })

  if (clientMailError) {
    console.error("Resend client error:", clientMailError)
  }
  return NextResponse.json({ success: true })  // ← manquait
}