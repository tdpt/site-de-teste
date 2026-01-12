import serviceDesign from "@/assets/service-design.jpg";
import serviceMaterials from "@/assets/service-materials.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";
import serviceIntegrated from "@/assets/service-integrated.jpg";
import serviceSustainability from "@/assets/service-sustainability.jpg";

const services = [
  {
    image: serviceDesign,
    title: "Design de Moda Corporativa",
    description:
      "Traduzimos a identidade da sua marca em vestuário profissional distintivo e elegante.",
  },
  {
    image: serviceMaterials,
    title: "Seleção de Materiais",
    description:
      "Tecidos e acabamentos escolhidos para conforto, durabilidade e uso real no dia-a-dia.",
  },
  {
    image: serviceProduction,
    title: "Produção Própria e Flexível",
    description:
      "Made in Portugal, desde grandes volumes a pequenas séries e reposições urgentes.",
  },
  {
    image: serviceLogistics,
    title: "Logística Eficiente",
    description:
      "Soluções ex-works, entrega em armazém ou just-in-time adaptadas às suas necessidades.",
  },
  {
    image: serviceIntegrated,
    title: "Serviço Integrado e Próximo",
    description:
      "Um único parceiro que gere todo o processo, com acompanhamento personalizado.",
  },
  {
    image: serviceSustainability,
    title: "Sustentabilidade 360º",
    description:
      "Recolha em fim de vida e iniciativas de economia circular para um futuro mais verde.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="bg-secondary section-padding relative z-10">
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
              className="card-elevated overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;