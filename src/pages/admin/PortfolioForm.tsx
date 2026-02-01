import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

const portfolioSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().optional(),
  cliente: z.string().optional(),
  categoria: z.string().optional(),
  imagem_url: z.string().url('URL inválido').optional().or(z.literal('')),
  link_projeto: z.string().url('URL inválido').optional().or(z.literal('')),
  data_projeto: z.string().optional(),
  ordem: z.coerce.number().int().default(0),
  visivel: z.boolean().default(true),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      cliente: '',
      categoria: '',
      imagem_url: '',
      link_projeto: '',
      data_projeto: '',
      ordem: 0,
      visivel: true,
    },
  });

  const visivel = watch('visivel');

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        setIsFetching(true);
        try {
          const { data, error } = await supabase
            .from('portfolio2')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;

          if (data) {
            reset({
              titulo: data.titulo,
              descricao: data.descricao || '',
              cliente: data.cliente || '',
              categoria: data.categoria || '',
              imagem_url: data.imagem_url || '',
              link_projeto: data.link_projeto || '',
              data_projeto: data.data_projeto || '',
              ordem: data.ordem || 0,
              visivel: data.visivel ?? true,
            });
          }
        } catch (err) {
          console.error('Erro ao carregar item:', err);
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível carregar o item',
          });
          navigate('/admin/portfolio');
        } finally {
          setIsFetching(false);
        }
      };

      fetchItem();
    }
  }, [id, reset, navigate, toast]);

  const onSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        titulo: data.titulo,
        descricao: data.descricao || null,
        cliente: data.cliente || null,
        categoria: data.categoria || null,
        imagem_url: data.imagem_url || null,
        link_projeto: data.link_projeto || null,
        data_projeto: data.data_projeto || null,
        ordem: data.ordem,
        visivel: data.visivel,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('portfolio2')
          .update(payload)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Item atualizado com sucesso',
        });
      } else {
        const { error } = await supabase
          .from('portfolio2')
          .insert([payload]);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Item criado com sucesso',
        });
      }

      navigate('/admin/portfolio');
    } catch (err) {
      console.error('Erro ao guardar:', err);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível guardar o item',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/portfolio')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? 'Editar Item' : 'Novo Item'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Atualizar informações do item' : 'Adicionar novo item ao portfólio'}
            </p>
          </div>
        </div>

        {isFetching ? (
          <Card>
            <CardContent className="pt-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input id="titulo" {...register('titulo')} />
                  {errors.titulo && (
                    <p className="text-sm text-destructive">{errors.titulo.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" rows={4} {...register('descricao')} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Input id="cliente" {...register('cliente')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" {...register('categoria')} />
                  </div>
                </div>

                <ImageUpload
                  value={watch('imagem_url')}
                  onChange={(url) => setValue('imagem_url', url)}
                />

                <div className="space-y-2">
                  <Label htmlFor="imagem_url">Ou URL da Imagem</Label>
                  <Input
                    id="imagem_url"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    {...register('imagem_url')}
                  />
                  {errors.imagem_url && (
                    <p className="text-sm text-destructive">{errors.imagem_url.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_projeto">Link do Projeto</Label>
                  <Input
                    id="link_projeto"
                    type="url"
                    placeholder="https://exemplo.com/projeto"
                    {...register('link_projeto')}
                  />
                  {errors.link_projeto && (
                    <p className="text-sm text-destructive">{errors.link_projeto.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_projeto">Data do Projeto</Label>
                    <Input id="data_projeto" type="date" {...register('data_projeto')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ordem">Ordem</Label>
                    <Input id="ordem" type="number" {...register('ordem')} />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <Label htmlFor="visivel">Visível no site</Label>
                    <p className="text-sm text-muted-foreground">
                      O item será exibido publicamente no portfólio
                    </p>
                  </div>
                  <Switch
                    id="visivel"
                    checked={visivel}
                    onCheckedChange={(checked) => setValue('visivel', checked)}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/portfolio')}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        A guardar...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? 'Atualizar' : 'Criar'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default PortfolioForm;
