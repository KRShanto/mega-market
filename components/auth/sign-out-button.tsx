"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/actions/auth"

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)

    try {
      const result = await signOut()
      if (result.success && result.redirectTo) {
        window.location.href = result.redirectTo
      }
    } catch (error) {
      console.error("Error signing out:", error)
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleSignOut} className="flex items-center w-full" disabled={isLoading}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
    </button>
  )
}
