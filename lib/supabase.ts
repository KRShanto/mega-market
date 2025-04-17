import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Singleton instance for browser client
let browserClient: ReturnType<typeof createClient<Database>> | null = null

// Create a single supabase client for the browser
export const createClientBrowser = () => {
  if (browserClient) return browserClient

  browserClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return browserClient
}

// Create a supabase client for server components
export const createClientServer = () => {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
