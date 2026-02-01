-- Criar tabela portfolio2
CREATE TABLE public.portfolio2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  cliente TEXT,
  categoria TEXT,
  imagem_url TEXT,
  link_projeto TEXT,
  data_projeto DATE,
  ordem INTEGER DEFAULT 0,
  visivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ativar Row Level Security
ALTER TABLE public.portfolio2 ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública para itens visíveis
CREATE POLICY "Leitura pública de itens visíveis"
  ON public.portfolio2
  FOR SELECT
  TO anon, authenticated
  USING (visivel = true);

-- Índices para performance
CREATE INDEX portfolio2_ordem_idx ON public.portfolio2(ordem);
CREATE INDEX portfolio2_categoria_idx ON public.portfolio2(categoria);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_portfolio2_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio2_updated_at
  BEFORE UPDATE ON public.portfolio2
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio2_updated_at();