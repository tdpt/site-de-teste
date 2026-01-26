import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { fetchPostBySlug, urlFor, SanityPostDetail } from "@/lib/sanity";

// Simple portable text renderer
const renderBlock = (block: any, index: number) => {
  if (block._type === "block") {
    const style = block.style || "normal";
    const children = block.children?.map((child: any) => child.text).join("") || "";

    switch (style) {
      case "h1":
        return <h1 key={index} className="text-3xl font-bold mb-4">{children}</h1>;
      case "h2":
        return <h2 key={index} className="text-2xl font-semibold mb-3 mt-6">{children}</h2>;
      case "h3":
        return <h3 key={index} className="text-xl font-semibold mb-2 mt-4">{children}</h3>;
      case "blockquote":
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
            {children}
          </blockquote>
        );
      default:
        return <p key={index} className="mb-4 leading-relaxed">{children}</p>;
    }
  }

  if (block._type === "image" && block.asset?._ref) {
    return (
      <figure key={index} className="my-6">
        <img
          src={urlFor(block.asset._ref)}
          alt={block.alt || ""}
          className="w-full rounded-lg"
        />
        {block.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        const data = await fetchPostBySlug(slug);
        if (!data) {
          setError("Artigo não encontrado.");
        } else {
          setPost(data);
        }
      } catch (err) {
        setError("Erro ao carregar o artigo. Tente novamente mais tarde.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

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
      <main className="pt-24 pb-16">
        <article className="container-max max-w-3xl mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Blog
          </Link>

          {loading ? (
            <div>
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-12 w-3/4 mb-8" />
              <Skeleton className="h-64 w-full mb-8" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error}</p>
              <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">
                Voltar ao Blog
              </Link>
            </div>
          ) : post ? (
            <>
              <header className="mb-8">
                <p className="text-muted-foreground mb-2">
                  {formatDate(post.publishedAt)}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>
                {post.mainImage?.asset?._ref && (
                  <img
                    src={urlFor(post.mainImage.asset._ref)}
                    alt={post.title}
                    className="w-full rounded-lg"
                  />
                )}
              </header>

              <div className="prose prose-lg max-w-none text-foreground">
                {post.body?.map((block, index) => renderBlock(block, index))}
              </div>
            </>
          ) : null}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
