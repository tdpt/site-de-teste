
# Plano: Página de Portfólio com Supabase

## Resumo

Vou criar uma nova página "Portfólio" que lista os trabalhos guardados na tabela `portfolio` do Supabase, e adicionar o menu correspondente na navegação.

---

## O que será criado

1. **Novo menu "Portfólio"** no header (entre "Serviços" e "Diferenciação")
2. **Página de Portfólio** (`/portfolio`) com listagem dos trabalhos em cards
3. **Integração com Supabase** para buscar os dados da tabela `portfolio`

---

## Passos da implementação

### 1. Configurar cliente Supabase
Criar o ficheiro de integração que permite ao site comunicar com a base de dados.

### 2. Criar página Portfolio.tsx
Uma página semelhante ao Blog, com:
- Header com título "Portfólio"
- Grid de cards com os trabalhos
- Cada card mostra: imagem, título, categoria e descrição
- Estados de loading e erro

### 3. Atualizar navegação
- Adicionar link "Portfólio" no Header
- Adicionar rota no App.tsx

---

## Estrutura esperada da tabela

| Coluna | Tipo | Uso |
|--------|------|-----|
| id | uuid/int | Identificador único |
| titulo | text | Título do trabalho |
| descricao | text | Descrição do trabalho |
| imagem | text | URL da imagem |
| categoria | text | Categoria do trabalho |

---

## Ficheiros a criar/modificar

| Ficheiro | Ação |
|----------|------|
| `src/integrations/supabase/client.ts` | Criar cliente Supabase |
| `src/integrations/supabase/types.ts` | Criar tipos TypeScript |
| `src/pages/Portfolio.tsx` | Nova página de portfólio |
| `src/components/Header.tsx` | Adicionar menu "Portfólio" |
| `src/App.tsx` | Adicionar rota `/portfolio` |

---

## Pré-requisito importante

Antes de implementar, confirme que o Supabase está correctamente conectado ao Lovable através das definições do projeto. A conexão já foi feita, mas o cliente ainda não foi gerado no código.

---

## Secção técnica

### Cliente Supabase
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "URL_DO_PROJETO"
const supabaseKey = "ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Query para buscar portfólio
```typescript
const { data, error } = await supabase
  .from('portfolio')
  .select('*')
  .order('created_at', { ascending: false })
```

### Tipo TypeScript
```typescript
interface PortfolioItem {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  categoria: string;
  created_at?: string;
}
```
