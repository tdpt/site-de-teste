
# Plano: Link "Editar" nos Cards do Portfólio

## Resumo

Adicionar um link "Editar" em cada card do portfólio no front-office, visível apenas quando existe uma sessão de administrador ativa.

---

## Pré-requisito

Esta funcionalidade depende do **sistema de autenticação e backoffice** que foi planeado anteriormente. O link "Editar" só fará sentido depois de:
1. Existir a página de login do admin (`/admin/login`)
2. Existir a página de edição de portfolio (`/admin/portfolio/:id`)
3. Existir um hook de autenticação para verificar a sessão

---

## Implementação

### 1. Criar Hook de Autenticação

Ficheiro: `src/hooks/useAuth.tsx`

Este hook irá:
- Verificar se existe sessão ativa via Supabase Auth
- Verificar se o utilizador tem role de "admin"
- Expor estado `isAdmin` para os componentes

### 2. Modificar Página do Portfólio

Ficheiro: `src/pages/Portfolio.tsx`

Alterações:
- Importar o hook `useAuth`
- Adicionar link "Editar" em cada card
- Mostrar/esconder link baseado no estado `isAdmin`
- Link aponta para `/admin/portfolio/:id`

Código a adicionar em cada card:

```tsx
{isAdmin && (
  <Link
    to={`/admin/portfolio/${item.id}`}
    className="inline-block mt-2 text-xs text-muted-foreground hover:text-primary"
  >
    <Pencil className="inline h-3 w-3 mr-1" />
    Editar
  </Link>
)}
```

---

## Fluxo

```text
Utilizador não autenticado:
┌─────────────────────────┐
│  Card do Portfólio      │
│  [Título]               │
│  [Cliente]              │
│  [Descrição]            │
└─────────────────────────┘

Administrador autenticado:
┌─────────────────────────┐
│  Card do Portfólio      │
│  [Título]               │
│  [Cliente]              │
│  [Descrição]            │
│  ✏ Editar               │ ← Novo link
└─────────────────────────┘
```

---

## Dependências

Este plano requer a implementação prévia do backoffice completo:

1. **Tabelas na base de dados**: `profiles`, `user_roles`
2. **Função has_role()**: Para verificar permissões de admin
3. **Páginas do backoffice**: Login, Dashboard, PortfolioForm
4. **Hook useAuth**: Para gerir sessão e verificar roles

---

## Recomendação

Sugiro **aprovar e implementar o plano completo do backoffice** que foi apresentado anteriormente, pois:
- O link "Editar" sem autenticação não teria utilidade
- Sem a página de edição, o link não teria destino
- A verificação de admin requer as tabelas de roles

Posso prosseguir com a implementação completa do backoffice (incluindo este link "Editar")?
