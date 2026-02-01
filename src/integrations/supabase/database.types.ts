export interface PortfolioItem {
  id: string;
  titulo: string;
  descricao: string | null;
  cliente: string | null;
  categoria: string | null;
  imagem_url: string | null;
  link_projeto: string | null;
  data_projeto: string | null;
  ordem: number;
  visivel: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      portfolio2: {
        Row: PortfolioItem;
        Insert: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<PortfolioItem, 'id'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
