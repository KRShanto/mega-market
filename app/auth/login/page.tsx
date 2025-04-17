import { LoginForm } from "@/components/auth/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Mega Market",
  description: "Sign in to your Mega Market account",
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { registered?: string }
}) {
  const registered = searchParams.registered === "true"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Mega Market</h1>
          <p className="mt-2 text-sm text-muted-foreground">Multi-Vendor Ecommerce Platform</p>
        </div>
        <LoginForm registered={registered} />
      </div>
    </div>
  )
}
