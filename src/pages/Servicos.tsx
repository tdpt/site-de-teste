import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CheckCircle } from "lucide-react";

const services = [
  {
    title: "Design de Uniformes",
    description: "Criamos uniformes únicos e personalizados que refletem a identidade da sua marca. Cada peça é desenhada com atenção ao detalhe, combinando estética profissional com funcionalidade.",
    benefits: [
      "Designs exclusivos para a sua marca",
      "Consultoria de estilo especializada",
      "Protótipos antes da produção",
      "Adaptação a diferentes funções"
    ]
  },
  {
    title: "Produção Industrial",
    description: "Capacidade produtiva para responder às necessidades de qualquer dimensão. Desde pequenas séries até grandes encomendas, garantimos qualidade consistente em cada peça produzida.",
    benefits: [
      "Produção em escala flexível",
      "Controlo de qualidade rigoroso",
      "Cumprimento de prazos",
      "Capacidade para grandes volumes"
    ]
  },
  {
    title: "Seleção de Materiais",
    description: "Utilizamos tecidos de alta qualidade, selecionados criteriosamente para garantir durabilidade, conforto e facilidade de manutenção em ambientes profissionais exigentes.",
    benefits: [
      "Tecidos certificados de qualidade",
      "Resistência a lavagens frequentes",
      "Conforto térmico adaptado",
      "Opções sustentáveis disponíveis"
    ]
  },
  {
    title: "Logística Integrada",
    description: "Serviço completo de gestão e distribuição, desde o armazenamento até à entrega. Simplificamos a gestão do seu stock de uniformes com soluções logísticas eficientes.",
    benefits: [
      "Gestão de stock automatizada",
      "Entregas programadas",
      "Distribuição multi-ponto",
      "Reposição just-in-time"
    ]
  },
  {
    title: "Sustentabilidade",
    description: "Compromisso com práticas de produção responsável e materiais eco-friendly. Trabalhamos para minimizar o impacto ambiental em toda a cadeia de produção.",
    benefits: [
      "Materiais reciclados e orgânicos",
      "Processos de baixo impacto",
      "Certificações ambientais",
      "Economia circular aplicada"
    ]
  }
];

const Servicos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader 
        title="Serviços" 
        subtitle="Descubra o que podemos fazer por si"
      />
      
      <main className="flex-1 bg-background">
        <section className="container-max section-padding py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Os Nossos Serviços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Oferecemos uma gama completa de serviços para responder a todas as suas necessidades de uniformização profissional.
              </p>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`grid md:grid-cols-2 gap-8 p-8 rounded-lg border border-border bg-card ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Description Column */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefits Column */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Benefícios</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Servicos;
