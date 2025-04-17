import { CompleteProfileForm } from "@/components/auth/complete-profile-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete Your Profile - Mega Market",
  description: "Provide additional information to complete your profile",
}

export default function CompleteProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Mega Market</h1>
          <p className="mt-2 text-sm text-muted-foreground">Complete your profile</p>
        </div>
        <CompleteProfileForm />
      </div>
    </div>
  )
}
