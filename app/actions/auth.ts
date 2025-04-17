"use server"

import { createClientServer } from "@/lib/supabase"
import { cookies } from "next/headers"

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createClientServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Return success with redirect URL for client-side hard reload
  return { success: true, redirectTo: "/complete-profile" }
}

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  const supabase = createClientServer()

  // 1. Sign up the user
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (signUpError) {
    return { error: signUpError.message }
  }

  // 2. Automatically sign in the user
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  // Return success with redirect URL for client-side hard reload
  return { success: true, redirectTo: "/complete-profile" }
}

export async function signOut() {
  const supabase = createClientServer()
  await supabase.auth.signOut()

  // Clear cookies to ensure complete logout
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name)
    })

  return { success: true, redirectTo: "/" }
}
