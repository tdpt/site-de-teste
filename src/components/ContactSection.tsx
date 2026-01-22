import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import FormspreeForm from "./forms/FormspreeForm";
import EmailJSForm from "./forms/EmailJSForm";
import Web3FormsForm from "./forms/Web3FormsForm";

const ContactSection = () => {
  return (
    <section id="contacto" className="bg-card section-padding relative z-10">
      <div className="container-max">
        {/* Contact Info Row */}
        <div className="mb-16">
          <h2 className="section-title mb-6">Vamos Conversar</h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-2xl">
            Tem um projeto em mente? Fale connosco e descubra como podemos vestir a sua equipa com qualidade e design.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-medium text-foreground">Morada</div>
                <div className="text-muted-foreground text-sm">
                  Rua Bernardim Ribeiro 119
                  {" · "}
                  <a
                    href="https://maps.google.com/?q=Rua+Bernardim+Ribeiro+119,+4465-043+S.+Mamede+Infesta,+Portugal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-medium text-foreground">Email</div>
                <a
                  href="mailto:geral@magia.pt"
                  className="text-muted-foreground text-sm hover:text-accent transition-colors"
                >
                  geral@magia.pt
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-medium text-foreground">Telefone</div>
                <a
                  href="tel:+351229576500"
                  className="text-muted-foreground text-sm hover:text-accent transition-colors"
                >
                  +351 229 576 500
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Siga-nos:</span>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Test Forms Header */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            🧪 Teste de Soluções de Formulários
          </h3>
          <p className="text-muted-foreground text-sm">
            Compare as 3 soluções abaixo. Cada uma precisa de configuração própria (ver instruções no erro).
          </p>
        </div>

        {/* Three Forms Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <FormspreeForm />
          <EmailJSForm />
          <Web3FormsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
