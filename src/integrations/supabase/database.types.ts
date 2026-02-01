export interface PortfolioItem {
  id: string;
  titulo: string;
  descricao: string;
  imagem_url: string;
  categoria: string;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      portfolio: {
        Row: PortfolioItem;
        Insert: Omit<PortfolioItem, 'id' | 'created_at'>;
        Update: Partial<Omit<PortfolioItem, 'id'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
