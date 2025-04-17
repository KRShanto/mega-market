import { BecomeSellerForm } from "@/components/seller/become-seller-form"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClientServer } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Become a Seller - Mega Market",
  description: "Apply to become a seller on Mega Market",
}

export default async function BecomeSellerPage() {
  const supabase = createClientServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login?redirect=/become-seller")
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Become a Seller</h1>
        <p className="mt-2 text-muted-foreground">Join our marketplace and start selling your products</p>
      </div>
      <BecomeSellerForm />
    </div>
  )
}
