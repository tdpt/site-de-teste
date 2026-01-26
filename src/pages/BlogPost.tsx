import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
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

  // Build subtitle with date and category breadcrumb
  const buildSubtitle = () => {
    if (!post) return "";
    
    const date = formatDate(post.publishedAt);
    const categoryName = post.categories?.[0]?.title;
    
    if (categoryName) {
      return `${date} | Blog > ${categoryName}`;
    }
    return date;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {loading ? (
          <>
            <section className="min-h-[40vh] flex items-center justify-center pt-20 relative">
              <div className="absolute inset-0 bg-primary" />
              <div className="container-max section-padding text-center relative z-10">
                <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-white/20" />
                <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
              </div>
            </section>
            <section className="section-padding bg-background">
              <article className="container-max max-w-3xl mx-auto">
                <Skeleton className="h-64 w-full mb-8" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </article>
            </section>
          </>
        ) : error ? (
          <>
            <PageHeader title="Artigo não encontrado" />
            <section className="section-padding bg-background">
              <div className="container-max text-center py-12">
                <p className="text-muted-foreground mb-4">{error}</p>
                <Link to="/blog" className="text-primary hover:underline">
                  Voltar ao Blog
                </Link>
              </div>
            </section>
          </>
        ) : post ? (
          <>
            <PageHeader
              title={post.title}
              subtitle={
                <span>
                  {formatDate(post.publishedAt)}
                  {post.categories?.[0]?.title && (
                    <>
                      {" | "}
                      <Link to="/blog" className="hover:underline">Blog</Link>
                      {" > "}
                      {post.categories[0].title}
                    </>
                  )}
                </span>
              }
              backgroundImage={post.mainImage?.asset?._ref ? urlFor(post.mainImage.asset._ref) : undefined}
            />

            <section className="section-padding bg-background">
              <article className="container-max max-w-3xl mx-auto">
                {post.mainImage?.asset?._ref && (
                  <img
                    src={urlFor(post.mainImage.asset._ref)}
                    alt={post.title}
                    className="w-full rounded-lg mb-8"
                  />
                )}

                <div className="prose prose-lg max-w-none text-foreground">
                  {post.body?.map((block, index) => renderBlock(block, index))}
                </div>
              </article>
            </section>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;