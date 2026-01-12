import { Palette, Shirt, Factory, Truck, Users, Leaf } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Design de Moda Corporativa",
    description:
      "Traduzimos a identidade da sua marca em vestuário profissional distintivo e elegante.",
  },
  {
    icon: Shirt,
    title: "Seleção de Materiais",
    description:
      "Tecidos e acabamentos escolhidos para conforto, durabilidade e uso real no dia-a-dia.",
  },
  {
    icon: Factory,
    title: "Produção Própria e Flexível",
    description:
      "Made in Portugal, desde grandes volumes a pequenas séries e reposições urgentes.",
  },
  {
    icon: Truck,
    title: "Logística Eficiente",
    description:
      "Soluções ex-works, entrega em armazém ou just-in-time adaptadas às suas necessidades.",
  },
  {
    icon: Users,
    title: "Serviço Integrado e Próximo",
    description:
      "Um único parceiro que gere todo o processo, com acompanhamento personalizado.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade 360º",
    description:
      "Recolha em fim de vida e iniciativas de economia circular para um futuro mais verde.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="bg-secondary section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Os Nossos Serviços</h2>
          <p className="section-subtitle mx-auto">
            Uma oferta completa e integrada para vestir a sua equipa com excelência
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-elevated p-8 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
