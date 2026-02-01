import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MIN_WIDTH = 640;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Formato inválido',
          description: 'Apenas ficheiros JPG, PNG e WebP são permitidos.',
        });
        resolve(false);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: 'destructive',
          title: 'Ficheiro muito grande',
          description: 'O tamanho máximo permitido é 1MB.',
        });
        resolve(false);
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < MIN_WIDTH) {
          toast({
            variant: 'destructive',
            title: 'Imagem muito pequena',
            description: `A largura mínima é ${MIN_WIDTH}px. A sua imagem tem ${img.width}px.`,
          });
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível ler a imagem.',
        });
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = await validateImage(file);
    if (!isValid) {
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(data.path);

      const publicUrl = urlData.publicUrl;
      
      setPreview(publicUrl);
      onChange(publicUrl);

      toast({
        title: 'Sucesso',
        description: 'Imagem carregada com sucesso.',
      });
    } catch (err) {
      console.error('Erro ao carregar imagem:', err);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar a imagem. Verifique se tem permissões.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      // Extract filename from URL
      const urlParts = value.split('/');
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage
        .from('portfolio-images')
        .remove([fileName]);

      setPreview(null);
      onChange('');

      toast({
        title: 'Imagem removida',
        description: 'A imagem foi removida com sucesso.',
      });
    } catch (err) {
      console.error('Erro ao remover imagem:', err);
      // Still clear the preview even if delete fails
      setPreview(null);
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <Label>Imagem</Label>
      
      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={disabled || isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">A carregar...</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">
                Clique para carregar uma imagem
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG ou WebP • Máx. 1MB • Mín. 640px de largura
              </p>
            </>
          )}
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {!preview && (
        <p className="text-xs text-muted-foreground">
          Ou insira um URL de imagem externo no campo abaixo.
        </p>
      )}
    </div>
  );
}
