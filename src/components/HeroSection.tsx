import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/logo-white.png";
import heroImage from "@/assets/hero-image.jpg";
const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - Fixed on scroll */}
      <div className="fixed inset-0 z-0">
        <img src={heroImage} alt="Profissionais com fardamento personalizado" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max section-padding text-center">
        <div className="max-w-4xl mx-auto">

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 leading-tight animate-fade-up animation-delay-200 font-display font-medium">
            Vestimos a sua marca com design, conforto e durabilidade
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-up animation-delay-400">
            Criamos mais do que uniformes — vestimos a identidade da sua marca com design personalizado, produção própria e um serviço integrado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Button variant="hero" size="xl" onClick={scrollToContact}>
              Contacte-nos
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => {
            const element = document.querySelector("#sobre");
            if (element) element.scrollIntoView({
              behavior: "smooth"
            });
          }}>
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full mt-2" />
        </div>
      </div>
    </section>;
};
export default HeroSection;