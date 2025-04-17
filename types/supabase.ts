export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          display_name: string | null
          avatar_url: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          role: "root_admin" | "shop_admin" | "shop_staff" | "user"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          role?: "root_admin" | "shop_admin" | "shop_staff" | "user"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          role?: "root_admin" | "shop_admin" | "shop_staff" | "user"
          created_at?: string
          updated_at?: string
        }
      }
      shops: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          banner_url: string | null
          owner_id: string
          status: "pending" | "approved" | "rejected"
          is_featured: boolean
          commission_rate: number
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          phone: string | null
          email: string | null
          website: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_twitter: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          banner_url?: string | null
          owner_id: string
          status?: "pending" | "approved" | "rejected"
          is_featured?: boolean
          commission_rate?: number
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_twitter?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          banner_url?: string | null
          owner_id?: string
          status?: "pending" | "approved" | "rejected"
          is_featured?: boolean
          commission_rate?: number
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_twitter?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shop_join_requests: {
        Row: {
          id: string
          user_id: string
          shop_name: string
          shop_description: string | null
          business_type: string | null
          reason: string | null
          status: "pending" | "approved" | "rejected"
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          shop_name: string
          shop_description?: string | null
          business_type?: string | null
          reason?: string | null
          status?: "pending" | "approved" | "rejected"
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          shop_name?: string
          shop_description?: string | null
          business_type?: string | null
          reason?: string | null
          status?: "pending" | "approved" | "rejected"
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          shop_id: string
          name: string
          slug: string
          description: string | null
          price: number
          compare_price: number | null
          cost_price: number | null
          sku: string | null
          barcode: string | null
          inventory_quantity: number
          is_physical: boolean
          weight: number | null
          width: number | null
          height: number | null
          length: number | null
          is_published: boolean
          is_featured: boolean
          is_new: boolean
          is_on_sale: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          name: string
          slug: string
          description?: string | null
          price: number
          compare_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          inventory_quantity?: number
          is_physical?: boolean
          weight?: number | null
          width?: number | null
          height?: number | null
          length?: number | null
          is_published?: boolean
          is_featured?: boolean
          is_new?: boolean
          is_on_sale?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          inventory_quantity?: number
          is_physical?: boolean
          weight?: number | null
          width?: number | null
          height?: number | null
          length?: number | null
          is_published?: boolean
          is_featured?: boolean
          is_new?: boolean
          is_on_sale?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      shop_orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status: "pending" | "paid" | "failed" | "refunded"
          shipping_address: string | null
          shipping_city: string | null
          shipping_state: string | null
          shipping_postal_code: string | null
          shipping_country: string | null
          shipping_phone: string | null
          shipping_email: string | null
          billing_address: string | null
          billing_city: string | null
          billing_state: string | null
          billing_postal_code: string | null
          billing_country: string | null
          billing_phone: string | null
          billing_email: string | null
          subtotal: number
          shipping_cost: number
          tax: number
          discount: number
          total: number
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
    }
    Functions: {
      is_root_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_shop_admin: {
        Args: {
          shop_id: string
        }
        Returns: boolean
      }
      is_shop_staff: {
        Args: {
          shop_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "root_admin" | "shop_admin" | "shop_staff" | "user"
      shop_status: "pending" | "approved" | "rejected"
      order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
      payment_status: "pending" | "paid" | "failed" | "refunded"
    }
  }
}
