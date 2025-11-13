export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          blog_category_id: number
          created_at: string | null
          description: string | null
          name: string
        }
        Insert: {
          blog_category_id?: number
          created_at?: string | null
          description?: string | null
          name: string
        }
        Update: {
          blog_category_id?: number
          created_at?: string | null
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          blog_post_id: number
          category_id: number | null
          content: string | null
          created_at: string | null
          published: boolean | null
          slug: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          blog_post_id?: number
          category_id?: number | null
          content?: string | null
          created_at?: string | null
          published?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          blog_post_id?: number
          category_id?: number | null
          content?: string | null
          created_at?: string | null
          published?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["blog_category_id"]
          },
        ]
      }
      brands_final_v3: {
        Row: {
          brand_id: number
          brand_name: string
        }
        Insert: {
          brand_id: number
          brand_name: string
        }
        Update: {
          brand_id?: number
          brand_name?: string
        }
        Relationships: []
      }
      cart: {
        Row: {
          cart_id: number
          created_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cart_id?: number
          created_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cart_id?: number
          created_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: number | null
          cart_item_id: number
          created_at: string | null
          price: number | null
          product_id: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          cart_id?: number | null
          cart_item_id?: number
          created_at?: string | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          cart_id?: number | null
          cart_item_id?: number
          created_at?: string | null
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["cart_id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_final_v3"
            referencedColumns: ["product_id"]
          },
        ]
      }
      categories_final_v3: {
        Row: {
          category_id: number
          category_name: string
        }
        Insert: {
          category_id: number
          category_name: string
        }
        Update: {
          category_id?: number
          category_name?: string
        }
        Relationships: []
      }
      compatibility: {
        Row: {
          brand_id: number | null
          brand_name: string | null
          model_variant: string | null
          product_id: number | null
        }
        Insert: {
          brand_id?: number | null
          brand_name?: string | null
          model_variant?: string | null
          product_id?: number | null
        }
        Update: {
          brand_id?: number | null
          brand_name?: string | null
          model_variant?: string | null
          product_id?: number | null
        }
        Relationships: []
      }
      models_final_v3: {
        Row: {
          brand_id: number
          brand_name: string | null
          model_id: number
          model_name: string
        }
        Insert: {
          brand_id: number
          brand_name?: string | null
          model_id: number
          model_name: string
        }
        Update: {
          brand_id?: number
          brand_name?: string | null
          model_id?: number
          model_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_final_v3_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands_final_v3"
            referencedColumns: ["brand_id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          order_id: number | null
          order_item_id: number
          price: number | null
          product_id: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          order_id?: number | null
          order_item_id?: number
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          order_id?: number | null
          order_item_id?: number
          price?: number | null
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_final_v3"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          order_id: number
          payment_method: string | null
          shipping_address: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          order_id?: number
          payment_method?: string | null
          shipping_address?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          order_id?: number
          payment_method?: string | null
          shipping_address?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      parts_taxonomy_final_v3: {
        Row: {
          taxonomy_id: number
          taxonomy_name: string
        }
        Insert: {
          taxonomy_id: number
          taxonomy_name: string
        }
        Update: {
          taxonomy_id?: number
          taxonomy_name?: string
        }
        Relationships: []
      }
      products_final_v3: {
        Row: {
          brand_id: number | null
          brand_name: string | null
          category_id: number | null
          description: string | null
          image_url: string | null
          model_id: number | null
          model_name: string | null
          part_name: string | null
          part_number: string | null
          price_value: number | null
          product_id: number
          product_url: string | null
          subcategory_id: number | null
          taxonomy_id: number | null
        }
        Insert: {
          brand_id?: number | null
          brand_name?: string | null
          category_id?: number | null
          description?: string | null
          image_url?: string | null
          model_id?: number | null
          model_name?: string | null
          part_name?: string | null
          part_number?: string | null
          price_value?: number | null
          product_id: number
          product_url?: string | null
          subcategory_id?: number | null
          taxonomy_id?: number | null
        }
        Update: {
          brand_id?: number | null
          brand_name?: string | null
          category_id?: number | null
          description?: string | null
          image_url?: string | null
          model_id?: number | null
          model_name?: string | null
          part_name?: string | null
          part_number?: string | null
          price_value?: number | null
          product_id?: number
          product_url?: string | null
          subcategory_id?: number | null
          taxonomy_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_final_v3_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands_final_v3"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "products_final_v3_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_final_v3"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "products_final_v3_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models_final_v3"
            referencedColumns: ["model_id"]
          },
          {
            foreignKeyName: "products_final_v3_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories_final_v3"
            referencedColumns: ["subcategory_id"]
          },
          {
            foreignKeyName: "products_final_v3_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "parts_taxonomy_final_v3"
            referencedColumns: ["taxonomy_id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          product_id: number | null
          rating: number | null
          review_id: number
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          product_id?: number | null
          rating?: number | null
          review_id?: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          product_id?: number | null
          rating?: number | null
          review_id?: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_final_v3"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subcategories_final_v3: {
        Row: {
          category_id: number
          category_name: string | null
          subcategory_id: number
          subcategory_name: string
          taxonomy_id: number | null
          taxonomy_name: string | null
        }
        Insert: {
          category_id: number
          category_name?: string | null
          subcategory_id: number
          subcategory_name: string
          taxonomy_id?: number | null
          taxonomy_name?: string | null
        }
        Update: {
          category_id?: number
          category_name?: string | null
          subcategory_id?: number
          subcategory_name?: string
          taxonomy_id?: number | null
          taxonomy_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_final_v3_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_final_v3"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "subcategories_final_v3_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "parts_taxonomy_final_v3"
            referencedColumns: ["taxonomy_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string | null
          postal_code: string | null
          profile_id: number
          region: string | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          postal_code?: string | null
          profile_id?: number
          region?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          postal_code?: string | null
          profile_id?: number
          region?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          country: string | null
          created_at: string | null
          email: string
          full_name: string | null
          password_hash: string | null
          phone_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          password_hash?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          password_hash?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          created_at: string | null
          product_id: number | null
          user_id: string | null
          wishlist_id: number
        }
        Insert: {
          created_at?: string | null
          product_id?: number | null
          user_id?: string | null
          wishlist_id?: number
        }
        Update: {
          created_at?: string | null
          product_id?: number | null
          user_id?: string | null
          wishlist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_final_v3"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wishlist_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
