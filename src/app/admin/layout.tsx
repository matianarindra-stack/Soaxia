import { createSupabaseServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return <>{children}</>
}
