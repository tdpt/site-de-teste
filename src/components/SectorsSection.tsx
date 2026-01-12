import { GraduationCap, Factory, UtensilsCrossed, Fuel, Heart, Briefcase, Megaphone, Wrench } from "lucide-react";

const sectors = [
  { icon: GraduationCap, name: "Educação" },
  { icon: Factory, name: "Indústria" },
  { icon: UtensilsCrossed, name: "Hotelaria e Restauração" },
  { icon: Fuel, name: "Postos de Combustível" },
  { icon: Heart, name: "Saúde e Bem-Estar" },
  { icon: Briefcase, name: "Vestuário Corporativo" },
  { icon: Megaphone, name: "Merchandising / Publicidade" },
  { icon: Wrench, name: "Serviços" },
];

const SectorsSection = () => {
  return (
    <section id="clientes" className="bg-card section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Com Quem Trabalhamos</h2>
          <p className="section-subtitle mx-auto">
            Vestimos equipas de diversos setores, construindo parcerias duradouras e de confiança
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="card-elevated p-6 text-center group cursor-default"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <sector.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-medium text-foreground">{sector.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
