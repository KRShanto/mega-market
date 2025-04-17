"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { createClientBrowser } from "@/lib/supabase"

export function BecomeSellerForm() {
  const [shopName, setShopName] = useState("")
  const [shopDescription, setShopDescription] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user, hasPendingShopRequest } = useAuth()
  const supabase = createClientBrowser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!user) {
      setError("You must be logged in to apply as a seller")
      setIsLoading(false)
      return
    }

    try {
      // Check if shop name is already taken
      const { data: existingShop } = await supabase.from("shops").select("id").eq("name", shopName).maybeSingle()

      if (existingShop) {
        setError("Shop name is already taken")
        setIsLoading(false)
        return
      }

      // Create shop join request
      const { error: requestError } = await supabase.from("shop_join_requests").insert({
        user_id: user.id,
        shop_name: shopName,
        shop_description: shopDescription,
        business_type: businessType,
        reason: reason,
        status: "pending",
      })

      if (requestError) throw requestError

      setSuccess(true)
    } catch (error: any) {
      setError(error.message || "Failed to submit seller application")
    } finally {
      setIsLoading(false)
    }
  }

  if (hasPendingShopRequest) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-yellow-500" />
            Application Pending
          </CardTitle>
          <CardDescription>Your seller application is currently under review</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            We&apos;re reviewing your application to become a seller on our platform. This process typically takes 1-2
            business days.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            You&apos;ll receive an email notification once your application has been processed.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Application Submitted
          </CardTitle>
          <CardDescription>Your seller application has been submitted successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Thank you for applying to become a seller on our platform. We&apos;ll review your application and get back
            to you soon.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            You&apos;ll receive an email notification once your application has been processed.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Become a Seller</CardTitle>
        <CardDescription>Fill out the form below to apply as a seller on our platform</CardDescription>
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
            <Label htmlFor="shopName">Shop Name</Label>
            <Input id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
            <p className="text-sm text-muted-foreground">This will be the name of your shop visible to customers</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopDescription">Shop Description</Label>
            <Textarea
              id="shopDescription"
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
              rows={4}
              required
            />
            <p className="text-sm text-muted-foreground">Describe what your shop sells and what makes it unique</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="e.g. Sole Proprietorship, LLC, Corporation"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Why do you want to sell on our platform?</Label>
            <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By submitting this application, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/seller-agreement" className="text-primary hover:underline">
            Seller Agreement
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
