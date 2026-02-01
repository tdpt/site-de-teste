import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { PortfolioItem } from "@/integrations/supabase/database.types";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPortfolioItems(data || []);
      } catch (err) {
        console.error('Erro ao carregar portfólio:', err);
        setError('Não foi possível carregar o portfólio. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="Portfólio" />

      <main className="container-max section-padding py-16 md:py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : portfolioItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Ainda não há trabalhos no portfólio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <article
                key={item.id}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                    {item.categoria}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.descricao}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
