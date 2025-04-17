"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { createClientBrowser } from "@/lib/supabase"

export function DebugRegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientBrowser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setDebugInfo(null)
    setIsLoading(true)

    try {
      // Step 1: Try to sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(`Sign up error: ${signUpError.message}`)
        setDebugInfo({
          errorType: "SignUpError",
          error: signUpError,
        })
        return
      }

      // Step 2: Check if the user was created in auth.users
      const { data: authUserData, error: authUserError } = await supabase.rpc("check_auth_user", {
        email_to_check: email,
      })

      // Step 3: Check if the profile was created
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signUpData.user?.id)
        .maybeSingle()

      // Collect all debug information
      setDebugInfo({
        signUpResult: signUpData,
        authUserCheck: { data: authUserData, error: authUserError },
        profileCheck: { data: profileData, error: profileError },
        timestamp: new Date().toISOString(),
      })

      // Log to console for easier debugging
      console.log("Debug Registration Info:", {
        signUpResult: signUpData,
        authUserCheck: { data: authUserData, error: authUserError },
        profileCheck: { data: profileData, error: profileError },
      })
    } catch (error: any) {
      setError(`Unexpected error: ${error.message}`)
      setDebugInfo({
        errorType: "UnexpectedError",
        error: error.toString(),
        stack: error.stack,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Debug Registration</CardTitle>
        <CardDescription>Test user registration with detailed error logging</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Testing Registration..." : "Test Registration"}
          </Button>
        </form>

        {debugInfo && (
          <div className="mt-6 p-4 bg-slate-100 rounded-md overflow-auto max-h-96">
            <h3 className="font-medium mb-2">Debug Information:</h3>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
