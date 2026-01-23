import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary section-padding !py-12 relative z-10">
      <div className="container-max">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Logo & Company Info */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Site de Teste"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md mb-4">
              Especialistas em fardamento profissional personalizado.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">
              Contacto
            </h4>
            <address className="not-italic text-primary-foreground/70 text-sm leading-relaxed">
              Rua Bernardim Ribeiro 119
              <br />
              4465-043 S. Mamede Infesta
              <br />
              Matosinhos, Portugal
            </address>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
              >
                Livro de Reclamações
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
              >
                Política de Cookies
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <p className="text-primary-foreground/50 text-sm text-center">
            © {new Date().getFullYear()} Site de Teste. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
