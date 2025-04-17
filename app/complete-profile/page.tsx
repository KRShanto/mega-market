import { CompleteProfileForm } from "@/components/auth/complete-profile-form"
import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete Your Profile - Mega Market",
  description: "Provide additional information to complete your profile",
}

export default async function CompleteProfilePage() {
  // Check if user is authenticated
  const user = await getServerUser()

  // If not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="mt-2 text-muted-foreground">Tell us a bit more about yourself</p>
      </div>
      <CompleteProfileForm />
    </div>
  )
}
