import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface CSVImportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface ParsedRow {
  titulo: string;
  descricao?: string;
  cliente?: string;
  categoria?: string;
  imagem_url?: string;
  link_projeto?: string;
  data_projeto?: string;
  ordem: number;
  visivel: boolean;
  error?: string;
}

const CSVImport = ({ open, onOpenChange, onSuccess }: CSVImportProps) => {
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCSV = (content: string): ParsedRow[] => {
    const lines = content.split('\n').filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const requiredHeaders = ['titulo'];
    
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
    if (missingHeaders.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Erro no CSV',
        description: `Colunas em falta: ${missingHeaders.join(', ')}`,
      });
      return [];
    }

    const rows: ParsedRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim() || '';
      });

      const parsedRow: ParsedRow = {
        titulo: row.titulo || '',
        descricao: row.descricao || undefined,
        cliente: row.cliente || undefined,
        categoria: row.categoria || undefined,
        imagem_url: row.imagem_url || undefined,
        link_projeto: row.link_projeto || undefined,
        data_projeto: row.data_projeto || undefined,
        ordem: parseInt(row.ordem) || 0,
        visivel: row.visivel?.toLowerCase() !== 'false',
      };

      if (!parsedRow.titulo) {
        parsedRow.error = 'Título é obrigatório';
      }

      rows.push(parsedRow);
    }

    return rows;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsed = parseCSV(content);
      setParsedData(parsed);
      if (parsed.length > 0) {
        setStep('preview');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    const validRows = parsedData.filter((row) => !row.error);
    if (validRows.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não há linhas válidas para importar',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('portfolio2').insert(
        validRows.map((row) => ({
          titulo: row.titulo,
          descricao: row.descricao || null,
          cliente: row.cliente || null,
          categoria: row.categoria || null,
          imagem_url: row.imagem_url || null,
          link_projeto: row.link_projeto || null,
          data_projeto: row.data_projeto || null,
          ordem: row.ordem,
          visivel: row.visivel,
        }))
      );

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: `${validRows.length} item(s) importado(s) com sucesso`,
      });

      handleClose();
      onSuccess();
    } catch (err) {
      console.error('Erro ao importar:', err);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível importar os dados',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setParsedData([]);
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  const validCount = parsedData.filter((r) => !r.error).length;
  const errorCount = parsedData.filter((r) => r.error).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Importar CSV</DialogTitle>
          <DialogDescription>
            {step === 'upload'
              ? 'Selecione um ficheiro CSV para importar itens para o portfólio'
              : 'Reveja os dados antes de confirmar a importação'}
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Ficheiro CSV</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>O ficheiro deve conter as seguintes colunas:</p>
              <code className="block bg-muted p-2 rounded text-xs">
                titulo, descricao, cliente, categoria, imagem_url, link_projeto, data_projeto, ordem, visivel
              </code>
              <p className="text-xs">A coluna <strong>titulo</strong> é obrigatória.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                {validCount} válido(s)
              </Badge>
              {errorCount > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errorCount} erro(s)
                </Badge>
              )}
            </div>

            <ScrollArea className="h-[300px] border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">{index + 1}</TableCell>
                      <TableCell>{row.titulo || '-'}</TableCell>
                      <TableCell>{row.cliente || '-'}</TableCell>
                      <TableCell>{row.categoria || '-'}</TableCell>
                      <TableCell>
                        {row.error ? (
                          <Badge variant="destructive" className="text-xs">
                            {row.error}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            OK
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          {step === 'preview' && (
            <>
              <Button variant="outline" onClick={() => setStep('upload')}>
                Voltar
              </Button>
              <Button onClick={handleImport} disabled={isLoading || validCount === 0}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A importar...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar {validCount} item(s)
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImport;
