import { RegisterForm } from "@/components/auth/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account - Mega Market",
  description: "Create a new account on Mega Market",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Mega Market</h1>
          <p className="mt-2 text-sm text-muted-foreground">Multi-Vendor Ecommerce Platform</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
