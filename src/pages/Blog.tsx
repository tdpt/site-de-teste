import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPosts, urlFor, SanityPost } from "@/lib/sanity";

const Blog = () => {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Erro ao carregar os artigos. Tente novamente mais tarde.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHeader
          title="Blog"
          subtitle="Artigos, novidades e insights sobre sourcing, produção e sustentabilidade"
        />

        <section className="section-padding bg-background">
          <div className="container-max">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-24 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Ainda não há artigos publicados. Volte em breve!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post._id} to={`/blog/${post.slug.current}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={
                            post.mainImage?.asset?._ref
                              ? urlFor(post.mainImage.asset._ref)
                              : "/placeholder.svg"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatDate(post.publishedAt)}
                        </p>
                        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
