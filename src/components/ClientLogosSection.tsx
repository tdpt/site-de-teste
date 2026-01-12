const clientNames = [
  "Delta Cafés",
  "Grupo Sonae",
  "CTT",
  "TAP Portugal",
  "Galp Energia",
  "Super Bock",
  "Continente",
  "Pingo Doce",
  "Repsol",
  "IKEA Portugal",
  "McDonald's",
  "Jerónimo Martins",
];

const ClientLogosSection = () => {
  return (
    <section className="bg-secondary py-12 overflow-hidden">
      <div className="container-max mb-8">
        <p className="text-center text-muted-foreground text-sm uppercase tracking-wider font-medium">
          Empresas que confiam na MAGIA
        </p>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {/* First set */}
          {clientNames.map((name, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 px-8 lg:px-12"
            >
              <div className="bg-card rounded-lg px-8 py-4 shadow-sm border border-border/50">
                <span className="text-foreground/70 font-medium text-sm whitespace-nowrap">
                  {name}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clientNames.map((name, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 px-8 lg:px-12"
            >
              <div className="bg-card rounded-lg px-8 py-4 shadow-sm border border-border/50">
                <span className="text-foreground/70 font-medium text-sm whitespace-nowrap">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
