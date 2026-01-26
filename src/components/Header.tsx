import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/sobre", label: "Sobre", isPage: true },
    { href: "/servicos", label: "Serviços", isPage: true },
    { href: "#diferenciacao", label: "Diferenciação", isPage: false },
    { href: "#clientes", label: "Clientes", isPage: false },
    { href: "/blog", label: "Blog", isPage: true },
  ];

  const handleNavClick = (href: string, isPage: boolean) => {
    setIsMobileMenuOpen(false);
    
    if (isPage) {
      navigate(href);
    } else {
      // If we're not on the home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
        <button onClick={handleLogoClick} className="flex items-center">
          <img
            src={logo}
            alt="Site de Teste"
            className={`h-10 md:h-12 w-auto transition-all duration-300 ${
              isScrolled ? "" : "brightness-0 invert"
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href, link.isPage)}
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
            onClick={() => handleNavClick("#contacto", false)}
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
                onClick={() => handleNavClick(link.href, link.isPage)}
                className="text-foreground text-left py-2 font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="hero"
              onClick={() => handleNavClick("#contacto", false)}
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
