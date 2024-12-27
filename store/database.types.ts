export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      asset_groups: {
        Row: {
          asset_groups_pkey: string
          asset_id: number
          group_id: number
        }
        Insert: {
          asset_groups_pkey?: string
          asset_id: number
          group_id: number
        }
        Update: {
          asset_groups_pkey?: string
          asset_id?: number
          group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "asset_groups_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "customization_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "customization_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      camera_placements: {
        Row: {
          name: string
          position: Json
          target: Json
        }
        Insert: {
          name: string
          position: Json
          target: Json
        }
        Update: {
          name?: string
          position?: Json
          target?: Json
        }
        Relationships: []
      }
      customization_assets: {
        Row: {
          created_time: string
          group_id: number
          id: number
          name: string
          thumbnail: string
          updated_time: string
          url: string | null
        }
        Insert: {
          created_time?: string
          group_id: number
          id?: number
          name: string
          thumbnail: string
          updated_time: string
          url?: string | null
        }
        Update: {
          created_time?: string
          group_id?: number
          id?: number
          name?: string
          thumbnail?: string
          updated_time?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customization_assets_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "customization_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      customization_groups: {
        Row: {
          camera_placements: string | null
          color_palette: string | null
          created_time: string
          id: number
          main_category: string | null
          name: string
          position: number
          removable: boolean
        }
        Insert: {
          camera_placements?: string | null
          color_palette?: string | null
          created_time?: string
          id?: number
          main_category?: string | null
          name: string
          position?: number
          removable?: boolean
        }
        Update: {
          camera_placements?: string | null
          color_palette?: string | null
          created_time?: string
          id?: number
          main_category?: string | null
          name?: string
          position?: number
          removable?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "customization_groups_camera_placements_fkey"
            columns: ["camera_placements"]
            isOneToOne: false
            referencedRelation: "camera_placements"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "customization_groups_color_palette_fkey"
            columns: ["color_palette"]
            isOneToOne: false
            referencedRelation: "customization_palettes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customization_groups_main_category_fkey"
            columns: ["main_category"]
            isOneToOne: false
            referencedRelation: "my_categories"
            referencedColumns: ["name"]
          },
        ]
      }
      customization_palettes: {
        Row: {
          colors: Json | null
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          colors?: Json | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          colors?: Json | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_due: string | null
          amount_paid: string
          created_time: string
          currency: string
          email: string
          id: number
          invoice_id: string
          status: string
          subscription_id: string
          user_id: string | null
        }
        Insert: {
          amount_due?: string | null
          amount_paid: string
          created_time?: string
          currency: string
          email: string
          id?: number
          invoice_id: string
          status: string
          subscription_id: string
          user_id?: string | null
        }
        Update: {
          amount_due?: string | null
          amount_paid?: string
          created_time?: string
          currency?: string
          email?: string
          id?: number
          invoice_id?: string
          status?: string
          subscription_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      my_assets: {
        Row: {
          created_at: string
          id: string
          name: string
          property_id: string
          thumbnail: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          property_id: string
          thumbnail?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          property_id?: string
          thumbnail?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "my_assets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "my_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      my_categories: {
        Row: {
          created_at: string
          name: string
        }
        Insert: {
          created_at?: string
          name: string
        }
        Update: {
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      my_properties: {
        Row: {
          category: string
          color_palette: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category: string
          color_palette?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string
          color_palette?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "my_properties_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "my_categories"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "my_properties_color_palette_fkey"
            columns: ["color_palette"]
            isOneToOne: false
            referencedRelation: "customization_palettes"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: string
          created_time: string
          currency: string
          customer_details: string
          email: string
          id: number
          payment_date: string
          payment_intent: string
          payment_time: string
          stripe_id: string
          user_id: string
        }
        Insert: {
          amount: string
          created_time?: string
          currency: string
          customer_details: string
          email: string
          id?: number
          payment_date: string
          payment_intent: string
          payment_time: string
          stripe_id: string
          user_id: string
        }
        Update: {
          amount?: string
          created_time?: string
          currency?: string
          customer_details?: string
          email?: string
          id?: number
          payment_date?: string
          payment_intent?: string
          payment_time?: string
          stripe_id?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_time: string
          default_payment_method_id: string | null
          email: string
          end_date: string | null
          id: number
          plan_id: string
          start_date: string
          status: string
          stripe_user_id: string
          subscription_id: string
          user_id: string
        }
        Insert: {
          created_time?: string
          default_payment_method_id?: string | null
          email: string
          end_date?: string | null
          id?: number
          plan_id: string
          start_date: string
          status: string
          stripe_user_id: string
          subscription_id: string
          user_id: string
        }
        Update: {
          created_time?: string
          default_payment_method_id?: string | null
          email?: string
          end_date?: string | null
          id?: number
          plan_id?: string
          start_date?: string
          status?: string
          stripe_user_id?: string
          subscription_id?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions_plans: {
        Row: {
          amount: string
          created_time: string
          currency: string
          description: string
          id: number
          interval: string
          name: string
          plan_id: string
        }
        Insert: {
          amount: string
          created_time?: string
          currency: string
          description: string
          id?: number
          interval: string
          name: string
          plan_id: string
        }
        Update: {
          amount?: string
          created_time?: string
          currency?: string
          description?: string
          id?: number
          interval?: string
          name?: string
          plan_id?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_time: string
          email: string
          first_name: string | null
          gender: string | null
          id: number
          last_name: string | null
          profile_image_url: string | null
          subscription: string | null
          user_id: string
        }
        Insert: {
          created_time?: string
          email: string
          first_name?: string | null
          gender?: string | null
          id?: number
          last_name?: string | null
          profile_image_url?: string | null
          subscription?: string | null
          user_id: string
        }
        Update: {
          created_time?: string
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: number
          last_name?: string | null
          profile_image_url?: string | null
          subscription?: string | null
          user_id?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never
