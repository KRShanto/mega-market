import { SellerApplications } from "@/components/admin/seller-applications"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClientServer } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Seller Applications - Admin Dashboard",
  description: "Manage seller applications on Mega Market",
}

export default async function SellerApplicationsPage() {
  const supabase = createClientServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login?redirect=/admin/seller-applications")
  }

  // Check if user is root admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "root_admin") {
    redirect("/")
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage seller applications</p>
      </div>
      <SellerApplications />
    </div>
  )
}
