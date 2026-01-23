import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciacao", label: "Diferenciação" },
    { href: "#clientes", label: "Clientes" },
    { href: "#contacto", label: "Contacto" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-max section-padding !py-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src={logo}
            alt="Site de Teste"
            className={`h-10 md:h-12 w-auto transition-all duration-300 ${
              isScrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`text-base font-semibold uppercase tracking-wide transition-colors hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="hero"
            size="sm"
            onClick={() => scrollToSection("#contacto")}
          >
            Contacte-nos
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container-max section-padding !py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground text-left py-2 font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="hero"
              onClick={() => scrollToSection("#contacto")}
              className="mt-2"
            >
              Contacte-nos
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
