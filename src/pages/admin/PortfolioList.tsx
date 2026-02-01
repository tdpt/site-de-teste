import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Download, Upload, Eye, EyeOff } from 'lucide-react';
import CSVImport from '@/components/admin/CSVImport';
import CSVExport from '@/components/admin/CSVExport';
import type { PortfolioItem } from '@/integrations/supabase/database.types';

const PortfolioList = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio2')
        .select('*')
        .order('ordem', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Erro ao carregar itens:', err);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar os itens do portfólio',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('portfolio2')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      toast({
        title: 'Sucesso',
        description: 'Item eliminado com sucesso',
      });
    } catch (err) {
      console.error('Erro ao eliminar:', err);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível eliminar o item',
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleImportSuccess = () => {
    setShowImport(false);
    fetchItems();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portfólio</h1>
            <p className="text-muted-foreground">
              Gerir os itens do portfólio
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CSVExport items={items} />
            <Button variant="outline" onClick={() => setShowImport(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Importar CSV
            </Button>
            <Button asChild>
              <Link to="/admin/portfolio/novo">
                <Plus className="h-4 w-4 mr-2" />
                Novo Item
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground mb-4">
              Ainda não há itens no portfólio
            </p>
            <Button asChild>
              <Link to="/admin/portfolio/novo">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Item
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Ordem</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="w-24">Visível</TableHead>
                  <TableHead className="w-32 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">
                      {item.ordem}
                    </TableCell>
                    <TableCell className="font-medium">{item.titulo}</TableCell>
                    <TableCell>{item.cliente || '-'}</TableCell>
                    <TableCell>
                      {item.categoria ? (
                        <Badge variant="secondary">{item.categoria}</Badge>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {item.visivel ? (
                        <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/portfolio/${item.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. O item será permanentemente eliminado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'A eliminar...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Import modal */}
      <CSVImport
        open={showImport}
        onOpenChange={setShowImport}
        onSuccess={handleImportSuccess}
      />
    </AdminLayout>
  );
};

export default PortfolioList;
