"use server"

import { createClientServer } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

type RegisterFormState = {
  success: boolean
  error: string | null
}

export async function registerUser(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  try {
    // Create a server-side Supabase client with admin privileges
    const supabase = createClientServer()

    // Step 1: Create the user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { success: false, error: `Authentication error: ${authError.message}` }
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create user" }
    }

    // Step 2: Manually create the profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      display_name: `${firstName} ${lastName}`.trim(),
      role: "user",
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)

      // If profile creation fails, try to delete the auth user to avoid orphaned accounts
      await supabase.auth.admin.deleteUser(authData.user.id)

      return { success: false, error: `Profile creation error: ${profileError.message}` }
    }

    revalidatePath("/auth/register")
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Unexpected error during registration:", error)
    return { success: false, error: `Unexpected error: ${error.message}` }
  }
}
