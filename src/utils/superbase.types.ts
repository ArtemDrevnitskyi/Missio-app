export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_dao: {
        Row: {
          created_at: string | null;
          dao_id: number | null;
          id: number;
          user_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          dao_id?: number | null;
          id?: number;
          user_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          dao_id?: number | null;
          id?: number;
          user_id?: string;
          updated_at?: string | null;
        };
      };
      dao: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
          updated_at: string | null;
          banner_url: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
      };
      proposal: {
        Row: {
          created_at: string;
          dao_id: number;
          description: string;
          id: number;
          status: string;
          title: string;
          user_id: number;
          author: string;
          questions: string[];
          summary: string;
        };
        Insert: {
          created_at?: string | null;
          dao_id?: number | null;
          description?: string | null;
          id?: number;
          status?: string | null;
          title: string;
          user_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          dao_id?: number | null;
          description?: string | null;
          id?: number;
          status?: string | null;
          title?: string;
          user_id?: number | null;
        };
      };
      user: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
          password: string;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: number;
          password: string;
          updated_at?: string | null;
          username: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: number;
          password?: string;
          updated_at?: string | null;
          username?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
