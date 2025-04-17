"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { createClientBrowser } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type ShopJoinRequest = Database["public"]["Tables"]["shop_join_requests"]["Row"]

export function SellerApplications() {
  const [applications, setApplications] = useState<ShopJoinRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isRootAdmin } = useAuth()
  const supabase = createClientBrowser()

  useEffect(() => {
    if (!isRootAdmin) return

    const fetchApplications = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from("shop_join_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        setApplications(data || [])
      } catch (error: any) {
        setError(error.message || "Failed to fetch applications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [isRootAdmin])

  const handleApprove = async (application: ShopJoinRequest) => {
    try {
      const { user_id, shop_name, shop_description } = application

      // Generate a slug from the shop name
      const slug = shop_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      // Start a transaction
      const { error: updateError } = await supabase.rpc("approve_seller_application", {
        request_id: application.id,
        shop_slug: slug,
      })

      if (updateError) throw updateError

      // Update the local state
      setApplications(
        applications.map((app) => (app.id === application.id ? { ...app, status: "approved" as const } : app)),
      )
    } catch (error: any) {
      setError(error.message || "Failed to approve application")
    }
  }

  const handleReject = async (application: ShopJoinRequest) => {
    try {
      const { error } = await supabase
        .from("shop_join_requests")
        .update({
          status: "rejected",
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", application.id)

      if (error) throw error

      // Update the local state
      setApplications(
        applications.map((app) => (app.id === application.id ? { ...app, status: "rejected" as const } : app)),
      )
    } catch (error: any) {
      setError(error.message || "Failed to reject application")
    }
  }

  if (!isRootAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You do not have permission to view this page</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Applications</CardTitle>
        <CardDescription>Review and manage seller applications</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="text-center py-4">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No applications found</div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{application.shop_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        application.status === "pending"
                          ? "outline"
                          : application.status === "approved"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <h4 className="font-medium text-sm">Business Type</h4>
                      <p>{application.business_type || "Not specified"}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm">Shop Description</h4>
                      <p>{application.shop_description || "Not provided"}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm">Reason for Joining</h4>
                      <p>{application.reason || "Not provided"}</p>
                    </div>
                  </div>

                  {application.status === "pending" && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleReject(application)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm" className="flex items-center gap-1" onClick={() => handleApprove(application)}>
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
