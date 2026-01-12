import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contacto brevemente.",
    });

    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="bg-card section-padding relative z-10">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div>
            <h2 className="section-title mb-6">Vamos Conversar</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Tem um projeto em mente? Fale connosco e descubra como podemos vestir a sua equipa com qualidade e design.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Morada</div>
                  <div className="text-muted-foreground text-sm">
                    Rua Bernardim Ribeiro 119, 4465-043 S. Mamede Infesta
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
            <div>
              <div className="text-sm font-medium text-foreground mb-4">
                Siga-nos
              </div>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Linkedin className="w-6 h-6" strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Instagram className="w-6 h-6" strokeWidth={1.5} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Facebook className="w-6 h-6" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-secondary rounded-2xl p-8 lg:p-10">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Envie-nos uma mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nome *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="O seu nome"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@empresa.pt"
                    className="bg-card"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Empresa
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="bg-card"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Como podemos ajudar?"
                  rows={5}
                  className="bg-card resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
