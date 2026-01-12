import { Button } from "@/components/ui/button";
import brandStoryImage from "@/assets/brand-story.jpg";

const BrandStorySection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sobre" className="bg-card section-padding relative z-10">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="section-title mb-6">
              A Magia que acompanha gerações
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Com origens no mundo da moda e uma especialização em uniformes profissionais desde 1986, a MAGIA combina sensibilidade estética, consistência técnica e uma assinatura distintiva em cada projeto.
              </p>
              <p>
                Acreditamos que o fardamento é muito mais do que roupa de trabalho — é identidade, confiança e comunicação direta com os seus clientes. Cada peça que criamos reflete os valores e a essência da sua marca.
              </p>
              <p>
                Somos um parceiro único a longo prazo, acompanhando todo o processo desde o conceito inicial até à produção, logística e reposição. A MAGIA está consigo em cada etapa.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="hero" size="lg" onClick={scrollToContact}>
                Contacte-nos
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <img
                src={brandStoryImage}
                alt="Atelier MAGIA - Produção Made in Portugal"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-2xl group-hover:bg-primary/20 transition-colors" />
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-sm opacity-90">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
