import { Sparkles, Settings, Handshake, Clock, Award, Recycle } from "lucide-react";

const differentiators = [
  {
    icon: Sparkles,
    title: "Customização Total",
    description: "Fardas criadas à medida da imagem e necessidades de cada cliente",
  },
  {
    icon: Settings,
    title: "Flexibilidade Operacional",
    description: "Adaptação rápida a quantidades, timings e necessidades.",
  },
  {
    icon: Handshake,
    title: "Serviço Integrado",
    description: "Gestão de todo o processo desde o design até à entrega final.",
  },
  {
    icon: Clock,
    title: "Proximidade e Rapidez na Execução",
    description: "Processos ágeis e comunicação direta.",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    description: "Mais de 30 anos no mercado, aliando conhecimento técnico com visão prática.",
  },
  {
    icon: Recycle,
    title: "Sustentabilidade",
    description: "Materiais responsáveis e processos que reduzem desperdício.",
  },
];

const DifferentiationSection = () => {
  return (
    <section id="diferenciacao" className="bg-primary section-padding relative z-10">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-primary-foreground mb-4">
            O Que Nos Diferencia
          </h2>
          <p className="section-subtitle text-primary-foreground/80 mx-auto">
            A combinação perfeita entre tradição, inovação e compromisso
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-8 h-8 text-accent-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
