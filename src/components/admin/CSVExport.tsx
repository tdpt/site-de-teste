import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { PortfolioItem } from '@/integrations/supabase/database.types';

interface CSVExportProps {
  items: PortfolioItem[];
}

const CSVExport = ({ items }: CSVExportProps) => {
  const handleExport = () => {
    if (items.length === 0) return;

    const headers = [
      'titulo',
      'descricao',
      'cliente',
      'categoria',
      'imagem_url',
      'link_projeto',
      'data_projeto',
      'ordem',
      'visivel',
    ];

    const escapeCSV = (value: string | number | boolean | null | undefined): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = items.map((item) =>
      [
        escapeCSV(item.titulo),
        escapeCSV(item.descricao),
        escapeCSV(item.cliente),
        escapeCSV(item.categoria),
        escapeCSV(item.imagem_url),
        escapeCSV(item.link_projeto),
        escapeCSV(item.data_projeto),
        escapeCSV(item.ordem),
        escapeCSV(item.visivel),
      ].join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `portfolio_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" onClick={handleExport} disabled={items.length === 0}>
      <Download className="h-4 w-4 mr-2" />
      Exportar CSV
    </Button>
  );
};

export default CSVExport;
