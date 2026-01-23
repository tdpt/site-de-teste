import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import brandStoryImage from "@/assets/brand-story.jpg";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader 
        title="Sobre Nós" 
        subtitle="Conheça a nossa história e valores"
        backgroundImage={brandStoryImage}
      />
      
      <main className="flex-1 bg-background">
        <section className="container-max section-padding py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">A Nossa História</h2>
              <p className="text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab 
                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">Os Nossos Valores</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
                quaerat voluptatem.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
                laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure 
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel 
                illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">A Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
                voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint 
                occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
                mollitia animi, id est laborum et dolorum fuga.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
