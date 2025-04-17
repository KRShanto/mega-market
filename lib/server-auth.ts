import { createClientServer } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Database } from "@/types/supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// Get the current session on the server
export async function getServerSession() {
  const cookieStore = cookies()
  const supabase = createClientServer()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

// Get the current user on the server
export async function getServerUser() {
  const session = await getServerSession()
  return session?.user || null
}

// Get the user's profile on the server
export async function getServerProfile() {
  const user = await getServerUser()

  if (!user) {
    return null
  }

  const supabase = createClientServer()
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return profile
}

// Check if the user is a root admin
export async function isRootAdmin() {
  const profile = await getServerProfile()
  return profile?.role === "root_admin"
}

// Check if the user is a shop admin
export async function isShopAdmin() {
  const profile = await getServerProfile()
  return profile?.role === "shop_admin"
}

// Check if the user has a shop
export async function hasShop() {
  const user = await getServerUser()

  if (!user) {
    return false
  }

  const supabase = createClientServer()
  const { data: shop } = await supabase.from("shops").select("id").eq("owner_id", user.id).maybeSingle()

  return !!shop
}

// Check if the user has a pending shop request
export async function hasPendingShopRequest() {
  const user = await getServerUser()

  if (!user) {
    return false
  }

  const supabase = createClientServer()
  const { data: request } = await supabase
    .from("shop_join_requests")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "pending")
    .maybeSingle()

  return !!request
}

// Protect a route - redirect to login if not authenticated
export async function requireAuth() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/login")
  }

  return session
}

// Protect an admin route - redirect if not a root admin
export async function requireRootAdmin() {
  await requireAuth()
  const isAdmin = await isRootAdmin()

  if (!isAdmin) {
    redirect("/")
  }
}

// Protect a shop admin route - redirect if not a shop admin
export async function requireShopAdmin() {
  await requireAuth()
  const isAdmin = await isShopAdmin()

  if (!isAdmin) {
    redirect("/")
  }
}
