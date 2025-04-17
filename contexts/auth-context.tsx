"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClientBrowser } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isRootAdmin: boolean
  isShopAdmin: boolean
  hasShop: boolean
  hasPendingShopRequest: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a single instance of the Supabase client
const supabase = createClientBrowser()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRootAdmin, setIsRootAdmin] = useState(false)
  const [isShopAdmin, setIsShopAdmin] = useState(false)
  const [hasShop, setHasShop] = useState(false)
  const [hasPendingShopRequest, setHasPendingShopRequest] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)

      if (session?.user) {
        await fetchUserData(session.user.id)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        fetchUserData(session.user.id)
      } else {
        setProfile(null)
        setIsRootAdmin(false)
        setIsShopAdmin(false)
        setHasShop(false)
        setHasPendingShopRequest(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (userId: string) => {
    // Fetch user profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userId).single()

    setProfile(profileData)

    if (profileData) {
      // Check if user is root admin
      setIsRootAdmin(profileData.role === "root_admin")

      // Check if user is a shop admin
      setIsShopAdmin(profileData.role === "shop_admin")

      // Check if user has a shop
      const { data: shopData } = await supabase.from("shops").select("id").eq("owner_id", userId).maybeSingle()

      setHasShop(!!shopData)

      // Check if user has a pending shop request
      if (!shopData) {
        const { data: requestData } = await supabase
          .from("shop_join_requests")
          .select("id, status")
          .eq("user_id", userId)
          .eq("status", "pending")
          .maybeSingle()

        setHasPendingShopRequest(!!requestData)
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    router.refresh()
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/")
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signOut,
    isRootAdmin,
    isShopAdmin,
    hasShop,
    hasPendingShopRequest,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
