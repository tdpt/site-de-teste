import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Password deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isAdmin, user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate('/admin/portfolio');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(data.email, data.password);
        
        if (error) {
          let message = 'Erro ao criar conta';
          if (error.message.includes('User already registered')) {
            message = 'Este email já está registado';
          }
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: message,
          });
          return;
        }

        toast({
          title: 'Conta criada!',
          description: 'Verifique o seu email para confirmar a conta. Depois contacte o administrador para obter permissões.',
        });
        setIsSignUp(false);
        reset();
      } else {
        const { error } = await signIn(data.email, data.password);
        
        if (error) {
          let message = 'Erro ao fazer login';
          if (error.message.includes('Invalid login credentials')) {
            message = 'Email ou password incorretos';
          } else if (error.message.includes('Email not confirmed')) {
            message = 'Por favor, confirme o seu email antes de fazer login';
          }
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: message,
          });
          return;
        }

        toast({
          title: 'Sucesso',
          description: 'Login efetuado com sucesso',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro inesperado',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Backoffice</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Crie uma conta para solicitar acesso' 
              : 'Faça login para aceder ao painel de administração'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@exemplo.pt"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? 'A criar conta...' : 'A entrar...'}
                </>
              ) : (
                isSignUp ? 'Criar Conta' : 'Entrar'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                reset();
              }}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              {isSignUp 
                ? 'Já tem conta? Faça login' 
                : 'Não tem conta? Crie uma'
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
