
# Correção: Nome da coluna de imagem

## Problema identificado
O código está a usar `imagem` mas a coluna na base de dados chama-se `imagem_url`.

## Solução
Atualizar o tipo TypeScript e a página de Portfólio para usar o nome correto da coluna.

---

## Ficheiros a modificar

| Ficheiro | Alteração |
|----------|-----------|
| `src/integrations/supabase/database.types.ts` | Mudar `imagem` para `imagem_url` |
| `src/pages/Portfolio.tsx` | Mudar `item.imagem` para `item.imagem_url` |

---

## Alterações técnicas

### database.types.ts
```typescript
// Antes
imagem: string;

// Depois
imagem_url: string;
```

### Portfolio.tsx
```typescript
// Antes
src={item.imagem}

// Depois
src={item.imagem_url}
```

---

## Resultado esperado
Após esta correção, a página de Portfólio deverá carregar correctamente as imagens da base de dados.
