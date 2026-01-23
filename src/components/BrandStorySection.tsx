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
              Uma história que acompanha gerações
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Nascemos na moda antes de nos especializarmos no universo das fardas e uniformes. Esse histórico capacita-nos hoje com algo raro no setor: sensibilidade estética, consistência técnica, e uma assinatura distinta.
              </p>
              <p>
                Acreditamos que uma farda é muito mais do que vestuário - é identidade, confiança e comunicação direta com o cliente. Por isso, criamos peças que traduzem o ADN de cada marca, combinando design, funcionalidade e conforto autêntico no dia-a-dia.
              </p>
              <p>
                Da conceção à produção, logística e reposição, trabalhamos como um parceiro único e próximo, simplificando o processo e acompanhando cada cliente ao longo do tempo.
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
                alt="Atelier - Produção Made in Portugal"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-primary/50 rounded-2xl group-hover:bg-primary/40 transition-colors" />
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
